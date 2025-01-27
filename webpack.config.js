const path = require('path');

module.exports = {
  mode: "development",

  entry: {
    fbase: "./js/basic/fb.js",

    logp: {
        dependOn: "fbase",
        import: ["./js/basic/login.js"]
    }
  },

  output: {
    path: path.resolve(__dirname, "./js/final"),
    filename: '[name]f.js',
  },
};