/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcompiler"] = self["webpackChunkcompiler"] || []).push([["sign"],{

/***/ "./js/basic/general/jsmenu.js":
/*!************************************!*\
  !*** ./js/basic/general/jsmenu.js ***!
  \************************************/
/***/ (() => {

eval("// import { signOut } from \"firebase/auth\"\r\n// import { auth } from \"../general/jsfirebase.js\"\r\n// import { userData } from \"./jsuserdata.js\"\r\n\r\n\r\n\r\n\r\n// // var\r\n// let signoutB = document.querySelector(\"button#signoutB\");\r\n\r\n// let mMenuBox = document.getElementById(\"mMenuB\");\r\n// const mIcon = document.getElementById(\"mIcon\");\r\n// let bgEff = document.querySelector(\"#bgEff\");\r\n// let menuState = \"closed\";\r\n\r\n\r\n\r\n\r\n\r\n// // events\r\n// document.body.addEventListener(\"load\", menuVisualState())\r\n\r\n\r\n// // toggle menu\r\n// mIcon.addEventListener(\"click\", () => {\r\n//      toggleMenu(true, true)\r\n// });\r\n\r\n// leaveM.addEventListener(\"click\", () => {\r\n//      toggleMenu(true, true)\r\n// });\r\n\r\n\r\n// window.addEventListener(\"resize\", () => {\r\n//      if(mMenuBox.style.display == \"none\" && window.innerWidth > 768) {\r\n//           // only happens when the user, from a pc screen, changes viewpowrt to one lighter than 768px and open and closes the menu\r\n//           toggleMenu(true, false);\r\n          \r\n//      }\r\n\r\n\r\n//      // maintain the menu visual state\r\n//      if((window.innerWidth >= 768 && bgEff.style.display == \"block\") || (window.innerWidth < 768 && bgEff.style.display != \"block\" && menuState === \"open\")) {\r\n//           toggleMenu(false, true);\r\n\r\n//      } \r\n// })\r\n\r\n\r\n\r\n\r\n\r\n// signoutB.addEventListener(\"click\", () => {\r\n//      signOut(auth);\r\n// })\r\n\r\n\r\n\r\n\r\n// // functions\r\n// // m level\r\n// function toggleMenu(changeDisplay, changeBackground) {\r\n//      if(changeDisplay === true) {\r\n//           // Menu is not open\r\n//           if(menuState === \"closed\") {\r\n//                mMenuBox.style.display = \"flex\";\r\n//                mIcon.style.display = \"none\";\r\n               \r\n//                menuState = \"open\";\r\n\r\n//           // Menu is open\r\n//           } else {\r\n//                mMenuBox.style.display = \"none\";\r\n//                mIcon.style.display = \"block\";\r\n               \r\n//                menuState = \"closed\";\r\n//           }\r\n//      } \r\n\r\n\r\n//      if(changeBackground === true) {\r\n//           bgEff.style.display == \"block\" ? bgEff.style.display = \"none\" : bgEff.style.display = \"block\"\r\n//      }\r\n\r\n// }\r\n\r\n\r\n\r\n\r\n\r\n// // s level\r\n// function menuVisualState() {\r\n//      loadMenuBoxEffect()\r\n//      loadNameAndType()\r\n\r\n\r\n//      function loadNameAndType() {\r\n//           let userName = document.getElementById(\"userName\");\r\n//           let userType = document.getElementById(\"userType\");\r\n\r\n//           userName.textContent = userData.name;\r\n\r\n//           userType.textContent = userData.usertype == \"regular\"? \"Usuário comum\" : \"Administrador\";\r\n//      }\r\n\r\n//      function  loadMenuBoxEffect() {\r\n//           let menuSections = [\"dashboard\", \"mycourses\", \"managecourses\", \"manageusers\"]\r\n\r\n//           for(let elem in menuSections) {\r\n//                if(window.location.href.includes(menuSections[elem])) {\r\n//                     // create var\r\n//                     let selMenuBox = document.getElementById(menuSections[elem]);\r\n//                     let imgChange = document.querySelector(`a#${menuSections[elem]} > img`);\r\n     \r\n//                     // css - change box and img\r\n//                     selMenuBox.style.opacity = \"1\";\r\n//                     selMenuBox.style.backgroundColor = \"#000\"\r\n     \r\n//                     if(selMenuBox.id == \"dashboard\" || selMenuBox.id == \"mycourses\") {\r\n//                          selMenuBox.style.borderBottom = \"1px solid var(--aqua)\";\r\n//                          selMenuBox.style.color = \"var(--aqua)\";\r\n     \r\n//                     } else {\r\n//                          selMenuBox.style.borderBottom = \"1px solid var(--razz)\";\r\n//                          selMenuBox.style.color = \"var(--razz)\";\r\n//                     }\r\n     \r\n     \r\n//                     imgChange.setAttribute(\"src\", `../media/ico/menu/fill-${menuSections[elem]}.svg`);\r\n//                }\r\n     \r\n//           }\r\n//      }\r\n\r\n// }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://compiler/./js/basic/general/jsmenu.js?");

/***/ }),

