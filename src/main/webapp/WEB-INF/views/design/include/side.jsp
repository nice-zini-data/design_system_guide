<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="side">
    <div class="sideTopLogo">
        <img src="/assets/images/nice_logo.svg" alt="나이스 로고"/>
    </div>

    <div class="sideList">
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit">
                <div class="size20 imgBox mr8 iconBg icon_document"></div>
                <p>Chart</p>
            </div>
            <ul class="sideListSub">
                <li onclick="location.href='/design/designPage/eChartOption'">eChart</li>
            </ul>
        </div>
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit">
                <div class="size20 imgBox mr8 iconBg icon_document"></div>
                <p>Tag</p>
            </div>
            <ul class="sideListSub">
                <li onclick="location.href='/design/designPage/table'">Table</li>
                <li onclick="location.href='/design/designPage/colorPage'">Color</li>
                <li onclick="location.href='/design/designPage/layoutPage'">Layout</li>
                <li onclick="location.href='/design/designPage/typography'">Typography</li>
                <li onclick="location.href='/design/designPage/button'">Button</li>
            </ul>
        </div>
    </div>

</div>