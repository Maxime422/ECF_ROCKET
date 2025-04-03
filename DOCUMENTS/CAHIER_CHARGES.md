# Cahier des charges ECF Rocket Dev

Fichier créé le 04/03/2025 - Notion

Créateur [Maxime422](https://github.com/Maxime422)

---

## **Sommaire d’étapes :**

**Conception :**

- **💡 Recherche graphique, inspirations, analyses des concurrents**
- **💡 Rédaction du cahier des charges**
- **💡 Définition de l’identité visuelle**
- **💡 Maquettage et prototypage**
- **💡 Validation des étapes de maquettage**

**Développement :**

- **💡 Développement**
- **💡 Dépendances**

**Tests et corrections :**

- **💡 Tests de qualité du code**
- **💡 Tests SonarQube**
- **💡 Tests d'accessibilité**
- **💡 Check-up du projet**
- **💡 Optimisation**

**Rédaction :**

- **💡 Mise en place du RGPD**
- **💡 Rédaction du ReadMe**

**Déploiement :**

- **💡 Déploiement GitHub pages**
- **💡 Validation de l’ensemble des liens, checkup des étapes**
- **💡 Déploiement PWA**

---

## **1. Objectifs :**

**- 💡 Objectif principal :** Créer un site pour la nouvelle start-up La rocket dev, l’objectif du projet est de créer un pokédex en ligne pour aider les dresseurs à explorer, découvrir et en apprendre plus sur leurs Pokémon préférés.

Le Pokédex doit être à la fois fonctionnel, esthétique et ludique. Les dresseurs doivent avoir envie de l’utiliser pour tout savoir sur les Pokémon, de Bulbizarre à Dracaufeu en passant par les légendaires comme Pikachu (oui, on sait, il n’est pas légendaire, mais il est quand même le boss).

---

## **2. Contraintes :**

**- 🖥 Technologies et langages utilisés :** HTML, CSS, JavaScript, …

**- 📱 Compatibilité :** navigateurs, responsive design, intégration PWA.

**- 📜 Légales & Normatives :** Respect du RGPD et des normes d’accessibilité (WCAG).

**- ⁉️ API :** L’API PokeAPI ([https://pokeapi.co](https://pokeapi.co/)) pour récupérer les données des Pokémon.

---

## **3. Les fonctionnalités :**

➡️ **Header :**

- Un logo de Pokédex ou de Rocket Dev.
- Une barre de recherche pour trouver un Pokémon par son nom ou son numéro.

**➡️ Section "Découvrir les Pokémon" :**

- Une liste de Pokémon affichée sous forme de cartes, vignette ou de grille.
- Chaque carte doit montrer :
    - Une image du Pokémon.
    - Son nom et son numéro pokédex.
    - Ses types (feu, eau, plante, etc.).
- Doit pouvoir être classé par région (Kanto, Johto, etc …) ou par type.
- Un bouton pour afficher plus de détails (voir ci-dessous).

**➡️ Fiche détaillée du Pokémon :**

- Lorsqu’on clique sur un Pokémon, une fiche détaillée s’affiche dans une nouvelle page avec :
    - Une image animée ou statique du Pokémon.
    - Ses statistiques (points de vie, attaque, défense, etc).
    - Ses évolutions (si elles existent).
    - Une description (selon votre inspiration).

**➡️ Section "Mon équipe pokémon" :**

- Permettre à l’utilisateur d’ajouter des Pokémon à son équipe (ses favoris).

**➡️ Footer, au minimum :**

- Votre nom et prénom (parce que vous êtes le maître Pokémon du code).

---

## **4. Validation :**

**✅ La conception de la maquette :** modernité, ergonomie, et respect des contraintes mobiles et desktop.

**✅ L’utilisation d’un HTML sémantique :** adapté au référencement et aux bonnes pratiques.

**✅ Les bonnes pratiques CSS et JS :** code propre, réutilisable et maintenable.

**✅ Le design responsive :** le site doit être utilisable sur mobile, tablette et desktop.

**✅ La lisibilité du code :** commentaires, indentation, et organisation du code.

---

## **4. Les contraintes :**

**❌ Maquettage :**

- Créez une maquette mobile et desktop avant de coder. Utilisez l’outil de votre choix (Figma, Adobe XD, etc.).

**❌ Intégration :**

- Le site doit être codé en HTML5, CSS3 et JavaScript.
- Vous pouvez utiliser un framework CSS (comme Bootstrap ou Tailwind) si vous le souhaitez.

**❌ Balises sémantiques :**

- Le code HTML doit être propre, sémantique et sans erreur au validateur W3C ([https://validator.w3.org](https://validator.w3.org/)).

**❌ Organisation :**

- Le code doit être bien structuré, avec des fichiers séparés pour le HTML, CSS et JavaScript.
- Le dossier doit être organisé de manière logique.

**❌ Versionning :**

- Le code doit être versionné avec Git et hébergé sur un repo distant (GitHub ou Gitlab).

**❌ Design :**

- Le site ne doit pas ressembler à un site “nineties” (sauf si vous voulez faire un hommage à l’époque où les Pokémon étaient en pixels, mais c’est déconseillé).
- Utilisez des icônes modernes (FontAwesome, Google Fonts, etc.) et des couleurs pour rester dans l’esprit Pokémon.

---

## **5. Bonus :**

**🚀 Animations CSS :**

- Ajoutez des animations quand un Pokémon est sélectionné ou ajouté aux favoris (exemple : une Pokéball qui s’ouvre).

**🚀 Mode sombre :**

- Pour les dresseurs de Pokémon nocturnes, ajoutez un mode sombre stylé.

**🚀 Comparaison de Pokémon :**

- Permettez à l’utilisateur de comparer deux Pokémon (taille, poids, statistiques, etc.).

**🚀 Évolution animée :**

- Montrez les évolutions d’un Pokémon avec une animation fluide.

**🚀 Easter Egg :**

- Cachez un Easter Egg rigolo (via par exemple la combinaison des touches du clavier ou si on cherche "Mew", affichez un message secret).
