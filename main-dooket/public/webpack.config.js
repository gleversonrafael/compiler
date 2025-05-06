const path = require('path');

// client tecnologies
module.exports = {
  mode: "development",

  entry: {
    maindependencies: ["./js/basic/general/jsfirebase.js", "./js/basic/general/jspermissions.js", "./js/basic/general/jsuserdata.js", "./js/basic/general/jspagechange.js"],

    login: {
      dependOn: "maindependencies",
      import: ["./js/basic/jslogin.js", "./js/basic/general/jsreusablestructures.js"]
    },

    mainpage: {
      dependOn: "maindependencies",
      import : ["./js/basic/general/jsmenu.js","./js/basic/general/jsreusablestructures.js", "./js/basic/jsmain.js", "./js/basic/general/jsload.js"]
    },

    home: {
      import: ["./js/basic/jshome.js"]
    },

    mycourses: {
      import: ["./js/basic/managemycourses/jsmanageandmycourses.js", "./js/basic/managemycourses/jsmycourses.js"]

    },

    managecourses: {
      import: ["./js/basic/managemycourses/jsmanageandmycourses.js", "./js/basic/managemycourses/jsmanagecourses.js"]
    },

    manageusers: { 
      import: ["./js/basic/jsmanageusers.js"] 
    }, 

    myuser: { 
      import: ["./js/basic/myuser.js"] 
    }

  },

  output: {
    path: path.resolve(__dirname, "./js/final"),
    filename: '[name]bundle.js',
  },
};