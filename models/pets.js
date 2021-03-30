const pets = require("../controllers/pets");
const connection = require("../infra/bd");
const uploadOfFiles = require("../files/uploadOfFiles");

class Pet {
  add(pet, res) {
    const query = "INSERT INTO Pets SET ?";

    uploadOfFiles(pet.image, pet.name, (errs, newPath) => {
      if (errs) {
        res.status(400).json({ errs });
      } else {
        const newPet = { name: pet.name, image: newPath };

        connection.query(query, newPet, (errs) => {
          if (errs) {
            console.log(errs);
            res.status(400).json(errs);
          } else {
            res.status(200).json(newPet);
          }
        });
      }
    });
  }
}

module.exports = new Pet();
