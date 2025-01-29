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
/***/ (() => {

eval("\n\n//# sourceURL=webpack://compiler/./js/basic/dashb.js?");

/***/ }),

/***/ "./js/basic/menu.js":
/*!**************************!*\
  !*** ./js/basic/menu.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\n\r\n\r\n\r\n\r\n// var\r\nlet signoutB = document.querySelector(\"button#signoutB\");\r\nconst mIcon = document.getElementById(\"mIcon\");\r\n\r\n\r\n\r\n\r\n// events\r\nmIcon.addEventListener(\"click\", toggleMenu);\r\nleaveM.addEventListener(\"click\", toggleMenu);\r\ndocument.body.addEventListener(\"resize\", toggleMenu);\r\n\r\nsignoutB.addEventListener(\"click\", () => {\r\n     (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signOut)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth);\r\n})\r\n\r\n\r\n\r\n\r\n// functions\r\nfunction toggleMenu() {\r\n     console.log(\"menu toggle\")\r\n     let mMenuBox = document.getElementById(\"mMenuB\");\r\n\r\n     if((window.innerWidth >= 768) || (window.innerWidth < 768)) {\r\n          changeMenuDisplay()   \r\n     }\r\n      \r\n\r\n     // compl\r\n     function changeMenuDisplay() {\r\n          // Menu is not open\r\n          if(mMenuBox.style.display != \"flex\") {\r\n               mMenuBox.style.display = \"flex\";\r\n               mIcon.style.display = \"none\";\r\n          \r\n          } else if(window.innerWidth < 768) {\r\n               mMenuBox.style.display = \"none\";\r\n               mIcon.style.display = \"block\";\r\n          }\r\n     }\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://compiler/./js/basic/menu.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./js/basic/menu.js"), __webpack_exec__("./js/basic/dashb.js"));
/******/ }
]);