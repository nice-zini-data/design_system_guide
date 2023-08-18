var calendarEl;
var calendar;

var strScheduleId = "";
var strClickDate = "";

var strCenterx;
var strCentery;

var markerx;
var markery;

var date_range = false;
var date_time = false;

document.addEventListener('DOMContentLoaded', function() {
    calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        // Tool Bar 목록 document : https://fullcalendar.io/docs/toolbar
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        aspectRatio: 1.35,
        plugin:['interaction', 'dayGrid'],
        locale: "ko",
        height:'auto',
        selectable: true,
        selectMirror: true,
        defaultDate: new Date(),
        dayMaxEvents: true,
        navLinks: false, // can click day/week names to navigate views
        editable: true,
        droppable: false,
        editable: false,
        droppable: false,
        // Delete event
        eventClick: function (arg) {
            Swal.fire({
                text: "Are you sure you want to delete this event?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    arg.event.remove()
                } else if (result.dismiss === "cancel") {
                        Swal.fire({
                        text: "Event was not deleted!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        },
        dayMaxEvents: true, // allow "more" link when too many events
        // 이벤트 객체 필드 document : https://fullcalendar.io/docs/event-object
        events: []
    });

    calendar.render();

});

function setSchedule(events){
    calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        aspectRatio: 1.35,
        plugin:['interaction', 'dayGrid'],
        locale: "ko",
        height:'auto',
        selectable: true,
        selectMirror: true,
        // defaultDate: new Date(events.startDt),
        initialDate: new Date(events.startDt),
        dayMaxEvents: true,
        navLinks: false, // can click day/week names to navigate views
        editable: true,
        droppable: false,
        editable: false,
        droppable: false,
        eventClick: function (arg) {
            Swal.fire({
                text: "Are you sure you want to delete this event?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    arg.event.remove()
                } else if (result.dismiss === "cancel") {
                    Swal.fire({
                        text: "Event was not deleted!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        },
        dayMaxEvents: true, // allow "more" link when too many events
        // 이벤트 객체 필드 document : https://fullcalendar.io/docs/event-object
        events: events
        , eventClick: function(event) {
            strClickDate = "";
            strScheduleId = event.event._def.publicId;
            var param = {
                id : strScheduleId
            }
            getAjax("getScheduleAreaList" , "/schedule/getScheduleAreaList", param, fn_cal_popup, fn_error);
            $('.cal_popup').addClass('active');
        }
    });

    calendar.render();

    calendar.on('dateClick', function(info) {
        strScheduleId = 0;
        strClickDate = info.dateStr.replace(/-/gi,".");

        var param = {
            id : strScheduleId
        }
        getAjax("getScheduleAreaList" , "/schedule/getScheduleAreaList", param, fn_cal_popup, fn_error);
        $('.cal_popup').addClass('active');
        $('body').addClass('fix');
    });

    $("#calendar").on("mouseover", ".fc-event", function (events){
        var title = events.currentTarget.fcSeg.eventRange.def.title;
        var data = events.currentTarget.fcSeg.eventRange.def.extendedProps;

        var eatoutTarget = (data.eatoutTarget == 0) ? "대통령 선거" : ((data.eatoutTarget == 1) ? "국회의원 선거" : "지방선거");
        var dday = "";
        if(data.dDay < 0){
            dDay = "D+" + Math.abs(data.dDay);
        }else{
            dDay = "D-" + data.dDay;
        }


        var html = "";
        html += '<div class="cal_hoverBox" id="cal_hoverBox" style="z-index: 999">';
        html += '</div>';
        $(this).append(html);
        $(".cal_hoverBox").hide();

        var html = "";
        html += '   <span class="txt_s_m real_bg_fir ">' + dDay + '</span>';
        html += '   <p class="hd4">' +title+ '</p>';
        // html += '   <div class="cal_stxt_line flex">';
        // html += '       <p class="txt_n mono_g7_col">'+eatoutTarget+'</p>';
        // html += '   </div>';
        html += '   <p class="txt_n mono_g7_col cal_h_sbox">' + data.description + '</p>';
        $(".cal_hoverBox").html(html);
        $(".cal_hoverBox").eq(0).show();
    });

    $('.fc-daygrid-event-harness').mouseleave(function(){
        $('.cal_hoverBox').remove()
    });

    $('.fc-daygrid-event').mouseenter(function(){
        $(this).css('z-index','999')
    });

    $('.fc-daygrid-event').mouseleave(function(){
        $(this).css('z-index','1')
    });


// 다음달
    $(".fc-icon.fc-icon-chevron-right").off('click');
    $(".fc-icon.fc-icon-chevron-right").on('click', function (){
        setTimeout(function (){
            scheduleList();
        }, 100);
    });

//이전달
    $(".fc-icon.fc-icon-chevron-left").off('click');
    $(".fc-icon.fc-icon-chevron-left").on('click', function (){
        setTimeout(function (){
            scheduleList();
        }, 100);
    });
}

function isValid(){
    if($(".date_end").hasClass("active")){
        if(new Date($('#daterangepicker').data('daterangepicker').startDate._d) > new Date($('#daterangepicker_end').data('daterangepicker').endDate._d)){
            alert('날짜와 시간을 확인해주세요.');
            return false;
        }
    }

    if(common.isEmpty($(".cal_popupTit").val())){
        alert('일정 제목을 입력해주세요.');
        return false;
    }

    if(common.isEmpty($("#daterangepicker").val())){
        alert('날짜를 선택해주세요.');
        return false;
    }

    if($(".date_end").hasClass("active")){
        if(common.isEmpty($("#daterangepicker_end").val())){
            alert('종료 날짜를 선택해주세요.');
            return false;
        }
    }

    return true;
}

$(function(){
    $(".set_schedule").on('click', function (){
        if(isValid()){
            var message = "";
            message = strScheduleId != 0 ? "수정" : "등록";
            if(confirm("일정 " +message+ " 하시겠습니까?")){
                var startDt = $("#daterangepicker").val();
                var endDt = $("#daterangepicker_end").val();
                if($(".date_tm").hasClass("active")){
                    startDt += ":00";
                    endDt += ":00";
                }
                var color = "";
                var fontColor = "";
                var centerX = "";
                var centerY = "";
                var areaId = "";
                var areaNm = "";
                var areaTitle = "";
                $(".plusBox").each(function (){
                    if(!common.isEmpty($(this).attr('data-centerx'))){
                        centerX += $(this).attr('data-centerx') + "@@";
                        centerY += $(this).attr('data-centery') + "@@";
                        areaId += $(this).attr('data-areaid') + "@@";
                        areaNm += $(this).attr('data-areanm') + "@@";
                        areaTitle += $(this).attr('data-areatitle') + "@@";
                    }
                });

                $(".cal_color_box > div").each(function (){
                    if($(this).hasClass("active")){
                        color = $(this).data('color')
                        fontColor = $(this).data('fontcolor')
                    }
                });

                var param = {
                    id : strScheduleId
                    ,title : $(".cal_popupTit").val()
                    ,description : $(".cal_popTxtInput").val()
                    ,centerXs : centerX
                    ,centerYs : centerY
                    ,areaIds : areaId
                    ,areaNms : areaNm
                    ,areaTitles : areaTitle
                    ,startDt : startDt
                    ,endDt : ($(".date_end").hasClass("active")) ? endDt : startDt
                    , endSw : ($(".date_end").hasClass("active")) ? "1" : "0"
                    , timeSw : ($(".date_tm").hasClass("active")) ? "1" : "0"
                    , gubun : ""
                    , color : color
                    , fontColor : fontColor
                };
                getAjax("setSchedule", "/schedule/setSchedule", param, function (id, response){
                    if(response.code == "C005"){
                        alert("일정 등록 완료");
                    }else if(response.code == "C002"){
                        alert("일정 수정 완료");
                    }else{
                        alert("일정 등록 실패[관리자문의]");
                    }
                    $('.cal_pop_closeBtn').click();
                    scheduleList();
                }, fn_error);
            }
        }

    });
});

$(function(){

    $('.cal_pop_map .cal_pop_search').click(function(){
        $('.cal_pop_map .cal_pop_search_box').addClass('active');
    });

    $('.cal_pop_map .cal_pop_searchCloseBtn').click(function(){
        $('.cal_pop_map .cal_pop_search_box').removeClass('active');
        $('.cal_pop_map .search_at_txt').removeClass('active');
    });

    $('.cal_pop_map .search_at_txt li').click(function(){
        $('.cal_pop_map .search_at_txt').removeClass('active');
    });

    $('.cal_pop_map .cal_pop_search_box').keydown(function(){
        $('.cal_pop_map .search_at_txt').addClass('active');
    });

    //지역 순서 변경
    $("#dragBox").sortable({
        stop: function(event, ui) {
            // 항목이 변경되었습니다.
            $(".plusBox").each(function (idx){
                $(this).attr('data-areaid',idx+1);
            });

            for(var i=0; i< scheduleMarkers.length; i++){
                scheduleMarkers[i].setMap(null);
            }
            scheduleMarkers = [];

            $(".plusBox").each(function (idx){
                var areaId = common.lpad($(this).attr('data-areaid'), 2, '0');
                var scheduleMarker = new naver.maps.Marker({
                    map     : map,
                    position: new naver.maps.LatLng($(this).attr('data-centery'), $(this).attr('data-centerx')),
                    icon    : {
                        content : '<img class="schedule_marker marker_'+areaId+'" src="/eatout/assets/eatout/images/icon/ico_location_' + areaId + '.svg" alt="마커"/>',
                        size    : new naver.maps.Size(24, 34),
                        origin  : new naver.maps.Point(0, 0),
                        anchor  : new naver.maps.Point(20,30),
                    }
                });
                scheduleMarkers.push(scheduleMarker);
            });

            removeMarkers();
        }
    });

    $('.cal_pop_plusBoxBtn, .cal_pop_plusIcon').click(function(){

        if($(".plusBox").length > 9){
            alert('선거 운동 지역은 최대 10개 까지 가능합니다');
            return;
        }

        let plusHtml = '';
        plusHtml += '<div class="plusBox" ' +
            'data-centerx="" data-centery="" ' +
            'data-areaid="' +($(".plusBox").length+1) +'" data-areanm="">';
        plusHtml += '    <div class="cal_plus_close">';
        plusHtml += '        <img src="/eatout/assets/eatout/images/icon/close_gy.svg" alt="닫기 아이콘"/>';
        plusHtml += '    </div>';
        plusHtml += '    <p class="label_sb ch_ar areaTitle">지역명</span></p>';
        plusHtml += '    <p class="txt_s_m mono_g7_col areaNm">주소</span></p>';
        plusHtml += '</div>';
        $('#dragBox').append(plusHtml);
        $(".marker_address").parent().hide();

        $(".plusBox").off('click');
        $(".plusBox").on('click', function (){
            $(".plusBox").removeClass('active');
            $(this).addClass('active');

            strScheduleAreaId = $(this).attr('data-areaid') + "";
            strScheduleCenterx = $(this).attr('data-centerx') + "";
            strScheduleCentery = $(this).attr('data-centery') + "";
            $(".cal_popMapInput").val($(this).attr('data-areatitle'));
            $(".marker_address").text($(this).attr('data-areanm'));

            if(!common.isEmpty($(this).attr('data-areanm'))){
                $(".marker_address").parent().show();
            }
            removeMarkers();

            var data = {
                centerx : strScheduleCenterx
                , centery : strScheduleCentery
            }
            mapMove(data);
        });

        $(".plusBox").eq($(".plusBox").length-1).click();
    });

    $(".cal_pop_update").on('click', function (){
        if(common.isEmpty(markerx)){
          alert('지역을 선택해 주세요.');
          return;
      }
      if(common.isEmpty($('.cal_popMapInput').val())){
          alert('지역 정보를 입력해 주세요.');
          return;
      }
        $(".plusBox.active").attr('data-centerx', markerx).attr('data-centery', markery).attr('data-areatitle', $(".cal_popMapInput").val()).attr('data-areanm', $(".marker_address").text());
        $(".plusBox.active").find(".areaTitle").text($(".cal_popMapInput").val());
        $(".plusBox.active").find('.areaNm').text($(".marker_address").text());

        for(var i=0; i< scheduleMarkers.length; i++){
            scheduleMarkers[i].setMap(null);
        }
        scheduleMarkers = [];

        $(".plusBox").each(function (idx){
            var areaId = common.lpad($(this).attr('data-areaid'), 2, '0');
            var scheduleMarker = new naver.maps.Marker({
                map     : map,
                position: new naver.maps.LatLng($(this).attr('data-centery'), $(this).attr('data-centerx')),
                icon    : {
                    content : '<img class="schedule_marker marker_'+areaId+'" src="/eatout/assets/eatout/images/icon/ico_location_' + areaId + '.svg" alt="마커"/>',
                    size    : new naver.maps.Size(24, 34),
                    origin  : new naver.maps.Point(0, 0),
                    anchor  : new naver.maps.Point(20,30),
                }
            });
            scheduleMarkers.push(scheduleMarker);
        });

        removeMarkers();
    });

    $(document).on('click','.cal_plus_close',function(){
        $(this).parent().remove();

        var areaId = common.lpad($(this).parent().attr('data-areaid'),2,'0');
        $(".schedule_marker.marker_"+areaId).hide();
    });

    $('.cal_popChartBox').hide();

    $(".cal_pop_dot .flo_box01 > p").on('click', function () {
        //toggleClass
        $(this).toggleClass('check');
    });
});

 // 종료일 포함 / 미완
$(function(){
    date1();
    date2();

});

function date1(){
    $("#daterangepicker").daterangepicker({
        id : "datepicker_start",
        locale: {
            "format": 'YYYY.MM.DD',     // 일시 노출 포맷
            "applyLabel": "확인",                    // 확인 버튼 텍스트
            "cancelLabel": "취소",                   // 취소 버튼 텍스트
            "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
            "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            // "amPm" : ["오전","오후"]
        },
        timePicker: true,
        showDropdowns: true,                     // 년월 수동 설정 여부
        autoApply: true,                         // 확인/취소 버튼 사용여부
        timePicker24Hour: true,                  // 24시간 노출 여부(ex> true : 23:50, false : PM 11:50)
        timePickerSeconds: false,                 // 초 노출 여부
        singleDatePicker: true,         // 하나의 달력 사용 여부
        showMonthAfterYear:true,
        startDate: moment().subtract(1, 'days'),
        endDate: moment(),
        label: 'All day',
    }, function(start, end) {
        $('.startDate_txt').text(start.format('YYYY.MM.DD'));
        // $('.endDate_txt').text(end.format('YYYY.MM.DD'));
    });

}

function date2(){
    $("#daterangepicker_end").daterangepicker({
        id : "datepicker_end",
        locale: {
            "format": 'YYYY.MM.DD',     // 일시 노출 포맷
            "applyLabel": "확인",                    // 확인 버튼 텍스트
            "cancelLabel": "취소",                   // 취소 버튼 텍스트
            "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
            "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            // "amPm" : ["오전","오후"]
        },
        timePicker: true,
        showDropdowns: true,                     // 년월 수동 설정 여부
        autoApply: true,                         // 확인/취소 버튼 사용여부
        timePicker24Hour: true,                  // 24시간 노출 여부(ex> true : 23:50, false : PM 11:50)
        timePickerSeconds: false,                 // 초 노출 여부
        singleDatePicker: true,         // 하나의 달력 사용 여부
        showMonthAfterYear:true,
        startDate: moment().subtract(1, 'days'),
        endDate: moment(),
        label: 'All day',
    }, function(start, end) {
        // $('.startDate_txt').text(start.format('YYYY.MM.DD'));
        $('.endDate_txt').text(end.format('YYYY.MM.DD'));
    });

    var start = $('#daterangepicker_end').data('daterangepicker').startDate;
    var end = $('#daterangepicker_end').data('daterangepicker').endDate;

    //고정 텍스트
    var date_top_txtBox = `<div class="date_top"></div>`;

    var date_top_txtBox_content_start = `
        <div class="date_st_box date_pk_box">
            <p class="txt_n_m start_dateTxt">시작일</p>
<!--            <p class="txt_n_m endDate_txt"></p>-->
        </div>
    `;

    const date_top_txtBox_content_end = `
            <div class="date_ed_box date_pk_box">
                <p class="txt_n_m end_dateTxt">종료일</p>
<!--                <p class="txt_n_m endDate_txt"></p>-->
            </div>
        `;

    const date_bottom_txtBox = `
            <div class="date_tm_ch date_rd_box">
                <p class="txt_n_sb">시간포함</p>
                <div class="radio_rdBtn date_tm">
                    <span></span>
                </div>
            </div>`;

    $('.daterangepicker').prepend(date_top_txtBox);
    $('.date_top').eq(0).html(date_top_txtBox_content_start);
    $('.date_top').eq(1).html(date_top_txtBox_content_end);
    $('.daterangepicker .drp-buttons').prepend(date_bottom_txtBox);

    setRadioEvent();
}

function onDateClick(event) {
    alert(event.date);
}

function setRadioEvent(){

    $(".radio_rdBtn.date_tm").on('click', function (){
        $(".radio_rdBtn.date_tm").toggleClass('active');
        $('.calendar-time').toggleClass('dpl_ib');
        $('.daterangepicker').toggleClass('time_on');

    });

    $('.drp-buttons .applyBtn').click(function(){
        if($('.radio_rdBtn.date_tm').hasClass('active')){
            $('.cal_pop_right_box0518 .cal_pop_txtSbox').addClass('on_wh');
        }else{
            $('.cal_pop_right_box0518 .cal_pop_txtSbox').removeClass('on_wh');
        }
    });

    //$('.cal_pop_right_box0518 .cal_pop_txtSbox').toggleClass('on_wh');

    $('#daterangepicker').on('click', function (){
        $(".daterangepicker").eq(0).find(".start_dateTxt").text("시작일 " + $("#daterangepicker").val().substr(0,10));
        $(".daterangepicker").eq(0).find(".hourselect").val(Number($("#daterangepicker").val().substr(11,2))).prop("selected", true);
        $(".daterangepicker").eq(0).find(".minuteselect").val(Number($("#daterangepicker").val().substr(14,2))).prop("selected", true);
    });

    $('#daterangepicker_end').on('click', function (){
        $(".daterangepicker").eq(1).find(".end_dateTxt").text("종료일 " + $("#daterangepicker_end").val().substr(0,10));
        $(".daterangepicker").eq(1).find(".hourselect").val(Number($("#daterangepicker_end").val().substr(11,2))).prop("selected", true);
        $(".daterangepicker").eq(1).find(".minuteselect").val(Number($("#daterangepicker_end").val().substr(14,2))).prop("selected", true);
    });

    $('#daterangepicker').on('apply.daterangepicker', function(ev, picker) {
        var startDate;
        if($(".date_tm").hasClass("active")){
            startDate = picker.startDate.format('YYYY.MM.DD HH:mm');
        }else{
            startDate = picker.startDate.format('YYYY.MM.DD');
        }
        $(this).val(startDate);

        if($(".date_end").hasClass("active")){
            $('#daterangepicker_end').click();
        }
    });

    $('#daterangepicker_end').on('apply.daterangepicker', function(ev, picker) {
        var startDate;
        if($(".date_tm").hasClass("active")){
            startDate = picker.startDate.format('YYYY.MM.DD HH:mm');
        }else{
            startDate = picker.startDate.format('YYYY.MM.DD');
        }
        $(this).val(startDate);
    });
}

var areaClickListener;
var mouseoverListener;
var mouseoutListener;
var markers = [];
var mapMarkers = [];
var geomList = [];
var infoWindow = null;
var mapGubun = "normal";

var hitMapReponse;

function setMapGeom(response, param){
    if(common.isEmpty(response.data)){
        loadingBar(false);
        return;
    }
    if(param.mapType == "hit"){

        // 범례 flo_box01
        hitMapReponse = response;

        var box1 =[];
        var box2 =[];
        var box3 =[];
        var box4 =[];
        var box5 =[];
        $(".select_field_small.select.yyyymm > div > span").text(response.data[0].yyyymm.substr(0,4) + "." + response.data[0].yyyymm.substr(4,2));
        response.data.forEach(function (val,idx){
            if(val.cume == '1') box1.push(val.popCnt);
            if(val.cume == '2') box2.push(val.popCnt);
            if(val.cume == '3') box3.push(val.popCnt);
            if(val.cume == '4') box4.push(val.popCnt);
            if(val.cume == '5') box5.push(val.popCnt);
        });

        if(common.isEmpty(box1)) box1 = [0];
        if(common.isEmpty(box2)) box2 = [0];
        if(common.isEmpty(box3)) box3 = [0];
        if(common.isEmpty(box4)) box4 = [0];
        if(common.isEmpty(box5)) box5 = [0];

        var tmp_text = (param.menu == "flowpop") ? "명" : "만원" ;

        var tmp_box = [
            {cume:1, gubun:"max", val:common.addComma(Math.max.apply(Math,box1)) + tmp_text}
            , {cume:1, gubun:"min", val:common.addComma(Math.min.apply(Math,box1)) + tmp_text}
            , {cume:2, gubun:"max", val:common.addComma(Math.min.apply(Math,box1)) + tmp_text}
            , {cume:2, gubun:"min", val:common.addComma(Math.min.apply(Math,box2)) + tmp_text}
            , {cume:3, gubun:"max", val:common.addComma(Math.min.apply(Math,box2)) + tmp_text}
            , {cume:3, gubun:"min", val:common.addComma(Math.min.apply(Math,box3)) + tmp_text}
            , {cume:4, gubun:"max", val:common.addComma(Math.min.apply(Math,box3)) + tmp_text}
            , {cume:4, gubun:"min", val:common.addComma(Math.min.apply(Math,box4)) + tmp_text}
            , {cume:5, gubun:"max", val:common.addComma(Math.min.apply(Math,box4)) + tmp_text}
            , {cume:5, gubun:"min", val:common.addComma(Math.min.apply(Math,box5)) + tmp_text}
        ];

        var template = $('#tmp_flo_box01').html();
        var templateScript = Handlebars.compile(template);
        var context = tmp_box;
        var html = templateScript(context);
        $(".flo_box01").html(html);
        $('.cal_pop_dot').removeClass('dpl_n');

        $(".flo_box01 > p").on('click', function (){

            //toggleClass
            $(this).toggleClass('check');

            var filtered = hitMapReponse.data;
            $(".flo_box01 > p").each(function (){
                if($(this).hasClass('check')){
                    if(!common.isEmpty(filtered)){
                        filtered = filtered.filter(o => Number(o.cume) !== $(this).data('cume'));
                    }
                }
            });

            geomList.forEach(function (val, idx){
                map.data.removeGeoJson(val);
            });
            geomList = [];
            var result = getGeomJson("geomFeatures", "FeatureCollection", filtered);
            geomList.push(result);
            map.data.addGeoJson(result);

            var geom_color = [
                '#01144B'
                , '#003EAA'
                , '#5181FF'
                , '#6DC9FD'
                , '#89EDED'
                , '#CCCCCC'
            ];

            map.data.setStyle(function(feature) {
                var strokeColor = "";
                var fillColor = "";
                (param.mapType == "hit") ? fillColor = geom_color[Number(feature.getProperty('cume')) -1] : "";
                (param.mapType != "hit") ? fillColor = geom_color[2] : "";
                var styleOptions = {
                    fillOpacity: 0.8
                    , strokeColor: "rgb(255,255,255)"
                    , fillColor: fillColor
                    , storkeWeight: 0.1
                    , storkeOpacity: 0.1
                }
                return styleOptions;
            });
        });
    }
    var minxList = [];
    var maxxList = [];
    var minyList = [];
    var maxyList = [];
    if(common.isEmpty(response.data)){
        for(var i=0; i< markers.length; i++){
            markers[i].setMap(null);
        }
        markers = [];
        if(infoWindow != null) infoWindow.close();
        geomList.forEach(function (val, idx){
            map.data.removeGeoJson(val);
        });
        geomList = [];

        return;
    }

    response.data.forEach(function (val,idx){
        minxList.push(val.centerx);
        maxxList.push(val.centerx);
        minyList.push(val.centery);
        maxyList.push(val.centery);
    });

    for(var i=0; i< markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
    geomList.forEach(function (val, idx){
        map.data.removeGeoJson(val);
    });
    geomList = [];

    var result = getGeomJson("geomFeatures", "FeatureCollection", response.data);
    geomList.push(result);
    map.data.addGeoJson(result);

    var geom_color = [
        '#01144B'
        , '#003EAA'
        , '#5181FF'
        , '#6DC9FD'
        , '#89EDED'
        , '#CCCCCC'
    ];

    map.data.setStyle(function(feature) {
        var strokeColor = "";
        var fillColor = "";
        (param.mapType == "hit") ? fillColor = geom_color[Number(feature.getProperty('cume')) -1] : "";
        (param.mapType != "hit") ? fillColor = geom_color[2] : "";
        var styleOptions = {
            fillOpacity: 0.8
            , strokeColor: "rgb(255,255,255)"
            , fillColor: fillColor
            , storkeWeight: 0.1
            , storkeOpacity: 0.1
        }
        return styleOptions;
    });
    var bounds = new naver.maps.LatLngBounds(
        new naver.maps.LatLng(Math.min.apply(Math,minyList), Math.min.apply(Math,minxList))
        , new naver.maps.LatLng(Math.max.apply(Math,maxyList), Math.max.apply(Math,maxxList))
    );
    map.fitBounds(bounds);
    map.setZoom(map.getZoom() -1);

    areaClickListener = map.data.addListener('click', function(e){
        searchCoordinateToAddress(e.coord);

        var gubun = "";
        var areaCd = "";
        var gabeulGb = "";
        if(!common.isEmpty($(".selectTit.admi.top > span").attr("data-areacd"))){
            areaCd = $(".selectTit.admi.top > span").attr("data-areacd");
            gubun = "admi";
        }else if(!common.isEmpty($(".selectTit.cty.top > span").attr("data-areacd"))){
            areaCd = $(".selectTit.cty.top > span").attr("data-areacd");
            gabeulGb = $(".selectTit.cty.top > span").attr("data-gabeulgb");
            gubun = "cty";
        }else if(!common.isEmpty($(".selectTit.mega.top > span").attr("data-areacd"))) {
            areaCd = $(".selectTit.mega.top > span").attr("data-areacd");
            gubun = "mega";
        }
        var param = {
            gubun : gubun
            , areaCd : areaCd
            , gabeulGb : gabeulGb
            , cellId : e.feature.getProperty('cellId')

        }
        getAjax("getSchedulePopcnt", "/schedule/getSchedulePopcnt", param, fn_getSchedulePopcnt, fn_error);

    });

    mouseoverListener = map.data.addListener('mouseover', function(e){
        for(var i=0; i< markers.length; i++){
            markers[i].setMap(null);
        }
        markers = [];

        marker = new naver.maps.Marker({
            map     : map,
            position: new naver.maps.LatLng(e.feature.getProperty('centery'), e.feature.getProperty('centerx')),
            icon    : {
                content : '<span id="marker" class="material-symbols-outlined font16 pri_5_col fill" style="display: none">location_on</span>',
                size    : new naver.maps.Size(24, 34),
                origin  : new naver.maps.Point(0, 0),
                anchor  : new naver.maps.Point(0,0),
            }
        });
        markers.push(marker);

        var text = (mapGubun == "normal") ? e.feature.getProperty('areaNm') : e.feature.getProperty('popCnt');
        var contentString = '<div class="map_mark">' +
            '   <p class="txt_n_sb">' +text+ '</p>' +
            '</div>'
        if(infoWindow != null){
            infoWindow.close();
            infoWindow = "";
        }
        infoWindow = new naver.maps.InfoWindow({
            content        : contentString,
            maxWidth       : 0,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor    : "transparent",
            borderWidth    : 1,
            anchorSize     : new naver.maps.Size(0, 0),
            anchorSkew     : false,
            anchorColor    : "#94B58B",
            pixelOffset    : new naver.maps.Point(0, -8)
        });

        if (infoWindow != null) {
            infoWindow.open(map, marker);
        } else {
            infoWindow.close();
        }
    });

    // 범위 마우스 아웃
    mouseoutListener = map.data.addListener('mouseout', function(e){
        for(var i=0; i< markers.length; i++){
            markers[i].setMap(null);
        }
        markers = [];
        infoWindow.close();
    });
}


function searchAddressList(data){

    var address = $("#areaSearch").val();
    data.forEach(function(val,idx){
        if(val.address.indexOf(address) > -1){
            var tmp = val.address.substring(0,val.address.indexOf(address)) + '<span class="pri_5_col">'+ address + '</span>' +  val.address.substring(val.address.indexOf(address) + address.length);
            val.addressHtml = tmp;
        }else{
            val.addressHtml = val.address;
        }
    });

    var template = $('#tmp_search_at_txt').html();
    var templateScript = Handlebars.compile(template);
    var context = data;
    var html = templateScript(context);
    $(".search_at_txt").html(html);

    if(data.length > 0){
        $('.areaSearch .search_at_txt').addClass('active');
        $('.areaSearch .areaSearch_icon').addClass('search_on');
    }else{
        $('.areaSearch .search_at_txt').removeClass('active');
        $('.areaSearch .areaSearch_icon').removeClass('search_on');
    }
}

function searchAddress(data){
    mapMove(data)
}

function mapMove(data){

    strCenterx = data.centerx;
    strCentery = data.centery;

    // 지도 이동
    var center = new naver.maps.Point(strCenterx, strCentery);
    map.setCenter(center);

    $(".search_at_txt").removeClass('active');
    $(".cal_pop_searchCloseBtn").click();
    $('#areaSearch').val('');

}



function searchAddressClick(data){
    markerx = data.centerx;
    markery = data.centery;

    var marker = new naver.maps.Marker({
        map     : map,
        position: new naver.maps.LatLng(markery, markerx),
        icon    : {
            content : '<img src="/eatout/assets/eatout/images/icon/calendar_location_icon.svg" alt="마커"/>',
            size    : new naver.maps.Size(24, 34),
            origin  : new naver.maps.Point(0, 0),
            anchor  : new naver.maps.Point(20,30),
        }
    });
    mapMarkers.push(marker);

    $(".marker_address").text(data.address);
    $(".marker_address").parent().show();

}

function mapPopClose(){
    removeMarkers();
    if (infoWindow != null) {
        infoWindow.close();
    }
}

function removeMarkers(){
    for(var i=0; i< mapMarkers.length; i++){
        mapMarkers[i].setMap(null);
    }
    mapMarkers = [];

}

/*일정추가 색상 선택*/
$(function(){
    $('.cal_color_box div').click(function(){
        $('.cal_color_box div').removeClass('active');
        $(this).addClass('active');
    });
});

