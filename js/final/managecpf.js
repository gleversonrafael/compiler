"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcompiler"] = self["webpackChunkcompiler"] || []).push([["managecp"],{

/***/ "./js/basic/manageandmycourses.js":
/*!****************************************!*\
  !*** ./js/basic/manageandmycourses.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mycourses_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mycourses.js */ \"./js/basic/mycourses.js\");\n/* harmony import */ var _userdata_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userdata.js */ \"./js/basic/userdata.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_userdata_js__WEBPACK_IMPORTED_MODULE_1__]);\n_userdata_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// other js\r\n\r\n\r\n\r\n\r\n// firebase\r\n\r\n\r\n\r\n\r\n// var\r\nconst coursesCol = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(_fb_js__WEBPACK_IMPORTED_MODULE_3__.db, \"courses\");\r\nlet coursesData = {};\r\nlet othersData = {};\r\n\r\nlet callPurpose;\r\n\r\nlet pageType = window.location.href.includes(\"mycourses\") ? \"myCourses\" : \"manageCourses\"\r\nlet searchInp = document.getElementById(\"searchInp\");\r\n\r\n\r\n\r\n\r\n\r\n// events\r\nsearchInp.addEventListener(\"input\", () => {\r\n     pageType === \"manageCourses\" ? managerShowCourses() : showCourses(searchInp.value);\r\n});\r\n\r\n\r\n(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.onSnapshot)(coursesCol, ()=> {\r\n     pageType === \"manageCourses\" ? managerShowCourses() : showCourses();\r\n});\r\n\r\n\r\n\r\n// functions\r\n// main level\r\nasync function managerShowCourses() {\r\n     callPurpose = \"my\";\r\n     await showCourses(searchInp.value);\r\n\r\n     if(pageType === \"manageCourses\") {\r\n          callPurpose = \"others\";\r\n          showCourses(searchInp.value);\r\n     }\r\n}\r\n\r\n\r\nasync function showCourses(searchedContent) {\r\n     if(await obtainAllowedCoursesData(searchedContent) === true) {\r\n          createCoursesBoxes();\r\n     \r\n     } else {\r\n          eraseColumns()\r\n     }\r\n}\r\n\r\n\r\nfunction openBox(event) {  \r\n     let courseId\r\n     let courseBox\r\n     let elementData;\r\n     \r\n     if(! isInDeleteMode()) {\r\n          // var\r\n          courseId = obtainCourseId()\r\n          courseBox = document.getElementById(courseId);\r\n\r\n\r\n          // process\r\n          if(courseBox != null && ! courseBox.classList.contains(\"open\")) {\r\n               changeCallPurposeViaOpenBox()\r\n               elementData = obtainDataSelected()[courseId];\r\n\r\n               showElements()\r\n          }\r\n     }\r\n\r\n\r\n\r\n\r\n     // compl   \r\n     function isInDeleteMode() {\r\n          let temporaryCourses = document.querySelectorAll(\".coursesColumn > .canBeDeleted, .coursesColumn > .willBeDeleted\").length;\r\n\r\n          if(temporaryCourses != 0) {\r\n               return true\r\n          } \r\n     }\r\n\r\n\r\n     function obtainCourseId() {\r\n          if(event.target.tagName === \"DIV\") {\r\n               return event.target.id\r\n\r\n          } else {\r\n               return event.target.parentElement.id\r\n          }\r\n     }\r\n     \r\n     \r\n     function changeCallPurposeViaOpenBox() {\r\n          let coursesAreaSelected = courseBox.parentElement.parentElement.id;\r\n\r\n          if(coursesAreaSelected === \"coursesA\") {\r\n               callPurpose = \"my\" \r\n          \r\n          } else {\r\n               callPurpose = \"others\"\r\n          }\r\n     }\r\n\r\n\r\n     function showElements() {\r\n          courseBox.classList.add(\"open\");\r\n\r\n          createElements()\r\n\r\n\r\n          // aside\r\n          function createElements() {\r\n               // var\r\n               let elements = {\r\n                    divType: {\r\n                         createdContent: document.createElement(\"div\"),\r\n\r\n                         emailDiv: document.createElement(\"div\"),\r\n                         emailDivChild: document.createElement(\"div\"),\r\n\r\n                         passwordDiv: document.createElement(\"div\"),\r\n                         passwordDivChild: document.createElement(\"div\"),\r\n                    },\r\n\r\n\r\n                    pType: {\r\n                         emailParagraph: document.createElement(\"p\"),\r\n                         emailValue: document.createElement(\"p\"),\r\n\r\n                         passwordParagraph: document.createElement(\"p\"),\r\n                         passwordValue: document.createElement(\"p\")\r\n                    },\r\n\r\n\r\n                    others: {\r\n                         userDataSubtitle: document.createElement(\"h3\"),\r\n\r\n                         acessAnchor: document.createElement(\"a\"),\r\n                         closeButton: document.createElement(\"button\"),\r\n\r\n                         emailCopy: document.createElement(\"button\"),\r\n                         passwordCopy: document.createElement(\"button\")\r\n                    }\r\n               }\r\n\r\n\r\n               setParagraphs()\r\n               setOthers()\r\n               allocateDivs()\r\n\r\n\r\n               // compl\r\n               function setParagraphs() {                    \r\n                    elements.pType.emailParagraph.innerText = \"E-mail\";\r\n                    elements.pType.passwordParagraph.innerText = \"Senha\";\r\n\r\n                    elements.pType.emailValue.innerText = elementData.email;\r\n                    elements.pType.passwordValue.innerText = elementData.userPassword;\r\n\r\n\r\n                    // set classes\r\n                    for(let p in elements.pType) {\r\n                         if(p.includes(\"Paragraph\")) {\r\n                              elements.pType[p].classList.add(\"fieldName\");\r\n                         \r\n                         } else {\r\n                              elements.pType[p].classList.add(\"fieldValue\");\r\n                         }\r\n                    }\r\n               }\r\n\r\n\r\n               function setOthers() {\r\n                    elements.others.userDataSubtitle.innerText = \"Dados\";\r\n\r\n                    elements.others.acessAnchor.innerText = \"Acessar\";\r\n                    elements.others.closeButton.innerText = \"Fechar\";\r\n                    elements.others.closeButton.onclick = closeBox;\r\n\r\n                    elements.others.acessAnchor.setAttribute(\"href\", elementData.url);\r\n                    elements.others.acessAnchor.setAttribute(\"target\", \"_blank\");\r\n\r\n\r\n                    for(let copybutton in elements.others) {\r\n                         if(copybutton.includes(\"Copy\")) {\r\n                              elements.others[copybutton].classList.add(\"copyButton\");\r\n                              elements.others[copybutton].onclick = _mycourses_js__WEBPACK_IMPORTED_MODULE_0__.copyData\r\n                         }\r\n                    }\r\n               }\r\n\r\n               \r\n               function allocateDivs() {\r\n                    allocateChildren();\r\n                    allocateFathers();\r\n\r\n\r\n                    function allocateChildren() {\r\n                         // allocate child divs\r\n                         for(let div in elements.divType) {\r\n                              let attributeName;\r\n\r\n                              // allocate child\r\n                              if(div.includes(\"Child\")) {\r\n                                   // div name - DivChild\r\n                                   attributeName = div.substring(0, div.length - 8);\r\n\r\n                                   elements.divType[div].appendChild(elements.pType[`${attributeName}Paragraph`]);\r\n                                   elements.divType[div].appendChild(elements.pType[`${attributeName}Value`]);\r\n                              \r\n\r\n                              // allocate content divs(email and password)\r\n                              } else if(! div.includes(\"createdContent\")) {\r\n                                   // div name - Div\r\n                                   attributeName = div.substring(0, div.length - 3);\r\n\r\n                                   elements.divType[div].appendChild(elements.divType[`${attributeName}DivChild`]);\r\n                                   elements.divType[div].appendChild(elements.others[`${attributeName}Copy`]);\r\n                              }\r\n                         }\r\n                    }\r\n\r\n\r\n                    function allocateFathers() {\r\n                         // append pode não funcionar em outros navegadores.\r\n                         elements.divType.createdContent.append(elements.others.userDataSubtitle, elements.divType.emailDiv, elements.divType.passwordDiv, elements.others.acessAnchor, elements.others.closeButton);\r\n\r\n                         elements.divType.createdContent.classList.add(\"createdContent\");\r\n     \r\n                         courseBox.appendChild(elements.divType.createdContent);\r\n\r\n                    }\r\n               }\r\n          }\r\n     }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction closeBox(ev) {\r\n     let previouslyCreatedContent = ev.currentTarget.parentElement;\r\n     let courseBox = previouslyCreatedContent.parentElement;\r\n\r\n\r\n     previouslyCreatedContent.remove();\r\n     courseBox.classList.remove(\"open\");\r\n}\r\n\r\n\r\n\r\n\r\n// secondary level\r\nasync function obtainAllowedCoursesData(searchedContent) {\r\n     callPurpose === \"others\" ? othersData = {} : coursesData = {}\r\n\r\n     // query process\r\n     let coursesQuery = createQuery();\r\n\r\n     let insertData = new Promise((dataObtained, noData) => {\r\n          (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.onSnapshot)(coursesQuery, (dataState) => {\r\n               // add value to coursesData and othersData\r\n               dataState.forEach((currentDocument)=> {\r\n                    Object.defineProperty(obtainDataSelected(), currentDocument.id, {\r\n                         value: currentDocument.data(),\r\n                         writable: true,\r\n                         configurable: true,\r\n                         enumerable: true,\r\n     \r\n                    })\r\n               })\r\n\r\n\r\n               // is there any data obtained?\r\n               if(Object.entries(obtainDataSelected()).length === 0) {\r\n                    noData();     \r\n               \r\n               } else {\r\n                    dataObtained();   \r\n               }\r\n          })\r\n     })\r\n\r\n\r\n\r\n     // process\r\n     let insertDataResult;\r\n\r\n\r\n     await insertData\r\n     .then(() => {\r\n          insertDataResult = true\r\n\r\n     })\r\n     .catch(() => {\r\n          insertDataResult = false\r\n     })\r\n\r\n     return insertDataResult\r\n\r\n\r\n\r\n     // complementary\r\n     function createQuery() {\r\n          let queryResult;\r\n          let whereType = obtainPageWhere();\r\n\r\n          if(searchedContent === undefined || searchedContent === \"\") {\r\n               queryResult = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(coursesCol, whereType);\r\n\r\n          } else {\r\n               queryResult = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(coursesCol, whereType, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.where)(\"courseName\", \"==\", searchedContent));\r\n          }\r\n\r\n          \r\n          return queryResult\r\n\r\n\r\n          // compl\r\n          function obtainPageWhere() {\r\n               let whereResult;\r\n\r\n               if(pageType === \"myCourses\") {\r\n                    whereResult = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.where)(\"usersWithAcess\", \"array-contains\", _userdata_js__WEBPACK_IMPORTED_MODULE_1__.userData.uid);\r\n\r\n               } else if(callPurpose != \"others\"){\r\n                    whereResult = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.where)(\"creator\", \"==\", _userdata_js__WEBPACK_IMPORTED_MODULE_1__.userData.uid);\r\n               \r\n               } else {\r\n                    whereResult = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.where)(\"creator\", \"!=\", _userdata_js__WEBPACK_IMPORTED_MODULE_1__.userData.uid);\r\n\r\n               }\r\n\r\n\r\n               return whereResult;\r\n          }    \r\n     }\r\n}\r\n\r\n\r\n\r\n\r\n// third level\r\nfunction createCoursesBoxes() {\r\n     let coursesColumns;\r\n\r\n     if(callPurpose != \"others\") {\r\n          coursesColumns = document.querySelectorAll(\"#coursesA > .coursesColumn\");\r\n\r\n     } else {\r\n          coursesColumns = document.querySelectorAll(\"#othersA > .coursesColumn\");\r\n     }\r\n\r\n     coursesColumns.forEach((column) => {\r\n          column.innerHTML = \"\";\r\n     })\r\n\r\n     createBoxes()\r\n\r\n\r\n     function createBoxes() {\r\n          Object.entries(obtainDataSelected()).forEach((data) => {\r\n               // var\r\n               let courseId = data[0];\r\n               let courseValues = data[1];\r\n               let selectedColumn = coursesColumns[0].childElementCount > coursesColumns[1].childElementCount? coursesColumns[1]: coursesColumns[0];\r\n\r\n\r\n               let courseProperties = {\r\n                    courseBox: document.createElement(\"div\"), \r\n                    title: document.createElement(\"h1\"),\r\n                    platform: document.createElement(\"h2\"),\r\n               }\r\n\r\n\r\n               // ids and event\r\n               courseProperties.courseBox.id = courseId;\r\n               courseProperties.courseBox.onclick = openBox;\r\n\r\n\r\n               // set data\r\n               courseProperties.title.innerText = courseValues.courseName;\r\n               courseProperties.platform.innerText = `Plataforma:${courseValues.coursePlatform}`;\r\n\r\n\r\n               // create elements -- continue\r\n               if(courseValues.img != undefined) {\r\n                    courseProperties.courseBox.appendChild(createImg());\r\n               }\r\n\r\n               courseProperties.courseBox.appendChild(courseProperties.title);\r\n\r\n               if(courseValues.coursePlatform != undefined) {\r\n                    courseProperties.courseBox.appendChild(courseProperties.platform);\r\n               }\r\n               \r\n               selectedColumn.appendChild(courseProperties.courseBox);\r\n\r\n\r\n               // compl\r\n               function createImg() {\r\n                    let img = document.createElement(\"img\");\r\n                    img.setAttribute(\"src\", courseValues.img);\r\n\r\n                    return img\r\n               }\r\n          })\r\n     }  \r\n\r\n}\r\n\r\n\r\nfunction obtainDataSelected() {\r\n     if(callPurpose === \"others\") {\r\n          return othersData\r\n\r\n     } else {\r\n          return coursesData\r\n     }\r\n\r\n}   \r\n\r\n\r\nfunction eraseColumns() {\r\n     let coursesColumns;\r\n\r\n     if(obtainDataSelected() === othersData) {\r\n          coursesColumns = document.querySelectorAll(\"#othersA > .coursesColumn\");\r\n\r\n     } else {\r\n          coursesColumns = document.querySelectorAll(\"#coursesA > .coursesColumn\");\r\n     }\r\n \r\n\r\n     coursesColumns.forEach((column) => {\r\n          column.innerHTML = \"\";\r\n\r\n     });\r\n}\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://compiler/./js/basic/manageandmycourses.js?");

/***/ }),

