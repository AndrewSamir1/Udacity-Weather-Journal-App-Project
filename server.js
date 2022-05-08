//Object to store data
projectData = {};

//requiring express
const express = require("express");
const app = express();

//requiring body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//requiring cors
const cors = require("cors");
app.use(cors());

// Initializing the main project folder
app.use(express.static("website"));

//Running the server on port
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});

//GET Route
app.get("/all", (req, res) => {
  res.send(projectData);
});

//POST Route
app.post("/post", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  res.send(projectData);
});
