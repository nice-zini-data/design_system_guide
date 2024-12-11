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
                        <p class="txt_xl_sb">Bar Chart 환경 설정 및 Option</p>
                        <div class="txt_m_m subContInnerBox">
                            <p class="txt_m_m">Bar Chart 옵션</p>
                        </div>
                        <div class="subContInnerBox mt16">
                            <div class="layout_lcr">
                                <p class="txt_m_m mb16">Bar Chart</p>
                                <button class="whBtn txt_m_m pA6 radius_8 mb16 copyBtnBar ">Chart 코드 복사</button>
                            </div>
                            <div class="whBox">
                                <div class="chartSize" id="barChart"></div>
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

        $('.copyBtnBar').click(function(){
            let copyTable = barChart.toString();

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
</script>

<%@ include file="/WEB-INF/views/common/footer.jsp" %>