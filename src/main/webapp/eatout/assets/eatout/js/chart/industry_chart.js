
function setChart(response){


    /*기업 매출액 및 업체 수 변화*/
    var ind_chart01 = document.getElementById('ind_chart01');
    var ind_myChart01 = echarts.init(ind_chart01);


    var labal = [];
    var saleAmt = [];
    var corpCnt = [];

    response.data.stat.forEach(function (val){
        labal.push(val.yyyy + "년")
        saleAmt.push(val.saleAmt)
        corpCnt.push(val.corpCnt)
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
            left: '40px',
            right: '20px',
        },
        xAxis: {
            type: 'category',
            data: labal,
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
                data: saleAmt,
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
                data: corpCnt,
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

    option && ind_myChart01.setOption(option);
    new ResizeObserver(() => ind_myChart01.resize()).observe(ind_chart01);


    var dataCorp = [];
    var dataAmt = [];

    var color = ['#01144B','#003EAA','#5181FF','#6DC9FD']
    response.data.corpPer.forEach(function (val, idx){
        var obj = { value: val.corpCntPer, name: val.corpSize,
                itemStyle: {
                    color: color[idx],
                }
            }

        dataCorp.push(obj);

        obj = { value: val.saleAmtPer, name: val.corpSize,
            itemStyle: {
                color: color[idx],
            }
        }
        dataAmt.push(obj);
    });

    /*기업 규모별 비중 - 업체수*/
    var ind_chart02 = document.getElementById('ind_chart02');
    var ind_myChart02 = echarts.init(ind_chart02);

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
                data: dataCorp,

            }
        ]
    };

    option && ind_myChart02.setOption(option);
    new ResizeObserver(() => ind_myChart02.resize()).observe(ind_chart02);

    /*기업 규모별 비중 - 매출액*/
    var ind_chart02_01 = document.getElementById('ind_chart02_01');
    var ind_myChart02_01 = echarts.init(ind_chart02_01);

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
                data: dataAmt
            }
        ]
    };

    option && ind_myChart02_01.setOption(option);
    new ResizeObserver(() => ind_myChart02_01.resize()).observe(ind_chart02_01);

    var admiCorp = [];
    response.data.corpUpjongPer.sort(function(a, b) {
        return b.admiCorp - a.admiCorp;
    });
    admiCorp = response.data.corpUpjongPer;

    var admiCorpList = [];
    var admiColor = ['#32136B' ,'#342782' ,'#343B9A' ,'#2F4EB1' ,'#2361C9' ,'#0075E0' ,'#538EE9' ,'#7DA7F1','#A2C0F8' ,'#C6DAFF']
    var corpSum = 0;
    admiCorp.forEach(function (val, idx){
        if(admiCorpList.length < 10){
            corpSum += val.admiCorp;
            var obj = {
                    name: val.stdUpjongNm,
                    value: val.admiCorp,
                    itemStyle:{
                        color:admiColor[idx]
                    },
                }
            admiCorpList.push(obj);
        }
    });
    /*산업군별 통계*/

    var ind_chart03 = document.getElementById('ind_chart03');
    var ind_mychart03 = echarts.init(ind_chart03);

    option = {
        tooltip: {
            trigger: 'item'
        },
        grid: {
            containLabel: true
        },
        series: [
            {
                type: 'treemap',
                nodeClick: undefined,
                label: {
                    show:false,

                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
                breadcrumb: {
                    show: false
                },
                data: [
                    {
                        name: '산업군별 업체 수',
                        value: corpSum,
                        children: admiCorpList
                    }
                ]
            }
        ]
    };

    option && ind_mychart03.setOption(option);
    new ResizeObserver(() => ind_mychart03.resize()).observe(ind_chart03);

    var admiSeleAmt = [];
    response.data.corpUpjongPer.sort(function(a, b) {
        return b.admiAmt - a.admiAmt;
    });
    admiSeleAmt = response.data.corpUpjongPer;

    var admiColor = ['#00485A' ,'#005A6B' ,'#006C7B' ,'#007F8A','#009297' ,'#14A6A3','#11BCB4' ,'#14D2C3' ,'#6FE4D8' ,'#B0EEE5']
    var admiAmtList = [];
    var amtSum = 0;
    admiSeleAmt.forEach(function (val, idx){
        if(admiAmtList.length < 10){
            amtSum += val.admiAmt;
            var obj = {
                name: val.stdUpjongNm,
                value: val.admiAmt,
                itemStyle:{
                    color:admiColor[idx]
                },
            }
            admiAmtList.push(obj);
        }
    });

    var ind_chart03_01 = document.getElementById('ind_chart03_01');
    var ind_mychart03_01 = echarts.init(ind_chart03_01);

    option = {
        tooltip: {
            trigger: 'item'
        },
        grid: {
            containLabel: true,
        },
        series: [
            {
                type: 'treemap',
                nodeClick: undefined,
                label: {
                    show:false,
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
                breadcrumb: {
                    show: false
                },
                data: [
                    {
                        name: '산업군별 매출액',
                        value: amtSum,
                        children: admiAmtList
                    }
                ]
            }
        ]
    };

    option && ind_mychart03_01.setOption(option);
    new ResizeObserver(() => ind_mychart03_01.resize()).observe(ind_chart03_01);


    var admiEmployeeCnt = [];
    response.data.corpUpjongPer.sort(function(a, b) {
        return b.admiEmployeeCnt - a.admiEmployeeCnt;
    });
    admiEmployeeCnt = response.data.corpUpjongPer;

    var admiColor = ['#840A0A','#C13734','#D14C48','#E0605D','#FD8888','#FF9B9B','#FFAEAD','#FFC0C0','#FFD3D3','#FFE5E5']
    var admiEmployeeCntList = [];
    var employeeSum = 0;
    admiEmployeeCnt.forEach(function (val, idx){
        if(admiEmployeeCntList.length < 10){
            employeeSum += val.admiEmployeeCnt;
            var obj = {
                name: val.stdUpjongNm,
                value: val.admiEmployeeCnt,
                itemStyle:{
                    color:admiColor[idx]
                },
            }
            admiEmployeeCntList.push(obj);
        }
    });

    var ind_chart03_02 = document.getElementById('ind_chart03_02');
    var ind_mychart03_02 = echarts.init(ind_chart03_02);

    option = {
        tooltip: {
            trigger: 'item'
        },
        grid: {
            containLabel: true
        },
        series: [
            {
                type: 'treemap',
                nodeClick: undefined,
                label: {
                    show:false,formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
                breadcrumb: {
                    show: false
                },
                data: [
                    {
                        name: '산업군별 종사자 수',
                        value: employeeSum,
                        children: admiEmployeeCntList
                    }
                ]
            }
        ]
    };
    option && ind_mychart03_02.setOption(option);
    new ResizeObserver(() => ind_mychart03_02.resize()).observe(ind_chart03_02);

}