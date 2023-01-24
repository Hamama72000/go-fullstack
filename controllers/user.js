/*importation de bcrypt pour le cryptage. La méthode  hash()  de bcrypt crée un hash crypté des mots 
de passe des utilisateurs pr les enregistrer de manière sécurisée ds la base de données.*/

const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

//pour la création des middelwares on a besoin des users
const User = require("../models/User"); 

//Pour la création de nx users
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) //fonction de hachage on demande de « saler » le mot de passe 10 fois. + la valeur est élevée, + l'exécution de la fonction sera longue, et + le hachage sera sécurisé.
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    
    .catch((error) => {
      console.log("----------->error1", error);
      res.status(500).json({ error });
    }
)};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
        });
    })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
    //erreur server (de traitement)
};

