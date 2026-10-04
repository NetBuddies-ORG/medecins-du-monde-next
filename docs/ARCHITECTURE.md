# Architecture de MonBo Réseau

Document de référence pour comprendre comment le site est produit et comment la recherche
fonctionne. Les règles de travail et les commandes sont dans [AGENTS.md](../AGENTS.md).

## Vue d'ensemble

```
             ┌──────────────────────────── build (CI ou local) ────────────────────────────┐
 Strapi v4   │  yarn build:static                                                          │
 GraphQL ───►│   ├─ prebuild.ts ─► build/static/*.json  ─► index lunr ─► public/sitemap-*  │
             │   └─ next build (output: 'export') ─► rend chaque page en HTML ─► dist/     │
             └─────────────────────────────────────────────────────────────────────────────┘
                                                   │
                                                   ▼
                                  Azure Static Web Apps (dist/)
                                                   │
                                                   ▼
             Navigateur : HTML statique + JS ─► IndexedDB (organismes, publics, catégories, services)
                                             ─► index lunr (recherche plein texte)
```

Il n'y a **aucun serveur applicatif en production** : pas d'API route, pas de SSR à la demande.
Toute donnée affichée a été figée au moment du build. Modifier du contenu dans Strapi nécessite
donc un nouveau déploiement (workflow manuel `Strapi - Manual deploy`, ou push sur `main`/`dev`).

## Variables d'environnement

| Variable | Défini dans | Rôle |
| --- | --- | --- |
| `STRAPI_CMS_BASE_URL` | optionnelle | Surcharge l'URL de Strapi, sinon la constante `strapiBaseUrl` (`https://strapi.monboreseau.be`) de `helpers/config.ts`. Serveur/build uniquement |
| `NEXT_PUBLIC_REVISION_ORGANISME` / `_PUBLICS` / `_CATEGORIES` / `_SERVICES` / `_TRANSLATIONS` | `next.config.mjs` (clé `env`) | Hash MD5 des JSON de `build/static/`, utilisés pour invalider le cache IndexedDB. Calculés au chargement de la config Next, donc après le prebuild |

La CI ajoute `IS_STATIC_EXPORT` / `NEXT_PUBLIC_STATIC_EXPORT`, actuellement non lus par le code.

## Prebuild (`build/scripts/prebuild.ts`)

Lance en parallèle les téléchargements et le sitemap, **puis** construit les index une fois tous
les JSON écrits. Un échec fait sortir le process en erreur (et donc échouer le build).

