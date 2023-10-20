<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>

<div class="wrap main">
    <%@ include file="/WEB-INF/views/eatout/include/navbar.jsp" %>
    <script>
        $(function(){
            $('.navList li:nth-child(4)').addClass('active');
            $('.navList li:nth-child(4) img').attr({src:'/eatout/assets/eatout/images/icon/tab04_icon_on.svg'})


            $('.calc_com_tab').click(function(){
                $(this).parent().toggleClass('active');

                if($('.calc_section01').hasClass('active')){
                    $('.calc_tab01 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon01_on.svg')
                }else{
                    $('.calc_tab01 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon01_off.svg')
                }

                if($('.calc_section02').hasClass('active')){
                    $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_on.svg')
                }else{
                    $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_bk.svg')
                }

            });

            $('.calc_section01 .calc_btnBox button').click(function(){
                $('.calc_section02').removeClass('disabled');
                $('.calc_section02').addClass('active');

                if($('.calc_section02').hasClass('active')){
                    $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_on.svg')
                }else{
                    $('.calc_tab02 img').attr('src','/eatout/assets/eatout/images/icon/calc_tab_icon02_bk.svg')
                }
            });
        });

    </script>
<!--
*공통*
로그인 전 / 후 구분
class = "login_none" 제거 및 추가
-->
    <div class="com_gridInner">
        <div class="calc_container">
            <div class="calcBox">
                <p class="calcTit">창업 비용 계산기</p>
                <p class="calc_sText">세부 정보를 정확하게 입력할수록 더 정확한 결과 값을 얻을 수 있습니다.</p>

                <section class="calc_content calc_section01">
                    <div class="calc_tab01 calc_com_tab">
                        <img src="/eatout/assets/eatout/images/icon/calc_tab_icon01_off.svg" alt="비용 입력 아이콘"/>
                        <p class="calc_tab_text">비용 입력</p>
                    </div>

                    <div class="calc_inner">
                        <div class="calc_inner_cont">
                            <p class="calc_in_tit01">물건정보</p>
                            <table class="w4_table">
                                <tr>
                                    <th>임대 면적</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>평</span>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>m²</span>
                                    </td>
                                    <th>실 면적</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>평</span>
                                        <input type="text" class="calc_input disabled" placeholder="0"/> <span>m²</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="calc_inner_cont">
                            <p class="calc_in_tit01">초기 투자비용</p>
                            <table class="w4_table">
                                <tr>
                                    <th>권리금</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                    </td>
                                    <th>보증금</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>기타 투자비 <span>설비, 인테리어, 교육비, 가맹비 등</span></th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                    </td>
                                    <th>리뉴얼 예상기간 <span>감가상각</span></th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>대출금 / 이자</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                        <span class="g4_col">/</span>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>%</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="calc_inner_cont">
                            <p class="calc_in_tit02">월 운영비용</p>
                            <table class="w4_table">
                                <tr>
                                    <th>월세</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                    </td>
                                    <th>인건비</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>재료비</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                    </td>
                                    <th>기타비용<span>공과잡비 등</span></th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="calc_inner_cont">
                            <p class="calc_in_tit02">객단가</p>
                            <table class="w4_table">
                                <tr>
                                    <th>객단가</th>
                                    <td>
                                        <input type="text" class="calc_input" placeholder="0"/> <span>만원</span>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="calc_btnBox">
                            <div>
                                <button type="reset" class="wh_btn">입력 초기화</button>
                            </div>
                            <div>
                                <button type="submit" class="bk_btn">입력 완료</button>

                                <!--수정 버튼-->
<%--                                <button type="button" class="bk_btn">수정</button>--%>

                                <!--수정 완료 버튼-->
