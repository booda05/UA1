const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionsController');


//route qui permet de lister toute les sessions
router.get('/', sessionController.listSessions);

//route qui affiche le formulaire d'ajout de la session
router.get('/add', sessionController.showAddSessionForm);

//route pour ajouter une nouvelle session
router.post('/add', sessionController.addSession);

//route pour chercher la session
router.get('/search', sessionController.searchSessions);

module.exports = router;