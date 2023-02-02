const Sauce = require("../models/Sauces");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); // on parse lobjet
  delete sauceObject._id; // on enleve le champ id du corps de la requête
  // delete sauceObject._userID;//on utilise luserID du token
  const sauce = new Sauce({
    //création d'1 instance de modèle sauces en lui passant 1objet JS contenant ttes les infos requises du corps de requête analysé (en ayant supprimé en amont le faux_id envoyé par le front-end
    ...sauceObject, //L'opérateur spread ... est utilisé pr faire 1copie de tS les éléments de req.body
    userID: req.auth.userID,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
  });
  // Pr enregistrer ds la base de données on appelle la méthode save et on retourne 1promesse
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" })) //on renvoie 1réponse de réussite ac un code 201 de réussite
    .catch((error) => res.status(400).json({ error: error })); // renvoie réponse ac erreur générée par Mongoose ainsi qu'un code d'erreur 400
};

exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userID != req.auth.userID) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          if (req.file) {
            `sauce.imageUrl = ${req.protocol}://${req.get("host")}/images/${req.file.filename};`;
          }
          Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id, imageUrl: sauce.imageUrl })
            .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userID != req.auth.userID) {
        res.status(401).json({ message: "Non authorisé!" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce suprimée !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //pr trouver la sauce unique ayant le même _id que le paramètre de la requête ;
    .then((sauce) => res.status(200).json(sauce)) //cette sauce est retournée ds une promesse et envoyée ensuite au front end
    .catch((error) => res.status(404).json({ error })); // renvoie l'erreur 404 pour dire sauce non trouvée
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //pour récupérer la sauce spécifique que l'on veut mettre à jour
    .then((sauce) => {
      console.log('--> body', req.body, sauce.usersDisliked.includes(req.body.userId))
      // quand on ajoute 1 like
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        console.log('--> 1')
        //'include' permet de verifier qu'une même utilisteur ne like pas plusieurs fois la même sauce
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }  })
          .then(() => res.status(200).json({ message: "sauce likée!" }))
          .catch((error) => res.status(400).json({ zzz: "eee",sauce, error }));
        return
      }

      // like neutre = 0 (quand on enlève son like)
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        console.log('--> 2')

        //'include' permet de verifier qu'une même utilisteur ne like pas plusieurs fois la même sauce
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } } // on incremente à -1 donc on revient à 0, pull permet de retirer le userId du tabeau
        )
          .then(() => res.status(200).json({ message: "like neutre!" }))
          .catch((error) => res.status(400).json({ error }));
        return
      }

      // like= -1
      if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
        console.log('--> 3')

        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } } // on incremente à -1 donc on revient à 0, pull permet de retirer le userId du tabeau
        )
          .then(() => res.status(200).json({ message: "sauce dislikée!" }))
          .catch((error) => res.status(400).json({ error }));
        return
      }

      // Dislike neutre (quand on retire le dislike)
      if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
        console.log('--> 4')

        //'include' permet de verifier qu'une même utilisteur ne like pas plusieurs fois la même sauce
        Sauce.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } } // on incremente à -1 donc on revient à 0, pull permet de retirer le userId du tabeau
        )
          .then(() => res.status(200).json({ message: "dislike neutre!" }))
          .catch((error) => res.status(400).json({ error }));
        return
      }
    })
    .catch((error) => res.status(400).json({ aa: "ee", error }));
};
