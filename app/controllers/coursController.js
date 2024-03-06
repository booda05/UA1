const fs = require('fs');
const path = require('path');

//definir le chemin vers le fichier data/cours.json
const coursFilePath = path.join(__dirname, '..', 'data', 'cours.json');

//fonction lecture et ecriture des cours
function readCours() { 
    return new Promise((resolve, reject) => {
        fs.readFile(coursFilePath, (err,data) => {
            if (err) reject (err);
            try {
                const cours = JSON.parse(data.toString()); //on parse la données en json
                resolve(cours);
            }catch (error) {
                reject(error);
            }
        });
    });
}
function saveCours(cours) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(cours, null, 2); 
        fs.writeFile(coursFilePath, data , err =>{
            if (err) reject(err);
            resolve();
       });
    });
}

//affichier le formulaire pour ajouter un cours
exports.showAddCoursForm = (req, res) => {
    res.render('addCours', {title: 'Ajouter un cours'});
};

//ajout d'un nouveau cours
exports.addCours = async (req, res) => {
    try {
        const newCours = req.body;
        const cours = await readCours();
        cours.push(newCours);
        await saveCours(cours);
        res.redirect('/cours');
    } catch (error){
        res.status(500).send(error.toString());
    }
};

//lister les cours
exports.listCours = async (req, res) => {
    try {
     const cours = await readCours();
     res.render("listCours", {title: 'Liste des Cours', cours});
} catch (error) {
    res.status(500).send(error.toString());
    }
};
