/*Importation express en créant une const express */
const { json } = require('express');
const express = require('express');

/*Création d'une app express*/
const app = express();

/*Création de 4 fonctions (appelées "middlware")*/
/*le 1er enregistre « Requête reçue ! » ds la console et passe l'exécution*/
app.use((req, res, next) => {
    console.log('Requête reçue!');
    next();
});

/*le 2ème ajoute un code d'état 201 à la réponse et passe l'exécution*/
app.use((req, res, next) => {
   res.status(201);
   next();
});

/* le 3e envoie la réponse JSON et passe l'exécution*/
app.use((req, res, next) => {
    res.json({message: 'Votre requête a bien été reçue!'});
});

/*le 4e enregistre « Réponse envoyée avec succès ! » ds la console.*/
app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès!');
});



/*Puis on exporte cette app/const pr qu'on puisse y accéder depuis d'autres 
fichiers notamment depuis notre serveur node */
module.exports = app;


app js

/*pour recevoir les données via la console car on a pas encore de base de données*/
app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;// on enleve le champ id du corps de la requête
    const sauces = new sauces({ //création d'1 instance de modèle sauces en lui passant un objet JavaScript contenant ttes les infos requises du corps de requête analysé (en ayant supprimé en amont le faux_id envoyé par le front-end
      ...req.body //L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
    });
    // Pour enregistrer dans la base de données on appelle la méthode
    sauces.save() 
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
    });