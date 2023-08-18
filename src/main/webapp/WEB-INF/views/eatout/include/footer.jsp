<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="footer">
    <div class="foot">
        <div class="foot_txtBox1">
            <div class="foot_logoBox">
                <div class="footLogo">
                    <img src="/eatout/assets/eatout/images/logo/logo.svg" alt="Kingmaker 로고" />
                </div>
                <p class="txt_n">문구<br/>
                </p>
            </div>
            <div class="foot_pageList">
                <ul>
                    <li onclick="location.href='/'" class="txt_n">홈</li>
                    <li onclick="menuMove('statistics');" class="txt_n">통계조회</li>
                    <li onclick="menuMove('market');" class="txt_n">시장동향</li>
                </ul>
            </div>
        </div>
        <div class="t_bridgeLogo">
            <img src="/eatout/assets/eatout/images/logo/t_bridge_logo.svg" alt="T-BRIDGE 로고">
            <p class="foot_txt_font">데이터 출처: 주식회사 티브릿지코퍼레이션</p>
        </div>

<%--        <p class="foot_txt_font">주식회사 나이스지니데이타 ㅣ 사업자등록번호 111-11-1111 ㅣ 대표자 <br/>
            Tel. 02-784-0025 l Fax. 02-784-0026 l Email. tbridge@tbridge.kr l 서울시 영등포 국회대로 76가길 14. 10층 (우 07239)<br/>
            Copyright 2020. T·bridge All rights reserved.
        </p>--%>
    </div>
</div>

</body>

</html>
