const fs = require('fs');
const path = require('path');

// Define the path for the file data/etudiants.json
const etudiantFilePath = path.join(__dirname, '..', 'data', 'etudiants.json');

// Function for reading and writing to the json file
function readEtudiants() {
  return new Promise((resolve, reject) => {
    fs.readFile(etudiantFilePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const etudiants = JSON.parse(data.toString());
          resolve(etudiants);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

function saveEtudiants(etudiants) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(etudiants, null, 2);
    fs.writeFile(etudiantFilePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Display the form for adding a student
exports.showAddetudiantForm = (req, res) => {
  res.render('addEtudiants', { title: 'Ajouter un étudiant' });
};

// Add a new student
exports.addEtudiant = async (req, res) => {
  try {
    const newEtudiant = req.body; // Recover the form data

    // Validate the input data
    if (!newEtudiant.nom || !newEtudiant.prenom) {
      throw new Error('Invalid input');
    }

    const etudiants = await readEtudiants(); // Recover the list of students
    etudiants.push(newEtudiant); // Add the new student to the list
    await saveEtudiants(etudiants); // Save the updated list in the json file
    res.redirect('/etudiants'); // Redirect to the student management page
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// List of all students
exports.listEtudiants = async (req, res) => {
  try {
    const etudiants = await readEtudiants();
    res.render('listEtudiants', { title: 'Liste des étudiants', etudiants });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Search for students
exports.searchEtudiants = async (req, res) => {
  try {
    const { query } = req.query;
    const etudiants = await readEtudiants();
    const filtreEtudiants = etudiants.filter((etudiant) =>
      etudiant.nom?.toLowerCase().includes(query.toLowerCase())
    );
    
    // Passer une variable supplémentaire pour indiquer si des résultats ont été trouvés
    const found = filtreEtudiants.length > 0;
    
    res.render('listEtudiants', {
      title: 'Liste des étudiants',
      etudiants: filtreEtudiants,
      found: filtreEtudiants.length > 0,
      query: req.query.query // Assurez-vous de passer la requête à la vue
    });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};
