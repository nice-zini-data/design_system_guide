<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String version = "1.0";
    String cjcode = "ELEC";
%>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">

    <!--파비콘-->
    <link href="/eatout/assets/favicon.ico" rel="icon" type="image/png"/>

<%--    <link rel="stylesheet" href="/eatout/assets/css/common.css"/>--%>
<%--    <link rel="stylesheet" href="/eatout/assets/css/color.css"/>--%>
<%--    <link rel="stylesheet" href="/eatout/assets/css/typo.css"/>--%>
<%--    <link rel="stylesheet" href="/eatout/assets/css/form.css"/>--%>
<%--    <link rel="stylesheet" href="/eatout/assets/css/button.css"/>--%>
<%--    <link rel="stylesheet" href="/eatout/assets/css/style.css"/>--%>
<%--    <link rel="stylesheet" href="/eatout/assets/css/layout.css"/>--%>
<%--    <link rel="stylesheet" href="/eatout/assets/css/print.css"/>--%>

    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">

    <script type="text/javascript" src="/eatout/assets/js/jquery-3.5.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>

<%--    <script type="text/javascript" src="/eatout/assets/js/form.js"></script>--%>
<%--    <script type="text/javascript" src="/eatout/assets/js/com.js"></script>--%>
    <script type="text/javascript" src="/eatout/assets/eatout/js/datepicker-ko.js"></script>

    <!-- echart -->

    <script src="https://cdn.jsdelivr.net/npm/echarts@5.3.2/dist/echarts.min.js"></script>
<%--    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">--%>
    <link rel="stylesheet" href="/eatout/assets/css/style.css"/>
    <title>외식통계조회 시스템</title>

</head>

<!--로딩-->
<div class="loading" style="display: none">
    <div class="loadingIcon">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
<div class="loading2" style="display: none">
    <div class="loadingIcon">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>


<body id="top">

<%--<a href="#top">--%>
<%--    <div class="topBtn" >--%>
<%--        <img src="/eatout/assets/eatout/images/icon/arrow_upward_b.svg" alt="top 이동 아이콘"/>--%>
<%--        <p class="txt_s_m pri_5_col">TOP</p>--%>
<%--    </div>--%>
<%--</a>--%>


