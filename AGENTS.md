# AGENTS.md

Guide de travail pour les agents IA (Claude Code, Codex, Copilot, Cursor…) sur **MonBo Réseau**
(`monboreseau.be`), annuaire d'organismes d'aide sociale/santé de la région de Mons, réalisé pour
Médecins du Monde Belgique.

Pour le détail du fonctionnement interne, lire [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## En une phrase

Site **Next.js 16 (App Router, Turbopack) exporté en statique** (`output: 'export'`) dont tout le contenu vient
d'un **Strapi v4 headless** via **GraphQL**, déployé sur **Azure Static Web Apps**. La recherche
d'organismes tourne **entièrement côté navigateur** (index lunr pré-construits + IndexedDB).

## Stack

| Domaine | Outil |
| --- | --- |
| Framework | Next.js 16 App Router (Turbopack), React 19, TypeScript 6.0 (`strict: false`, `strictNullChecks: true`, `moduleResolution: bundler`) |
| CMS | Strapi v4 — `https://strapi.monboreseau.be/graphql` (réponses au format `data { id attributes { … } }`) |
| Client GraphQL | `graphql-request` 7 (ESM uniquement) + SDK généré par `graphql-codegen` → `src/services/GraphQL.ts` |
| Recherche | `lunr` + `lunr-languages` (fr), données en IndexedDB via `idb` |
| Carte | `leaflet` / `react-leaflet` 5 + `react-leaflet-cluster`, chargés en `dynamic(..., { ssr: false })` |
| i18n | `i18next` / `react-i18next`, traductions venant de Strapi (`build/static/translations.json`) |
| Styles | SCSS global (atomic design) dans `src/assets/styles/`, pas de CSS modules ni Tailwind. Police Poppins auto-hébergée via `next/font` |
| Animations / icônes | `framer-motion`, `react-icons` (fa / fa6) |
| Analytics | Matomo auto-hébergé (`public/scripts/matomo.js`) |
| Gestionnaire de paquets | **Yarn 4.15** épinglé (`packageManager` + binaire commité `.yarn/releases/`, `nodeLinker: node-modules`), Node **22** |
| Scripts de build | `tsx` (exécute `build/scripts/*.ts`) |

## Commandes

Aucun fichier d'environnement : l'URL de Strapi est une constante (`strapiBaseUrl` dans
`src/helpers/config.ts`), surchargeable par la variable `STRAPI_CMS_BASE_URL` (ex. Strapi local).

```bash
yarn install
yarn build:pre         # Rafraîchit build/static/*.json, les index lunr et public/sitemap-*.xml depuis Strapi
yarn start             # Serveur de dev Next (http://localhost:3000 → redirige vers /fr/)
yarn build:static      # Build complet = prebuild + next build → export statique dans dist/
yarn graphql           # Régénère src/services/GraphQL.ts depuis le schéma Strapi live
yarn tsc-check         # Vérification TypeScript (doit passer à 0 erreur)
yarn lint              # ESLint 10, flat config eslint.config.mjs
yarn test              # Tests unitaires (Vitest) ; `yarn test:watch` en mode surveillance
```

Les **tests unitaires** (Vitest) couvrent la recherche : `src/helpers/rankOrganismes.test.ts` (filtres),
`src/helpers/search.test.ts` (recherche texte) et `src/helpers/highlight.test.ts` (surlignage des
suggestions de l'accueil). Sur chaque PR, la CI lance `yarn tsc-check`,
`yarn lint` (qui doit rester à 0 erreur et 0 avertissement) et `yarn test`.
Valider un changement = `yarn tsc-check` + `yarn lint` + `yarn test` + `yarn build:static` (Next refait son
propre contrôle de types, plus strict que `tsc-check` sur les routes) + vérification manuelle dans
le navigateur (`yarn start`).


## Carte du dépôt

```
src/
  app/                         Routes App Router
    layout.tsx                 <html>, SCSS global, script Matomo
    [language]/layout.tsx      Vérifie que la langue existe dans Strapi
    [language]/[[...p]]/       Toutes les pages CMS (catch-all) → DocumentTypes
    [language]/[segment]/[orgaslug]/  Fiche détail d'un organisme
    i18n/                      i18next : index.ts (serveur), client.ts ('use client'), settings.ts
  context/server.ts            "Contexte" serveur par requête (server-only-context) : page, header, footer, langue…
  features/
    document-types/            Un composant par ContentType Strapi + DocumentTypes.tsx (le routeur)
    common/                    Header, footer, autocomplete, carte Leaflet, modal d'aide, icônes
    components/image/          Wrapper next/image
  services/
    GraphQL.ts                 GÉNÉRÉ — ne jamais éditer à la main
    Strapi.ts                  getStrapiClient() → SDK typé
    requests/**/*.graphql      Requêtes GraphQL (source de vérité du SDK)
    Search.ts                  Moteur de recherche client (hook useDBIndex)
    index-db/                  Schéma + initialisation IndexedDB
  helpers/                     config (langues), search (recherche texte lunr), rankOrganismes (recherche
                               par filtres, fonction pure), diacritiques, Deferred. Tests en *.test.ts
  assets/styles/               SCSS : 00_base / 01_atomes / 02_molecules / 03_organismes, importés dans main.scss
  images/loader.ts             Loader next/image pour l'export statique (ImageKit)
build/
  scripts/prebuild.ts          Orchestration du prebuild (fetch Strapi + index + sitemap)
  scripts/fetch-data/          Un fetcher par entité → build/static/*.json
  scripts/index-builder/       Construction des index lunr ; leur définition est dans indexes.ts,
                               partagée avec les tests
  static/*.json                Données + index générés, COMMITÉS, importés par le code client et serveur
public/
  staticwebapp.config.json     Config Azure SWA : redirections, CSP de prod, headers de cache, 404
.github/workflows/             CI/CD Azure (main → prod, dev → préprod), Danger, release-drafter
```

## Comment le site est construit (l'essentiel)

1. **Prebuild** (`build/scripts/prebuild.ts`) télécharge locales, traductions, publics, catégories,
   organismes et services depuis Strapi dans `build/static/*.json`, construit 4 index lunr et les
   sitemaps.
2. **`next build`** en mode export : `generateStaticParams` liste toutes les pages Strapi par langue
   et toutes les fiches organismes ; chaque page est rendue côté serveur à la compilation.
3. **Une page CMS** = une entrée Strapi `pages` avec un `Url` et un `ContentType`.
   `src/features/document-types/DocumentTypes.tsx` fait un `switch` sur `ContentType`
   (`Home`, `Organizations`, `About`, `Toolbox`, `SearchOrganization`, `Services`, `Urgences`,
   `Orientations`) et charge les données spécifiques (single types Strapi).
4. **Côté navigateur**, `useDBIndex(language)` charge les JSON dans IndexedDB (invalidation par hash
   MD5 exposé en `NEXT_PUBLIC_REVISION_*`) et les index lunr, puis sert recherche texte et
   recherche par filtres (public + sous-catégories, score pondéré dans `Search.ts`).

## Conventions

- **Langue** : identifiants et commentaires mélangent français et anglais. Les noms d'entités et
  de champs Strapi sont en français avec majuscule (`Nom`, `Adresse`, `sous_categories`,
  `public_specifiques`, `Referencement_internet`) — les garder tels quels.
- **Imports** : alias `@/*` → `src/*`. Les scripts de `build/` utilisent plutôt des chemins
  relatifs (`../../../src/...`) ; ils tournent sous `tsx`.
- **Paramètres de route (Next 15+)** : `params` est une `Promise` dans les pages, layouts et
  `generateMetadata`. Toujours `const { language } = await params`. `generateStaticParams`
  renvoie, lui, des objets simples.
- **Composants serveur par défaut**. Ajouter `'use client'` uniquement pour l'interactivité
  (état, effets, Leaflet, IndexedDB). Les composants serveur lisent leurs données via
  `getPage()/getHeader()/getLanguage()…` de `@/context/server`, positionnés par la route.
- **Accès Strapi côté serveur** : fonction locale enveloppée dans `React.cache`, qui appelle
  `getStrapiClient().<requête>({ locale })`. Suivre le motif existant de `DocumentTypes.tsx`.
- **Lire une collection complète** : toujours via `getAllData('nom', réponse.collection)`
  (`@/services/Strapi`), et la requête `.graphql` doit demander `meta { pagination { total } }`.
  Le build échoue si Strapi renvoie moins d'éléments que le total (limite de 1000 dépassée ou
  `maxLimit` du serveur), au lieu de publier des données tronquées.
- **Les filtres GraphQL** génèrent des erreurs de type : le code existant utilise
  `// @ts-expect-error generated type`. Acceptable ici, mais ne pas en ajouter ailleurs sans raison.
- **Prettier** : `singleQuote`, pas de point-virgule, `trailingComma: es5`. Les fichiers anciens
  ne sont pas tous formatés : ne pas reformater un fichier entier dans un commit fonctionnel.
- **Styles** : classes globales (style BEM, ex. `details-container__header`), nouveau fichier
  SCSS = le ranger dans la bonne couche et l'`@import` dans `main.scss`.
- **Leaflet** : toujours via `@/features/common/leaflet` (import dynamique `ssr: false`), jamais
  d'import direct de `leaflet` dans un composant rendu côté serveur.
- **HTML riche venant de Strapi** : rendu via `dangerouslySetInnerHTML` (contenu de confiance du CMS).

## Recettes courantes

**Modifier le comportement de la recherche**
1. Toute la logique est dans des fonctions pures : `rankOrganismes()` (filtres),
   `searchByKeyword()` (texte) et les index de `build/scripts/index-builder/indexes.ts`.
   `Search.ts` ne fait que brancher IndexedDB et les index chargés.
2. Écrire d'abord le test du comportement voulu dans le `*.test.ts` correspondant, puis modifier
   le code. Les tests de texte construisent les index avec les mêmes fonctions que le build.

**Ajouter/modifier un champ Strapi**
1. Modifier le `.graphql` concerné dans `src/services/requests/`.
2. `yarn graphql` pour régénérer `src/services/GraphQL.ts` (le schéma doit déjà exister côté Strapi).
3. Si le champ sert à la recherche client : adapter le fetcher dans `build/scripts/fetch-data/`,
   puis `yarn build:pre`, et éventuellement `build/scripts/index-builder/build-indexes.ts`.

**Ajouter un nouveau type de page**
1. Dans Strapi : ajouter la valeur au champ `ContentType` de la collection `pages`, créer la page
   (avec son `Url`) et, si besoin, un single type pour son contenu.
2. Ajouter la requête `single-types/GetXxx.graphql`, puis `yarn graphql`.
3. Créer `src/features/document-types/xxx/Xxx.tsx` et un `case 'Xxx'` dans `DocumentTypes.tsx`.

**Ajouter une traduction d'interface** : elle se crée dans Strapi (collection `traductions`,
champs `Key` / `Traduction`), puis `yarn build:pre`. Côté client : `useTranslation()` de
`@/app/i18n/client`.

