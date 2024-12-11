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
                            <p class="txt_m_m">차트 타입 : 가로 / 세로</p>
                        </div>
                        <div class="txt_m_m subContInnerBox">
                            <label for="chartTypeBox">차트 타입 : </label>
                            <select id="chartTypeBox">
                                <option value="horizontal">가로</option>
                                <option value="vertical">세로</option>
                            </select>
                            <div>
                                <button class="whBtn txt_m_m pA6 radius_8 mb16 generateBtnBar" onclick=generateBtnBarHandler()>Chart 생성</button>
                            </div>
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
                </section>
            </div>
        </section>
    </div>
</div>

<script>
    $(function(){
        $('.copyBtnBar').click(function(){
            generateCode();
        });

        $('.generateBtnBar').click(function(){
            let option = {};

            generateChart(option);
        });
    });
</script>

<%@ include file="/WEB-INF/views/common/footer.jsp" %>