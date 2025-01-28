const path = require('path');

module.exports = {
  mode: "development",

  entry: {
    mdependencies: ["./js/basic/private-pages.js"],

    logp: {
        dependOn: "mdependencies",
        import: ["./js/basic/login.js"]
    }
  },

  output: {
    path: path.resolve(__dirname, "./js/final"),
    filename: '[name]f.js',
  },
};