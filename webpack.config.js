const path = require('path');

module.exports = {
  mode: "development",

  entry: {
    mdependencies: ["./js/basic/fb.js", "./js/basic/perms.js", "./js/basic/userdata.js"],

    logp: {
      dependOn: "mdependencies",
      import: "./js/basic/login.js"
    },

    signp: {
      dependOn: "mdependencies",
      import: ["./js/basic/menu.js", "./js/basic/sign.js"]
    },

    dashbp: {
      dependOn: "mdependencies",
      import : ["./js/basic/menu.js", "./js/basic/dashb.js"]
    },

    mycoursesp: {
      dependOn: "mdependencies",
      import: ["./js/basic/menu.js", "./js/basic/manageandmycourses.js", "./js/basic/mycourses.js"]

    },

    managecp: {
      dependOn: "mdependencies",
      import: ["./js/basic/menu.js", "./js/basic/manageandmycourses.js", "./js/basic/managecourses.js"]
    },

    manageup: {
      dependOn: "mdependencies",
      import: ["./js/basic/menu.js"]

    }

  },

  output: {
    path: path.resolve(__dirname, "./js/final"),
    filename: '[name]f.js',
  },
};