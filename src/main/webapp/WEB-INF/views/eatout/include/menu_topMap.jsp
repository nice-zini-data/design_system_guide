<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<h1 class="hd1 comTit subTit">유권자 지도</h1>
<div class="sub_menuTab">
    <ul>
        <li class="hd4" id="attack"    data-id="attack"     data-url="/analysis/attack">요약</li>
        <li class="hd4" id="flowpop"   data-id="flowpop"    data-url="/analysis/flowpop">인구</li>
        <li class="hd4" id="incom"     data-id="incom"      data-url="/analysis/incom">소득</li>
        <li class="hd4" id="loan"      data-id="loan"       data-url="/analysis/loan">대출</li>
        <li class="hd4" id="industry"  data-id="industry"   data-url="/analysis/industry">산업</li>
        <li class="hd4" id="economy"   data-id="economy"    data-url="/analysis/economy">지역경제</li>
        <li class="hd4" id="realestate" data-id="realestate"  data-url="/analysis/realestate">부동산</li>
        <li class="hd4" id="infra"     data-id="infra"      data-url="/analysis/infra">인프라</li>
    </ul>
    <button class="pri_defaultBtn txt_n_sb print_btn">
        <img src="/eatout/assets/eatout/images/icon/print_wh.svg" alt="프린트 아이콘"/>
        <span>인쇄하기</span>
    </button>
</div>

