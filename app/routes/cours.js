const express = require('express');
const router = express.Router();
const coursController = require('../controllers/coursController');

router.get('/', (req, res) => {
    res.send('Page des cours');
});

//route pour afficher le formualire d'ajout de cours
router.get('/add', coursController.showAddCoursForm);

//Route pour ajouter le cours 
router.post( '/add', coursController.addCours );

//route pour lister tous les cours
router.get('/list', coursController.listCours);

module.exports = router;