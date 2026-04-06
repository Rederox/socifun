# Socifun 🎮

Bienvenue dans Socifun, votre plateforme de jeux en ligne préférée ! Ce projet est une application web moderne construite avec Next.js, conçue pour offrir une expérience engageante dans la découverte et le jeu de jeux en ligne.

## Table des matières

- [Fonctionnalités principales](#fonctionnalités-principales)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Démarrage](#démarrage)
  - [Installation](#installation)
  - [Variables d'environnement](#variables-denvironnement)
  - [GraphQL Codegen](#graphql-codegen)
  - [Lancer le serveur de développement](#lancer-le-serveur-de-développement)
- [Utilisation](#utilisation)
- [Configuration](#configuration)
- [Contribution](#contribution)
- [Licence](#licence)
- [Remerciements](#remerciements)

## Fonctionnalités principales

Socifun vise à offrir une expérience interactive riche avec des fonctionnalités telles que :

- **Catalogue de jeux étendu** : Parcourez et découvrez une grande variété de jeux en ligne.
- **Filtrage par catégories et tags** : Trouvez facilement des jeux par catégories ou tags spécifiques.
- **Pages de jeux détaillées** : Des pages dédiées à chaque jeu, fournissant des informations et un accès direct.
- **Profils utilisateurs** : Gérez votre profil personnel et vos préférences.
- **Avatars personnalisables** : Personnalisez votre expérience avec un large éventail d'options d'avatar incluant accessoires, types de corps, vêtements, et plus encore.
- **Pagination dynamique** : Naviguez efficacement dans les listes de jeux ou autres contenus.
- **Intégration GraphQL** : Récupérez et gérez les données de jeux depuis des API externes de manière fluide.
- **Design responsive** : Une interface conviviale optimisée pour différents appareils.

## Technologies utilisées

Socifun est construit avec une stack moderne et robuste pour garantir performance, évolutivité et expérience développeur.

### Langages

- JavaScript
- TypeScript

### Frameworks & Bibliothèques

- **Next.js** : Un framework React pour la production, permettant le rendu côté serveur et la génération de sites statiques.
- **Node.js** : Runtime JavaScript pour les opérations côté serveur.
- **GraphQL Codegen** : Outil de génération de types TypeScript et de hooks à partir de schémas et d'opérations GraphQL.
- **Apollo Client** (impliqué par le plugin `typescript-react-apollo`) : Une bibliothèque complète de gestion d'état pour GraphQL.

## Structure du projet

Le projet suit une structure bien organisée, typique des applications Next.js :

```
├── .env                  # Variables d'environnement pour la production/développement
├── .env.example          # Exemple de variables d'environnement
├── .eslintrc.json        # Configuration ESLint pour la qualité du code
├── .gitignore            # Fichiers et dossiers ignorés par Git
├── .vscode/              # Paramètres spécifiques à VS Code
│   └── settings.json
├── README.md             # Documentation du projet (ce fichier)
├── app/                  # Répertoire racine de l'App Router Next.js
│   ├── Category/         # Route dynamique pour les catégories de jeux
│   │   └── [Category]/
│   │       └── page.tsx
│   ├── Game/             # Route dynamique pour les pages de jeux individuels
│   │   └── [prod]/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── Profile/          # Page de profil utilisateur
│   │   └── page.tsx
│   └── Tag/              # Route dynamique pour les tags de jeux
│       └── [Tag]/
│           └── page.tsx
├── codegen.ts            # Configuration de GraphQL Codegen
├── components/           # Composants UI réutilisables
│   └── Avatar/
│       └── avatarOptions.ts # Options de personnalisation des avatars
├── graphql/              # Répertoire pour les documents de requêtes, mutations et souscriptions GraphQL
├── lib/                  # Fonctions utilitaires
│   └── pagination.ts     # Logique de pagination
└── generated.tsx         # Types et hooks GraphQL auto-générés (résultat du codegen)
```

## Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

- **Node.js** : [Version LTS recommandée](https://nodejs.org/en/download/)
- **npm** ou **Yarn** : Gestionnaire de paquets Node.js (npm est inclus avec Node.js, Yarn peut être installé séparément).

## Démarrage

Suivez ces étapes pour faire fonctionner Socifun sur votre machine locale.

### Installation

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/Rederox/socifun.git
   cd socifun
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   # OU
   yarn install
   ```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet en copiant `.env.example` :
```bash
cp .env.example .env
```
Ouvrez `.env` et configurez les variables d'environnement nécessaires. Bien qu'aucune variable critique spécifique ne soit listée, les futures clés API ou configurations de services externes iront ici.

### GraphQL Codegen

Ce projet utilise GraphQL Codegen pour générer des types TypeScript et des hooks React à partir du schéma GraphQL de l'API Gamedistribution.

Pour générer les fichiers nécessaires :

```bash
npm run generate # (Vous devrez peut-être ajouter "generate": "graphql-codegen" à vos scripts package.json)
# OU
yarn generate
```
*(Note : Assurez-vous que `graphql-codegen` est installé globalement ou en tant que dépendance de développement, et que le script `graphql-codegen` est défini dans votre `package.json` pour que cette commande fonctionne.)*

### Lancer le serveur de développement

Démarrez le serveur de développement Next.js :

```bash
npm run dev
# OU
yarn dev
```

Ouvrez votre navigateur et accédez à `http://localhost:3000`. Vous devriez voir l'application Socifun en cours d'exécution.

## Utilisation

Une fois l'application lancée, vous pouvez :

- **Parcourir les jeux** : Naviguez via `/Category/[category]` ou `/Tag/[tag]` pour explorer les jeux selon différentes classifications.
- **Voir les détails d'un jeu** : Cliquez sur n'importe quel jeu pour accéder à sa page dédiée `/Game/[prod]/[slug]` et obtenir plus d'informations.
- **Gérer votre profil** : Accédez à votre profil utilisateur via `/Profile`.
- **Personnaliser votre avatar** : Explorez les options de personnalisation d'avatar grâce aux nombreux choix définis dans `components/Avatar/avatarOptions.ts`.
- **Explorer les endpoints API** : Le projet inclut une démonstration de route API basique sur `/api/hello`, retournant "Hello, Next.js!".

## Configuration

- **Variables d'environnement (`.env`)** : Personnalisez divers paramètres comme les endpoints API, les secrets ou d'autres configurations spécifiques à l'environnement.
- **GraphQL Codegen (`codegen.ts`)** : Ajustez la source du schéma GraphQL (`https://gd-website-api.gamedistribution.com/graphql`), les chemins des documents (`graphql/**/*.graphql`), et les paramètres de génération selon vos besoins.
- **ESLint (`.eslintrc.json`)** : Modifiez les règles de linting pour correspondre à vos standards de style et de qualité préférés.
- **TypeScript (`tsconfig.json`)** : Configurez les options du compilateur TypeScript.

## Contribution

Nous accueillons les contributions à Socifun ! Si vous souhaitez contribuer, veuillez suivre ces étapes :

1. **Forkez** le dépôt.
2. **Clonez** votre dépôt forké : `git clone https://github.com/VotreNomUtilisateur/socifun.git`
3. **Créez une nouvelle branche** : `git checkout -b feature/nom-de-votre-fonctionnalite`
4. **Effectuez vos modifications** en vous assurant qu'elles respectent les standards de codage du projet (vérifiez avec ESLint).
5. **Commitez vos modifications** : `git commit -m "feat: Ajout d'une nouvelle fonctionnalité"`
6. **Poussez** vers votre branche : `git push origin feature/nom-de-votre-fonctionnalite`
7. **Ouvrez une Pull Request** vers la branche `main` du dépôt original.

## Remerciements

- Construit avec [Next.js](https://nextjs.org/).
- Exploite l'[API Gamedistribution](https://gamedistribution.com/) pour les données de jeux.
- Utilise [GraphQL Codegen](https://www.graphql-code-generator.com/) pour des opérations GraphQL typées.
