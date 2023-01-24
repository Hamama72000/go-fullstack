const Sauce = require('../models/Sauces');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);// on parse lobjet
    delete sauceObject._id; // on enleve le champ id du corps de la requête
    delete sauceObject._userId;//on utilise luserId du token
    const sauce = new Sauce({
      //création d'1 instance de modèle sauces en lui passant 1objet JS contenant ttes les infos requises du corps de requête analysé (en ayant supprimé en amont le faux_id envoyé par le front-end
      ...sauceObject, //L'opérateur spread ... est utilisé pr faire 1copie de tS les éléments de req.body
      userID: req.auth.userID, 
      imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Pr enregistrer ds la base de données on appelle la méthode save et on retourne 1promesse
    sauce.save()
      .then(() => res.status(201).json({ message: "Sauce enregistrée !" })) //on renvoie 1réponse de réussite ac un code 201 de réussite
      .catch((error) => res.status(400).json({ error })); // renvoie réponse ac erreur générée par Mongoose ainsi qu'un code d'erreur 400
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
      .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
      .catch((error) => res.status(400).json({ error }));
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