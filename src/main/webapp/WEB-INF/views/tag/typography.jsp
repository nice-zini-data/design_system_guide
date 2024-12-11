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
                <p class="subCommonTitle">Text Naming</p>
                <p class="txt_s_m gray_600">* 텍스트 클릭 시 복사 가능</p>
            </div>

            <div class="typoNaming tac">
                <img src="/assets/images/typo_img.png" alt=""/>
            </div>

            <div class="subCommonTextBox">
                <p class="subCommonTitle">Title</p>
                <p class="subCommonText">헤드라인, 타이틀, 서브타이틀에 사용하며 경우에 따라 콘텐츠 영역에 사용할 수 있습니다. (키패드, 인증번호 등)</p>
            </div>

            <div class="typo_table mt100">
                <div class="typo_tableBg"><p>PC</p></div>
                <div class="typo_tableBg typo_mo_h"><p>MOBILE (480~)</p></div>
                <table>
                    <colgroup>
                        <col width="15%"/>
                        <col width="25%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                    </colgroup>
                    <tr>
                        <th>Type</th>
                        <th>Style (Weight)</th>
                        <th>Size</th>
                        <th>Line-height</th>
                        <th>Letter-spacing</th>
                        <th>Size</th>
                        <th>Line-height</th>
                        <th>Letter-spacing</th>
                    </tr>
                    <tr>
                        <td><p class="tit_xl_b">XL 36</p></td>
                        <td><p class="tit_xl_b">Bold</p></td>
                        <td>36px</td>
                        <td>134%</td>
                        <td>-0.18px</td>
                        <td>28px</td>
                        <td>142%</td>
                        <td>-0.18px</td>
                    </tr>
                    <tr>
                        <td><p class="tit_l_b">L 28</p></td>
                        <td><p class="tit_l_b">Bold</p> <p class="tit_l_sb">semibold</p></td>
                        <td>28px</td>
                        <td>142%</td>
                        <td>-0.14px</td>
                        <td>24px</td>
                        <td>148%</td>
                        <td>-0.14px</td>
                    </tr>
                    <tr>
                        <td><p class="tit_m_b">M 24</p></td>
                        <td><p class="tit_m_b">Bold</p><p class="tit_m_sb">semibold</p></td>
                        <td>24px</td>
                        <td>148%</td>
                        <td>-0.192px</td>
                        <td>20px</td>
                        <td>158%</td>
                        <td>-0.192px</td>
                    </tr>
                    <tr>
                        <td><p class="tit_s_b">S 20</p></td>
                        <td><p class="tit_s_b">Bold</p><p class="tit_s_sb">semibold</p><p class="tit_s_m">Medium</p></td>
                        <td>20px</td>
                        <td>158%</td>
                        <td>-0.2px</td>
                        <td>18px</td>
                        <td>158%</td>
                        <td>-0.2px</td>
                    </tr>
                    <tr>
                        <td><p class="tit_xs_b">XS 18</p></td>
                        <td><p class="tit_xs_b">Bold</p><p class="tit_xs_sb">semibold</p><p class="tit_xs_m">Medium</p></td>
                        <td>18px</td>
                        <td>158%</td>
                        <td>-0.36px</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>

            <div class="subCommonTextBox mt130">
                <p class="subCommonTitle">Paragraph</p>
                <p class="subCommonText">본문 및 버튼에 사용되는 스타일입니다. 기본적으로 L 16 사이즈를 사용하며, 강조 정도에 따라 사이즈와 두께를 조절하여 사용할 수 있습니다.<br/>
                    폰트 두께 Bold는 최대한 지양합니다. 경우에 따라 서브타이틀로 활용할 수 있습니다.<br/>
                    모바일 해상도에서 화면의 너비가 너무 좁아 본문 표현에 어려움이 있는 경우, 제한적으로 Mobile 전용 사이즈를 적용합니다.</p>
            </div>

            <div class="typo_table mt100">
                <div class="typo_tableBg"><p>PC</p></div>
                <div class="typo_tableBg typo_mo_h02"><p>MOBILE (480~)</p></div>
                <table>
                    <colgroup>
                        <col width="15%"/>
                        <col width="25%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                    </colgroup>
                    <tr>
                        <th>Type</th>
                        <th>Style (Weight)</th>
                        <th>Size</th>
                        <th>Line-height</th>
                        <th>Letter-spacing</th>
                        <th>Size</th>
                        <th>Line-height</th>
                        <th>Letter-spacing</th>
                    </tr>
                    <tr>
                        <td><p class="txt_xl_b">XL 18</p></td>
                        <td>
                            <p class="txt_xl_b">Bold</p>
                            <p class="txt_xl_sb">semibold</p>
                            <p class="txt_xl_m">Medium</p>
                            <p class="txt_xl_r">Regular</p>
                        </td>
                        <td>18px</td>
                        <td>168%</td>
                        <td>-0.36px</td>
                        <td>14px?</td>
                        <td>168%</td>
                        <td>-0.36px</td>
                    </tr>
                    <tr>
                        <td><p class="txt_l_b">L 16</p></td>
                        <td>
                            <p class="txt_l_b">Bold</p>
                            <p class="txt_l_sb">semibold</p>
                            <p class="txt_l_m">Medium</p>
                            <p class="txt_l_r">Regular</p>
                        </td>
                        <td>16px</td>
                        <td>168%</td>
                        <td>-0.32px</td>
                        <td>14px</td>
                        <td>168%</td>
                        <td>-0.32px</td>
                    </tr>
                    <tr>
                        <td><p class="txt_m_b">M 14</p></td>
                        <td>
                            <p class="txt_m_b">Bold</p>
                            <p class="txt_m_sb">semibold</p>
                            <p class="txt_m_m">Medium</p>
                            <p class="txt_m_r">Regular</p>
                        </td>
                        <td>14px</td>
                        <td>168%</td>
                        <td>-0.28px</td>
                        <td>13px</td>
                        <td>168%</td>
                        <td>-0.28px</td>
                    </tr>
                    <tr>
                        <td><p class="txt_s_b">S 13</p></td>
                        <td>
                            <p class="txt_s_b">Bold</p>
                            <p class="txt_s_sb">semibold</p>
                            <p class="txt_s_m">Medium</p>
                            <p class="txt_s_r">Regular</p>
                        </td>
                        <td>13px</td>
                        <td>168%</td>
                        <td>-0.26px</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><p class="txt_xs_b">XS 12</p></td>
                        <td>
                            <p class="txt_xs_b">Bold</p>
                            <p class="txt_xs_sb">semibold</p>
                            <p class="txt_xs_m">Medium</p>
                            <p class="txt_xs_r">Regular</p>
                        </td>
                        <td>12px</td>
                        <td>168%</td>
                        <td>-0.36px</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>


                </table>
            </div>

            <div class="subCommonTextBox mt130">
                <p class="subCommonTitle">Label</p>
                <p class="subCommonText">레이블, 인풋 레이블, 인풋 안내문구 등 주로 안내가 필요한 부분에 사용되는 스타일입니다. 행간이 항상 100%로 유지됩니다.</p>
            </div>

            <div class="typo_table mt100">
                <table>
                    <colgroup>
                        <col width="15%"/>
                        <col width="25%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                    </colgroup>
                    <tr>
                        <th>Type</th>
                        <th>Style (Weight)</th>
                        <th>Size</th>
                        <th>Line-height</th>
                        <th>Letter-spacing</th>
                    </tr>
                    <tr>
                        <td><p class="lab_xl_b">XL 16</p></td>
                        <td>
                            <p class="lab_xl_b">bold</p>
                            <p class="lab_xl_sb">semibold</p>
                            <p class="lab_xl_m">Medium</p>
                        </td>
                        <td>16px</td>
                        <td>100%</td>
                        <td>0.08px</td>
                    </tr>
                    <tr>
                        <td><p class="lab_l_sb">L 14</p></td>
                        <td>
                            <p class="lab_l_sb">semibold</p>
                            <p class="lab_l_m">Medium</p>
                        </td>
                        <td>14px</td>
                        <td>100%</td>
                        <td>0.07px</td>
                    </tr>
                    <tr>
                        <td><p class="lab_m_sb">M 13</p></td>
                        <td>
                            <p class="lab_m_sb">semibold</p>
                            <p class="lab_m_m">Medium</p>
                        </td>
                        <td>13px</td>
                        <td>100%</td>
                        <td>0.07px</td>
                    </tr>
                    <tr>
                        <td><p class="lab_s_sb">S 12</p></td>
                        <td>
                            <p class="lab_s_sb">semibold</p>
                            <p class="lab_s_m">Medium</p>
                        </td>
                        <td>12px</td>
                        <td>100%</td>
                        <td>0.07px</td>
                    </tr>
                    <tr>
                        <td><p class="lab_xs_sb">XS 11</p></td>
                        <td>
                            <p class="lab_xs_sb">semibold</p>
                            <p class="lab_xs_m">Medium</p>
                        </td>
                        <td>11px</td>
                        <td>100%</td>
                        <td>0.07px</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

<script>
    $(function(){
        $('.typo_table table p').click(function(){
            var copyText = $(this).text();//텍스트
            var copyClass = $(this).attr('class');//클래스

            window.navigator.clipboard.writeText(copyClass).then(() => {
                alert(copyClass + ' 클래스 복사 성공');
            });
        });
    });
</script>

<%@ include file="/WEB-INF/views/common/footer.jsp" %>