const customExpress = require("./config/customExpress");
const app = customExpress();

app.listen(3535, () => console.log("esta funfando"));
