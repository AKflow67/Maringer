# Métallerie Maringer — Site web

## Structure du dossier

```
metallerie-maringer/
├── index.html          ← le site complet
└── images/
    ├── logo-sans-fond.png         ← Logo_Henri_sans_fond.png (déjà le bon nom, juste copier)
    ├── hero-serre-atelier.jpg     ← Serre_en_fabrication_à_l_atelier.jpg
    ├── serre-posee.jpg            ← Pose_de_la_serre_.jpg (la meilleure vue d'ensemble)
    ├── garde-corps-colombage.jpg  ← Garde_corps_forgé_.jpg (le beau avec la maison à colombage)
    ├── pietement-bronze.jpg       ← Pietement_bronze_.jpg (le beau piètement isolé)
    ├── verriere-interieure.jpg    ← verrières_et_portes.jpg
    ├── detail-engrenage.jpg       ← IMG_20260401_003338__3_.jpg (le gros plan engrenage)
    └── henri-soude.jpg            ← Henri_qui_soude.jpg
```

## À faire avant de mettre en ligne

### 1. Formspree (formulaire de contact)
- Créer un compte gratuit sur https://formspree.io
- Créer un nouveau formulaire, noter l'ID (ex: `xpzgkdno`)
- Ouvrir index.html, chercher `VOTRE_ID_FORMSPREE`
- Remplacer par l'ID : `action="https://formspree.io/f/xpzgkdno"`

### 2. Images
- Copier/renommer les images selon le tableau ci-dessus dans le dossier `images/`
- Optionnel mais recommandé : convertir en WebP et réduire à max 1920px de large
  → outil gratuit : squoosh.app

### 3. Logo
- Le logo est en PNG fond blanc — il fonctionne tel quel dans le footer (filtre invert appliqué)
- Pour le header sur fond sombre il sera automatiquement en blanc (filtre CSS)
- Si tu as une version SVG ou PNG fond transparent, c'est encore mieux

### 4. Déploiement GitHub + Netlify
1. Créer un repo GitHub `metallerie-maringer`
2. Pusher le dossier complet
3. Sur Netlify : "New site from Git" → sélectionner le repo
4. Une fois le domaine metalleriemaringer.fr récupéré : Netlify > Domain settings > Add custom domain

### 5. Vérifier le lien Facebook
- Chercher `facebook.com/metalleriemaringer` dans index.html
- Vérifier que c'est bien l'URL exacte de la page FB d'Henri

## Notes techniques
- Site 100% statique, zéro PHP, zéro WordPress
- HTTPS automatique via Netlify
- Aucune dépendance externe sauf Google Fonts
- Compatible tous navigateurs modernes + mobile