<section class="sub_topMap_com">
    <div class="card_box_g over_fNone">
        <div class="searchBox">
            <div>
                <div class="mapChangeTab" style="display: none">
                    <button type="submit" class="sec_defaultBtn txt_n_sb sel" id="normal_map"><span>일반지도</span></button>
                    <button type="submit" class="txt_n_sb checkNone" id="hit_map"><span>히트맵</span></button>
                </div>
                <div class="search_select">
                    <div class="select_field_small select">
                        <div class="selectTit mega top">
                            <span class="txt_n_m">시/도</span>
                        </div>
                        <div class="select_listBox mega top">
                            <ul>
                                <li class="txt_n_sb">서울시</li>
                            </ul>
                        </div>
                    </div>

                    <div class="select_field_small select">
                        <div class="selectTit cty top">
                            <span class="txt_n_m">시/군/구(선거구)</span>
                        </div>
                        <div class="select_listBox cty top">
                        </div>
                    </div>

                    <div class="select_field_small select">
                        <div class="selectTit admi top">
                            <span class="txt_n_m">읍/면/동</span>
                        </div>
                        <div class="select_listBox admi top">
                        </div>
                    </div>
                </div>
            </div>
            <div class="areaSearch" style="display: none">
                <div class="search_close"></div>
                <input type="text" name="" id="areaSearch" class="txt_n_m default" placeholder="지역명을 입력해 주세요"/>
                <div class="search_at_txt">
                </div>

            </div>
        </div>

        <div class="subMap">
            <div class="subMap_imgBox close_on">
                <div class="map_section mapZoom" id="map" style="width: 100%">
                </div>
            </div>

            <!--인구 ST-->
            <!--
            임시 - dpl_n // display none
            -->
            <div class="flo_box01 dpl_n">
            </div>

            <div class="flo_filter dpl_n">
                <div class="flo_select">
                    <div class="select_field_small select yyyymm">
                        <div class="selectTit disabled">
                            <span class="txt_n_m"></span>
                        </div>
                        <div class="select_listBox">

                        </div>
                    </div>
                    <div class="select_field_small select_tab">
                        <p class="txt_n_sb select_tab01 active"><span></span>성 · 연령 기준</p>
                        <p class="txt_n_sb select_tab02"><span></span>요일 · 시간 기준</p>
                    </div>
                    <div class="select_field_small select gender">
                        <div class="selectTit">
                            <span class="txt_n_m" data-gender="">성별전체</span>
                        </div>
                        <div class="select_listBox">
                            <ul>
                                <li class="txt_n_sb" data-gender="">성별전체</li>
                                <li class="txt_n_sb" data-gender="MALE">남</li>
                                <li class="txt_n_sb" data-gender="FEMALE">여</li>
                            </ul>
                        </div>
                    </div>
                    <!-- 인구 연령대 -->
                    <div class="select_field_small select age">
                        <div class="selectTit">
                            <span class="txt_n_m" data-yy5_aglv_id_s="" data-yy5_aglv_id_e="">연령전체</span>
                        </div>
                        <div class="select_listBox">
                            <ul>
                                <li class="txt_n_sb" data-yy5_aglv_id_s="" data-yy5_aglv_id_e="">연령전체</li>
                                <li class="txt_n_sb" data-yy5_aglv_id_s="1" data-yy5_aglv_id_e="1">10대 미만</li>
                                <li class="txt_n_sb" data-yy5_aglv_id_s="2" data-yy5_aglv_id_e="3">10대</li>
                                <li class="txt_n_sb" data-yy5_aglv_id_s="4" data-yy5_aglv_id_e="5">20대</li>
                                <li class="txt_n_sb" data-yy5_aglv_id_s="6" data-yy5_aglv_id_e="7">30대</li>
                                <li class="txt_n_sb" data-yy5_aglv_id_s="8" data-yy5_aglv_id_e="9">40대</li>
                                <li class="txt_n_sb" data-yy5_aglv_id_s="10" data-yy5_aglv_id_e="11">50대</li>
                                <li class="txt_n_sb" data-yy5_aglv_id_s="12" data-yy5_aglv_id_e="13">60대</li>
                                <li class="txt_n_sb" data-yy5_aglv_id_s="14" data-yy5_aglv_id_e="14">70대 이상</li>
                            </ul>
                        </div>
                    </div>
                    <!-- 소득 연령대 -->
                    <div class="select_field_small select age2">
                        <div class="selectTit">
                            <span class="txt_n_m" data-age="">연령전체</span>
                        </div>
                        <div class="select_listBox">
                            <ul>
                                <li class="txt_n_sb" data-age="">연령전체</li>
                                <li class="txt_n_sb" data-age="20">20대</li>
                                <li class="txt_n_sb" data-age="30">30대</li>
                                <li class="txt_n_sb" data-age="40">40대</li>
                                <li class="txt_n_sb" data-age="50">50대</li>
                                <li class="txt_n_sb" data-age="60">60대</li>
                            </ul>
                        </div>
                    </div>
                    <div class="select_field_small select dow dpl_n">
                        <div class="selectTit">
                            <span class="txt_n_m" data-dow="">요일전체</span>
                        </div>
                        <div class="select_listBox">
                            <ul>
                                <li class="txt_n_sb" data-dow="">요일전체</li>
                                <li class="txt_n_sb" data-dow="월">월</li>
                                <li class="txt_n_sb" data-dow="화">화</li>
                                <li class="txt_n_sb" data-dow="수">수</li>
                                <li class="txt_n_sb" data-dow="목">목</li>
                                <li class="txt_n_sb" data-dow="금">금</li>
                                <li class="txt_n_sb" data-dow="토">토</li>
                                <li class="txt_n_sb" data-dow="일">일</li>
                            </ul>
                        </div>
                    </div>
                    <div class="select_field_small select tmzn dpl_n">
                        <div class="selectTit">
                            <span class="txt_n_m" data-stmzn="" data-etmzn="">시간대전체</span>
                        </div>
                        <div class="select_listBox">
                            <ul>
                                <li class="txt_n_sb" data-stmzn="" data-etmzn="">시간대전체</li>
                                <li class="txt_n_sb" data-stmzn="1" data-etmzn="6">01~06시</li>
                                <li class="txt_n_sb" data-stmzn="7" data-etmzn="9">07~09시</li>
                                <li class="txt_n_sb" data-stmzn="10" data-etmzn="12">10~12시</li>
                                <li class="txt_n_sb" data-stmzn="13" data-etmzn="15">13~15시</li>
                                <li class="txt_n_sb" data-stmzn="16" data-etmzn="18">16~18시</li>
                                <li class="txt_n_sb" data-stmzn="19" data-etmzn="21">19~21시</li>
                                <li class="txt_n_sb" data-stmzn="22" data-etmzn="24">22~24시</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <button class="pri_defaultBtn txt_n_sb map_filter">
                    <span>필터 적용</span>
                </button>
            </div>

            <!--인구 ED-->

            <!--인프라 ST-->
            <div class="infra_listTabBox dpl_n">

            </div>

            <div class="infra_right_box">

            </div>

            <!--마커-->
            <div class="infra_markerBox" style="display: none">
            </div>
            <button id="reSearch" class="reSearch_btn txt_n_sb" style="display: none;" onclick="reSearch();">
                <img src="/eatout/assets/eatout/images/icon/bookmark_pri_fill.svg" alt=""/>
                <span></span>
            </button>
            <div class="map_zoomBtn">
                <img src="/eatout/assets/eatout/images/icon/crop_free.svg" alt="지도 확대 아이콘"/>
                <p class="txt_s_m">작게보기</p>
            </div>
        </div>
        <div class="normal_text_box0602 auth_message" style="display: none">
            <div class="flex">
                <img src="/eatout/assets/eatout/images/icon/error_24px.svg" alt=""/>
                <div>
                    <p class="txt_n_sb">일반사용자 회원님의 경우 회원님이 속한 시/군/구(선거구)만 선택해서 볼수 있습니다. 전체 시/군/구(선거구) 데이터를 확인할 수 있는 <span class="pri_5_col">마스터권한 신청</span>은 담당자에게 별도 문의 바랍니다.</p>
                    <span class="txt_n_m mono_g7_col dpl_b">담당자 연락처 : <span id="tbridge_email">tbridge@tbridge.kr</span></span>
                </div>
                <button type="submit" class="sec_defaultBtn txt_s_sb" id="email_copy"><span>연락처 복사</span></button>
            </div>
        </div>
    </div>


