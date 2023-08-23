
var strMenuGubun = "1"; // 1: 요약, 2: 인구, 3:소득,4:대출,5:산업,6:지역경제,7:부동산,8:인프라
var pageHistory = [];
var objPage = {
    navbar : "elecmap"
    , side : "attack"
    , page : "/elecmap/attack"
};

var loginCheckInterval;
$(function() {
    $('html').removeClass('no-js');

    $(".navbar").click(function (){
        $(".navbar").removeClass('on');
        $(this).addClass('on');
        location.href = $(this).children().data().nav;
    });

});

function menuActive(navbar, side, url){
    objPage.navbar = navbar;
    objPage.side = side;
    objPage.page = url;
    objPage.id = side;
}

function fn_error(response) {
    console.log(response);
    console.log('error');
    loadingBar(false);

    $(".mem_nm").text("로그인");
    if(response.status == 403){
        alert("로그인 정보가 없습니다");
        logout();
    }else{
        alert("에러 발생 [관리자 문의]");
    }
}

function onlyBodyLoad(page){
    $("#onlyBody").load(page, pageLoad());
    history.pushState(objPage, null);
}


window.onpopstate = function (e) {
    $("#onlyBody").load(e.state.page, pageLoad());
    $(".sub_menuTab > ul > li").removeClass("active");
    $(".sub_menuTab").find("#"+e.state.side).addClass("active");
    sessionStorage.setItem("menu", e.state.side);
};

function menuMove(menu, id){
    if(common.isEmpty(sessionStorage.getItem("token"))){
        alert("로그인시 이용 가능한 페이지 입니다.");
        location.href= "/login"
        return;
    }
    if(menu == 'calendar' || menu == 'mypage' || menu == 'admin' || menu == 'statistics'){
        location.href = menu;
    }else{
        sessionStorage.setItem("menu", menu);
        location.href = "/elecmap";
    }
}




//------------------------- 상위메뉴 ---------------------------------------------------
//------------------------ 지역 선택 리스트 기능 START ----------------------------------------
var tmpadmiVal = 1;
function setAreaList(admGb,areaCd){
    var param = {};
    param.admGb = admGb;
    tmpadmiVal = admGb;
    param.areaCd = areaCd;
    getAjax("getAdmiList", "/agile/main/getAdmiList",param, fn_setArea, fn_error);
}
function fn_setArea(id, response, param) {
    var html = '';

    response.data.forEach(function (val, idx){
        html += '<option value="' + val.areaCd + '" data-areaCd="'+val.areaCd+'">' + val.areaNm + '</option>';
    });

    if(tmpadmiVal == 1){
        $("#area_mega").append(html);
    }else if(tmpadmiVal == 2){
        $("#area_cty").append(html);
    }else if(tmpadmiVal == 3){
        $("#area_admi").append(html);
    }
}
//------------------------ 지역 선택 리스트 기능 END ----------------------------------------
//------------------------ 업종 선택 리스트 기능 START ----------------------------------------
var tmpupjongVal = 1;
function setUpjongList(upjongType,upjongCd){
    var param = {};
    param.upjongType = upjongType;
    tmpupjongVal = upjongType;
    param.upjongCd = upjongCd;
    getAjax("getUpjongList", "/agile/main/getUpjongList",param, fn_setUpjong, fn_error);
}
function fn_setUpjong(id, response, param) {
    var html = '';

    response.data.forEach(function (val, idx){
        html += '<option value="' + val.upjongCd + '" data-areaCd="'+val.upjongCd+'">' + val.upjongNm + '</option>';
    });

    if(tmpupjongVal == 2){
        $("#upjong2").append(html);
    }else if(tmpupjongVal == 3){
        $("#upjong3").append(html);
    }
}
//------------------------ 업종 선택 리스트 기능 END ----------------------------------------
//------------------------ 날짜 선택 리스트 기능 START ----------------------------------------
function setDateList(dateType){
    var param = {};
    param.dateType = dateType;
    dateTypeNum = dateType;
    getAjax("getUpjongList", "/agile/main/getDateList",param, fn_setDate, fn_error);
}
function fn_setDate(id, response, param) {
    var html = '';
    //화면 초기화
    $('#startDate').children('option:not(:first)').remove();
    $('#endDate').children('option:not(:first)').remove();

    response.data.forEach(function (val, idx){
        var tmpdate = '';
        if(dateTypeNum != 1) {
            tmpdate = val.dateNm.substring(0, 4) + val.date
            // console.log(tmpdate);
        }else{
            tmpdate = val.date
        }
        html += '<option value="' + tmpdate + '" data-areaCd="'+tmpdate+'">' + val.dateNm + '</option>';
    });

    $("#startDate").append(html);
    $("#endDate").append(html);
}
//------------------------ 업종 선택 리스트 기능 END ----------------------------------------
//------------------------- 상위메뉴 ---------------------------------------------------


