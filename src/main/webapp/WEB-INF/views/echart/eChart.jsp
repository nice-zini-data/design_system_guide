<!-- main => index -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/common/head.jsp" %>
<%@ include file="/WEB-INF/views/common/script.jsp" %>

<div class="wrap">

<!--좌측 사이드 바-->
<%@ include file="/WEB-INF/views/common/side.jsp" %>

<div class="contInner">
    <div class="subPage">
        <section class="subTabChangeCont">
        <div class="includeContent">
            <section class="subTabChangeCont">
                <div class="subContInner">
                    <p class="txt_xl_sb">EChart 환경 설정 및 Option</p>
                    <div class="txt_m_m subContInnerBox">
                        <a href="/assets/js/echarts.min.js" class="downloadText" download="echarts.min.js"><p class="">echart.min.js 파일 다운받기</p></a>

                        <p class="txt_m_m mt16">js 파일 다운로드 후 상단 &lt;head&gt; &lt;/head&gt;에 추가</p>
                        <p class="txt_m_m">차트 영역 잡기 <span class="blue_500">.chartSize</span> class 추가</p>
                        <p class="txt_m_m">옵션 스크립트에 추가</p>

                    </div>
                    <div class="subContInnerBox mt16">
                        <div class="layout_lcr">
                            <p class="txt_m_m mb16">Bar Chart</p>
                            <button class="whBtn txt_m_m pA6 radius_8 mb16 copyBtnBar ">Chart 코드 복사</button>
                        </div>
                        <div class="whBox">
                            <div class="chartSize" id="barChart"></div>
                        </div>

                        <div class="layout_lcr">
                            <p class="txt_m_m mb16 pt32">Line Chart</p>
                            <button class="whBtn txt_m_m pA6 radius_8 mb16 copyBtnLine ">Chart 코드 복사</button>
                        </div>
                        <div class="whBox">
                            <div class="chartSize" id="lineChart"></div>
                        </div>

                        <div class="layout_lcr">
                            <p class="txt_m_m mb16 pt32">Bar Line Chart</p>
                            <button class="whBtn txt_m_m pA6 radius_8 mb16 copyBtnBarLine ">Chart 코드 복사</button>
                        </div>
                        <div class="whBox">
                            <div class="chartSize" id="barLineChart"></div>
                        </div>

                        <div class="layout_lcr">
                            <p class="txt_m_m mb16 pt32">pie Chart</p>
                            <button class="whBtn txt_m_m pA6 radius_8 mb16 copyBtnPie ">Chart 코드 복사</button>
                        </div>
                        <div class="whBox">
                            <div class="chartSize" id="pieChart"></div>
                        </div>

                        <div class="layout_lcr">
                            <p class="txt_m_m mb16 pt32">line min max Chart</p>
                            <button class="whBtn txt_m_m pA6 radius_8 mb16 copyBtnLineMinMax ">Chart 코드 복사</button>
                        </div>
                        <div class="whBox">
                            <div class="chartSize" id="lineMinMaxChart"></div>
                        </div>


                    </div>

                </div>
            </section>
        </div>
    </section>
    </div>
</div>

