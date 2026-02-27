# 4eva - Le Cosmos comme Ayah

Une application web complète pour un couple musulman passionné par la géomatique, le spatial et les sciences connexes.

## Thème Central

**"Le Cosmos comme Ayah (signe divin)"**

Slogan : *"Contempler la création pour se rapprocher du Créateur"*

Inspiration coranique : Sourate Fussilat 41:53 – « Nous leur montrerons Nos signes dans l'univers et en eux-mêmes jusqu'à ce qu'il leur devienne évident que c'est la vérité »

## Technologies Utilisées

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS (thème sombre mystique rose/purple/indigo)
- **Backend**: Supabase (Auth + Database + Realtime + Storage)
- **Routing**: React Router v6
- **3D Graphics**: THREE.js + @react-three/fiber
- **Maps**: Leaflet.js
- **Astronomy**: SunCalc pour calculs lunaires et solaires

## Fonctionnalités Principales

### 1. Page d'Accueil (/)
- Messages rotatifs multilingues (français, arabe, wolof, anglais, espagnol, allemand)
- Calendrier lunaire vivant (hégirien + grégorien)
- Widget "Le Ciel du jour" avec :
  - Phase lunaire actuelle
  - Direction Qibla géolocalisée
  - Horaires de prière
- Lune 3D animée et interactive

### 2. Authentification Supabase
- Inscription et connexion par email/mot de passe
- Routes protégées avec AuthGuard
- Gestion de session automatique

### 3. Dashboard (protégé)
- Liste des week-ends partagés
- Affichage conditionnel :
  - Si futur : compteur + mini-jeux
  - Si disponible : contenu complet

### 4. Bibliothèque de Savoir
- Articles sur :
  - Histoire de l'astronomie islamique
  - Géomatique dans le monde musulman
  - Exploration spatiale et Islam
- Système de catégories et tags
- Lecture d'articles complète

### 5. Carte Interactive
- Sites historiques du monde musulman
- Mosquées, observatoires, centres de savoir
- Popups informatifs avec anecdotes

### 6. Journal de Contemplation (protégé)
- Espace privé pour notes et réflexions
- Références coraniques
- Types d'observations (céleste, spirituelle, scientifique)

### 7. Quiz de Connaissance (protégé)
- Questions sur astronomie coranique et sciences islamiques
- Système de badges (Étoile Parfaite, Lune Croissante, Constellation)
- Explications détaillées des réponses

### 8. Méditation Guidée
- Sessions audio avec versets cosmiques
- Pauses de silence pour contemplation
- 3 méditations disponibles

### 9. Ressources Externes
- Liens curatés vers NASA, Stellarium, applications musulmanes
- Organisés par catégories

## Structure de la Base de Données

### Tables Créées
- `weekends` : expériences partagées
- `articles` : bibliothèque de connaissance
- `contemplation_entries` : journal privé
- `quiz_questions` : questions de quiz
- `quiz_attempts` : résultats et badges

Toutes les tables ont RLS (Row Level Security) activé pour la sécurité.

## Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## Configuration

Les variables d'environnement sont dans `.env.local` :

```
VITE_SUPABASE_URL=https://mshlwxkgwufunwmardov.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Thème Visuel

- **Fond** : gradient-to-br from-rose-950 via-purple-950 to-indigo-950
- **Textes** : rose-100 / rose-200
- **Accents** : rose-500, purple-500, indigo-500
- **Cartes** : bg-white/5 backdrop-blur-xl avec bordures lumineuses
- **Ambiance** : sombre, mystique, lunaire, élégante, spirituelle

## Architecture du Code

```
src/
├── components/
│   ├── home/           # Composants page d'accueil
│   ├── AuthGuard.tsx   # Protection routes
│   ├── Header.tsx      # En-tête navigation
│   └── Layout.tsx      # Layout principal
├── pages/              # Pages de l'application
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   ├── Library.tsx
│   ├── Map.tsx
│   ├── Journal.tsx
│   ├── Quiz.tsx
│   ├── Meditation.tsx
│   └── Resources.tsx
├── lib/
│   └── supabase.ts     # Client Supabase
├── hooks/
│   └── useAuth.ts      # Hook d'authentification
├── types/
│   └── index.ts        # Types TypeScript
└── App.tsx             # Routes principales
```

## Données de Démonstration

La base de données contient des articles pré-remplis sur :
- Al-Battani (astronomie islamique)
- Observatoire de Maragha
- Géomatique au service du Hajj
- Prière dans l'espace

Et des questions de quiz sur l'astronomie coranique et l'histoire des sciences islamiques.

## Fonctionnalités Avancées

### Géolocalisation
L'application utilise l'API de géolocalisation du navigateur pour :
- Calculer la direction de la Qibla
- Afficher les horaires de prière locaux
- Fallback automatique sur Dakar si géolocalisation refusée

### Calendrier Hijri
Utilise `Intl.DateTimeFormat` avec calendrier islamique pour afficher les dates hégirien parallèlement au calendrier grégorien.

### 3D Moon
Lune interactive en 3D avec :
- Rotation basée sur la phase lunaire réelle
- Contrôles orbit pour exploration
- Éclairage réaliste

## Prochaines Étapes Possibles

- Upload de photos dans le journal (Supabase Storage)
- Notifications pour nouveaux week-ends
- Partage d'articles favoris
- Mode sombre/clair (actuellement uniquement sombre)
- Version mobile native
- API pour horaires de prière plus précis

## Licence

Projet personnel pour usage privé.

---

**"Dis : Parcourez la terre et voyez comment Il a commencé la création"** - Al-Ankabut 29:20
