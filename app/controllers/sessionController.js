const fs = require('fs');
const path = require('path');

//definir le chemin vers le fichier session.json
const sessionsFilePath = path.join(__dirname, '..', 'data', 'sessions.json');

//fonction qui lis le fichier sessions.json
function readSessions() {
    return new Promise((resolve, reject) => {
        console.log(`Lecture du fichier: ${sessionsFilePath}`);
        fs.readFile(sessionsFilePath, (err, data) => {
            if (err) {
                console.error("Erreur lors de la lecture du fichier", err);
                reject(err);
            } else {
                try {
                    const sessions = JSON.parse(data.toString());
                    resolve(sessions);
                } catch (error) {
                    console.error("Erreur lors du parsing du JSON", error);
                    reject("Erreur de lecture du fichier : " + error);
                }
            }
        });
    });
}


//fonction pour sauvegarder dans dans le fichier session
function saveSession(session) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(session, null, 2);
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
        const sessions = await readSessions(); //lecture des sessions
        const newSession = req.body; //recuperation des données envoyer
        
        sessions.push(newSession); //ajoute la nouvelle session a la liste des sessions
        await saveSession(sessions);
        res.redirect('/sessions');
    }catch(error){
        res.status(500).send(error.toString());
    }
}

//list les sessions
exports.listSessions = async (req, res) => {
    try {
        const sessions = await readSessions();
        res.render('listSessions', { title: 'Liste des sessions', sessions });
    } catch (error) {
        res.status(500).send(error.toString());
    }
};
//rechercher les  sessions par nom ou date
exports.searchSessions = async (req, res) => {
    try {
        const { nom, year } = req.query; // Récupère les deux critères de recherche
        const sessions = await readSessions(); // Lit toutes les sessions
        const searchPerformed = !!nom || !!year;

        const filteredSessions = sessions.filter(session => {
            // Vérifie si le nom correspond (si fourni)
            const nomMatch = nom ? session.nom.toLowerCase().includes(nom.toLowerCase()) : true;
            // Vérifie si l'année correspond (si fournie)
            const yearMatch = year ? session.annee.toString() === year : true;
            return nomMatch && yearMatch;
        });

        // Rend la vue listSessions avec les sessions filtrées
        res.render("listSessions", { 
            title: 'Résultats de recherche', 
            sessions: filteredSessions,
            searchQuery: { nom, year }, // Passez les deux critères pour maintenir la cohérence
            searchPerformed: searchPerformed,
        });
    } catch (error) {
        console.error("Erreur lors de la recherche des sessions", error);
        res.status(500).send(error.toString());
    }
};
