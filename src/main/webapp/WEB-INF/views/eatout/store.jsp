<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>

<div class="wrap main">
<%--    <%@ include file="/WEB-INF/views/eatout/include/side.jsp" %>--%>
    <%@ include file="/WEB-INF/views/eatout/include/navbar.jsp" %>
    <script>
        $(function(){
            $('.navList li:nth-child(3)').addClass('active');
            $('.navList li:nth-child(3) img').attr({src:'/eatout/assets/eatout/images/icon/tab03_icon_on.svg'})
        });
    </script>
<!--
*공통*
로그인 전 / 후 구분
class = "login_none" 제거 및 추가
-->
    <div class="com_gridInner">
        <div class="container text-center">
            <div class="row flex at_T">
                <div class="col-8 left_box">
                    <div class="row flex left_top_box">
                        <div class="col-8 flex">
                            <div class="type_nmImg">
                                <img src="/eatout/assets/eatout/images/icon/title_icon03.svg" alt=""/>
                            </div>
                            <div>
                                <div class="leftTopInner">
                                    <div class="row flex leftTitleBox">
                                        <div class="col-5" aria-setsize="" id="type_nm"></div>
                                        <div class="col-3" id="admi_nm"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 redText down">
                                            전기 대비
                                            <span id="calcAmt">0% </span>
                                            <span class="img"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row flex">
                                    <div id="setDateInfo"></div>
                                    <div id="setDateInfo2"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 topRightTextBox">
                            <div class="row flex">
                                <div class="col-12">
<%--                                    <p class="txt_n_sb tr_up"><img src="/eatout/assets/eatout/images/icon/up_arrow_red.svg" alt=""/>고가</p>--%>
<%--                                    <div class="flex">--%>
<%--                                        <span class="trt_txt">기간</span>--%>
<%--                                        <span id="maxYyyymm">2023.05</span>--%>
<%--                                        <span class="trt_txt">총매출</span>--%>
<%--                                        <span id="maxVal">0억원</span>--%>
<%--                                    </div>--%>
                                </div>
                                <div class="col-12">
<%--                                    <p class="txt_n_sb tr_dw"><img src="/eatout/assets/eatout/images/icon/down_arrow_mt.svg" alt=""/>저가</p>--%>
<%--                                    <div class="flex">--%>
<%--                                        <span class="trt_txt">기간</span>--%>
<%--                                        <span id="minYyyymm">2023.05</span>--%>
<%--                                        <span class="trt_txt">총매출</span>--%>
<%--                                        <span id="minVal">0억원</span>--%>
<%--                                    </div>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row left_g_box">
                        <!-- 상단 선택지 항목 -->
                        <div class="flex">
                            <div class="col-2 st_box01">
                                <p class="selectText">주제</p>
                                <div class="selectWrap">
                                    <select id="dataType">
                                        <option name="6" value="6">상가 데이터</option>
                                        <%--<option name="2" value="2">상가 임대료</option>
                                        <option name="3" value="3">상가 관리비</option>--%>
                                    </select>
                                </div>
                            </div>
                            <div class="col-2 st_box02">
                                <p class="selectText">지역</p>
                                <div class="selectWrap">
                                    <select id="area_mega">
                                        <option name="0" value="0">시/도</option>
                                    </select>
                                    <select id="area_cty">
                                        <option name="0" value="0">시/군/구</option>
                                    </select>
<%--                                    <select id="area_admi">--%>
<%--                                        <option name="0" value="0">읍면동</option>--%>
<%--                                    </select>--%>
                                </div>
                            </div>
                            <div class="col-2 st_box03">
<%--                                <p class="selectText">업종</p>--%>
<%--                                <div class="selectWrap">--%>
<%--                                    <select id="upjong1">--%>
<%--                                        <option name="0" value="0">외식업</option>--%>
<%--                                    </select>--%>
<%--                                    <select id="upjong2">--%>
<%--                                        <option name="0" value="0">중분류</option>--%>
<%--                                    </select>--%>
<%--                                    <select id="upjong3">--%>
<%--                                        <option name="0" value="0">소분류</option>--%>
<%--                                    </select>--%>
<%--                                </div>--%>
                            </div>
                        </div>
                        <div class="flex ">
                            <div class="col-2 st_box04">
                                <p class="selectText">기간</p>
                                <div class="selectWrap">
                                    <select id="dateType">
                                        <option name="1" value="1">년도 데이터</option>
                                        <option name="2" value="2">반기 데이터</option>
                                        <option name="3" value="3">분기 데이터</option>
