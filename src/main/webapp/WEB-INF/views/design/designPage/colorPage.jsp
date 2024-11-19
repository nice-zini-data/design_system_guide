<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/design/include/head.jsp" %>
<%@ include file="/WEB-INF/views/design/include/script.jsp" %>

<div class="wrap">

    <!--좌측 사이드 바-->
    <%@ include file="/WEB-INF/views/design/include/side.jsp" %>

    <div class="contInner">
        <div class="subTabChangeTab mb40">
            <div class="sideTabTitleBox mb40">
                <p class="sideTabTitle">Brand Colors</p>
                <p class="subCommonText">나이스지니데이타의 고유의 브랜드 경험을 전달하면서 서비스 전반의 일관성을 유지하는 것을 돕습니다.<br/>
                    이를 위해 Ultramarine blue를 기본으로 사용하면서 Family Service에서 추가/변경하여 사용할 수 있는 Theme Color를 제공합니다.</p>
            </div>
            <ul>
                <li class="active">Brand Colors</li>
                <li>Rainbow Colors</li>
                <li>컬러 사용 정책</li>
            </ul>
        </div>

        <div class="subPage subPageChange active">
            <div class="guide_box">
                <section class="pri_section">
                    <p class="tit_l_sb">Primary color</p>
                    <p class="txt_l_m gray_500 mb20">Ultramarine Blue를 프라이머리 컬러로 사용하는 서비스 테마를 기본으로 합니다.<br/>
                        브랜드 컬러에 따라 프라이머리 컬러를 재정의하여 사용할 수 있습니다. 또한, 제공되는 컬러 외에 추가하여 사용할 수 있습니다.</p>

                    <div class="pri_bg_500 color_vwBox">
                        <p class="mono_wh">
                            Ultramarine Blue 500<br/>
                            #3366FF
                            <span>기본 컬러</span>
                        </p>
                    </div>
                    <ul class="color_box">
                        <li class="">
                            <div class="pri_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="pri_30">#F7F9FF</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="pri_50">#EBF0FF</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="pri_100">#D4DFFF</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="pri_200">#B7C9FF</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="pri_300">#89A6FF</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="pri_400">#5D86FF</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="pri_500">#3366FF</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="pri_600">#2951CC</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="pri_700">#1E3C97</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="pri_800">#172D71</p>
                        </li>
                        <li class="">
                            <div class="pri_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="pri_900">#12245A</p>
                        </li>
                    </ul>

                    <p class="tit_l_sb mt80 mb20">Secondary color</p>
                    <div class="sec_bg_300 color_vwBox">
                        <p class="mono_wh mono_bk">
                            Light Blue 300<br/>
                            #2EB7E5
                            <span>서브 컬러</span>
                        </p>
                    </div>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="sec_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="sec_30">#F1FBFF</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="sec_50">#D8F5FF</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="sec_100">#A8E9FF</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="sec_200">#65D8FF</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="sec_300">#2EB7E5</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="sec_400">#2698BD</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="sec_500">#1F7D9D</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="sec_600">#19647D</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="sec_700">#124A5C</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="sec_800">#0E3744</p>
                        </li>
                        <li class="">
                            <div class="sec_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="sec_900">#0B2B36</p>
                        </li>
                    </ul>
                </section>
                <section>
                    <p class="tit_l_sb mt80 mb20">Mono</p>
                    <ul class="color_box">
                        <li class="">
                            <div class="mono_bg_wh">
                                <p class="">white</p>
                            </div>
                            <p class="mono_wh">#FFFFFF</p>
                        </li>
                        <li class="">
                            <div class="mono_bg_bk">
                                <p class="mono_wh">black</p>
                            </div>
                            <p class="mono_bk">#121212</p>
                        </li>
                    </ul>
                </section>
                <section class="mt100">
                    <p class="tit_l_sb mt80 mb20">Gray</p>
                    <ul class="color_box">
                        <li class="">
                            <div class="gray_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="gray_30">#F9F9F9</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="gray_50">#F1F1F1</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="gray_100">#DFDFDF</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="gray_200">#CACACA</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="gray_300">#A9A9A9</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="gray_400">#8C8C8C</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="gray_500">#737373</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="gray_600">#5C5C5C</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="gray_700">#444444</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="gray_800">#323232</p>
                        </li>
                        <li class="">
                            <div class="gray_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="gray_900">#282828</p>
                        </li>
                    </ul>
                </section>

            </div>
        </div>
        <div class="subPage subPageChange">
            <div class="guide_box">
                <section>
                    <p class="tit_l_sb mb20">Red</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="red_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="red_30">#FEF8F8</p>
                        </li>
                        <li class="">
                            <div class="red_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="red_50">#FDECEC</p>
                        </li>
                        <li class="">
                            <div class="red_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="red_100">#FBD6D6</p>
                        </li>
                        <li class="">
                            <div class="red_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="red_200">#F9BBBB</p>
                        </li>
                        <li class="">
                            <div class="red_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="red_300">#F58C8C</p>
                        </li>
                        <li class="">
                            <div class="red_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="red_400">#F05959</p>
                        </li>
                        <li class="">
                            <div class="red_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="red_500">#D93424</p>
                        </li>
                        <li class="">
                            <div class="red_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="red_600">#B4200B</p>
                        </li>
                        <li class="">
                            <div class="red_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="red_700">#871808</p>
                        </li>
                        <li class="">
                            <div class="red_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="red_800">#661206</p>
                        </li>
                        <li class="">
                            <div class="red_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="red_900">#510F05</p>
                        </li>
                    </ul>

                    <p class="tit_l_sb mb20">Orange</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="orange_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="orange_30">#FFFAF5</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="orange_50">#FFEEDD</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="orange_100">#FFDBB9</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="orange_200">#FFBD7E</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="orange_300">#FE8B1E</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="orange_400">#D37419</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="orange_500">#AE5F14</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="orange_600">#8B4C10</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="orange_700">#66380C</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="orange_800">#4C2A09</p>
                        </li>
                        <li class="">
                            <div class="orange_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="orange_900">#3D2107</p>
                        </li>
                    </ul>

                    <p class="tit_l_sb mb20">Yellow</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="yellow_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="yellow_30">#FFFBE5</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="yellow_50">#FFF3A2</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="yellow_100">#FFE156</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="yellow_200">#FFCC33</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="yellow_300">#D1A31C</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="yellow_400">#AE8714</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="yellow_500">#906F0F</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="yellow_600">#72580B</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="yellow_700">#534108</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="yellow_800">#3E3006</p>
                        </li>
                        <li class="">
                            <div class="yellow_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="yellow_900">#322605</p>
                        </li>
                    </ul>

                    <!--라임-->
                    <p class="tit_l_sb mb20">Lime</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="lime_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="lime_30">#F8FCEC</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="lime_50">#E9F6C6</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="lime_100">#CFEA80</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="lime_200">#B7D75B</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="lime_300">#99B44C</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="lime_400">#7F953F</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="lime_500">#697B34</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="lime_600">#54622A</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="lime_700">#3E491F</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="lime_800">#2E3517</p>
                        </li>
                        <li class="">
                            <div class="lime_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="lime_900">#242A12</p>
                        </li>
                    </ul>

                    <p class="tit_l_sb mb20">Green</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="green_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="green_30">#F4FDF9</p>
                        </li>
                        <li class="">
                            <div class="green_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="green_50">#D8F8EC</p>
                        </li>
                        <li class="">
                            <div class="green_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="green_100">#A1EED0</p>
                        </li>
                        <li class="">
                            <div class="green_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="green_200">#58E1AC</p>
                        </li>
                        <li class="">
                            <div class="green_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="green_300">#01D281</p>
                        </li>
                        <li class="">
                            <div class="green_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="green_400">#01A163</p>
                        </li>
                        <li class="">
                            <div class="green_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="green_500">#018552</p>
                        </li>
                        <li class="">
                            <div class="green_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="green_600">#016A41</p>
                        </li>
                        <li class="">
                            <div class="green_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="green_700">#004E30</p>
                        </li>
                        <li class="">
                            <div class="green_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="green_800">#003A24</p>
                        </li>
                        <li class="">
                            <div class="green_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="green_900">#002F1D</p>
                        </li>
                    </ul>

                    <p class="tit_l_sb mb20">Blue</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="blue_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="blue_30">#F6FAFD</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="blue_50">#E7F2FB</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="blue_100">#CDE4F6</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="blue_200">#A7CFF0</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="blue_300">#6CB0E6</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="blue_400">#3592DC</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="blue_500">#0175D1</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="blue_600">#015DA7</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="blue_700">#01447A</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="blue_800">#00335C</p>
                        </li>
                        <li class="">
                            <div class="blue_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="blue_900">#00294A</p>
                        </li>
                    </ul>

                    <!--Light Blue-->
                    <p class="tit_l_sb mb20">Light Blue</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="light_blue_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="light_blue_30">#F1FBFF</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="light_blue_50">#D8F5FF</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="light_blue_100">#A8E9FF</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="light_blue_200">#65D8FF</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="light_blue_300">#2EB7E5</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="light_blue_400">#2698BD</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="light_blue_500">#1F7D9D</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="light_blue_600">#19647D</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="light_blue_700">#124A5C</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="light_blue_800">#0E3744</p>
                        </li>
                        <li class="">
                            <div class="light_blue_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="light_blue_900">#0B2B36</p>
                        </li>
                    </ul>

                    <!--Cyan-->
                    <p class="tit_l_sb mb20">Cyan</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="cyan_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="cyan_30">#EDFEFF</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="cyan_50">#BFFBFF</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="cyan_100">#6CF5FF</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="cyan_200">#00DFEF</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="cyan_300">#00BBC8</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="cyan_400">#009BA7</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="cyan_500">#00808A</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="cyan_600">#00666E</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="cyan_700">#004B51</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="cyan_800">#00383C</p>
                        </li>
                        <li class="">
                            <div class="cyan_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="cyan_900">#002D31</p>
                        </li>
                    </ul>

                    <!--Pink-->
                    <p class="tit_l_sb mb20">Pink</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="pink_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="pink_30">#FFF7F9</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="pink_50">#FFEDF2</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="pink_100">#FFD3DF</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="pink_200">#FFB7CB</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="pink_300">#FF82A3</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="pink_400">#FF4372</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="pink_500">#DA2960</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="pink_600">#AF2053</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="pink_700">#82183E</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="pink_800">#63122F</p>
                        </li>
                        <li class="">
                            <div class="pink_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="pink_900">#4F0E26</p>
                        </li>
                    </ul>

                    <!--Purple-->
                    <p class="tit_l_sb mb20">Purple</p>
                    <ul class="color_box mb80">
                        <li class="">
                            <div class="purple_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="purple_30">#FCFAFF</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="purple_50">#F3EFFF</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="purple_100">#E3DAFF</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="purple_200">#D1C2FF</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="purple_300">#B39AFF</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="purple_400">#9775FF</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="purple_500">#7C51FF</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="purple_600">#6030EF</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="purple_700">#4723B1</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="purple_800">#351B85</p>
                        </li>
                        <li class="">
                            <div class="purple_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="purple_900">#2B156B</p>
                        </li>
                    </ul>

                    <p class="tit_l_sb mb20">Cool gray</p>
                    <ul class="color_box">
                        <li class="">
                            <div class="cool_gray_bg_30">
                                <p class="">30</p>
                            </div>
                            <p class="cool_gray_30">#FAFAFB</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_50">
                                <p class="">50</p>
                            </div>
                            <p class="cool_gray_50">#F1F1F3</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_100">
                                <p class="">100</p>
                            </div>
                            <p class="cool_gray_100">#DEDFE2</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_200">
                                <p class="">200</p>
                            </div>
                            <p class="cool_gray_200">#C7CAD1</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_300">
                                <p class="">300</p>
                            </div>
                            <p class="cool_gray_300">#A5A9B8</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_400">
                                <p class="">400</p>
                            </div>
                            <p class="cool_gray_400">#878CA0</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_500">
                                <p class="">500</p>
                            </div>
                            <p class="cool_gray_500">#6E7387</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_600">
                                <p class="">600</p>
                            </div>
                            <p class="cool_gray_600">#595C69</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_700">
                                <p class="">700</p>
                            </div>
                            <p class="cool_gray_700">#42444A</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_800">
                                <p class="">800</p>
                            </div>
                            <p class="cool_gray_800">#313236</p>
                        </li>
                        <li class="">
                            <div class="cool_gray_bg_900">
                                <p class="">900</p>
                            </div>
                            <p class="cool_gray_900">#27282A</p>
                        </li>
                    </ul>

                </section>

                <section class="rainbowTable">
                    <p class="tit_m_sb mb20 mt80">색상 대비표</p>
                    <table>
                        <tr>
                            <th>30</th>
                            <th>50</th>
                            <th>100</th>
                            <th>200</th>
                            <th>300</th>
                            <th>400</th>
                            <th>500</th>
                            <th>600</th>
                            <th>700</th>
                            <th>800</th>
                            <th>900</th>
                        </tr>
                        <tr>
                            <td>1.04</td>
                            <td>1.13</td>
                            <td>1.34</td>
                            <td>1.64</td>
                            <td>2.34</td>
                            <td>3.34</td>
                            <td>4.69</td>
                            <td>6.69</td>
                            <td>9.85</td>
                            <td>12.88</td>
                            <td>14.74</td>
                        </tr>
                    </table>
                </section>
            </div>
        </div>
        <div class="subPage subPageChange">
            <div class="guide_box">
                <section>
                    <p class="color_tit">Text</p>
                    <ul class="color_box policy_text">
                        <li>
                            <div class="mono_bg_bk">
                                <p class="mono_wh">Text 1</p>
                            </div>
                            <p class="">Mono/Black <span class="mono_bk">#121212</span></p>
                        </li>
                        <li>
                            <div class="gray_bg_900">
                                <p class="mono_wh">Text 2</p>
                            </div>
                            <p class="">Gray/900 <span class="gray_900">#282828</span></p>
                        </li>
                        <li>
                            <div class="gray_bg_800">
                                <p class="mono_wh">Text 3</p>
                            </div>
                            <p class="">Gray/800 <span class="gray_800">#323232</span></p>
                        </li>
                        <li>
                            <div class="gray_bg_600">
                                <p class="mono_wh">Text 4</p>
                            </div>
                            <p class="">Gray/600 <span class="gray_600">#5C5C5C</span></p>
                        </li>
                        <li>
                            <div class="gray_bg_400">
                                <p class="mono_wh">Text 5</p>
                            </div>
                            <p class="">Gray/400 <span class="gray_400">#8C8C8C</span></p>
                        </li>
                        <li>
                            <div class="gray_bg_300">
                                <p class="mono_bk">Text 6</p>
                            </div>
                            <p class="">Gray/300 <span class="gray_300">#A9A9A9</span></p>
                        </li>
                        <li>
                            <div class="mono_bg_wh">
                                <p class="mono_bk">Text 7</p>
                            </div>
                            <p class="">Mono/white <span class="">#FFFFFF</span></p>
                        </li>
                    </ul>

                    <ul class="color_box policy_text mt30">
                        <li>
                            <div class="orange_bg_300">
                                <p class="mono_wh">Warning</p>
                            </div>
                            <p class="">Warning<span class="orange_300">#FE8B1E</span></p>
                        </li>
                        <li>
                            <div class="green_bg_400">
                                <p class="mono_wh">Positive</p>
                            </div>
                            <p class="">Positive<span class="green_400">#01A163</span></p>
                        </li>
                        <li>
                            <div class="red_bg_500">
                                <p class="mono_wh">Negative</p>
                            </div>
                            <p class="">Negative<span class="red_500">#D93424</span></p>
                        </li>
                        <li>
                            <div class="cool_gray_bg_500">
                                <p class="mono_wh">Paused</p>
                            </div>
                            <p class="">Paused<span class="cool_gray_500">#6E7387</span></p>
                        </li>
                        <li>
                            <div class="pri_bg_500">
                                <p class="mono_wh">Informative</p>
                            </div>
                            <p class="">Informative<span class="pri_500">#3366FF</span></p>
                        </li>
                    </ul>
                </section>
                <section class="mt160 policy_text">
                    <p class="color_tit">component</p>
                    <p class="color_tit03">Background</p>
                    <ul class="color_box">
                        <li>
                            <div class="mono_bg_wh">
                                <p>Background 1</p>
                            </div>
                            <p class="">#FFFFFF</p>
                        </li>
                        <li>
                            <div class="gray_bg_30">
                                <p>Background 2</p>
                            </div>
                            <p class="">#F9F9F9</p>
                        </li>
                    </ul>
                    <p class="color_tit03 mt80">Divider</p>
                    <ul class="color_box">
                        <li>
                            <div class="gray_bg_50">
                                <p>Divider 1</p>
                            </div>
                            <p class="">#F1F1F1</p>
                        </li>
                        <li>
                            <div class="gray_bg_100">
                                <p>Divider2</p>
                            </div>
                            <p class="">#DFDFDF</p>
                        </li>
                    </ul>
                    <p class="color_tit03 mt80">Line</p>
                    <ul class="color_box">
                        <li>
                            <div class="line1">
                                <p>Inactive Line 1</p>
                            </div>
                            <p class="">#F1F1F1</p>
                        </li>
                        <li>
                            <div class="line2">
                                <p>Inactive Line 2</p>
                            </div>
                            <p class="">#DFDFDF</p>
                        </li>
                        <li>
                            <div class="line_pri_300">
                                <p>Active Line</p>
                            </div>
                            <p class="">#89A6FF</p>
                        </li>
                    </ul>
                    <p class="color_tit03 mt80">Icon</p>
                    <ul class="color_box">
                        <li>
                            <div class="gray_bg_800">
                                <p class="mono_wh">Line Icon</p>
                            </div>
                            <p class="">#323232</p>
                        </li>
                        <li>
                            <div class="gray_bg_700">
                                <p class="mono_wh">Solid Icon</p>
                            </div>
                            <p class="">#444444</p>
                        </li>
                        <li>
                            <div class="gray_bg_600">
                                <p class="mono_wh">Default</p>
                            </div>
                            <p class="">#5C5C5C</p>
                        </li>
                        <li>
                            <div class="mono_bg_wh">
                                <p>White</p>
                            </div>
                            <p class="">#FFFFFF</p>
                        </li>
                    </ul>
                </section>
                <section class="mt160">
                    <p class="color_tit">Semantic</p>
                    <p class="color_txt mb40">특정 목적이나 특징을 암시하는 색상입니다. 주로 텍스트 및 아이콘에 사용되는 컬러입니다.<br/>
                        각 기능에 일관된 색상을 부여하여 사용자가 쉽게 기능을 인식할 수 있도록 역할별 색상을 제공합니다.
                    </p>
                    <ul class="color_box policy_text mt30 mb30">
                        <li>
                            <div class="orange_bg_300">
                                <p class="mono_wh">Warning</p>
                            </div>
                            <p class="">Warning<span class="orange_300">#FE8B1E</span></p>
                        </li>
                        <li>
                            <div class="green_bg_400">
                                <p class="mono_wh">Positive</p>
                            </div>
                            <p class="">Positive<span class="green_400">#01A163</span></p>
                        </li>
                        <li>
                            <div class="red_bg_500">
                                <p class="mono_wh">Negative</p>
                            </div>
                            <p class="">Negative<span class="red_500">#D93424</span></p>
                        </li>
                        <li>
                            <div class="cool_gray_bg_500">
                                <p class="mono_wh">Paused</p>
                            </div>
                            <p class="">Paused<span class="cool_gray_500">#6E7387</span></p>
                        </li>
                        <li>
                            <div class="pri_bg_500">
                                <p class="mono_wh">Informative</p>
                            </div>
                            <p class="">Informative<span class="pri_500">#3366FF</span></p>
                        </li>
                        <li>
                            <div class="gray_bg_100">
                                <p class="mono_wh">Disabled</p>
                            </div>
                            <p class="">Disabled<span class="gray_100">#DFDFDF</span></p>
                        </li>
                    </ul>
                    <ul class="color_list_text">
                        <li class="flex">
                            <p class="green_300"><span class="green_bg_300"></span>긍정</p>
                            <p>긍정적인 피드백을 제공하는 데 사용되는 색상입니다. 일반적으로 Green 음영이 사용됩니다.</p>
                        </li>
                        <li class="flex">
                            <p class="red_500"><span class="red_bg_500"></span>부정</p>
                            <p>부정적인 피드백을 제공하거나 위험한 행동을 암시하는 데 사용되는 색상입니다. 일반적으로 Red 음영이 사용됩니다.</p>
                        </li>
                        <li class="flex">
                            <p class="cool_gray_500"><span class="cool_gray_bg_500"></span>중립</p>
                            <p>중립을 나타내는 피드백을 제공하는데 사용되는 색상입니다.</p>
                        </li>
                        <li class="flex">
                            <p class="orange_300"><span class="orange_bg_300"></span>경고</p>
                            <p>경고성 피드백을 제공하는 데 사용되는 색상입니다. 일반적으로 Orange 음영이 사용됩니다.</p>
                        </li>
                        <li class="flex">
                            <p class="pri_500"><span class="pri_bg_500"></span>정보</p>
                            <p>정보성 메시지와 링크 텍스트에 사용되는 색상입니다. Primary 음영이 사용됩니다.</p>
                        </li>
                        <li class="flex">
                            <p class="gray_100"><span class="gray_bg_100"></span>비활성화</p>
                            <p>비활성화 상태를 표현하는 색상입니다. 일반적으로 Gray 200이 사용되며, 경우에 따라 Gray 100~300을 혼합하여 사용합니다.</p>
                        </li>
                    </ul>
                </section>
                <section>
                    <p class="color_tit">Contents</p>
                    <p class="color_txt mb40">그래프, 배너, 그래픽 요소 등의 콘텐츠에 사용되는 컬러입니다. 규정된 색상을 사용하는 것을 권장하며, 다른 색상이 필요할 경우 Rainbow Color 내에서 추출해 사용합니다.</p>
                    <ul class="color_box mt30 mb30 color_w10_box">
                        <li>
                            <div class="pri_bg_500">
                                <p class="mono_wh">Contents1</p>
                            </div>
                            <span class="">#3366FF</span>
                        </li>
                        <li>
                            <div class="pri_bg_700">
                                <p class="mono_wh">Contents 2</p>
                            </div>
                            <span class="">#1E3C97</span>
                        </li>
                        <li>
                            <div class="green_bg_300">
                                <p class="">Contents 3</p>
                            </div>
                            <span class="">#01D281</span>
                        </li>
                        <li>
                            <div class="cyan_bg_200">
                                <p class="">Contents4</p>
                            </div>
                            <span class="">#00DFEF</span>
                        </li>
                        <li>
                            <div class="sec_bg_300">
                                <p class="">Contents5</p>
                            </div>
                            <span class="">#2EB7E5</span>
                        </li>
                        <li>
                            <div class="blue_bg_400">
                                <p class="">Contents6</p>
                            </div>
                            <span class="">#3592DC</span>
                        </li>
                        <li>
                            <div class="purple_bg_300">
                                <p class="">Contents7</p>
                            </div>
                            <span class="">#B39AFF</span>
                        </li>
                        <li>
                            <div class="pink_bg_300">
                                <p class="">Contents8</p>
                            </div>
                            <span class="">#FF82A3</span>
                        </li>
                        <li>
                            <div class="yellow_bg_200">
                                <p class="">Contents9</p>
                            </div>
                            <span class="">#FFCC33</span>
                        </li>
                        <li>
                            <div class="lime_bg_200">
                                <p class="">Contents10</p>
                            </div>
                            <span class="">#B7D75B</span>
                        </li>

                    </ul>
                </section>
            </div>
        </div>
    </div>