</section>

<script type="text/javascript">

    var reload = true;
    var reSearchSw = false;

    $(function() {
        if(common.isEmpty(sessionStorage.getItem("token"))){
            // 로그아웃 처리
            logout();
        }else{
            loginCheck();
        }
        getElectionArea("mega");

        $('.map_zoomBtn').click(function(){
            $('.subMap_imgBox').toggleClass('close_on');

            if($('.subMap_imgBox').hasClass('close_on')){
                $('.map_zoomBtn p').text('축소하기')
            }else{
                $('.map_zoomBtn p').text('확대하기')
            }
        });

        $(".select_tab01").on('click', function (){
            $(this).addClass('active');
            $(".select_tab02").removeClass('active');
            $(".select.gender").removeClass("dpl_n");
            $(".select.age").removeClass("dpl_n");
            $(".select.age2").removeClass("dpl_n");
            $(".select.dow").addClass("dpl_n");
            $(".select.tmzn").addClass("dpl_n");
            $(".select_field_small.select.dow > .selectTit > span").attr('data-dow','');
            $(".select_field_small.select.tmzn > .selectTit > span").attr('data-stmzn','').attr('data-etmzn','');
            $(".select_field_small.select.dow > .selectTit > span").text('요일전체');
            $(".select_field_small.select.tmzn > .selectTit > span").text('시간대전체');
        });

        $(".select_tab02").on('click', function (){
            $(this).addClass('active');
            $(".select_tab01").removeClass('active');
            $(".select.dow").removeClass("dpl_n");
            $(".select.tmzn").removeClass("dpl_n");
            $(".select.gender").addClass("dpl_n");
            $(".select.age").addClass("dpl_n");
            $(".select.age2").addClass("dpl_n");
            $(".select_field_small.select.gender > .selectTit > span").attr('data-gender','');
            $(".select_field_small.select.age > .selectTit > span").attr('data-yy5_aglv_id_s','').attr('data-yy5_aglv_id_e','');
            $(".select_field_small.select.gender > .selectTit > span").text('성별전체');
            $(".select_field_small.select.age > .selectTit > span").text('연령대전체');
        });

        $(".select_listBox > ul > li").on('click', function (){
            $(this).parent().parent().parent().children('.selectTit').children('span').text($(this).text());

            if($(this).parent().parent().parent().hasClass("gender")){
                $(this).parent().parent().parent().children('.selectTit').children('span').attr('data-gender',($(this).data('gender')));
            }else if($(this).parent().parent().parent().hasClass("age")){
                $(this).parent().parent().parent().children('.selectTit').children('span').attr('data-yy5_aglv_id_s',($(this).data('yy5_aglv_id_s')));
                $(this).parent().parent().parent().children('.selectTit').children('span').attr('data-yy5_aglv_id_e',($(this).data('yy5_aglv_id_e')));
            }else if($(this).parent().parent().parent().hasClass("dow")){
                $(this).parent().parent().parent().children('.selectTit').children('span').attr('data-dow',($(this).data('dow')));
            }else if($(this).parent().parent().parent().hasClass("tmzn")){
                $(this).parent().parent().parent().children('.selectTit').children('span').attr('data-stmzn',($(this).data('stmzn')));
                $(this).parent().parent().parent().children('.selectTit').children('span').attr('data-etmzn',($(this).data('etmzn')));
            }

            if($(this).parent().parent().parent().hasClass("gender") || $(this).parent().parent().parent().hasClass("age")){
                $(".select_field_small.select.dow > .selectTit > span").attr('data-dow','');
                $(".select_field_small.select.tmzn > .selectTit > span").attr('data-stmzn','').attr('data-etmzn','');
                $(".select_field_small.select.dow > .selectTit > span").text('요일전체');
                $(".select_field_small.select.tmzn > .selectTit > span").text('시간대전체');
            }else if($(this).parent().parent().parent().hasClass("dow") || $(this).parent().parent().parent().hasClass("tmzn")){
                $(".select_field_small.select.gender > .selectTit > span").attr('data-gender','');
                $(".select_field_small.select.age > .selectTit > span").attr('data-yy5_aglv_id_s','').attr('data-yy5_aglv_id_e','');
                $(".select_field_small.select.gender > .selectTit > span").text('성별전체');
                $(".select_field_small.select.age > .selectTit > span").text('연령대전체');
            }
        });

        $(".map_filter").on('click', function (){
            $("#hit_map").click();
        });

        $("#email_copy").on('click', function (){
            var copyText = document.getElementById("tbridge_email");//클립보드에 복사할 텍스트 가져옴
            var textArea = document.createElement("textarea");//textarea 생성
            textArea.value = copyText.textContent;//textarea에 텍스트 입력
            document.body.appendChild(textArea);//body에 textarea 추가
            textArea.select();//선택
            document.execCommand("Copy");//복사
            textArea.remove();//생성한 textarea 삭제
            alert("복사되었습니다.");
        });

        $('.select_tab01').click(function(){
            $(this).addClass('active');
            $('.select_tab02').removeClass('active');
            $('.select_field_small.dow').addClass('dpl_n');
            $('.select_field_small.tmzn').addClass('dpl_n');

            $('.select_field_small.gender').removeClass('dpl_n');
            $('.select_field_small.age').removeClass('dpl_n');
            $('.select_field_small.age').removeClass('dpl_n');
        });

        $('.select_tab02').click(function(){
            $(this).addClass('active');
            $('.select_tab01').removeClass('active');
            $('.select_field_small.gender').addClass('dpl_n');
            $('.select_field_small.age').addClass('dpl_n');
            $('.select_field_small.age').addClass('dpl_n');

            $('.select_field_small.dow').removeClass('dpl_n');
            $('.select_field_small.tmzn').removeClass('dpl_n');
        });

    });


    function login(){

    }

    // 시/군/구(선거구) 지역현황 비교 지역 가져오기
    function getElectionArea(gubun) {
        var param = {
            gubun: gubun
        };

        getAjax("getElectionArea", "/main/getElectionArea", param, function (id, response, param) {
            response.data.gubun = param.gubun;
            var template = $('#tmp_areaList').html();
            var templateScript = Handlebars.compile(template);
            var context = response.data;
            var html = templateScript(context);
            $(".select_listBox.mega.top").html(html);

            $(".select_listBox.mega.top > ul > li").on('click', function (){
                $(".selectTit.mega").children('span').text($(this).text());
                $(".selectTit.mega").children('span').attr('data-areacd', $(this).data('areacd'));
                $(".selectTit.mega").removeClass("active");
                $(this).parents('.select_listBox').slideUp(500);

                // mega 선택시 인프라 목록 안보이도록
                $(".infra_right_close > p").click();
                $(".infra_listTabBox").addClass("dpl_n");


                var param = {
                    gubun : "cty"
                    ,areaCd : $(this).data('areacd')
                }
                getElectionAreaCty(param);

                if(!reSearchSw){
                    // if($("#normal_map").hasClass('sel')){
                        var param = {
                            megaCd : $(this).data('areacd')
                        }
                        getAjax("getArea", "/common/getArea", param, function (id, response, param) {
                            setMapGeom(response, param);
                        }, fn_error);
                    // }
                    $("#onlyBody").css("display","none");
                    $('.com_chImg').addClass('active');
                }

            });

            // 마스터 권한자가 아니면 무조건 신청 지역만 되도록
            if(strAuthGubun == "0"){
                $(".selectTit.mega.top").addClass("disabled");
            }
            $(".select_listBox.mega.top > ul > li").each(function (){
                if(strElectionArea.substr(3,2) == $(this).data("areacd")){
                    $(this).click();
                }
            });
        }, fn_error, "", false);
    }
    function getElectionAreaCty(param){
        loadingBar(true);

        $(".selectTit.cty").children('span').text("시/군/구(선거구)");
        $(".selectTit.cty").children('span').attr('data-areacd', '');
        $(".selectTit.cty").children('span').attr('data-gabeulgb', '');
        $(".selectTit.admi").children('span').text("읍/면/동");
        $(".selectTit.admi").children('span').attr('data-areacd', '');
        $(".selectTit.admi").children('span').attr('data-gabeulgb', '');

        getAjax("getElectionArea", "/main/getElectionArea", param, function (id, response, param) {
            response.data.gubun = 'cty';
            var template = $('#tmp_areaList').html();
            var templateScript = Handlebars.compile(template);
            var context = response.data;
            var html = templateScript(context);
            $(".select_listBox.cty.top").html(html);

            var template = $('#tmp_areaList').html();
            var templateScript = Handlebars.compile(template);
            var context = {};
            var html = templateScript(context);
            $(".select_listBox.admi.top").html(html);

            loadingBar(false);

            $(".select_listBox.cty.top > ul > li").on('click', function (){
                $("#onlyBody").css("display","block");
                $('.com_chImg').removeClass('active');
                $(".selectTit.cty").children('span').text($(this).text());
                $(".selectTit.cty").children('span').attr('data-areacd', $(this).data('areacd'));
                $(".selectTit.cty").children('span').attr('data-gabeulgb', $(this).data('gabeulgb'));
                $(".selectTit.cty").removeClass("active");
                $(this).parents('.select_listBox').slideUp(500);

                if(!reSearchSw && $("#hit_map").hasClass('sel')){
                    alert("읍/면/동 을 선택해주세요.");
                }
                var param = {
                    gubun : "admi"
                    ,areaCd : $(this).data('areacd')
                    ,gabeulGb : $(this).data('gabeulgb')
                }
                getElectionAreaAdmi(param);

                // 일반지도
                /*if($("#normal_map").hasClass('sel')){
                    var param = {
                        gubun : "admi"
                        ,areaCd : $(this).data('areacd')
                        ,gabeulGb : $(this).data('gabeulgb')
                    }
                    getElectionAreaAdmi(param);
                }else{  // 히트맵
                    var param = {
                        gubun : "admi"
                        , areaCd : $(this).data('areacd')
                        , gabeulGb : $(this).data('gabeulgb')
                    }
                    getElectionAreaAdmi(param);

                    param.mapType = "hit";
                    getAjax("getFlowpop50x50", "/flowpop/getFlowpop50x50", param, function (id, response, param) {
                        setMapGeom(response, param);
                    }, fn_error);
                }*/

                if(common.isEmpty(param.areaCd)){
                    alert('시/군/구(선거구)를 선택해 주세요.');
                    return;
                }

                if(!reSearchSw){
                    setTimeout(function (){
                        getChartData();
                    }, 200)
                }
            });

            // 마스터 권한자가 아니면 무조건 신청 지역만 되도록
            if(strAuthGubun == "0"){
                $(".selectTit.cty.top").addClass("disabled");
                $(".select_listBox.cty.top > ul > li").each(function (){
                    if(strElectionArea.substr(3) == $(this).data("areacd").substr(3) && strGabeulGb == $(this).data("gabeulgb")){
                        $(this).click();
                    }
                });
            }else{
                if(reload){
                    $(".select_listBox.cty.top > ul > li").each(function (){
                        if(strElectionArea.substr(3) == $(this).data("areacd").substr(3) && strGabeulGb == $(this).data("gabeulgb")){
                            $(this).click();
                        }
                    });
                }
            }
            strElectionArea = "";
        }, fn_error);
    }

    function getElectionAreaAdmi(param){

        $(".selectTit.admi").children('span').text("읍/면/동");
        $(".selectTit.admi").children('span').attr('data-areacd', '');
        $(".selectTit.admi").children('span').attr('data-gabeulgb', '');

        getAjax("getElectionArea", "/main/getElectionArea", param, function (id, response, param) {
            response.data.gubun = param.gubun;
            var template = $('#tmp_areaList').html();
            var templateScript = Handlebars.compile(template);
            var context = response.data;
            var html = templateScript(context);
            $(".select_listBox.admi.top").html(html);

            // 일반 지도일때만
            if(reload && !reSearchSw) {
                if ($("#normal_map").hasClass('sel')) {
                    setMapGeom(response, param);
                }
            }

            $(".select_listBox.admi.top > ul > li").on('click', function (){
                $(".selectTit.admi").children('span').text($(this).text());
                $(".selectTit.admi").children('span').attr('data-areacd', $(this).data('areacd'));
                $(".selectTit.admi").removeClass("active");
                $(this).parents('.select_listBox').slideUp(500);

                if($("#normal_map").hasClass('sel')) {
                    if (common.isEmpty($(this).data('areacd'))) {
                        var param = {
                            gubun: "admi"
                            , areaCd: $(".selectTit.cty.top > span").data('areacd')
                            , gabeulGb: $(".selectTit.cty.top > span").data('gabeulgb')
                        }
                        getElectionAreaAdmi(param);
                    } else {
                        var param = {
                            xAxis: "0.0"
                            , admiCd: $(this).data('areacd')
                            , zoomStatus: 'admiCd'
                        }
                        getAjax("getAdmiFeatures", "/analysis/admiFeatures", param, function (id, response, param) {
                            setMapGeom(response, param);
                        }, fn_error);
                    }
                }else{  // 히트맵
                    if(common.isEmpty($(".selectTit.admi").children('span').attr('data-areacd'))){
                        alert('읍/면/동을 선택해 주세요.');
                        return;
                    }
                    var param = {
                        mapType : "hit"
                        , yyyymmdd : $(".select_field_small.select.yyyymm > div > span").attr('data-yyyymmdd')
                        , gender : $(".select_field_small.select.gender > div > span").attr('data-gender')
                        , age: $(".select_field_small.select.age2 > div > span").attr('data-age')
                        , yy5AglvIdS : $(".select_field_small.select.age > div > span").attr('data-yy5_aglv_id_s')
                        , yy5AglvIdE : $(".select_field_small.select.age > div > span").attr('data-yy5_aglv_id_e')
                        , dow : $(".select_field_small.select.dow > div > span").attr('data-dow')
                        , sTmzn : $(".select_field_small.select.tmzn > div > span").attr('data-stmzn')
                        , eTmzn : $(".select_field_small.select.tmzn > div > span").attr('data-etmzn')
                    }
                    /*if(common.isEmpty($(".selectTit.admi").children('span').attr('data-areacd'))){
                        param.areaCd = $(".selectTit.cty.top > span").attr('data-areacd')
                        param.gabeulGb = $(".selectTit.cty.top > span").attr('data-gabeulgb')
                        param.gubun = 'cty'
                    }else{*/
                        param.areaCd = $(".selectTit.admi.top > span").attr('data-areacd')
                        param.gubun = 'admi'
                    // }
                    param.menu = sessionStorage.getItem("menu");
                    if(sessionStorage.getItem("menu") == "flowpop") {
                        getAjax("getFlowpop50x50", "/flowpop/getFlowpop50x50", param, function (id, response, param) {
                            setMapGeom(response, param);
                        }, fn_error, "", true, true);
                    }
                    if(sessionStorage.getItem("menu") == "incom") {
                        getAjax("getIncomBlock","/incom/getIncomBlock", param, function (id,response,param){
                            setMapGeom(response, param);
                        }, fn_error, "", true, true);
                    }
                    if(sessionStorage.getItem("menu") == "loan") {
                        getAjax("getLoanBlock","/incom/getLoanBlock", param, function (id,response,param){
                            setMapGeom(response, param);
                        }, fn_error, "", true, true);
                    }
                }

                getChartData();
            });

            if(!common.isEmpty(strAdmiCd)){
                $(".select_listBox.admi.top > ul > li").each(function(){
                    if($(this).data('areacd') == strAdmiCd){
                        $(this).click();
                        strAdmiCd = "";
                    }
                });
            }

        }, fn_error);
    }