<%--                                        <option name="4" value="4">월별 데이터</option>--%>
                                    </select>
                                    <select id="startDate">
                                        <option name="0" value="0">시작일</option>
                                    </select>
                                    <select id="endDate">
                                        <option name="0" value="0">종료일</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-2 bd_r0 st_box05_wi">
                                <p class="selectText">항목</p>
                                <div class="selectWrap st_box05">
                                    <select id="colType6" style="display:block;">
                                        <option value="0">항목</option>
                                        <option value="gnsl">상가 공실율(평균)</option>
                                        <option value="rentPyn">상가 임대료(평균)</option>
                                        <option value="cstPyn">상가 관리비(평균)</option>
                                    </select>
                                    <div class="col-1 st_box06">
                                        <button id="search">조회</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row">
                        <!-- 상단 선택지 항목 -->
                        <div class="col-12 chart_box">
                            <span class="chart_text" id="chart_text1">[단위 : ]</span>
                            <div id="main_chart1" class="chart"></div>
                        </div>
                    </div>
                    <div class="row left_g_box bt0">
                        <!-- 하단 선택지 항목 -->
                        <div class="col-1 clickBtn" id="setting_btn">위 설정조건 불러오기
                            <button ></button>
                        </div>
                        <div class="flex">
                            <div class="col-2 st_box01">
                                <p class="selectText">주제</p>
                                <div class="selectWrap">
                                    <select id="dataType_2">
                                        <option name="6" value="6">상가 데이터</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-2 st_box02">
                                <p class="selectText">지역</p>
                                <div class="selectWrap">
                                    <select id="area_mega_2">
                                        <option name="0" value="0">시/도</option>
                                    </select>
                                    <select id="area_cty_2">
                                        <option name="0" value="0">시/군/구</option>
                                    </select>
<%--                                    <select id="area_admi_2">--%>
<%--                                        <option name="0" value="0">읍면동</option>--%>
<%--                                    </select>--%>
                                </div>
                            </div>
                            <div class="col-2 st_box03">
<%--                                <p class="selectText">업종</p>--%>
<%--                                <div class="selectWrap">--%>
<%--                                    <select id="upjong1_2">--%>
<%--                                        <option name="0" value="0">외식업</option>--%>
<%--                                    </select>--%>
<%--                                    <select id="upjong2_2">--%>
<%--                                        <option name="0" value="0">중분류</option>--%>
<%--                                    </select>--%>
<%--                                    <select id="upjong3_2">--%>
<%--                                        <option name="0" value="0">소분류</option>--%>
<%--                                    </select>--%>
<%--                                </div>--%>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="col-2 st_box04">
                                <p class="selectText">기간</p>
                                <div class="selectWrap">
                                    <select id="dateType_2">
                                        <option name="1" value="1">년도 데이터</option>
                                        <option name="2" value="2">반기 데이터</option>
                                        <option name="3" value="3">분기 데이터</option>