| Étape | Sortie |
| --- | --- |
| `fetchLocales` | `locales.json` — codes de langue Strapi (aujourd'hui `["fr"]`) |
| `fetchTranslations` | `translations.json` — `{ fr: { translation: { KEY: "texte" } } }` pour i18next |
| `fetchPublics` | `publics.json` — publics spécifiques (Jeune, Sans-abri…) |
| `fetchCategories` | `categories.json` — catégories avec `sous_categories` (et leurs `SearchTerms`) |
| `fetchOrganismes` | `organismes.json` — tous les organismes à plat (`{ id, ...attributes }`) |
| `fetchServices` | `services.json` |
| `buildSitemap` | `public/sitemap-<lang>.xml` (pages + organismes avec `Referencement_internet`) |
| `buildIndexes` | `index.json`, `indexService.json`, `indexCategorie.json`, `indexSubCategorie.json` |

Limite connue : les fetchers lisent la liste des langues (`locales.json`) au chargement du
module, avant que `fetchLocales` ne la mette à jour. Une nouvelle langue n'est donc prise en
compte qu'au prebuild suivant.

## Routage (App Router)

| Route | Fichier | Rôle |
| --- | --- | --- |
| `/` | `next.config.mjs` (dev) / `staticwebapp.config.json` (prod) | Redirige vers `/fr/` |
| `/[language]/...` | `app/[language]/layout.tsx` | 404 si la page `/` n'existe pas pour cette langue |
| `/[language]/[[...p]]` | `app/[language]/[[...p]]/page.tsx` | Toute page Strapi, résolue par son champ `Url` |
| `/[language]/[segment]/[orgaslug]` | `app/[language]/[segment]/[orgaslug]/page.tsx` | Fiche organisme. `segment` = `Url` de la page de type `Organizations`, `orgaslug` = `generatedUrl` |

`generateStaticParams` interroge Strapi pour produire la liste exhaustive des chemins.
Depuis Next 15, `params` est une `Promise` à `await` dans les pages, layouts et `generateMetadata`.
`generateMetadata` alimente `<title>`/description depuis le composant SEO Strapi (`noindex`
pour les organismes sans `Referencement_internet`).

### Contexte serveur

`src/context/server.ts` utilise `server-only-context` : la route appelle `setPage`, `setHeader`,
`setFooter`, `setLanguage`, `setCategories`, `setPublics`, puis les composants serveur relisent
ces valeurs avec les `get*` correspondants, sans prop drilling. Ces getters ne fonctionnent
**que dans des composants serveur rendus sous une route qui a fait les `set*`**.

### Dispatch par type de contenu

`features/document-types/DocumentTypes.tsx` rend Header + contenu + Footer, le contenu étant
choisi par `pages.data[0].attributes.ContentType` :

| ContentType | Composant | Données supplémentaires |
| --- | --- | --- |
| `Home` | `home-page/HomePage` (+ `CardList` client) | `getHome`, `getHelp`, catégories, publics |
| `Organizations` | `organizations/Organizations` (client) | `getOrganismes` |
| `SearchOrganization` | `search-organization/SearchOrganization` (client) | `getSearchOrganization`, catégories, publics |
| `Services` | `services-page/ServicesPage` (client) | `getServices` |
| `About` | `about-page/AboutPage` | `getAbout` |
| `Urgences` | `urgences/Urgences` | `getUrgences` |
| `Orientations` | `orientations/Orientations` | `getOrientations` |
| `Toolbox` | `toolbox/ToolBoxPage` | — |
| autre | `notFound()` | |

## Accès aux données Strapi

- Requêtes : `src/services/requests/**/*.graphql` (collections à la racine, single types dans
  `single-types/`). Les collections demandent `pagination: { limit: 1000 }` et
  `meta { pagination { total } }`. `getAllData()` (`services/Strapi.ts`) compare les deux et fait
  échouer le build en cas de troncature. Les relations imbriquées ne peuvent pas être contrôlées.
- SDK : `yarn graphql` lit le schéma live (`codegen.yml`) et génère `src/services/GraphQL.ts`
  (plugins `typescript`, `typescript-operations`, `typescript-graphql-request`,
  `avoidOptionals: true`).
- Format Strapi v4 : chaque relation est enveloppée `{ data: { id, attributes } }`. Les JSON de
  `build/static` gardent ce format pour les relations mais aplatissent le premier niveau.

## Recherche côté client (`src/services/Search.ts`)

`useDBIndex(language)` initialise une fois par langue :
1. `setupDB()` (`index-db/IndexDBConfig.ts`) ouvre la base IndexedDB `Mdm` (version 2) et, pour
   chaque store, compare la révision stockée au hash `NEXT_PUBLIC_REVISION_*` ; s'ils diffèrent,
   le store est vidé et rechargé depuis le JSON (import dynamique, donc bundle séparé).
2. Charge lunr + stemmer français + le plugin `removeDiacriticsSpelling`, puis les 4 index.
3. Expose `isReady` et des fonctions qui rejettent tant que l'initialisation n'est pas finie.

### Recherche plein texte — `helpers/search.ts#searchByKeyword`

- Normalise (accents, ponctuation), retire des mots vides français.
- Pour chaque terme : `terme^(100-i) terme*^20 terme~1^10` (exact, préfixe, flou).
- Si plus de 5 résultats, filtre ceux sous `max(moyenne − écart-type, 0.25)`.
- Retourne des `ref` (ids) dédoublonnés.

Utilisée par la liste des organismes (`Organizations.tsx`), la page services (`ServicesPage.tsx`)
et l'autocomplétion de l'accueil (`AutoComplete.tsx`, sur les sous-catégories). L'index
`indexCategorie.json` est construit et chargé mais `searchCategories` n'a pas d'appelant.

### Recherche par filtres — `search()`

Pour chaque organisme en IndexedDB :
- **Public** : si un public est choisi, exclusion stricte des organismes qui ne le servent pas ;
  score 1, sinon 0.5 (neutre).
- **Sous-catégories** : si des sous-catégories sont choisies, exclusion des organismes sans
  aucune correspondance ; score = F1 entre précision (part des sous-catégories de l'organisme
  qui correspondent → favorise les structures spécialisées) et rappel (part des sous-catégories
  recherchées couvertes).
- **Score final** = `0.65 × public + 0.35 × sous-catégories`, puis seuil absolu 0.35, seuil
  relatif 40 % du meilleur score, 20 résultats maximum.

`categoriesIds` fait partie des paramètres mais **n'est pas utilisé** par l'algorithme.

## Internationalisation

- Les traductions d'interface viennent de Strapi (`traductions`) et sont embarquées au build.
- Serveur : `useTranslation(lang)` de `app/i18n/index.ts` (instance par rendu).
- Client : `useTranslation()` de `app/i18n/client.ts` (singleton initialisé en `fr`).
- Le contenu éditorial est localisé par Strapi (`locale` passé à chaque requête).

## Déploiement

| Workflow | Déclencheur | Cible |
| --- | --- | --- |
| `azure-static-web-apps-delightful-ground-…` | push / PR sur `main` | Production |
| `azure-static-web-apps-gentle-grass-…` | push / PR sur `dev` | Préproduction |
| `deploy-trigger-strapi.yml` | manuel | Production (rebuild après modification de contenu) |
| `pull-request-pre-conditions.yml` | PR | Danger (titre et labels) + `tsc-check` et `lint` |
| `utility-release-drafter.yml` | push `main` | Brouillon de release |

Commande de build Azure : `yarn build:static`, sortie `dist/`.
`public/staticwebapp.config.json` définit les headers de sécurité (CSP incluant Matomo),
le cache immuable de `/_next/*` et la page 404.
