if(window.location.hash != "" && window.location.hash != localStorage['hash']) {
    localStorage['hash'] = window.location.hash;
}
function getHash() {
    return window.location.hash; //localStorage['hash']
}
function renderHeader(currentPage) {
    $("body").prepend("<div class='mainmenu'><img src='./img/254-Swoosh-White.png' height='70px'><span class='menuitems' ><span class='menuitem' ><a class='menuitem'  href='https://preview.c9.io/trvrsalom/team254_scouting/index.html'>Scouting</a></span> | <span class='menuitem'><a class='menuitem'  href='https://preview.c9.io/trvrsalom/team254_scouting/create.html'>Create</a></span> | <span class='menuitem'><a class='menuitem'  href='https://preview.c9.io/trvrsalom/team254_scouting/scout.html'>Scout</a></span> | <span class='menuitem'><a class='menuitem'  href='https://preview.c9.io/trvrsalom/team254_scouting/scan.html'>Scan</a></span> | <span class='menuitem'><a class='menuitem'  href='https://preview.c9.io/trvrsalom/team254_scouting/review.html'>Review</a></span> | <span class='menuitem'><a class='menuitem'  href='https://github.com'>Contribute</a></span></span> </div>");
}