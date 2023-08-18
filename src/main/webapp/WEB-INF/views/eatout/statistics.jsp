<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>

<div class="wrap main">
<%--    <%@ include file="/WEB-INF/views/eatout/include/side.jsp" %>--%>
    <%@ include file="/WEB-INF/views/eatout/include/navbar.jsp" %>
<!--
*공통*
로그인 전 / 후 구분
class = "login_none" 제거 및 추가
-->
    <div class="com_gridInner">
        <div class="container text-center">
            <div class="row">
                <div class="col-8">
                    <div class="row">
                        <div class="col-8">
                            <div class="row">
                                <div class="col-5"aria-setsize="" id="type_nm"></div><div class="col-3" id="admi_nm"></div><div class="col-4" id="upjong_nm"></div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    전기 대비 : <span id=""></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12">
                                    고가 :<span id="maxYyyymm"></span> | <span id="maxVal"></span>
                                </div>
                                <div class="col-12">
                                    저가 :<span id="minYyyymm"></span> | <span id="minVal"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!-- 상단 선택지 항목 -->
                        <div class="col-2">주체:
                            <select id="dataType">
                                <option name="1" value="1">외식 데이터(카드)</option>
                                <option name="2" value="2">배달 데이터(카드)</option>
                                <option name="3" value="3">메뉴 데이터(POS)</option>
                                <option name="4" value="4">생활 인구 데이터(통신)</option>
                                <option name="5" value="5">주거 인구 데이터(공공)</option>
                            </select>
                        </div>
                        <div class="col-2">지역:
                            <select id="area_mega">
                                <option name="0" value="0">시/도</option>
                            </select>
                            <select id="area_cty">
                                <option name="0" value="0">시/군/구</option>
                            </select>
                            <select id="area_admi">
                                <option name="0" value="0">읍면동</option>
                            </select>
                        </div>
                        <div class="col-2">업종:
                            <select id="upjong1">
                                <option name="0" value="0">외식업</option>
                            </select>
                            <select id="upjong2">
                                <option name="0" value="0">중분류</option>
                            </select>
                            <select id="upjong3">
                                <option name="0" value="0">소분류</option>
                            </select>
                        </div>
                        <div class="col-2">기간:
                            <select id="dateType">
                                <option name="1" value="1">년도 데이터</option>
                                <option name="2" value="2">반기 데이터</option>
                                <option name="3" value="3">분기 데이터</option>
                                <option name="4" value="4">월별 데이터</option>
                                <option name="5" value="5">주간 데이터</option>
                            </select>
                            <select id="startDate">
                                <option name="0" value="0">시작일</option>
                            </select>
                            <select id="endDate">
                                <option name="0" value="0">종료일</option>
                            </select>
                        </div>
                        <div class="col-2">항목:
                            <select id="colType1" style="display:block;">
                                <option value="0">항목</option>
                                <option value="saleAmt">총 매출</option>
                                <option value="storeCnt">점포 수</option>
                                <option value="storeAmt">점포당 매출</option>
                                <option value="useCnt">결제 건수</option>
                                <option value="useAmt">결제 단가</option>
                                <option value="cnt20under">20대 이하 고객수</option>
                                <option value="cnt30">30대 고객수</option>
                                <option value="cnt40">40대 고객수</option>
                                <option value="cnt50">50대 고객수</option>
                                <option value="cnt60over">60대 이상 고객 수 </option>
                                <option value="time2406">00~06시 고객수</option>
                                <option value="time0609">06~09시 고객수</option>
                                <option value="time0912">09~12시 고객수</option>
                                <option value="time1215">12~15시 고객수</option>
                                <option value="time1518">15~18시 고객수</option>
                                <option value="time1821">18~21시 고객수</option>
                                <option value="time2124">21~24시 고객수</option>
                                <option value="mon">월요일 고객수</option>
                                <option value="tue">화요일 고객수</option>
                                <option value="wed">수요일 고객수</option>
                                <option value="thu">목요일 고객수</option>
                                <option value="fri">금요일 고객수</option>
                                <option value="sat">토요일 고객수</option>
                                <option value="sun">일요일 고객수</option>
                            </select>
                            <select id="colType2" style="display:none;">
                                <option value="0">항목</option>
                                <option value="saleAmt">총 매출</option>
                                <option value="storeCnt">점포 수</option>
                                <option value="storeAmt">점포당 매출</option>
                                <option value="useCnt">결제 건수</option>
                                <option value="useAmt">결제 단가</option>
                                <option value="cnt20under">20대 이하 고객수</option>
                                <option value="cnt30">30대 고객수</option>
                                <option value="cnt40">40대 고객수</option>
                                <option value="cnt50">50대 고객수</option>
                                <option value="cnt60over">60대 이상 고객 수 </option>
                                <option value="time2406">00~06시 고객수</option>
                                <option value="time0609">06~09시 고객수</option>
                                <option value="time0912">09~12시 고객수</option>
                                <option value="time1215">12~15시 고객수</option>
                                <option value="time1518">15~18시 고객수</option>
                                <option value="time1821">18~21시 고객수</option>
                                <option value="time2124">21~24시 고객수</option>
                                <option value="mon">월요일 고객수</option>
                                <option value="tue">화요일 고객수</option>
                                <option value="wed">수요일 고객수</option>
                                <option value="thu">목요일 고객수</option>
                                <option value="fri">금요일 고객수</option>
                                <option value="sat">토요일 고객수</option>
                                <option value="sun">일요일 고객수</option>
                            </select>
                            <select id="colType3" style="display:none;">
                                <option value="">항목</option>
                                <option value="">총 매출</option>
                                <option value="">표본점포 수</option>
                                <option value="">판매건수</option>
                                <option value="">판매단가</option>
                            </select>
                            <select id="colType4" style="display:none;">
                                <option value="0">항목</option>
                                <option value="pop">전체 생활인구 수</option>
                                <option value="m20Under">남성 20대 이하</option>
                                <option value="m30">남성 30대</option>
                                <option value="m40">남성 40대</option>
                                <option value="m50">남성 50대</option>
                                <option value="m60Over">남성 60대 이상</option>
                                <option value="w20Under">여성 20대 이하</option>
                                <option value="w30">여성 30대</option>
                                <option value="w40">여성 40대</option>
                                <option value="w50">여성 50대</option>
                                <option value="w60Over">여성 60대 이상</option>
                                <option value="time2406">00~06시</option>
                                <option value="time0609">06~09시</option>
                                <option value="time0912">09~12시</option>
                                <option value="time1215">12~15시</option>
                                <option value="time1518">15~18시</option>
                                <option value="time1821">18~21시</option>
                                <option value="time2124">21~24시</option>
                                <option value="popMon">월요일</option>
                                <option value="popTue">화요일</option>
                                <option value="popWed">수요일</option>
                                <option value="popThu">목요일</option>
                                <option value="popFri">금요일</option>
                                <option value="popSat">토요일</option>
                                <option value="popSun">일요일</option>
                            </select>
                            <select id="colType5" style="display:none;">
                                <option value="0">항목</option>
                                <option value="pop">전체 주거인구 수</option>
                                <option value="m20Under">남성 10대 이하</option>
                                <option value="m20">남성 20대</option>
                                <option value="m30">남성 30대</option>
                                <option value="m40">남성 40대</option>
                                <option value="m50">남성 50대</option>
                                <option value="m60Over">남성 60대 이상</option>
                                <option value="w20Under">여성 10대 이하</option>
                                <option value="w20">여성 20대</option>
                                <option value="w30">여성 30대</option>
                                <option value="w40">여성 40대</option>
                                <option value="w50">여성 50대</option>
                                <option value="w60Over">여성 60대 이상</option>
                            </select>
                        </div>
                        <div class="col-1">
                            <button id="search">조회</button>
                        </div>
                    </div>
                    <div class="row">
                        <!-- 상단 선택지 항목 -->
                        <div class="col-12">
                            <div id="main_chart1" style="height:400px;width:700px;"></div>
                        </div>
                    </div>
                    <div class="row">
                        <!-- 하단 선택지 항목 -->
                        <div class="col-1">위 설정조건 불러오기
                            <button id="setting_btn">클릭하기</button>
                        </div>
                        <div class="col-2">주체:
                            <select id="dataType_2">
                                <option name="1" value="1">외식 데이터(카드)</option>
                                <option name="2" value="2">배달 데이터(카드)</option>
                                <option name="3" value="3">메뉴 데이터(POS)</option>
                                <option name="4" value="4">생활 인구 데이터(통신)</option>
                                <option name="5" value="5">주거 인구 데이터(공공)</option>
                            </select>
                        </div>
                        <div class="col-2">지역:
                            <select id="area_mega_2">
                                <option name="0" value="0">시/도</option>
                            </select>
                            <select id="area_cty_2">
                                <option name="0" value="0">시/군/구</option>
                            </select>
                            <select id="area_admi_2">
                                <option name="0" value="0">읍면동</option>
                            </select>
                        </div>
                        <div class="col-2">업종:
                            <select id="upjong1_2">
                                <option name="0" value="0">외식업</option>
                            </select>
                            <select id="upjong2_2">
                                <option name="0" value="0">중분류</option>
                            </select>
                            <select id="upjong3_2">
                                <option name="0" value="0">소분류</option>
                            </select>
                        </div>
                        <div class="col-2">기간:
                            <select id="dateType_2">
                                <option name="1" value="1">년도 데이터</option>
                                <option name="2" value="2">반기 데이터</option>
                                <option name="3" value="3">분기 데이터</option>
                                <option name="4" value="4">월별 데이터</option>
                                <option name="5" value="5">주간 데이터</option>
                            </select>
                            <select id="startDate_2">
                                <option name="0" value="0">시작일</option>
                            </select>
                            <select id="endDate_2">
                                <option name="0" value="0">종료일</option>
                            </select>
                        </div>
                        <div class="col-2">항목:
                                <select id="colType1_2" style="display:block;">
                                <option value="0">항목</option>
                                <option value="saleAmt">총 매출</option>
                                <option value="storeCnt">점포 수</option>
                                <option value="storeAmt">점포당 매출</option>
                                <option value="useCnt">결제 건수</option>
                                <option value="useAmt">결제 단가</option>
                                <option value="cnt20under">20대 이하 고객수</option>
                                <option value="cnt30">30대 고객수</option>
                                <option value="cnt40">40대 고객수</option>
                                <option value="cnt50">50대 고객수</option>
                                <option value="cnt60over">60대 이상 고객 수 </option>
                                <option value="time2406">00~06시 고객수</option>
                                <option value="time0609">06~09시 고객수</option>
                                <option value="time0912">09~12시 고객수</option>
                                <option value="time1215">12~15시 고객수</option>
                                <option value="time1518">15~18시 고객수</option>
                                <option value="time1821">18~21시 고객수</option>
                                <option value="time2124">21~24시 고객수</option>
                                <option value="mon">월요일 고객수</option>
                                <option value="tue">화요일 고객수</option>
                                <option value="wed">수요일 고객수</option>
                                <option value="thu">목요일 고객수</option>
                                <option value="fri">금요일 고객수</option>
                                <option value="sat">토요일 고객수</option>
                                <option value="sun">일요일 고객수</option>
                            </select>
                            <select id="colType2_2" style="display:none;">
                                <option value="0">항목</option>
                                <option value="saleAmt">총 매출</option>
                                <option value="storeCnt">점포 수</option>
                                <option value="storeAmt">점포당 매출</option>
                                <option value="useCnt">결제 건수</option>
                                <option value="useAmt">결제 단가</option>
                                <option value="cnt20under">20대 이하 고객수</option>
                                <option value="cnt30">30대 고객수</option>
                                <option value="cnt40">40대 고객수</option>
                                <option value="cnt50">50대 고객수</option>
                                <option value="cnt60over">60대 이상 고객 수 </option>
                                <option value="time2406">00~06시 고객수</option>
                                <option value="time0609">06~09시 고객수</option>
                                <option value="time0912">09~12시 고객수</option>
                                <option value="time1215">12~15시 고객수</option>
                                <option value="time1518">15~18시 고객수</option>
                                <option value="time1821">18~21시 고객수</option>
                                <option value="time2124">21~24시 고객수</option>
                                <option value="mon">월요일 고객수</option>
                                <option value="tue">화요일 고객수</option>
                                <option value="wed">수요일 고객수</option>
                                <option value="thu">목요일 고객수</option>
                                <option value="fri">금요일 고객수</option>
                                <option value="sat">토요일 고객수</option>
                                <option value="sun">일요일 고객수</option>
                            </select>
                            <select id="colType3_2" style="display:none;">
                                <option value="">항목</option>
                                <option value="">총 매출</option>
                                <option value="">표본점포 수</option>
                                <option value="">판매건수</option>
                                <option value="">판매단가</option>
                            </select>
                            <select id="colType4_2" style="display:none;">
                                <option value="0">항목</option>
                                <option value="pop">전체 생활인구 수</option>
                                <option value="m20Under">남성 20대 이하</option>
                                <option value="m30">남성 30대</option>
                                <option value="m40">남성 40대</option>
                                <option value="m50">남성 50대</option>
                                <option value="m60Over">남성 60대 이상</option>
                                <option value="w20Under">여성 20대 이하</option>
                                <option value="w30">여성 30대</option>
                                <option value="w40">여성 40대</option>
                                <option value="w50">여성 50대</option>
                                <option value="w60Over">여성 60대 이상</option>
                                <option value="time2406">00~06시</option>
                                <option value="time0609">06~09시</option>
                                <option value="time0912">09~12시</option>
                                <option value="time1215">12~15시</option>
                                <option value="time1518">15~18시</option>
                                <option value="time1821">18~21시</option>
                                <option value="time2124">21~24시</option>
                                <option value="popMon">월요일</option>
                                <option value="popTue">화요일</option>
                                <option value="popWed">수요일</option>
                                <option value="popThu">목요일</option>
                                <option value="popFri">금요일</option>
                                <option value="popSat">토요일</option>
                                <option value="popSun">일요일</option>
                            </select>
                            <select id="colType5_2" style="display:none;">
                                <option value="0">항목</option>
                                <option value="pop">전체 주거인구 수</option>
                                <option value="m20Under">남성 10대 이하</option>
                                <option value="m20">남성 20대</option>
                                <option value="m30">남성 30대</option>
                                <option value="m40">남성 40대</option>
                                <option value="m50">남성 50대</option>
                                <option value="m60Over">남성 60대 이상</option>
                                <option value="w20Under">여성 10대 이하</option>
                                <option value="w20">여성 20대</option>
                                <option value="w30">여성 30대</option>
                                <option value="w40">여성 40대</option>
                                <option value="w50">여성 50대</option>
                                <option value="w60Over">여성 60대 이상</option>
                            </select>
                        </div>
                        <div class="col-1">
                            <button id="search_2">조회</button>
                        </div>
                        <!-- 하단 선택지 항목 -->
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div id="main_chart2" style="height:400px;width:700px;"></div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row">
                        <div id="setDateInfo"></div>
                        <div id="setDateInfo2"></div>
                    </div>
                    <div class="row">
                        <div id="eatout_diff" style="height:800px; overflow: scroll;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!--공통 footer-->