<%--                                <button type="reset" class="wh_btn">취소</button>--%>
<%--                                <button type="button" class="pr_btn">수정 완료</button>--%>

                            </div>
                        </div>

                    </div>
                </section>

                <section class="calc_content calc_section02 disabled "><!--disabled-->
                    <div class="calc_tab02 calc_com_tab ">
                        <img src="/eatout/assets/eatout/images/icon/calc_tab_icon02_bk.svg" alt="비용 입력 아이콘"/>
                        <p class="calc_tab_text">수익성 시뮬레이션</p>
                    </div>

                    <div class="calc_inner">
                        <div class="calc_inner_cont">
                            <p class="calc_in_tit01">예상 창업 비용 분석 결과</p>

                            <div class="calc02_gBox mb64">
                                <div class="flex">
                                    <div>
                                        <p class="calc_in_tit02">월 고정 비용 <span>소계 <span>960</span> 만원</span></p>
                                        <ul class="calc02_ul">
                                            <li>
                                                <p>월세</p>
                                                <p><span>0</span> 만원</p>
                                            </li>
                                            <li>
                                                <p>인건비</p>
                                                <p><span>0</span> 만원</p>
                                            </li>
                                            <li>
                                                <p>초기투자비에 대한 월 발생비용</p>
                                                <p><span>0</span> 만원</p>
                                            </li>
                                            <li>
                                                <p>기타비용</p>
                                                <p><span>0</span> 만원</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p class="calc_in_tit02">월 변동 비용 <span>소계 <span>960</span> 만원</span></p>
                                        <ul class="calc02_ul">
                                            <li>
                                                <p>재료비</p>
                                                <p><span>0</span> 만원</p>
                                            </li>
                                            <li>
                                                <p>인건비 (변동인력)</p>
                                                <p><span>0</span> 만원</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="mt40">
                                    <p class="calc_in_tit02">총 비용</p>
                                    
                                    <table class="pr_table">
                                        <colgroup>
                                            <col width="50%"/>
                                            <col width="50%"/>
                                        </colgroup>
                                        <tr>
                                            <th>총 비용 (세전)</th>
                                            <th>총 비용 (세후) = 손익분기점</th>
                                        </tr>
                                        <tr>
                                            <td><span class="bk_col">0</span> 만원</td>
                                            <td><span class="pr_col">960</span> 만원</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                            <p class="calc_in_tit01">사업타당성 지표</p>
                            <p class="calc_in_tit03">입력하신 초기투자 비용과 월 운영비용을 기준으로 수익성을 분석/진단한 결과, <span>일 평균 32만원, 22명의 고객</span>을 유치하여 <span>월 960만원의 매출</span>을 올리는 지점이 사업타당성 판단 지표인 것으로 분석되었습니다.</p>

                            <div class="w3_gBox">
                                <div>
                                    <p>일 평균 매출</p>
                                    <p><span>32</span> 만원</p>
                                </div>
                                <div>
                                    <p>일 평균 고객 수</p>
                                    <p><span>22</span> 명</p>
                                </div>
                                <div>
                                    <p>월 평균 매출</p>
                                    <p><span>960</span> 만원</p>
                                </div>
                            </div>

                            <table class="pr_table prt_v2">
                                <colgroup>
                                    <col width="22%"/>
                                    <col width="26%"/>
                                    <col width="26%"/>
                                    <col width="26%"/>
                                </colgroup>
                                <tr>
                                    <th></th>
                                    <th>손익분기점</th>
                                    <th>사업타당성 지표<br/>(투자비 대비월 3% 수익률)</th>
                                    <th>2년 내 투자비 회수<br/>(투자비 대비월 4.2% 수익률)</th>
                                </tr>
                                <tr>
                                    <td>월 목표 매출</td>
                                    <td>0만원</td>
                                    <td>0만원</td>
                                    <td>0만원</td>
                                </tr>
                                <tr>
                                    <td>일 목표 매출 <span>* 30일 기준</span></td>
                                    <td>0만원</td>
                                    <td>0만원</td>
                                    <td>0만원</td>
                                </tr>
                                <tr>
                                    <td>일 목표 고객 수 <span>* 30일 기준</span></td>
                                    <td>0명</td>
                                    <td>0명</td>
                                    <td>0명</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </section>
                <div class="calc_fb_text">
                    <img src="/eatout/assets/eatout/images/icon/line_icon.svg" alt=""/>
                    <p>본 계산기는 참고용 이므로 실제 결과와 상이할 수 있습니다.</p>
                </div>
            </div>
        </div>
    </div>
</div>


