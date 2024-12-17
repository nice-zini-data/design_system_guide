<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/common/head.jsp" %>
<%@ include file="/WEB-INF/views/common/script.jsp" %>

<div class="wrap">

<!--좌측 사이드 바-->
<%@ include file="/WEB-INF/views/common/side.jsp" %>

<div class="contInner">
    <div class="subPage">
        <section class="subTabChangeCont">
            <div class="includeContent">
                <section class="subTabChangeCont">
                    <div class="subContInner">
                        <p class="txt_xl_sb">Bar Chart Option</p>
                        <div class="txt_m_m subContInnerBox">
                            <p class="txt_m_m mt16">Bar Chart 옵션</p>
                            <p class="txt_m_m">
                                - 차트 타입(가로/세로)<br/>
                                - 차트 내부여백<br/>
                                - 범례 사용여부(상세설정 - 위치, 배치, 글자위치)<br/>
                                - x축 설정(자주 사용하는 "색상, 폰트(사이즈, 두깨, 종류)" 리스트로 정리하면 콤보박스에 등록 가능(?))<br/>
                                1. 축눈금(표출여부)<br/>
                                2. 축선(표출여부, 색상, 타입, 두께)<br/>
                                3. 축선(색상, 사이즈, 두께, 종류)<br/>
                                4. 라벨(색상, 사이즈, 두께, 종류)<br/>
                                5. 보조선(색상, 두께, 종류)<br/>
                                - y축 설정(자주 사용하는 "색상, 폰트(사이즈, 두깨, 종류)" 리스트로 정리하면 콤보박스에 등록 가능(?))<br/>
                                1. 축눈금(표출여부)<br/>
                                2. 축선(표출여부, 색상, 타입, 두께)<br/>
                                3. 축선(색상, 사이즈, 두께, 종류)<br/>
                                4. 라벨(색상, 사이즈, 두께, 종류)<br/>
                                5. 보조선(색상, 두께, 종류)<br/>
                                - 바 설정<br/>
                                1. 바 개수<br/>
                                2. 바 넓이<br/>
                                3. 바 라벨<br/>
                                4. 바 색깔<br/>
                            </p>
                        </div>
                        <div class="subContInnerBox mt16">
                            <div class="layout_lcr">
                                <p class="txt_m_m mb16">Default Bar Chart</p>
                                <button class="whBtn txt_m_m pA6 radius_8 mb16 copyBtnBar ">Chart 코드 복사</button>
                            </div>
                            <div class="whBox">
                                <div class="chartSize" id="defaultBarChart"></div>
                            </div>
                        </div>
                        <div class="txt_m_m subContInnerBox">
                            <label for="chartTypeBox">차트 타입 : </label>
                            <select id="chartTypeBox">
                                <option value="0">가로</option>
                                <option value="1">세로</option>
                            </select>
                            <div id="gridOption">
                                <p>-----차트 내부 여백-----</p>
                                <p><label for='grid_top'>top</label><input id='grid_top' onChange="setGridOption(event)"/></p>
                                <p><label for='grid_left'>left</label><input id='grid_left' onChange="setGridOption(event)"/></p>
                                <p><label for='grid_right'>right</label><input id='grid_right' onChange="setGridOption(event)"/></p>
                                <p><label for='grid_bottom'>bottom</label><input id='grid_bottom' onChange="setGridOption(event)"/></p>
                            </div>
                            <div id="legendOption">
                                <p>-----범례 사용여부-----</p>
                                <label for="legend">범례 사용여부 : </label>
                                <select id="legend" onChange="setLegendOption(event)">
                                    <option value="0">사용</option>
                                    <option value="1" selected>미사용</option>
                                </select>
                            </div>
                            <div id="legendDeatilOption" style="display: none">
                                <p>-----범례 상세-----</p>
                                <label for="legendLocation">범례 위치 : </label>
                                <select id="legendLocation" onChange="setLegendDetailOption(event)">
                                    <option value="0" selected>top</option>
                                    <option value="1">left</option>
                                    <option value="2">right</option>
                                    <option value="3">bottom</option>
                                </select>
                                <label for="legendOrient">범례 배치(수평, 수직) : </label>
                                <select id="legendOrient" onChange="setLegendDetailOption(event)">
                                    <option value="horizontal" selected>horizontal</option>
                                    <option value="vertical">vertical</option>
                                </select>
