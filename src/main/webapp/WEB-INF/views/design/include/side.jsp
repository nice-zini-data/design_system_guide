<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="side">
    <div class="sideTopLogo">
        <img src="/assets/images/nice_logo.svg" alt="나이스 로고"/>
        <p class="sideTit">Design System</p>
    </div>
    <div class="sideSearch">
        <div class="imgBox searchImg size20 iconBg icon_search"></div>
        <label for="sideSearch"></label>
        <input type="text" id="sideSearch" class="searchInput" placeholder="Search"/>
    </div>
    <div class="sideList">
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit toggleNone">
                <div class="size20 imgBox mr8 iconBg icon_home"></div>
                <p>디자인시스템 개요</p>
            </div>
        </div>
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit">
                <div class="size20 imgBox mr8 iconBg icon_document"></div>
                <p>Guidelines</p>
            </div>
            <ul class="sideListSub">
                <li data-name="Accessibility">Accessibility</li>
                <li data-name="Content">Content</li>
            </ul>
        </div>
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit">
                <div class="size20 imgBox mr8 iconBg icon_image"></div>
                <p>Foundation</p>
            </div>
            <ul class="sideListSub">
                <li data-name="Color">Color</li>
                <li data-name="Elevation">Elevation</li>
                <li data-name="Iconography">Iconography</li>
                <li data-name="Layout">Layout</li>
                <li data-name="Typography">Typography</li>
            </ul>
        </div>
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit">
                <div class="size20 imgBox mr8 iconBg icon_clip"></div>
                <p>Compornant</p>
            </div>
            <ul class="sideListSub">
                <li data-name="Accordion">Accordion</li>
                <li data-name="Avatar">Avatar</li>
                <li data-name="Badge">Badge</li>
                <li data-name="Banner">Banner</li>
                <li data-name="Buttons">Buttons</li>
                <li data-name="Card">Card</li>
                <li data-name="Dialog">Dialog</li>
                <li data-name="Input">Input</li>
                <li data-name="List">List</li>
                <li data-name="Navigations">Navigations</li>
                <li data-name="Overays">Overays</li>
                <li data-name="Slider">Slider</li>
                <li data-name="Table">Table</li>
                <li data-name="Tabs">Tabs</li>
            </ul>
        </div>
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit">
                <div class="size20 imgBox mr8 iconBg icon_ruler"></div>
                <p>Pattern</p>
            </div>
            <ul class="sideListSub">
                <li data-name="Confirmation">Confirmation</li>
                <li data-name="Forms">Forms</li>
                <li data-name="Graph, Charts">Graph, Charts</li>
                <li data-name="Map">Map</li>
                <li data-name="Modal">Modal</li>
                <li data-name="Search">Search</li>
            </ul>
        </div>
        <div class="sideListBox tabActive">
            <div class="sideListTit tabTit toggleNone">
                <div class="size20 imgBox mr8 iconBg icon_three_points"></div>
                <p>용어정의</p>
            </div>
        </div>
    </div>

    <div class="sideBottom">
        <div class="size20 imgBox mr8 iconBg icon_headphone"></div>
        <p>추가 요청</p>
    </div>
</div>