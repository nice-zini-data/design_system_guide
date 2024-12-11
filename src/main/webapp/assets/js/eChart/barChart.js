const defaultChartOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        show: false,
    },
    grid: {
        top: '10%', left: '5%', right: '5%', bottom: '20%'
    },
    xAxis: {
        type: 'value',
        axisTick: { show: false },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#F1F1F3',
                type: 'dashed',
                width: 1,
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#8C8C8C',
                fontSize: 12,
                fontWeight: '400',
                fontFamily: 'Pretendard'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#F1F1F3',
                type: 'dashed',
                width: 1,
            }
        }
    },
    yAxis: {
        type: 'category',
        data: ['카테고리1','카테고리2','카테고리3','카테고리4','카테고리4'],
        axisTick: { show: false },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#F1F1F3',
                type: 'dashed',
                width: 1,
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#F1F1F3',
                type: 'dashed',
                width: 1,
            }
        },
        axisLabel: {
            textStyle: {
                color: '#8C8C8C',
                fontSize: 12,
                fontWeight: '400',
                fontFamily: 'Pretendard'
            }
        }

    },

    series: [
        {
            name: '메뉴',
            data: [150, 80, 70, 110, 130,50],
            type: 'bar',
            itemStyle: {
                color: 'rgba(255, 114, 104, 0.80)',
                barBorderRadius: [4, 4, 4, 4]
            },
            barWidth: '24px',
            label:{
                show:true,
                position: 'insideLeft',
                fontSize: 12,
                fontWeight: '500',
                fontFamily: 'Pretendard'
            }
        }
    ]
};

let chartOption = null;

//차트 생성 함수
const generateChart = (option) => {
    let barChart = document.getElementById('barChart');

    if(Object.keys(option).length > 0){
        chartOption = option;
    }else{
        chartOption = defaultChartOption;
    }

    //설정한 옵션값으로 barChart 생성
    let myChart_barChart = echarts.init(barChart).setOption(chartOption);

    //barChart 동적 랜더링
    if(myChart_barChart){
        new ResizeObserver(() => myChart_barChart.resize()).observe(barChart);
    }
}

//코드 생성 함수
const generateCode = () => {
    window.navigator.clipboard.writeText(JSON.stringify(chartOption)).then(() => {
        alert(JSON.stringify(chartOption) + ' 차트 스크립트 복사 성공');
    });
}