<script>
    $(function (){
        $('.subTabChangeTab ul li').click(function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var idx = $('.subTabChangeTab ul li').index(this);

            $('.subPageChange').removeClass('active');
            $('.subPageChange').eq(idx).addClass('active');


            var tabLi = $('.subTabChangeTab ul li');
            if(tabLi.eq(0).hasClass('active')){
                $('.sideTabTitleBox .sideTabTitle').text('Brand Colors');
                $('.sideTabTitleBox .subCommonText').html(`나이스지니데이타의 고유의 브랜드 경험을 전달하면서 서비스 전반의 일관성을 유지하는 것을 돕습니다.
                <br/>이를 위해 Ultramarine blue를 기본으로 사용하면서 Family Service에서 추가/변경하여 사용할 수 있는 Theme Color를 제공합니다.`);

            }else if(tabLi.eq(1).hasClass('active')){
                $('.sideTabTitleBox .sideTabTitle').text('Rainbow Colors');
                $('.sideTabTitleBox .subCommonText').html(`레인보우 컬러는 LEONARDOCOLOR.IO의 COLOR SCALES 를 참조하며, 필요할 경우에는 색상을 조정해 사용하되 되도록 수정하지 않는 것을 권장합니다.
                 <br/>각 색상별 대비는 문서 하단의 색상 대비표를 참고하여 설정합니다.`);

            }else if(tabLi.eq(2).hasClass('active')){
                $('.sideTabTitleBox .sideTabTitle').text('컬러 사용 정책');
                $('.sideTabTitleBox .subCommonText').text('');

            }else{

            }
        });

        //copy - 배경 색상
        $('.color_box > li > div').click(function(){
            var copyClass = $(this).attr('class');//클래스

            window.navigator.clipboard.writeText(copyClass).then(() => {
                alert(copyClass + ' 클래스 복사 성공');
            });
        });

        //copy - 폰트 색상
        $('.color_box > li > p').click(function(){
            var copyText = $(this).text();//텍스트
            var copyClass = $(this).attr('class');//클래스

            window.navigator.clipboard.writeText(copyClass).then(() => {
                alert(copyClass + ' 클래스 복사 성공');
            });
        });
    });
</script>

<%@ include file="/WEB-INF/views/design/include/footer.jsp" %>