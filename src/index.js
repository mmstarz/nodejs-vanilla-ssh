const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/components");
const mainRoutes = require("../routes/mainRoutes");
// set handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// assets folder html, css, js files
app.use(express.static(path.join(__dirname, "../public")));

// routes
app.use(mainRoutes);

// if (process.env.NODE_ENV === "production") {
//   // Express will serve up production assets
//   // like main.css or main.js
//   app.use(express.static(path.join(__dirname, "../public")));
//   // Express will serve up index.html
//   // if it doesn't recognize the route
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
//   });
// }

// Express will serve up index.html
// if it doesn't recognize the route
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
