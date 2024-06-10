<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--상단 nav-->
<nav>
    <div class="nav">
        <!--사이드 서브 탭이랑 동일하게 변경-->
        <ul>
            <li>subTab</li>
            <li>subTab</li>
            <li>subTab</li>
        </ul>
    </div>
</nav>

<div class="sideTabTitleBox">
    <p class="sideTabTitle">Drawer</p>
    <span class="sideTabTxt">타이틀바의 햄버거 버튼을 클릭하면 나타나는 메뉴로, 항상 타이틀바와 함께 사용됩니다.<br/>
        화면 최상단 우측 혹은 좌측의 햄버거 버튼이 위치한 방향에서 반대방향으로 스와이프되며 등장합니다.</span>
</div>
<div class="subTabChangeTab">
    <ul>
        <li>sub cont</li>
        <li>sub cont</li>
        <li>sub cont</li>
    </ul>
</div>
<div class="includeContent">

    <!--폰트-->
    <section class="subTabChangeCont">
        <%@ include file="/WEB-INF/views/design/designPage/typography.jsp" %>
    </section>
    <section class="subTabChangeCont">

    </section>
    <section class="subTabChangeCont">

    </section>

</div>