/***/ "./js/basic/managecourses.js":
/*!***********************************!*\
  !*** ./js/basic/managecourses.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\n/* harmony import */ var _userdata_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userdata.js */ \"./js/basic/userdata.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_userdata_js__WEBPACK_IMPORTED_MODULE_2__]);\n_userdata_js__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// firebase\r\n\r\n\r\n\r\n\r\n\r\n// generalVars\r\nlet createCourseForm = document.getElementById(\"createCourseForm\");\r\nlet deleteCourseState;\r\nlet addCourseButton = document.getElementById(\"addCourseButton\");\r\n\r\n\r\n\r\n\r\n\r\n\r\n// create course global var\r\nlet backgroundEffect = document.getElementById(\"bgEff\");\r\nlet createCourseBox = document.getElementById(\"createCourseBox\");\r\nlet createCourseBoxPage;\r\n\r\nlet returnCreateCourse = document.getElementById(\"returnCreateCourse\");\r\nlet acessB = document.getElementById(\"acessB\");\r\n\r\n\r\n// create course box events\r\naddCourseButton.addEventListener(\"click\", toggleCreateCourseBox);\r\n\r\ndocument.getElementById(\"closeCreateCourseBox\").addEventListener(\"click\", toggleCreateCourseBox);\r\n\r\n\r\ndocument.getElementById(\"returnCreateCourse\").addEventListener(\"click\", changeCourseBoxPage);\r\n\r\n\r\nacessB.addEventListener(\"click\", (ev) => {\r\n     ev.preventDefault();\r\n     changeCourseBoxPage();\r\n});\r\n\r\n\r\n\r\n\r\n// createCourseBox\r\nfunction toggleCreateCourseBox() {\r\n     if(createCourseBox.style.display != \"block\") {\r\n          showCreateCourseBox()\r\n\r\n     } else {\r\n          createCourseBox.style.display = \"none\";\r\n          backgroundEffect.style.display = \"none\";\r\n     }\r\n\r\n\r\n     // complementary\r\n     function showCreateCourseBox() {\r\n          backgroundEffect.style.display = \"flex\";\r\n          createCourseBox.style.display = \"block\";\r\n\r\n          createCourseBoxPage = 2\r\n     \r\n          changeCourseBoxPage()\r\n     }\r\n}\r\n\r\n\r\nfunction changeCourseBoxPage() {\r\n     let searchUserBox = document.getElementById(\"searchUserBox\");\r\n\r\n     if(createCourseBoxPage === 2) {\r\n          returnCreateCourse.style.display = \"none\"\r\n\r\n          searchUserBox.style.display = \"none\";\r\n          createCourseForm.style.display = \"flex\";\r\n     \r\n          createCourseBoxPage = 1;\r\n     \r\n     } else {\r\n          returnCreateCourse.style.display = \"flex\"\r\n\r\n          createCourseForm.style.display = \"none\";\r\n          searchUserBox.style.display = \"flex\";\r\n\r\n          createCourseBoxPage = 2;\r\n\r\n          if(document.getElementById(\"userList\").childElementCount == 0) {\r\n               loadUserList()\r\n          }\r\n     }\r\n}\r\n\r\n\r\n\r\n\r\n// userlist -- grant acess\r\n// var\r\nlet canEditAcess;\r\nlet userList = document.getElementById(\"userList\");\r\n\r\nlet grantAcessButton = document.getElementById(\"grantAcessButton\");\r\nlet removeAcessButton = document.getElementById(\"removeAcessButton\");\r\n\r\n\r\n// events\r\ngrantAcessButton.addEventListener(\"click\", () => {\r\n     canEditAcess = canEditAcess != true ? true : false\r\n     editAcessState(\"grant\");\r\n\r\n});\r\n\r\nremoveAcessButton.addEventListener(\"click\", () => {\r\n     canEditAcess = canEditAcess != true ? true : false\r\n     editAcessState(\"remove\")\r\n})\r\n\r\n\r\n// functions\r\nfunction loadUserList() {\r\n     let avoidPlayerQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.query)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.usersCol, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.where)(\"uid\", \"!=\", _userdata_js__WEBPACK_IMPORTED_MODULE_2__.userData.uid))\r\n\r\n     ;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.onSnapshot)(avoidPlayerQuery, (dataState) => {\r\n          dataState.forEach((userInfo) => {\r\n               let requiredInfo = {\r\n                    name: userInfo.data().name,\r\n                    email: userInfo.data().email,\r\n                    uid: userInfo.data().uid\r\n               }\r\n\r\n               createUserSelectBox(requiredInfo);\r\n          })\r\n     })\r\n\r\n\r\n     // complementary\r\n     function createUserSelectBox(aUserData) {\r\n          let data = { \r\n               usernameP:  document.createElement(\"p\"),\r\n               useremailP: document.createElement(\"p\"),\r\n               genericLi: document.createElement(\"li\") \r\n          }\r\n\r\n          data.usernameP.textContent = aUserData.name;\r\n          data.useremailP.textContent = aUserData.email;\r\n\r\n          data.usernameP.classList.add(\"username\");\r\n          data.useremailP.classList.add(\"useremail\");\r\n          \r\n          data.genericLi.id = aUserData.uid;\r\n\r\n          data.genericLi.appendChild(data.usernameP);\r\n          data.genericLi.appendChild(data.useremailP);\r\n\r\n          userList.appendChild(data.genericLi);\r\n     }\r\n}\r\n\r\n\r\nfunction editAcessState(typeOfCall) { \r\n     // main process\r\n     toggleSelectBoxes()\r\n\r\n     if(canEditAcess === true) {\r\n          typeOfCall === \"grant\" ? removeAcessButton.setAttribute(\"disabled\", \"\") : grantAcessButton.setAttribute(\"disabled\", \"\");\r\n     \r\n     } else {\r\n          typeOfCall === \"grant\" ? removeAcessButton.removeAttribute(\"disabled\") : grantAcessButton.removeAttribute(\"disabled\");\r\n     }\r\n\r\n     \r\n\r\n\r\n     // complementary\r\n     function grantOrRemoveAcess(ev) {\r\n          let li = ev.currentTarget;\r\n\r\n          if(li.classList.contains(\"editableBox\")) {\r\n               typeOfCall === \"grant\" ? li.classList.add(\"acessGranted\") : li.classList.remove(\"acessGranted\");\r\n\r\n               li.classList.remove(\"editableBox\");   \r\n          }\r\n\r\n          li.removeEventListener(\"click\", grantOrRemoveAcess)\r\n     }\r\n\r\n\r\n     function toggleSelectBoxes() {\r\n          let usersBoxes = document.querySelectorAll(\"#userList > li\");\r\n     \r\n\r\n          for(let li = 0; li < usersBoxes.length; li ++) {\r\n               // unselect boxes - analyze if a button is disabled\r\n               if(usersBoxes[li].classList.contains(\"editableBox\") && (grantAcessButton.hasAttribute(\"disabled\") || removeAcessButton.hasAttribute(\"disabled\"))) {\r\n                    usersBoxes[li].classList.remove(\"editableBox\");\r\n                    // couldn\"t directly remove event listener from here.\r\n\r\n\r\n               // select boxes\r\n               } else if(typeOfCall === \"grant\" && (! usersBoxes[li].classList.contains(\"acessGranted\")) || (typeOfCall === \"remove\" && usersBoxes[li].classList.contains(\"acessGranted\"))) {\r\n\r\n                    usersBoxes[li].classList.add(\"editableBox\");\r\n                    usersBoxes[li].addEventListener(\"click\", grantOrRemoveAcess);\r\n               } \r\n          }\r\n     \r\n     }\r\n}\r\n\r\n\r\n\r\n\r\n// createCourse\r\ncreateCourseForm.addEventListener(\"submit\", (ev) => {\r\n     ev.preventDefault();\r\n     createCourse();\r\n} )\r\n\r\n\r\nfunction createCourse() {\r\n     //if(analyzeInputs()) {\r\n          uploadCourse()\r\n\r\n     //}\r\n\r\n\r\n     function uploadCourse() {\r\n          ;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.coursesCol, {\r\n               courseName: document.getElementById(\"courseNameInp\").value,\r\n               coursePlatform: document.getElementById(\"coursePlatformInp\").value,\r\n               \r\n               email: document.getElementById(\"emailInp\").value,\r\n               userPassword: document.getElementById(\"userPasswordInp\").value,\r\n               \r\n               url: document.getElementById(\"urlInp\").value,\r\n               img: document.getElementById(\"imgInp\").value,\r\n\r\n               creator: _userdata_js__WEBPACK_IMPORTED_MODULE_2__.userData.uid,\r\n               usersWithAcess: obtainUsers()\r\n          })\r\n     }\r\n\r\n\r\n     function obtainUsers() {\r\n          let usersWithAcess = [];\r\n          let usersIds = document.querySelectorAll(\"#userList > .acessGranted\");\r\n\r\n          for(let iterator = 0; iterator < usersIds.length; iterator ++) {\r\n               usersWithAcess.push(usersIds[iterator].id);\r\n          }\r\n\r\n          return usersWithAcess;\r\n     }\r\n     \r\n}\r\n\r\n\r\n\r\n\r\n// delete course\r\n// var\r\nlet deletedCourses = [];\r\nlet deleteCourseBox = document.getElementById(\"deleteCourseBox\");\r\nlet deleteCourseButton = document.getElementById(\"deleteCourseButton\");\r\nlet submitExclusionButton = document.getElementById(\"confirmExclusion\");\r\n\r\n\r\n// events\r\ndeleteCourseButton.addEventListener(\"click\", () => {\r\n     if(deleteCourseState != true) {\r\n          deleteCourseState = true;\r\n          selectCoursesThatWillBeDeleted();\r\n\r\n     } else {\r\n          openDeleteCourseBox();\r\n     }\r\n\r\n});\r\n\r\nsubmitExclusionButton.addEventListener(\"click\", deleteCourses);\r\n\r\n\r\ndocument.getElementById(\"cancelExclusion\").addEventListener(\"click\", () => {\r\n     if(deleteCourseState === true) {\r\n          closeDeleteBox(false);\r\n     }\r\n});\r\n\r\ndocument.getElementById(\"changeExclusion\").addEventListener(\"click\", () => {\r\n     if(deleteCourseState === true) {\r\n          closeDeleteBox(true);\r\n     }\r\n});\r\n\r\n\r\n// functions\r\nasync function deleteCourses() {\r\n     for(let actualId = 0; actualId < deletedCourses.length; actualId++) {\r\n          let temporaryDoc = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.db, \"courses\", deletedCourses[actualId]);\r\n\r\n          await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.deleteDoc)(temporaryDoc)\r\n     }\r\n\r\n     closeDeleteBox(false);\r\n}\r\n\r\n\r\nfunction selectCoursesThatWillBeDeleted() {\r\n     selectCourses();\r\n\r\n     if(deleteCourseState === true) {\r\n          addCourseButton.setAttribute(\"disabled\", \"\");\r\n     \r\n     } else {\r\n          addCourseButton.removeAttribute(\"disabled\");\r\n     }  \r\n\r\n\r\n     // complementary\r\n     function selectCourses() {\r\n          let courses = document.querySelectorAll(\".coursesColumn > div\");\r\n\r\n          for(let i = 0; i < courses.length; i ++) {\r\n               if(deleteCourseState === true) {\r\n                    courses[i].classList.add(\"canBeDeleted\");\r\n                    courses[i].addEventListener(\"click\", addDeletedCourseState);\r\n\r\n               } else {\r\n                    courses[i].removeAttribute(\"class\");\r\n                    courses[i].removeEventListener(\"click\", addDeletedCourseState);\r\n               }\r\n          } \r\n     }\r\n}\r\n\r\nfunction openDeleteCourseBox() {\r\n     // process\r\n     obtainDeletedCourses()\r\n     setErrorCounter()\r\n\r\n     backgroundEffect.style.display = \"flex\";\r\n     deleteCourseBox.style.display = \"flex\";\r\n\r\n\r\n     function obtainDeletedCourses() {\r\n          let coursesSelected = document.querySelectorAll(\".willBeDeleted\");\r\n\r\n          coursesSelected.forEach((selectedCourse) => {\r\n               deletedCourses.push(selectedCourse.id);\r\n          })\r\n     }\r\n\r\n\r\n     function setErrorCounter() {\r\n          let deletedCoursesText = document.getElementById(\"deletedCoursesCounter\");\r\n          \r\n          if(deletedCourses.length > 0) {\r\n               let courseComplement = deletedCourses.length > 1? \"cursos\" : \"curso\"\r\n\r\n               deletedCoursesText.innerText = `Deseja excluir ${deletedCourses.length} ${courseComplement}?`\r\n               submitExclusionButton.removeAttribute(\"disabled\");\r\n          \r\n          } else {\r\n               deletedCoursesText.innerText = \"Não há cursos a serem excluídos.\"\r\n               submitExclusionButton.setAttribute(\"disabled\", \"\");\r\n          }\r\n     }\r\n}\r\n\r\n\r\nfunction addDeletedCourseState(ev) {\r\n     let selectedBox = ev.currentTarget\r\n\r\n     if(selectedBox.classList.contains(\"canBeDeleted\")) {\r\n          selectedBox.classList.remove(\"canBeDeleted\");\r\n          selectedBox.classList.add(\"willBeDeleted\");\r\n\r\n     } else {\r\n          selectedBox.classList.remove(\"willBeDeleted\");\r\n          selectedBox.classList.add(\"canBeDeleted\");\r\n     }\r\n}\r\n\r\n\r\nfunction closeDeleteBox(maintain) {\r\n     backgroundEffect.style.display = \"none\";\r\n     deleteCourseBox.style.display = \"none\";\r\n\r\n     if(maintain != true) {\r\n          addCourseButton.removeAttribute(\"disabled\");   \r\n          deletedCourses = [];\r\n          deleteCourseState = false;\r\n\r\n          document.querySelectorAll(\".canBeDeleted, .willBeDeleted\").forEach((selectedElement) => {\r\n               selectedElement.removeAttribute(\"class\");\r\n               selectedElement.removeEventListener(\"click\", addDeletedCourseState);\r\n\r\n          })\r\n     } \r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://compiler/./js/basic/managecourses.js?");

