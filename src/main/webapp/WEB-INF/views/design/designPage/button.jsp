<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/design/include/head.jsp" %>
<%@ include file="/WEB-INF/views/design/include/script.jsp" %>

<div class="wrap">

    <!--좌측 사이드 바-->
    <%@ include file="/WEB-INF/views/design/include/side.jsp" %>

    <div class="contInner">
        <div class="subPage">
            <div class="subCommonTextBox">
                <p class="subCommonTitle">Button</p>
                <p class="txt_s_m gray_600">* 버튼 클릭 시 복사 가능</p>
            </div>
            <div class="subContInnerBox">
                <p class="txt_l_m mb20">배경 버튼</p>
                <div class="whBox pA16">
                    <div class="pb40">
                        <p class="txt_l_m pb8 copyBtn pA6 mr20">main fill button copy</p>
                        <button type="button" class="blueBtn pA8 radius_8 txt_m_m">텍스트</button>
                    </div>
                    <div class="pb40">
                        <p class="txt_l_m pb8 copyBtn pA6 mr20">sub fill button copy</p>
                        <button type="button" class="skyBlueBtn pA8 radius_8 txt_m_m">텍스트</button>
                    </div>
                    <div class="pb40">
                        <p class="txt_l_m pb8 copyBtn pA6 mr20">white fill button copy</p>
                        <button type="button" class="whBtn pA8 radius_8 txt_m_m">텍스트</button>
                    </div>
                    <div class="pb40">
                        <p class="txt_l_m pb8 copyBtn pA6 mr20">error fill button copy</p>
                        <button type="button" class="redBtn pA8 radius_8 txt_m_m">텍스트</button>
                    </div>
                </div>
            </div>
            <div class="subContInnerBox">
                <p class="txt_l_m mb20">선 버튼</p>
                <div class="whBox pA16">
                    <div class="pb40">
                        <p class="txt_l_m pb8 copyBtn pA6 mr20">main stroke button copy</p>
                        <button type="button" class="blueLineBtn pA8 radius_8 txt_m_m">텍스트</button>
                    </div>
                    <div class="pb40">
                        <p class="txt_l_m pb8 copyBtn pA6 mr20">sub stroke button copy</p>
                        <button type="button" class="skyBlueLineBtn pA8 radius_8 txt_m_m">텍스트</button>
                    </div>
                    <div class="pb40">
                        <p class="txt_l_m pb8 copyBtn pA6 mr20">error stroke button copy</p>
                        <button type="button" class="redLineBtn pA8 radius_8 txt_m_m">텍스트</button>
                    </div>
                </div>
            </div>
            <div class="subContInnerBox">
                <p class="txt_l_m mb20">그 외 버튼</p>
                <div class="whBox pA16">
                    <div class="pb40">
                        <button type="button" class="disabledBtn pA8 radius_8 txt_m_m">비활성화 버튼</button>
                    </div>
                    <div class="pb40">
                        <button type="button" class="noneLineBtn pA8 radius_8 txt_m_m">기본 버튼</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script>
    $(function(){
        $('button').click(function(){
            var copyText = $(this).wrapAll('<button></button>').parent().html();

            window.navigator.clipboard.writeText(copyText).then(() => {
                alert(copyText + ' 복사 성공');
            });
        });
    });
</script>

<%@ include file="/WEB-INF/views/design/include/footer.jsp" %>