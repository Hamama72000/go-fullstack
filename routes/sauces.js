//création d'un router qu'on va importer dans l'app
const express = require("express");
const auth = require('auth');
const router = express.Router();

const SaucesCtrl = require('../controllers/sauces');

/* route qui permet d'afficher les articles*/
router.get("/", SaucesCtrl.getAllSauces);

/*routes pr recevoir données via la console car pas encore de base de données+on voit ce qu'elles font: crer, modifier etc)*/
router.post('/', SaucesCtrl.createSauce);

//La méthode  app.get()  permet de réagir uniquement aux requêtes de type GET.
router.get("/:id", SaucesCtrl.getOneSauce);

//Methode put pour mettre à jour une sauce
router.put("/:id", SaucesCtrl.modifySauce);

//Route pour supprimer un objet
router.delete("/:id", SaucesCtrl.deleteSauce);





module.exports = router;