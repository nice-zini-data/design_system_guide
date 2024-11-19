$(function(){
    tabActive();
});

const tabActive = () => {
    $('.tabActive .tabTit').click(function(){
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().removeClass('active');

        $(this).next().slideToggle(500);
        $(this).parent().siblings().children('ul').slideUp(500)
    });
}