<%--                                <p><label for='legend_top'>top</label><input id='legend_top' onChange="checkLegendDetailOption(event)"/></p>--%>
<%--                                <p><label for='legend_left'>left</label><input id='legend_left' onChange="checkLegendDetailOption(event)"/></p>--%>
<%--                                <p><label for='legend_right'>right</label><input id='legend_right' onChange="checkLegendDetailOption(event)"/></p>--%>
<%--                                <p><label for='legend_bottom'>bottom</label><input id='legend_bottom' onChange="checkLegendDetailOption(event)"/></p>--%>
                                <label for="legendAlign">범례 글자 위치(왼쪽, 오른쪽) : </label>
                                <select id="legendAlign" onChange="setLegendDetailOption(event)">
                                    <option value="left" selected>left</option>
                                    <option value="right">right</option>
                                </select>
                            </div>
                            <div id="xAxis">
                                <p>---------------x축 관련 설정--------------------</p>
                                <p>-----X축 눈금 설정-----</p>
                                <label for="axisXtick">축 눈금 표시여부</label>
                                <select id="axisXtick" onChange="setXaxisOption(event)">
                                    <option value="0">표출</option>
                                    <option value="1" selected>미표출</option>
                                </select>
                                <p>-----X축 선 설정-----</p>
                                <label for="axisXline">축선 표출여부</label>
                                <select id="axisXline" onChange="setXaxisOption(event)">
                                    <option value="0" selected>표출</option>
                                    <option value="1">미표출</option>
                                </select>
                                <label for="axisXlineColor">축선 색상</label>
                                <select id="axisXlineColor" onChange="setXaxisOption(event)">
                                    <option value="#F1F1F3">#F1F1F3</option>
                                    <option value="#000000">#000000</option>
                                </select>
                                <label for="axisXlineType">축선 타입</label>
                                <select id="axisXlineType" onChange="setXaxisOption(event)">
                                    <option value="solid">실선</option>
                                    <option value="dashed" selected>대시기호(-)</option>
                                    <option value="dotted">점선</option>
                                </select>
                                <label for="axisXlineWidth">축선 두께</label>
                                <select id="axisXlineWidth" onChange="setXaxisOption(event)">
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                                <p>-----X축 라벨 설정-----</p>
                                <label for="axisXlabelColor">라벨 색상</label>
                                <select id="axisXlabelColor" onChange="setXaxisOption(event)">
                                    <option value="#8C8C8C">#8C8C8C</option>
                                    <option value="#000000">#000000</option>
                                </select>
                                <label for="axisXlabelFontSize">폰트 사이즈</label>
                                <select id="axisXlabelFontSize" onChange="setXaxisOption(event)">
                                    <option value="8" selected>8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                </select>
                                <label for="axisXlabelFontWeight">폰트 두께</label>
                                <select id="axisXlabelFontWeight" onChange="setXaxisOption(event)">
                                    <option value="400" selected>400</option>
                                </select>
                                <label for="axisXlabelFontFamily">폰트 종류</label>
                                <select id="axisXlabelFontFamily" onChange="setXaxisOption(event)">
                                    <option value="Pretendard" selected>Pretendard</option>
                                    <option value="fantasy">fantasy</option>
                                </select>
                                <p>-----X축 보조선 설정-----</p>
                                <label for="axisXsplitLine">보조선 표출여부</label>
                                <select id="axisXsplitLine" onChange="setXaxisOption(event)">
                                    <option value="0" selected>표출</option>
                                    <option value="1">미표출</option>
                                </select>
                                <label for="axisXsplitLineColor">보조선 색상</label>
                                <select id="axisXsplitLineColor" onChange="setXaxisOption(event)">
                                    <option value="#F1F1F3">#F1F1F3</option>
                                    <option value="#000000">#000000</option>
                                </select>
                                <label for="axisXsplitLineType">보조선 타입</label>
                                <select id="axisXsplitLineType" onChange="setXaxisOption(event)">
                                    <option value="solid">실선</option>
                                    <option value="dashed" selected>대시기호(-)</option>
                                    <option value="dotted">점선</option>
                                </select>
                                <label for="axisXsplitLineWidth">보조선 두께</label>
                                <select id="axisXsplitLineWidth" onChange="setXaxisOption(event)">
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            </div>
                            <div id="yAxis">
                                <p>---------------Y축 관련 설정--------------------</p>
                                <p>-----Y축 눈금 설정-----</p>
                                <label for="axisYtick">Y축 눈금 표시여부</label>
                                <select id="axisYtick" onChange="setYaxisOption(event)">
                                    <option value="0">표출</option>
                                    <option value="1" selected>미표출</option>
                                </select>
                                <p>-----Y축 선 설정-----</p>
                                <label for="axisYline">축선 표출여부</label>
                                <select id="axisYline" onChange="setYaxisOption(event)">
                                    <option value="0" selected>표출</option>
                                    <option value="1">미표출</option>
                                </select>
                                <label for="axisYlineColor">축선 색상</label>
                                <select id="axisYlineColor" onChange="setYaxisOption(event)">
                                    <option value="#F1F1F3">#F1F1F3</option>
                                    <option value="#000000">#000000</option>
                                </select>
                                <label for="axisYlineType">축선 타입</label>
                                <select id="axisYlineType" onChange="setYaxisOption(event)">
                                    <option value="solid">실선</option>
                                    <option value="dashed" selected>대시기호(-)</option>
                                    <option value="dotted">점선</option>
                                </select>
                                <label for="axisYlineWidth">축선 두께</label>
                                <select id="axisYlineWidth" onChange="setYaxisOption(event)">
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                                <p>-----Y축 라벨 설정-----</p>
                                <label for="axisYlabelColor">라벨 색상</label>
                                <select id="axisYlabelColor" onChange="setYaxisOption(event)">
                                    <option value="#8C8C8C">#8C8C8C</option>
                                    <option value="#000000">#000000</option>
                                </select>
                                <label for="axisYlabelFontSize">폰트 사이즈</label>
                                <select id="axisYlabelFontSize" onChange="setYaxisOption(event)">
                                    <option value="8" selected>8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                </select>
                                <label for="axisYlabelFontWeight">폰트 두께</label>
                                <select id="axisYlabelFontWeight" onChange="setYaxisOption(event)">
                                    <option value="400" selected>400</option>
                                </select>
                                <label for="axisYlabelFontFamily">폰트 종류</label>
                                <select id="axisYlabelFontFamily" onChange="setYaxisOption(event)">
                                    <option value="Pretendard" selected>Pretendard</option>
                                    <option value="Fantasy" selected>Fantasy</option>
                                </select>
                                <p>-----Y축 보조선 설정-----</p>
                                <label for="axisYsplitLine">보조선 표출여부</label>
                                <select id="axisYsplitLine" onChange="setYaxisOption(event)">
                                    <option value="0" selected>표출</option>
                                    <option value="1">미표출</option>
                                </select>
                                <label for="axisYsplitLineColor">보조선 색상</label>
                                <select id="axisYsplitLineColor" onChange="setYaxisOption(event)">
                                    <option value="#F1F1F3">#F1F1F3</option>
                                    <option value="#000000">#000000</option>
                                </select>
                                <label for="axisYsplitLineType">보조선 타입</label>
                                <select id="axisYsplitLineType" onChange="setYaxisOption(event)">
                                    <option value="solid">실선</option>
                                    <option value="dashed" selected>대시기호(-)</option>
                                    <option value="dotted">점선</option>
                                </select>
                                <label for="axisYsplitLineWidth">보조선 두께</label>
                                <select id="axisYsplitLineWidth" onChange="setYaxisOption(event)">
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            </div>
                            <div id="dataSeries">
                                <p>---------------바, 데이터 관련 설정--------------------</p>
                                <p>-----바 갯수 선택-----</p>
                                <label for="barCnt">bar 개수</label>
                                <select id="barCnt" onChange="setDataSeriesOption(event)">
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <p>-----바 넓이 선택-----</p>
                                <p><label for='barWidth'>바 넓이</label><input id='barWidth' onChange="setDataSeriesOption(event)"/></p>
                                <p>-----바 라벨 옵션-----</p>
                                <label for="barLabel">바 라벨</label>
                                <select id="barLabel" onChange="setDataSeriesOption(event)">
                                    <option value="0">미표출</option>
                                    <option value="1" selected>표출</option>
                                </select>
                                <label for="barLabelPosition">바 라벨 위치</label>
                                <select id="barLabelPosition" onChange="setDataSeriesOption(event)">
                                    <option value="right">right</option>
                                    <option value="insideLeft" selected>insideLeft</option>
                                    <option value="insideRight">insideRight</option>
                                </select>
                                <label for="barLabelFontSize">폰트 사이즈</label>
                                <select id="barLabelFontSize" onChange="setDataSeriesOption(event)">
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12" selected>12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                </select>
                                <label for="barLabelFontWeight">폰트 두께</label>
                                <select id="barLabelFontWeight" onChange="setDataSeriesOption(event)">
                                    <option value="400" selected>400</option>
                                </select>
                                <label for="barLabelFontFamily">폰트 종류</label>
                                <select id="barLabelFontFamily" onChange="setDataSeriesOption(event)">
                                    <option value="Pretendard" selected>Pretendard</option>
                                    <option value="fantasy">fantasy</option>
                                </select>
                                <p>-----바 스타일 옵션-----</p>
                                <label for="barColor">바 색깔</label>
                                <select id="barColor" onChange="setDataSeriesOption(event)">
                                    <option value="#FF7268">#FF7268</option>
                                    <option value="#000000">#000000</option>
                                </select>
