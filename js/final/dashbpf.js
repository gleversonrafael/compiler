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
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\n/* harmony import */ var _userdata_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userdata.js */ \"./js/basic/userdata.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_userdata_js__WEBPACK_IMPORTED_MODULE_2__]);\n_userdata_js__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n\r\n\r\ndocument.body.addEventListener(\"load\", showUsername());\r\n\r\n\r\nfunction showUsername() {\r\n     let greetings = document.querySelector(\"#userGreetings\");\r\n     greetings.textContent = _userdata_js__WEBPACK_IMPORTED_MODULE_2__.userData.name;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// --------------------------------------\r\n// aside\r\nlet signoutB = document.getElementById(\"signOUT\");\r\nlet authdata = document.getElementById(\"authData\");\r\n\r\nsignoutB.addEventListener(\"click\", () => {\r\n     console.log(\"SignOUTED\")\r\n\r\n     ;(0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signOut)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth);\r\n})\r\n\r\n\r\nauthdata.addEventListener(\"click\", () => {\r\n     ;(0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.onAuthStateChanged)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth, (userData) => {\r\n          console.log(userData);\r\n          console.log(\"AUTH::\");\r\n          console.log(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth);\r\n     })\r\n     \r\n})\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://compiler/./js/basic/dashb.js?");

/***/ }),

/***/ "./js/basic/menu.js":
/*!**************************!*\
  !*** ./js/basic/menu.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\n/* harmony import */ var _userdata_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userdata.js */ \"./js/basic/userdata.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_userdata_js__WEBPACK_IMPORTED_MODULE_2__]);\n_userdata_js__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// var\r\nlet signoutB = document.querySelector(\"button#signoutB\");\r\n\r\nlet mMenuBox = document.getElementById(\"mMenuB\");\r\nconst mIcon = document.getElementById(\"mIcon\");\r\nlet bgEff = document.querySelector(\"#bgEff\");\r\nlet menuState = \"closed\";\r\n\r\n\r\n\r\n\r\n\r\n// events\r\ndocument.body.addEventListener(\"load\", menuVisualState())\r\n\r\n\r\n// toggle menu\r\nmIcon.addEventListener(\"click\", () => {\r\n     toggleMenu(true, true)\r\n});\r\n\r\nleaveM.addEventListener(\"click\", () => {\r\n     toggleMenu(true, true)\r\n});\r\n\r\n\r\nwindow.addEventListener(\"resize\", () => {\r\n     if(mMenuBox.style.display == \"none\" && window.innerWidth > 768) {\r\n          // only happens when the user, from a pc screen, changes viewpowrt to one lighter than 768px and open and closes the menu\r\n          toggleMenu(true, false);\r\n          \r\n     }\r\n\r\n\r\n     // maintain the menu visual state\r\n     if((window.innerWidth >= 768 && bgEff.style.display == \"block\") || (window.innerWidth < 768 && bgEff.style.display != \"block\" && menuState === \"open\")) {\r\n          toggleMenu(false, true);\r\n\r\n     } \r\n})\r\n\r\n\r\n\r\n\r\n\r\nsignoutB.addEventListener(\"click\", () => {\r\n     ;(0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signOut)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth);\r\n})\r\n\r\n\r\n\r\n\r\n// functions\r\n// m level\r\nfunction toggleMenu(changeDisplay, changeBackground) {\r\n     if(changeDisplay === true) {\r\n          // Menu is not open\r\n          if(menuState === \"closed\") {\r\n               mMenuBox.style.display = \"flex\";\r\n               mIcon.style.display = \"none\";\r\n               \r\n               menuState = \"open\";\r\n\r\n          // Menu is open\r\n          } else {\r\n               mMenuBox.style.display = \"none\";\r\n               mIcon.style.display = \"block\";\r\n               \r\n               menuState = \"closed\";\r\n          }\r\n     } \r\n\r\n\r\n     if(changeBackground === true) {\r\n          bgEff.style.display == \"block\" ? bgEff.style.display = \"none\" : bgEff.style.display = \"block\"\r\n     }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n// s level\r\nfunction menuVisualState() {\r\n     loadMenuBoxEffect()\r\n     loadNameAndType()\r\n\r\n\r\n     function loadNameAndType() {\r\n          let userName = document.getElementById(\"userName\");\r\n          let userType = document.getElementById(\"userType\");\r\n\r\n          userName.textContent = _userdata_js__WEBPACK_IMPORTED_MODULE_2__.userData.name;\r\n\r\n          userType.textContent = _userdata_js__WEBPACK_IMPORTED_MODULE_2__.userData.usertype == \"regular\"? \"Usuário comum\" : \"Administrador\";\r\n     }\r\n\r\n     function  loadMenuBoxEffect() {\r\n          let menuSections = [\"dashboard\", \"mycourses\", \"managecourses\", \"allcourses\", \"manageusers\"]\r\n\r\n          for(let elem in menuSections) {\r\n               if(window.location.href.includes(menuSections[elem])) {\r\n                    // create var\r\n                    let selMenuBox = document.getElementById(menuSections[elem]);\r\n                    let imgChange = document.querySelector(`a#${menuSections[elem]} > img`);\r\n     \r\n                    // css - change box and img\r\n                    selMenuBox.style.opacity = \"1\";\r\n                    selMenuBox.style.backgroundColor = \"#000\"\r\n     \r\n                    if(selMenuBox.id == \"dashboard\" || selMenuBox.id == \"mycourses\") {\r\n                         selMenuBox.style.borderBottom = \"1px solid var(--aqua)\";\r\n                         selMenuBox.style.color = \"var(--aqua)\";\r\n     \r\n                    } else {\r\n                         selMenuBox.style.borderBottom = \"1px solid var(--razz)\";\r\n                         selMenuBox.style.color = \"var(--razz)\";\r\n                    }\r\n     \r\n     \r\n     \r\n                    imgChange.setAttribute(\"src\", `../media/ico/menu/fill-${menuSections[elem]}.svg`);\r\n               }\r\n     \r\n          }\r\n     }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://compiler/./js/basic/menu.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./js/basic/menu.js"), __webpack_exec__("./js/basic/dashb.js"));
/******/ }
]);