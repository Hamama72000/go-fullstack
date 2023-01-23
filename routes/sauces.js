//création d'un router qu'on va importer dans l'app
const express = require("express");
const auth = require('../middleware/auth');

const router = express.Router();

const SaucesCtrl = require('../controllers/sauces');

/* route qui permet d'afficher les articles*/
router.get("/", auth, SaucesCtrl.getAllSauces);

/*routes pr recevoir données via la console car pas encore de base de données+on voit ce qu'elles font: crer, modifier etc)*/
router.post('/', auth,  SaucesCtrl.createSauce);

//La méthode  app.get()  permet de réagir uniquement aux requêtes de type GET.
router.get("/:id", auth, SaucesCtrl.getOneSauce);

//Methode put pour mettre à jour une sauce
router.put("/:id", auth, SaucesCtrl.modifySauce);

//Route pour supprimer un objet
router.delete("/:id", auth, SaucesCtrl.deleteSauce);





module.exports = router;