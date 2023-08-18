
function setChart(response){

    $("#stat_chartChange2 > .txt_n_sb").each(function (){
        if($(this).hasClass("sec_defaultBtn")){
            $(".vote_rate").text($(".selectTit.cty").children('span').text() + " " + $(this).children('span').text());
        }
    });

    strResponse = response;

    if(strVoteGubun == "per"){
        $(".vote_detail").text('[단위 : %]');
        $(".result_detail").text('[중앙선거관리위원회 선거통계시스템, 단위: %]');
        $('.st_title0612_01').text('투표소별 투표율');
        $('.st_title0612_02').text('후보자별 득표율');
    }else{
        $(".vote_detail").text('[단위 : 표]');
        $(".result_detail").text('[중앙선거관리위원회 선거통계시스템, 단위: 표]');
        $('.st_title0612_01').text('투표소별 투표 수');
        $('.st_title0612_02').text('후보자별 득표 수');
    }

    if($('#stat_chartChange button:first-child').hasClass('sec_defaultBtn')){

        if(strVoteGubun == "per"){
            $('.st_title0612_01').text('읍면동별 투표율');
            $('.st_title0612_03').text('읍면동별 개표 결과')
        }else{
            $('.st_title0612_01').text('읍면동별 투표 수');
            $('.st_title0612_03').text('읍면동별 개표 결과')
        }
    }else{
        if(strVoteGubun == "per"){
            $('.st_title0612_03').text('투표소별 개표 결과')
        }else{
            $('.st_title0612_03').text('투표소별 개표 결과')
        }
    }

    response.voteResponse.forEach(function (val, idx){
        $(".elec_"+val.dangGbn).text(val.dangName);
    });

    var data = [];
    var voteMemCnt = 0;
    var voteCnt = 0;
    var voteRateAvg = 0;
    response.voteRate.forEach(function (val, idx){
        voteMemCnt += Number(val.voteMemCnt);
        voteCnt += Number(val.voteCnt);
    });
    voteRateAvg = ((voteCnt/voteMemCnt)).toFixed(2);

    /*21대 국회의원선거 영등포구갑 투표율*/
    var stat_chart01 = document.getElementById('stat_chart01');
    var stat_myChart_01 = echarts.init(stat_chart01);

    option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '70%'],
                radius: '100%',
                min: 0,
                max: 1,
                splitNumber: {
                    show:false
                },
                axisLine: {
                    lineStyle: {
                        width: 11,
                        color: [
                            [0.25, '#98B5FF'],
                            [0.5, '#2B77F1'],
                            [0.75, '#0041C3'],
                            [1, '#D9D9D9']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 15,
                    offsetCenter: [0, '-70%'],
                    itemStyle: {
                        color: '#0041C3'
                    }
                },
                axisTick: {
                    show:false
                },
                splitLine: {
                    show:false
                },
                axisLabel: {
                    show:false
                },
                title: {
                    offsetCenter: [0, '-15%'],
                    fontSize: 20,
                    textStyle:{
                        fontWeight:'600',
                        fontFamily:'Pretendard',
                        fontSize:'14',
                    }
                },
                detail: {
                    fontSize: 20,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value * 100) + '%';
                    },
                    color: '#121212'
                },
                data: [
                    {
                        value: voteRateAvg,
                        name: $(".selectTit.cty").children('span').text() + '\n 투표율'
                    }
                ]
            }
        ]
    };

    option && stat_myChart_01.setOption(option);
    new ResizeObserver(() => stat_myChart_01.resize()).observe(stat_chart01);


    /*해당선거구 투표율 상세*/
    var label = [];
    var data = [];
    var voteRateAvg = 0;
    response.voteRate.forEach(function (val, idx){
        label.push(val.pollName);
        if(strVoteGubun == "per"){
            data.push(val.voteRate);
        }else{
            data.push(val.voteCnt);
        }
    });

    var html = "";
    label.forEach(function(val,idx){
        html += '<p className="txt_n_sb" style="font-size: 14px;font-weight: 700;line-height: 120%;color: var(--mono_g9);">' + val + '</p>';
    });
    $(".stat_chart01_01_box.stat_chart02_01Box").find(".stat_chart01_01_txtCont").html(html);
    $(".stat_chart01_01_box.stat_chart02_01Box").find(".stat_chart01_01_txtCont > p").css("height", "calc(100% / "+label.length+")");
    $(".stat_chart02_01Box > .stat_chart01_01_txtCont").css("height", (76*label.length) +"px");
    $("#stat_chart01_01").css("height", (76*label.length) +"px");

    var stat_chart01_01 = document.getElementById('stat_chart01_01');
    var stat_myChart_01_01 = echarts.init(stat_chart01_01);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {show:false},
        grid: {
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
        },
        xAxis: {
            type: 'value',
            xisLabel: {
                show: false
            },
            axisLine: {
                show:false,
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false,
            },
        },
        yAxis: {
            type: 'category',
            data: label,
            xisLabel: {
                show: false
            },
            axisLine: {
                show:false,
            },
            axisTick: {
                show: false
            },
            inverse:true,
            axisLabel: {
                show: false,
            },

        },
        series: [
            {
                name: '해당선거구 투표율 상세',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    position:'insideRight',
                    fontWeight:'600',
                    offset:[-20,0],
                    fontFamily: 'Pretendard',
                    fontSize: '14',
                    align: 'center',
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    },
                },
                emphasis: {
                    focus: 'series'
                },
                data: data,
                showBackground: true,
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                itemStyle: {
                    color: '#005EE7',
                    barBorderRadius: [4, 4, 4, 4],
                    emphasis:{
                        color:'#005EE7'
                    }
                },
                barWidth: '20px',
            }
        ]
    };

    option && stat_myChart_01_01.setOption(option);
    new ResizeObserver(() => stat_myChart_01_01.resize()).observe(stat_chart01_01);



    /*영등포구 갑 개표현황*/

    var label = [];
    var data = [];
    var voteRateAvg = 0;
    var etcVoteRate = 0;

    response.voteResponse.forEach(function (val, idx){
        if(dang_color[0].type == val.dangGbn){
            label.push(val.dangName + " " + val.dangMember);
            if(strVoteGubun == "per"){
                data.push({value : val.openVoteRate, itemStyle:{color:dang_color[0].code}});
            }else{
                data.push({value : val.voteCnt, itemStyle:{color:dang_color[0].code}});
            }
        }else if(dang_color[1].type == val.dangGbn){
            label.push(val.dangName + " " + val.dangMember);
            if(strVoteGubun == "per"){
                data.push({value : val.openVoteRate, itemStyle:{color:dang_color[1].code}});
            }else{
                data.push({value : val.voteCnt, itemStyle:{color:dang_color[1].code}});
            }
        }else{
            if(strVoteGubun == "per"){
                etcVoteRate += val.openVoteRate;
            }else{
                etcVoteRate += val.voteCnt;
            }
        }
    });
    label.push("기타");
    data.push({value : etcVoteRate.toFixed(2), itemStyle:{color:dang_color[2].code}});

    var voteList = [];
    response.voteResponse.forEach(function(val, idx){
        (strVoteGubun == "per") ? voteList.push(val.openVoteRate) : voteList.push(val.voteCnt);
    });


    // 차트 label
    var html = "";
    label.forEach(function(val,idx){
        html += '<p className="txt_n_sb" style="font-size: 14px;font-weight: 700;line-height: 120%;color: var(--mono_g9);">' + val + '</p>';
    });
    $(".stat_chart01_01_box.stat_chart02Box").find(".stat_chart01_01_txtCont").html(html);

    var stat_chart02_01 = document.getElementById('stat_chart02_01');
    var stat_myChart_02_01 = echarts.init(stat_chart02_01);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
        },
        xAxis: {
            type: 'value',
            xisLabel: {
                show: false
            },
            axisLine: {
                show:false,
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false,
            },
            max:Math.max.apply(Math,voteList)
        },
        yAxis: {
            type: 'category',
            data: label,
            xisLabel: {
                show: false
            },
            axisLine: {
                show:false,
            },
            axisTick: {
                show: false
            },
            inverse:true,
            axisLabel: {
                show: false,
            },
        },
        series: [
            {
                data: data,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                itemStyle: {
                    barBorderRadius: [4, 4, 4, 4],
                },
                barWidth: '20px',
                label: {
                    show: true,
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    },
                    position:'insideRight',
                    fontWeight:'600',
                    offset:[-20,0],
                    fontFamily: 'Pretendard',
                    fontSize: '14',
                    align: 'center',
                },
            }
        ]
    };

    option && stat_myChart_02_01.setOption(option);
    new ResizeObserver(() => stat_myChart_02_01.resize()).observe(stat_chart02_01);


    /*영등포구 갑 개표현황 상세*/
    var label = [];
    var dangGbn = [];
    var data = [];
    var obj = {};
    var pollNameList = [];

    // 중복 제거 -- 당
    var result = response.votePollResponse.reduce((acc, current) => {
        if (!acc[current.dangGbn]) {
            acc[current.dangGbn] = current;
        }
        return acc;
    }, {});
    var dangList = Object.values(result);

    dangList.forEach(function (val, idx){
        if(dang_color[0].type == val.dangGbn || dang_color[1].type == val.dangGbn){
            label.push(val.dangGbn);
            dangGbn.push(val.dangName);
        }
    });
    label.push("2");
    dangGbn.push("기타");

    // 중복 제거 -- 투표소

    var result = response.votePollResponse.reduce((acc, current) => {
        if (!acc[current.pollName]) {
            acc[current.pollName] = current;
        }
        return acc;
    }, {});
    var pollList = Object.values(result);

    var data0 = [];
    var data1 = [];
    var data2 = [];
    var sw = false;

    // 민주
    for(var i=0; i<pollList.length;i++){
        var openVoteRate = 0;
        sw = false;
        for(var j=0; j<response.votePollResponse.length;j++) {
            var tmp = response.votePollResponse[j];
            if (pollList[i].pollName == tmp.pollName) {
                if(label[0] == tmp.dangGbn){
                    if(strVoteGubun == "per"){
                        openVoteRate = tmp.openVoteRate;
                    }else{
                        openVoteRate = tmp.voteCnt;
                    }
                    sw = true;
                }
            }
        }
        if(sw){
            data0.push(openVoteRate);
        }else{
            data0.push(0);
        }
    }

    //국힘
    for(var i=0; i<pollList.length;i++){
        var openVoteRate = 0;
        sw = false;
        for(var j=0; j<response.votePollResponse.length;j++) {
            var tmp = response.votePollResponse[j];
            if (pollList[i].pollName == tmp.pollName) {
                if(label[1] == tmp.dangGbn){
                    if(strVoteGubun == "per"){
                        openVoteRate = tmp.openVoteRate;
                    }else{
                        openVoteRate = tmp.voteCnt;
                    }
                    sw = true;
                }
            }
        }
        if(sw){
            data1.push(openVoteRate);
        }else{
            data1.push(0);
        }
    }

    // 기타

    for(var i=0; i<pollList.length;i++){
        var openVoteRate = 0;
        sw = false;
        for(var j=0; j<response.votePollResponse.length;j++) {
            var tmp = response.votePollResponse[j];
            if (pollList[i].pollName == tmp.pollName) {
                if(label[0] != tmp.dangGbn && label[1] != tmp.dangGbn){
                    if(strVoteGubun == "per"){
                        openVoteRate += tmp.openVoteRate;
                    }else{
                        openVoteRate += tmp.voteCnt;
                    }
                    sw = true;
                }
            }
        }
        if(sw){
            data2.push(Number(openVoteRate.toFixed(2)));
        }else{
            data2.push(0);
        }
    }

    // 데이터 넣기
    label.forEach(function (val, idx){
        obj = {
            name: dangGbn[idx],
            type: 'bar',
            stack: 'total',
            showBackground: true,
            backgroundStyle: {
                color: '#f5f5f5'
            },
                emphasis: {
                    focus: 'series'
                },
                data: eval("data"+idx),
                itemStyle: {
                    color: dang_color[idx].code,
                barBorderRadius: [4, 0, 0, 4]
            },
            barWidth: '20px',
            label: {
                show: true,
                    align: 'center',
                    fontSize: '12',
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    position:'inside',
                    color:'#fff',
                    textStyle: {
                        textBorderColor:dang_color[idx].code,
                        textBorderWidth: 2
                    },
                    formatter: function (params) {
                    var returnVal = echarts.format.addCommas(params.value);
                    return returnVal;
                }
            },
        };
        data.push(obj);
    });


    console.log(data);

    pollList.forEach(function(val,idx){
        pollNameList.push(val.pollName);
    });

    var html = "";
    pollNameList.forEach(function(val,idx){
        html += '<p className="txt_n_sb" style="font-size: 14px;font-weight: 700;line-height: 120%;color: var(--mono_g9);">' + val + '</p>';
    });
    $(".stat_chart01_01_box.stat_chart02_02Box").find(".stat_chart01_01_txtCont").html(html);
    $(".stat_chart01_01_box.stat_chart02_02Box").find(".stat_chart01_01_txtCont > p").css("height", "calc(100% / "+pollNameList.length+")");
    $(".stat_chart02_02Box > .stat_chart01_01_txtCont").css("height", (76*pollNameList.length)+"px");
    $("#stat_chart02_02").css("height", 76*pollNameList.length+"px");

    var stat_chart02_02 = document.getElementById('stat_chart02_02');
    var stat_myChart_02_02 = echarts.init(stat_chart02_02);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show:false
        },
        grid: {
            left: '0',
            top:'0',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            xisLabel: {
                show: false
            },
            axisLine: {
                show:false,
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false,
            },
            max : (strVoteGubun == "per") ? 100 : response.votePollResponse[0].maxVoteCnt
        },
        yAxis: {
            type: 'category',
            data: pollNameList,
            xisLabel: {
                show: false
            },
            axisLine: {
                show:false,
            },
            axisTick: {
                show: false
            },
            inverse:true,
            axisLabel: {
                show: false,
            },
        },
        series: data
        ,
    };

    option && stat_myChart_02_02.setOption(option);
    new ResizeObserver(() => stat_myChart_02_02.resize()).observe(stat_chart02_02);

    if($(".loanList_icon").hasClass("sel")){
        $(".loanList_icon").each(function (){
            if($(this).hasClass("sel")){
                fn_getPollDetail("", pollDetailResponse, "");
            }
        });
    }
}

