function flowpopChart(response){
    // console.log(response);
    var flowpup_chart02 = document.getElementById('flowpup_chart02');
    var flowpup_myChart02 = echarts.init(flowpup_chart02);

    var labal = ['10세 미만', '10~19세', '20~29세', '30~39세', '40~49세', '50~59세', '60~69세', '70세 이상'];
    var dataM = [];
    var dataF = [];

    response.data.forEach(function (val, idx) {
        if (val.sexDivsCd=="MALE") dataM.push(val.popCnt);
        if (val.sexDivsCd=="FEMALE") dataF.push(val.popCnt);
    });

    var data = [
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
            left: '0',
            top: '20px',
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
            data: labal,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666',
                    fontSize: 13,
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
}




