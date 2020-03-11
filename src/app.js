const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// define pths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Setup hbs engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "khaoula EL KOI"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: " khaoula EL KOI",
    message: "thi is a help message"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "KGG"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provile your location"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          address: req.query.address,
          location: location,
          forecast: forecastData
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you should provide search"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "help not found",
    message: "page not found",
    name: "elkoi khaoula"
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "ERROR 404 ",
    message: "page not found",
    name: "elkoi khaoula"
  });
});

app.listen(3000, () => {
  console.log("server is upp on port 3000");
});