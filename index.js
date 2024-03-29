const customExpress = require("./config/customExpress");
const connection = require("./infra/database/bd");
const Tables = require("./infra/database/tables");

connection.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Connected to DataBase\n");

    Tables.init(connection);
    const app = customExpress();

    app.listen(3535, () => console.log("\nServer is running...\n"));
  }
});