</script>


<script type="text/x-handlebars-template" id="tmp_areaList">
    <ul>
        {{#ifCond gubun '==' 'mega'}}
        <li class="txt_n_sb" data-areaCd="">시/도</li>
        {{else}}
            {{#ifCond gubun '==' 'cty'}}
            <li class="txt_n_sb" data-areaCd="" data-gabeulGb="">시/군/구(선거구)</li>
            {{else}}
            <li class="txt_n_sb" data-areaCd="">읍/면/동</li>
            {{/ifCond}}
        {{/ifCond}}
        {{#each this}}
        <li class="txt_n_sb" data-areaCd="{{areaCd}}" data-gabeulGb="{{gabeulGb}}">{{areaNm}} {{#ifCond gubun '==' 'cty'}} {{gabeulGbNm}} {{/ifCond}}</li>
        {{/each}}
    </ul>
</script>

<script type="text/x-handlebars-template" id="tmp_search_at_txt">
    <ul>
        {{#each this}}
        <li data-centerx="{{x}}" data-centery="{{y}}" data-address="{{address}}" onclick="mapMove($(this).data());">
            {{{addressHtml}}}
            <br/>
            <span>{{subAddress}}</span>
        </li>
        {{/each}}
    </ul>
</script>

<script type="text/x-handlebars-template" id="tmp_flo_box01">
    <p class="txt_n_m" data-cume="{{this.1.cume}}"><span class="color_dt chart_color_01"></span>{{this.1.val}} 이상</p>
    <p class="txt_n_m" data-cume="{{this.2.cume}}"><span class="color_dt chart_color_02"></span>{{this.3.val}} ~ {{this.2.val}}</p>
    <p class="txt_n_m" data-cume="{{this.4.cume}}"><span class="color_dt chart_color_03"></span>{{this.5.val}} ~ {{this.4.val}}</p>
    <p class="txt_n_m" data-cume="{{this.6.cume}}"><span class="color_dt chart_color_04"></span>{{this.7.val}} ~ {{this.6.val}}</p>
    <p class="txt_n_m" data-cume="{{this.8.cume}}"><span class="color_dt chart_color_05"></span>{{this.8.val}} 이하</p>
    <p class="txt_n_m" style="margin-bottom: 0px;"><span class="color_dt chart_color_06"></span>미집계지역</p>
</script>


<%--

<script>

    $(function(){
        //인프라 종류 탭
        $('.infra_listTabBox li').on('click',function() {
            $('.infra_listTabBox li').removeClass('active');
            $(this).addClass('active');
            var idx = $('.infra_listTabBox li').index(this);
            $('.infra_right_box').removeClass('infra_box_on');
            $('.infra_right_box').eq(idx).addClass('infra_box_on');
        });

        $('.infra_right_sTab > div').click(function(){
            $('.infra_right_sTab > div').removeClass('active');
            $(this).addClass('active');
            var idx = $('.infra_right_sTab > div').index(this);
            $('.infra_right_contBox').removeClass('active');
            $('.infra_right_contBox').eq(idx).addClass('active');

        });

        $('.infra_right_close p').click(function(){
            $('.infra_listTabBox li').removeClass('active');
            $('.infra_right_box').removeClass('infra_box_on');
        });

        //검색창
        $('.areaSearch input').keydown(function(){
            $('.areaSearch .search_at_txt').addClass('active');
            $('.areaSearch .areaSearch_icon').addClass('search_on');
        });

        $('.areaSearch .areaSearch_icon').click(function(){
            $('.areaSearch .search_at_txt').removeClass('active');
            $('.areaSearch .areaSearch_icon').removeClass('search_on');
        });
    });
</script>--%>
