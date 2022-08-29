const express = require("express");
const db = require("./db.js");
const app = express();

// middleware https://expressjs.com/es/api.html#express.urlencoded
app.use(express.urlencoded());
// middleware https://expressjs.com/es/api.html#express.json
app.use(express.json());
//* request/ response
const DB = new db("data");

// root = no hay problema
app.get("/", (req, res) => {
  res.send({ error: false });
});

//getAll
app.get("/usuarios", async (req, res) => {
  const data = await DB.getAllUsers();
  return res.send(data);
});

//getById
// queries
// * GET ?id=10

app.get("/usuario", async (req, res) => {
  const { id } = req.query;
  try {
    const data = await DB.getUserById(id);

    return res.send(data);
  } catch (e) {
    return res.status(404).send({ error: true, msg: e.message });
  }
});

app.post("/usuario", async (req, res) => {
  const { nombre, correo } = req.body;

  const data = await DB.createUser({ nombre, correo });
  return res.send({ error: false, msg: "Usuario creado" });
});

app.listen(8080, () => {
  console.log("Iniciado");
});
