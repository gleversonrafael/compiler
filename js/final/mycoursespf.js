"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcompiler"] = self["webpackChunkcompiler"] || []).push([["mycoursesp"],{

/***/ "./js/basic/menu.js":
/*!**************************!*\
  !*** ./js/basic/menu.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\n/* harmony import */ var _userdata_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userdata.js */ \"./js/basic/userdata.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_userdata_js__WEBPACK_IMPORTED_MODULE_2__]);\n_userdata_js__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// var\r\nlet signoutB = document.querySelector(\"button#signoutB\");\r\n\r\nlet mMenuBox = document.getElementById(\"mMenuB\");\r\nconst mIcon = document.getElementById(\"mIcon\");\r\nlet bgEff = document.querySelector(\"#bgEff\");\r\nlet menuState = \"closed\";\r\n\r\n\r\n\r\n\r\n\r\n// events\r\ndocument.body.addEventListener(\"load\", menuVisualState())\r\n\r\n\r\n// toggle menu\r\nmIcon.addEventListener(\"click\", () => {\r\n     toggleMenu(true, true)\r\n});\r\n\r\nleaveM.addEventListener(\"click\", () => {\r\n     toggleMenu(true, true)\r\n});\r\n\r\n\r\nwindow.addEventListener(\"resize\", () => {\r\n     if(mMenuBox.style.display == \"none\" && window.innerWidth > 768) {\r\n          // only happens when the user, from a pc screen, changes viewpowrt to one lighter than 768px and open and closes the menu\r\n          toggleMenu(true, false);\r\n          \r\n     }\r\n\r\n\r\n     // maintain the menu visual state\r\n     if((window.innerWidth >= 768 && bgEff.style.display == \"block\") || (window.innerWidth < 768 && bgEff.style.display != \"block\" && menuState === \"open\")) {\r\n          toggleMenu(false, true);\r\n\r\n     } \r\n})\r\n\r\n\r\n\r\n\r\n\r\nsignoutB.addEventListener(\"click\", () => {\r\n     ;(0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signOut)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth);\r\n})\r\n\r\n\r\n\r\n\r\n// functions\r\n// m level\r\nfunction toggleMenu(changeDisplay, changeBackground) {\r\n     if(changeDisplay === true) {\r\n          // Menu is not open\r\n          if(menuState === \"closed\") {\r\n               mMenuBox.style.display = \"flex\";\r\n               mIcon.style.display = \"none\";\r\n               \r\n               menuState = \"open\";\r\n\r\n          // Menu is open\r\n          } else {\r\n               mMenuBox.style.display = \"none\";\r\n               mIcon.style.display = \"block\";\r\n               \r\n               menuState = \"closed\";\r\n          }\r\n     } \r\n\r\n\r\n     if(changeBackground === true) {\r\n          bgEff.style.display == \"block\" ? bgEff.style.display = \"none\" : bgEff.style.display = \"block\"\r\n     }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n// s level\r\nfunction menuVisualState() {\r\n     loadMenuBoxEffect()\r\n     loadNameAndType()\r\n\r\n\r\n     function loadNameAndType() {\r\n          let userName = document.getElementById(\"userName\");\r\n          let userType = document.getElementById(\"userType\");\r\n\r\n          userName.textContent = _userdata_js__WEBPACK_IMPORTED_MODULE_2__.userData.name;\r\n\r\n          userType.textContent = _userdata_js__WEBPACK_IMPORTED_MODULE_2__.userData.usertype == \"regular\"? \"Usuário comum\" : \"Administrador\";\r\n     }\r\n\r\n     function  loadMenuBoxEffect() {\r\n          let menuSections = [\"dashboard\", \"mycourses\", \"managecourses\", \"allcourses\", \"manageusers\"]\r\n\r\n          for(let elem in menuSections) {\r\n               if(window.location.href.includes(menuSections[elem])) {\r\n                    // create var\r\n                    let selMenuBox = document.getElementById(menuSections[elem]);\r\n                    let imgChange = document.querySelector(`a#${menuSections[elem]} > img`);\r\n     \r\n                    // css - change box and img\r\n                    selMenuBox.style.opacity = \"1\";\r\n                    selMenuBox.style.backgroundColor = \"#000\"\r\n     \r\n                    if(selMenuBox.id == \"dashboard\" || selMenuBox.id == \"mycourses\") {\r\n                         selMenuBox.style.borderBottom = \"1px solid var(--aqua)\";\r\n                         selMenuBox.style.color = \"var(--aqua)\";\r\n     \r\n                    } else {\r\n                         selMenuBox.style.borderBottom = \"1px solid var(--razz)\";\r\n                         selMenuBox.style.color = \"var(--razz)\";\r\n                    }\r\n     \r\n     \r\n     \r\n                    imgChange.setAttribute(\"src\", `../media/ico/menu/fill-${menuSections[elem]}.svg`);\r\n               }\r\n     \r\n          }\r\n     }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://compiler/./js/basic/menu.js?");

/***/ }),

