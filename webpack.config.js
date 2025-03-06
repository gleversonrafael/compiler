const path = require('path');

module.exports = {
  mode: "development",

  entry: {
    maindependencies: ["./js/basic/general/jsfirebase.js", "./js/basic/general/jspermissions.js", "./js/basic/general/jsuserdata.js"],

    login: {
      dependOn: "maindependencies",
      import: ["./js/basic/loginsign/jslogin.js", "./js/basic/general/jsreusablestructures.js"]
    },

    sign: {
      dependOn: "maindependencies",
      import: ["./js/basic/general/jsmenu.js", "./js/basic/loginsign/jssign.js"]
    },

    dashboard: {
      dependOn: "maindependencies",
      import : ["./js/basic/general/jsmenu.js", "./js/basic/jsdashboard.js"]
    },

    mycourses: {
      dependOn: "maindependencies",
      import: ["./js/basic/general/jsmenu.js", "./js/basic/managemycourses/jsmanageandmycourses.js", "./js/basic/managemycourses/jsmycourses.js"]

    },

    managecourses: {
      dependOn: "maindependencies",
      import: ["./js/basic/general/jsmenu.js", "./js/basic/managemycourses/jsmanageandmycourses.js", "./js/basic/managemycourses/jsmanagecourses.js", "./js/basic/general/jsreusablestructures.js"]
    },

    manageusers: {
      dependOn: "maindependencies",
      import: ["./js/basic/general/jsmenu.js", "./js/basic/general/jsreusablestructures.js", "./js/basic/jsmanageusers.js"]

    }, 

    myuser: {
      dependOn: "maindependencies",
      import: ["./js/basic/general/jsmenu.js", "./js/basic/myuser.js", "./js/basic/general/jsreusablestructures.js"]

    }

  },

  output: {
    path: path.resolve(__dirname, "./js/final"),
    filename: '[name]bundle.js',
  },
};