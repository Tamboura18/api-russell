API de gestion du port de plaisance Russell
Présentation
Cette API permet de gérer les catways, les réservations et les utilisateurs du port de plaisance Russell. Elle est développée avec Node.js, Express et MongoDB.
Fonctionnalités
Authentification des utilisateurs avec un jeton JWT.
Gestion des catways : consultation, création, modification et suppression.
Gestion des réservations.
Gestion des utilisateurs.
Validation des données reçues par l’API.
Interface web de connexion et tableau de bord.
Technologies utilisées
Node.js
Express.js
MongoDB
Mongoose
JSON Web Token (JWT)
bcryptjs
HTML, CSS et JavaScript
Installation
Cloner le dépôt Git :
Entrer dans le dossier du projet :
Installer les dépendances :
Créer un fichier .env à la racine du projet et configurer les variables d’environnement nécessaires.
Exemple :
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/russell
JWT_SECRET=remplacer_par_une_cle_secrete
Adapter l’adresse MongoDB au nom de la base de données utilisée dans votre environnement.

Lancement
Pour démarrer le serveur :
npm start
Pour démarrer le serveur en mode développement avec redémarrage automatique :
npm run dev
L’API est accessible à l’adresse suivante si le serveur utilise le port 3000 :
http://localhost:3000
Tests
Pour lancer les tests automatisés :
npm test
Les tests vérifient notamment la syntaxe des fichiers JavaScript et certaines validations des données.

Sécurité
Les mots de passe doivent être stockés sous forme de hachage.
Les routes protégées nécessitent un jeton d’authentification valide.
Les variables sensibles doivent rester dans le fichier .env.
Le fichier .env ne doit pas être envoyé sur GitHub.
Auteur
Projet pédagogique de développement d’une API REST pour la gestion du port de plaisance Russell.