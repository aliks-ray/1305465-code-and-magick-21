const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/stat.js",
    "./js/setup.js",
    "./js/wizard.js",
    "./js/render.js",
    "./js/game.js",
    "./js/modal.js",
    "./js/dialog.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