//------------------------- 하위메뉴 ---------------------------------------------------
//------------------------ 지역 선택 리스트 기능 START ----------------------------------------
var tmpadmiVal = 1;
function setAreaList_sub(admGb,areaCd){
    var param = {};
    param.admGb = admGb;
    tmpadmiVal = admGb;
    param.areaCd = areaCd;
    getAjax("getAdmiList", "/agile/main/getAdmiList",param, fn_setArea_sub, fn_error);
}
function fn_setArea_sub(id, response, param) {
    var html = '';

    response.data.forEach(function (val, idx){
        html += '<option value="' + val.areaCd + '" data-areaCd="'+val.areaCd+'">' + val.areaNm + '</option>';
    });

    if(tmpadmiVal == 1){
        $("#area_mega_2").append(html);
    }else if(tmpadmiVal == 2){
        $("#area_cty_2").append(html);
    }else if(tmpadmiVal == 3){
        $("#area_admi_2").append(html);
    }
}
//------------------------ 지역 선택 리스트 기능 END ----------------------------------------
//------------------------ 업종 선택 리스트 기능 START ----------------------------------------
var tmpupjongVal = 1;
function setUpjongList_sub(upjongType,upjongCd){
    var param = {};
    param.upjongType = upjongType;
    tmpupjongVal = upjongType;
    param.upjongCd = upjongCd;
    getAjax("getUpjongList", "/agile/main/getUpjongList",param, fn_setUpjong_sub, fn_error);
}
function fn_setUpjong_sub(id, response, param) {
    var html = '';

    response.data.forEach(function (val, idx){
        html += '<option value="' + val.upjongCd + '" data-areaCd="'+val.upjongCd+'">' + val.upjongNm + '</option>';
    });

    if(tmpupjongVal == 2){
        $("#upjong2_2").append(html);
    }else if(tmpupjongVal == 3){
        $("#upjong3_2").append(html);
    }
}
//------------------------ 업종 선택 리스트 기능 END ----------------------------------------
//------------------------ 날짜 선택 리스트 기능 START ----------------------------------------
function setDateList_sub(dateType){
    var param = {};
    param.dateType = dateType;
    dateTypeNum = dateType;
    getAjax("getUpjongList", "/agile/main/getDateList",param, fn_setDate_sub, fn_error);
}
function fn_setDate_sub(id, response, param) {
    var html = '';
    //화면 초기화
    $('#startDate_2').children('option:not(:first)').remove();
    $('#endDate_2').children('option:not(:first)').remove();

    response.data.forEach(function (val, idx){
        var tmpdate = '';
        if(dateTypeNum != 1) {
            tmpdate = val.dateNm.substring(0, 4) + val.date
        }else{
            tmpdate = val.date
        }
        html += '<option value="' + tmpdate + '" data-areaCd="'+tmpdate+'">' + val.dateNm + '</option>';
    });

    $("#startDate_2").append(html);
    $("#endDate_2").append(html);
}
//------------------------ 업종 선택 리스트 기능 END ----------------------------------------
//------------------------- 하위메뉴 ---------------------------------------------------


//------------------------ 메인 화면 검색 -----------------------------------------
function main_search(dataType,param){

    // 파라메터 값 없을 경우 리턴 처리
    // if(param.admGb == 2){
    //     console.log('중분류 업종이 선택되지 않았습니다.')
    // }
    // 파라메터 정상입력되었을 경우 데이터 URL 호출
    if(dataType == 1){
        getAjax("getUpjongList", "/agile/statistics/getOuteatList",param, fn_makechart, fn_error);
    }else if(dataType == 2){
        getAjax("getUpjongList", "/agile/statistics/getDeliveryList",param, fn_makechart, fn_error);
    }else if(dataType == 3){
        // getAjax("getUpjongList", "/agile/main/getDateList",param, fn_setDate, fn_error);
    }else if(dataType == 4){
        getAjax("getUpjongList", "/agile/statistics/getLiviList",param, fn_makechart, fn_error);
    }else if(dataType == 5){
        getAjax("getUpjongList", "/agile/statistics/getHousList",param, fn_makechart, fn_error);
    }else{
        alert('주제가 잘못 선택되었습니다. \n관리자에게 문의하시기 바랍니다.')
    }
}
//------------------------ 메인 화면 검색 -----------------------------------------