function fn_getPollDetail(id, response, param){
    pollDetailResponse = response;
    /*개표현황*/
    var label = [];
    var data = [];
    if(pollSelectSw){
        $(".vote_stat").text(strPollNm + " 개표현황");
        response.data.forEach(function (val, idx){
            label.push(val.dangName + " " + val.dangMember);
            if(strVoteGubun == "per"){
                data.push({value : val.openVoteRate, itemStyle:{color:dang_color[val.dangGbn].code}});
            }else{
                data.push({value : val.voteCnt, itemStyle:{color:dang_color[val.dangGbn].code}});
            }
        });
    }else{
        $(".vote_stat").text($(".selectTit.cty").children('span').text() + " 개표현황");
        var etcVoteRate = 0;
        response.data.forEach(function (val, idx){
            if(val.dangGbn == "0" || val.dangGbn == "1"){
                label.push(val.dangName + " " + val.dangMember);
                if(strVoteGubun == "per"){
                    data.push({value : val.openVoteRate, itemStyle:{color:dang_color[Number(val.dangGbn)].code}});
                }else{
                    data.push({value : val.voteCnt, itemStyle:{color:dang_color[Number(val.dangGbn)].code}});
                }
            }else{
                if(strVoteGubun == "per"){
                    etcVoteRate += val.openVoteRate;
                }else{
                    etcVoteRate += val.voteCnt;
                }
            }
        });
        label.push("기타");
        data.push({value : etcVoteRate.toFixed(2), itemStyle:{color:dang_color[2].code}});
    }

    var voteList = [];
    response.data.forEach(function(val, idx){
        (strVoteGubun == "per") ? voteList.push(val.openVoteRate) : voteList.push(val.voteCnt);
    });

    // 차트 label
    var html = "";
    label.forEach(function(val,idx){
        html += '<p className="txt_n_sb" style="font-size: 14px;font-weight: 700;line-height: 120%;color: var(--mono_g9);">' + val + '</p>';
    });
    $(".stat_chart01_01_box.stat_chart02Box").find(".stat_chart01_01_txtCont").html(html);

    var stat_chart02_01 = document.getElementById('stat_chart02_01');
    var stat_myChart_02_01 = echarts.init(stat_chart02_01);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
        },
        xAxis: {
            type: 'value',
            xisLabel: {
                show: false
            },
            axisLine: {
                show:false,
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false,
            },
            max:Math.max.apply(Math,voteList)
        },
        yAxis: {
            type: 'category',
            data: label,
            xisLabel: {
                show: false
            },
            axisLine: {
                show:false,
            },
            axisTick: {
                show: false
            },
            inverse:true,
            axisLabel: {
                show: false,
            },
        },
        series: [
            {
                data: data,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                itemStyle: {
                    barBorderRadius: [4, 4, 4, 4],
                },
                barWidth: '20px',
                label: {
                    show: true,
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    },
                    position:'insideRight',
                    fontWeight:'600',
                    offset:[-20,0],
                    fontFamily: 'Pretendard',
                    fontSize: '14',
                    align: 'center',
                },
            }
        ]
    };

    option && stat_myChart_02_01.setOption(option);
    new ResizeObserver(() => stat_myChart_02_01.resize()).observe(stat_chart02_01);
}