<%--<%@ include file="/WEB-INF/views/eatout/include/footer.jsp" %>--%>

<script type="text/javascript">

    var searchType = 0;

    var eatoutResultResponse = {};
    var eatoutDiffResponse = {};

    var resultData = {};
    var resultData_sub = {};
    var dataTypeNum = 1;
    var dataTypeNum_sub = 1;
    var admGbNum = 1;
    var admGbNum_sub = 1;
    var upjongGbNum = 1;
    var upjongGbNum_sub = 1;
    var dateTypeNum = 1;
    var dateTypeNum_sub = 1;
    var admiCd = '';
    var admiCd_sub = '';
    var upjongCd = '';
    var upjongCd_sub = '';
    var startDate = '';
    var startDate_sub = '';
    var endDate = '';
    var endDate_sub = '';
    var searchBtnNum = 0;
    var settingCheck = true;

    $(function() {
        var param = {};
        getAjax("getUpjongChgRate", "/agile/statistics/getUpjongChgRate",param, fn_eatoutDiff, fn_error);
        setAreaList(1);
        setUpjongList(2);
        setDateList(1);
        setAreaList_sub(1);
        setUpjongList_sub(2);
        setDateList_sub(1);
        setDateInfo();
        $("#upjong1").attr('disabled',true);
        $("#upjong1_2").attr('disabled',true);

        //초기 상단문구 세팅
        $("#type_nm").text($('#dataType option:selected').text())
        $("#admi_nm").text('전국')
        $("#upjong_nm").text($('#upjong1 option:selected').text())

        //-------------------------------------------- 상단 선택 항목
        // 주제 선택 이벤트
        $("#dataType").on("change", function(){
            console.log($('#dataType option:selected').text());
            //selected value
            $("#type_nm").text($('#dataType option:selected').text())
            dataTypeNum = $(this).val();
            if(dataTypeNum == 1){
                reset_select(0);
                console.log('외식 데이터 선택');
                $("#area_admi").attr('disabled',false);
                $("#upjong2").attr('disabled',false);
                $("#upjong3").attr('disabled',false);
                change_colType($(this).val(),true);

            }else if(dataTypeNum == 2){
                console.log('배달 데이터 선택');
                reset_select(0);
                $("#area_admi").attr('disabled',true);
                $("#upjong2").attr('disabled',false);
                $("#upjong3").attr('disabled',false);
                change_colType($(this).val(),true);

            }else if(dataTypeNum == 3){
                console.log('메뉴 데이터 선택');
                reset_select(0);
                $("#area_admi").attr('disabled',false);
                $("#upjong2").attr('disabled',false);
                $("#upjong3").attr('disabled',false);
                change_colType($(this).val(),true);

            }else if(dataTypeNum == 4){
                console.log('생활 인구 데이터 선택');
                reset_select(0);
                $("#area_admi").attr('disabled',false);
                $("#upjong2").attr('disabled',true);
                $("#upjong3").attr('disabled',true);
                change_colType($(this).val(),true);

            }else if(dataTypeNum == 5){
                console.log('주거 인구 데이터 선택');
                reset_select(0);
                $("#area_admi").attr('disabled',false);
                $("#upjong2").attr('disabled',true);
                $("#upjong3").attr('disabled',true);
                change_colType($(this).val(),true);

            }
        });
        // 지역 선택 이벤트
        $("#area_mega").on("change", function(){
            $('#area_cty').children('option:not(:first)').remove();
            $("#admi_nm").text($('#area_mega option:selected').text());
            //selected value
            if($(this).val() != 0){
                setAreaList(2,$(this).val());
                admiCd = $(this).val();
            }else{
                reset_select(1);
                admiCd = '';
                admGbNum = 1;
            }
        });
        $("#area_cty").on("change", function(){
            $('#area_admi').children('option:not(:first)').remove();
            $("#admi_nm").text($('#area_cty option:selected').text());
            //selected value
            setAreaList(3,$(this).val());
            admiCd = $(this).val();
            admGbNum = 2;
        });
        $("#area_admi").on("change", function(){
            $("#admi_nm").text($('#area_admi option:selected').text());
            //selected value
            admiCd = $(this).val();
            admGbNum = 3;
        });

        //업종 선택 이벤트
        $("#upjong2").on("change", function(){
            $("#upjong_nm").text($('#upjong2 option:selected').text())
            $('#upjong3').children('option:not(:first)').remove();
            //selected value
            setUpjongList(3,$(this).val());
            upjongCd = $(this).val();
            upjongGbNum = 2;
        });
        $("#upjong3").on("change", function(){
            $("#upjong_nm").text($('#upjong3 option:selected').text())
            // 마지막 업종 선택시 데이터 출력
            upjongCd = $(this).val();
            upjongGbNum = 3;
        });

        //날짜 선택 이벤트
        $("#dateType").on("change", function(){
            //selected value
            reset_select(3);
            setDateList($(this).val());
            dateTypeNum = $(this).val();
        });
        $("#startDate").on("change", function(){
            //selected value
            startDate = $(this).val();
        });
        $("#endDate").on("change", function(){
            //selected value
            endDate = $(this).val();
        });
        $("#search").on("click", function(){
            searchType = 0;
            var param = {};
            if($("#colType"+dataTypeNum+" option:selected").val() == 0){
                alert('항목이 선택되지 않았습니다.\n항목을 선택후 검색해주시기 바랍니다.');
                return;
            }
            param.admGb = admGbNum;
            param.upjongType = upjongGbNum;
            param.dateType = dateTypeNum;
            if(!(admiCd == '' || admiCd == 0 || admiCd == null)) param.areaCd = admiCd;
            if(!(upjongCd == '' || upjongCd == 0 || upjongCd == null)) param.upjongCd = upjongCd;
            if(!(startDate == '' || startDate == 0 || startDate == null)) param.dateStart = startDate;
            if(!(endDate == '' || endDate == 0 || endDate == null)) param.dateEnd = endDate;

            console.log('검색시작 : 선택된 검색데이터는('+dataTypeNum+')');
            console.log(param);
            searchBtnNum = 1;
            main_search(dataTypeNum,param);
        });
        //-------------------------------------------- 상단 선택 항목

        //-------------------------------------------- 하단 선택 항목
        // 주제 선택 이벤트
        $("#dataType_2").on("change", function(){
            //selected value
            dataTypeNum_sub = $(this).val();
            if(dataTypeNum_sub == 1){
                reset_select(0);
                console.log('외식 데이터 선택');
                $("#area_admi_2").attr('disabled',false);
                $("#upjong2_2").attr('disabled',false);
                $("#upjong3_2").attr('disabled',false);
                change_colType($(this).val(),false);
            }else if(dataTypeNum_sub == 2){
                console.log('배달 데이터 선택');
                reset_select(0);
                $("#area_admi_2").attr('disabled',true);
                $("#upjong2_2").attr('disabled',false);
                $("#upjong3_2").attr('disabled',false);
                change_colType($(this).val(),false);
            }else if(dataTypeNum_sub == 3){
                console.log('메뉴 데이터 선택');
                reset_select(0);
                $("#area_admi_2").attr('disabled',false);
                $("#upjong2_2").attr('disabled',false);
                $("#upjong3_2").attr('disabled',false);
                change_colType($(this).val(),false);
            }else if(dataTypeNum_sub == 4){
                console.log('생활 인구 데이터 선택');
                reset_select(0);
                $("#area_admi_2").attr('disabled',false);
                $("#upjong2_2").attr('disabled',true);
                $("#upjong3_2").attr('disabled',true);
                change_colType($(this).val(),false);
            }else if(dataTypeNum_sub == 5){
                console.log('주거 인구 데이터 선택');
                reset_select(0);
                $("#area_admi_2").attr('disabled',false);
                $("#upjong2_2").attr('disabled',true);
                $("#upjong3_2").attr('disabled',true);
                change_colType($(this).val(),false);
            }
        });
        // 지역 선택 이벤트
        $("#area_mega_2").on("change", function(){
            $('#area_cty_2').children('option:not(:first)').remove();
            //selected value
            if($(this).val() != 0){
                setAreaList_sub(2,$(this).val());
                admiCd_sub = $(this).val();
            }else{
                reset_select(1);
                admiCd_sub = '';
                admGbNum_sub = 1;
            }
        });
        $("#area_cty_2").on("change", function(){
            $('#area_admi_2').children('option:not(:first)').remove();
            console.log('#area_cty_2 : '+$(this).val())
            //selected value
            setAreaList_sub(3,$(this).val());
            admiCd_sub = $(this).val();
            admGbNum_sub = 2;
        });
        $("#area_admi_2").on("change", function(){
            //selected value
            admiCd_sub = $(this).val();
            admGbNum_sub = 3;
        });

        //업종 선택 이벤트
        $("#upjong2_2").on("change", function(){
            $('#upjong3_2').children('option:not(:first)').remove();
            //selected value
            setUpjongList_sub(3,$(this).val());
            upjongCd_sub = $(this).val();
            upjongGbNum_sub = 2;
        });
        $("#upjong3_2").on("change", function(){
            // 마지막 업종 선택시 데이터 출력
            upjongCd_sub = $(this).val();
            upjongGbNum_sub = 3;
        });

        //날짜 선택 이벤트
        $("#dateType_2").on("change", function(){
            //selected value
            setDateList_sub($(this).val());
            dateTypeNum_sub = $(this).val();
        });
        $("#startDate_2").on("change", function(){
            //selected value
            startDate_sub = $(this).val();
        });
        $("#endDate_2").on("change", function(){
            //selected value
            endDate_sub = $(this).val();
        });
        $("#search_2").on("click", function(){
            searchType = 1;
            var param = {};
            if($("#colType"+dataTypeNum+"_2 option:selected").val() == 0){
                alert('항목이 선택되지 않았습니다.\n항목을 선택후 검색해주시기 바랍니다.');
                return;
            }

            param.admGb = admGbNum_sub;
            param.upjongType = upjongGbNum_sub;
            param.dateType = dateTypeNum_sub;
            if(!(admiCd_sub == '' || admiCd_sub == 0 || admiCd_sub == null)) param.areaCd = admiCd_sub;
            if(!(upjongCd_sub == '' || upjongCd_sub == 0 || upjongCd_sub == null)) param.upjongCd = upjongCd_sub;
            if(!(startDate_sub == '' || startDate_sub == 0 || startDate_sub == null)) param.dateStart = startDate_sub;
            if(!(endDate_sub == '' || endDate_sub == 0 || endDate_sub == null)) param.dateEnd = endDate_sub;

            console.log('검색시작 : 선택된 검색데이터는('+dataTypeNum_sub+')');
            console.log(param);
            searchBtnNum = 2;
            main_search(dataTypeNum_sub,param);
        });
        //-------------------------------------------- 하단 선택 항목

        //------------------------------------------- 좌측 업종 이름 클릭
        // $('#upjongNmClick').click(function(){
        //     console.log('upjongNmClick start');
        //     console.log($(this).val());
        //
        //     searchType = 1;
        //     var param = {};
        //     if($("#colType"+dataTypeNum+"_2 option:selected").val() == 0){
        //         alert('항목이 선택되지 않았습니다.\n항목을 선택후 검색해주시기 바랍니다.');
        //         return;
        //     }
        //
        //     param.admGb = admGbNum_sub;
        //     param.upjongType = upjongGbNum_sub;
        //     param.dateType = dateTypeNum_sub;
        //     if(!(admiCd_sub == '' || admiCd_sub == 0 || admiCd_sub == null)) param.areaCd = admiCd_sub;
        //     if(!(upjongCd_sub == '' || upjongCd_sub == 0 || upjongCd_sub == null)) param.upjongCd = upjongCd_sub;
        //     if(!(startDate_sub == '' || startDate_sub == 0 || startDate_sub == null)) param.dateStart = startDate_sub;
        //     if(!(endDate_sub == '' || endDate_sub == 0 || endDate_sub == null)) param.dateEnd = endDate_sub;
        //
        //     console.log('검색시작 : 선택된 검색데이터는('+dataTypeNum_sub+')');
        //     console.log(param);
        //     // searchBtnNum = 2;
        //     // main_search(dataTypeNum_sub,param);
        // })
        //------------------------------------------- 좌측 업종 이름 클릭

        //-------------------------------------------- 설정 동기화 항목
        $('#setting_btn').on("click",function(){

            //주제 동기화
            // $("#dataType_2 option:eq("+$("#dataType option").index($("#dataType option:selected"))+")").prop("selected", true); //첫번째 option 선택
            $("#dataType_2").val($('#dataType').val()).trigger("change");

            //지역 동기화
            $("#area_mega_2").val($('#area_mega').val()).trigger("change");
            if($('#area_cty').val() != 0) {
                setTimeout(function () {
                    $("#area_cty_2").val($('#area_cty').val()).trigger("change");
                }, 100);
            }
            if($('#area_admi').val() != 0){
                setTimeout(function(){
                    $("#area_admi_2").val($('#area_admi').val()).trigger("change");
                },200);
            }

            //업종 동기화
            if(dataTypeNum_sub == 1 || dataTypeNum_sub == 2){
                $("#upjong1_2").val($('#upjong1').val()).trigger("change");

                if($('#upjong2').val() != 0){
                    setTimeout(function(){
                        $("#upjong2_2").val($('#upjong2').val()).trigger("change");
                    },100);
                }
                if($('#upjong3').val() != 0){
                    setTimeout(function(){
                        $("#upjong3_2").val($('#upjong3').val()).trigger("change");
                    },200);
                }
            }

            //기간 동기화
            $("#dateType_2").val($('#dateType').val()).trigger("change");
            setTimeout(function(){
                $("#startDate_2").val($('#startDate').val()).trigger("change");
                $("#endDate_2").val($('#endDate').val()).trigger("change");
            },200);

            //항목 동기화
            if($("#dataType option").index($("#dataType option:selected")) == 0){
                $("#colType1_2").val($('#colType1').val()).trigger("change");
            }else if($("#dataType option").index($("#dataType option:selected")) == 1){
                $("#colType2_2").val($('#colType2').val()).trigger("change");
            }else if($("#dataType option").index($("#dataType option:selected")) == 2){
                $("#colType3_2").val($('#colType3').val()).trigger("change");
            }else if($("#dataType option").index($("#dataType option:selected")) == 3){
                $("#colType4_2").val($('#colType4').val()).trigger("change");
            }else if($("#dataType option").index($("#dataType option:selected")) == 4){
                $("#colType5_2").val($('#colType5').val()).trigger("change");
            }
        })
        //-------------------------------------------- 설정 동기화 항목
    });
    function upjongNmClick(upjongCd){
        console.log('upjongNmClick start2');
        console.log(upjongCd);

        searchType = 0;
        var param = {};
        // if($("#colType"+dataTypeNum+"_2 option:selected").val() == 0){
        //     alert('항목이 선택되지 않았습니다.\n항목을 선택후 검색해주시기 바랍니다.');
        //     return;
        // }
        $('#dataType').val('1').trigger("change");
        $('#colType1').val('saleAmt').trigger("change");

        // param.admGb = 1;
        // param.upjongType = 3;
        // param.dateType = 1;
        // if(!(admiCd == '' || admiCd == 0 || admiCd == null)) param.areaCd = admiCd;
        // if(!(upjongCd == '' || upjongCd == 0 || upjongCd == null)) param.upjongCd = upjongCd;
        // if(!(startDate == '' || startDate == 0 || startDate == null)) param.dateStart = startDate;
        // if(!(endDate == '' || endDate == 0 || endDate == null)) param.dateEnd = endDate;
        //
        // console.log('검색시작 : 선택된 검색데이터는('+dataTypeNum_sub+')');
        // console.log(param);
        // searchBtnNum = 1;
        // main_search(dataTypeNum_sub,param);

    }
    // 전지역 업종 증감률 리스트
    function fn_eatoutDiff(id, response, param){

        eatoutDiffResponse.diff = response.data;

        // console.log(eatoutDiffResponse);
        var template = $('#tmp_eatout_diff').html();
        var templateScript = Handlebars.compile(template);
        var context = eatoutDiffResponse.diff;
        var html = templateScript(context);
        $('#eatout_diff').html(html);

        // $(".ed1").find('.label_m').text($(".selectTit.cty.cty1 > span").text());
        // $(".ed2").find('.label_m').text($(".selectTit.cty.cty2 > span").text());
    }
    // setDateInfo 현재 날짜 및 기준년월 데이터 화면 포기
    function setDateInfo(){
        var returnHtml = ''
        var returnHtml2 = '';
        var date = new Date();
        returnHtml = date.getFullYear()+'. ' + date.getMonth()+'. '+ date.getDate();
        returnHtml2 = '('+date.getFullYear()+'년 ' + (date.getMonth() - 2) + '월 데이터 기준)'
        $('#setDateInfo').text(returnHtml);
        $('#setDateInfo2').text(returnHtml2);
    }


