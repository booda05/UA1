const fs = require('fs');
const path = require('path');

//definir le chemin vers le fichier session.json
const sessionsFilePath = path.join(__dirname, '..', 'data', 'sessions.json');

//fonction qui lis le fichier sessions.json
function readSessions() {
    return new Promise((resolve, reject) => {
        fs.readFile(sessionsFilePath, (err, data) => {
            if (err) reject(err);
            try{
                const sessions = JSON.parse(data.toString());
                resolve(sessions);
            } catch (error){
                reject("Erreur de lecture du fichier : " + error);
            }
        });
    });
}

//fonction pour sauvegarder dans dans le fichier session
function saveSession(session) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(sessions, null, 2);
        fs.writeFile(sessionsFilePath , data, err => {
            if (err) reject(err);
            resolve();
    });
});
}

//Afficher le formulaire d'ajout de session
exports.showAddSessionForm = (req, res) => { 
    res.render('addSession', {title: 'Ajouter une Session'});
};

//Ajouter une nouvelle Session
exports.addSession = async (req, res) => {
    try {
        const newSession = req.body; //recuperation des données envoyer
        const session = await readSessions(); //lecture des sessions
        session.push(newSession); //ajoute la nouvelle session a la liste des sessions
        await saveSession(session);
        res.redirect('/sessions/list');
    }catch(error){
        res.status(500).send(error.toString());
    }
}

//
exports.listSessions = async (req, res) => {
    try {
        const sessions = await readSessions();
        res.render('listSessions', { title: 'Liste des sessions', sessions });
    } catch (error) {
        res.status(500).send(error.toString());
    }
};