import { setFunctionsOnLoad, deletePlatformLoad } from "./general/jsload.js"
import { changePage } from "../basic/general/jspagechange.js"

setFunctionsOnLoad([deletePlatformLoad]);
await changePage(
    window.location.search.replace("?currentpage=", ""), 
    `../html/${window.location.search.replace("?currentpage=", "")}.html`
);