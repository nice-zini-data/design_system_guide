
function setChart(response){
    loadingBar(false);
    $('.changeTxt').text(response.data.areaNm + " 부동산 분석");
    // $('.loan_change_txt').text(response.data.areaNm + " 부동산 유형별 최근 거래 현황");
    $('.loan_change_txt').text("부동산 유형별 최근 거래 현황");
    $('.loan_txt0612').text('부동산 유형별 거래량 및 거래액 변화');

    var label = [];
    var data_buy_price = [];
    var data_buy_count = [];
    var data_rent_price = [];
    var data_rent_count = [];

    response.data.info.forEach(function(val,idx){
        label.push(val.dealYy.substr(2,2) + "년" + val.qty + "분기");
    });

    // 배열에서 중복 제거
    var result = label.filter((v, i) => label.indexOf(v) === i);
    label = result;

    console.log(response.data.info);
    response.data.info.forEach(function(val,idx){
        if(val.dealType == "buy"){
            data_buy_price.push(val.transPricePer);
            data_buy_count.push(val.cnt);
        }else if(val.dealType == "rent"){
            data_rent_price.push(val.depositPricePer);
            data_rent_count.push(val.cnt);
        }
    });

    /*아파트 - 아파트 거래량 변화*/
    var real_chart01_01 = document.getElementById('real_chart01_01');
    var real_myChart01_01 = echarts.init(real_chart01_01);

    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show:false
        },
        grid: {
            left: '20px',
            right: '0',
            bottom: '10px',
            top:'20px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: label,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    lineHeight:'32'
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
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard'
                }
            },
            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
            axisLine: {
                show:true,
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
        },
        series: [
            {
                name: '매매 거래량',
                type: 'line',
                data: data_buy_count,
                itemStyle:{color:'#005EE7'},
                symbolSize: 8,
                symbol: 'circle',
                label: {
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                }

            },
            {
                name: '전세 거래량',
                type: 'line',
                data: data_rent_count,
                itemStyle: {color: '#65C7DD'},
                symbolSize: 8,
                symbol: 'circle',
                label: {
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                }
            }
        ]
    };


    option && real_myChart01_01.setOption(option);
    new ResizeObserver(() => real_myChart01_01.resize()).observe(real_chart01_01);


    /*아파트 - 아파트 실거래가 변화*/
    var real_chart02_01 = document.getElementById('real_chart02_01');
    var real_myChart02_01 = echarts.init(real_chart02_01);

    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show:false
        },
        grid: {
            left: '20px',
            right: '0',
            bottom: '10px',
            top:'20px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: label,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    lineHeight:'32'
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
            min:'0',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard'
                }
            },
            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
            axisLine: {
                show:true,
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
        },
        series: [
            {
                name: '매매금액',
                type: 'line',
                data: data_buy_price,
                itemStyle:{color:'#005EE7'},
                symbolSize: 8,
                symbol: 'circle',
                label: {
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                }

            },
            {
                name: '전세 금액',
                type: 'line',
                data: data_rent_price,
                itemStyle: {color: '#65C7DD'},
                symbolSize: 8,
                symbol: 'circle',
                label: {
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                }
            }
        ]
    };


    option && real_myChart02_01.setOption(option);
    new ResizeObserver(() => real_myChart02_01.resize()).observe(real_chart02_01);

