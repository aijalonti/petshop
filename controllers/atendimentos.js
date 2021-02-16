module.exports = (app) => {
  app.get("/atendimentos", (req, res) => res.send("Rota Get de Atendimentos"));

  app.post("/atendimentos", (req, res) =>
    res.send("Rota Post de Atendimentos")
  );
};