</script>

<script type="text/x-handlebars-template" id="tmp_areaList">
    <ul>
        {{#ifCond gubun '==' 'mega'}}
            <li class="txt_n_sb" data-areaCd="" data-gabeulGb="">시/도</li>
        {{else}}
            <li class="txt_n_sb" data-areaCd="" data-gabeulGb="">시/군/구(선거구)</li>
        {{/ifCond}}
        {{#each this}}
        <li class="txt_n_sb" data-areaCd="{{areaCd}}" data-gabeulGb="{{gabeulGb}}">{{areaNm}} {{gabeulGbNm}}</li>
        {{/each}}
    </ul>
</script>

<script type="text/x-handlebars-template" id="tmp_eatoutThList">
    <ul>
        {{#each this}}
        <li class="txt_n_sb" data-eatout_th="{{eatoutTh}}">{{eatoutTh}}대</li>
        {{/each}}
    </ul>
</script>

<script type="text/x-handlebars-template" id="tmp_eatout_diff">
    <table class="cpTable">
        <colgroup>
            <col width="200px"/>
            <col width=""/>
            <col width=""/>
        </colgroup>
        <tr>
            <th>업종</th>
            <th>전월대비<br>증감율</th>
            <th>최근시점<br>시장규모<br>(만 원/월)</th>
        </tr>
        {{#each this}}
        <tr>
            <td><span onclick="upjongNmClick('{{upjong3Cd}}')" value="{{upjong3Cd}}">{{upjong3Nm}}</span></td>
            <td class="{{checkUpDown clacPer}}">{{checkUpDown calcPer}} {{chgAbs calcPer}} %</td>
            <td>{{addComma saleAmt}}</td>
        </tr>
        {{/each}}
    </table>

</script>
