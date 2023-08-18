function setChart(response){
    loadingBar(false);
    $('.changeTxt').text(response.data.areaNm + " 소득 분석");

    var label = [];
    var data = [];
    response.data.forEach(function (val,idx){
        label.push(val.yymm);
        data.push(val.avgAnuIncm);
    });
    /*1인당 월 평균 소득 변화*/
    var incom_chart01 = document.getElementById('incom_chart01');
    var incom_myChart01 = echarts.init(incom_chart01);
    var option;

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

    option && incom_myChart01.setOption(option);
    new ResizeObserver(() => incom_myChart01.resize()).observe(incom_chart01);

    var lastResponse = [response.data[response.data.length - 1]];

    /*성/연령대별 평균소득*/
    var label = ['20대', '30대', '40대', '50대', '60대 이상'];
    var dataM = [];
    var dataF = [];

    lastResponse.forEach(function (val,idx){
        dataM.push(val.m20AvgAnuIncm);
        dataM.push(val.m30AvgAnuIncm);
        dataM.push(val.m40AvgAnuIncm);
        dataM.push(val.m50AvgAnuIncm);
        dataM.push(val.mov60AvgAnuIncm);
        dataF.push(val.f20AvgAnuIncm);
        dataF.push(val.f30AvgAnuIncm);
        dataF.push(val.f40AvgAnuIncm);
        dataF.push(val.f50AvgAnuIncm);
        dataF.push(val.fov60AvgAnuIncm);
    });
    var incom_chart02 = document.getElementById('incom_chart02');
    var incom_myChart02 = echarts.init(incom_chart02);

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
            right: '0',
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
                name: '남성',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: dataM,
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
                name: '여성',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: dataF,
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

    option && incom_myChart02.setOption(option);
    new ResizeObserver(() => incom_myChart02.resize()).observe(incom_chart02);

    /*성/연령대별 평균 카드소비액*/
    var dataM = [];
    var dataF = [];

    lastResponse.forEach(function (val,idx){
        dataM.push(val.m20AvgMonCnsm);
        dataM.push(val.m30AvgMonCnsm);
        dataM.push(val.m40AvgMonCnsm);
        dataM.push(val.m50AvgMonCnsm);
        dataM.push(val.mov60AvgMonCnsm);
        dataF.push(val.f20AvgMonCnsm);
        dataF.push(val.f30AvgMonCnsm);
        dataF.push(val.f40AvgMonCnsm);
        dataF.push(val.f50AvgMonCnsm);
        dataF.push(val.fov60AvgMonCnsm);
    });
    var incom_chart03 = document.getElementById('incom_chart03');
    var incom_myChart03 = echarts.init(incom_chart03);

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
            right: '0',
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
                name: '남성',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: dataM,
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
                name: '여성',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: dataF,
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

    option && incom_myChart03.setOption(option);
    new ResizeObserver(() => incom_myChart03.resize()).observe(incom_chart03);

    /*직업군별 평균소득*/

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
        // ,'학생'
    ]
    var data = [];
    lastResponse.forEach(function (val,idx){
        data.push(val.selfEmp1Incm);
        data.push(val.selfEmp2Incm);
        data.push(val.socEmp1Incm);
        data.push(val.mediaEmpIncm);
        data.push(val.speclEmpIncm);
        data.push(val.medicEmpIncm);
        data.push(val.finanEmpIncm);
        data.push(val.acadmEmpIncm);
        data.push(val.listAuditEmpIncm);
        data.push(val.otherEmpIncm);
        data.push(val.pensnIncm);
        data.push(val.otherIncm);
        // data.push(val.studentIncm);
    });

    var incom_chart04 = document.getElementById('incom_chart04');
    var incom_myChart04 = echarts.init(incom_chart04);

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
            data: labal,
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

    option && incom_myChart04.setOption(option);
    new ResizeObserver(() => incom_myChart04.resize()).observe(incom_chart04);


    $(".flowpop_chart_txtCont.job").css('height', '728px');
    $("#incom_chart04").css('height', '728px');


    /*연소득 금액대별 구성*/
    $(".chart05_txt.txt_n_sb.chart05").html(response.data.megaNm +'</br>' + "평균");
    $(".chart05_txt.txt_n_sb.chart05_02").html(response.data.areaNm +'</br>' + "평균");
    var color_list =['#01144B'
        , '#003EAA'
        , '#5181FF'
        , '#6DC9FD'
        , '#89EDED'
        , '#CCCCCC'
        , '#8f8f8f'
    ];
    var data = [];
    var data_mega = [];
    lastResponse.forEach(function (val,idx){
        data_mega = [
            { value: val.megaAnuIncmOver7Rto, name: '7000만원 초과',
                itemStyle: {
                    color: color_list[0],
                }
            },
            { value: val.megaAnuIncm6To7Rto, name: '6~7000만원',
                itemStyle: {
                    color: color_list[1],
                }
            },
            { value: val.megaAnuIncm5To6Rto, name: '5~6000만원',
                itemStyle: {
                    color: color_list[2],
                }
            },
            { value: val.megaAnuIncm4To5Rto, name: '4~5000만원',
                itemStyle: {
                    color: color_list[3],
                }
            },
            { value: val.megaAnuIncm3To4Rto, name: '3~4000만원',
                itemStyle: {
                    color: color_list[4],
                }
            },
            { value: val.megaAnuIncm2To3Rto, name: '2~3000만원',
                itemStyle: {
                    color: color_list[5],
                }
            },
            { value: val.megaAnuIncmUnder2Rto, name: '2000만원 미만',
                itemStyle: {
                    color: color_list[6],
                }
            }
        ]

        data = [
            { value: val.anuIncmOver7Rto, name: '7000만원 초과',
                itemStyle: {
                    color: color_list[0],
                }
            },
            { value: val.anuIncm6To7Rto, name: '6~7000만원',
                itemStyle: {
                    color: color_list[1],
                }
            },
            { value: val.anuIncm5To6Rto, name: '5~6000만원',
                itemStyle: {
                    color: color_list[2],
                }
            },
            { value: val.anuIncm4To5Rto, name: '4~5000만원',
                itemStyle: {
                    color: color_list[3],
                }
            },
            { value: val.anuIncm3To4Rto, name: '3~4000만원',
                itemStyle: {
                    color: color_list[4],
                }
            },
            { value: val.anuIncm2To3Rto, name: '2~3000만원',
                itemStyle: {
                    color: color_list[5],
                }
            },
            { value: val.anuIncmUnder2Rto, name: '2000만원 미만',
                itemStyle: {
                    color: color_list[6],
                }
            }
        ];
    });

    var incom_chart05 = document.getElementById('incom_chart05');
    var incom_myChart05 = echarts.init(incom_chart05);

    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show:false
        },
        series: [
            {
                name: response.data.megaNm + ' 평균',
                type: 'pie',
                radius: ['50%', '90%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderColor: '#fff',
                },
                label: {
                    show: false,
                    position: 'center',
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 14,
                        fontWeight: '600',
                        color:'#282828'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data_mega
            }
        ]
    };

    option && incom_myChart05.setOption(option);
    new ResizeObserver(() => incom_myChart05.resize()).observe(incom_chart05);

    /*연소득 금액대별 구성*/
    var incom_chart05_02 = document.getElementById('incom_chart05_02');
    var incom_myChart05_02 = echarts.init(incom_chart05_02);

    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show:false
        },
        series: [
            {
                name: response.data.areaNm,
                type: 'pie',
                radius: ['50%', '90%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderColor: '#fff',
                },
                label: {
                    show: false,
                    position: 'center',
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 14,
                        fontWeight: '600',
                        color:'#282828'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    };

    option && incom_myChart05_02.setOption(option);
    new ResizeObserver(() => incom_myChart05_02.resize()).observe(incom_chart05_02);

    /*아파트 평형대별 주거비율*/


    var label = ['20평미만 (66제곱미터미만)','20평대 (99제곱미터미만)','30평대 (132제곱미터미만)','40평대이상 (132제곱미터이상)'];
    var data = [];
    lastResponse.forEach(function (val,idx){
        data.push(val.aptU20pRto)
        data.push(val.apt20pRto)
        data.push(val.apt30pRto)
        data.push(val.aptO40pRto)
    });

    var incom_chart06 = document.getElementById('incom_chart06');
    var incom_myChart06 = echarts.init(incom_chart06);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '60px',
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
                },
                formatter: function (value) {
                    // <br> 태그를 사용하여 줄바꿈
                    return value.split(" (").join("\n(");
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

    option && incom_myChart06.setOption(option);
    new ResizeObserver(() => incom_myChart06.resize()).observe(incom_chart06);
}