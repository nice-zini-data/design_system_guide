
function setChart(response, param){
    loadingBar(false);
    $('.changeTxt').text(response.data.areaNm + " 대출 분석");
    $('.loan_change_txt').text(response.data.areaNm + " 평균 대출 잔액");

    /*영등포구 갑 평균 대출잔액*/

    var loan_chart01 = document.getElementById('loan_chart01');
    var loan_myChart01 = echarts.init(loan_chart01);
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
            data: ['전국', $(".selectTit.mega.top > span").text() + ' 평균', response.data.areaNm + ' 평균'],
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
                data: [
                {
                    /*전국*/
                    value: response.data.stat[0].allLoanAmt,
                    itemStyle:{
                        color:'#98B5FFFF'
                    }
                },{
                    /*서울시 평균*/
                    value: response.data.stat[0].megaLoanAmt,
                    itemStyle:{
                        color:'#005EE7'
                    }
                },
                    {
                        /*영등포구 갑 평균*/
                        value: response.data.stat[0].loanAmt,
                        itemStyle: {
                            color: '#5AC3DB'
                        }
                    }
                ],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: '#f5f5f5'
                },
                itemStyle: {
                    barBorderRadius: [4, 4, 4, 4],

                },
                barWidth: '20px',
                label: {
                    show: false,
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
            }
        ]
    };

    option && loan_myChart01.setOption(option);
    new ResizeObserver(() => loan_myChart01.resize()).observe(loan_chart01);


    /*대출 종류별 보유비율 그래프*/
    var data = [];
    response.data.loan.forEach(function(val, idx){
        if(param.type == "holder"){
            data = [
                {
                    /*제 1금융대출*/
                    value: val.loanSect1Holder,
                    itemStyle:{
                        color:'#005EE7'
                    }
                },
                {
                    /*제 2금융대출*/
                    value: val.loanSect2Holder,
                    itemStyle: {
                        color: '#65C7DD'
                    }
                },
                {
                    /*주택담보대출*/
                    value: val.loanCreditHolder,
                    itemStyle: {
                        color: '#FF9595'
                    }
                },
                {
                    /*기타담보대출*/
                    value: val.loanHouseHolder,
                    itemStyle: {
                        color: '#F6AF6D'
                    }
                },
                {
                    /*신용대출*/
                    value: val.loanOtherPledgeHolder,
                    itemStyle: {
                        color: '#AD81C8'
                    }
                },
                {
                    /*신용/주택/기타담보 외의 대출*/
                    value: val.loanOthersHolder,
                    itemStyle: {
                        color: '#506076'
                    }
                }
            ]
        }else{
            data = [
                {
                    /*제 1금융대출*/
                    value: val.loanSect1Amt,
                    itemStyle:{
                        color:'#005EE7'
                    }
                },
                {
                    /*제 2금융대출*/
                    value: val.loanSect2Amt,
                    itemStyle: {
                        color: '#65C7DD'
                    }
                },
                {
                    /*주택담보대출*/
                    value: val.loanCreditAmt,
                    itemStyle: {
                        color: '#FF9595'
                    }
                },
                {
                    /*기타담보대출*/
                    value: val.loanHouseAmt,
                    itemStyle: {
                        color: '#F6AF6D'
                    }
                },
                {
                    /*신용대출*/
                    value: val.loanOtherPledgeAmt,
                    itemStyle: {
                        color: '#AD81C8'
                    }
                },
                {
                    /*신용/주택/기타담보 외의 대출*/
                    value: val.loanOthersAmt,
                    itemStyle: {
                        color: '#506076'
                    }
                }
            ]
        }
    });

    var loan_chart02 = document.getElementById('loan_chart02');
    var loan_myChart02 = echarts.init(loan_chart02);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '20px',
            bottom: '20px',
            left: '0',
            right: '0',
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
            data: ['제 1금융대출','제 2금융대출','신용대출','주택담보대출','기타담보대출','신용/주택/기타담보 외의 대출'],
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
                    barBorderRadius: [4, 4, 4, 4],

                },
                barWidth: '20px',
                label: {
                    show: false,
                    formatter: function (params) {
                        var returnVal = echarts.format.addCommas(params.value);
                        return returnVal;
                    }
                },
            }
        ]
    };

    option && loan_myChart02.setOption(option);
    new ResizeObserver(() => loan_myChart02.resize()).observe(loan_chart02);

    /*대출 종류별 변화*/

    var label = [];
    var data0 = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];
    var data5 = [];
    var color_list = ['#005EE7', '#65C7DD', '#FF9595', '#F6AF6D', '#AD81C8', '#506076'];
    var labal_list = ['제 1금융대출','제 2금융대출','신용대출','주택담보대출','기타담보대출','신용/주택/기타담보 외의 대출'];

    response.data.loanHis.forEach(function(val, idx){
        label.push(val.yyyymmStr);
        if(param.type == "holder"){
            data0.push(val.loanSect1Holder);
            data1.push(val.loanSect2Holder);
            data2.push(val.loanCreditHolder);
            data3.push(val.loanHouseHolder);
            data4.push(val.loanOtherPledgeHolder);
            data5.push(val.loanOthersHolder);
        }else{
            data0.push(val.loanSect1Amt);
            data1.push(val.loanSect2Amt);
            data2.push(val.loanCreditAmt);
            data3.push(val.loanHouseAmt);
            data4.push(val.loanOtherPledgeAmt);
            data5.push(val.loanOthersAmt);
        }
    });

    var data = [];
    for(var i=0;i<6;i++){
        var obj = {
            name: labal_list[i],
            type: 'line',
            data: eval('data' + i),
            itemStyle:{color:color_list[i]},
            symbolSize: 8,
            symbol: 'circle',
        }
        data.push(obj);
    }

    var loan_chart03 = document.getElementById('loan_chart03');
    var loan_myChart03 = echarts.init(loan_chart03);

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            bottom: 'top',
            left: 'right',
            data: labal_list,
            itemStyle:{
                borderRadius:'4'
            }
        },
        grid: {
            left: '20px',
            right: '30px',
            bottom: '60px',
            top:'20px',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
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
        },
        series: data
    };


    option && loan_myChart03.setOption(option);
    new ResizeObserver(() => loan_myChart03.resize()).observe(loan_chart03);

}