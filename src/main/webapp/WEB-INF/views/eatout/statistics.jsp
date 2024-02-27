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
            $('.navList li:first-child').addClass('active');
            $('.navList li:first-child img').attr({src:'/eatout/assets/eatout/images/icon/tab01_icon_on.svg'})
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
                                        <div class="col-4" id="upjong_nm"></div>
                                    </div>
                                    <div class="row">
                                        <div id="calcView">
                                            <div class="col-12 redText">
                                                <span id="calcDateType"></span>대비
                                                <span id="calcAmt">0.0% </span>
                                                <span class="img"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row flex">
                                    <div id="setDateInfo"></div>
                                    <div id="setDateInfo2"></div>
                                </div>
                                <p id="setDateInfo3" class="setDate_txt0227"></p>
                            </div>
                        </div>
                        <div class="col-4 topRightTextBox reTop_com1120">
                            <div class="row reTop1120">
                                <div class="col-12">
                                    <p class="txt_n_sb tr_up"><img src="/eatout/assets/eatout/images/icon/up_arrow_red.svg" alt=""/>고가</p>
                                    <div class="flex">
                                        <div class="re_br1120">
                                            <span class="trt_txt">기간</span>
                                            <span id="maxYyyymm"></span>
                                        </div>
                                        <div class="re_br1120">
                                            <span class="trt_txt" id="upText">총매출</span>
                                            <p class="line1120_red"><span id="maxVal">0</span><span id="maxText">만원</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <p class="txt_n_sb tr_dw"><img src="/eatout/assets/eatout/images/icon/down_arrow_mt.svg" alt=""/>저가</p>
                                    <div class="flex">
                                        <div class="re_br1120">
                                            <span class="trt_txt">기간</span>
                                            <span id="minYyyymm"></span>
                                        </div>
                                        <div class="re_br1120">
                                            <span class="trt_txt" id="downText">총매출</span>
                                            <p class="line1120_blue"><span id="minVal">0</span><span id="minText">만원</span></p>
                                        </div>
                                    </div>
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
                                        <option name="1" value="1">외식 데이터(카드)</option>
                                        <option name="2" value="2">배달 데이터(카드)</option>
                                        <option name="3" value="3">메뉴 데이터(POS)</option>
                                        <option name="4" value="4">생활 인구 데이터(통신)</option>
                                        <option name="5" value="5">주거 인구 데이터(공공)</option>
                                        <option name="5" value="7">프렌차이즈 데이터</option>
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
                                    <select id="area_admi">
                                        <option name="0" value="0">읍면동</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-2 st_box03">
                                <p class="selectText" id="box3Text">업종</p>
                                <div class="selectWrap" id="upjong">
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
                                <div class="selectWrap" id="menu" style="display: none">
                                    <select id="menu1">
                                        <option name="0" value="0">대분류</option>
                                    </select>
                                    <select id="menu2">
                                        <option name="0" value="0">중분류</option>
                                    </select>
                                    <select id="menu3">
                                        <option name="0" value="0">소분류</option>
                                    </select>
                                </div>
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
                            </div>
                            <div class="col-2 bd_r0 st_box05_wi">
                                <p class="selectText">항목</p>
                                <div class="selectWrap st_box05">
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
                                        <option value="0">항목</option>
                                        <option value="totSaleAmt">총 매출</option>
                                        <option value="storeCnt">표본점포 수</option>
<%--                                        <option value="saleQty">판매건수</option>--%>
<%--                                        <option value="saleAmt">판매단가</option>--%>
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
                                    <select id="colType7" style="display:none;">
                                        <option value="0">항목</option>
                                        <option value="franPer">프렌차이즈 점유율</option>
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
                            <span class="chart_text" id="chartText1">[단위 : ]</span>
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
                                        <option name="1" value="1">외식 데이터(카드)</option>
                                        <option name="2" value="2">배달 데이터(카드)</option>
                                        <option name="3" value="3">메뉴 데이터(POS)</option>
                                        <option name="4" value="4">생활 인구 데이터(통신)</option>
                                        <option name="5" value="5">주거 인구 데이터(공공)</option>
                                        <option name="5" value="7">프렌차이즈 데이터</option>
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
                                    <select id="area_admi_2">
                                        <option name="0" value="0">읍면동</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-2 st_box03">
                                <p class="selectText" id="box3Text_2">업종</p>
                                <div class="selectWrap" id="upjong_2">
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
                                <div class="selectWrap" id="menu_2" style="display: none">
                                    <select id="menu1_2">
                                        <option name="0" value="0">대분류</option>
                                    </select>
                                    <select id="menu2_2">
                                        <option name="0" value="0">중분류</option>
                                    </select>
                                    <select id="menu3_2">
                                        <option name="0" value="0">소분류</option>
                                    </select>
                                </div>
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
                            </div>
                            <div class="col-2 bd_r0 st_box05_wi">
                                <p class="selectText">항목</p>
                                <div class="selectWrap st_box05">
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
                                        <option value="0">항목</option>
                                        <option value="totSaleAmt">총 매출</option>
                                        <option value="storeCnt">표본점포 수</option>
