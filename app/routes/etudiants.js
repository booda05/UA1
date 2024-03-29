const express = require('express');
const router = express.Router();
const etudiantsController = require('../controllers/etudiantsController');


router.get('/', etudiantsController.listEtudiants); 

//route pour afficher le formulaire d'ajout d'etudiant
router.get('/add', etudiantsController.showAddetudiantForm);

//Route pour ajouter le formulaire du nouveau etudiant
router.post('/add', etudiantsController.addEtudiant);

//Route pour la recherche d'etudiant
router.get('/search', etudiantsController.searchEtudiants);


router.get('/list', etudiantsController.listEtudiants); //affiche la liste des étudiants

module.exports = router;