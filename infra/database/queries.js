const connection = require("./bd");

const executeQuery = (query, params = "") => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (errs, results, filds) => {
      if (errs) {
        reject(errs);
      } else {
        resolve(results);
      }
    });
  });
};
module.exports = executeQuery;
