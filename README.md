# SkillUp 📚

Application web de révisions pour étudiants : catalogue de ressources, favoris,
planning de tâches et assistant pédagogique basé sur l'IA.

Projet réalisé dans le cadre du cours React.js — IIT, 3ᵉ année Licence GLSI.

## Fonctionnalités

- 🔎 **Catalogue** : recherche par mot-clé et par catégorie (API Open Library)
- 📖 **Détails** : page dédiée pour chaque ressource (route dynamique)
- ⭐ **Favoris** : ajout et retrait, sauvegardés dans le navigateur
- ✅ **Révisions** : création, validation et suppression de tâches avec barre de progression
- 🤖 **Assistant IA** : réponses aux questions de cours (API Google Gemini)
- 🛟 Gestion des états de chargement, des erreurs et des résultats vides

## Technologies

| Outil | Usage |
|---|---|
| React 18 + Vite | Interface et outillage |
| React Router | Navigation entre les pages |
| Open Library API | Données et couvertures des ressources |
| Google Gemini API | Assistant pédagogique |
| localStorage | Persistance des favoris et des tâches |

## Installation

1. Cloner le dépôt
   ```bash
   git clone https://github.com/TON-PSEUDO/skillup.git
   cd skillup
   ```
2. Installer les dépendances
   ```bash
   npm install
   ```
3. Configurer la clé API : copier `.env.example` en `.env.local`, puis y mettre
   sa clé Gemini (gratuite sur [Google AI Studio](https://aistudio.google.com))
   ```
   VITE_AI_API_KEY=ta_cle
   VITE_AI_MODEL=gemini-flash-latest
   ```
4. Lancer le projet
   ```bash
   npm run dev
   ```
   Puis ouvrir http://localhost:5173

## Structure du projet

```
src/
├── components/   Navbar, ResourceCard, Loader
├── pages/        Home, Resources, ResourceDetail, Favorites, Revisions, Assistant
├── services/     api.js (Open Library + Gemini)
├── hooks/        useLocalStorage.js
├── styles/       app.css
├── App.jsx       Routes et état partagé
└── main.jsx      Point d'entrée
```

## Concepts React utilisés

`useState` · `useEffect` · formulaires contrôlés · props · rendu conditionnel ·
listes avec `key` · hook personnalisé · React Router (`NavLink`, `useParams`)

## Captures d'écran

| Accueil | Ressources | Assistant |
|---|---|---|
| ![Accueil](docs/accueil.png) | ![Ressources](docs/ressources.png) | ![Assistant](docs/assistant.png) |

## Auteurs

- Eya Benmefteh

## Licence

MIT