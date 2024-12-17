const chartData1 = [
    {
        name: '메뉴1',
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

//차트 2개
const chartData2 = [
    {
        name: '메뉴1',
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
    },
    {
        name: '메뉴2',
        data: [130, 60, 50, 90, 110,30],
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

//차트 3개
const chartData3 = [
    {
        name: '메뉴1',
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
    },
    {
        name: '메뉴2',
        data: [130, 60, 50, 90, 110,30],
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
    },
    {
        name: '메뉴3',
        data: [170, 100, 90, 130, 150, 70],
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

let chartHorizontalOption = {
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
        top: '10%',
        left: '15%',
        right: '15%',
        bottom: '20%'
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
        data: ['카테고리1','카테고리2','카테고리3','카테고리4','카테고리5'],
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

    series: chartData1
};


//코드 생성 함수
const generateCode = () => {
    window.navigator.clipboard.writeText(JSON.stringify(chartHorizontalOption)).then(() => {
        alert(JSON.stringify(chartHorizontalOption) + ' 차트 스크립트 복사 성공');
    });
}


//디폴트 차트 생성
const defaultChart = (chartOption) => {
    let defaultBarChart = document.getElementById('defaultBarChart');

//설정한 옵션값으로 barChart 생성
    let myChart_defaultBarChart = echarts.init(defaultBarChart).setOption(chartOption);

    if(myChart_defaultBarChart){
        new ResizeObserver(() => myChart_defaultBarChart.resize()).observe(barChart);
    }
}

//디폴트 차트 생성
const setDefaultChartOption = (chartOption) => {
    //grid 옵션
    $("#grid_top").val(chartOption.grid.top);
    $("#grid_left").val(chartOption.grid.left);
    $("#grid_right").val(chartOption.grid.right);
    $("#grid_bottom").val(chartOption.grid.bottom);

    //바 넓이
    $("#barWidth").val(chartOption.series[0].barWidth);
    // $("#legend_left").val(chartOption.legend.left);
    // $("#legend_right").val(chartOption.legend.right);
    // $("#legend_bottom").val(chartOption.legend.bottom);
}

//차트 생성 함수
const generateChart = (chartOption) => {
    let option = chartOption;

    let barChart = document.getElementById('barChart');

    //설정한 옵션값으로 barChart 생성
    let myChart_barChart = echarts.init(barChart).setOption(option, { notMerge: true });

    //barChart 동적 랜더링
    if(myChart_barChart){
        new ResizeObserver(() => myChart_barChart.resize()).observe(barChart);
    }
}

//그리드 옵션
const setGridOption = (e) => {
    switch(e.target.id) {
        case "grid_top" :
            chartHorizontalOption.grid.top = e.target.value;
            break;
        case "grid_left" :
            chartHorizontalOption.grid.left = e.target.value;
            break;
        case "grid_right" :
            chartHorizontalOption.grid.right = e.target.value;
            break;
        case "grid_bottom" :
            chartHorizontalOption.grid.bottom = e.target.value;
            break;
    }

    console.log("chartHorizontalOption - grid");
    console.log(chartHorizontalOption);
}

//범례
const setLegendOption = (e) => {
    switch(e.target.id) {
        case "legend" :
            if(e.target.value === "1"){
                delete chartHorizontalOption.legend;

                chartHorizontalOption.legend = {
                    show: false
                };

                $("#legendDeatilOption").css("display", "none");
            }else{
                chartHorizontalOption.legend.show = true;
                $("#legendDeatilOption").css("display", "block");
            }
            break;
        // case "legend_top" :
        //     if(e.target.value){
        //         chartOption.legend.top = e.target.value;
        //     }
        //     break;
        // case "legend_left" :
        //     if(e.target.value){
        //         chartOption.legend.left = e.target.value;
        //     }
        //     break;
        // case "legend_right" :
        //     if(e.target.value){
        //         chartOption.legend.right = e.target.value;
        //     }
        //     break;
        // case "legend_bottom" :
        //     if(e.target.value){
        //         chartOption.legend.bottom = e.target.value;
        //     }
        //     break;
    }

    console.log("chartOption - legend");
    console.log(chartHorizontalOption);
}

//범례 상세
const setLegendDetailOption = (e) => {
    switch(e.target.id) {
        case "legendLocation" :
            if(e.target.value === "0"){
                delete chartHorizontalOption.legend;

                chartHorizontalOption.legend = {
                    show : true,
                    top  : "0%",
                    left : "50%"
                };
            }

            if(e.target.value === "1"){
                delete chartHorizontalOption.legend;

                chartHorizontalOption.legend = {
                    show : true,
                    top  : "50%",
                    left : "0%",
                };
            }

            if(e.target.value === "2"){
                delete chartHorizontalOption.legend;

                chartHorizontalOption.legend = {
                    show  : true,
                    top   : "50%",
                    right : "0%"
                };
            }

            if(e.target.value === "3"){
                delete chartHorizontalOption.legend;

                chartHorizontalOption.legend = {
                    show   : true,
                    left   : "50%",
                    bottom : "0%"
                };
            }
            break;
        case "legendOrient" :
            chartHorizontalOption.legend.orient = e.target.value;
            break;
        case "legendAlign" :
            chartHorizontalOption.legend.align = e.target.value;
            break;
    }

    console.log("chartHorizontalOption - checkLegendDetailOption");
    console.log(chartHorizontalOption);
}

//x축 설정
const setXaxisOption = (e) => {
    switch(e.target.id) {
        //축눈금
        case "axisXtick" :
            if(e.target.value === "0"){
                chartHorizontalOption.xAxis.axisTick.show = true;
            }

            if(e.target.value === "1"){
                chartHorizontalOption.xAxis.axisTick.show = false;
            }
            break;
        //축선
        case "axisXline" :
            if(e.target.value === "0"){
                chartHorizontalOption.xAxis.axisLine.show = true;
            }

            if(e.target.value === "1"){
                chartHorizontalOption.xAxis.axisLine.show = false;
            }
            break;
        case "axisXlineColor" :
            chartHorizontalOption.xAxis.axisLine.lineStyle.color = e.target.value;
            break;
        case "axisXlineType" :
            chartHorizontalOption.xAxis.axisLine.lineStyle.type = e.target.value;
            break;
        case "axisXlineWidth" :
            chartHorizontalOption.xAxis.axisLine.lineStyle.width = e.target.value;
            break;
        //라벨
        case "axisXlabelColor" :
            chartHorizontalOption.xAxis.axisLabel.textStyle.color = e.target.value;
            break;
        case "axisXlabelFontSize" :
            chartHorizontalOption.xAxis.axisLabel.textStyle.fontSize = e.target.value;
            break;
        case "axisXlabelFontWeight" :
            chartHorizontalOption.xAxis.axisLabel.textStyle.fontWeight = e.target.value;
            break;
        case "axisXlabelFontFamily" :
            chartHorizontalOption.xAxis.axisLabel.textStyle.fontFamily = e.target.value;
            break;
        //보조선
        case "axisXsplitLine" :
            if(e.target.value === "0"){
                chartHorizontalOption.xAxis.splitLine.show = true;
            }

            if(e.target.value === "1"){
                chartHorizontalOption.xAxis.splitLine.show = false;
            }
            break;
        case "axisXsplitLineColor" :
            chartHorizontalOption.xAxis.splitLine.lineStyle.color = e.target.value;
            break;
        case "axisXsplitLineType" :
            chartHorizontalOption.xAxis.splitLine.lineStyle.type = e.target.value;
            break;
        case "axisXsplitLineWidth" :
            chartHorizontalOption.xAxis.splitLine.lineStyle.width = e.target.value;
            break;
    }

    console.log("chartOption - x축");
    console.log(chartHorizontalOption);
}

//y축 설정
const setYaxisOption = (e) => {
    switch(e.target.id) {
        //축눈금
        case "axisYtick" :
            if(e.target.value === "0"){
                chartHorizontalOption.yAxis.axisTick.show = true;
            }

            if(e.target.value === "1"){
                chartHorizontalOption.yAxis.axisTick.show = false;
            }
            break;
        //축선
        case "axisYline" :
            if(e.target.value === "0"){
                chartHorizontalOption.yAxis.axisLine.show = true;
            }

            if(e.target.value === "1"){
                chartHorizontalOption.yAxis.axisLine.show = false;
            }
            break;
        case "axisYlineColor" :
            chartHorizontalOption.yAxis.axisLine.lineStyle.color = e.target.value;
            break;
        case "axisYlineType" :
            chartHorizontalOption.yAxis.axisLine.lineStyle.type = e.target.value;
            break;
        case "axisYlineWidth" :
            chartHorizontalOption.yAxis.axisLine.lineStyle.width = e.target.value;
            break;
        //라벨
        case "axisYlabelColor" :
            chartHorizontalOption.yAxis.axisLabel.textStyle.color = e.target.value;
            break;
        case "axisYlabelFontSize" :
            chartHorizontalOption.yAxis.axisLabel.textStyle.fontSize = e.target.value;
            break;
        case "axisYlabelFontWeight" :
            chartHorizontalOption.yAxis.axisLabel.textStyle.fontWeight = e.target.value;
            break;
        case "axisYlabelFontFamily" :
            chartHorizontalOption.yAxis.axisLabel.textStyle.fontFamily = e.target.value;
            break;
        //보조선
        case "axisYsplitLine" :
            if(e.target.value === "0"){
                chartHorizontalOption.yAxis.splitLine.show = true;
            }

            if(e.target.value === "1"){
                chartHorizontalOption.yAxis.splitLine.show = false;
            }
            break;
        case "axisYsplitLineColor" :
            chartHorizontalOption.yAxis.splitLine.lineStyle.color = e.target.value;
            break;
        case "axisYsplitLineType" :
            chartHorizontalOption.yAxis.splitLine.lineStyle.type = e.target.value;
            break;
        case "axisYsplitLineWidth" :
            chartHorizontalOption.yAxis.splitLine.lineStyle.width = e.target.value;
            break;
    }

    console.log("chartOption - y축");
    console.log(chartHorizontalOption);
}

//y축 설정
const setDataSeriesOption = (e) => {
    switch(e.target.id) {
        //바 차트 개수
        case "barCnt" :
            if(e.target.value === "1"){
                chartHorizontalOption.series = chartData1;
            }

            if(e.target.value === "2"){
                chartHorizontalOption.series = chartData2;
            }

            if(e.target.value === "3"){
                chartHorizontalOption.series = chartData3;
            }

            for(const option of chartHorizontalOption.series) {
                option.barWidth = $("#bar_width").val();
            }
            break;
        case "barWidth" :
            if(e.target.value){
                for(const option of chartHorizontalOption.series) {
                    option.barWidth = e.target.value;
                }
            }
            break;
        case "barLabel" :
            for(const option of chartHorizontalOption.series) {
                if(e.target.value === "0"){
                    option.label.show = true;
                }

                if(e.target.value === "1"){
                    option.label.show = false;
                }
            }
            break;
        case "barLabelPosition" :
            for(const option of chartHorizontalOption.series) {
                option.label.position = e.target.value;
            }
            break;
        case "barLabelFontSize" :
            for(const option of chartHorizontalOption.series) {
                option.label.fontSize = e.target.value;
            }
            break;
        case "barLabelFontWeight" :
            for(const option of chartHorizontalOption.series) {
                option.label.fontSize = e.target.value;
            }
            break;
        case "barLabelFontFamily" :
            for(const option of chartHorizontalOption.series) {
                option.label.fontFamily = e.target.value;
            }
            break;
        case "barColor" :
            for(const option of chartHorizontalOption.series) {
                option.itemStyle.color = e.target.value;
            }
            break;
        case "barBackground" :
            for(const option of chartHorizontalOption.series) {
                if(e.target.value === "0"){
                    option.showBackground = true;
                    option.backgroundStyle = {
                        color : "#000000"
                    };
                }

                if(e.target.value === "1"){
                    option.showBackground = false;
                    delete option.backgroundStyle
                }
            }
            break;
    }

    console.log("chartOption - 바랑 데이터");
    console.log(chartHorizontalOption);
}