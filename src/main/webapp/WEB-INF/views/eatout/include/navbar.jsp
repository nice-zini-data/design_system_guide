<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<header>
    <div class="head">
        <img src="/eatout/assets/eatout/images/logo/logo.svg" alt="로고"/>
        <p class="logo_title">외식통계조회  시스템</p>
    </div>
</header>
<div class="topHeader">
    <div class="topHeaderInner">
        <!--로그인 전-->
        <ul class="logout navList">
            <li id="statistics">
                <img src="/eatout/assets/eatout/images/icon/menu_icon_g.svg" alt=""/>
                <p class="txt_l_m">통계조회</p>
            </li>
            <li  id="market">
                <img src="/eatout/assets/eatout/images/icon/menu_icon_g.svg" alt=""/>
                <p class="txt_l_m">시장동향</p>
            </li>
        </ul>
        <!--로그인 후-->
    </div>
</div>

<script>
    $(function() {
        $("#statistics").on('click', function () {
            location.href="./";
        });
        $("#market").on('click', function () {
            location.href="./market";
        });

    });

    function noticeClick(id, date){
        sessionStorage.setItem("scheduleId", id);
        sessionStorage.setItem("scheduleDate", date+"");
        menuMove('calendar');
    }

</script>

<%--<script type="text/x-handlebars-template" id="tmp_select_listBox_notice">--%>
<%--    {{#ifCond this.0.eatoutDday '<' 16}}--%>
<%--        <li class="nav_h_none afterNone">--%>
<%--            <div class="nav_top_box">--%>
<%--                <p class="txt_n_sb">알림</p>--%>
<%--                <p class="txt_s_m mono_g7_col">{{this.0.eatoutGubun}} D-{{this.0.eatoutDday}}</p>--%>
<%--            </div>--%>
<%--        </li>--%>
<%--    {{/ifCond}}--%>
<%--    {{#each this}}--%>
<%--    <li class="txt_s_sb" onclick="noticeClick('{{id}}', '{{startDt}}')">--%>
<%--        <p class="txt_s_sb">{{title}}</p>--%>
<%--        <p class="txt_s_m mono_g7_col">D-{{dDay}}</p>--%>
<%--    </li>--%>
<%--    {{/each}}--%>
<%--    <li class="txt_s_m tar afterNone" onclick="menuMove('calendar');">더보기</li>--%>
<%--</script>--%>
