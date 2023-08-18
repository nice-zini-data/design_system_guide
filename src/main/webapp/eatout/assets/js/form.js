$(function(){
    selectBox_active();
});

/*select 열고 닫기*/
const selectBox_active = () => {
    $('.select .selectTit').click(function(){
        $(this).toggleClass('active');
        $(this).siblings('.select_listBox').slideToggle(500);
    });

    $('.select_listBox li').click(function(){
        $(this).parents('.select_listBox').siblings('.selectTit').removeClass('active');
        $(this).parents('.select_listBox').slideUp(500);
        $(this).parents('.select_field_small').next().children('.select_field_small .selectTit').removeClass('disabled');
    });

}