"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcompiler"] = self["webpackChunkcompiler"] || []).push([["mainpage"],{

/***/ "./js/basic/general/jsload.js":
/*!************************************!*\
  !*** ./js/basic/general/jsload.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deletePlatformLoad: () => (/* binding */ deletePlatformLoad),\n/* harmony export */   removeSkeletons: () => (/* binding */ removeSkeletons),\n/* harmony export */   setFunctionsOnLoad: () => (/* binding */ setFunctionsOnLoad)\n/* harmony export */ });\n// set events on load - scope functions\r\nfunction setFunctionsOnLoad(functionsArray) {\r\n     // functions must be on the same scope.\r\n     for(let currentFunction = 0; currentFunction < functionsArray.length; currentFunction ++) {\r\n          document.body.addEventListener(\"load\", functionsArray[currentFunction]());\r\n     }\r\n}\r\n\r\n\r\n// platform load\r\nfunction deletePlatformLoad() {\r\n     const loadingGroup = document.querySelector(\".loadingGroup\");\r\n     loadingGroup.remove();\r\n}\r\n\r\n\r\n// skeletons\r\nasync function removeSkeletons() {\r\n     const selectedSkeletons = Array.from(document.querySelectorAll(\".loadingSkeleton\"));\r\n\r\n     if(selectedSkeletons) {\r\n          for(let thisSkeleton = 0; thisSkeleton < selectedSkeletons.length; thisSkeleton ++ ) {\r\n               selectedSkeletons[thisSkeleton].classList.remove(\"loadingSkeleton\");\r\n          }\r\n     }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://compiler/./js/basic/general/jsload.js?");

/***/ }),

/***/ "./js/basic/jsmain.js":
/*!****************************!*\
  !*** ./js/basic/jsmain.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _general_jsload_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general/jsload.js */ \"./js/basic/general/jsload.js\");\n/* harmony import */ var _basic_general_jspagechange_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../basic/general/jspagechange.js */ \"./js/basic/general/jspagechange.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_basic_general_jspagechange_js__WEBPACK_IMPORTED_MODULE_1__]);\n_basic_general_jspagechange_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n(0,_general_jsload_js__WEBPACK_IMPORTED_MODULE_0__.setFunctionsOnLoad)([_general_jsload_js__WEBPACK_IMPORTED_MODULE_0__.deletePlatformLoad]);\r\nawait (0,_basic_general_jspagechange_js__WEBPACK_IMPORTED_MODULE_1__.changePage)(\r\n    window.location.search.replace(\"?currentpage=\", \"\"), \r\n    `../html/${window.location.search.replace(\"?currentpage=\", \"\")}.html`\r\n);\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://compiler/./js/basic/jsmain.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./js/basic/general/jsmenu.js"), __webpack_exec__("./js/basic/general/jsreusablestructures.js"), __webpack_exec__("./js/basic/jsmain.js"), __webpack_exec__("./js/basic/general/jsload.js"));
/******/ }
]);