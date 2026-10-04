# MonBo Réseau

Annuaire en ligne des organismes d'aide sociale et de santé de la région de Mons
([monboreseau.be](https://monboreseau.be)), réalisé pour Médecins du Monde Belgique.

Site Next.js exporté en statique, alimenté par un Strapi headless (GraphQL) et déployé sur Azure
Static Web Apps. La recherche d'organismes (par mot-clé, public et thématique, avec carte)
fonctionne entièrement dans le navigateur.

## Démarrer

Prérequis : Node 22 et Yarn, quelle que soit sa version : le dépôt embarque Yarn 4.15 (`.yarn/releases/`).

```bash
yarn install
yarn start
```

Puis ouvrir http://localhost:3000 (redirige vers `/fr/`). Les pages sont lues en direct depuis
`https://strapi.monboreseau.be` ; la recherche utilise les données figées de `build/static/`.

Pour rafraîchir ces données depuis Strapi :

```bash
yarn build:pre
```

## Scripts

| Commande | Effet |
| --- | --- |
| `yarn start` | Serveur de développement |
| `yarn build:pre` | Télécharge les données Strapi, construit les index de recherche et les sitemaps |
| `yarn build:static` | Prebuild + export statique dans `dist/` |
| `yarn graphql` | Régénère le SDK GraphQL typé (`src/services/GraphQL.ts`) |
| `yarn tsc-check` | Vérification TypeScript |

## Documentation

- [AGENTS.md](AGENTS.md) — conventions, recettes et pièges (pour humains comme pour agents IA)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — build, routage, données, algorithme de recherche, déploiement

## Déploiement

- `dev` → préproduction, `main` → production (GitHub Actions + Azure Static Web Apps).
- Après une modification de contenu dans Strapi, relancer le workflow **Strapi - Manual deploy**.

Conçu par Alexian Moins et Lucas Lopez.