/***/ }),

/***/ "./js/basic/menu.js":
/*!**************************!*\
  !*** ./js/basic/menu.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _fb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fb.js */ \"./js/basic/fb.js\");\n/* harmony import */ var _userdata_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userdata.js */ \"./js/basic/userdata.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_userdata_js__WEBPACK_IMPORTED_MODULE_2__]);\n_userdata_js__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// var\r\nlet signoutB = document.querySelector(\"button#signoutB\");\r\n\r\nlet mMenuBox = document.getElementById(\"mMenuB\");\r\nconst mIcon = document.getElementById(\"mIcon\");\r\nlet bgEff = document.querySelector(\"#bgEff\");\r\nlet menuState = \"closed\";\r\n\r\n\r\n\r\n\r\n\r\n// events\r\ndocument.body.addEventListener(\"load\", menuVisualState())\r\n\r\n\r\n// toggle menu\r\nmIcon.addEventListener(\"click\", () => {\r\n     toggleMenu(true, true)\r\n});\r\n\r\nleaveM.addEventListener(\"click\", () => {\r\n     toggleMenu(true, true)\r\n});\r\n\r\n\r\nwindow.addEventListener(\"resize\", () => {\r\n     if(mMenuBox.style.display == \"none\" && window.innerWidth > 768) {\r\n          // only happens when the user, from a pc screen, changes viewpowrt to one lighter than 768px and open and closes the menu\r\n          toggleMenu(true, false);\r\n          \r\n     }\r\n\r\n\r\n     // maintain the menu visual state\r\n     if((window.innerWidth >= 768 && bgEff.style.display == \"block\") || (window.innerWidth < 768 && bgEff.style.display != \"block\" && menuState === \"open\")) {\r\n          toggleMenu(false, true);\r\n\r\n     } \r\n})\r\n\r\n\r\n\r\n\r\n\r\nsignoutB.addEventListener(\"click\", () => {\r\n     ;(0,firebase_auth__WEBPACK_IMPORTED_MODULE_0__.signOut)(_fb_js__WEBPACK_IMPORTED_MODULE_1__.auth);\r\n})\r\n\r\n\r\n\r\n\r\n// functions\r\n// m level\r\nfunction toggleMenu(changeDisplay, changeBackground) {\r\n     if(changeDisplay === true) {\r\n          // Menu is not open\r\n          if(menuState === \"closed\") {\r\n               mMenuBox.style.display = \"flex\";\r\n               mIcon.style.display = \"none\";\r\n               \r\n               menuState = \"open\";\r\n\r\n          // Menu is open\r\n          } else {\r\n               mMenuBox.style.display = \"none\";\r\n               mIcon.style.display = \"block\";\r\n               \r\n               menuState = \"closed\";\r\n          }\r\n     } \r\n\r\n\r\n     if(changeBackground === true) {\r\n          bgEff.style.display == \"block\" ? bgEff.style.display = \"none\" : bgEff.style.display = \"block\"\r\n     }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n// s level\r\nfunction menuVisualState() {\r\n     loadMenuBoxEffect()\r\n     loadNameAndType()\r\n\r\n\r\n     function loadNameAndType() {\r\n          let userName = document.getElementById(\"userName\");\r\n          let userType = document.getElementById(\"userType\");\r\n\r\n          userName.textContent = _userdata_js__WEBPACK_IMPORTED_MODULE_2__.userData.name;\r\n\r\n          userType.textContent = _userdata_js__WEBPACK_IMPORTED_MODULE_2__.userData.usertype == \"regular\"? \"Usuário comum\" : \"Administrador\";\r\n     }\r\n\r\n     function  loadMenuBoxEffect() {\r\n          let menuSections = [\"dashboard\", \"mycourses\", \"managecourses\", \"manageusers\"]\r\n\r\n          for(let elem in menuSections) {\r\n               if(window.location.href.includes(menuSections[elem])) {\r\n                    // create var\r\n                    let selMenuBox = document.getElementById(menuSections[elem]);\r\n                    let imgChange = document.querySelector(`a#${menuSections[elem]} > img`);\r\n     \r\n                    // css - change box and img\r\n                    selMenuBox.style.opacity = \"1\";\r\n                    selMenuBox.style.backgroundColor = \"#000\"\r\n     \r\n                    if(selMenuBox.id == \"dashboard\" || selMenuBox.id == \"mycourses\") {\r\n                         selMenuBox.style.borderBottom = \"1px solid var(--aqua)\";\r\n                         selMenuBox.style.color = \"var(--aqua)\";\r\n     \r\n                    } else {\r\n                         selMenuBox.style.borderBottom = \"1px solid var(--razz)\";\r\n                         selMenuBox.style.color = \"var(--razz)\";\r\n                    }\r\n     \r\n     \r\n                    imgChange.setAttribute(\"src\", `../media/ico/menu/fill-${menuSections[elem]}.svg`);\r\n               }\r\n     \r\n          }\r\n     }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://compiler/./js/basic/menu.js?");

/***/ }),

/***/ "./js/basic/mycourses.js":
/*!*******************************!*\
  !*** ./js/basic/mycourses.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   copyData: () => (/* binding */ copyData)\n/* harmony export */ });\nfunction copyData(ev) {\r\n     let inputBox = ev.target.parentElement;\r\n     let inputValue = inputBox.children[0].children[1].innerText;\r\n\r\n     // exec command obsolete\r\n     navigator.clipboard.writeText(inputValue);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://compiler/./js/basic/mycourses.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./js/basic/menu.js"), __webpack_exec__("./js/basic/manageandmycourses.js"), __webpack_exec__("./js/basic/managecourses.js"));
/******/ }
]);