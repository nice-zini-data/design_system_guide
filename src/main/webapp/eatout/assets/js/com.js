$(function(){
    side_tab_active();
    login_nav_list();
    datepicker();
    popupOn();
    popupClose();
    find_table();
    sub_menuTab();
});

/*side on*/
const side_tab_active = () => {
    $('.main').children('.side_tab').find('.side_listBox li').eq(0).addClass('active');
    $('.elecmap').children('.side_tab').find('.side_listBox li').eq(1).addClass('active');
    $('.statistics').children('.side_tab').find('.side_listBox li').eq(2).addClass('active');
    $('.calendar').children('.side_tab').find('.side_listBox li').eq(3).addClass('active');
    $('.mypage').children('.side_tab').find('.side_listBox li').eq(5).addClass('active');
    $('.admin').children('.side_tab').find('.side_listBox li').eq(6).addClass('active');


    $('.side_tab .side_listBox li.active').children('.side_img').find('span').removeClass('mono_g9_col');
    $('.side_tab .side_listBox li.active').children('.side_img').find('span').addClass('pri_5_col');
}

/*head tab on*/
const login_nav_list = () => {

    $('.myNavListBox, .notice').click(function(){

        $(this).find('.myListArrow').toggleClass('active');
        $(this).toggleClass('active');

        if($(this).find('.myListArrow').hasClass('active')){
            $('.myNavListBox > img').attr('src','/eatout/assets/eatout/images/icon/perm_identity_gr.svg');

        }else{
            $('.myNavListBox > img').attr('src','/eatout/assets/eatout/images/icon/perm_identity.svg')
        }

        if($('.notice').hasClass('active')){
            $('.notice > img').attr('src','/eatout/assets/eatout/images/icon/notifications_at_2.svg');

            if($(this).hasClass('on')){
                $('.notice > img').attr('src','/eatout/assets/eatout/images/icon/notifications_active.svg');
            }

        }else{
            $('.notice > img').attr('src','/eatout/assets/eatout/images/icon/notifications.svg');
            
            if($(this).hasClass('on')){
                $('.notice > img').attr('src','/eatout/assets/eatout/images/icon/notifications_on.svg');
            }else{
                $('.notice > img').attr('src','/eatout/assets/eatout/images/icon/notifications.svg');
            }

        }


        if($(this).hasClass('active')){
            $(this).children().find('.select_listBox').slideDown(500);
        }else{
            $(this).children().find('.select_listBox').slideUp(500);
        }



    });

    $('.myNavListBox').click(function(){
        $('.notice').removeClass('active');
        $('.notice').children().find('.select_listBox').slideUp(500);

        if($('.notice').hasClass('on')){
            $('.notice > img').attr('src','/eatout/assets/eatout/images/icon/notifications_on.svg');
        }else{
            $('.notice > img').attr('src','/eatout/assets/eatout/images/icon/notifications.svg');
        }
    });

    $('.notice').click(function(){
        $('.myNavListBox').removeClass('active');
        $('.myListArrow ').removeClass('active');
        $('.myNavListBox').children().find('.select_listBox').slideUp(500);
        if($('.myNavListBox').hasClass('active')){
            $('.myNavListBox > img').attr('src','/eatout/assets/eatout/images/icon/perm_identity_gr.svg');

        }else{
            $('.myNavListBox > img').attr('src','/eatout/assets/eatout/images/icon/perm_identity.svg')
        }
    });
}

const datepicker= () =>{
    $( ".datepicker" ).datepicker({
        minDate: 0
        , onChangeMonthYear: function (year, month, inst) {
            $(".sCalendar").trigger("change");
        },
    });
}

const popupOn = () => {
    $('.popupOn').click(function(){
        $('.mapPopupBox').show();
    });
}
const popupClose = () => {
    $('.mapPopupBox .logo_close .close').click(function(){
        $('.mapPopupBox').hide();
        $('body').removeClass('fix');
    });
}

/*선거구 지역현황 비교 표 오픈*/
const find_table = () => {
    $('.find_btn').click(function(){
        $('.cpBox').show();
        $('.section3Inner .hide_gBox').hide();
    });
}

/*sub 메뉴 탭*/
const sub_menuTab = () => {
    $('.mapChangeTab button').click(function(){
        $(this).removeClass('checkNone');
        $(this).addClass('sec_defaultBtn');
        $(this).siblings().removeClass('sec_defaultBtn');
        $(this).siblings().addClass('checkNone');

    });
}

/*top*/
$(window).scroll(function () {
    if($(window).scrollTop() == 0) {
        $('.topBtn').removeClass('active');
    } else {
        $('.topBtn').addClass('active');
    }

});

$(function(){
    $('.popupOn, .fc-daygrid-day-events').click(function(){
        $('body').addClass('fix');
    });

    $('.cal_pop_closeBtn').click(function(){
        $('.cal_popup').removeClass('active');
        $('body').removeClass('fix');
    });

    //print test
    $('.print_btn').click(function(){
        $('body').addClass('print_on');
        setTimeout(function () {
            print();
        }, 500);
    });



});

window.onafterprint = function(){
    $('body').removeClass('print_on');
}