//------------------------ 메뉴초기화 ---------------------------------------
function reset_select(type){
    if(type == 1){
        if(searchType==0){
            $('#area_cty').children('option:not(:first)').remove();
            $('#area_admi').children('option:not(:first)').remove();
            admiCd = null;
            // areaCd = null;
        }else{
            $('#area_cty_2').children('option:not(:first)').remove();
            $('#area_admi_2').children('option:not(:first)').remove();
            admiCd_sub = null;
            // areaCd = null;
        }
    }else if(type == 2){
        // $('#upjong2').children('option:not(:first)').remove();
        if(searchType==0){
            $("#upjong2 option:eq(0)").prop("selected", true); //첫번째 option 선택
            $('#upjong3').children('option:not(:first)').remove();
            upjongCd = null;
        }else{
            $("#upjong2_2 option:eq(0)").prop("selected", true); //첫번째 option 선택
            $('#upjong3_2').children('option:not(:first)').remove();
            upjongCd_sub = null;
        }
    }else if(type == 3){
        if(searchType==0){
            $('#startDate').children('option:not(:first)').remove();
            $('#endDate').children('option:not(:first)').remove();
            startDate = null;
            endDate = null;
        }else{
            $('#startDate_2').children('option:not(:first)').remove();
            $('#endDate_2').children('option:not(:first)').remove();
            startDate_sub = null;
            endDate_sub = null;
        }
    }else if(type == 0){
        if(!settingCheck){
            if(searchType == 0){
                $('#area_cty').children('option:not(:first)').remove();
                $('#area_admi').children('option:not(:first)').remove();
                // $('#upjong2').children('option:not(:first)').remove();
                $("#upjong2 option:eq(0)").prop("selected", true); //첫번째 option 선택
                $('#upjong3').children('option:not(:first)').remove();
                $('#startDate').children('option:not(:first)').remove();
                $('#endDate').children('option:not(:first)').remove();
            }else{
                $('#area_cty_2').children('option:not(:first)').remove();
                $('#area_admi_2').children('option:not(:first)').remove();
                // $('#upjong2').children('option:not(:first)').remove();
                $("#upjong2_2 option:eq(0)").prop("selected", true); //첫번째 option 선택
                $('#upjong3_2').children('option:not(:first)').remove();
                $('#startDate_2').children('option:not(:first)').remove();
                $('#endDate_2').children('option:not(:first)').remove();
            }
        }
    }
}

function change_colType(type,check){
    var lng = [1,2,3,4,5];

    lng.forEach(function (val, idx){
        if(type == val){
            if(check){
                $("#colType"+val).css('display','block')
            }else{
                $("#colType"+val+"_2").css('display','block')
            }
        }else{
            if(check){
                $("#colType"+val).css('display','none')
            }else{
                $("#colType"+val+"_2").css('display','none')
            }
        }
    });
}


// 메인화면 그래프 생성
function fn_makechart(id, response, param){
    console.log(id);
    console.log(response);
    var maxVal = 0;
    var minVal = 0;
    var tmpVal = 0;
    var maxYyyymm = '';
    var minYyyymm = '';
    var tmpYyyymm = '';
    var tmpSel = $("#colType"+dataTypeNum+" option:selected").val();
    var tmpSel_sub = $("#colType"+dataTypeNum_sub+"_2 option:selected").val();

    //rpt_chart1
    var resultData = [];
    var resultName = [];
    if(!common.isEmpty(response.data[0])) {
        $.each(response.data,function(index,item){
            $.each(item,function(key,value) {
                if(key == 'yyyymm'){
                    tmpYyyymm = value;
                    resultName.push(value);
                }
                if(searchType == 0){
                    if(key == tmpSel){
                        tmpVal = value;
                        //결과 최대,최소값 데이터 추출
                        maxVal = Math.max(maxVal,tmpVal);
                        if(maxVal <= value){
                            maxYyyymm = tmpYyyymm;
                        }
                        if(index == 0) minVal = tmpVal;
                        minVal = Math.min(minVal,tmpVal);
                        if(minVal >= value){
                            minYyyymm = tmpYyyymm;
                        }
                        //-----------------------
                        resultData.push(value);
                    }
                }else{
                    if(key == tmpSel_sub){
                        resultData.push(value);
                    }
                }
            });
        });
        if(searchType == 0){
            console.log(maxYyyymm + ' : ' +maxVal);
            $('#maxYyyymm').text(maxYyyymm);
            $('#maxVal').text(common.addComma(maxVal));
            console.log(minYyyymm + ' : ' +minVal);
            $('#minYyyymm').text(minYyyymm);
            $('#minVal').text(common.addComma(minVal));
        }
    }
    // rpt_chart1
    var chartDom = null;
    if(searchType == 0){
        chartDom = document.getElementById("main_chart1");
    }else{
        chartDom = document.getElementById("main_chart2");
    }
    var rpt_chart1 = echarts.init(chartDom);

    var option = {
        xAxis: {
            type: 'category',
            data: resultName
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data:resultData,
                type: 'line',
                // markPoint: {
                //     data: [
                //         { type: 'max', name: 'Max' },
                //         { type: 'min', name: 'Min' }
                //     ]
                // },
                // markLine: {
                //     data: [{ type: 'average', name: 'Avg' }]
                // },
                label: {
                    show: true,
                    position: 'top',
                    formatter: function(c){
                        return  common.addComma(c.data);
                    }
                }
            }
        ],
        title: {
            text: '1상권의 특성',
            show: false,
        },
        tooltip: {
            show: true,
            //trigger: 'item',
            //formatter: function(params) {
            //	return params.name + '<br/>'
            //		+ params.marker + ' <b>' + params.value + '</b> %';
            //},
            //fontSize: 10
        },
        legend: {
            show: true,
            data: resultName,
            //orient: 'vartical',
            left: 'center',
            bottom: '0',
        },
    }

    rpt_chart1.setOption(option);
    rpt_chart1.resize();

}