## Pièges connus (à lire avant de toucher au build ou à la recherche)

- **`build/static/*.json` est commité et importé statiquement** (`import ... from '../../build/static/…'`).
  Un `yarn build:pre` local modifie ces fichiers : ne les commiter que si c'est voulu.
- **Ordre du prebuild** : les fetchers d'abord, `buildIndexes()` ensuite (il relit les JSON sur
  disque). Ne pas le remettre dans le `Promise.all`, sinon les index sont construits sur les
  anciennes données. Les fetchers importent `languages` (donc `locales.json`) au chargement :
  une nouvelle langue Strapi n'est prise en compte qu'au prebuild suivant.
- **Hash de révision IndexedDB** : les `NEXT_PUBLIC_REVISION_*` sont calculés dans
  `next.config.mjs` (clé `env`), qui n'est chargé qu'au lancement de `next build`, donc après le
  prebuild. Les calculer plus tôt (ex. dans un script lancé avant le prebuild) donnerait
  l'empreinte des anciens JSON.
- **`search()` ignore `categoriesIds`** : seuls `subCategoriesIds` et `publicsId` filtrent. Arriver
  sur la recherche avec `?categories=X` ouvre le panneau de filtres avec les sous-catégories
  décochées (demande du client) ; le bouton invite à en choisir une.
  Une catégorie sans sous-catégorie (« Santé ») ne peut rien filtrer : les organismes ne sont
  reliés qu'à des sous-catégories.
