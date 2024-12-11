let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
let screenWidth;

const objPage = {
    navbar: "",
    side: "",
    page: ""
};

$(function() {
    // 모바일 기계가 아닌데 + 1280 width 이하일때 // 1336으로 변경
    if(!isMobile){
        screenWidth = $(window).width();
        if(screenWidth <= 1336){
            isMobile = true;
        }
    }
});

window.onpopstate = function (e) {
    $("#onlyBody").load(e.state.page, pageLoad);
    sessionStorage.setItem("menu", e.state.side);
};

function menuMove(menu, id){
    sessionStorage.setItem("menu", menu);
    objPage.page = menu;
    location.href = menu;
}