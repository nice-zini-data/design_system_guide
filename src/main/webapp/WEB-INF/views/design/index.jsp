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

        </div>

    </div>
    <!--상세 내용 영역 ED-->

    <div class="topBtn gray_bg_300"></div>
</div>
<script>
    $(function(){
        //top 버튼 이벤트
        $('.topBtn').click(function(){
            $('body, html').animate({
                scrollTop: 0
            }, 400);
        });
    });
</script>
<%@ include file="/WEB-INF/views/design/include/footer.jsp" %>