<%--                                        <option value="saleQty">판매건수</option>--%>
<%--                                        <option value="saleAmt">판매단가</option>--%>
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
                                    <select id="colType7_2" style="display:none;">
                                        <option value="0">항목</option>
                                        <option value="franPer">프렌차이즈 점유율</option>
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
                            <span class="chart_text" id="chartText2">[단위 : ]</span>
                            <div id="main_chart2" class="chart"></div>
                        </div>
                    </div>
                </div>
                <div class="col-4 right_box">
                    <p class="rightTit">
                        <img src="/eatout/assets/eatout/images/icon/chart_icon.svg" alt=""/>
                        업종별 전월대비 증감 및 시장규모
                    </p>
                    <div class="row">
                        <div id="eatout_diff"></div>
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
    var upjongCd = '';
    var tmpUpjongCd = '';
    var upjongCd_sub = '';
    var tmpUpjongCd_sub = '';
    var upjongGbNum = 1;
    var upjongGbNum_sub = 1;
    var menuCd = '';
    var tmpMenuCd = '';
    var menuCd_sub = '';
    var tmpMenuCd_sub = '';
    var menuGbNum = 1;
    var menuGbNum_sub = 1;
    var startDate = 0;
    var startDate_sub = 0;
    var endDate = 0;
    var endDate_sub = 0;
    var searchBtnNum = 0;
    var settingCheck = true;
    var tmpUpText = '';
    var tmpDownText = '';
    var tmpPosType = '';
    var tmpPosType_sub = '';


    $(function() {
        var param = {};
        getAjax("getMainInfo", "/agile/main/getMainInfo",param, fn_mainInfo, fn_error,null,null,true);
        getAjax("getUpjongChgRate", "/agile/statistics/getUpjongChgRate",param, fn_eatoutDiff, fn_error,null,null,true);
        setAreaList(1);
        setUpjongList(2);
        setDateList(1);
        setAreaList_sub(1);
        setUpjongList_sub(2);
        setDateList_sub(1);
        setDateInfo();
        $("#calcView").hide();
        $(".row .reTop1120").hide();
        $("#upjong1").attr('disabled',true);
        $("#upjong1_2").attr('disabled',true);
        $('#dateType').children('option').show();
        $('#dateType').children('option:last').hide();

        $('#dateType_2').children('option').show();
        $('#dateType_2').children('option:last').hide();

        //초기 상단문구 세팅
        $("#type_nm").text($('#dataType option:selected').text())
        $("#admi_nm").text('전국')
        $("#upjong_nm").text($('#upjong1 option:selected').text())

        //-------------------------------------------- 상단 선택 항목
        // 주제 선택 이벤트
        $("#dataType").on("change", function(){
            // $('#dateType').children('option:last').hide();
            //selected value
            $('#calcDateType').text('')
            $('#calcAmt').text('0%')
            // console.log($('#calcAmt').parent().class)
            // $('#calcAmt').parent().addClass(common.upAndDownClass(0));
            $('#calcAmt').parent().removeClass($('#calcAmt').parent().attr('class').split(' ')[2]);
            $("#type_nm").text($('#dataType option:selected').text());
            dataTypeNum = $(this).val();
            selectReset();
            if(dataTypeNum == 1){
                console.log('외식 데이터 선택');
                $('#admi_nm').text('전국');
                $('#upjong_nm').text('');
                $('#setDateInfo3').text('외식데이터 : 신용카드사');
                setAreaList(1);
                setUpjongList(2);
                setDateList(1);
                reset_select(0);
                $("#calcView").hide();
                $(".row .reTop1120").hide();
                // if($('#dateType').children('option:last').css('display') == 'block'){
                $('#dateType').children('option').show();
                $('#dateType').children('option:last').hide();
                // }
                $("#box3Text").text("업종");
                $("#upjong").css('display','block')
                $("#menu").css('display','none')
                $("#area_admi").attr('disabled',false);
                $("#upjong2").attr('disabled',false);
                $("#upjong3").attr('disabled',false);
                change_colType($(this).val(),true);
                $('.type_nmImg img').attr({src:'/eatout/assets/eatout/images/icon/title_icon03.svg'});

            }else if(dataTypeNum == 2){
                console.log('배달 데이터 선택');
                $('#admi_nm').text('전국');
                $('#upjong_nm').text('외식업');
                $('#setDateInfo3').text('배달데이터 : 신용카드사');
                setAreaList(1);
                setUpjongList(2);
                setDateList(1);
                // if($('#dateType').children('option:last').css('display') == 'none'){
                $('#dateType').children('option').show();
                $('#dateType').children('option:last').hide();
                // }
                reset_select(0);
                $("#calcView").hide();
                $(".row .reTop1120").hide();
                $("#box3Text").text("업종");
                $("#upjong").css('display','block')
                $("#menu").css('display','none')
                $("#area_admi").attr('disabled',true);
                $("#upjong2").attr('disabled',false);
                $("#upjong3").attr('disabled',false);
                change_colType($(this).val(),true);
                $('.type_nmImg img').attr({src:'/eatout/assets/eatout/images/icon/title_icon01.svg'});

            }else if(dataTypeNum == 3){
                console.log('메뉴 데이터 선택');
                $('#admi_nm').text('전국');
                $('#upjong_nm').text('');
                $('#setDateInfo3').text('POS데이터 : 나이스지니데이타');
                setAreaList(1);
                setMenuList(1);
                setDateList(1);
                reset_select(0);
                $("#calcView").hide();
                $(".row .reTop1120").hide();
                // if($('#dataType option:selected').css('display') == 'block'){
                $('#dateType').children('option').show();
                // }
                $("#box3Text").text("메뉴");
                $("#upjong").css('display','none')
                $("#menu").css('display','block')
                $("#area_admi").attr('disabled',false);
                $("#upjong2").attr('disabled',false);
                $("#upjong3").attr('disabled',false);
                change_colType($(this).val(),true);
                $('.type_nmImg img').attr({src:'/eatout/assets/eatout/images/icon/title_icon04.svg'});
                // $('#dateType').append('<option name="5" value="5">주간 데이터</option>');
            }else if(dataTypeNum == 4){
                console.log('생활 인구 데이터 선택');
                $('#setDateInfo3').text('생활인구데이터(통신) : 통신사');
                setAreaList(1);
                setUpjongList(2);
                setDateList(1);
                // if($('#dateType').children('option:last').css('display') == 'none'){
                    $('#dateType').children('option').show();
                    $('#dateType').children('option:last').hide();
                // }
                reset_select(0);
                $("#calcView").hide();
                $(".row .reTop1120").hide();
                $('#admi_nm').text('전국');
                $('#upjong_nm').text('');
                $("#box3Text").text("업종");
                $("#upjong").css('display','block')
                $("#menu").css('display','none')
                $("#area_admi").attr('disabled',false);
                $("#upjong2").attr('disabled',true);
                $("#upjong3").attr('disabled',true);
                change_colType($(this).val(),true);
                $('.type_nmImg img').attr({src:'/eatout/assets/eatout/images/icon/title_icon02.svg'});

            }else if(dataTypeNum == 5){
                console.log('주거 인구 데이터 선택');
                $('#setDateInfo3').text('생활인구데이터(공공) : 행정안전부');
                setAreaList(1);
                setUpjongList(2);
                setDateList(1);
                // if($('#dateType').children('option:not(:first)').css('display') == 'block'){
                    $('#dateType').children('option:not(:first)').hide();
                // }
                reset_select(0);
                $("#calcView").hide();
                $(".row .reTop1120").hide();
                $('#admi_nm').text('전국');
                $('#upjong_nm').text('');
                $("#box3Text").text("업종");
                $("#upjong").css('display','block')
                $("#menu").css('display','none')
                $("#area_admi").attr('disabled',false);
                $("#upjong2").attr('disabled',true);
                $("#upjong3").attr('disabled',true);
                change_colType($(this).val(),true);
                $('.type_nmImg img').attr({src:'/eatout/assets/eatout/images/icon/title_icon05.svg'});

            }else if(dataTypeNum == 7){
                console.log('프렌차이즈 데이터 선택');
                $('#setDateInfo3').text('프렌차이즈 데이터 : 나이스지니데이타');
                setAreaList(1);
                setUpjongList(2);
                setDateList(1);
                // if($('#dateType').children('option:not(:first)').css('display') == 'block'){
                $('#dateType').children('option').show();
                $('#dateType').children('option:last').hide();
                $('#dateType').children('option:eq(3)').hide();
                // }
                reset_select(0);
                $("#calcView").hide();
                $(".row .reTop1120").hide();
                $('#admi_nm').text('전국');
                $('#upjong_nm').text('');
                $("#box3Text").text("업종");
                $("#upjong").css('display','block')
                $("#menu").css('display','none')
                change_colType($(this).val(),true);
                $('.type_nmImg img').attr({src:'/eatout/assets/eatout/images/icon/title_icon05.svg'});
            }
        });

        function selectReset(){
            $('#dateType option:eq(0)').prop('selected',true);
            $('#area_mega option:eq(0)').prop('selected',true);
            $('#area_cty').children('option:not(:first)').remove();
            $('#area_admi').children('option:not(:first)').remove();

            $('#upjong2 option:eq(0)').prop('selected',true);
            $('#upjong3').children('option:not(:first)').remove();
        }
        function selectReset_sub(){
            $('#dateType_2 option:eq(0)').prop('selected',true);
            $('#area_mega_2 option:eq(0)').prop('selected',true);
            $('#area_cty_2').children('option:not(:first)').remove();
            $('#area_admi_2').children('option:not(:first)').remove();

            $('#upjong2_2 option:eq(0)').prop('selected',true);
            $('#upjong3_2').children('option:not(:first)').remove();
        }
        // 지역 선택 이벤트
        $("#area_mega").on("change", function(){
            $('#area_cty').children('option:not(:first)').remove();
            $('#area_admi').children('option:not(:first)').remove();
            $("#admi_nm").text($('#area_mega option:selected').text());
            //selected value
            if($(this).val() != 0){
                setAreaList(2,$(this).val());
                admiCd = $(this).val();
                admGbNum = 1;
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
            if($(this).val() != 0){
                setAreaList(3,$(this).val());
                admiCd = $(this).val();
                tmpAdmiCd = $(this).val().substring(0,2);
                admGbNum = 2;
            }else{
                reset_select(1,1);
                if(tmpAdmiCd.length == 4){
                    tmpAdmiCd = tmpAdmiCd.substring(0,2);
                }
                setAreaList(2,tmpAdmiCd);
                admiCd = tmpAdmiCd;
                admGbNum = 2;
            }
        });
        $("#area_admi").on("change", function(){
            $("#admi_nm").text($('#area_admi option:selected').text());
            //selected value
            if($(this).val() != 0){
                admiCd = $(this).val();
                tmpAdmiCd = $(this).val().substring(0,4);
                admGbNum = 3;
            }else{
                reset_select(1,2);
                setAreaList(3,tmpAdmiCd);
                admiCd = tmpAdmiCd;
                admGbNum = 2;
            }
        });

        //업종 선택 이벤트
        $("#upjong2").on("change", function(){
            $("#upjong_nm").text($('#upjong2 option:selected').text())
            $('#upjong3').children('option:not(:first)').remove();
            //selected value
            if($(this).val() != 0){
                setUpjongList(3,$(this).val());
                upjongCd = $(this).val();
                tmpUpjongCd = $(this).val().substring(0,3);
                upjongGbNum = 2;
            }else{
                reset_select(2);
                setUpjongList(2);
                upjongGbNum = 1;
            }
        });
        $("#upjong3").on("change", function(){
            $("#upjong_nm").text($('#upjong3 option:selected').text())
            // 마지막 업종 선택시 데이터 출력
            if($(this).val() != 0){
                upjongCd = $(this).val();
                tmpUpjongCd = $(this).val().substring(0,3);
                upjongGbNum = 3;
            }else{
                reset_select(2);
                setUpjongList(3,tmpUpjongCd);
                upjongCd = tmpUpjongCd;
                upjongGbNum = 2;
            }
        });

        //메뉴 선택 이벤트
        $("#menu1").on("change", function(){
            $("#upjong_nm").text($('#menu1 option:selected').text())
            $('#menu2').children('option:not(:first)').remove();
            $('#menu3').children('option:not(:first)').remove();
            var area_cd = '';
            var sdate = '';
            var edate = '';
            var tmpdateType = '';
            //selected value
            if($(this).val() != 0){
                //지역 선택시
                if($('#area_mega option:selected').val() == 0 && $('#area_cty option:selected').val() == 0 && $('#area_admi option:selected').val() == 0  ){
                    //처리안함
                }else{
                    if($('#area_mega option:selected').val() != 0){
                        area_cd = $('#area_mega option:selected').val();
                    }
                    if($('#area_cty option:selected').val() != 0){
                        area_cd = $('#area_cty option:selected').val();
                    }
                    if($('#area_admi option:selected').val() != 0){
                        area_cd = $('#area_admi option:selected').val();
                    }
                }
                //
                if($('#startDate option:selected').val() == 0 && $('#endDate option:selected').val() == 0){
                    //처리안함
                }else{
                    tmpdateType = $('#dateType option:selected').val()
                    if($('#startDate option:selected').val() != 0){
                        sdate = $('#startDate option:selected').val();
                    }
                    if($('#endDate option:selected').val() != 0){
                        edate = $('#endDate option:selected').val();
                    }
                }
                setMenuList(2,$(this).val(),area_cd,sdate,edate,tmpdateType);
                menuCd = $(this).val();
                tmpMenuCd = $(this).val().substring(0,2);
                menuGbNum = 1;
            }else{
                reset_select(4);
                menuCd = $(this).val();
            }
        });
        $("#menu2").on("change", function(){
            $("#upjong_nm").text($('#menu2 option:selected').text())
            $('#menu3').children('option:not(:first)').remove();

            var area_cd = '';
            var sdate = '';
            var edate = '';
            var tmpdateType = '';
            //selected value
            if($(this).val() != 0){
                //지역 선택시
                if($('#area_mega option:selected').val() == 0 && $('#area_cty option:selected').val() == 0 && $('#area_admi option:selected').val() == 0  ){
                    //처리안함
                }else{
                    if($('#area_mega option:selected').val() != 0){
                        area_cd = $('#area_mega option:selected').val();
                    }
                    if($('#area_cty option:selected').val() != 0){
                        area_cd = $('#area_cty option:selected').val();
                    }
                    if($('#area_admi option:selected').val() != 0){
                        area_cd = $('#area_admi option:selected').val();
                    }
                }
                //
                if($('#startDate option:selected').val() == 0 && $('#endDate option:selected').val() == 0){
                    //처리안함
                }else{
                    tmpdateType = $('#dateType option:selected').val()
                    if($('#startDate option:selected').val() != 0){
                        sdate = $('#startDate option:selected').val();
                    }
                    if($('#endDate option:selected').val() != 0){
                        edate = $('#endDate option:selected').val();
                    }
                }
                setMenuList(3,$(this).val(),area_cd,sdate,edate,tmpdateType);
                menuCd = $(this).val();
                tmpMenuCd = $(this).val().substring(0,1);
                menuGbNum = 2;
            }else{
                reset_select(4,1);
                if(tmpMenuCd.length == 3){
                    tmpMenuCd = tmpMenuCd.substring(0,1);
                }
                setMenuList(2,tmpMenuCd);
                menuCd = tmpMenuCd;
                menuGbNum = 1;
            }

            // //selected value
            // if($(this).val() != 0){
            //     setMenuList(3,$(this).val());
            //     menuCd = $(this).val();
            //     tmpMenuCd = $(this).val().substring(0,1);
            //     menuGbNum = 2;
            // }else{
            //     reset_select(4,1);
            //     if(tmpMenuCd.length == 3){
            //         tmpMenuCd = tmpMenuCd.substring(0,1);
            //     }
            //     setMenuList(2,tmpMenuCd);
            //     menuCd = tmpMenuCd;
            //     menuGbNum = 1;
            // }
        });
        $("#menu3").on("change", function(){
            $("#upjong_nm").text($('#menu3 option:selected').text())
            // 마지막 업종 선택시 데이터 출력
            if($(this).val() != 0){
                menuCd = $(this).val();
                tmpMenuCd = $(this).val().substring(0,3);
                upjongGbNum = 3;
            }else{
                reset_select(4,2);
                setMenuList(3,tmpMenuCd);
                menuCd = tmpMenuCd;
                menuGbNum = 2;
            }
        });

        //날짜 선택 이벤트
        $("#dateType").on("change", function(){
            //selected value
            searchType = 0;
            reset_select(3);
            setDateList($(this).val());
            dateTypeNum = $(this).val();
        });
        $("#startDate").on("change", function(){
            //selected value
            // console.log("======================startDate start======================");
            if(endDate != 0){
                if($(this).val() > endDate ){
                    alert("시작일을 종료일 이전으로 선택해주시기 바랍니다.");
                    $("#startDate option:eq(0)").prop("selected", true); //첫번째 option 선택
                    return;
                }
            }
            startDate = $(this).val();
            // console.log("======================startDate end======================");
        });
        $("#endDate").on("change", function(){
            //selected value
            // console.log("======================startDate start======================");
            if(startDate != 0){
                if($(this).val() < startDate){
                    alert("종료일을 시작일 이후으로 선택해주시기 바랍니다.");
                    $("#endDate option:eq(0)").prop("selected", true); //첫번째 option 선택
                    return;
                }
            }
            endDate = $(this).val();
            // console.log("======================startDate end======================");
        });
        $("#colType3").on("change",function(){
            tmpPosType = $(this).val();
            console.log(tmpPosType);
        })
        $("#search").on("click", function(){
            searchType = 0;
            var param = {};

            // if(dataTypeNum == 3) {
            //     if($("#menu option:selected").val() == 0){
            //         alert('메뉴가 선택되지 않았습니다.\n메뉴를 선택후 검색해주시기 바랍니다.');
            //         return;
            //     }
            // }else if(dataTypeNum == 1 || dataTypeNum == 2){
            //     // if($("#upjong2 option:selected").val() == 0){
            //     //     alert('업종이 선택되지 않았습니다.\n업종을 선택후 검색해주시기 바랍니다.');
            //     //     return;
            //     // }
            // }else{
            //     console.log('메뉴 업종을 선택하지 않았습니다.')
            // }
            if($("#startDate option:selected").val() == 0 || $("#startDate option:selected").val() == 0){
                alert('검색일자가 제대로 선택되지 않았습니다.\n검색일자를 선택후 검색해주시기 바랍니다.');
                return;
            }
            if($("#colType"+dataTypeNum+" option:selected").val() == 0){
                alert('항목이 선택되지 않았습니다.\n항목을 선택후 검색해주시기 바랍니다.');
                return;
            }
            param.admGb = admGbNum;
            param.upjongType = upjongGbNum;
            param.menuType = menuGbNum;
            param.dateType = dateTypeNum;
            param.posType = tmpPosType;
            if(!(admiCd == '' || admiCd == 0 || admiCd == null)) param.areaCd = admiCd;
            if(!(upjongCd == '' || upjongCd == 0 || upjongCd == null)) param.upjongCd = upjongCd;
            if(!(menuCd == '' || menuCd == 0 || menuCd == null)) param.menuCd = menuCd;
            if(!(startDate == '' || startDate == 0 || startDate == null)) param.dateStart = startDate;
            if(!(endDate == '' || endDate == 0 || endDate == null)) param.dateEnd = endDate;

            searchBtnNum = 1;

            main_search(dataTypeNum,param);
        });
        //-------------------------------------------- 상단 선택 항목

        //-------------------------------------------- 하단 선택 항목
        // 주제 선택 이벤트
        $("#dataType_2").on("change", function(){
            //selected value
            dataTypeNum_sub = $(this).val();
            selectReset_sub();
            if(dataTypeNum_sub == 1){
                console.log('외식 데이터 선택');
                setDateList_sub(1);
                setAreaList_sub(1);
                setUpjongList_sub(2);
                reset_select(0);
                if($('#dateType_2').children('option:last').css('display') == 'none'){
                    $('#dateType_2').children('option:not(:last)').show();
                }
                $("#box3Text").text("업종");
                $("#upjong_2").css('display','block');
                $("#menu_2").css('display','none');
                $("#area_admi_2").attr('disabled',false);
                $("#upjong2_2").attr('disabled',false);
                $("#upjong3_2").attr('disabled',false);
                change_colType($(this).val(),false);
            }else if(dataTypeNum_sub == 2){
                console.log('배달 데이터 선택');
                setDateList_sub(1);
                setAreaList_sub(1);
                setUpjongList_sub(2);
                reset_select(0);
                if($('#dateType_2').children('option:last').css('display') == 'none'){
                    $('#dateType_2').children('option:not(:last)').show();
                }
                $("#box3Text").text("업종");
                $("#upjong_2").css('display','block');
                $("#menu_2").css('display','none');
                $("#area_admi_2").attr('disabled',true);
                $("#upjong2_2").attr('disabled',false);
                $("#upjong3_2").attr('disabled',false);
                change_colType($(this).val(),false);
            }else if(dataTypeNum_sub == 3){
                console.log('메뉴 데이터 선택');
                setDateList_sub(1);
                setAreaList_sub(1);
                setMenuList_sub(1);
                reset_select(0);
                if($('#dateType_2 option:selected').css('display') == 'block'){
                    $('#dateType_2').children('option:last').show();
                }
                $("#box3Text").text("메뉴");
                $("#upjong_2").css('display','none')
                $("#menu_2").css('display','block')
                $("#area_admi_2").attr('disabled',false);
                $("#upjong2_2").attr('disabled',false);
                $("#upjong3_2").attr('disabled',false);
                change_colType($(this).val(),false);
            }else if(dataTypeNum_sub == 4){
                console.log('생활 인구 데이터 선택');
                setDateList_sub(1);
                setAreaList_sub(1);
                setUpjongList_sub(2);
                reset_select(0);
                if($('#dateType_2').children('option:last').css('display') == 'none'){
                    $('#dateType_2').children('option:not(:last)').show();
                }
                $("#box3Text").text("업종");
                $("#upjong_2").css('display','block');
                $("#menu_2").css('display','none');
                $("#area_admi_2").attr('disabled',false);
                $("#upjong2_2").attr('disabled',true);
                $("#upjong3_2").attr('disabled',true);
                change_colType($(this).val(),false);
            }else if(dataTypeNum_sub == 5){
                console.log('주거 인구 데이터 선택');
                setDateList_sub(1);
                setAreaList_sub(1);
                setUpjongList_sub(2);
                reset_select(0);
                if($('#dateType_2').children('option:not(:first)').css('display') == 'block'){
                    $('#dateType_2').children('option:not(:first)').hide();
                }
                $("#box3Text").text("업종");
                $("#upjong_2").css('display','block');
                $("#menu_2").css('display','none');
                $("#area_admi_2").attr('disabled',false);
                $("#upjong2_2").attr('disabled',true);
                $("#upjong3_2").attr('disabled',true);
                change_colType($(this).val(),false);

            }else if(dataTypeNum_sub == 7){
                console.log('프렌차이즈 데이터 선택');
                setAreaList_sub(1);
                setUpjongList_sub(2);
                setDateList_sub(1);
                reset_select(0);
                // if($('#dateType').children('option:not(:first)').css('display') == 'block'){
                $('#dateType_2').children('option').show();
                $('#dateType_2').children('option:last').hide();
                $('#dateType_2').children('option:eq(3)').hide();
                // }
                $("#box3Text").text("업종");
                $("#upjong_2").css('display','block');
                $("#menu_2").css('display','none');
                change_colType($(this).val(),false);
            }
        });
        // 지역 선택 이벤트
        $("#area_mega_2").on("change", function(){
            $('#area_cty_2').children('option:not(:first)').remove();
            $('#area_admi_2').children('option:not(:first)').remove();
            //selected value
            if($(this).val() != 0){
                setAreaList_sub(2,$(this).val());
                admiCd_sub = $(this).val();
                admGbNum_sub = 1;
            }else{
                reset_select(1);
                admiCd_sub = '';
                admGbNum_sub = 1;
            }
        });
        $("#area_cty_2").on("change", function(){
            $('#area_admi_2').children('option:not(:first)').remove();
            //selected value
            if($(this).val() != 0){
                setAreaList_sub(3,$(this).val());
                admiCd_sub = $(this).val();
                tmpAdmiCd_sub = $(this).val().substring(0,2);
                admGbNum_sub = 2;
            }else{
                reset_select(1,1);
                if(tmpAdmiCd_sub.length == 4){
                    tmpAdmiCd_sub = tmpAdmiCd_sub.substring(0,2);
                }
                setAreaList_sub(1,tmpAdmiCd_sub);
                admiCd_sub = tmpAdmiCd_sub;
                admGbNum_sub = 2;
            }
        });
        $("#area_admi_2").on("change", function(){
            //selected value
            if($(this).val() != 0){
                admiCd_sub = $(this).val();
                tmpAdmiCd_sub = $(this).val().substring(0,4);
                admGbNum_sub = 3;
            }else{
                reset_select(1,2);
                setAreaList_sub(2,tmpAdmiCd_sub);
                admiCd_sub = tmpAdmiCd_sub;
                admGbNum_sub = 2;
            }
        });

        //업종 선택 이벤트
        $("#upjong2_2").on("change", function(){
            $('#upjong3_2').children('option:not(:first)').remove();
            //selected value
            //selected value
            if($(this).val() != 0){
                setUpjongList_sub(3,$(this).val());
                upjongCd_sub = $(this).val();
                tmpUpjongCd_sub = $(this).val().substring(0,3);
                upjongGbNum_sub = 2;
            }else{
                reset_select(2);
                setUpjongList_sub(2);
                upjongGbNum_sub = 1;
            }
        });
        $("#upjong3_2").on("change", function(){
            // 마지막 업종 선택시 데이터 출력
            if($(this).val() != 0){
                upjongCd_sub = $(this).val();
                tmpUpjongCd_sub = $(this).val().substring(0,3);
                upjongGbNum_sub = 3;
            }else{
                reset_select(2);
                setUpjongList(3,tmpUpjongCd_sub);
                upjongCd_sub = tmpUpjongCd_sub;
                upjongGbNum_sub = 2;
            }
        });

        //메뉴 선택 이벤트
        $("#menu1_2").on("change", function(){
            $('#menu2_2').children('option:not(:first)').remove();
            $('#menu3_2').children('option:not(:first)').remove();
            //selected value
            if($(this).val() != 0){
                setMenuList_sub(2,$(this).val());
                menuCd_sub = $(this).val();
                tmpMenuCd_sub = $(this).val().substring(0,2);
                menuGbNum_sub = 1;
            }else{
                reset_select(4);
                menuCd_sub = $(this).val();
            }
        });
        $("#menu2_2").on("change", function(){
            $('#menu3_2').children('option:not(:first)').remove();
            //selected value
            if($(this).val() != 0){
                setMenuList_sub(3,$(this).val());
                menuCd_sub = $(this).val();
                tmpMenuCd_sub = $(this).val().substring(0,1);
                menuGbNum_sub = 2;
            }else{
                reset_select(4,1);
                if(tmpMenuCd_sub.length == 3){
                    tmpMenuCd_sub = tmpMenuCd_sub.substring(0,1);
                }
                setMenuList_sub(2,tmpMenuCd_sub);
                menuCd_sub = tmpMenuCd_sub;
                menuGbNum_sub = 1;
            }
        });
        $("#menu3_2").on("change", function(){
            // 마지막 업종 선택시 데이터 출력
            if($(this).val() != 0){
                menuCd_sub = $(this).val();
                tmpMenuCd_sub = $(this).val().substring(0,3);
                menuGbNum_sub = 3;
            }else{
                reset_select(4,2);
                setMenuList(3,tmpMenuCd_sub);
                menuCd_sub = tmpMenuCd_sub;
                menuGbNum_sub = 2;
            }
        });

        //날짜 선택 이벤트
        $("#dateType_2").on("change", function(){
            //selected value
            searchType = 1;
            reset_select(3);
            setDateList_sub($(this).val());
            dateTypeNum_sub = $(this).val();
        });
        $("#startDate_2").on("change", function(){
            //selected value
            // console.log("======================startDate start======================");
            if((startDate_sub == 0 && endDate_sub == 0) || (startDate_sub == null && endDate_sub == null)) {
                // 양쪽 다 선택되지 않았을 경우
            }else if(startDate_sub == 0 && endDate_sub != 0){
            }else if(startDate_sub != 0 && endDate_sub == 0){
            }else{
                if($(this).val() > endDate_sub ){
                    alert("시작일을 종료일 이전으로 선택해주시기 바랍니다.");
                    $("#startDate_2 option:eq(0)").prop("selected", true); //첫번째 option 선택
                    return;
                }
            }
            startDate_sub = $(this).val();
            // console.log("======================startDate end======================");
        });
        $("#endDate_2").on("change", function(){
            //selected value
            // console.log("======================startDate start======================");
            if((startDate_sub == 0 && endDate_sub == 0) || (startDate_sub == null && endDate_sub == null)) {
                // 양쪽 다 선택되지 않았을 경우
            }else if(startDate_sub == 0 && endDate_sub != 0){
            }else if(startDate_sub != 0 && endDate_sub == 0){
            }else{
                if($(this).val() < startDate_sub){
                    alert("종료일을 시작일 이후으로 선택해주시기 바랍니다.");
                    $("#endDate_2 option:eq(0)").prop("selected", true); //첫번째 option 선택
                    return;
                }
            }
            endDate_sub = $(this).val();
            // console.log("======================startDate end======================");
        });
        $("#colType3_2").on("change",function(){
            tmpPosType_sub = $(this).val();
            console.log(tmpPosType_sub);
        })
        $("#search_2").on("click", function(){
            searchType = 1;
            var param = {};

            // if(dataTypeNum_sub == 3) {
            //     if ($("#menu_2 option:selected").val() == 0) {
            //         alert('메뉴가 선택되지 않았습니다.\n메뉴를 선택후 검색해주시기 바랍니다.');
            //         return;
            //     }
            // }else if(dataTypeNum_sub == 1 || dataTypeNum_sub == 2){
            //     if($("#upjong2_2 option:selected").val() == 0){
            //         alert('업종이 선택되지 않았습니다.\n업종을 선택후 검색해주시기 바랍니다.');
            //         return;
            //     }
            // }else{
            // }
            if($("#startDate_2 option:selected").val() == 0 || $("#startDate_2 option:selected").val() == 0){
                alert('검색일자가 제대로 선택되지 않았습니다.\n검색일자를 선택후 검색해주시기 바랍니다.');
                return;
            }
            if($("#colType"+dataTypeNum_sub+"_2 option:selected").val() == 0){
                alert('항목이 선택되지 않았습니다.\n항목을 선택후 검색해주시기 바랍니다.');
                return;
            }

            param.admGb = admGbNum_sub;
            param.upjongType = upjongGbNum_sub;
            param.menuType = menuGbNum_sub;
            param.dateType = dateTypeNum_sub;
            param.posType = tmpPosType_sub;
            if(!(admiCd_sub == '' || admiCd_sub == 0 || admiCd_sub == null)) param.areaCd = admiCd_sub;
            if(!(upjongCd_sub == '' || upjongCd_sub == 0 || upjongCd_sub == null)) param.upjongCd = upjongCd_sub;
            if(!(menuCd_sub == '' || menuCd_sub == 0 || menuCd_sub == null)) param.menuCd = menuCd_sub;
            if(!(startDate_sub == '' || startDate_sub == 0 || startDate_sub == null)) param.dateStart = startDate_sub;
            if(!(endDate_sub == '' || endDate_sub == 0 || endDate_sub == null)) param.dateEnd = endDate_sub;

            // // console.log(param);
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
            loadingBar2(true);
            console.log('-----setting_btn-------------------------')
            // console.log(admGbNum);
            // console.log(admGbNum_sub);
            // admGbNum_sub = admGbNum;
            // console.log(admGbNum_sub);
            console.log(dataTypeNum);
            console.log(dataTypeNum_sub);
            //주제 동기화
            // $("#dataType_2 option:eq("+$("#dataType option").index($("#dataType option:selected"))+")").prop("selected", true); //첫번째 option 선택
            $("#dataType_2").val($('#dataType').val()).trigger("change");

            //지역 동기화
            if($('#area_mega').val() != 0) {
                setTimeout(function () {
                    $("#area_mega_2").val($('#area_mega').val()).trigger("change");
                }, 1000);
            }
            if($('#area_cty').val() != 0) {
                setTimeout(function () {
                    $("#area_cty_2").val($('#area_cty').val()).trigger("change");
                }, 1500);
            }

            if(dataTypeNum == 2 || dataTypeNum_sub == 2){
            }else{
                if($('#area_admi').val() != 0){
                    setTimeout(function(){
                        $("#area_admi_2").val($('#area_admi').val()).trigger("change");
                    },2000);
                }
            }

            //업종 동기화
            if(dataTypeNum == 1 || dataTypeNum == 2 || dataTypeNum == 3 || dataTypeNum == 7){
                // $("#upjong1_2").val($('#upjong1').val()).trigger("change");

                if($('#upjong2').val() != 0){
                    setTimeout(function(){
                        $("#upjong2_2").val($('#upjong2').val()).trigger("change");
                    },1000);
                }
                if($('#upjong3').val() != 0){
                    setTimeout(function(){
                        $("#upjong3_2").val($('#upjong3').val()).trigger("change");
                    },2000);
                }
            }

            //메뉴 동기화
            if(dataTypeNum == 3){
                // $("#upjong1_2").val($('#upjong1').val()).trigger("change");

                if($('#menu1').val() != 0){
                    setTimeout(function(){
                        $("#menu1_2").val($('#menu1').val()).trigger("change");
                    },1000);
                }
                if($('#menu2').val() != 0){
                    setTimeout(function(){
                        $("#menu2_2").val($('#menu2').val()).trigger("change");
                    },1500);
                }
                if($('#menu3').val() != 0){
                    setTimeout(function(){
                        $("#menu3_2").val($('#menu3').val()).trigger("change");
                    },2000);
                }
            }


            //기간 동기화
            setTimeout(function(){
                $("#dateType_2").val($('#dateType').val()).trigger("change");
            },500);
            setTimeout(function(){
                $("#startDate_2").val($('#startDate').val()).trigger("change");
                $("#endDate_2").val($('#endDate').val()).trigger("change");
            },1500);

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
            }else if($("#dataType option").index($("#dataType option:selected")) == 5){
                $("#colType7_2").val($('#colType7').val()).trigger("change");
            }

            setTimeout(function(){
                loadingBar2(false);
            },3500);


        })
        //-------------------------------------------- 설정 동기화 항목
    });
    function upjongNmClick(upjongCd){

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
        // console.log(param);
        // searchBtnNum = 1;
        // main_search(dataTypeNum_sub,param);
        // console.log(upjongCd.substring(0,3));
        $("#upjong2").val(upjongCd.substring(0,3)).trigger("change");
        // $("#upjong3").val(upjongCd).trigger("change");
        // $('#upjong2').val(upjongCd.substring(0,3)).prop("selected",true);
        setTimeout(function() {
            $('#upjong3').val(upjongCd).prop("selected", true);
        },200)
    }
    // 메인화면 최초 데이터 세팅
    function fn_mainInfo(id, response, param){
        var year = response.data[0].yyyymm.substring(0,4);
        var month = response.data[0].yyyymm.substring(4,6);
        var calcAmt = response.data[0].calcAmt;
        $('#minYyyymm').text(year+'.'+month);
        $('#maxYyyymm').text(year+'.'+month);
        $('#setDateInfo2').text(year+'년 '+month+'월 데이터 기준');
        $('#setDateInfo3').text('외식데이터 : 신용카드사');
        $('#calcAmt').text(calcAmt+'%');
        $('#calcAmt').parent().addClass(common.upAndDownClass(calcAmt));
        $('#calcDateType').text('전월')
    }

    // 전지역 업종 증감률 리스트
    function fn_eatoutDiff(id, response, param){

        eatoutDiffResponse.diff = response.data;

        var template = $('#tmp_eatout_diff').html();
        var templateScript = Handlebars.compile(template);
        var context = eatoutDiffResponse.diff;
        var html = templateScript(context);
        $('#eatout_diff').html(html);

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
        // returnHtml2 = date.getFullYear()+'년 ' + (date.getMonth() - 2) + '월 데이터 기준'
        $('#setDateInfo').text(returnHtml);
        // $('#setDateInfo2').text(returnHtml2);
    }

    $("select[id^='colType']").on("change", function(){
        if($(this).attr('id').length == 8){
            var tmpId = $(this).attr('id');
            tmpUpText = $('#'+tmpId+' option:selected').text();
            tmpDownText = $('#'+tmpId+' option:selected').text();
            // $('#upText').text($('#'+tmpId+' option:selected').text());
            // $('#downText').text($('#'+tmpId+' option:selected').text());
        }
    });

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
            <col width="46%"/>
            <col width="27%"/>
            <col width="27%"/>
        </colgroup>
        <tr>
            <th>업종</th>
            <th>전월대비<br>증감율</th>
            <th>최근시점<br>시장규모<br><span>천만 원/월</span></th>
        </tr>
        {{#each this}}
        <tr>
            <td><span onclick="upjongNmClick('{{upjong3Cd}}')" value="{{upjong3Cd}}">{{upjong3Nm}}</span></td>
            <td class="{{checkUpDown calcPer}}">{{checkUpDown clacPer}} {{chgAbs calcPer}} %</td>
            <td>{{addComma saleAmt}}</td>
        </tr>
        {{/each}}
    </table>

</script>