<script>

    $(function(){
        barChart();
        lineChart();
        barLineChart();
        pieChart();
        lineMinMaxChart();

        $('.copyBtnBar').click(function(){
            var copyTable = barChart.toString();

            window.navigator.clipboard.writeText(copyTable).then(() => {
                alert(copyTable + ' 차트 스크립트 복사 성공');
            });
        });

        $('.copyBtnLine').click(function(){
            var copyTable = lineChart.toString();

            window.navigator.clipboard.writeText(copyTable).then(() => {
                alert(copyTable + ' 차트 스크립트 복사 성공');
            });
        });

        $('.copyBtnBarLine').click(function(){
            var copyTable = barLineChart.toString();

            window.navigator.clipboard.writeText(copyTable).then(() => {
                alert(copyTable + ' 차트 스크립트 복사 성공');
            });
        });

        $('.copyBtnPie').click(function(){
            var copyTable = pieChart.toString();

            window.navigator.clipboard.writeText(copyTable).then(() => {
                alert(copyTable + ' 차트 스크립트 복사 성공');
            });
        });

        $('.copyBtnLineMinMax').click(function(){
            var copyTable = lineMinMaxChart.toString();

            window.navigator.clipboard.writeText(copyTable).then(() => {
                alert(copyTable + ' 차트 스크립트 복사 성공');
            });
        });

    });

    const barChart = () => {
        //옆으로 누운 바 차트
        var option;

        var barChart = document.getElementById('barChart');
        var myChart_barChart = echarts.init(barChart);

        option = {
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

        option && myChart_barChart.setOption(option);
        new ResizeObserver(() => myChart_barChart.resize()).observe(barChart);

    }

    const lineChart = () => {
        //라인 차트
        var option;

        var lineChart = document.getElementById('lineChart');
        var myChart_lineChart = echarts.init(lineChart);

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                show: true,
                bottom: 0,
                textStyle: {
                    color: '#8C8C8C',
                    fontSize: 11,
                    fontWeight: '400',
                    fontFamily: 'Pretendard'
                },
            },
            grid: {
                top: '10%', left: '5%', right: '5%', bottom: '10%'
            },
            xAxis: {
                type: 'category',
                data: ['24.01', '24.02', '24.03', '24.04', '24.05', '24.06'],
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
            yAxis: {
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

            series: [
                {
                    name: '카테고리1',
                    data: [150, 80, 70, 110, 130,50],
                    type: 'line',
                    itemStyle: {
                        color: '#FFCD70',
                        barBorderRadius: [4, 4, 4, 4]
                    },
                    barWidth: '26px',
                },
                {
                    name: '카테고리2',
                    data: [120, 200, 150, 80, 70, 110],
                    type: 'line',
                    symbolSize: 10,
                    itemStyle:{
                        color:'#EA9245',
                        borderColor:'#fff',
                        borderWidth:1,
                        borderType:'solid',
                    },
                }

            ]
        };

        option && myChart_lineChart.setOption(option);
        new ResizeObserver(() => myChart_lineChart.resize()).observe(lineChart);
    }

    const barLineChart = () => {
        //바 + 라인 차트
        var option;

        var barLineChart = document.getElementById('barLineChart');
        var myChart_barLineChart = echarts.init(barLineChart);

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                show: true,
                bottom: 0,
                textStyle: {
                    color: '#8C8C8C',
                    fontSize: 11,
                    fontWeight: '400',
                    fontFamily: 'Pretendard'
                },
            },
            grid: {
                top: '10%', left: '5%', right: '5%', bottom: '10%'
            },
            xAxis: {
                type: 'category',
                data: ['24.01', '24.02', '24.03', '24.04', '24.05', '24.06'],
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
            yAxis: {
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

            series: [
                {
                    name: '카테고리1',
                    data: [150, 80, 70, 110, 130,50],
                    type: 'bar',
                    itemStyle: {
                        color: '#FFCD70',
                        barBorderRadius: [4, 4, 4, 4]
                    },
                    barWidth: '26px',
                },
                {
                    name: '카테고리2',
                    data: [120, 200, 150, 80, 70, 110],
                    type: 'line',
                    symbolSize: 10,
                    itemStyle:{
                        color:'#EA9245',
                        borderColor:'#fff',
                        borderWidth:1,
                        borderType:'solid',
                    },
                }

            ]
        };

        option && myChart_barLineChart.setOption(option);
        new ResizeObserver(() => myChart_barLineChart.resize()).observe(barLineChart);
    }

    const pieChart = () => {
        //파이차트 + hover

        var option;

        var pieChart = document.getElementById('pieChart');
        var myChart_pieChart = echarts.init(pieChart);

        option = {
            legend: {
                orient: 'vertical',  // 범례를 세로로 정렬
                right: '5%',
                top: 90,
                itemWidth: 8,  // 범례 아이콘의 너비
                itemHeight: 14,  // 범례 아이콘의 높이
                textStyle: {
                    fontSize: 12
                },
                data: [
                    { name: '카테고리1', icon: 'circle' },
                    { name: '카테고리2', icon: 'circle' },
                    { name: '카테고리3', icon: 'circle' },
                    { name: '카테고리4', icon: 'circle' },
                    { name: '카테고리5', icon: 'circle' },
                    { name: '카테고리6', icon: 'circle' },
                    { name: '카테고리7', icon: 'circle' },
                    { name: '카테고리8', icon: 'circle' },
                    { name: '카테고리9', icon: 'circle' },
                    { name: '카테고리10', icon: 'circle' },
                    { name: '카테고리11', icon: 'circle' },
                    { name: '카테고리12', icon: 'circle' }
                ],
                padding: [0, 20, 50, 0],  // 범례의 패딩 조정
            },
            series: [
                {
                    type: 'pie',
                    radius: ['60%', '90%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'center',
                        fontFamily: 'Pretendard',
                        // 기본 텍스트를 고정
                        formatter: function(params) {
                            // 다른 영역에 hover하지 않았을 때 기본 텍스트
                            return '{value|' + params.percent + '%}\n{name|카테고리1}';
                        },
                        rich: {
                            value: {
                                fontSize: 24,  // percent 폰트 크기
                                fontWeight: '700',
                                color: '#323232',
                                lineHeight: 28
                            },
                            name: {
                                fontSize: 14,  // name 폰트 크기
                                fontWeight: '500',
                                color: '#5C5C5C',
                                lineHeight: 28
                            }
                        },
                        color: '#323232'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontFamily: 'Pretendard',
                            // hover 시에도 같은 텍스트 유지
                            formatter: function(params) {
                                return '{value|' + params.percent + '%}\n{name|' + params.name + '}';
                            },
                            rich: {
                                value: {
                                    fontSize: 24,  // percent 폰트 크기
                                    fontWeight: '700',
                                    color: '#323232',
                                    lineHeight: 28
                                },
                                name: {
                                    fontSize: 14,  // name 폰트 크기
                                    fontWeight: '500',
                                    color: '#5C5C5C',
                                    lineHeight: 28
                                }
                            }
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 24, name: '카테고리1', itemStyle: { color: '#006BC7' } },
                        { value: 14, name: '카테고리2', itemStyle: { color: '#FF928A' } },
                        { value: 44, name: '카테고리3', itemStyle: { color: '#FFAE4C' } },
                        { value: 35, name: '카테고리4', itemStyle: { color: '#6FD195' } },
                        { value: 24, name: '카테고리5', itemStyle: { color: '#2BB7DC' } },
                        { value: 24, name: '카테고리6', itemStyle: { color: '#F4CF3B' } },
                        { value: 24, name: '카테고리7', itemStyle: { color: '#8979FF' } },
                        { value: 24, name: '카테고리8', itemStyle: { color: '#3CC3DF' } },
                        { value: 24, name: '카테고리9', itemStyle: { color: '#537FF1' } },
                        { value: 24, name: '카테고리10', itemStyle: { color: '#8C63DA' } },
                        { value: 24, name: '카테고리11', itemStyle: { color: '#1F94FF' } },
                        { value: 24, name: '카테고리12', itemStyle: { color: '#55C4AE' } },
                    ]
                }
            ]
        };

        myChart_pieChart.on('mouseover', function (params) {
            if (params.name) {
                myChart_pieChart.setOption({
                    series: [{
                        label: {
                            formatter: function () {
                                return '';
                            }
                        }
                    }]
                });
            }
        });

        myChart_pieChart.on('mouseout', function (params) {
            myChart_pieChart.setOption({
                series: [{
                    label: {
                        formatter: function (params) {
                            // mouseout 시 기본 텍스트 다시 보여주기
                            return '{value|' + params.percent + '%}\n{name|카테고리1}';
                        }
                    }
                }]
            });
        });

        option && myChart_pieChart.setOption(option);
        new ResizeObserver(() => myChart_pieChart.resize()).observe(pieChart);
    }

    const lineMinMaxChart = () => {
        //라인 최소 최대값 차트
        var option;

        var lineMinMaxChart = document.getElementById('lineMinMaxChart');
        var myChart_lineMinMaxChart = echarts.init(lineMinMaxChart);

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                show: true,
                bottom: 0,
                textStyle: {
                    color: '#8C8C8C',
                    fontSize: 11,
                    fontWeight: '400',
                    fontFamily: 'Pretendard'
                },
            },
            grid: {
                top: '10%', left: '5%', right: '5%', bottom: '20%'
            },
            xAxis: {
                type: 'category',
                data: ['24.01', '24.02', '24.03', '24.04', '24.05', '24.06', '24.07', '24.08', '24.09', '24.10', '24.11', '24.12'],
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
            yAxis: {
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
            visualMap: {
                show: false,
                dimension: 0,
                pieces: [
                    {
                        lte: 2,
                        color: '#E15247'
                    },
                    {
                        gt: 2,
                        lte: 3,
                        color: '#006BC7'
                    },
                    {
                        gt: 3,
                        lte: 4,
                        color: '#E15247'
                    },
                    {
                        gt: 4,
                        lte: 6,
                        color: '#006BC7'
                    },
                    {
                        gt: 6,
                        lte: 8,
                        color: '#E15247'
                    },
                    {
                        gt: 8,
                        lte: 9,
                        color: '#006BC7'
                    },
                    {
                        gt: 9,
                        lte: 12,
                        color: '#E15247'
                    },
                ]
            },
            series: [
                {
                    name: '정상',
                    data: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 160],
                    type: 'line',
                    itemStyle: {
                        color: '#3592DC',
                    },
                    markLine: {
                        symbol: 'none',
                        lineStyle: {
                            color: '#FF4D4F',
                            type: 'solid',
                            width: 1,
                        },
                        label: {
                            color: '#FF4D4F',
                            fontSize: 10,
                            fontWeight: 'bold',
                            formatter: function (param) {
                                return param.name;
                            }
                        },
                        data: [
                            {
                                name: '최고',
                                yAxis: 150,
                                lineStyle:{
                                    type:'dashed'
                                }
                            },
                            {
                                name: '최저',
                                yAxis: 80,
                                lineStyle:{
                                    type:'dashed'
                                }
                            }
                        ]
                    }
                }
            ]
        };

        option && myChart_lineMinMaxChart.setOption(option);
        new ResizeObserver(() => myChart_lineMinMaxChart.resize()).observe(lineMinMaxChart);

    }

</script>

<%@ include file="/WEB-INF/views/common/footer.jsp" %>