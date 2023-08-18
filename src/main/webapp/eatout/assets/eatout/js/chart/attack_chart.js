/*
var chartDom = document.getElementById('attack_chart');
var myChart = echarts.init(chartDom);
var option;

option = {
    legend: {
        data: [
            {
                name: '영등포구 갑 평가',
                itemStyle: {
                    color: '#005ee7'
                },
                icon:'roundRect',
                iconStyle:{
                    borderRadius: 8,
                    width:16,
                    height:16
                },
                textStyle:{
                    color: '#666', // 텍스트 색상 변경
                    fontWeight:600,
                    fontFamily:'Pretendard',
                    fontSize:14
                }
            },{
                name: '지역평균 평가',
                itemStyle: {
                    color: '#5AC3DB'
                },
                icon:'roundRect',
                iconStyle:{
                    borderRadius: 8,
                    width:16,
                    height:16
                },
                textStyle:{
                    color: '#666', // 텍스트 색상 변경
                    fontWeight:600,
                    fontFamily:'Pretendard',
                    fontSize:14
                }
            }],
        bottom:'0px'
    },
    radar: {
        // shape: 'circle',
        indicator: [
            { name: '30대 남성인구', max: 100 },
            { name: '보육시설수', max: 100 },
            { name: '40대소득수준', max: 100 },
            { name: '18시 유동인구', max: 100 },
            { name: '1인가구수', max: 100 },
            { name: '20평대아파트', max: 100 },
            { name: '승하차연구수', max: 100 },
            { name: '소매업매출액', max: 100 }
        ],
        radius: '65%',
        center: ['50%', '40%'],
        name: {
            textStyle: {
                color: '#666', // 텍스트 색상 변경
                fontWeight:600,
                fontFamily:'Pretendard',
                fontSize:14
            }
        },
        splitArea: {
            areaStyle: {
                color: ['#fff'] // 레이더 차트 영역의 배경 색상을 지정합니다.
            }
        }
    },
    series: [
        {
            name: '영등포구 갑 평가 vs 지역평균 평가',
            type: 'radar',
            data: [
                {
                    value: [87.5, 70, 60.5, 70, 90, 67.5, 40, 84],
                    name: '영등포구 갑 평가',
                    itemStyle: {
                        color: '#005EE7'
                    },
                    areaStyle: {
                        color: 'rgba(0, 94, 231, 0.2)'// 배경 색상 설정
                    }
                },
                {
                    value: [47.5, 80, 55.5, 60, 40, 77.5, 80, 74],
                    name: '지역평균 평가',
                    itemStyle: {
                        color: '#5AC3DB'
                    },
                    areaStyle: {
                        color: 'rgba(90, 195, 219, 0.2)'// 배경 색상 설정
                    }

                }
            ],
            label:{
                formatter: function (params) {
                    var returnVal = echarts.format.addCommas(params.value);
                    return returnVal;
                }
            }
        }
    ]
};

option && myChart.setOption(option);
new ResizeObserver(() => myChart.resize()).observe(chartDom);


var attack_R_chart01 = document.getElementById('attack_R_chart01');
var attack_R_myChart01 = echarts.init(attack_R_chart01);

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid:{
        left:0,
        right:0,
        top:'-40px',
        bottom:0
    },
    xAxis: {
        type: 'value',
        axisLabel: {
            show: false,
        },
        splitLine: {
            show: false
        },
        max:100
    },
    yAxis: {
        type: 'category',
        data: ['영등포구 갑 평가 점수', '지역평균 평가 점수'],
        axisLabel: {
            show: false,
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#fff', // 분할선 색상 변경
                width: 1 // 분할선 두께 변경
            }
        },
        axisTick: {
            show: false
        },

    },
    series: [
        {
            name: '영등포구 갑 평가 점수',
            type: 'bar',
            data: ['77.5'],
            showBackground: true,
            itemStyle: {
                color: '#005EE7',
                barBorderRadius: [4, 4, 4, 4],
            },
            backgroundStyle: {
                color: '#f5f5f5'
            },
            barWidth: '20px',
            label: {
                show: true,
                align: 'center',
                fontSize: '14',
                fontWeight:'600',
                fontFamily: 'Pretendard',
                position:'insideRight',
                color:'#fff',
                offset:[-20,0]
            },

        },
        {
            name: '지역평균 평가 점수',
            type: 'bar',
            data: ['87.5'],
            showBackground: true,
            itemStyle: {
                color: '#5AC3DB',
                barBorderRadius: [4, 4, 4, 4],
            },
            backgroundStyle: {
                color: '#f5f5f5'
            },
            barWidth: '20px',
            label: {
                show: true,
                align: 'center',
                fontSize: '14',
                fontWeight:'600',
                fontFamily: 'Pretendard',
                position:'insideRight',
                color:'#000',
                offset:[-20,0]
            },
        },

    ]
};

option && attack_R_myChart01.setOption(option);
new ResizeObserver(() => attack_R_myChart01.resize()).observe(attack_R_chart01);

/!*소매업매출액*!/
var attack_R_chart02 = document.getElementById('attack_R_chart02');
var attack_R_myChart02 = echarts.init(attack_R_chart02);
option && attack_R_myChart02.setOption(option);
new ResizeObserver(() => attack_R_myChart02.resize()).observe(attack_R_chart02);

attack_R_myChart02.setOption({
    series: [
        {
            name: '영등포구 갑 평가 점수',
            data: ['20']
        },
        {
            name: '지역평균 평가 점수',
            data: ['32.5']
        }
    ]
});

/!*승하차연구수*!/
var attack_R_chart03 = document.getElementById('attack_R_chart03');
var attack_R_myChart03 = echarts.init(attack_R_chart03);
option && attack_R_myChart03.setOption(option);
new ResizeObserver(() => attack_R_myChart03.resize()).observe(attack_R_chart03);

attack_R_myChart03.setOption({
    series: [
        {
            name: '영등포구 갑 평가 점수',
            data: ['70']
        },
        {
            name: '지역평균 평가 점수',
            data: ['62.5']
        }
    ]
});

/!*20평대아파트*!/
var attack_R_chart04 = document.getElementById('attack_R_chart04');
var attack_R_myChart04 = echarts.init(attack_R_chart04);
option && attack_R_myChart04.setOption(option);
new ResizeObserver(() => attack_R_myChart04.resize()).observe(attack_R_chart04);

attack_R_myChart04.setOption({
    series: [
        {
            name: '영등포구 갑 평가 점수',
            data: ['56']
        },
        {
            name: '지역평균 평가 점수',
            data: ['85.5']
        }
    ]
});


/!*1인가구수*!/
var attack_R_chart05 = document.getElementById('attack_R_chart05');
var attack_R_myChart05 = echarts.init(attack_R_chart05);
option && attack_R_myChart05.setOption(option);
new ResizeObserver(() => attack_R_myChart05.resize()).observe(attack_R_chart05);

attack_R_myChart05.setOption({
    series: [
        {
            name: '영등포구 갑 평가 점수',
            data: ['20']
        },
        {
            name: '지역평균 평가 점수',
            data: ['32.5']
        }
    ]
});


/!*18시 유동인구*!/
var attack_R_chart06 = document.getElementById('attack_R_chart06');
var attack_R_myChart06 = echarts.init(attack_R_chart06);
option && attack_R_myChart06.setOption(option);
new ResizeObserver(() => attack_R_myChart06.resize()).observe(attack_R_chart06);

attack_R_myChart06.setOption({
    series: [
        {
            name: '영등포구 갑 평가 점수',
            data: ['60']
        },
        {
            name: '지역평균 평가 점수',
            data: ['92.5']
        }
    ]
});


/!*40대소득수준*!/
var attack_R_chart07 = document.getElementById('attack_R_chart07');
var attack_R_myChart07 = echarts.init(attack_R_chart07);
option && attack_R_myChart07.setOption(option);
new ResizeObserver(() => attack_R_myChart07.resize()).observe(attack_R_chart07);

attack_R_myChart07.setOption({
    series: [
        {
            name: '영등포구 갑 평가 점수',
            data: ['26']
        },
        {
            name: '지역평균 평가 점수',
            data: ['32.5']
        }
    ]
});



/!*보육시설수*!/
var attack_R_chart08 = document.getElementById('attack_R_chart08');
var attack_R_myChart08 = echarts.init(attack_R_chart08);
option && attack_R_myChart08.setOption(option);
new ResizeObserver(() => attack_R_myChart08.resize()).observe(attack_R_chart08);

attack_R_myChart08.setOption({
    series: [
        {
            name: '영등포구 갑 평가 점수',
            data: ['87']
        },
        {
            name: '지역평균 평가 점수',
            data: ['36.5']
        }
    ]
});


*/
