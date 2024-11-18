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
            <div class="commonTable">
                <p class="txt_xl_sb mb16">공통 테이블</p>
                <div class="subContInnerBox">
                    <button class="whBtn txt_m_m pA6 radius_8 mb16 copyBtn fr">table 코드 복사</button>
                    <div class="whBox pA16 clear">
                        <table class="adminCommonTable">
                            <tr>
                                <th class="listUD none">test <span class="listUpDownBtn"></span></th>
                                <th class="listUD listUp">test <span class="listUpDownBtn"></span></th>
                                <th class="listUD listDown">test <span class="listUpDownBtn"></span></th>
                            </tr>
                            <tr>
                                <td>test</td>
                                <td>test</td>
                                <td>test</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(function(){
            $('.copyBtn').click(function(){
                var copyTable = $(this).next().children().clone().wrapAll('<table></table>').parent().html();

                window.navigator.clipboard.writeText(copyTable).then(() => {
                    alert(copyTable + ' 클래스 복사 성공');
                });
            });
        });
    </script>

<%@ include file="/WEB-INF/views/design/include/footer.jsp" %>