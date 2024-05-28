<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/design/include/head.jsp" %>
<%@ include file="/WEB-INF/views/design/include/script.jsp" %>

<div class="wrap main">
<%--    <%@ include file="/WEB-INF/views/design/include/side.jsp" %>--%>
    <%@ include file="/WEB-INF/views/design/include/navbar.jsp" %>
    <script>
        $(function(){
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
                test
            </div>
        </div>
    </div>
</div>


<!--공통 footer-->
<%--<%@ include file="/WEB-INF/views/design/include/footer.jsp" %>--%>

<script type="text/javascript">


    $(function() {
        console.log('index.jsp')
    });
</script>