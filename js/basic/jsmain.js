import { setFunctionsOnLoad, deletePlatformLoad } from "./general/jsload.js"
import { changePage } from "../basic/general/jspagechange.js"

setFunctionsOnLoad([deletePlatformLoad]);
await changePage("home", "../html/home.html");
