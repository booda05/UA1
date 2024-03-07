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
        const cours = await readCours(); // Assurez-vous que cette fonction retourne bien le tableau des cours
        res.render('listCours', {
            cours: cours, // Ici, vous passez le tableau des cours à la vue
            found: cours.length > 0, // Vous pouvez utiliser cette condition pour déterminer si des cours ont été trouvés
            query: '' // Initialiser `query` pour éviter des erreurs dans la vue
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des cours.");
    }
};
//chercher un cours 
exports.searchCours = async (req, res) => {
    try {
        const { query } = req.query; // Récupère la requête de recherche de l'URL
        const cours = await readCours(); // Lit tous les cours
        
        // Filtre les cours basé sur la requête de recherche
        const filteredCours = cours.filter((coursItem) => 
            coursItem.title?.toLowerCase().includes(query.toLowerCase())
        );

         // Passer une variable supplémentaire pour indiquer si des résultats ont été trouvés
    const found = filteredCours.length > 0;
    
    res.render('listCours', {
      title: found ? 'Résultat de la recherche' : 'Cours introuvable',
      cours: filteredCours,
      found // Cette variable indique si des étudiants ont été trouvés
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