/***/ "./js/basic/loginsign/jssign.js":
/*!**************************************!*\
  !*** ./js/basic/loginsign/jssign.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _general_jsfirebase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../general/jsfirebase.js */ \"./js/basic/general/jsfirebase.js\");\n// imports\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// gl variables\r\n// form\r\nconst mForm = document.querySelector(\"#mForm\"); \r\n\r\n\r\n\r\n\r\n// data list and wrong counter\r\nlet dList = {nome: true, email: true, senha: true, senhacadastral: true, tusuario: true};\r\nlet wrongC;\r\n\r\n\r\n// others\r\nconst closeMB = document.querySelector(\"#closeMsg\");\r\nconst msgB = document.getElementById(\"msgB\");\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// events\r\nmForm.addEventListener(\"submit\", fSubmit);\r\ncloseMB.addEventListener(\"click\", hideMsgB);\r\n\r\n\r\n\r\n\r\n// functions\r\n// main level - independents\r\n// ---------------------------------\r\nfunction fSubmit(ev) {\r\n    ev.preventDefault();\r\n    console.clear();\r\n\r\n    if(checkFields()) {\r\n        signResult()\r\n\r\n    } else {\r\n        showMsgB(\"inc\", generateDataErrorTxt(\"wrongCredentials\"));\r\n    }\r\n\r\n\r\n\r\n    // compl\r\n    async function signResult() {\r\n        let sRes = await signAttempt();\r\n\r\n\r\n        // analyze result\r\n        switch (sRes) {\r\n            case true:\r\n                showMsgB(\"cor\", \"Usuário cadastrado!\");\r\n                \r\n                break;\r\n\r\n            case \"auth/invalid-email\": \r\n                dList.email = false;\r\n                wrongC = 1;\r\n\r\n                showMsgB(\"inc\", generateDataErrorTxt(\"wrongCredentials\"));\r\n\r\n                break;\r\n\r\n\r\n            case \"auth/email-already-in-use\":\r\n                showMsgB(\"inc\", generateDataErrorTxt(\"userAlreadyExists\"));\r\n            \r\n                break;\r\n        }\r\n\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n// secondary level\r\n// ---------------------------------\r\nfunction checkFields() {\r\n    wrongC = 0;\r\n\r\n    // are the inputs filled?   \r\n    analyzeGinp()\r\n    analyzeRad()\r\n\r\n    \r\n    // send Result\r\n    if(Object.values(dList).includes(false)) {\r\n        console.log(\"Checkfields finalizado\");\r\n        return false\r\n  \r\n    } else {\r\n        console.log(\"Checkfields finalizado\")\r\n        return true\r\n    }\r\n\r\n\r\n\r\n\r\n    // compl\r\n    // gInput = generic input\r\n    function analyzeGinp() {\r\n        let mFormD = document.querySelectorAll(\".mfDep\"); // main form dependencies\r\n\r\n        mFormD.forEach((gInput) => {        \r\n            let aVal = gInput.value // analyzed value\r\n            let ipN = gInput.name // input id\r\n\r\n            // analyze each case\r\n            if((aVal == \"\")   ||   (ipN == \"nome\" && aVal.length < 3)   ||   (ipN == \"email\" && ! aVal.includes(\"@\"))   ||   (ipN == \"senha\" && aVal.length != 8))  {\r\n                // visual\r\n                console.log(`O campo ${ipN} não foi preenchido corretamente.`);\r\n    \r\n                // server-side\r\n                dList[ipN] = false;\r\n                wrongC++;\r\n            \r\n            } else {\r\n                dList[ipN] = true;\r\n            }\r\n        })\r\n\r\n    }\r\n\r\n\r\n    function analyzeRad() {        \r\n        let radioSel = document.querySelector(\"input[name=userType]:checked\");\r\n\r\n        if(radioSel == null) {\r\n            dList.tusuario = false;\r\n            wrongC++;\r\n\r\n            console.log(`O campo tipo de usuários não foi preenchido`);\r\n        } else {\r\n            dList.tusuario = true;\r\n        } \r\n    }\r\n}\r\n\r\n\r\n\r\n// ---\r\n\r\nasync function signAttempt() {\r\n    let res;\r\n\r\n    await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.createUserWithEmailAndPassword)(_general_jsfirebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, mForm.email.value, mForm.senha.value)\r\n      .then(() => {\r\n        addToDatabase()\r\n        console.log(_general_jsfirebase_js__WEBPACK_IMPORTED_MODULE_2__.auth.currentUser);\r\n        \r\n        res = true\r\n      })\r\n\r\n      .catch((err) => {\r\n        res = err.code\r\n        \r\n      }\r\n    );\r\n\r\n    return res\r\n\r\n\r\n    // compl\r\n    function addToDatabase() {\r\n        ;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(_general_jsfirebase_js__WEBPACK_IMPORTED_MODULE_2__.usersCol, {\r\n            name: mForm.nome.value,\r\n            email: mForm.email.value ,\r\n            usertype: obtainRadSel(),\r\n\r\n        });\r\n    }\r\n\r\n\r\n    function obtainRadSel() {\r\n      let input = document.querySelector(\"input[type=radio]:checked\");\r\n      return input.value\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n// ---\r\nfunction hideMsgB() {\r\n    msgB.style.display = \"none\";\r\n}\r\n\r\n\r\n\r\n// ---\r\nfunction generateDataErrorTxt(param) {\r\n    console.log(\"Error: \" + param);\r\n    let txtP;\r\n\r\n    if(param == \"wrongCredentials\") {\r\n        wcTextCreator();\r\n    \r\n    } else {\r\n        txtP = \"Esses dados já existem!\";       \r\n    }\r\n\r\n    return txtP;\r\n\r\n\r\n\r\n    // complementary functions\r\n    function wcTextCreator() {\r\n        txtP = wrongC > 1? \"Preencha corretamente as seções de: \" : \"Preencha corretamente a seção de \";\r\n\r\n        for(let attr in dList) {\r\n            if(dList[attr] == false) {             \r\n                addNtxt(attr)\r\n                addComma()\r\n                wrongC--;\r\n\r\n            }\r\n        }\r\n    }\r\n\r\n\r\n    function addNtxt(attr) {\r\n        if(attr == \"email\") {\r\n            txtP += \"e-mail\";\r\n\r\n        } else if (attr == \"senhacadastral\") {\r\n            txtP += \"senha cadastral\";\r\n\r\n        } else if (attr == \"tusuario\") {\r\n            txtP += \"tipo de usuário\";\r\n        \r\n        } else {\r\n            txtP += `${attr}`;\r\n        }\r\n    }\r\n\r\n\r\n    function addComma() {\r\n        //last one?\r\n        if((wrongC - 2) == 0) {\r\n            txtP += \" e \"\r\n\r\n        } else if((wrongC - 1) == 0) {\r\n            txtP += \".\"\r\n\r\n        } else {\r\n            txtP += \", \"\r\n        }\r\n\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n// third level\r\nfunction showMsgB(msgT, content /* msg type == incorrect/correct*/ ) {\r\n    createText()\r\n\r\n    if(msgB.classList.contains(msgT) == false) {\r\n        verifyRemoveAttr();  \r\n        addAttr();\r\n    } \r\n\r\n\r\n    msgB.style.display = \"flex\";\r\n\r\n\r\n\r\n    // compl\r\n    function createText() {\r\n        if(document.querySelector(\"#msgB > p\") != null) {\r\n            msgB.removeChild(document.querySelector(\"#msgB > p\"));\r\n        }\r\n\r\n        let createP = document.createElement(\"p\");\r\n        let txtC = document.createTextNode(content);\r\n    \r\n        createP.appendChild(txtC);\r\n        msgB.appendChild(createP);\r\n    }\r\n\r\n\r\n    function verifyRemoveAttr() {\r\n        if(msgT == \"inc\" && msgB.classList.contains(\"cor\")) {\r\n            msgB.classList.remove(\"cor\");\r\n            closeMB.classList.remove(\"cor\");\r\n        \r\n        } else if(msgB.classList.contains(\"inc\")) {\r\n            msgB.classList.remove(\"inc\");\r\n            closeMB.classList.remove(\"inc\");\r\n        }\r\n    }\r\n\r\n\r\n    function addAttr() {\r\n        msgB.classList.add(msgT);\r\n        closeMB.classList.add(msgT);\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://compiler/./js/basic/loginsign/jssign.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./js/basic/general/jsmenu.js"), __webpack_exec__("./js/basic/loginsign/jssign.js"));
/******/ }
]);