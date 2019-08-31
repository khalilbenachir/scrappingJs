const express = require("express");
const bodyParser = require("body-parser");

const scrapper = require("./scrapping");

const app = express();

app.use(bodyParser.json());

app.use("/search/:title", (req, res, next) => {
  scrapper.searchProduct(req.params.title).then(items => res.json(items));
});

app.listen(3000, () => {
  console.log(`Server started on port`);
});