// 시장동향 > 업종선택 시 그래프 생성
function fn_UpjongDetail(id, response, param){

    // console.log(response);

    //rpt_chart1(외식 총매출)
    var resultLabel = [];
    var resultData1 = [];
    var resultData2 = [];
    var resultData3 = [];
    var resultData4 = [];

    if(!common.isEmpty(response.data[0])) {
        $.each(response.data,function(index,item){
            // console.log(index);
            // console.log(item.yyyymm);
            // console.log(item.eSaleAmt);
            resultLabel.push(item.yyyymm);
            resultData1.push(item.eSaleAmt);
            resultData2.push(item.dSaleAmt);
            resultData3.push(item.storeCnt);
            resultData4.push(item.storeAmt);
        });
    }
    // rpt_chart1
    var chartDom = document.getElementById("market_chart01");
    var rpt_chart1 = echarts.init(chartDom);

    var option = {
        xAxis: {
            type: 'category',
            data: resultLabel
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data:resultData1,
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    formatter: function(c){
                        return  common.addComma(c.data);
                    }
                }
            }
        ],
        title: {
            text: '1상권의 특성',
            show: false,
        },
        tooltip: {
            show: true
        },
        legend: {
            show: true,
            data: resultLabel,
            left: 'center',
            bottom: '0',
        },
    }

    rpt_chart1.setOption(option);
    rpt_chart1.resize();

    // rpt_chart2
    var chartDom = document.getElementById("market_chart02");
    var rpt_chart2 = echarts.init(chartDom);

    var option = {
        xAxis: {
            type: 'category',
            data: resultLabel
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data:resultData2,
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    formatter: function(c){
                        return  common.addComma(c.data);
                    }
                }
            }
        ],
        title: {
            text: '1상권의 특성',
            show: false,
        },
        tooltip: {
            show: true
        },
        legend: {
            show: true,
            data: resultLabel,
            left: 'center',
            bottom: '0',
        },
    }

    rpt_chart2.setOption(option);
    rpt_chart2.resize();

    // rpt_chart3
    var chartDom = document.getElementById("market_chart03");
    var rpt_chart3 = echarts.init(chartDom);

    var option = {
        xAxis: {
            type: 'category',
            data: resultLabel
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data:resultData3,
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    formatter: function(c){
                        return  common.addComma(c.data);
                    }
                }
            }
        ],
        title: {
            text: '1상권의 특성',
            show: false,
        },
        tooltip: {
            show: true
        },
        legend: {
            show: true,
            data: resultLabel,
            left: 'center',
            bottom: '0',
        },
    }

    rpt_chart3.setOption(option);
    rpt_chart3.resize();

    // rpt_chart4
    var chartDom = document.getElementById("market_chart04");
    var rpt_chart4 = echarts.init(chartDom);

    var option = {
        xAxis: {
            type: 'category',
            data: resultLabel
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data:resultData4,
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    formatter: function(c){
                        return  common.addComma(c.data);
                    }
                }
            }
        ],
        title: {
            text: '1상권의 특성',
            show: false,
        },
        tooltip: {
            show: true
        },
        legend: {
            show: true,
            data: resultLabel,
            left: 'center',
            bottom: '0',
        },
    }

    rpt_chart4.setOption(option);
    rpt_chart4.resize();

}