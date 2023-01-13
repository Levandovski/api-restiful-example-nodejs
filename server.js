const express = require("express");
const cors = require("cors");
let data = require("./data.json");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/clients", (req, res) => {
  return res.status(200).json(data);
});

app.get("/clients/:id", (req, res) => {
  const { id } = req.params;

  const client = data.find((cli) => cli.id == id);

  if (!client) return res.status(204).json();

  return res.json(client);
});

app.post("/clients", (req, res) => {
  const { name } = req.body;

  data.push({ id: data.length + 1, name: name });

  return res.status(200).json({
    message: "Registration successfully added",
    name: data[data.length],
  });
});

app.put("/clients/:id", (req, res) => {
  const { id } = req.params;

  const client = data.find((clie) => clie.id == id);

  if (!client) return res.status(204).json();

  const { name } = req.body;

  client.name = name;

  res.json(client);
});

app.delete("/clients/:id", (req, res) => {
  const { id } = req.params;

  let newData = data.filter((clie) => clie.id !== parseInt(id));

  return res.status(200).json(newData);
});

app.listen(3000, () => {
  console.log("Server running whith success in port 3000!");
});