<%--                                <p>-----바 백라운드-----</p>--%>
<%--                                <label for="barBackground">바 백라운드</label>--%>
<%--                                <select id="barBackground" onChange="setDataSeriesOption(event)">--%>
<%--                                    <option value="0" selected>표출</option>--%>
<%--                                    <option value="1">미표출</option>--%>
<%--                                </select>--%>
                            </div>
                            <div>
                                <button class="whBtn txt_m_m pA6 radius_8 mb16 generateBtnBar">Chart 생성</button>
                            </div>

                            <div class="subContInnerBox mt16">
                                <div class="layout_lcr">
                                    <p class="txt_m_m mb16">Bar Chart</p>
                                    <button class="whBtn txt_m_m pA6 radius_8 mb16 copyBtnBar ">Chart 코드 복사</button>
                                </div>
                                <div class="whBox">
                                    <div class="chartSize" id="barChart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</div>

<script>
    $(function(){
        defaultChart(chartHorizontalOption);
        setDefaultChartOption(chartHorizontalOption);

        $('.copyBtnBar').click(function(){
            generateCode();
        });

        $('.generateBtnBar').click(function(){
            generateChart(chartHorizontalOption);
        });
    });
</script>

<%@ include file="/WEB-INF/views/common/footer.jsp" %>