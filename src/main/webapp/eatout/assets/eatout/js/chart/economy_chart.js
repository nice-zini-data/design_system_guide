
function setChart(response){
    loadingBar(false);
    $('.changeTxt').text(response.data.areaNm + " 지역경제 분석");

    /*상권(음식+소매+서비스) 매출액 및 업체 수 변화*/
    var eco_chart01 = document.getElementById('eco_chart01');
    var eco_myChart01 = echarts.init(eco_chart01);

    var label = [];
    var data_store = [];
    var data_sale = [];

    response.data.storeStat.forEach(function(val,idx){
        if(response.data.storeStat.length-1 == idx){
            label.push("~"+val.yyyy + "년 " + val.yyyymm.substr(4,2) + "월");

        }else{
            label.push(val.yyyy + "년");
        }
        data_store.push(val.storeCnt);
        data_sale.push(val.saleAmt);

    });

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
            left: '60px',
            right: '40px',
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
                    fontFamily: 'Pretendard',
                    lineHeight:'28'
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
                show: true,
                textStyle:{
                    color:'#666'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
            //min:1000
        },
        series: [
            {
                name:'매출액',
                data: data_sale,
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
            },
            {
                name:'업체수',
                data: data_store,
                type: 'line',
                itemStyle: {
                    color: '#65C7DD',
                },
                symbolSize: 8,
                symbol: 'circle',
                barWidth: '30px',
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '14',
                    fontWeight:'600',
                    fontFamily: 'Pretendard',
                    position:'bottom',
                    color:'#007186',
                    textBorderWidth:'3',
                    textBorderColor:'#fff',
                    textBorderType: 'solid',
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
            }
        ]
    };

    option && eco_myChart01.setOption(option);
    new ResizeObserver(() => eco_myChart01.resize()).observe(eco_chart01);


    /*기업종 구성비*/


    var label = [];
    var data_store = [];
    var data_sale = [];
    var color_list =['#01144B'
        , '#003EAA'
        , '#5181FF'
        , '#6DC9FD'
        , '#89EDED'
        , '#CCCCCC'
        , '#8f8f8f'
    ];
    response.data.upjongRate.forEach(function(val,idx){
        data_store.push(
            { value: val.storeRate, name: val.upjong1Nm,
                itemStyle: {
                    color: color_list[idx],
                }
            });

        data_sale.push(
            { value: val.saleAmtRate, name: val.upjong1Nm,
                itemStyle: {
                    color: color_list[idx],
                }
            });
    });

    var eco_chart02 = document.getElementById('eco_chart02');
    var eco_myChart02 = echarts.init(eco_chart02);

    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show:false
        },
        series: [
            {
                name: '업체수 비중',
                type: 'pie',
                radius: ['50%', '90%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderColor: '#fff',
                },
                label: {
                    show: false,
                    position: 'center'
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
                data: data_store
            }
        ]
    };

    option && eco_myChart02.setOption(option);
    new ResizeObserver(() => eco_myChart02.resize()).observe(eco_chart02);


    /*기업 규모별 비중 - 매출액*/
    var eco_chart02_01 = document.getElementById('eco_chart02_01');
    var eco_myChart02_01 = echarts.init(eco_chart02_01);

    option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show:false
        },
        series: [
            {
                name: '매출액 비중',
                type: 'pie',
                radius: ['50%', '90%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderColor: '#fff',
                },
                label: {
                    show: false,
                    position: 'center'
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
                data: data_sale
            }
        ]
    };

    option && eco_myChart02_01.setOption(option);
    new ResizeObserver(() => eco_myChart02_01.resize()).observe(eco_chart02_01);


    /*기지역 특성업종(평균 구성비 대비 높은 업종 순) - 음식*/

    var label_food = [];
    var data_food = [];
    var label_con = [];
    var data_con = [];
    var label_service = [];
    var data_service = [];


    var data = [];
    response.data.areaUpjongRate.forEach(function (val){
        if(val.upjong1Cd == "F"){
            if(data.length < 5){
                data.push(val);
            }
        }
    });

    response.data.areaUpjongRate.forEach(function (val,idx){
        if(val.upjong1Cd == "Q"){
            if(data_food.length < 5){
                label_food.push(val.upjong2Nm);
                data_food.push(val.storeRateAdmi);
            }
        }
        if(val.upjong1Cd == "D"){
            if(data_con.length < 5){
                label_con.push(val.upjong2Nm);
                data_con.push(val.storeRateAdmi);
            }
        }
        if(val.upjong1Cd == "F"){
            if(data_service.length < 5){
                label_service.push(val.upjong2Nm);
                data_service.push(val.storeRateAdmi);
            }
        }
    })

    var eco_chart03 = document.getElementById('eco_chart03');
    var eco_myChart03 = echarts.init(eco_chart03);
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
            data: label_food,
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
                data: data_food,
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
    option && eco_myChart03.setOption(option);
    new ResizeObserver(() => eco_myChart03.resize()).observe(eco_chart03);

    /*기지역 특성업종(평균 구성비 대비 높은 업종 순) - 소비*/
    var eco_chart03_01 = document.getElementById('eco_chart03_01');
    var eco_myChart03_01 = echarts.init(eco_chart03_01);
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
            data: label_con,
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
                data: data_con,
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
    option && eco_myChart03_01.setOption(option);
    new ResizeObserver(() => eco_myChart03_01.resize()).observe(eco_chart03_01);

    /*기지역 특성업종(평균 구성비 대비 높은 업종 순) - 서비스*/
    var eco_chart03_02 = document.getElementById('eco_chart03_02');
    var eco_myChart03_02 = echarts.init(eco_chart03_02);
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
            data: label_service,
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
                data: data_service,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                itemStyle: {
                    color: '#FF9595',
                    barBorderRadius: [4, 4, 4, 4],
                    emphasis:{
                        color:'#FF9595'
                    }
                },
                barWidth: '20px',
                label: {
                    show: false
                }
            }
        ]
    };
    option && eco_myChart03_02.setOption(option);
    new ResizeObserver(() => eco_myChart03_02.resize()).observe(eco_chart03_02);


    /*요일별 소비 비중*/
    var data_day = [];
    var data_time = [];
    var data_m = [];
    var data_f = [];
    response.data.economyChartRate.forEach(function(val,idx){
        data_day.push(common.round(val.saleMon, 1));
        data_day.push(common.round(val.saleThu, 1));
        data_day.push(common.round(val.saleWed, 1));
        data_day.push(common.round(val.saleTue, 1));
        data_day.push(common.round(val.saleFri, 1));
        data_day.push(common.round(val.saleSat, 1));
        data_day.push(common.round(val.saleSun, 1));
        data_time.push(common.round(val.saleTime0609, 1));
        data_time.push(common.round(val.saleTime0912, 1));
        data_time.push(common.round(val.saleTime1215, 1));
        data_time.push(common.round(val.saleTime1518, 1));
        data_time.push(common.round(val.saleTime1821, 1));
        data_time.push(common.round(val.saleTime2124, 1));
        data_time.push(common.round(val.saleTime2406, 1));
        data_m.push(common.round(val.cntM20Rate, 1));
        data_m.push(common.round(val.cntM30Rate, 1));
        data_m.push(common.round(val.cntM40Rate, 1));
        data_m.push(common.round(val.cntM50Rate, 1));
        data_m.push(common.round(val.cntM60Rate, 1));
        data_f.push(common.round(val.cntW20Rate, 1));
        data_f.push(common.round(val.cntW30Rate, 1));
        data_f.push(common.round(val.cntW40Rate, 1));
        data_f.push(common.round(val.cntW50Rate, 1));
        data_f.push(common.round(val.cntW60Rate, 1));
    });

    var eco_chart04 = document.getElementById('eco_chart04');
    var eco_myChart04 = echarts.init(eco_chart04);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '30px',
            bottom: '30px',
            left: '30px',
            right: '30px',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['월','화','수','목','금','토','일'],
            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    lineHeight:'28'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLabel:{show:false},
            splitLine: {show:false}
        },
        series: [
            {
                data: data_day,
                type: 'line',
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(0, 94, 231, 0.2)' // 시작 색상
                            }, {
                                offset: 1,
                                color: 'rgba(0, 94, 231, 0)' // 종료 색상
                            }],
                            globalCoord: false // 기본값
                        }
                    }
                },
                symbolSize: 8,
                symbol: 'circle',
                itemStyle: {
                    color: '#005EE7',

                },
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '14',
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    position:'top',
                    color:'#005EE7',
                }
            }
        ],

    };

    option && eco_myChart04.setOption(option);
    new ResizeObserver(() => eco_myChart04.resize()).observe(eco_chart04);


    /*시간대별 소비 비중*/
    var eco_chart05 = document.getElementById('eco_chart05');
    var eco_myChart05 = echarts.init(eco_chart05);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '30px',
            bottom: '30px',
            left: '30px',
            right: '30px',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['06~09시','09~12시','12~15시','15~18시','18~21시','21~24시','24~06시'],
            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    lineHeight:'28'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLabel:{show:false},
            splitLine: {show:false}
        },
        series: [
            {
                data: data_time,
                type: 'line',
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(90, 195, 219, 0.2)' // 시작 색상
                            }, {
                                offset: 1,
                                color: 'rgba(90, 195, 219, 0)' // 종료 색상
                            }],
                            globalCoord: false // 기본값
                        }
                    }
                },
                symbolSize: 8,
                symbol: 'circle',
                itemStyle: {
                    color: '#5AC3DB',

                },
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '14',
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    position:'top',
                    color:'#007186',
                }
            }
        ],

    };

    option && eco_myChart05.setOption(option);
    new ResizeObserver(() => eco_myChart05.resize()).observe(eco_chart05);

    /*성/연령별 소비 비중*/
    var eco_chart06 = document.getElementById('eco_chart06');
    var eco_myChart06 = echarts.init(eco_chart06);

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
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['20대이하','30대','40대','50대','60대이상'],
            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    lineHeight:'28'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
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
        },
        series: [
            {
                name: '남성',
                type: 'bar',
                data: data_m,
                itemStyle: {
                    color: '#005EE7',
                    barBorderRadius: [4, 4, 0, 0],
                    emphasis:{
                        color:'#005EE7'
                    }
                },
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                barWidth: '16px',
                barGap:'1px',
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '14',
                    fontWeight:'600',
                    fontFamily: 'Pretendard',
                    position:'top',
                    color:'#005EE7',
                },
            },
            {
                name: '여성',
                type: 'bar',
                data: data_f,
                itemStyle: {
                    color: '#FF9595',
                    barBorderRadius: [4, 4, 0, 0],
                    emphasis:{
                        color:'#FF9595'
                    }
                },
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                barWidth: '16px',
                barGap:'1px',
                label: {
                    show: true,
                    align: 'center',
                    fontSize: '14',
                    fontWeight:'600',
                    fontFamily: 'Pretendard',
                    position:'top',
                    color:'#CF250D',
                },
            }
        ]
    };

    option && eco_myChart06.setOption(option);
    new ResizeObserver(() => eco_myChart06.resize()).observe(eco_chart06);

}