/*
    /!*연립/다세대 - 연립/다세대 거래량 변화*!/
    var real_chart01_02 = document.getElementById('real_chart01_02');
    var real_myChart01_02 = echarts.init(real_chart01_02);

    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show:false
        },
        grid: {
            left: '20px',
            right: '0',
            bottom: '10px',
            top:'20px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['21년1분기','21년2분기','21년3분기','21년4분기','22년1분기','22년2분기','22년3분기','22년4분기','23년1분기'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard',
                    lineHeight:'32'
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
            min:'1000',
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontWeight:'500',
                    fontFamily: 'Pretendard'
                }
            },
            splitLine: {
                show: true,   // splitLine 활성화
                lineStyle: {
                    color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                }
            },
            axisLine: {
                show:true,
                lineStyle: {
                    color: '#e0e0e0', // 분할선 색상 변경
                }
            },
        },
        series: [
            {
                name: '매매 거래량',
                type: 'line',
                data: [2345,3225,4325,1262,1352,1151,5412,6241,4123],
                itemStyle:{color:'#005EE7'},
                symbolSize: 8,
                symbol: 'circle',
                label: {
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                }

            },
            {
                name: '전세 거래량',
                type: 'line',
                data: [1234,1234,1262,1123,1651,2451,5681,4581,3121],
                itemStyle: {color: '#65C7DD'},
                symbolSize: 8,
                symbol: 'circle',
                label: {
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                }
            }
        ]
    };


    option && real_myChart01_02.setOption(option);
    new ResizeObserver(() => real_myChart01_02.resize()).observe(real_chart02_01);*/

    /*
        /!*연립/다세대  - 연립/다세대 실거래가 변화*!/
        var real_chart02_02 = document.getElementById('real_chart02_02');
        var real_myChart02_02 = echarts.init(real_chart02_02);

        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show:false
            },
            grid: {
                left: '20px',
                right: '0',
                bottom: '10px',
                top:'20px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['21년1분기','21년2분기','21년3분기','21년4분기','22년1분기','22년2분기','22년3분기','22년4분기','23년1분기'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard',
                        lineHeight:'32'
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
                min:'1000',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard'
                    }
                },
                splitLine: {
                    show: true,   // splitLine 활성화
                    lineStyle: {
                        color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#e0e0e0', // 분할선 색상 변경
                    }
                },
            },
            series: [
                {
                    name: '매매 거래량',
                    type: 'line',
                    data: [2345,3225,4325,1262,1352,1151,5412,6241,4123],
                    itemStyle:{color:'#005EE7'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }

                },
                {
                    name: '전세 거래량',
                    type: 'line',
                    data: [1234,1234,1262,1123,1651,2451,5681,4581,3121],
                    itemStyle: {color: '#65C7DD'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }
                }
            ]
        };


        option && real_myChart02_02.setOption(option);
        new ResizeObserver(() => real_myChart02_02.resize()).observe(real_chart02_02);

        /!*단독/다가구 - 단독/다가구 거래량 변화*!/
        var real_chart01_03 = document.getElementById('real_chart01_03');
        var real_myChart01_03 = echarts.init(real_chart01_03);

        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show:false
            },
            grid: {
                left: '20px',
                right: '0',
                bottom: '10px',
                top:'20px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['21년1분기','21년2분기','21년3분기','21년4분기','22년1분기','22년2분기','22년3분기','22년4분기','23년1분기'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard',
                        lineHeight:'32'
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
                min:'1000',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard'
                    }
                },
                splitLine: {
                    show: true,   // splitLine 활성화
                    lineStyle: {
                        color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#e0e0e0', // 분할선 색상 변경
                    }
                },
            },
            series: [
                {
                    name: '매매 거래량',
                    type: 'line',
                    data: [3421,3225,4325,1262,1352,1151,5412,6241,4123],
                    itemStyle:{color:'#005EE7'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }
                },
                {
                    name: '전세 거래량',
                    type: 'line',
                    data: [3212,1234,1262,1123,1651,2451,5681,4581,3121],
                    itemStyle: {color: '#65C7DD'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }
                }
            ]
        };


        option && real_myChart01_03.setOption(option);
        new ResizeObserver(() => real_myChart01_03.resize()).observe(real_chart01_03);


        /!*단독/다가구 - 단독/다가구 실거래가 변화*!/
        var real_chart02_03 = document.getElementById('real_chart02_03');
        var real_myChart02_03 = echarts.init(real_chart02_03);

        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show:false
            },
            grid: {
                left: '20px',
                right: '0',
                bottom: '10px',
                top:'20px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['21년1분기','21년2분기','21년3분기','21년4분기','22년1분기','22년2분기','22년3분기','22년4분기','23년1분기'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard',
                        lineHeight:'32'
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
                min:'1000',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard'
                    }
                },
                splitLine: {
                    show: true,   // splitLine 활성화
                    lineStyle: {
                        color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#e0e0e0', // 분할선 색상 변경
                    }
                },
            },
            series: [
                {
                    name: '매매 거래량',
                    type: 'line',
                    data: [3214,3225,4325,1262,1352,1151,5412,6241,4123],
                    itemStyle:{color:'#005EE7'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }

                },
                {
                    name: '전세 거래량',
                    type: 'line',
                    data: [3212,1234,1262,1123,1651,2451,5681,4581,3121],
                    itemStyle: {color: '#65C7DD'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }
                }
            ]
        };


        option && real_myChart02_03.setOption(option);
        new ResizeObserver(() => real_myChart02_03.resize()).observe(real_chart02_03);

        /!*오피스텔 - 오피스텔 거래량 변화*!/
        var real_chart01_04 = document.getElementById('real_chart01_04');
        var real_myChart01_04 = echarts.init(real_chart01_04);

        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show:false
            },
            grid: {
                left: '20px',
                right: '0',
                bottom: '10px',
                top:'20px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['21년1분기','21년2분기','21년3분기','21년4분기','22년1분기','22년2분기','22년3분기','22년4분기','23년1분기'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard',
                        lineHeight:'32'
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
                min:'1000',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard'
                    }
                },
                splitLine: {
                    show: true,   // splitLine 활성화
                    lineStyle: {
                        color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#e0e0e0', // 분할선 색상 변경
                    }
                },
            },
            series: [
                {
                    name: '매매 거래량',
                    type: 'line',
                    data: [4213,3225,4325,1262,1352,1151,5412,6241,4123],
                    itemStyle:{color:'#005EE7'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }

                },
                {
                    name: '전세 거래량',
                    type: 'line',
                    data: [4131,1234,1262,1123,1651,2451,5681,4581,3121],
                    itemStyle: {color: '#65C7DD'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }
                }
            ]
        };


        option && real_myChart01_04.setOption(option);
        new ResizeObserver(() => real_myChart01_04.resize()).observe(real_chart01_04);


        /!*오피스텔 - 오피스텔 실거래가 변화*!/
        var real_chart02_04 = document.getElementById('real_chart02_04');
        var real_myChart02_04 = echarts.init(real_chart02_04);

        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show:false
            },
            grid: {
                left: '20px',
                right: '0',
                bottom: '10px',
                top:'20px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['21년1분기','21년2분기','21년3분기','21년4분기','22년1분기','22년2분기','22년3분기','22년4분기','23년1분기'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard',
                        lineHeight:'32'
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
                min:'1000',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard'
                    }
                },
                splitLine: {
                    show: true,   // splitLine 활성화
                    lineStyle: {
                        color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#e0e0e0', // 분할선 색상 변경
                    }
                },
            },
            series: [
                {
                    name: '매매 거래량',
                    type: 'line',
                    data: [1234,3225,4325,1262,1352,1151,5412,6241,4123],
                    itemStyle:{color:'#005EE7'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }

                },
                {
                    name: '전세 거래량',
                    type: 'line',
                    data: [4213,1234,1262,1123,1651,2451,5681,4581,3121],
                    itemStyle: {color: '#65C7DD'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }
                }
            ]
        };


        option && real_myChart02_04.setOption(option);
        new ResizeObserver(() => real_myChart02_04.resize()).observe(real_chart02_04);


        /!*상업/업무용 - 상업/업무용 거래량 변화*!/
        var real_chart01_05 = document.getElementById('real_chart01_05');
        var real_myChart01_05 = echarts.init(real_chart01_05);

        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show:false
            },
            grid: {
                left: '20px',
                right: '0',
                bottom: '10px',
                top:'20px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['21년1분기','21년2분기','21년3분기','21년4분기','22년1분기','22년2분기','22년3분기','22년4분기','23년1분기'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard',
                        lineHeight:'32'
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
                min:'1000',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard'
                    }
                },
                splitLine: {
                    show: true,   // splitLine 활성화
                    lineStyle: {
                        color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#e0e0e0', // 분할선 색상 변경
                    }
                },
            },
            series: [
                {
                    name: '매매 거래량',
                    type: 'line',
                    data: [2152,3225,4325,1262,1352,1151,5412,6241,4123],
                    itemStyle:{color:'#005EE7'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }

                },
                {
                    name: '전세 거래량',
                    type: 'line',
                    data: [3152,1234,1262,1123,1651,2451,5681,4581,3121],
                    itemStyle: {color: '#65C7DD'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }
                }
            ]
        };


        option && real_myChart01_05.setOption(option);
        new ResizeObserver(() => real_myChart01_05.resize()).observe(real_chart01_05);


        /!*오피스텔 - 오피스텔 실거래가 변화*!/
        var real_chart02_05 = document.getElementById('real_chart02_05');
        var real_myChart02_05 = echarts.init(real_chart02_05);

        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show:false
            },
            grid: {
                left: '20px',
                right: '0',
                bottom: '10px',
                top:'20px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['21년1분기','21년2분기','21년3분기','21년4분기','22년1분기','22년2분기','22년3분기','22년4분기','23년1분기'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard',
                        lineHeight:'32'
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
                min:'1000',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#666',
                        fontSize: 14,
                        fontWeight:'500',
                        fontFamily: 'Pretendard'
                    }
                },
                splitLine: {
                    show: true,   // splitLine 활성화
                    lineStyle: {
                        color: 'transparent' // 나머지 라인 색상을 투명하게 설정
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color: '#e0e0e0', // 분할선 색상 변경
                    }
                },
            },
            series: [
                {
                    name: '매매 거래량',
                    type: 'line',
                    data: [2152,3225,4325,1262,1352,1151,5412,6241,4123],
                    itemStyle:{color:'#005EE7'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }


                },
                {
                    name: '전세 거래량',
                    type: 'line',
                    data: [3152,1234,1262,1123,1651,2451,5681,4581,3121],
                    itemStyle: {color: '#65C7DD'},
                    symbolSize: 8,
                    symbol: 'circle',
                    label: {
                        formatter: function (params) {
                            var returnVal = echarts.format.addCommas(params.value);
                            return returnVal;
                        }
                    }
                }
            ]
        };


        option && real_myChart02_05.setOption(option);
        new ResizeObserver(() => real_myChart02_05.resize()).observe(real_chart02_05);*/
}