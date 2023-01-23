/*Importation express en créant une const express */
const express = require('express');
const bodyParser = require('body-parser');

/* Importation de Mongoose dans app.js*/
const mongoose = require('mongoose');
const SaucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://maya7223:Algerie72000@cluster0.grbdexh.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/*Création d'une app express*/
const app = express();

/* Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON.*/
app.use(express.json()); /* donne accès au corps de la requête POST*/

/*Permet à l'appli d'accéder à l'API sans pb */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); /* l'étoile précise que tout le monde peut y accéder */
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();/* On n'oublie pas de passer next pour passer à la middelware suivante*/
  });

app.use(bodyParser.json());

app.use('/api/sauces', SaucesRoutes);
app.use('/api/auth', userRoutes);

  
/*Puis on exporte cette app/const pr qu'on puisse y accéder depuis d'autres 
  fichiers notamment depuis notre serveur node */
module.exports = app;