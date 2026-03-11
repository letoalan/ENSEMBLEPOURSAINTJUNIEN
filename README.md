# Ensemble pour Saint-Junien - Campagne Municipale 2026 🇫🇷

Site web officiel de campagne pour la liste **"Ensemble pour Saint-Junien"** menée par **Hervé Beaudet**.

Ce projet est un site statique moderne (HTML5, CSS3, JavaScript Vanilla) conçu pour présenter le programme, l'équipe et l'agenda de la campagne, avec un design soigné et responsive respectant la charte graphique.

## 🚀 Fonctionnalités Clés

*   **Header Vidéo Immersif** : Intégration YouTube avec overlay et lecture automatique.
*   **Design Responsive** : Adapté aux mobiles, tablettes et desktops.
*   **Navigation Fluide** : Menu burger sur mobile et navigation sticky.
*   **Présentation de l'Équipe** : Grille "Masonry" pour les profils des candidats avec modal vidéo.
*   **Programme Interactif** : Accordéon coloré pour découvrir les axes du projet.
*   **Agenda** : Timeline verticale pour les événements de campagne.
*   **Formulaire de Contact** : Interface claire pour rejoindre le mouvement.
*   **Performance & Accessibilité** : Polices Google Fonts (Montserrat) hébergées localement pour la conformité RGPD et la performance hors ligne.

## 🛠 Technologies Utilisées

*   **HTML5** : Structure sémantique.
*   **CSS3** : 
    *   Variables CSS (`:root`) pour la gestion facile des couleurs.
    *   Flexbox & Grid pour les mises en page.
    *   Animations et transitions douces.
*   **JavaScript (Vanilla)** : 
    *   Gestion du menu mobile.
    *   Logique de l'accordéon.
    *   Effets de défilement (Scroll Header).
    *   Modales vidéo.
*   **FontAwesome 6** : Icônes vectorielles (hébergées localement).

## 📂 Structure du Projet

```
.
├── index.html          # Page principale
├── styles.css          # Feuilles de style globales
├── script.js           # Logique JavaScript
├── README.md           # Documentation du projet
└── assets/
    ├── css/            # Styles spécifiques (polices, icônes)
    │   ├── fontawesome.css
    │   └── montserrat.css
    ├── fonts/          # Fichiers de police (woff2, ttf)
    │   ├── fontawesome/
    │   └── montserrat/
    └── images/         # Images du site (placeholders actuels)
```

## 🔧 Installation et Lancement Local

Ce projet ne nécessite aucun build process complexe (pas de npm, webpack, etc.). Il fonctionne directement dans le navigateur.

### Prérequis

*   Un navigateur web moderne (Chrome, Firefox, Edge, Safari).
*   Optionnel : Une extension comme "Live Server" pour VS Code pour le développement.

### Étapes

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/votre-utilisateur/ENSEMBLEPOURSAINTJUNIEN.git
    cd ENSEMBLEPOURSAINTJUNIEN
    ```

2.  **Ouvrir le projet** :
    *   Ouvrez le fichier `index.html` directement dans votre navigateur.
    *   OU utilisez une extension de serveur local (recommandé pour éviter certains blocages de sécurité liés aux fichiers locaux).

## 🎨 Charte Graphique

*   **Couleur Principale (Rose)** : `#d64370`
*   **Couleur Secondaire (Vert)** : `#4a9d5f`
*   **Typographie** : Montserrat (Bold pour les titres, Regular pour le corps).

## 📝 Auteur

Développé pour la campagne **Ensemble pour Saint-Junien**.

---
*Ensemble, construisons l'avenir de Saint-Junien !*
