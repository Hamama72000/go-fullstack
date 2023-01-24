//multer est un package de gestion de fichiers.

const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


/*Création constante storage à passer à multer comme configuration, qui contient la logique nécessaire 
pour indiquer à multer où enregistrer les fichiers entrants :*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => { //la fonction destination indique à multer d'enregistrer les fichiers ds le dossier images
    callback(null, 'images'); // on dit null ici pour dire qu'il n'a pas eu d'erreurs
  },

  /*fonction filename indique à multer d'utiliser le nom d'origine, remplacer les espaces par des 
  underscores et d'ajouter 1 timestamp Date.now() comme nom de fichier. Elle utilise ensuite la constante
  dictionnaire de type MIME pour résoudre l'extension de fichier appropriée*/
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

/*Nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage 
et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image*/
module.exports = multer({storage: storage}).single('image');