<%--                                        <option name="4" value="4">월별 데이터</option>--%>
<%--                                        <option name="5" value="5">주간 데이터</option>--%>
                                    </select>
                                    <select id="startDate_2">
                                        <option name="0" value="0">시작일</option>
                                    </select>
                                    <select id="endDate_2">
                                        <option name="0" value="0">종료일</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-2 bd_r0 st_box05_wi">
                                <p class="selectText">항목</p>
                                <div class="selectWrap st_box05">
                                    <select id="colType6_2" style="display:block;">
                                        <option value="0">항목</option>
                                        <option value="gnsl">상가 공실율(평균)</option>
                                        <option value="rentPyn">상가 임대료(평균)</option>
                                        <option value="cstPyn">상가 관리비(평균)</option>
                                    </select>
                                    <div class="col-1 st_box06">
                                        <button id="search_2">조회</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 하단 선택지 항목 -->
                    </div>
                    <div class="row">
                        <div class="col-12 chart_box">
                            <span class="chart_text" id="chart_text2">[단위 : ]</span>
                            <div id="main_chart2" class="chart"></div>
                        </div>
                    </div>
                </div>
                <div class="col-4 right_box">
                    <p class="rightTit">
                        <img src="/eatout/assets/eatout/images/icon/chart_icon.svg" alt=""/>
                        지역/분기별 공실률 데이터 증감율
                    </p>
                    <div class="row">
                        <div id="store_diff"></div>
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
    var dateTypeNum = 1;
    var dateTypeNum_sub = 1;
    var admiCd = '';
    var tmpAdmiCd = '';
    var admiCd_sub = '';
    var tmpAdmiCd_sub = '';
    var startDate = '';
    var startDate_sub = '';
    var endDate = '';
    var endDate_sub = '';
    var searchBtnNum = 0;
    var settingCheck = true;

    $(function() {
        var param = {};
        getAjax("getDepositList", "/agile/vacancy/getDepositList",param, fn_depositDiff, fn_error,null,null,true);
        setAreaList(1,null,'vacancy');
        setDateList(1,'vacancy');
        setAreaList_sub(1,null,'vacancy');
        setDateList_sub(1,'vacancy');
        setDateInfo();
        //초기 상단문구 세팅
        $("#type_nm").text($('#dataType option:selected').text())
        $("#admi_nm").text('전국')

        //-------------------------------------------- 상단 선택 항목
        // 주제 선택 이벤트
        $("#dataType").on("change", function(){
            // console.log($('#dataType option:selected').text());
            //selected value
            $("#type_nm").text($('#dataType option:selected').text())
            dataTypeNum = $(this).val();
            // console.log($('#dateType').children('option:last').val())
            // console.log(dataTypeNum);
        });
        // 지역 선택 이벤트
        $("#area_mega").on("change", function(){
            $('#area_cty').children('option:not(:first)').remove();
            $("#admi_nm").text($('#area_mega option:selected').text());
            //selected value
            if($(this).val() != 0){
                setAreaList(2,$(this).val(),'vacancy');
                admiCd = $(this).val();
                tmpAdmiCd = $(this).val().substring(0,2);
            }else{
                reset_select(1);
                admiCd = '';
                admGbNum = 1;
            }
        });
        $("#area_cty").on("change", function(){
            // $('#area_admi').children('option:not(:first)').remove();
            // $("#admi_nm").text($('#area_cty option:selected').text());
            // //selected value
            // setAreaList(3,$(this).val(),'vacancy');
            if($(this).val() != 0){
                admiCd = $(this).val();
                admGbNum = 2;
            }else{
                admiCd = tmpAdmiCd;
                admGbNum = 1;
            }
        });

        //날짜 선택 이벤트
        $("#dateType").on("change", function(){
            //selected value
            reset_select(3);
            setDateList($(this).val(),'vacancy');
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
            if($('#startDate option:selected').val() == 0 || $('#endDate option:selected').val() == 0){
                alert('검색 일자를 선택해주세요.');
                return;
            }
            param.admGb = admGbNum;
            param.dateType = dateTypeNum;
            if(!(admiCd == '' || admiCd == 0 || admiCd == null)) param.areaCd = admiCd;
            if(!(startDate == '' || startDate == 0 || startDate == null)) param.dateStart = startDate;
            if(!(endDate == '' || endDate == 0 || endDate == null)) param.dateEnd = endDate;
            dataTypeNum = $("#dataType").val();
            // console.log('검색시작 : 선택된 검색데이터는('+dataTypeNum+')');
            // console.log(param);
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
                change_colType($(this).val(),false);
            }
        });
        // 지역 선택 이벤트
        $("#area_mega_2").on("change", function(){
            $('#area_cty_2').children('option:not(:first)').remove();
            //selected value
            if($(this).val() != 0){
                setAreaList_sub(2,$(this).val(),'vacancy');
                admiCd_sub = $(this).val();
                tmpAdmiCd_sub = $(this).val().substring(0,2);
            }else{
                reset_select(1);
                admiCd_sub = '';
                admGbNum_sub = 1;
            }
        });
        $("#area_cty_2").on("change", function(){
            // $('#area_admi_2').children('option:not(:first)').remove();
            // console.log('#area_cty_2 : '+$(this).val())
            // //selected value
            // setAreaList_sub(3,$(this).val());
            if($(this).val() != 0){
                admiCd_sub = $(this).val();
                admGbNum_sub = 2;
            }else{
                admiCd_sub = tmpAdmiCd_sub;
                admGbNum_sub = 1;
            }
        });


        //날짜 선택 이벤트
        $("#dateType_2").on("change", function(){
            //selected value
            setDateList_sub($(this).val(),'vacancy');
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
            if($('#startDate_2 option:selected').val() == 0 || $('#endDate_2 option:selected').val() == 0){
                alert('검색 일자를 선택해주세요.');
                return;
            }

            param.admGb = admGbNum_sub;
            param.dateType = dateTypeNum_sub;
            if(!(admiCd_sub == '' || admiCd_sub == 0 || admiCd_sub == null)) param.areaCd = admiCd_sub;
            if(!(startDate_sub == '' || startDate_sub == 0 || startDate_sub == null)) param.dateStart = startDate_sub;
            if(!(endDate_sub == '' || endDate_sub == 0 || endDate_sub == null)) param.dateEnd = endDate_sub;

            console.log('검색시작 : 선택된 검색데이터는('+dataTypeNum_sub+')');
            // console.log(param);
            searchBtnNum = 2;
            dataTypeNum_sub = $("#dataType_2").val()
            // console.log(dataTypeNum_sub);
            main_search(dataTypeNum_sub,param);
        });
        //-------------------------------------------- 하단 선택 항목


        //-------------------------------------------- 설정 동기화 항목
        $('#setting_btn').on("click",function(){
            loadingBar2(true);

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


            console.log($('#dateType').val() +" : "+$("#dateType_2").val());
            console.log($('#startDate').val() +" : "+$("#startDate_2").val());
            console.log($('#endDate').val() +" : "+$("#endDate_2").val());
            //기간 동기화
            $("#dateType_2").val($('#dateType').val()).trigger("change");
            setTimeout(function(){
                $("#startDate_2").val($('#startDate').val()).trigger("change");
                $("#endDate_2").val($('#endDate').val()).trigger("change");
            },200);

            //항목 동기화
            if($("#dataType option").index($("#dataType option:selected")) == 0){
                $("#colType6_2").val($('#colType6').val()).trigger("change");
            }
            setTimeout(function(){
                loadingBar2(false);
            },3500);
        })
        //-------------------------------------------- 설정 동기화 항목
    });

    // 전지역 업종 증감률 리스트
    function fn_depositDiff(id, response, param){

        eatoutDiffResponse.diff = response.data;

        // console.log(eatoutDiffResponse);
        var template = $('#tmp_store_diff').html();
        var templateScript = Handlebars.compile(template);
        var context = eatoutDiffResponse.diff;
        var html = templateScript(context);
        $('#store_diff').html(html);

        // $(".ed1").find('.label_m').text($(".selectTit.cty.cty1 > span").text());
        // $(".ed2").find('.label_m').text($(".selectTit.cty.cty2 > span").text());

        $('.cpTable tr').click(function(){
            $('.cpTable tr').removeClass('active');
            $(this).addClass('active');
        });
    }
    // setDateInfo 현재 날짜 및 기준년월 데이터 화면 포기
    function setDateInfo(){
        var returnHtml = ''
        var returnHtml2 = '';
        var date = new Date();
        returnHtml = date.getFullYear()+'. ' + date.getMonth()+'. '+ date.getDate();
        returnHtml2 = date.getFullYear()+'년 ' + (date.getMonth() - 2) + '월 데이터 기준'
        $('#setDateInfo').text(returnHtml);
        $('#setDateInfo2').text(returnHtml2);
    }
    //
    function admiClick(ctyCd){
        console.log(ctyCd.substring(0,2));
        $("#area_mega").val(ctyCd.substring(0,2)).trigger("change");
        setTimeout(function () {
            $("#area_cty").val(ctyCd).trigger("change");
        },400);
    }
    $('#colType6').change(function(){
        console.log($(this).val())
        if($(this).val() == 'gnsl') $('#chart_text1').text('[단위 : %]');
        if($(this).val() == 'rentPyn') $('#chart_text1').text('[단위 : 천 원/평]');
        if($(this).val() == 'cstPyn') $('#chart_text1').text('[단위 : 천 원/평]');
    })
    $('#colType6_2').change(function(){
        console.log($(this).val())
        if($(this).val() == 'gnsl') {
            if($(this).val() == 'gnsl') $('#chart_text2').text('[단위 : %]');
            if($(this).val() == 'rentPyn') $('#chart_text2').text('[단위 : 천 원/평]');
            if($(this).val() == 'cstPyn') $('#chart_text2').text('[단위 : 천 원/평]');
        }
    })

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

<script type="text/x-handlebars-template" id="tmp_store_diff">
    <table class="cpTable">
        <colgroup>
            <col width="30%"/>
            <col width="35%"/>
            <col width="35%"/>
        </colgroup>
        <tr>
            <th>행정동</th>
            <th>전월대비<br>증감율</th>
            <th>평균 보증금<br><span>천 원/월</span></th>
        </tr>
        {{#each this}}
        <tr>
            <td><span onclick="admiClick('{{ctyCd}}')" value="{{ctyCd}}">{{ctyNm}}</span></td>
            <td class="{{checkUpDown per}}">{{chgAbs per}} %</td>
            <td>{{addComma thisDeposit}}</td>
        </tr>
        {{/each}}
    </table>
</script>
