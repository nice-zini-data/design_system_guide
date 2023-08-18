$(function(){
    $('.mp_tab li').click(function(){
        $('.mp_tab li').removeClass('active');
        $(this).addClass('active');
        const idx = $('.mp_tab li').index(this);
        $('.mypage_box').removeClass('active');
        $('.mypage_box').eq(idx).addClass('active');
    });

    $('#mp_master').click(function(){
        $('.mypage_box .mb_select .selectTit').addClass('disabled');
    });

    $('#mp_general').click(function(){
        $('.mypage_box .mb_select .selectTit').removeClass('disabled');
    });


//관리자페이지
    $('.adminSearch').keydown(function(){
        $('.search_at_txt').addClass('active');
    });



});

