<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- lib (변동 없는 js)-->
<%--<script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>--%>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script type="text/javascript" src="/eatout/assets/lib/handlebars-v4.7.2.js"></script>
<script type="text/javascript" src="/eatout/assets/js/scripts.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.1/echarts.min.js"></script>
<script type="text/javascript" src="/eatout/assets/lib/proj4/proj4js-combined.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>

<!-- lib (변동 있는 js)-->
<script type="text/javascript" src="/eatout/assets/js/common.js?<%=version%>"></script>
<script type="text/javascript" src="/eatout/assets/js/commonUtil.js?<%=version%>"></script>
<script type="text/javascript" src="/eatout/assets/js/helper.js?<%=version%>"></script>
<script type="text/javascript" src="/eatout/assets/eatout/js/main.js?<%=version%>"></script>

<!-- code 목록 -->
<script type="text/javascript" src="/eatout/assets/eatout/js/code/codeList.js?<%=version%>"></script>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js" integrity="sha384-Rx+T1VzGupg4BHQYs2gCW9It+akI2MM/mndMCy36UVfodzcJcF0GGLxZIzObiEfa" crossorigin="anonymous"></script>

<script type="text/javascript">
    var streatoutArea;
    var streatoutGubunCd;
    var strGabeulGb;
    var strResAuthCd;
    var strDepartment;
    var strAuthGubun;
    var strEmail;
    var strMemNm;
    var strLoginId;
    var strCrtDt;


    function fn_error(response) {
        console.log(response);
        console.log('error');
        loadingBar(false);
        if(response.status == 403){
            logout();
        }else{
            alert("에러 발생 [관리자 문의]");
        }
    }


    function loadingBar(gubun){
        if(gubun) {
            $(".loading").show();
            $('html, body').css({'overflow': 'hidden'});
        } else {
            $(".loading").hide();
            $('html, body').css({'overflow': ''});
        }
    }

    function loadingBar2(gubun){
        if(gubun) {
            $(".loading2").show();
            $('html, body').css({'overflow': 'hidden'});
        } else {
            $(".loading2").hide();
            $('html, body').css({'overflow': ''});
        }
    }
</script>


