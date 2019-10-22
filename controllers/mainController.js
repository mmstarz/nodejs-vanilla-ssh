const path = require("path");
const weatherEngine = require("../src/utils/weatherEngine");

exports.index = (req, res, next) => {
  // 1- view template name. 2 - properties object
  res.render("index", {
    title: "mmFactory"
  });
};

exports.help = (req, res, next) => {
  // res.send("Help page");
  // res.sendFile(path.resolve(__dirname, "../public/help.html"));
  res.render("help", {
    title: "Help Page",
    message: "This is a help message"
  });
};

exports.help404 = (req, res, next) => {
  res.render("help404", {
    title: "Help 404"
  });
};

exports.about = (req, res, next) => {
  // send types: string, object, array of objects, html
  // res.send("<h1>About Page</h1>");
  res.render("about", {
    title: "Information Page",
    author: "mmstar",
    image: "../images/hack4.jpg",
    exp: "2 years",
    skills: {
      language: "JavaScript",
      framework: "React",
      runtime: "Node",
      database: "MongoDB"
    }
  });
};

exports.weather = async (req, res, next) => {
  // console.log(req.query.address);
  try {
    const result = await weatherEngine(req.query.address);
    res.send({ address: req.query.address, ...result });
  } catch (err) {
    res.send(err);
  }
};

exports.pnf = (req, res, next) => {
  res.render("404", {
    title: "404"
  });
};

exports.products = (req, res, next) => {
  // req.query provided by express
  if (!req.query.search) {
    return res.send({
      errorMessage: "Provide some search params."
    });
  }

  // search logic

  res.send({
    products: []
  });
};
