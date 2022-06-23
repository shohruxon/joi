const express = require("express");
const app = express();
const Joi = require("Joi");
const authMiddleware = require("./middleware/auth");
const morgan = require("morgan");
const helmet = require('helmet')

app.use(express.json());
app.use(morgan('tiny'))
app.use(helmet())

app.use((req, res, next) => {
  console.log("loger");

  next();
});
function auth(req, res, next) {
  const auth = true;
  if (!auth) {
    res.send("Auth not true");
    return;
  }
  console.log("Auth true");
  next();
}

const foodball = [
  { name: "Messi", id: 1 },
  { name: "Ronaldo", id: 2 },
  { name: "Neymar", id: 3 },
];

app.get("/", (req, res) => {
  res.send("bosh sahifa");
});

app.get("/api/foodball", (req, res) => {
  res.send(foodball);
});

app.post("/api/foodball/add", authMiddleware, (req, res) => {
  // if (!req.body.name) {
  //   res.send("ism kritilishi kere");
  //   return;
  // }
  // if (req.body.name.length < 3) {
  //   res.send("ismni uzunligi 3 dan katta bolishi kere");
  //   return;
  // }
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const value = schema.validate(req.body);

  if (value) {
    res.status(404).send(value.error.message);
    return;
  }

  const foodbal = {
    name: req.body.name,
    id: foodball.length + 1,
  };
  foodball.push(foodbal);
  res.status(201).send("created");
});
app.delete("/api/foodball/delete/:id", authMiddleware, (req, res) => {
  const idx = foodball.findIndex((cls) => cls.id === +req.params.id);
  if (idx === -1) {
    res.send("erron 404");
  }
  foodball.splice(idx, 1);
  res.send("deleted");
});

app.put("/api/foodball/update/:id", authMiddleware, (req, res) => {
  const idx = foodball.findIndex((cls) => cls.id === +req.params.id);
  if (idx === -1) {
    res.send("erron 404");
  }
  let player = {
    name: req.body.name,
    id: req.params.id,
  };
  foodball[idx] = player;
  res.send("updated");
});

// const port = process.env.port || 3000;
const port = normalizePort(process.env.port || 3000);

app.listen(port, () => {
  console.log(`server working on port ${port}`);
});
function normalizePort(val) {
  const num = parseInt(val);
  if (isNaN(num)) {
    return val;
  }
  if (num) {
    return num;
  }
  return false;
}
