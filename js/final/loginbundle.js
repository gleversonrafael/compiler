"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcompiler"] = self["webpackChunkcompiler"] || []).push([["login"],{

/***/ "./js/basic/loginsign/jslogin.js":
/*!***************************************!*\
  !*** ./js/basic/loginsign/jslogin.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _general_jsfirebase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../general/jsfirebase.js */ \"./js/basic/general/jsfirebase.js\");\n// firebase\r\n\r\n\r\n\r\n\r\n// global var\r\nlet loginResult;\r\nconst msgCon = document.querySelector(\"#msgCon\");\r\n\r\n\r\n\r\n// login user\r\ndocument.getElementById(\"mForm\").addEventListener(\"submit\", loginP);\r\n\r\n\r\nasync function loginP(sEvent) {\r\n    let mForm = document.getElementById(\"mForm\");\r\n    sEvent.preventDefault();\r\n\r\n    // user data\r\n    const emailD = mForm.email.value;\r\n    const passD = mForm.passw.value ;\r\n\r\n\r\n    loginResult = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signInWithEmailAndPassword)(_general_jsfirebase_js__WEBPACK_IMPORTED_MODULE_1__.auth, emailD, passD)\r\n    .then(() => {\r\n      return \"cor\";\r\n\r\n    })\r\n    .catch((err) => {\r\n      console.log(err.code);\r\n      return \"inc\";\r\n\r\n    });\r\n\r\n    showMsg(loginResult);\r\n}\r\n\r\n\r\n\r\n\r\n// show and close message box\r\ndocument.getElementById(\"closeMsgB\").addEventListener(\"click\", closeMsg);\r\n\r\n\r\nfunction showMsg(msgObtained) {\r\n  // var\r\n  const msgType = document.querySelector(\"h1#msgT\");\r\n  const msgData = document.querySelector(\"p#msgD\");\r\n  const msgIcon = document.querySelector(\"img#msgIco\");\r\n\r\n  // is the login correct?\r\n  if(msgObtained == \"cor\") {\r\n    loginCor();\r\n\r\n  } else {\r\n    loginInc();\r\n  }\r\n\r\n\r\n  // compl\r\n  function loginCor() {\r\n    setClass()\r\n\r\n    msgIcon.setAttribute(\"src\", \"../media/ico/login/ico-verify.svg\");\r\n    \r\n    msgType.innerHTML = \"Login concluído\"\r\n    msgData.textContent = \"Feche essa tela para acessar sua conta.\"\r\n\r\n    msgCon.style.display = \"flex\"\r\n  }\r\n\r\n\r\n\r\n  function loginInc() {\r\n    setClass()\r\n\r\n    msgIcon.setAttribute(\"src\", \"../media/ico/login/ico-error.svg\");\r\n   \r\n    msgType.textContent = \"Erro\"\r\n    msgData.textContent = \"Dados incorretos\"\r\n\r\n    msgCon.style.display = \"flex\"\r\n  }\r\n\r\n\r\n\r\n  function setClass() {\r\n    // remove oposite class\r\n    if(msgObtained == \"cor\" && msgType.classList.contains(\"inc\")) {\r\n        msgType.classList.remove(\"inc\");  \r\n\r\n    } else if(msgObtained == \"inc\" && msgType.classList.contains(\"cor\")) {\r\n      msgType.classList.remove(\"cor\");  \r\n    }\r\n\r\n    // addClass\r\n    msgType.classList.add(msgObtained);  \r\n  }\r\n}\r\n\r\n\r\nfunction closeMsg(){\r\n  msgCon.style.display = \"none\"\r\n\r\n  if(loginResult == \"cor\") {\r\n    window.location.href = \"./main.html\"\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://compiler/./js/basic/loginsign/jslogin.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./js/basic/loginsign/jslogin.js"), __webpack_exec__("./js/basic/general/jsreusablestructures.js"));
/******/ }
]);