<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="side">
    <div class="sideTopLogo">
        <img src="/assets/images/nice_logo.svg" alt="나이스 로고"/>
    </div>

    <div class="sideList">
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit">
                <div class="size20 imgBox mr8 iconBg icon_document"></div>
                <p>eChart</p>
            </div>
            <ul class="sideListSub">
                <li onclick=menuMove("/echart/eChart")>eChart</li>
                <li onclick=menuMove("/echart/barChart")>barChart</li>
            </ul>
        </div>
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit">
                <div class="size20 imgBox mr8 iconBg icon_document"></div>
                <p>Tag</p>
            </div>
            <ul class="sideListSub">
                <li onclick=menuMove("/tag/table")>Table</li>
                <li onclick=menuMove("/tag/colorPage")>Color</li>
                <li onclick=menuMove("/tag/layoutPage")>Layout</li>
                <li onclick=menuMove("/tag/typography")>Typography</li>
                <li onclick=menuMove("/tag/button")>Button</li>
            </ul>
        </div>
    </div>

</div>