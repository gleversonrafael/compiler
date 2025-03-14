const path = require('path');

// client tecnologies
module.exports = {
  mode: "development",

  entry: {
    maindependencies: ["./js/basic/general/jsfirebase.js", "./js/basic/general/jspermissions.js", "./js/basic/general/jsuserdata.js"],

    login: {
      dependOn: "maindependencies",
      import: ["./js/basic/loginsign/jslogin.js", "./js/basic/general/jsreusablestructures.js"]
    },

    mainpage: {
      dependOn: "maindependencies",
      import : ["./js/basic/general/jsmenu.js", "./js/basic/jspagechange.js", "./js/basic/general/jsreusablestructures.js"]
    },

    mycourses: {
      import: ["./js/basic/managemycourses/jsmanageandmycourses.js", "./js/basic/managemycourses/jsmycourses.js"]

    },

    managecourses: {
      import: ["./js/basic/managemycourses/jsmanageandmycourses.js", "./js/basic/managemycourses/jsmanagecourses.js"]
    },

    manageusers: { 
      import: ["./js/adminfb.js", "./js/basic/jsmanageusers.js"] 
    }, 

    myuser: { 
      import: ["./js/basic/myuser.js"] 
    }

  },

  output: {
    path: path.resolve(__dirname, "./js/final"),
    filename: '[name]bundle.js',
  },


  resolve: {
    fallback: {
      fs: false, 
      
      // firebase sdk
      util: false,
      stream: false,
      events: false,
      process: false,

      net: false,
      tls: false,
      http2: false,
      child_process: false,


      // others
      assert: false,
      buffer: false,
      console: false,
      constants: false,
      crypto: false,
      domain: false,
      http: false,
      https: false,
      os: false,
      path: false,
      punycode: false,
      querystring: false,
      string_decoder: false,
      sys: false,
      timers: false,
      tty: false,
      url: false,
      vm: false,
      zlib: false,
    }

  }
};


















// other way of doing -- target web for serveside
// // server tecnologies
// const serverSide = {
//   mode: "development",
//   target: "node",

//   entry: {
//     manageusers: {
//       import: ["./js/adminfb.js"]

//     }

//   },

//   output: {
//     path: path.resolve(__dirname, "./js/final"),
//     filename: "[name]serverside.js"
  
//   },

//   resolve: {
//     fallback: {
//       fs: false,
//       path: false

//     }

//   }
// }
