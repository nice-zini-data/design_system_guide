<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/design/include/head.jsp" %>
<%@ include file="/WEB-INF/views/design/include/script.jsp" %>

<div class="wrap">

    <!--좌측 사이드 바-->
    <%@ include file="/WEB-INF/views/design/include/side.jsp" %>

    <!--상세 내용 영역 ST-->
    <div class="contInner">

        <div id="onlyBody">
            <%@ include file="/WEB-INF/views/design/designPage/includePage.jsp" %>
        </div>

    </div>
    <!--상세 내용 영역 ED-->

</div>