const express = require('express');
const router = express.Router();
const etudiantsController = require('../controllers/etudiantsController');


router.get('/', (req, res) => {
    res.send('Page des etudiants');
});


//route pour afficher le formulaire d'ajout d'etudiant
router.get('/add', etudiantsController.showAddetudiantForm);

//Route pour ajouter le formulaire du nouveau etudiant
router.post('/add', etudiantsController.addEtudiant);

//Route pour lister tous les etudiants
router.get('/list', etudiantsController.listEtudiants);

//Route pour la recherche d'etudiant
router.get('/search', etudiantsController.searchEtudiants);

module.exports = router;