const mongoose = require('mongoose');

/*Création d'un schéma de données avec toutes les infos que les sauces ont besoin */
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  manufacturer: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: Array, required: true, default:[] },
  usersDisliked: { type: Array, required: true, default:[] },
}, {
  writeConcern: {
    j: true,
    wtimeout: 1000
  }
});

/*Et on exporte le modèle correspondant qu'on pourra utiliser pr interagir ac base de données MongoDB */
module.exports = mongoose.model('Sauce', sauceSchema);