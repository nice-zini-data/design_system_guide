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
            <div class="subCommonTextBox">
                <p class="subCommonTitle">Layout</p>
            </div>

            <section class="layoutBg">
                <p class="tit_xs_sb">여러개</p>
                <p class="txt_l_sb">div -> ul, p, button 등등 변경 가능 (* ul로 변경 시 자식 div는 li로 변경)</p>

                <p class="txt_m_sb mt20 gray_600">왼쪽 정렬 (.layout_l)</p>
                <button type="button" class="layoutCopyBtn txt_m_sb">레이아웃 코드 copy</button>
                <div class="layout_l">
                    <div>
                        <p class="txt_m_m">변경가능</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능2</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능3</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능4</p>
                    </div>
                </div>

                <p class="txt_m_sb mt20 gray_600">가운데 정렬 (.layout_c)</p>
                <button type="button" class="layoutCopyBtn txt_m_sb">레이아웃 코드 copy</button>
                <div class="layout_c">
                    <div>
                        <p class="txt_m_m">변경가능1</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능2</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능3</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능4</p>
                    </div>
                </div>

                <p class="txt_m_sb mt20 gray_600">오른쪽 정렬 (.layout_r)</p>
                <button type="button" class="layoutCopyBtn txt_m_sb">레이아웃 코드 copy</button>
                <div class="layout_r">
                    <div>
                        <p class="txt_m_m">변경가능1</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능2</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능3</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능4</p>
                    </div>
                </div>

                <p class="txt_m_sb mt20 gray_600">양쪽 정렬 (.layout_lcr)</p>
                <button type="button" class="layoutCopyBtn txt_m_sb">레이아웃 코드 copy</button>
                <div class="layout_lcr">
                    <div>
                        <p class="txt_m_m">변경가능1</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능2</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능3</p>
                    </div>
                    <div class="">
                        <p class="txt_m_m">변경가능4</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
<script>
    $(function(){
        $('.layoutCopyBtn').click(function(){
            var copyText = $(this).next().clone().wrapAll('<div></div>').parent().html();

            window.navigator.clipboard.writeText(copyText).then(() => {
                alert(copyText + ' 복사 성공');
            });
        });
    });
</script>

<%@ include file="/WEB-INF/views/common/footer.jsp" %>