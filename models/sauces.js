const mongoose = require('mongoose');

/*Création d'un schéma de données avec toutes les infos que les sauces ont besoin */
const saucesSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

/*Et on exporte le modèle correspondant qu'on pourra utiliser pr interagir ac base de données MongoDB */
module.exports = mongoose.model('Sauces', saucesSchema);