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

### 4. Déploiement (en production depuis le 09/09/2026)
- Site en ligne : https://metalleriemaringer.com (hébergement OVH 100M d'Henri, cluster129, dossier /www)
- Chaque push sur `main` déploie automatiquement via GitHub Actions (`.github/workflows/deploy.yml`, FTP) - secrets FTP_SERVER / FTP_USERNAME / FTP_PASSWORD dans le repo
- metalleriemaringer.fr, www et http redirigent en 301 vers https://metalleriemaringer.com (redirections OVH + .htaccess)
- Email public : contact@metalleriemaringer.com (boite MX Plan OVH ; contact@metalleriemaringer.fr est redirige vers elle)
- Formulaire de contact : contact.php (mail() PHP 8.3) -> merci.html
- Cache-busting : les pages referencent `main.js?v=AAAAMMJJ` et `style.css?v=AAAAMMJJ` - incrementer la version a chaque modif de JS/CSS
- L'ancien miroir maringer.netlify.app reste branche sur le repo (sans effet sur la prod)

### 5. Vérifier le lien Facebook
- Chercher `facebook.com/metalleriemaringer` dans index.html
- Vérifier que c'est bien l'URL exacte de la page FB d'Henri

## Notes techniques
- Site 100% statique, zéro PHP, zéro WordPress
- HTTPS automatique via Netlify
- Aucune dépendance externe sauf Google Fonts
- Compatible tous navigateurs modernes + mobile