- **Le score de `search()` ne doit jamais exclure** un organisme qui correspond : il ne sert qu'à
  trier. Un seuil minimal masquait les organismes généralistes quand aucun public n'était choisi.
- **Effets qui utilisent le moteur de recherche** (`useDBIndex`) : tout effet qui appelle
  `search()`, `getOrganismes()`, `getServices()`… doit avoir `isReady` dans ses dépendances.
  Sinon, une action faite pendant l'initialisation du moteur (mot-clé tapé, filtre venant de
  l'URL) est ignorée et jamais rejouée. Ce bug a touché la page de recherche (sous-catégories
  toutes désactivées) et les pages Organismes et Services (mot-clé tapé trop tôt jamais appliqué,
  visible surtout en dev ou sur un appareil lent).
- **Index de recherche en français** : le stemmer français et la double indexation racine + mot
  entier sont définis dans `build/scripts/index-builder/indexes.ts`. Toute fonction de pipeline
  ajoutée là et présente dans le pipeline de recherche doit aussi être enregistrée côté navigateur
  (`initialize()` de `Search.ts`), sinon `lunr.Index.load` échoue.
- **Relations imbriquées** (`sous_categories`, `services`… dans une entité) : limitées à 1000 par
  la requête, sans contrôle possible (Strapi v4 ne renvoie pas de total pour les relations).
