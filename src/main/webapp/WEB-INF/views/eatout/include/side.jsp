<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<div class="side_tab">
    <div class="side_logo" onclick="location.href='/'">
        <img src="/eatout/assets/eatout/images/logo/logo.svg" alt="Kingmaker 로고"/>
    </div>
    <ul class="side_listBox">
        <li onclick="location.href='/'">
            <div class="side_img">
                <img src="/eatout/assets/eatout/images/icon/home.svg" alt="MY 홈"/>
            </div>
            <p class="txt_l_m">MY 홈</p>
        </li>
        <li onclick="menuMove('attack');">
            <div class="side_img">
                <img src="/eatout/assets/eatout/images/icon/map.svg" alt="유권자 지도"/>
            </div>
            <p class="txt_l_m">유권자 지도</p>
        </li>
        <li onclick="menuMove('statistics');">
            <div class="side_img">
                <img src="/eatout/assets/eatout/images/icon/insert_chart.svg" alt="선거 통계"/>
            </div>
            <p class="txt_l_m">선거 통계</p>
        </li>
        <li onclick="menuMove('calendar');">
            <div class="side_img">
                <img src="/eatout/assets/eatout/images/icon/date_range.svg" alt="선거 캘린더"/>
            </div>
            <p class="txt_l_m">선거 캘린더</p>
        </li>
        <li onclick="location.href=''" style="display: none">
            <div class="side_img">
                <img src="/eatout/assets/eatout/images/icon/edit.svg" alt="연관어 분석"/>
            </div>
            <p class="txt_l_m">연관어 분석</p>
        </li>
        <li onclick="menuMove('mypage');">
            <div class="side_img">
                <img src="/eatout/assets/eatout/images/icon/perm_identity.svg" alt="마이페이지"/>
            </div>
            <p class="txt_l_m">마이페이지</p>
        </li>
        <li onclick="menuMove('admin');" style="display: none" class="admin_page">
            <div class="side_img">
                <img src="/eatout/assets/eatout/images/icon/settings.svg" alt="관리자페이지"/>
            </div>
            <p class="txt_l_m">관리자페이지</p>
        </li>
    </ul>
</div>


