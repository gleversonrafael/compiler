"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcompiler"] = self["webpackChunkcompiler"] || []).push([["dashbp"],{

/***/ "./js/basic/dashb.js":
/*!***************************!*\
  !*** ./js/basic/dashb.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\n\r\n\r\n\r\n\r\nlet signoutB = document.getElementById(\"signOUT\");\r\nlet authdata = document.getElementById(\"authData\");\r\n\r\n\r\nsignoutB.addEventListener(\"click\", () => {\r\n     console.log(\"SignOUTED\")\r\n\r\n     ;(0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signOut)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth);\r\n})\r\n\r\n\r\nauthdata.addEventListener(\"click\", () => {\r\n     ;(0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.onAuthStateChanged)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth, (userData) => {\r\n          console.log(userData);\r\n          console.log(\"AUTH::\");\r\n          console.log(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth);\r\n     })\r\n     \r\n})\n\n//# sourceURL=webpack://compiler/./js/basic/dashb.js?");

/***/ }),

/***/ "./js/basic/menu.js":
/*!**************************!*\
  !*** ./js/basic/menu.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\n\r\n\r\n\r\n\r\n// var\r\nlet signoutB = document.querySelector(\"button#signoutB\");\r\nlet mMenuBox = document.getElementById(\"mMenuB\");\r\nconst mIcon = document.getElementById(\"mIcon\");\r\n\r\n\r\n\r\n\r\n// events\r\n// menu state\r\ndocument.body.addEventListener(\"load\", menuVisualState())\r\n\r\n// toggle menu\r\nmIcon.addEventListener(\"click\", toggleMenu);\r\nleaveM.addEventListener(\"click\", toggleMenu);\r\nwindow.addEventListener(\"resize\", () => {\r\n     if(mMenuBox.style.display == \"none\" && window.innerWidth > 768) {\r\n          // only happens when the user, from a pc screen, changes viewpowrt to one lighter than 768px and open and closes the menu\r\n          toggleMenu();\r\n     }     \r\n});\r\n\r\n\r\n\r\n\r\n\r\nsignoutB.addEventListener(\"click\", () => {\r\n     (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signOut)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth);\r\n})\r\n\r\n\r\n\r\n\r\n// functions\r\n// m level\r\nfunction toggleMenu() {\r\n     changeMenuDisplay()   \r\n      \r\n\r\n     // compl\r\n     function changeMenuDisplay() {\r\n          // Menu is not open\r\n          if(mMenuBox.style.display != \"flex\") {\r\n               mMenuBox.style.display = \"flex\";\r\n               mIcon.style.display = \"none\";\r\n          \r\n          // close menu -- only mob\r\n          } else {\r\n               mMenuBox.style.display = \"none\";\r\n               mIcon.style.display = \"block\";\r\n          }\r\n     }\r\n}\r\n\r\n\r\n\r\n\r\n// s level\r\nfunction menuVisualState() {\r\n     let menuSections = [\"dashboard\", \"mycourses\", \"managecourses\", \"allcourses\", \"manageusers\"]\r\n\r\n\r\n     for(let elem in menuSections) {\r\n          if(window.location.href.includes(menuSections[elem])) {\r\n               // create var\r\n               let selMenuBox = document.getElementById(menuSections[elem]);\r\n               let imgChange = document.querySelector(`a#${menuSections[elem]} > img`);\r\n\r\n               // css - change box and img\r\n               selMenuBox.style.opacity = \"1\";\r\n               selMenuBox.style.backgroundColor = \"#000\"\r\n\r\n               if(selMenuBox.id == \"dashboard\" || selMenuBox.id == \"mycourses\") {\r\n                    selMenuBox.style.borderBottom = \"1px solid var(--aqua)\";\r\n                    selMenuBox.style.color = \"var(--aqua)\";\r\n\r\n               } else {\r\n                    selMenuBox.style.borderBottom = \"1px solid var(--razz)\";\r\n                    selMenuBox.style.color = \"var(--razz)\";\r\n               }\r\n\r\n\r\n\r\n               imgChange.setAttribute(\"src\", `../media/ico/menu/fill-${menuSections[elem]}.svg`);\r\n          }\r\n\r\n     }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://compiler/./js/basic/menu.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./js/basic/menu.js"), __webpack_exec__("./js/basic/dashb.js"));
/******/ }
]);