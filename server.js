const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configuration du moteur de vue
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Middleware pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./app/routes/index');
const sessionsRouter = require('./app/routes/sessions');
const coursRouter = require('./app/routes/cours');
const etudiantsRouter = require('./app/routes/etudiants');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', indexRouter);
app.use('/sessions', sessionsRouter);
app.use('/cours', coursRouter);
app.use('/etudiants', etudiantsRouter);
app.use(express.static('public'));


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
