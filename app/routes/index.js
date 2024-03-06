const express = require ('express');
const router = express.Router()

// Route d'accueil
router.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' }); 
});

router.use('/sessions', require('./sessions'));
router.use('/cours', require('./cours'));
router.use('/etudiants', require('./etudiants'));

module.exports = router;
