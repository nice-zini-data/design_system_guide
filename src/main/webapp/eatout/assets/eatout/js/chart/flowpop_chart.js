
function setChartStpp(response) {

    loadingBar(false);
    $('.changeTxt').text(response.data.areaNm + " 인구 분석");

    /*전체 인구 수 변화*/
    var flowpup_chart01 = document.getElementById('flowpup_chart01');
    var flowpup_myChart01 = echarts.init(flowpup_chart01);
    var option;

    var label = [];
    var data = [];
    response.data.flowpopAll.forEach(function (val, idx) {
        label.push(val.yyyy + "년");
        data.push(val.totalPop);
    });

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '40px',
            bottom: '60px',
            left: '40px',
            right: '20px',
        },
        xAxis: {
            type: 'category',
            data: label,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight: '600',
                    fontFamily: 'Pretendard'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
            axisTick: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
        },
        series: [
            {
                data: data,
                type: 'bar',
                itemStyle: {
                    color: '#6C94FE',
                    barBorderRadius: [4, 4, 0, 0],
                    emphasis: {
                        color: '#005EE7'
                    }
                },
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                barWidth: '30px',
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '14',
                    fontWeight: '600',
                    fontFamily: 'Pretendard',
                    position: 'top',
                    color: '#005EE7',
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
            }
        ]
    };

    option && flowpup_myChart01.setOption(option);
    new ResizeObserver(() => flowpup_myChart01.resize()).observe(flowpup_chart01);

    /*선택지역 주거인구 성 연령대별 구성*/

    var flowpup_chart02 = document.getElementById('flowpup_chart02');
    var flowpup_myChart02 = echarts.init(flowpup_chart02);

    var labal = ['10세 미만', '10~19세', '20~29세', '30~39세', '40~49세', '50~59세', '60~69세', '70세 이상'];
    var data = [];
    response.data.flowpopGenderAge.forEach(function (val, idx) {
        data = [
            {
                name: '남성',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: [val.m09, val.m1019, val.m2029, val.m3039, val.m4049, val.m5059, val.m6069, val.m70over],
                itemStyle: {
                    color: '#005EE7',
                    emphasis: {
                        color: '#005EE7'
                    }
                },
                barWidth: '20px',
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '12',
                    fontWeight: '500',
                    fontFamily: 'Pretendard',
                    position: 'inside',
                    color: '#fff',
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },

            },
            {
                name: '여성',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: [val.f09, val.f1019, val.f2029, val.f3039, val.f4049, val.f5059, val.f6069, val.f70over],
                itemStyle: {
                    color: '#FFB6B6',
                    barBorderRadius: [0, 4, 4, 0],
                },
                barWidth: '20px',
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '12',
                    fontWeight: '500',
                    fontFamily: 'Pretendard',
                    position: 'inside',
                    color: '#000',
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
            },
        ]
    });

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show: false
        },
        grid: {
            left: '20px',
            top: '20px',
            right: '20px',
            bottom: '20px',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false
            },

            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
        },
        yAxis: {
            type: 'category',
            data: labal,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight: '500',
                    fontFamily: 'Pretendard'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
            axisTick: {
                show: false
            },
            inverse: true,
        },
        series: data
    };

    option && flowpup_myChart02.setOption(option);
    new ResizeObserver(() => flowpup_myChart02.resize()).observe(flowpup_chart02);


    /*직업군별 인구 수*/
    var labal = [
        '건설업, 기초산업, 수리업/도소매업, 운수/창고 및 통신업, 전기/가스/수도, 제조업'
        ,'금융/보험 및 금융서비스업, 사회.개인 서비스업, 숙박 및 음식업, 자영업자, 자영업자 기타'
        ,'공기업/공공단체, 공무원 및 법조계'
        ,'언론계'
        ,'전문직'
        ,'의료계'
        ,'금융계'
        ,'교육계'
        ,'상장등록외감법인'
        ,'급여소득자, 일반기업체, 기타급여소득자'
        ,'연금소득자'
        ,'이자/배당/임대 등 기타소득자'
        ,'학생'
    ]
    var data = [];
    response.data.jobtypeCnt.forEach(function (val, idx) {
        data.push(val.selfEmp1Rto);
        data.push(val.selfEmp2Rto);
        data.push(val.socEmp1Rto);
        data.push(val.mediaEmpRto);
        data.push(val.speclEmpRto);
        data.push(val.medicEmpRto);
        data.push(val.finanEmpRto);
        data.push(val.acadmEmpRto);
        data.push(val.listAuditEmpRto);
        data.push(val.otherEmpRto);
        data.push(val.pensnIncmRto);
        data.push(val.otherIncmRto);
        data.push(val.studentRto);
    });
    var flowpup_chart03 = document.getElementById('flowpup_chart03');
    var flowpup_myChart03 = echarts.init(flowpup_chart03);

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
            left: '20px',
            right: '20px',
        },
        xAxis: {
            type: 'value',
            xisLabel: {
                show: false
            },
            axisLine: {
                show: false,
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
            data: labal,
            xisLabel: {
                show: false
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            inverse: true,
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
                    color: '#005EE7',
                    barBorderRadius: [4, 4, 4, 4],
                    emphasis: {
                        color: '#005EE7'
                    }
                },
                barWidth: '20px',
                label: {
                    show: false
                }
            }
        ]
    };

    option && flowpup_myChart03.setOption(option);
    new ResizeObserver(() => flowpup_myChart03.resize()).observe(flowpup_chart03);

    $(".flowpop_chart_txtCont.job").css('height', '988px');
    $("#flowpup_chart03").css('height', '988px');


    /*가구유형별 세대 수*/

    var flowpup_chart04 = document.getElementById('flowpup_chart04');
    var flowpup_myChart04 = echarts.init(flowpup_chart04);

    var label = ['1인 가구', '2인 가구', '키즈맘_미취학', '키즈맘_초등생'
        , '키즈맘_중등생', '중년_1인', '중년_2인', '중년_자녀동거'
        , '시니어', '가구유형_미분류'];
    var data = []
    response.data.stppCnt.forEach(function (val, idx) {
        data.push(val.corcHhm1StppCnt);
        data.push(val.corcHhm2StppCnt);
        data.push(val.corcKdmmPrshStppCnt);
        data.push(val.corcKdmmEsstStppCnt);
        data.push(val.corcKdmmMsstStppCnt);
        data.push(val.corcMageHhm1StppCnt);
        data.push(val.corcMageHhm2StppCnt);
        data.push(val.corcMageChldStppCnt);
        data.push(val.corcSnorStppCnt);
        data.push(val.corcFmilSgmtNclsStppCnt);
    });


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
            left: '20px',
            right: '20px',
        },
        xAxis: {
            type: 'value',
            xisLabel: {
                show: false
            },
            axisLine: {
                show: false,
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
                show: false,
            },
            axisTick: {
                show: false
            },
            inverse: true,
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
                    color: '#5AC3DB',
                    barBorderRadius: [4, 4, 4, 4],
                    emphasis: {
                        color: '#5AC3DB'
                    }
                },
                barWidth: '20px',
                label: {
                    show: false
                }
            }
        ]
    };

    option && flowpup_myChart04.setOption(option);
    new ResizeObserver(() => flowpup_myChart04.resize()).observe(flowpup_chart04);


    $(".flowpop_chart_txtCont.house").css('height', '988px');
    $("#flowpup_chart04").css('height', '988px');

}
function setChartLivi(response){
    loadingBar(false);
    $('.flowpop_changeTxt').text(response.data.areaNm + " 생활인구 분석");

    var label = [];
    var data = [];
    response.data.his.forEach(function (val,idx){
        label.push(val.yyyymm.substr(2,2) + "." + val.yyyymm.substr(4,2));
        data.push(val.liviPoplCnt);
    });

    /*생활인구*/
    var flowpup_chart05 = document.getElementById('flowpup_chart05');
    var flowpup_myChart05 = echarts.init(flowpup_chart05);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '40px',
            bottom: '60px',
            left: '40px',
            right: '20px',
        },
        xAxis: {
            type: 'category',
            data: label,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'600',
                    fontFamily: 'Pretendard'
                }
            },
            axisLine: {
                show:true,
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
            axisTick: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
        },
        series: [
            {
                data: data,
                type: 'bar',
                itemStyle: {
                    color: '#6C94FE',
                    barBorderRadius: [4, 4, 0, 0],
                    emphasis:{
                        color:'#005EE7'
                    }
                },
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                barWidth: '30px',
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '14',
                    fontWeight:'600',
                    fontFamily: 'Pretendard',
                    position:'top',
                    color:'#005EE7',
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
            }
        ]
    };

    option && flowpup_myChart05.setOption(option);
    new ResizeObserver(() => flowpup_myChart05.resize()).observe(flowpup_chart05);

    /*선택지역 주거인구 성 연령대별 구성*/

    var label = [];
    var dataMale = [];
    var dataFemale = [];
    response.data.gender.forEach(function (val,idx){
        if(idx < 8) label.push(val.ageNm);
        (val.sexDvCd == "MALE") ? dataMale.push(val.liviPoplCnt) : dataFemale.push(val.liviPoplCnt)
    });

    var flowpup_chart06 = document.getElementById('flowpup_chart06');
    var flowpup_myChart06 = echarts.init(flowpup_chart06);

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
            left: '20px',
            top:'20px',
            right: '20px',
            bottom: '20px',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false
            },

            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
        },
        yAxis: {
            type: 'category',
            data: label,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard'
                }
            },
            axisLine: {
                show:true,
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
            axisTick: {
                show: false
            },
            inverse:true,
        },
        series: [
            {
                name: '남',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: dataMale,
                itemStyle: {
                    color: '#005EE7',
                    emphasis:{
                        color:'#005EE7'
                    }
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
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
            },
            {
                name: '여',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: dataFemale,
                itemStyle: {
                    color: '#FFB6B6',
                    barBorderRadius: [0, 4, 4, 0],
                },
                barWidth: '20px',
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '12',
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    position:'inside',
                    color:'#000',
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
            },
        ]
    };

    option && flowpup_myChart06.setOption(option);
    new ResizeObserver(() => flowpup_myChart06.resize()).observe(flowpup_chart06);


    /*요일별 생활 인구 수*/

    var label = [];
    var data = [];
    response.data.day.forEach(function (val, idx){
        label.push(val.gubun);
        data.push(val.liviPoplCnt);
    });
    var flowpup_chart07 = document.getElementById('flowpup_chart07');
    var flowpup_myChart07 = echarts.init(flowpup_chart07);
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
            left: '20px',
            right: '20px',
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
                data: data,
                type: 'bar',
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
                label: {
                    show: false
                }
            }
        ]
    };

    option && flowpup_myChart07.setOption(option);
    new ResizeObserver(() => flowpup_myChart07.resize()).observe(flowpup_chart07);

    /*시간대별 세대 수*/
    var label = [];
    var data = [];
    response.data.time.forEach(function (val, idx){
        label.push(val.gubun);
        data.push(val.liviPoplCnt);
    });
    var flowpup_chart08 = document.getElementById('flowpup_chart08');
    var flowpup_myChart08 = echarts.init(flowpup_chart08);

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
            left: '20px',
            right: '20px',
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
                data: data,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                itemStyle: {
                    color: '#5AC3DB',
                    barBorderRadius: [4, 4, 4, 4],
                    emphasis:{
                        color:'#5AC3DB'
                    }
                },
                barWidth: '20px',
                label: {
                    show: false
                }
            }
        ]
    };


    option && flowpup_myChart08.setOption(option);
    new ResizeObserver(() => flowpup_myChart08.resize()).observe(flowpup_chart08);

}