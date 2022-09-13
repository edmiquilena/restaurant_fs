const express = require("express");
const db = require("./db.js");
const app = express();
const bcrypt = require("bcrypt");

const handlebars = require("express-handlebars");

// views
// app.use('views', './views/')

//view engine

// const hbs = handlebars.engine({
//   extname: "hbs",
//   layoutsDir: "./views/layouts/",
// });

// app.engine("hbs", hbs);

app.set("view engine", "pug");

const DB = new db("data");
// middleware https://expressjs.com/es/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));
// middleware https://expressjs.com/es/api.html#express.json
app.use(express.json());

// * frontend

app.get("/registro", (req, res) => {
  //  res.render("main", { layout: "registro" });
  res.render("formulario");
});
app.get("/admin", async (req, res) => {
  const usuarios = await DB.getAllUsers();
  res.render("main", { layout: "usuarios", usuarios });
});

app.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await DB.getUserById(id);
    // const {nombre, correo} =  data;
    res.render("main", { layout: "usuario", ...data });
  } catch (e) {
    return res.status(404).render("main", { layout: "error" });
  }

  res.render("main", { layout: "usuarios", usuarios });
});

//middleware hash contrasena

//* request/ response

// root = no hay problema
app.get("/api/", (req, res) => {
  res.send({ error: false });
});

//getAll
app.get("/api/usuarios", async (req, res) => {
  const data = await DB.getAllUsers();
  return res.send(data);
});

//getById
// queries
// * GET ?id=10

app.get("/api/usuario", async (req, res) => {
  const { id } = req.query;
  try {
    const data = await DB.getUserById(id);

    return res.send(data);
  } catch (e) {
    return res.status(404).send({ error: true, msg: e.message });
  }
});

app.post("/api/usuario", async (req, res) => {
  console.log(req.body);
  const { nombre, correo, password } = req.body;
  console.log(password);
  const data = await DB.createUser({ nombre, correo });
  return res.redirect("/registro");
});

app.listen(8080, () => {
  console.log("Iniciado");
});
