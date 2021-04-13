const fs = require("fs");
const path = require("path");

module.exports = (filePath, nameOfFile, callbackImageCreate) => {
  const validTypes = ["jpg", "png", "jpeg"];
  const type = path.extname(filePath);
  const typeIsValid = validTypes.indexOf(type.substring(1)) !== -1;

  if (typeIsValid) {
    const newPath = `./assets/images/${nameOfFile}${type}`;

    fs.createReadStream(filePath)
      .pipe(fs.createWriteStream(newPath))
      .on("finish", () => callbackImageCreate(false, newPath));
  } else {
    const errs = "Type is invalid";
    console.log("Error! Type is invalid");
    callbackImageCreate(errs);
  }
};