- **`getOrganisme(slug)`** interroge un index IndexedDB `slug` alors que les données ont
  `generatedUrl` : toujours `undefined` (non utilisé actuellement).
- **Yarn** : la version est épinglée par `yarnPath` dans `.yarnrc.yml`. N'importe quel `yarn`
  global (y compris le Yarn 1 des runners GitHub et d'Azure Oryx) délègue à ce binaire. La CI
  installe avec `--immutable` : tout changement de dépendances doit être commité avec son `yarn.lock`.
- **CSP** : en dev, définie dans `next.config.mjs` ; en prod, uniquement dans
  `public/staticwebapp.config.json`. Ajouter un domaine externe (images, scripts, tuiles) = mettre
  à jour **les deux**.
- **`next.config.mjs`** : en mode export, `redirects`/`headers` sont supprimés (la redirection
  `/` → `/fr/` en prod est faite par Azure SWA).
- **Fichiers vides / restes d'un autre projet** : `IndexDBManager.ts`, `SearchEngine.ts`,
  regex `passvisitwallonia` dans `images/loader.ts`. Ne pas s'en inspirer.
- **Pas d'`@import url(...)` distant dans le SCSS** : Turbopack les supprime du CSS final. Les
  polices passent par `next/font` (voir `src/app/layout.tsx`, variable CSS `--font-poppins`).
- **Build local sous Windows** : Next 16 y écrit les fichiers de préchargement
  (`__next.*.txt`) dans des sous-dossiers au lieu de noms plats ([vercel/next.js#92339](https://github.com/vercel/next.js/issues/92339)).
  Un `dist/` construit sous Windows renvoie donc des 404 sur ces préchargements (la navigation
  marche quand même, sans préchargement). La CI construit sous Linux et n'est pas concernée :
  ne pas déployer un `dist/` construit sous Windows.
- **Contraintes de versions** :
  - `graphql` reste en 16, car `graphql-request` 7 n'accepte pas la 17 ;
  - TypeScript doit rester < 6.1, à cause de `typescript-eslint` ;
  - les plugins `@graphql-codegen/typescript` et `typescript-operations` restent en 4.x, car
    en 6.x ils génèrent des types d'entrée en double ;
  - `lodash` est forcé en 4.18 dans le lockfile (`yarn set resolution`) pour corriger une faille
    tirée par `@graphql-codegen/plugin-helpers`.
- **Une seule langue** active (`["fr"]` dans `locales.json`), mais tout le routage est préfixé par
  `[language]` : conserver cette structure.

## Git et PR

- `main` → production, `dev` → préproduction (Azure SWA). Travailler sur une branche, PR vers `dev`.
- Danger (`dangerfile.ts`) exige : un titre de PR explicite (≠ nom de branche) et au moins un label
  autre que `major`/`minor`/`patch` (labels utilisés par release-drafter).
- Ne jamais commiter de secret. Le projet n'en a aucun aujourd'hui (Strapi est lu sans authentification) : si un token devient nécessaire, le passer par variable d'environnement / secret GitHub, pas en constante.