/***/ "./js/basic/mycourses.js":
/*!*******************************!*\
  !*** ./js/basic/mycourses.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _userdata_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userdata.js */ \"./js/basic/userdata.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_userdata_js__WEBPACK_IMPORTED_MODULE_0__]);\n_userdata_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n\r\n\r\n\r\n// var\r\nconst coursesCol = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_fb_js__WEBPACK_IMPORTED_MODULE_2__.db, \"courses\");\r\nlet coursesData = {};\r\nlet searchButton = document.getElementById(\"searchButton\");\r\nlet searchInp = document.getElementById(\"searchInp\");\r\n\r\n\r\n\r\n\r\n// events\r\n// document.body.addEventListener(\"load\", showCourses);\r\nsearchButton.addEventListener(\"click\", () => {\r\n     showCourses(searchInp.value);\r\n});\r\n\r\nsearchInp.addEventListener(\"input\", () => {\r\n     showCourses(searchInp.value);\r\n})\r\n\r\n\r\n\r\n\r\n// functions\r\n// main level\r\nasync function showCourses(searchedContent) {\r\n     if(await obtainAllowedCoursesData(searchedContent) === true) {\r\n          createCoursesBoxes();\r\n     \r\n     } else {\r\n          let coursesA = document.getElementById(\"coursesA\");\r\n\r\n          coursesA.innerHTML = \"\";\r\n          // noDataObtained();\r\n\r\n     }\r\n\r\n}\r\n\r\n\r\nfunction openBox(event) {  \r\n     let courseId = obtainClickedCourseId();\r\n     let elementData = coursesData[courseId];\r\n     \r\n     openBox();\r\n\r\n\r\n\r\n     // compl    \r\n     function obtainClickedCourseId() {\r\n          let clickedElement = event.target;\r\n\r\n          // div child clicked?\r\n          if(clickedElement.childElementCount == 0) {\r\n               return clickedElement.parentElement.id;\r\n          \r\n          } else {\r\n               return clickedElement.id;\r\n          }\r\n     }\r\n\r\n\r\n     function openBox() {\r\n          let courseBox = document.getElementById(courseId);\r\n          courseBox.classList.add(\"open\");\r\n\r\n          createElements()\r\n\r\n\r\n\r\n          // aside\r\n          function createElements() {\r\n               // var\r\n               let elements = {\r\n                    divType: {\r\n                         createdContent: document.createElement(\"div\"),\r\n\r\n                         emailDiv: document.createElement(\"div\"),\r\n                         emailDivChild: document.createElement(\"div\"),\r\n\r\n                         passwordDiv: document.createElement(\"div\")\r\n                    },\r\n\r\n\r\n                    pType: {\r\n                         emailP: document.createElement(\"p\"),\r\n                         emailValue: document.createElement(\"p\"),\r\n\r\n                         passwordP: document.createElement(\"p\"),\r\n                         passwordValue: document.createElement(\"p\")\r\n                    },\r\n\r\n                    \r\n                    others: {\r\n                         userDataSubtitle: document.createElement(\"h3\"),\r\n                         acessAnchor: document.createElement(\"a\"),\r\n\r\n                         copyEmail: document.createElement(\"button\"),\r\n                         copyPassword: document.createElement(\"button\")\r\n                    }\r\n               }\r\n\r\n\r\n               // data values\r\n               elements.others.userDataSubtitle.innerText = \"Dados\"\r\n               elements.pType.others\r\n\r\n          }\r\n     }\r\n}\r\n\r\n\r\n\r\n\r\n// secondary level\r\nasync function obtainAllowedCoursesData(searchedContent) {\r\n     // query process\r\n     let mycoursesQuery = createQuery();\r\n\r\n\r\n     let insertData = new Promise((dataObtained, noData) => {\r\n          (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.onSnapshot)(mycoursesQuery, (dataState) => {\r\n               // add value to coursesData\r\n               dataState.forEach((currentDocument)=> {\r\n                    Object.defineProperty(coursesData, currentDocument.id, {\r\n                         value: currentDocument.data(),\r\n                         writable: true,\r\n                         configurable: true,\r\n                         enumerable: true\r\n     \r\n                    })\r\n               })\r\n\r\n\r\n               // is there any data obtained?\r\n               if(Object.entries(coursesData).length === 0) {\r\n                    noData(\"No courses were found.\");     \r\n               \r\n               } else {\r\n                    dataObtained();   \r\n               }\r\n          })\r\n\r\n     })\r\n\r\n\r\n\r\n     // process\r\n     let insertDataResult;\r\n     coursesData = {};\r\n\r\n\r\n     await insertData\r\n     .then(() => {\r\n          insertDataResult = true\r\n\r\n     })\r\n     .catch((msg) => {\r\n          console.log(msg);\r\n          insertDataResult = false\r\n     })\r\n\r\n\r\n     return insertDataResult\r\n\r\n\r\n\r\n     // complementary\r\n     function createQuery() {\r\n          let queryResult;\r\n\r\n\r\n          if(searchedContent === undefined || searchedContent === \"\") {\r\n               queryResult = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)(coursesCol, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)(\"usersWithAcess\", \"array-contains\", _userdata_js__WEBPACK_IMPORTED_MODULE_0__.userData.uid));\r\n          \r\n          } else {\r\n               queryResult = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)(coursesCol, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)(\"usersWithAcess\", \"array-contains\", _userdata_js__WEBPACK_IMPORTED_MODULE_0__.userData.uid), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)(\"courseName\", \"==\",  searchedContent));  \r\n\r\n          }\r\n\r\n          return queryResult\r\n     }\r\n\r\n\r\n}\r\n\r\n\r\n\r\n\r\n// third level\r\nfunction createCoursesBoxes() {\r\n     let coursesArea =  document.querySelector(\"section#coursesA\")\r\n     coursesArea.innerHTML = \"\";\r\n\r\n\r\n     Object.entries(coursesData).forEach((data) => {\r\n          // var\r\n          let courseId = data[0];\r\n          let courseValues = data[1];\r\n\r\n\r\n          let courseProperties = {\r\n               courseBox: document.createElement(\"div\"), \r\n               title: document.createElement(\"h1\"),\r\n               platform: document.createElement(\"h2\")\r\n          }\r\n\r\n\r\n\r\n          // ids and event\r\n          courseProperties.courseBox.id = courseId;\r\n          courseProperties.courseBox.onclick = openBox;\r\n\r\n\r\n          // set data\r\n          courseProperties.title.innerText = courseValues.courseName;\r\n          courseProperties.platform.innerText = `Plataforma:${courseValues.coursePlatform}`;\r\n\r\n\r\n          // remover nomes e subtitulos no objeto posteriormente, para agilizar o programa\r\n\r\n          // create elements\r\n          courseProperties.courseBox.appendChild(courseProperties.title);\r\n          courseProperties.courseBox.appendChild(courseProperties.platform);\r\n          coursesArea.appendChild(courseProperties.courseBox);\r\n     })\r\n\r\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://compiler/./js/basic/mycourses.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./js/basic/menu.js"), __webpack_exec__("./js/basic/mycourses.js"));
/******/ }
]);