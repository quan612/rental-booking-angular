const Datauri = require("datauri/parser");
const path = require("path");
const dUri = new Datauri();

exports.dataUri = (file) =>
  dUri.format(path.extname(file.originalname).toString(), file.buffer);
