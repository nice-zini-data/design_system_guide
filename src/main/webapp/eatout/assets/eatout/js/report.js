
var chartColor = [
	'#FF8B61'
	,'#FF9D52'
	,'#FFB341'
	,'#FFCA30'
	,'#F8E224'
	,'#CFCB21'
	,'#A9B41F'
	,'#869D1F'
	,'#66851D'
	,'#4FAB61'
	,'#21A88B'
	,'#178D92'
	,'#6FADC0'
	,'#4191BD'
	,'#2C74B8'
	,'#39508C'
	,'#0D286F'
	,'#6F61A7'
	,'#663996'
	,'#9853AA'
	,'#C366BB'
	,'#F081D1'
	,'#D84F86'
	,'#C44759'
	,'#8B0014'
	,'#A5673A'
	,'#783D15'
	,'#6A4D3A'
	,'#3A2212'
	,'#A3A3A3'
]

function setBookMarkEvent(){
	// 북마크 등록 기능
	$(".setBookMark").off('click');
	$(".setBookMark").on('click', function (){
		if($(this).hasClass("on")){
			if(confirm("관심지역에서 해제 하시겠습니까?")) {
				var data = {
					centerx: markerx
					, centery: markery
					, delYn: 'Y'
				}
				getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param) {
					bookmarkCheck(param);

					custPoint = "";
					fPoint = "";
					geomType = "";
					rClick = false;
					custom = false;
					strRadius = 0;
					strGeomType = "";
					if (circle.length != 0) circle.setMap(null);
					if (polygon.length != 0) polygon.setMap(null);

					if (strMenuGubun == 6) {
						var param = {};
						getAjax("getBookmark", '/analysis/getBookmark', param, fn_bookmarkList, fn_error);
					}
				}, fn_error, "", true, true);
			}
		}else{
			var data = {
				centerx : markerx
				, centery : markery
				, range : strRadius
				, type : $("#which_report1").prop('checked') ? "0" : ($("#which_report2").prop('checked') ? "1" : "0")
				, gubun : strGeomType
				, custPoint : 'LINESTRING( ' + custPoint + ' )'
				, admiNm : strAddr
				, delYn : 'N'
			}
			getAjax("setBookMark", "/analysis/setBookmark", data, function (id, response, param){
				if(response.message != "success"){
					alert('북마크 등록 실패');
				}else{
					alert('관심지역으로 등록되었습니다.');
					bookmarkCheck(param);
					if (strMenuGubun == 6) {
						var param = {};
						getAjax("getBookmark", '/analysis/getBookmark', param, fn_bookmarkList, fn_error);
					}
				}
			}, fn_error, "", true, true);
		}
	});
}

function placeChart(response){

	var a16_1_sw = false;
	var a16_2_sw = false;
	var a16_3_sw = false;
	var a16_4_sw = false;
	response.data.reportA16.forEach(function (val, idx){
		if(val.result == "확장") a16_1_sw = true;
		if(val.result == "유지") a16_2_sw = true;
		if(val.result == "이전") a16_3_sw = true;
		if(val.result == "폐점검토") a16_4_sw = true;
	});
	if(!a16_1_sw) $("#reportA16_1").text('데이터가 없습니다.');
	if(!a16_2_sw) $("#reportA16_2").text('데이터가 없습니다.');
	if(!a16_3_sw) $("#reportA16_3").text('데이터가 없습니다.');
	if(!a16_4_sw) $("#reportA16_4").text('데이터가 없습니다.');

	var reportMap = new naver.maps.Map('reportMap', mapOptions);

	// 블럭 크기에 맞춰 zoom 하기 위함
	var blkMaxXList = [];
	var blkMinXList = [];
	var blkMaxYList = [];
	var blkMinYList = [];
	response.data.blkList.forEach(function (val){
		blkMaxXList.push(val.xmax);
		blkMinXList.push(val.xmin);
		blkMaxYList.push(val.ymax);
		blkMinYList.push(val.ymax);
	});
	var proj4Max = {"x" : Math.max.apply(Math,blkMaxXList), "y" : Math.max.apply(Math,blkMaxYList)};
	var proj4Min = {"x" : Math.min.apply(Math,blkMinXList), "y" : Math.min.apply(Math,blkMinYList)};
	var bounds = new naver.maps.LatLngBounds(
		new naver.maps.LatLng(common.proj4(proj4Min, 4326).y, common.proj4(proj4Min, 4326).x)
		, new naver.maps.LatLng(common.proj4(proj4Max, 4326).y, common.proj4(proj4Max, 4326).x)
	);
	reportMap.fitBounds(bounds);
	// ---------------------------

	// 블럭 set
	var result = getGeomJson("reportMap", "FeatureCollection", response.data.blkList);
	reportMap.data.addGeoJson(result);

	reportMap.data.setStyle(function(feature){
		var styleOptions = {
			fillOpacity : 1
			, strokeColor : '#ff8383'
			, fillColor : 'rgba(255,180,180,0.5)'
			, storkeWeight : 0.1
			, storkeOpacity : 0.1
		}
		return styleOptions;
	});
	// ---------------------------


	//rpt_chart1
	var a15Result1Data = [];
	var a15Result1Name = [];
	if(!common.isEmpty(response.data.reportA15[0].resultList1)) {
		var a15Result1 = response.data.reportA15[0].resultList1.split(",");
		a15Result1.forEach(function (val,idx) {
			var a15Result1Obj = {
				name: val.split(" ")[0]
				, value: Number(val.split(" ")[1].replace("%", ""))
				, itemStyle: {
					color: chartColor[idx],
				}
			};
			a15Result1Name.push(val.split(" ")[0]);
			a15Result1Data.push(a15Result1Obj)
		});
	}
	// console.log(a15Result1Name);
	// console.log(a15Result1Data);

	//rpt_chart1
	var chartDom = document.getElementById('rpt_chart1');
	var rpt_chart1 = echarts.init(chartDom);
	var option;

	var option = {
		grid: {
			containLabel: true,
		},
		emphasis: {
			focus: 'self',
		},
		series: [{
			name: '주변 고객 유입',
			type: 'pie',
			radius: ['40%', '60%'],
			top: '0%',
			fontFamily: 'Pretendard',
			data: a15Result1Data,
			itemStyle: {
				normal: {
					labelLine: {
						show: true
					},
					label: {
						show: true,
						position: 'center',
						formatter: '{b|{b}}' + '\n' + '{d|{d}}' + '{per|%}',
						backgroundColor: '#FFF',
						fontFamily: 'Pretendard',
						width: '74',
						rich: {
							b: {
								color: '#4C5058',
								fontSize: 11,
								fontWeight: '700',
								lineHeight: 18,
								fontFamily: 'Pretendard',
							},
							d: {
								color: '#191F28',
								fontSize: 16,
								fontWeight: '800',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
							per: {
								color: '#191F28',
								fontSize: 14,
								fontWeight: '600',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
						},
					},
				}
			},
			center: ['50%', '45%'],
			animationDuration: 1000,
			animationEasing: "sinusoidalOut",
		}],
		title: {
			text: '1상권의 특성',
			show: false,
		},
		tooltip: {
			show: false,
			//trigger: 'item',
			//formatter: function(params) {
			//	return params.name + '<br/>'
			//		+ params.marker + ' <b>' + params.value + '</b> %';
			//},
			//fontSize: 10
		},
		legend: {
			show: true,
			data: a15Result1Name,
			//orient: 'vartical',
			left: 'center',
			bottom: '0',
		},
	}

	rpt_chart1.setOption(option);
	rpt_chart1.resize();


	//rpt_chart2
	var a15Result2Data = [];
	var a15Result2Name = [];
	if(!common.isEmpty(response.data.reportA15[0].resultList21)) {
		var a15Result2 = response.data.reportA15[0].resultList21.split(",");
		a15Result2.forEach(function (val, idx) {
			var a15Result2Obj = {
				name: val.split(" ")[0]
				, value: Number(val.split(" ")[1])
				, itemStyle: {
					color: chartColor[idx],
				}
			};
			a15Result2Name.push(val.split(" ")[0]);
			a15Result2Data.push(a15Result2Obj)
		});
	}

	//rpt_chart2
	var chartDom = document.getElementById('rpt_chart2');
	var rpt_chart2 = echarts.init(chartDom);
	var option;

	var option = {
		grid: {
			containLabel: true
		},
		emphasis: {
			focus: 'self',
			fontFamily: 'Pretendard',
		},
		series: [{
			name: '주변 고객 유입',
			type: 'pie',
			radius: ['40%', '60%'],
			top: '0%',
			data: a15Result2Data,
			itemStyle: {
				normal: {
					labelLine: {
						show: true
					},
					label: {
						show: true,
						position: 'center',
						formatter: '{b|{b}}' + '\n' + '{d|{d}}' + '{per|%}',
						backgroundColor: '#FFF',
						width: '74',
						rich: {
							b: {
								color: '#4C5058',
								fontSize: 11,
								fontWeight: '700',
								lineHeight: 18,
								fontFamily: 'Pretendard',
							},
							d: {
								color: '#191F28',
								fontSize: 16,
								fontWeight: '800',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
							per: {
								color: '#191F28',
								fontSize: 14,
								fontWeight: '600',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
						},
					},
				}
			},
			center: ['50%', '45%'],
			animationDuration: 1000,
			animationEasing: "sinusoidalOut",
		}],
		title: {
			text: '1상권의 특성',
			show: false
		},
		tooltip: {
			show: false,
			//trigger: 'item',
			//formatter: function(params) {
			//	return params.name + '<br/>'
			//		+ params.marker + ' <b>' + params.value + '</b> %';
			//},
			//fontSize: 10
		},
		legend: {
			show: true,
			data: a15Result2Name,
			//orient: 'vartical',
			left: 'center',
			bottom: '0',
		},

	}

	rpt_chart2.setOption(option);
	rpt_chart2.resize();


	var chart_label = [];
	var chart_data1 = [];
	var chart_data2 = [];

	response.data.reportB02.forEach(function (val, idx) {
		if (val.gbn == 1) chart_label.push(val.yyyymm);
		if (val.gbn == 1) chart_data1.push(val.saleAmt);
		// if(val.gbn == 2) chart_data2.push(val.saleAmt);
	});

	var rpt_chart3 = echarts.init(document.getElementById('rpt_chart3'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '전체업종 상권 성장성 분석',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "매출실적",
				itemStyle: {
					color: '#C2E371',
				}
			},
				{
					name: "예상매출",
					itemStyle: {
						color: '#8db5b9',
					}
				},
			],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,

			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '매출실적',
			type: 'bar',
			data: chart_data1,
			//barWidth: '30%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#86a62b',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '10',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			// {
			//     name: '예상매출',
			//     type: 'bar',
			//     data: chart_data2,
			//     //barWidth: '30%',
			//     itemStyle: {
			//         color: '#8db5b9',
			//         barBorderRadius: [4, 4, 0, 0],
			//     },
			//     label: {
			//         show: true,
			//         position: 'outside',
			//         align: 'center',
			//         color: '#37858f',
			//         formatter: '{c}',
			//         textPadding: '12',
			//         fontWeight: '600',
			//         borderRadius: '12',
			//         fontSize: '10',
			//         fontFamily: 'Pretendard',
			//     },
			// }
		]
	};

	function start_rpt_chart3() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '10';
			labelSize = '10';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth <= 1024) {
			//left='left';
			labelSize = '10';
			fontSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '10';
			show = 'false';
			labelSize = '10';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart3.setOption(option);
		rpt_chart3.resize();
	}
	start_rpt_chart3();

	var chart_label = [];
	var chart_data1 = [];
	var chart_data2 = [];

	response.data.reportB04.forEach(function (val, idx){
		chart_label.push(val.yyyymm);
		chart_data1.push(val.oySaleAmt);
		chart_data2.push(val.beautySaleAmt);
	});

	//rpt_chart4
	var rpt_chart4 = echarts.init(document.getElementById('rpt_chart4'));
	option = {
		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '화장품업종 상권 성장성 분석',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "올리브영",
				itemStyle: {
					color: '#C2E371'
				}
			},
				{
					name: "화장품업종",
					itemStyle: {
						color: '#e39a88'
					}
				}
			],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '올리브영',
			type: 'bar',
			data: chart_data1,
			//barWidth: '30%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84A92C',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '10',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '화장품업종',
				type: 'bar',
				data: chart_data2,
				//barWidth: '30%',
				itemStyle: {
					color: '#e39a88',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#dc6044',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '10',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
		]
	};

	function start_rpt_chart4() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth <= 1024) {
			//left='left';
			labelSize = '10';
			fontSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '10';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart4.setOption(option);
		rpt_chart4.resize();
	}
	start_rpt_chart4();

	//rpt_chart5
	var chart_label = [];
	var chart_data1 = [];
	var chart_data2 = [];

	response.data.reportB06.forEach(function (val, idx){
		chart_label.push(val.yyyymm);
		chart_data1.push(val.oliveSaleAmt);
		chart_data2.push(val.beautySaleAmt);
	});

	//rpt_chart5
	var rpt_chart5 = echarts.init(document.getElementById('rpt_chart5'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '화장품업종 상권 성장성 분석',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "올리브영",
				itemStyle: {
					color: '#C2E371'
				}
			},
				{
					name: "유관업종",
					itemStyle: {
						color: '#887eab'
					}
				}
			],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '올리브영',
			type: 'bar',
			data: chart_data1,
			//barWidth: '30%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84A92C',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '10',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '유관업종',
				type: 'bar',
				data: chart_data2,
				//barWidth: '30%',
				itemStyle: {
					color: '#887eab',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#4f4572',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '10',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
		]
	};

	function start_rpt_chart5() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth <= 1024) {
			//left='left';
			labelSize = '10';
			fontSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '10';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart5.setOption(option);
		rpt_chart5.resize();
	}
	start_rpt_chart5();

	//rpt_chart6
	var chart_label = [];
	var chart_label2 = [];
	var chart_data1 = [];
	var chart6Val = [];

	var first = true;
	var second = true;
	var pushSw = false;

	if(response.data.reportC01.length > 0){
		var gubunLength = (response.data.reportC01.length / response.data.reportC01[0].storeCnt);
		var storeNm = "";
		// console.log(gubunLength);
		response.data.reportC01.forEach(function (val, idx){
			chart_data1.push(val.saleAmt);

			if(gubunLength > idx){
				chart_label.push(val.yyyymm);
			}

			if(val.pushGubun == "Y"){
				chart_label2.push(val.storeNm);
				var obj = {};
				obj = {
					name: val.storeNm,
					type: 'line',
					symbolSize: 6,
					data: chart_data1,
					emphasis: {
						focus: 'series'
					},
					symbol: 'circle',
					itemStyle: {
						borderWidth: 1,
						normal: {
							label: {
								show: true,
								position: 'outside',
								align: 'center',
								textPadding: '12',
								fontWeight: '600',
								borderRadius: '12',
								fontSize: '10',
								//lineHeight: '14',
								borderRadius: '10',
								border: '20',
								formatter: function (params) {
									var returnVal = echarts.format.addCommas(params.value);
									return returnVal;
								},
								borderRadius: 4,
								padding: 4,
							}
						}
					}
				}
				chart6Val.push(obj);
				chart_data1 = [];
			}
		});
	}
	//rpt_chart6
	var rpt_chart6 = echarts.init(document.getElementById('rpt_chart6'));
	option = {
		grid: {
			top: '20px',
			bottom: '54px',
			left: '20px',
			right: '20px'
		},
		label: {
			show: true,
		},
		title: {
			text: '매장별 예상 성장률 추이',
			show: false
		},
		legend: {
			data: chart_label2,
			bottom: 'bottom',
		},
		tooltip: {
			trigger: 'axis',
			fontSize: 10,
			/* axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            } */
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: chart_label,
			axisLabel: {
				show: true,
				lineStyle: {
					color: '#9e9e9e'
				},
				textStyle: {
					color: '#000',
					//fontSize: 9
				}
			},
		},
		yAxis: {
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#9e9e9e'
				}
			}
		},
		series: chart6Val
	};

	function start_rpt_chart6() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
			labelSize = '11';
			//left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '10';
			show = 'false';
			left = 'center';
			labelSize = '11';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart6.setOption(option);
		rpt_chart6.resize();
	}
	start_rpt_chart6();

	//rpt_chart7
	/*var chart2_label_array =
		'10대\n여성,20대초\n여성,20대후\n여성,30대초\n여성,30대후\n여성,40대초\n여성,40대후\n여성,50대이상\n여성,10대\n남성,20대초\n남성,20대후\n남성,30대초\n남성,30대후\n남성,40대초\n남성,40대후\n남성,50대이상\n남성';
	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart7 = echarts.init(document.getElementById('rpt_chart7'));
	option = {
		grid: {
			top: '0',
			bottom: '66px',
			left: '20px',
			right: '20px'
		},
		label: {
			show: true,
		},
		title: {
			text: '매장별 예상 성장률 추이',
			show: false
		},
		legend: {
			data: [response.data.reportInfo.megaNm, '해당지역', '이태원입구점', '정동점', '시청역점A', ],
			bottom: 'bottom',
		},
		tooltip: {
			trigger: 'axis',
			fontSize: 10,
			/!* axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            } *!/
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: chart2_label_array,
			axisLabel: {
				show: true,
				textStyle: {
					color: '#000',
					//fontSize: 9
				},
				interval: 0,
			},
		},
		yAxis: {
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#9e9e9e'
				}
			}
		},
		series: [{
			name: "이태원입구점",
			color: '#C2E371',
			type: 'line',
			symbolSize: 6,
			data: [20, 20, 60, 50, 70, 80, 20, 20, 60, 50, 70, 80, 20, 20, 60, 50],
			emphasis: {
				focus: 'series'
			},
			lineStyle: {
				color: '#C2E371',
			},
			symbol: 'circle',
			itemStyle: {
				borderWidth: 1,
				borderColor: '#fff',
				color: '#C2E371',
				normal: {
					label: {
						show: true,
						position: 'outside',
						align: 'center',
						//color: '#006991',
						textPadding: '12',
						fontWeight: '600',
						borderRadius: '12',
						fontSize: '10',
						//lineHeight: '14',
						borderRadius: '10',
						border: '20',
						formatter: function (params) {
							var returnVal = echarts.format.addCommas(params.value);

							return returnVal;
						},
						borderRadius: 4,
						padding: 4,
					}
				}
			},

		}, {
			name: '정동점',
			color: '#80AD9A',
			type: 'line',
			symbolSize: 6,
			data: [2, 10, 30, 20, 48, 44, 10, 30, 20, 48, 44, 10, 30, 20, 48, 44],
			emphasis: {
				focus: 'series'
			},
			lineStyle: {
				color: '#80AD9A',
			},
			symbol: 'circle',
			itemStyle: {
				borderWidth: 1,
				borderColor: '#fff',
				color: '#80AD9A',
				normal: {
					label: {
						show: true,
						position: 'outside',
						align: 'center',
						//color: '#006991',
						textPadding: '12',
						fontWeight: '600',
						borderRadius: '12',
						fontSize: '10',
						//lineHeight: '14',
						borderRadius: '10',
						border: '20',
						formatter: function (params) {
							var returnVal = echarts.format.addCommas(params.value);

							return returnVal;
						},
						borderRadius: 4,
						padding: 4,
					}
				}
			},
		},
			{
				name: '시청역점A',
				color: '#39BBC3',
				type: 'line',
				symbolSize: 6,
				data: [10, 12, 7, 16, 12, 10, 12, 7, 16, 12, 10, 12, 7, 16, 12, 10],
				emphasis: {
					focus: 'series'
				},
				lineStyle: {
					color: '#39BBC3',
				},
				symbol: 'circle',
				itemStyle: {
					borderWidth: 1,
					borderColor: '#fff',
					color: '#39BBC3',
					normal: {
						label: {
							show: true,
							position: 'outside',
							align: 'center',
							//color: '#006991',
							textPadding: '12',
							fontWeight: '600',
							borderRadius: '12',
							fontSize: '10',
							//lineHeight: '14',
							borderRadius: '10',
							border: '20',
							formatter: function (params) {
								var returnVal = echarts.format.addCommas(params.value);

								return returnVal;
							},
							borderRadius: 4,
							padding: 4,
						}
					}
				},
			},
			{
				name: response.data.reportInfo.megaNm,
				color: '#EFB300',
				type: 'line',
				symbolSize: 6,
				data: [10, 12, 7, 16, 12, 10, 12, 7, 16, 12, 10, 12, 7, 16, 12, 10],
				emphasis: {
					focus: 'series'
				},
				lineStyle: {
					color: '#EFB300',
				},
				symbol: 'circle',
				itemStyle: {
					borderWidth: 1,
					borderColor: '#fff',
					color: '#EFB300',
					normal: {
						label: {
							show: true,
							position: 'outside',
							align: 'center',
							//color: '#006991',
							textPadding: '12',
							fontWeight: '600',
							borderRadius: '12',
							fontSize: '10',
							//lineHeight: '14',
							borderRadius: '10',
							border: '20',
							formatter: function (params) {
								var returnVal = echarts.format.addCommas(params.value);

								return returnVal;
							},
							borderRadius: 4,
							padding: 4,
						}
					}
				},
			},
			{
				name: '해당지역',
				color: '#F38951',
				type: 'line',
				symbolSize: 6,
				data: [10, 12, 7, 16, 12, 10, 12, 7, 16, 12, 10, 12, 7, 16, 12, 10],
				emphasis: {
					focus: 'series'
				},
				lineStyle: {
					color: '#F38951',
				},
				symbol: 'circle',
				itemStyle: {
					borderWidth: 1,
					borderColor: '#fff',
					color: '#F38951',
					normal: {
						label: {
							show: true,
							position: 'outside',
							align: 'center',
							//color: '#006991',
							textPadding: '12',
							fontWeight: '600',
							borderRadius: '12',
							fontSize: '10',
							//lineHeight: '14',
							borderRadius: '10',
							border: '20',
							formatter: function (params) {
								var returnVal = echarts.format.addCommas(params.value);

								return returnVal;
							},
							borderRadius: 4,
							padding: 4,
						}
					}
				},
			}
		]
	};

	function start_rpt_chart7() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '10';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart7.setOption(option);
		rpt_chart7.resize();
	}
	start_rpt_chart7();*/

	//rpt_chart8
	var chart_label = [];
	var chart_data1 = [];
	var chart_data2 = [];
	response.data.reportD04.forEach(function (val, idx){
		chart_label.push(val.quarter);
		chart_data1.push(val.hmAnuIncmRto);
		chart_data2.push(val.coAnuIncmRto);
	});


	var rpt_chart8 = echarts.init(document.getElementById('rpt_chart8'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [
			{
				name: '주거인구',
				type: 'bar',
				data: chart_data1,
				barWidth: '20%',
				itemStyle: {
					color: '#efb300',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#efb300',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
			{
				name: '직장인구',
				type: 'bar',
				data: chart_data2,
				barWidth: '20%',
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#84A92C',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	};

	function start_rpt_chart8() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '10';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart8.setOption(option);
		rpt_chart8.resize();
	}
	start_rpt_chart8();


	/*//rpt_chart8_2
    var chart2_label_array =
        '시도명,행정동명';
    chart2_label_array = chart2_label_array.split(',');
    var rpt_chart8_2 = echarts.init(document.getElementById('rpt_chart8_2'));
    option = {

        grid: {
            bottom: '12%',
            top: '10%',
            left: '0%',
            right: '0%',
            containLabel: true
        },
        title: {
            text: '오늘드림 점유율 상위 10개지역',
            show: false
        },

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show: true,
            bottom: 'bottom',
            left: 'center',
        },
        label: [],
        xAxis: {
            type: 'category',
            data: chart2_label_array,
            axisLine: {
                lineStyle: {
                    color: '#9e9e9e'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666F7E',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 16,
                },
                interval: 0,
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            show: false,
            type: 'value',
            splitLine: { // y축 수치선
                show: false
            },
            axisLabel: {
                show: false,
            },

        },
        series: [{
            name: '주거인구',
            type: 'bar',
            data: [10, 20, 24, 22, 12, 34, 32, 30, 28, 16],
            barWidth: '8%',
            itemStyle: {
                color: '#efb300',
                barBorderRadius: [4, 4, 0, 0],
            },
            label: {
                show: true,
                position: 'outside',
                align: 'center',
                color: '#efb300',
                formatter: '{c}',
                textPadding: '12',
                fontWeight: '600',
                borderRadius: '12',
                fontSize: '12',
                fontFamily: 'Pretendard',
            },
        },
            {
                name: '직장인구',
                type: 'bar',
                data: [10, 20, 40, 48, 24, 32, 10, 20, 40, 48],
                barWidth: '8%',
                itemStyle: {
                    color: '#C2E371',
                    barBorderRadius: [4, 4, 0, 0],
                },
                label: {
                    show: true,
                    position: 'outside',
                    align: 'center',
                    color: '#84A92C',
                    formatter: '{c}',
                    textPadding: '12',
                    fontWeight: '600',
                    borderRadius: '12',
                    fontSize: '12',
                    fontFamily: 'Pretendard',
                },
            }
        ]
    };

    function start_rpt_chart8_2() {
        var show = option.yAxis.show;
        var left = option.legend.left;
        var labelSize = option.label.fontSize;
        var grid_l = option.grid.left;
        var grid_r = option.grid.right;
        var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

        if (window.innerWidth >= 1380) {
            show = 'false';
            fontSize = '11';
        } else if (window.innerWidth <= 280) {
            fontSize = '9';
            grid_l = '4';
            grid_r = '4';
            labelSize = '10';
        } else if (window.innerWidth <= 360) {
            fontSize = '11';
            grid_l = '0';
            grid_r = '0';
            labelSize = '10';
        } else if (window.innerWidth < 1380) {
            fontSize = '10';
            show = 'false';
        }
        option.yAxis.show = show;
        option.xAxis.axisLabel.textStyle.fontSize = fontSize;
        option.label.fontSize = labelSize;
        option.grid.left = grid_l;
        option.grid.right = grid_r;
        option.legend.left = left;

        rpt_chart8_2.setOption(option);
        rpt_chart8_2.resize();
    }
    start_rpt_chart8_2();*/

	//rpt_chart8_3
	/*var chart_data1 = [];
	var chart_data2 = [];
	var chart_label = [];

	response.data.reportD03.forEach(function (val, idx){
		chart_label.push(val.label);
		chart_data1.push(val.percnt1);
		chart_data2.push(val.percnt2);
	});

	var rpt_chart8_3 = echarts.init(document.getElementById('rpt_chart8_3'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [
			{
				name: '시도',
				type: 'bar',
				data: chart_data1,
				barWidth: '8%',
				itemStyle: {
					color: '#efb300',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#efb300',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
				},
			},
			{
				name: '행정동',
				type: 'bar',
				data: chart_data2,
				barWidth: '8%',
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#84A92C',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	};

	function start_rpt_chart8_3() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '10';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart8_3.setOption(option);
		rpt_chart8_3.resize();
	}
	start_rpt_chart8_3();*/


	//rpt_chart9
	var chart_label = [];
	var chart_data1 = [];
	var chart_data2 = [];
	response.data.reportD05.forEach(function (val, idx){
		// chart_label.push(val.label);
		chart_data1.push(val.megaAvgCardAmt);
		chart_data2.push(val.admiAvgCardAmt);
	});

	var rpt_chart9 = echarts.init(document.getElementById('rpt_chart9'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "화장품",
				itemStyle: {
					color: '#efb300'
				}

			},
				{
					name: "해당지역",
					itemStyle: {
						color: '#C2E371'
					}
				},
			],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: [response.data.reportInfo.megaNm, '해당지역'],
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [
			{
				name: '주거인구',
				type: 'bar',
				data: chart_data1,
				barWidth: '8%',
				itemStyle: {
					color: '#efb300',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#efb300',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
			{
				name: '직장인구',
				type: 'bar',
				data: chart_data2,
				barWidth: '8%',
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#84A92C',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	};

	function start_rpt_chart9() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '10';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart9.setOption(option);
		rpt_chart9.resize();
	}
	start_rpt_chart9();

	/*//rpt_chart10
    var chart2_label_array =
        '평일오전, 평일점심, 평일점심, 평일저녁, 주말오전, 주말점심, 주말오후, 주말저녁';
    chart2_label_array = chart2_label_array.split(',');
    var rpt_chart10 = echarts.init(document.getElementById('rpt_chart10'));
    option = {

        grid: {
            bottom: '12%',
            top: '10%',
            left: '0%',
            right: '0%',
            containLabel: true
        },
        title: {
            text: '오늘드림 점유율 상위 10개지역',
            show: false
        },

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show: true,
            bottom: 'bottom',
            left: 'center',
            data: [{
                name: "화장품",
                itemStyle: {
                    color: '#efb300'
                }

            },
                {
                    name: "해당지역",
                    itemStyle: {
                        color: '#C2E371'
                    }
                },
            ],
        },
        label: [],
        xAxis: {
            type: 'category',
            data: chart2_label_array,
            axisLine: {
                lineStyle: {
                    color: '#9e9e9e'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#666F7E',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 16,
                },
                interval: 0,
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            show: false,
            type: 'value',
            splitLine: { // y축 수치선
                show: false
            },
            axisLabel: {
                show: false,
            },

        },
        series: [{
            name: '화장품',
            type: 'bar',
            data: [10, 20, 24, 22, 12, 34, 32, 30, 28, 16],
            barWidth: '20%',
            itemStyle: {
                color: '#efb300',
                barBorderRadius: [4, 4, 0, 0],
            },
            label: {
                show: true,
                position: 'outside',
                align: 'center',
                color: '#efb300',
                formatter: '{c}',
                textPadding: '12',
                fontWeight: '600',
                borderRadius: '12',
                fontSize: '12',
                fontFamily: 'Pretendard',
            },
        },
            {
                name: '해당지역',
                type: 'bar',
                data: [10, 20, 40, 48, 24, 32, 10, 20, 40, 48],
                barWidth: '20%',
                itemStyle: {
                    color: '#C2E371',
                    barBorderRadius: [4, 4, 0, 0],
                },
                label: {
                    show: true,
                    position: 'outside',
                    align: 'center',
                    color: '#84A92C',
                    formatter: '{c}',
                    textPadding: '12',
                    fontWeight: '600',
                    borderRadius: '12',
                    fontSize: '12',
                    fontFamily: 'Pretendard',
                },
            }
        ]
    };

    function start_rpt_chart10() {
        var show = option.yAxis.show;
        var left = option.legend.left;
        var labelSize = option.label.fontSize;
        var grid_l = option.grid.left;
        var grid_r = option.grid.right;
        var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

        if (window.innerWidth >= 1380) {
            show = 'false';
            fontSize = '11';
        } else if (window.innerWidth <= 280) {
            fontSize = '9';
            grid_l = '4';
            grid_r = '4';
            labelSize = '10';
        } else if (window.innerWidth <= 360) {
            fontSize = '11';
            grid_l = '0';
            grid_r = '0';
            labelSize = '10';
        } else if (window.innerWidth < 1380) {
            fontSize = '10';
            show = 'false';
        }
        option.yAxis.show = show;
        option.xAxis.axisLabel.textStyle.fontSize = fontSize;
        option.label.fontSize = labelSize;
        option.grid.left = grid_l;
        option.grid.right = grid_r;
        option.legend.left = left;

        rpt_chart10.setOption(option);
        rpt_chart10.resize();
    }
    start_rpt_chart10();*/


	//rpt_chart11

	var chart_label = [];
	var chart_data1 = [];
	var chart_data2 = [];
	response.data.reportD07.forEach(function (val, idx){
		chart_label.push(val.label);
		chart_data1.push(val.percnt1);
		chart_data2.push(val.percnt2);
	});

	var rpt_chart11 = echarts.init(document.getElementById('rpt_chart11'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "화장품",
				itemStyle: {
					color: '#efb300'
				}

			},
				{
					name: "해당지역",
					itemStyle: {
						color: '#C2E371'
					}
				},
			],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},
		},
		series: [{
			name: response.data.reportInfo.megaNm,
			type: 'bar',
			data: chart_data1,
			barWidth: '20%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '해당지역',
				type: 'bar',
				data: chart_data2,
				barWidth: '20%',
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#84A92C',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	};

	function start_rpt_chart11() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '10';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart11.setOption(option);
		rpt_chart11.resize();
	}
	start_rpt_chart11();

	//echart width 오류 해결
	const rp_container1 = document.querySelector('#rpt_chart1');
	const rp_chart1 = echarts.init(rp_container1);
	new ResizeObserver(() => rp_chart1.resize()).observe(rp_container1);

	const rp_container2 = document.querySelector('#rpt_chart2');
	const rp_chart2 = echarts.init(rp_container2);
	new ResizeObserver(() => rp_chart2.resize()).observe(rp_container2);

	const rp_container3 = document.querySelector('#rpt_chart3');
	const rp_chart3 = echarts.init(rp_container3);
	new ResizeObserver(() => rp_chart3.resize()).observe(rp_container3);

	const rp_container4 = document.querySelector('#rpt_chart4');
	const rp_chart4 = echarts.init(rp_container4);
	new ResizeObserver(() => rp_chart4.resize()).observe(rp_container4);

	const rp_container5 = document.querySelector('#rpt_chart5');
	const rp_chart5 = echarts.init(rp_container5);
	new ResizeObserver(() => rp_chart5.resize()).observe(rp_container5);

	const rp_container6 = document.querySelector('#rpt_chart6');
	const rp_chart6 = echarts.init(rp_container6);
	new ResizeObserver(() => rp_chart6.resize()).observe(rp_container6);

	/*const rp_container7 = document.querySelector('#rpt_chart7');
	const rp_chart7 = echarts.init(rp_container7);
	new ResizeObserver(() => rp_chart7.resize()).observe(rp_container7);*/

	const rp_container8 = document.querySelector('#rpt_chart8');
	const rp_chart8 = echarts.init(rp_container8);
	new ResizeObserver(() => rp_chart8.resize()).observe(rp_container8);

	// const rp_container8_2 = document.querySelector('#rpt_chart8_2');
	// const rp_chart8_2 = echarts.init(rp_container8_2);
	// new ResizeObserver(() => rp_chart8_2.resize()).observe(rp_container8_2);

	// const rp_container8_3 = document.querySelector('#rpt_chart8_3');
	// const rp_chart8_3 = echarts.init(rp_container8_3);
	// new ResizeObserver(() => rp_chart8_3.resize()).observe(rp_container8_3);

	const rp_container9 = document.querySelector('#rpt_chart9');
	const rp_chart9 = echarts.init(rp_container9);
	new ResizeObserver(() => rp_chart9.resize()).observe(rp_container9);

	/*const rp_container10 = document.querySelector('#rpt_chart10');
    const rp_chart10 = echarts.init(rp_container10);
    new ResizeObserver(() => rp_chart10.resize()).observe(rp_container10);*/

	const rp_container11 = document.querySelector('#rpt_chart11');
	const rp_chart11 = echarts.init(rp_container11);
	new ResizeObserver(() => rp_chart11.resize()).observe(rp_container11);

}

function storeChart(response){

	//출점후보지 상세보고서 ----------------------------------------------------------------------------------------------------------------------------------
	var chart1Tmp = [];
	var chart1Label = [];
	var chart1Data = [];

	var i = 0;
	chart1Tmp = response.data.reportA01[0].resultList1Tab.split("|")
	if(chart1Tmp.length != 0 ){
		while(i < chart1Tmp.length){
			chart1Label.push(chart1Tmp[i].split(',')[0])
			chart1Data.push(
				{name: chart1Tmp[i].split(',')[0],
					value: chart1Tmp[i].split(',')[1],
					itemStyle: {color: chartColor[i]}}
			)
			i++;
		}
	}

	var chartDom = document.getElementById('rpt_chart33');
	var rpt_chart33 = echarts.init(chartDom);
	var option;

	var option = {
		grid: {
			containLabel: true,
		},
		emphasis: {
			focus: 'self',
		},
		series: [{
			name: '주변 고객 유입',
			type: 'pie',
			radius: ['40%', '60%'],
			top: '0%',
			fontFamily: 'Pretendard',
			data: chart1Data,
			itemStyle: {
				normal: {
					labelLine: {
						show: true
					},
					label: {
						show: true,
						position: 'center',
						formatter: '{b|{b}}' + '\n' + '{d|{d}}' + '{per|%}',
						backgroundColor: '#FFF',
						fontFamily: 'Pretendard',
						width: '74',
						rich: {
							b: {
								color: '#4C5058',
								fontSize: 11,
								fontWeight: '700',
								lineHeight: 18,
								fontFamily: 'Pretendard',
							},
							d: {
								color: '#191F28',
								fontSize: 16,
								fontWeight: '800',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
							per: {
								color: '#191F28',
								fontSize: 14,
								fontWeight: '600',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
						},
					},
				}
			},
			center: ['50%', '45%'],
			animationDuration: 1000,
			animationEasing: "sinusoidalOut",
		}],
		title: {
			text: '1상권의 특성',
			show: false,
		},
		tooltip: {
			show: false,
			//trigger: 'item',
			//formatter: function(params) {
			//	return params.name + '<br/>'
			//		+ params.marker + ' <b>' + params.value + '</b> %';
			//},
			//fontSize: 10
		},
		legend: {
			show: true,
			data: chart1Label,
			//orient: 'vartical',
			left: 'center',
			bottom: '0',
			fontFamily: 'Pretendard',
		},
	}

	rpt_chart33.setOption(option);
	rpt_chart33.resize();

	//rpt_chart34 ----------------------------------------------------------------------------------------------------------------------------------
	var chart2Tmp = [];
	var chart2Label = [];
	var chart2Data = [];

	var i = 0;
	chart2Tmp = response.data.reportA01[0].resultList2Tab.split("|")
	if(chart2Tmp.length != 0){
		while(i < chart2Tmp.length){
			chart2Label.push(chart2Tmp[i].split(',')[1])
			chart2Data.push(
				{name: chart2Tmp[i].split(',')[1],
					value: chart2Tmp[i].split(',')[2],
					itemStyle: {color: chartColor[i]}}
			)
			// console.log(JSON.stringify(chart2Data[i]));
			i++;
		}
	}

	var chartDom = document.getElementById('rpt_chart34');
	var rpt_chart34 = echarts.init(chartDom);

	var option = {
		grid: {
			containLabel: true
		},
		emphasis: {
			focus: 'self',
			fontFamily: 'Pretendard',
		},
		series: [{
			name: '주변 고객 유입',
			type: 'pie',
			radius: ['40%', '60%'],
			top: '0%',
			data: chart2Data,
			itemStyle: {
				normal: {
					labelLine: {
						show: true
					},
					label: {
						show: true,
						position: 'center',
						formatter: '{b|{b}}' + '\n' + '{d|{d}}' + '{per|%}',
						backgroundColor: '#FFF',
						width: '74',
						rich: {
							b: {
								color: '#4C5058',
								fontSize: 11,
								fontWeight: '700',
								lineHeight: 18,
								fontFamily: 'Pretendard',
							},
							d: {
								color: '#191F28',
								fontSize: 16,
								fontWeight: '800',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
							per: {
								color: '#191F28',
								fontSize: 14,
								fontWeight: '600',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
						},
					},
				}
			},
			center: ['50%', '45%'],
			animationDuration: 1000,
			animationEasing: "sinusoidalOut",
		}],
		title: {
			text: '1상권의 특성',
			show: false
		},
		tooltip: {
			show: false,
			//trigger: 'item',
			//formatter: function(params) {
			//	return params.name + '<br/>'
			//		+ params.marker + ' <b>' + params.value + '</b> %';
			//},
			//fontSize: 10
		},
		legend: {
			show: true,
			data: chart2Label,
			//orient: 'vartical',
			left: 'center',
			bottom: '0',
		},

	}

	rpt_chart34.setOption(option);
	rpt_chart34.resize();

	//rpt_chart35 ----------------------------------------------------------------------------------------------------------------------------------
	// -- olive_rStoreReport_B02 미사용으로 인한 제거
	// var chart2_label_array =
	// 	'주거인구, 직장인구, 유동인구, 시설\n유발인구, 동일유형\n전업종\n매출등급, 상권비중, 성장성, 변동성, 안정성, 구매력 ,수요-공급,동종업종\n평균매출';
	// chart2_label_array = chart2_label_array.split(',');
	// var rpt_chart35 = echarts.init(document.getElementById('rpt_chart35'));
	// option = {
	//
	// 	grid: {
	// 		bottom: '12%',
	// 		top: '10%',
	// 		left: '0%',
	// 		right: '0%',
	// 		containLabel: true
	// 	},
	// 	title: {
	// 		text: '상권유형판별',
	// 		show: false
	// 	},
	//
	// 	tooltip: {
	// 		trigger: 'axis',
	// 		axisPointer: {
	// 			type: 'shadow'
	// 		}
	// 	},
	// 	legend: {
	// 		show: true,
	// 		bottom: 'bottom',
	// 		left: 'center',
	// 		data: [{
	// 			name: "result",
	// 			itemStyle: {
	// 				color: '#f9a629'
	// 			}
	// 		}, ],
	// 	},
	// 	label: [],
	// 	xAxis: {
	// 		type: 'category',
	// 		data: chart2_label_array,
	// 		axisLine: {
	// 			lineStyle: {
	// 				color: '#9e9e9e'
	// 			}
	// 		},
	// 		axisLabel: {
	// 			show: true,
	// 			textStyle: {
	// 				color: '#666F7E',
	// 				fontSize: 13,
	// 				fontWeight: 500,
	// 				lineHeight: 16,
	// 			},
	// 			interval: 0,
	// 		},
	// 		axisTick: {
	// 			show: false
	// 		}
	// 	},
	// 	yAxis: {
	// 		show: false,
	// 		type: 'value',
	// 		splitLine: { // y축 수치선
	// 			show: false
	// 		},
	// 		axisLabel: {
	// 			show: false,
	// 		},
	//
	// 	},
	// 	series: [{
	// 		name: 'result',
	// 		type: 'bar',
	// 		data: [4, 9, 8, 7, 4, 2, 4, 2, 8, 10, 10, 8],
	// 		showBackground: true,
	// 		barWidth: '50%',
	// 		itemStyle: {
	// 			color: '#f9a629',
	// 			//barBorderRadius: [4, 4, 0, 0],
	// 		},
	// 		label: {
	// 			show: true,
	// 			position: 'inside',
	// 			align: 'center',
	// 			color: '#fff',
	// 			formatter: '{c}',
	// 			textPadding: '12',
	// 			fontWeight: '600',
	// 			borderRadius: '0',
	// 			fontSize: '12',
	// 			fontFamily: 'Pretendard',
	// 		},
	// 	}]
	// };

	// function start_rpt_chart35() {
	// 	var show = option.yAxis.show;
	// 	var left = option.legend.left;
	// 	var labelSize = option.label.fontSize;
	// 	var grid_l = option.grid.left;
	// 	var grid_r = option.grid.right;
	// 	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;
	//
	// 	if (window.innerWidth >= 1380) {
	// 		show = 'false';
	// 		fontSize = '12';
	// 	} else if (window.innerWidth <= 280) {
	// 		fontSize = '9';
	// 		grid_l = '4';
	// 		grid_r = '4';
	// 		labelSize = '10';
	// 	} else if (window.innerWidth <= 360) {
	// 		fontSize = '11';
	// 		grid_l = '0';
	// 		grid_r = '0';
	// 		labelSize = '10';
	// 	} else if (window.innerWidth < 1380) {
	// 		fontSize = '12';
	// 		show = 'false';
	// 	}
	// 	option.yAxis.show = show;
	// 	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	// 	option.label.fontSize = labelSize;
	// 	option.grid.left = grid_l;
	// 	option.grid.right = grid_r;
	// 	option.legend.left = left;
	//
	// 	rpt_chart35.setOption(option);
	// 	rpt_chart35.resize();
	// }
	//
	// start_rpt_chart35();


	//rpt_chart36 ----------------------------------------------------------------------------------------------------------------------------------

	var chart3Tmp = [];
	var chartB03Label1 = [];
	var chartB03Data1 = [];

	var i = 0;
	chart3Tmp = response.data.reportB03;

	if(chart3Tmp.length != 0 ){
		for(idx in chart3Tmp){
			if(idx >= 24){
				chartB03Label1.push(chart3Tmp[idx].yyyymm);
				chartB03Data1.push(chart3Tmp[idx].avgSaleAmt);
			}
		}
	}

	var rpt_chart36 = echarts.init(document.getElementById('rpt_chart36'));
	option = {
		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '전체업종 상권 성장성 분석',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [
				{
					name: "매출실적/예상매출",
					itemStyle: {
						color: '#C2E371',
					}
				}
			],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chartB03Label1,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			}
		},
		series: [
			{
				name: '매출실적',
				type: 'bar',
				data: chartB03Data1,
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#86a62b',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '10',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	};


	function start_rpt_chart36() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart36.setOption(option);
		rpt_chart36.resize();
	}
	start_rpt_chart36();

	//rpt_chart37 ----------------------------------------------------------------------------------------------------------------------------------

	var chart5Tmp = [];
	// var chart5color = ['#C2E371','#F1CC6D','#F9A629','#F68C7B','#80AD9A'];
	var chart5Label = [];
	var chart5Data1 = [];
	var chart5Data2 = [];
	var chart5Data3 = [];

	var i = 0;
	chart5Tmp = response.data.reportB05;

	if(chart5Tmp.length != 0 ){
		for(idx in chart5Tmp){
			// console.log(chart5Tmp[idx].allSaleAmt);
			chart5Label.push(chart5Tmp[idx].yyyymm);
			chart5Data1.push(chart5Tmp[idx].allSaleAmt);
			chart5Data2.push(chart5Tmp[idx].beautySaleAmt);
			chart5Data3.push(chart5Tmp[idx].cvsSaleAmt);
		}
	}

	var rpt_chart37 = echarts.init(document.getElementById('rpt_chart37'));
	option = {
		grid: {
			top: '40px',
			bottom: '60px',
			left: '30px',
			right: '30px'
		},
		label: {
			show: true,
		},
		title: {
			text: '상권 내 성장성 분석',
			show: false
		},
		legend: {
			data: ['화장품업종', '편의점', '전체업종'],
			bottom: 'bottom',
		},
		tooltip: {
			trigger: 'axis',
			fontSize: 10,
			/* axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999'
				}
			} */
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: chart5Label,
			axisLabel: {
				show: true,
				textStyle: {
					color: '#000',
					//fontSize: 9
				}
			},
		},
		yAxis: {
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#9e9e9e'
				}
			}
		},
		series: [{
			name: "화장품업종",
			color: '#FF8B61',
			type: 'line',
			symbolSize: 8,
			data: chart5Data2,
			emphasis: {
				focus: 'series'
			},
			lineStyle: {
				color: '#FF8B61',
			},
			symbol: 'circle',
			itemStyle: {
				borderWidth: 1,
				borderColor: '#fff',
				color: '#FF8B61',
				normal: {
					label: {
						show: true,
						position: 'outside',
						align: 'center',
						//color: '#006991',
						textPadding: '12',
						fontWeight: '600',
						borderRadius: '12',
						//fontSize:'14',
						//lineHeight: '14',
						borderRadius: '10',
						border: '20',
						formatter: function (params) {
							var returnVal = echarts.format.addCommas(params.value)
							return returnVal;
						},
						borderRadius: 4,
						padding: 4,
					}
				}
			},
		},
			{
				name: "편의점",
				color: '#5F7ECD',
				type: 'line',
				symbolSize: 8,
				data: chart5Data3,
				emphasis: {
					focus: 'series'
				},
				lineStyle: {
					color: '#5F7ECD',
				},
				symbol: 'circle',
				itemStyle: {
					borderWidth: 1,
					borderColor: '#fff',
					color: '#5F7ECD',
					normal: {
						label: {
							show: true,
							position: 'outside',
							align: 'center',
							//color: '#006991',
							textPadding: '12',
							fontWeight: '600',
							borderRadius: '12',
							//fontSize:'14',
							//lineHeight: '14',
							borderRadius: '10',
							border: '20',
							formatter: function (params) {
								var returnVal = echarts.format.addCommas(params.value)
								return returnVal;
							},
							borderRadius: 4,
							padding: 4,
						}
					}
				},
			},
			{
				name: "전체업종",
				color: '#905F43',
				type: 'line',
				symbolSize: 8,
				data: chart5Data1,
				emphasis: {
					focus: 'series'
				},
				lineStyle: {
					color: '#905F43',
				},
				symbol: 'circle',
				itemStyle: {
					borderWidth: 1,
					borderColor: '#fff',
					color: '#905F43',
					normal: {
						label: {
							show: true,
							position: 'outside',
							align: 'center',
							//color: '#006991',
							textPadding: '12',
							fontWeight: '600',
							borderRadius: '12',
							//fontSize:'14',
							//lineHeight: '14',
							borderRadius: '10',
							border: '20',
							formatter: function (params) {
								var returnVal = echarts.format.addCommas(params.value)
								return returnVal;
							},
							borderRadius: 4,
							padding: 4,
						}
					}
				},
			}
		]
	}

	function start_rpt_chart37() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var grid_l = option.grid.left;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var labelSize = option.label.fontSize;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1024) {
			show = 'true';
			fontSize = '10';
			labelSize = '10';
			left = 'center';
			fontSize = '10';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '24';
			grid_r = '24';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '24';
			grid_r = '24';
			labelSize = '10';
		} else if (window.innerWidth < 1024) {
			grid_l = '24';
			grid_r = '24';
			labelSize = '10';
			left = 'center';
			fontSize = '10';
		}
		option.yAxis.show = show
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.legend.left = left
		rpt_chart37.setOption(option);
		rpt_chart37.resize();
	}
	start_rpt_chart37();


	var chartD03Tmp = [];
	var chartD03Label = [];
	var chartD03Data1 = [];
	var chartD03Data2 = [];

	var i = 0;
	chartD03Tmp = response.data.reportD03;

	if(chartD03Tmp.length != 0 ){
		for(idx in chartD03Tmp){
			var yymm = chartD03Tmp[idx].yyyymm.substr(2,2) + "." + chartD03Tmp[idx].yyyymm.substr(4,2);
			chartD03Label.push(yymm);
			// chartD03Data1.push(chartD03Tmp[idx].allPercnt);
			chartD03Data2.push(chartD03Tmp[idx].storePercnt);
		}
	}
	//rpt_chart38(화장품 업종 대비 OY 매출 비중 - 차트)
	var rpt_chart38 = echarts.init(document.getElementById('rpt_chart38'));
	option = {
		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '상권유형판별',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [ {
				name: "화장품 매출비중",
				itemStyle: {
					color: '#efb300'
				}
			},{
				name: "올리브영 매출비중",
				itemStyle: {
					color: '#c2e371'
				}
			}],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chartD03Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 13,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},
			max : 100
		},
		series: [/*{
			name: '화장품 매출비중',
			type: 'bar',
			data: chartD03Data1,
			barWidth: '20%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},*/{
			name: '올리브영 매출비중',
			type: 'bar',
			data: chartD03Data2,
			barWidth: '20%',
			itemStyle: {
				color: '#c2e371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#444',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '0',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}]
	}

	function start_rpt_chart38() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		rpt_chart38.setOption(option);
		rpt_chart38.resize();
	}
	start_rpt_chart38();


	//rpt_chart39 ----------------------------------------------------------------------------------------------------------------------------------
	var chart7Tmp = [];
	var chart7Label = [];
	var chart7Data1 = [];
	var chart7Data2 = [];
	var chart7Data3 = [];

	var i = 0;
	chart7Tmp = response.data.reportE01;

	if(chart7Tmp.length != 0 ){
		// console.log("chart5Tmp size : "+chart7Tmp.length)
		for(idx in chart7Tmp){
			chart7Label.push(chart7Tmp[idx].label);
			chart7Data1.push(chart7Tmp[idx].percnt1);
			chart7Data2.push(chart7Tmp[idx].percnt2);
			chart7Data3.push(chart7Tmp[idx].percnt3);
			// console.log("yyyymm : " + chart7Tmp[idx].yyyymm);
		}
	}

	var rpt_chart39 = echarts.init(document.getElementById('rpt_chart39'));
	option = {
		grid: {
			top: '20px',
			bottom: '66px',
			left: '20px',
			right: '20px'
		},
		label: {
			show: true,
		},
		title: {
			text: '성/연령별 비중',
			show: false
		},
		legend: {
			data: [response.data.reportParams[0].megaNm + ' 화장품 평균', '해당지역 화장품 평균', '올리브영'],
			bottom: 'bottom',
		},
		tooltip: {
			trigger: 'axis',
			fontSize: 10,
			/* axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999'
				}
			} */
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: chart7Label,
			axisLabel: {
				show: true,
				textStyle: {
					color: '#000',
					//fontSize: 9
				},
				interval: 0,
			},
		},
		yAxis: {
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#9e9e9e'
				}
			}
		},
		series: [{
			name: response.data.reportParams[0].megaNm + ' 화장품 평균',
			color: '#C2E371',
			type: 'line',
			symbolSize: 6,
			data: chart7Data1,
			emphasis: {
				focus: 'series'
			},
			lineStyle: {
				color: '#C2E371',
			},
			symbol: 'circle',
			itemStyle: {
				borderWidth: 1,
				borderColor: '#fff',
				color: '#C2E371',
				normal: {
					label: {
						show: true,
						position: 'outside',
						align: 'center',
						//color: '#006991',
						textPadding: '12',
						fontWeight: '600',
						borderRadius: '12',
						fontSize: '10',
						//lineHeight: '14',
						borderRadius: '10',
						border: '20',
						formatter: function (params) {
							var returnVal = echarts.format.addCommas(params.value)
							return returnVal;
						},
						borderRadius: 4,
						padding: 4,
					}
				}
			}
		},
			{
				name: '해당지역 화장품 평균',
				color: '#EFB300',
				type: 'line',
				symbolSize: 6,
				data: chart7Data2,
				emphasis: {
					focus: 'series'
				},
				lineStyle: {
					color: '#EFB300',
				},
				symbol: 'circle',
				itemStyle: {
					borderWidth: 1,
					borderColor: '#fff',
					color: '#EFB300',
					normal: {
						label: {
							show: true,
							position: 'outside',
							align: 'center',
							//color: '#006991',
							textPadding: '12',
							fontWeight: '600',
							borderRadius: '12',
							fontSize: '10',
							//lineHeight: '14',
							borderRadius: '10',
							border: '20',
							formatter: function (params) {
								var returnVal = echarts.format.addCommas(params.value)
								return returnVal;
							},
							borderRadius: 4,
							padding: 4,
						}
					}
				},
			},
			{
				name: '올리브영',
				color: '#ff826e',
				type: 'line',
				symbolSize: 6,
				data: chart7Data3,
				emphasis: {
					focus: 'series'
				},
				lineStyle: {
					color: '#ff826e',
				},
				symbol: 'circle',
				itemStyle: {
					borderWidth: 1,
					borderColor: '#fff',
					color: '#ff826e',
					normal: {
						label: {
							show: true,
							position: 'outside',
							align: 'center',
							//color: '#006991',
							textPadding: '12',
							fontWeight: '600',
							borderRadius: '12',
							fontSize: '10',
							//lineHeight: '14',
							borderRadius: '10',
							border: '20',
							formatter: function (params) {
								var returnVal = echarts.format.addCommas(params.value)
								return returnVal;
							},
							borderRadius: 4,
							padding: 4,
						}
					}
				},
			},
		]
	}

	function start_rpt_chart39() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '11';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		rpt_chart39.setOption(option);
		rpt_chart39.resize();
	}
	start_rpt_chart39();

	//rpt_chart40(getStoreReportE04) - 평균 연소득 구간별 비중-----------------------------------------------------------------------------------------------
	var chartE04Tmp = [];
	// var chartE04color = ['#C2E371','#F1CC6D','#F9A629','#F68C7B','#80AD9A'];
	var chartE04Label = [];
	var chartE04Data1 = [];
	var chartE04Data2 = [];
	var chartE04Data3 = [];

	var i = 0;
	chartE04Tmp = response.data.reportE04;

	if(chartE04Tmp.length != 0 ){
		// console.log("chart5Tmp size : "+chartE04Tmp.length)
		for(idx in chartE04Tmp){
			chartE04Label.push(chartE04Tmp[idx].quarter);
			chartE04Data1.push(chartE04Tmp[idx].hMAnuIncmRto);
			chartE04Data2.push(chartE04Tmp[idx].cOAnuIncmRto);
		}
	}



	var rpt_chart40 = echarts.init(document.getElementById('rpt_chart40'));
	option = {
		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '평균 연소득 구간별 비중',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: ['주거인구', '직장인구'],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chartE04Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			}
		},
		series: [{
			name: "주거인구",
			type: 'bar',
			data: chartE04Data1,
			barWidth: '20%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '직장인구',
				type: 'bar',
				data: chartE04Data2,
				barWidth: '20%',
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#84A92C',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	}

	function start_rpt_chart40() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		rpt_chart40.setOption(option);
		rpt_chart40.resize();
	}
	start_rpt_chart40();

	// console.log(response.data.reportParams[0].megaNm);

	//rpt_chart40_2(getStoreReportE03) - 평균 연소득 금액
	var chartE03Tmp = [];
	var chartE03Label = ['직장인구', '주거인구'];
	var chartE03Data1 = [];
	var chartE03Data2 = [];

	var i = 0;
	chartE03Tmp = response.data.reportE03;

	if(chartE03Tmp.length != 0 ){
		// console.log("chartE03Tmp size : "+chartE03Tmp.length)
		for(idx in chartE03Tmp){
			chartE03Data1.push(chartE03Tmp[idx].megaAvgAnuIncm);
			chartE03Data2.push(chartE03Tmp[idx].admiAvgAnuIncm);
			// console.log("yyyymm : " + chartE03Tmp[idx].label);
		}
	}

	var rpt_chart40_2 = echarts.init(document.getElementById('rpt_chart40_2'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chartE03Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: response.data.reportParams[0].megaNm,
			type: 'bar',
			data: chartE03Data1,
			barWidth: '8%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '해당지역',
				type: 'bar',
				data: chartE03Data2,
				barWidth: '8%',
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#84A92C',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	};

	function start_rpt_chart40_2() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		rpt_chart40_2.setOption(option);
		rpt_chart40_2.resize();
	}
	start_rpt_chart40_2();


	//rpt_chart41(getStoreReportE04) - 평균 연소득 구간별 비중-----------------------------------------------------------------------------------------------
	var chartE05Tmp = [];
	var chartE05Label = ['직장인구','주거인구'];
	var chartE05Data1 = [];
	var chartE05Data2 = [];

	var i = 0;
	chartE05Tmp = response.data.reportE05;

	if(chartE05Tmp.length != 0 ){
		// console.log("chart5Tmp size : "+chartE04Tmp.length)
		for(idx in chartE05Tmp){
			chartE05Data1.push(chartE05Tmp[idx].megaAvgCardAmt);
			chartE05Data2.push(chartE05Tmp[idx].admiAvgCardAmt);
		}
	}

	var rpt_chart41 = echarts.init(document.getElementById('rpt_chart41'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chartE05Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: response.data.reportParams[0].megaNm,
			type: 'bar',
			data: chartE05Data1,
			barWidth: '8%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '해당지역',
				type: 'bar',
				data: chartE05Data2,
				barWidth: '8%',
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#84A92C',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	};

	function start_rpt_chart41() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		rpt_chart41.setOption(option);
		rpt_chart41.resize();
	}
	start_rpt_chart41();

	//rpt_chart42(소비시간 별 비중 - 요일)
	var chartE06Tmp = [];
	var chartE06Label = [];
	var chartE06Data1 = [];
	var chartE06Data2 = [];

	var i = 0;
	chartE06Tmp = response.data.reportE06;

	if(chartE06Tmp.length != 0 ){
		// console.log("chartE03Tmp size : "+chartE03Tmp.length)
		for(idx in chartE06Tmp){
			chartE06Label.push(chartE06Tmp[idx].label);
			chartE06Data1.push(chartE06Tmp[idx].percnt1);
			chartE06Data2.push(chartE06Tmp[idx].percnt2);
			// console.log("yyyymm : " + chartE03Tmp[idx].label);
		}
	}

	var rpt_chart42 = echarts.init(document.getElementById('rpt_chart42'));
	option = {
		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: response.data.reportParams[0].megaNm + " 화장품 평균",
				itemStyle: {
					color: '#C2E371'

				}
			},
				{
					name: "해당지역 화장품 평균",
					itemStyle: {
						color: '#efb300'
					}
				},
			],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chartE06Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			}
		},
		series: [{
			name: response.data.reportParams[0].megaNm + ' 화장품 평균',
			type: 'bar',
			data: chartE06Data1,
			barWidth: '20%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84A92C',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '해당지역 화장품 평균',
				type: 'bar',
				data: chartE06Data2,
				barWidth: '20%',
				itemStyle: {
					color: '#efb300',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#efb300',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	}

	function start_rpt_chart42() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		rpt_chart42.setOption(option);
		rpt_chart42.resize();
	}
	start_rpt_chart42();


	// //rpt_chart43(구매단가별 비중)------------------------------------------------------------------
	var chartE07Tmp = [];
	var chartE07Label = [];
	var chartE07Data1 = [];
	var chartE07Data2 = [];

	var i = 0;
	chartE07Tmp = response.data.reportE07;

	if(chartE07Tmp.length != 0 ){
		// console.log("chartE03Tmp size : "+chartE03Tmp.length)
		for(idx in chartE07Tmp){
			chartE07Label.push(chartE07Tmp[idx].label);
			chartE07Data1.push(chartE07Tmp[idx].percnt1);
			chartE07Data2.push(chartE07Tmp[idx].percnt2);
			// console.log("yyyymm : " + chartE03Tmp[idx].label);
		}
	}

	var rpt_chart43 = echarts.init(document.getElementById('rpt_chart43'));
	option = {
		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: response.data.reportParams[0].megaNm + " 화장품 평균",
				itemStyle: {
					color: '#efb300'
				}
			},
				{
					name: "해당지역 화장품 평균",
					itemStyle: {
						color: '#C2E371'
					}
				},
			],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chartE07Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			}
		},
		series: [{
			name: response.data.reportParams[0].megaNm + ' 화장품 평균',
			type: 'bar',
			data: chartE07Data1,
			barWidth: '20%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '해당지역 화장품 평균',
				type: 'bar',
				data: chartE07Data2,
				barWidth: '20%',
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#84A92C',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	}

	function start_rpt_chart43() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		rpt_chart43.setOption(option);
		rpt_chart43.resize();
	}
	start_rpt_chart43();




	//rpt_chart44------------------------------------------------------------------
	// var chart2_label_array = '신촌점, 동일유형 평균,우수점포 평균, 주변지점 평균 ';
	// chart2_label_array = chart2_label_array.split(',');

	var chartE09Tmp = [];
	var chartE09Label = [];
	var chartE09Data1 = [];
	var chartE09Data2 = [];
	var chartE09Data3 = [];
	var chartE09Data4 = [];
	var chartE09Data5 = [];

	var i = 0;
	chartE09Tmp = response.data.reportE09;

	if(chartE09Tmp.length != 0 ){
		for(idx in chartE09Tmp){
			chartE09Label.push(chartE09Tmp[idx].typeNm);
			chartE09Data5.push(chartE09Tmp[idx].babyOlive);
			chartE09Data2.push(chartE09Tmp[idx].blackOlive);
			chartE09Data1.push(chartE09Tmp[idx].goldOlive);
			chartE09Data3.push(chartE09Tmp[idx].greenOlive);
			chartE09Data4.push(chartE09Tmp[idx].pinkOlive);
		}
	}

	var rpt_chart44 = echarts.init(document.getElementById('rpt_chart44'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [chartE09Label],
		xAxis: {
			type: 'category',
			data: chartE09Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			}
		},
		series: [{
			name: 'Gold Olive',
			type: 'bar',
			data: chartE09Data1,
			barWidth: '10%',
			itemStyle: {
				color: '#f9a629',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#f9a629',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: 'Black Olive',
				type: 'bar',
				data: chartE09Data2,
				barWidth: '10%',
				itemStyle: {
					color: '#666',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#666',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
			{
				name: 'Green Olive',
				type: 'bar',
				data: chartE09Data3,
				barWidth: '10%',
				itemStyle: {
					color: '#C2E371',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#84A92C',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
			{
				name: 'Pink Olive',
				type: 'bar',
				data: chartE09Data4,
				barWidth: '10%',
				itemStyle: {
					color: '#f68c7b',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#d76a58',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
			{
				name: 'Baby Olive',
				type: 'bar',
				data: chartE09Data5,
				barWidth: '10%',
				itemStyle: {
					color: '#f1cc6d',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#d7ab3a',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			}
		]
	}

	function start_rpt_chart44() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		rpt_chart44.setOption(option);
		rpt_chart44.resize();
	}
	start_rpt_chart44();

	//rpt_chart45(해당지역 요일별 유동인구 getStoreReportG01)------------------------------------------------------------------
	// var chart2_label_array =
	//     '월,화,수,목,금,토,일';
	// chart2_label_array = chart2_label_array.split(',');


	var chartG01Tmp = [];
	var chartG01Label = ['월','화','수','목','금','토','일'];
	var chartG01Data1 = [];
	var chartG01Data2 = [];

	var i = 0;
	chartG01Tmp = response.data.reportG01;

	if(chartG01Tmp.length != 0 ){
		for(idx in chartG01Tmp){
			chartG01Data1.push(chartG01Tmp[idx].cntValue);
			chartG01Data2.push(chartG01Tmp[idx].megaCntValue);
		}
	}

	var rpt_chart45 = echarts.init(document.getElementById('rpt_chart45'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "해당지역 유동인구",
				itemStyle: {
					color: '#efb300'
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chartG01Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '해당지역 유동인구',
			type: 'bar',
			data: chartG01Data1,
			barWidth: '30%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}, ]
	};

	function start_rpt_chart45() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart45.setOption(option);
		rpt_chart45.resize();
	}
	start_rpt_chart45();

	//rpt_chart46(서울특별시 요일별 유동인구-getStoreReportG01)------------------------------------------------------------------

	var chart2_label_array =
		'월,화,수,목,금,토,일';
	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart46 = echarts.init(document.getElementById('rpt_chart46'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: response.data.reportParams[0].megaNm + " 유동인구",
				itemStyle: {
					color: '#c2e371',
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart2_label_array,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: response.data.reportParams[0].megaNm + ' 유동인구',
			type: 'bar',
			data: chartG01Data2,
			barWidth: '30%',
			itemStyle: {
				color: '#c2e371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84a92c',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}, ]
	};

	function start_rpt_chart46() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart46.setOption(option);
		rpt_chart46.resize();
	}
	start_rpt_chart46();

	//rpt_chart47(해당지역 시간대별 유동인구-getStoreReportG02)------------------------------------------------------------------
	var chart2_label_array =
		'07~10시,10~12시,12~14시,14~18시,18~21시';

	var chartG02Tmp = [];
	var chartG02Data1 = [];
	var chartG02Data2 = [];

	var i = 0;
	chartG02Tmp = response.data.reportG02;

	if(chartG02Tmp.length != 0 ){
		for(idx in chartG02Tmp){
			chartG02Data1.push(chartG02Tmp[idx].cntValue);
			chartG02Data2.push(chartG02Tmp[idx].megaCntValue);
		}
	}


	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart47 = echarts.init(document.getElementById('rpt_chart47'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "해당지역 유동인구",
				itemStyle: {
					color: '#efb300'
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart2_label_array,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '해당지역 유동인구',
			type: 'bar',
			data: chartG02Data1,
			barWidth: '30%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}, ]
	};

	function start_rpt_chart47() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart47.setOption(option);
		rpt_chart47.resize();
	}
	start_rpt_chart47();


	//rpt_chart48(서울특별시 시간대별 유동인구-getStoreReportG02)------------------------------------------------------------------
	var chart2_label_array =
		'07~10시,10~12시,12~14시,14~18시,18~21시';

	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart48 = echarts.init(document.getElementById('rpt_chart48'));
	option =  {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: response.data.reportParams[0].megaNm + " 유동인구",
				itemStyle: {
					color: '#c2e371',
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart2_label_array,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: response.data.reportParams[0].megaNm + ' 유동인구',
			type: 'bar',
			data: chartG02Data2,
			barWidth: '30%',
			itemStyle: {
				color: '#c2e371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84a92c',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}, ]
	};

	function start_rpt_chart48() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart48.setOption(option);
		rpt_chart48.resize();
	}
	start_rpt_chart48();

	//rpt_chart49(해당지역 시간대별 유동인구-getStoreReportG03)------------------------------------------------------------------
	var chart2_label_array ='20대,30대,40대,50대,60대';

	var chartG03Tmp = [];
	var chartG03Label = [];
	var chartG03Data1 = [];
	var chartG03Data2 = [];
	var chartG03Data3 = [];
	var chartG03Data4 = [];

	var i = 0;
	chartG03Tmp = response.data.reportG03;

	if(!common.isEmpty(chartG03Tmp)){
		chartG03Tmp.forEach(function (val, idx){
			if(val.typeNm.indexOf('m') > -1){
				chartG03Data1.push(val.cntValue);
				chartG03Data3.push(val.megaCntValue);
			}
			if(val.typeNm.indexOf('w') > -1){
				chartG03Data2.push(val.cntValue);
				chartG03Data4.push(val.megaCntValue);
			}
		});
	}


	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart49 = echarts.init(document.getElementById('rpt_chart49'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "남",
				itemStyle: {
					color: '#63c6c2',
				}

			}, {
				name: "여",
				itemStyle: {
					color: '#ffa695',
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart2_label_array,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [
			{
				name: '남',
				type: 'bar',
				data: chartG03Data1,
				barWidth: '30%',
				itemStyle: {
					color: '#63c6c2',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#63c6c2',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
			{
				name: '여',
				type: 'bar',
				data: chartG03Data2,
				barWidth: '30%',
				itemStyle: {
					color: '#ffa695',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#ffa695',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
		]
	};

	function start_rpt_chart49() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart49.setOption(option);
		rpt_chart49.resize();
	}
	start_rpt_chart49();

	//rpt_chart50(선택 시/도 시간대별 유동인구-getStoreReportG03)------------------------------------------------------------------
	var chart2_label_array =
		'20대,30대,40대,50대,60대';

	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart50 = echarts.init(document.getElementById('rpt_chart50'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "남",
				itemStyle: {
					color: '#63c6c2',
				}

			}, {
				name: "여",
				itemStyle: {
					color: '#ffa695',
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart2_label_array,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '남',
			type: 'bar',
			data: chartG03Data3,
			barWidth: '30%',
			itemStyle: {
				color: '#63c6c2',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#63c6c2',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '여',
				type: 'bar',
				data: chartG03Data4,
				barWidth: '30%',
				itemStyle: {
					color: '#ffa695',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#ffa695',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
		]
	};

	function start_rpt_chart50() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart50.setOption(option);
		rpt_chart50.resize();
	}
	start_rpt_chart50();

	//rpt_chart51(해당지역 성/연령별 주거인구 - getStoreReportG04)-------------------------------------------------------
	var chart2_label_array =
		'20대,30대,40대,50대,60대';

	var chartG04Tmp = [];
	var chartG04Data1 = [];
	var chartG04Data2 = [];
	var chartG04Data3 = [];
	var chartG04Data4 = [];

	var i = 0;
	chartG04Tmp = response.data.reportG04;

	if(chartG04Tmp.length != 0 ){
		for(idx in chartG04Tmp){
			if(chartG04Tmp[idx].typeNm.substring(0,1) == 'm'){
				chartG04Data1.push(chartG04Tmp[idx].cntValue);
				chartG04Data3.push(chartG04Tmp[idx].megaCntValue);
			}else{
				chartG04Data2.push(chartG04Tmp[idx].cntValue);
				chartG04Data4.push(chartG04Tmp[idx].megaCntValue);
			}
		}
	}

	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart51 = echarts.init(document.getElementById('rpt_chart51'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "남",
				itemStyle: {
					color: '#63c6c2',
				}

			}, {
				name: "여",
				itemStyle: {
					color: '#ffa695',
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart2_label_array,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '남',
			type: 'bar',
			data: chartG04Data1,
			barWidth: '30%',
			itemStyle: {
				color: '#63c6c2',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#63c6c2',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '여',
				type: 'bar',
				data: chartG04Data2,
				barWidth: '30%',
				itemStyle: {
					color: '#ffa695',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#ffa695',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
		]
	};

	function start_rpt_chart51() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart51.setOption(option);
		rpt_chart51.resize();
	}
	start_rpt_chart51();

	//rpt_chart52(해당시 성/연령별 주거인구 - getStoreReportG04)-------------------------------------------------------
	var chart2_label_array =
		'20대,30대,40대,50대,60대';
	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart52 = echarts.init(document.getElementById('rpt_chart52'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "남",
				itemStyle: {
					color: '#63c6c2',
				}

			}, {
				name: "여",
				itemStyle: {
					color: '#ffa695',
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart2_label_array,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '남',
			type: 'bar',
			data: chartG04Data3,
			barWidth: '30%',
			itemStyle: {
				color: '#63c6c2',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#63c6c2',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '여',
				type: 'bar',
				data: chartG04Data4,
				barWidth: '30%',
				itemStyle: {
					color: '#ffa695',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#ffa695',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
		]
	};

	function start_rpt_chart52() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart52.setOption(option);
		rpt_chart52.resize();
	}
	start_rpt_chart52();

	//rpt_chart53(해당지역 성/연령별 직장인구 - getStoreReportG07)-------------------------------------------------------
	var chartG07Tmp = [];
	var chartG07Label = [];
	var chartG07Data1 = [];
	var chartG07Data2 = [];
	var chartG07Data3 = [];
	var chartG07Data4 = [];

	var i = 0;
	chartG07Tmp = response.data.reportG07;

	if(chartG07Tmp.length != 0 ){
		for(idx in chartG07Tmp){
			if(chartG07Tmp[idx].type == 'cnt'){
				chartG07Data1.push(chartG07Tmp[idx].empCntM20);
				chartG07Data1.push(chartG07Tmp[idx].empCntM30);
				chartG07Data1.push(chartG07Tmp[idx].empCntM40);
				chartG07Data1.push(chartG07Tmp[idx].empCntM50);
				chartG07Data1.push(chartG07Tmp[idx].empCntM60over);
				chartG07Data2.push(chartG07Tmp[idx].empCntW20);
				chartG07Data2.push(chartG07Tmp[idx].empCntW30);
				chartG07Data2.push(chartG07Tmp[idx].empCntW40);
				chartG07Data2.push(chartG07Tmp[idx].empCntW50);
				chartG07Data2.push(chartG07Tmp[idx].empCntW60over);
			}
			if(chartG07Tmp[idx].type == 'megacnt'){
				chartG07Data3.push(chartG07Tmp[idx].empCntM20);
				chartG07Data3.push(chartG07Tmp[idx].empCntM30);
				chartG07Data3.push(chartG07Tmp[idx].empCntM40);
				chartG07Data3.push(chartG07Tmp[idx].empCntM50);
				chartG07Data3.push(chartG07Tmp[idx].empCntM60over);
				chartG07Data4.push(chartG07Tmp[idx].empCntW20);
				chartG07Data4.push(chartG07Tmp[idx].empCntW30);
				chartG07Data4.push(chartG07Tmp[idx].empCntW40);
				chartG07Data4.push(chartG07Tmp[idx].empCntW50);
				chartG07Data4.push(chartG07Tmp[idx].empCntW60over);
			}
		}
	}


	var chart2_label_array =
		'20대,30대,40대,50대,60대';
	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart53 = echarts.init(document.getElementById('rpt_chart53'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "남",
				itemStyle: {
					color: '#63c6c2',
				}

			}, {
				name: "여",
				itemStyle: {
					color: '#ffa695',
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart2_label_array,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '남',
			type: 'bar',
			data: chartG07Data1,
			barWidth: '30%',
			itemStyle: {
				color: '#63c6c2',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#63c6c2',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '여',
				type: 'bar',
				data: chartG07Data2,
				barWidth: '30%',
				itemStyle: {
					color: '#ffa695',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#ffa695',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
		]
	};

	function start_rpt_chart53() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart53.setOption(option);
		rpt_chart53.resize();
	}
	start_rpt_chart53();

	//rpt_chart54(선택 시/도 성/연령별 직장인구 - getStoreReportG07)-------------------------------------------------------
	var chart2_label_array =
		'20대,30대,40대,50대,60대';
	chart2_label_array = chart2_label_array.split(',');
	var rpt_chart54 = echarts.init(document.getElementById('rpt_chart54'));
	option = {
		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "남",
				itemStyle: {
					color: '#63c6c2',
				}

			}, {
				name: "여",
				itemStyle: {
					color: '#ffa695',
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart2_label_array,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '남',
			type: 'bar',
			data: chartG07Data3,
			barWidth: '30%',
			itemStyle: {
				color: '#63c6c2',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#63c6c2',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
			{
				name: '여',
				type: 'bar',
				data: chartG07Data4,
				barWidth: '30%',
				itemStyle: {
					color: '#ffa695',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#ffa695',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},
		]
	};

	function start_rpt_chart54() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		rpt_chart54.setOption(option);
		rpt_chart54.resize();
	}
	start_rpt_chart54();

	//rpt_chart55--------------------------------------------------------------------------------------------------------
	var chartH06Tmp = [];
	var chartH06Label = [];
	var chartH06Data1 = [];
	var chartH06Data2 = [];

	var i = 0;
	chartH06Tmp = response.data.reportH06;

	if(chartH06Tmp.length != 0 ){
		for(idx in chartH06Tmp){
			chartH06Label.push(chartH06Tmp[idx].yymm);
			chartH06Data1.push(chartH06Tmp[idx].orderCnt);
			chartH06Data2.push(chartH06Tmp[idx].orderAmt);
		}
	}


	var rpt_chart55 = echarts.init(document.getElementById('rpt_chart55'));
	option = {
		grid: {
			bottom: '12%',
			top: '60px',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '상권유형판별',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chartH06Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 13,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			}
		},
		series: [{
			name: '주문건',
			type: 'bar',
			data: chartH06Data1,
			barWidth: '50%',
			itemStyle: {
				color: '#c2e371',
				//barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				//color: '#006991',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '10',
				//lineHeight: '14',
				borderRadius: '10',
				border: '20',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);

					return returnVal;
				},
				borderRadius: 4,
				padding: 4,
			}
		},
			{
				name: '주문액',
				type: 'line',
				data: chartH06Data2,
				barWidth: '50%',
				itemStyle: {
					color: '#f38951',
					//barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					//color: '#006991',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '10',
					//lineHeight: '14',
					borderRadius: '10',
					border: '20',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);

						return returnVal;
					},
					borderRadius: 4,
					padding: 4,
				}
			}
		]
	}

	function start_rpt_chart55() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		rpt_chart55.setOption(option);
		rpt_chart55.resize();
	}
	start_rpt_chart55();

	//echart width 오류 해결
	const rp_container33 = document.querySelector('#rpt_chart33');
	const rp_chart33 = echarts.init(rp_container33);
	new ResizeObserver(() => rp_chart33.resize()).observe(rp_container33);

	const rp_container34 = document.querySelector('#rpt_chart34');
	const rp_chart34 = echarts.init(rp_container34);
	new ResizeObserver(() => rp_chart34.resize()).observe(rp_container34);

	// const rp_container35 = document.querySelector('#rpt_chart35');
	// const rp_chart35 = echarts.init(rp_container35);
	// new ResizeObserver(() => rp_chart35.resize()).observe(rp_container35);

	const rp_container36 = document.querySelector('#rpt_chart36');
	const rp_chart36 = echarts.init(rp_container36);
	new ResizeObserver(() => rp_chart36.resize()).observe(rp_container36);

	const rp_container37 = document.querySelector('#rpt_chart37');
	const rp_chart37 = echarts.init(rp_container37);
	new ResizeObserver(() => rp_chart37.resize()).observe(rp_container37);

	const rp_container38 = document.querySelector('#rpt_chart38');
	const rp_chart38 = echarts.init(rp_container38);
	new ResizeObserver(() => rp_chart38.resize()).observe(rp_container38);

	const rp_container39 = document.querySelector('#rpt_chart39');
	const rp_chart39 = echarts.init(rp_container39);
	new ResizeObserver(() => rp_chart39.resize()).observe(rp_container39);

	const rp_container40 = document.querySelector('#rpt_chart40');
	const rp_chart40 = echarts.init(rp_container40);
	new ResizeObserver(() => rp_chart40.resize()).observe(rp_container40);

	const rp_container40_2 = document.querySelector('#rpt_chart40_2');
	const rp_chart40_2 = echarts.init(rp_container40_2);
	new ResizeObserver(() => rp_chart40_2.resize()).observe(rp_container40_2);

	const rp_container41 = document.querySelector('#rpt_chart41');
	const rp_chart41 = echarts.init(rp_container41);
	new ResizeObserver(() => rp_chart41.resize()).observe(rp_container41);

	const rp_container42 = document.querySelector('#rpt_chart42');
	const rp_chart42 = echarts.init(rp_container42);
	new ResizeObserver(() => rp_chart42.resize()).observe(rp_container42);

	const rp_container43 = document.querySelector('#rpt_chart43');
	const rp_chart43 = echarts.init(rp_container43);
	new ResizeObserver(() => rp_chart43.resize()).observe(rp_container43);

	const rp_container44 = document.querySelector('#rpt_chart44');
	const rp_chart44 = echarts.init(rp_container44);
	new ResizeObserver(() => rp_chart44.resize()).observe(rp_container44);

	const rp_container45 = document.querySelector('#rpt_chart45');
	const rp_chart45 = echarts.init(rp_container45);
	new ResizeObserver(() => rp_chart45.resize()).observe(rp_container45);

	const rp_container46 = document.querySelector('#rpt_chart46');
	const rp_chart46 = echarts.init(rp_container46);
	new ResizeObserver(() => rp_chart46.resize()).observe(rp_container46);

	const rp_container47 = document.querySelector('#rpt_chart47');
	const rp_chart47 = echarts.init(rp_container47);
	new ResizeObserver(() => rp_chart47.resize()).observe(rp_container47);

	const rp_container48 = document.querySelector('#rpt_chart48');
	const rp_chart48 = echarts.init(rp_container48);
	new ResizeObserver(() => rp_chart48.resize()).observe(rp_container48);

	const rp_container49 = document.querySelector('#rpt_chart49');
	const rp_chart49 = echarts.init(rp_container49);
	new ResizeObserver(() => rp_chart49.resize()).observe(rp_container49);

	const rp_container50 = document.querySelector('#rpt_chart50');
	const rp_chart50 = echarts.init(rp_container50);
	new ResizeObserver(() => rp_chart50.resize()).observe(rp_container50);

	const rp_container51 = document.querySelector('#rpt_chart51');
	const rp_chart51 = echarts.init(rp_container51);
	new ResizeObserver(() => rp_chart51.resize()).observe(rp_container51);

	const rp_container52 = document.querySelector('#rpt_chart52');
	const rp_chart52 = echarts.init(rp_container52);
	new ResizeObserver(() => rp_chart52.resize()).observe(rp_container52);

	const rp_container53 = document.querySelector('#rpt_chart53');
	const rp_chart53 = echarts.init(rp_container53);
	new ResizeObserver(() => rp_chart53.resize()).observe(rp_container53);

	const rp_container54 = document.querySelector('#rpt_chart54');
	const rp_chart54 = echarts.init(rp_container54);
	new ResizeObserver(() => rp_chart54.resize()).observe(rp_container54);

	const rp_container55 = document.querySelector('#rpt_chart55');
	const rp_chart55 = echarts.init(rp_container55);
	new ResizeObserver(() => rp_chart55.resize()).observe(rp_container55);
}

function storeDrawMap(response){

	var areaJsonArr1 = [];
	var areaJsonArr2 = [];
	var areaJsonArr3 = [];

	strCenterx = 126.97787;
	strCentery = 37.56648;

	setTimeout(function (){
		CENTER = new naver.maps.LatLng(strCentery, strCenterx);
		mapOptions = {
			center: new naver.maps.LatLng(strCentery, strCenterx),
			zoom: 14,
		};

		map1 = new naver.maps.Map('map1', mapOptions);
		map2 = new naver.maps.Map('map2', mapOptions);
		map3 = new naver.maps.Map('map3', mapOptions);


		// removeAreaGeom();
		// 지도 1------------------------------------------------------------------------------------

		// 범례 클릭 지도 제거 부분
		var filtered1 = response.data.reportD04;
		$(".checkmark").parent().children('input').each(function (){
			if(!$(this).prop('checked')){
				if(!common.isEmpty(filtered1)){
					filtered1 = filtered1.filter(o => Number(o.lv) !== $(this).data('lv'));
				}
			}
		});

		for(idx in filtered1){
			if(filtered1[idx].memberRate == 0){
				// console.log(" center : "+ filtered1[idx].xAxis +" / "+ filtered1[idx].yAxis);
				var center = new naver.maps.Point(filtered1[idx].xAxis, filtered1[idx].yAxis);
				map1.setCenter(center);
				map1.setZoom(13);
			}
		}

		var result = getGeomJson("StoreReport3-1", "FeatureCollection", filtered1);
		strGeoJson = result;
		areaJsonArr1.push(result);
		map1.data.addGeoJson(result);


		map1.data.setStyle(function(feature){
			var styleOptions = {
				fillOpacity : feature.getProperty('fillOpacity')
				, fillColor : feature.getProperty('fillColor')
				, strokeColor : "#ffffff"
				, storkeWeight : 3
				, storkeOpacity : 1
			}
			return styleOptions;
		});

		// 지도 2------------------------------------------------------------------------------------

		// 범례 클릭 지도 제거 부분
		var filtered2 = response.data.reportD05;
		$(".checkmark").parent().children('input').each(function (){
			if(!$(this).prop('checked')){
				if(!common.isEmpty(filtered2)){
					filtered2 = filtered2.filter(o => Number(o.lv) !== $(this).data('lv'));
				}
			}
		});

		for(idx in filtered2){
			if(filtered2[idx].storeGbn == 0){
				// console.log(" center : "+ filtered2[idx].xAxis +" / "+ filtered2[idx].yAxis);
				var center = new naver.maps.Point(filtered2[idx].xAxis, filtered2[idx].yAxis);
				map2.setCenter(center);
				map2.setZoom(13);
			}
		}

		var result = getGeomJson("StoreReport3-2", "FeatureCollection", filtered2);
		strGeoJson = result;
		areaJsonArr2.push(result);
		map2.data.addGeoJson(result);

		map2.data.setStyle(function(feature){
			var styleOptions = {
				fillOpacity : feature.getProperty('fillOpacity')
				, fillColor : feature.getProperty('fillColor')
				, strokeColor : "#ffffff"
				, storkeWeight : 3
				, storkeOpacity : 1
			}
			return styleOptions;
		});
		// 지도 3------------------------------------------------------------------------------------

		// 범례 클릭 지도 제거 부분
		var filtered3 = response.data.reportH02;
		$(".checkmark").parent().children('input').each(function (){
			// if(!$(this).prop('checked')){
			// 	if(!common.isEmpty(filtered3)){
			// 		filtered3 = filtered3.filter(o => Number(o.lv) !== $(this).data('lv'));
			// 	}
			// }
		});

		for(idx in filtered3){
			if(idx == 1){
				// console.log(" center : "+ filtered3[idx].xAxis +" / "+ filtered3[idx].yAxis);
				var center = new naver.maps.Point(filtered3[idx].xAxis, filtered3[idx].yAxis);
				map3.setCenter(center);
				map3.setZoom(12);
			}
		}

		var result = getGeomJson("StoreReport3-3", "FeatureCollection", filtered3);
		strGeoJson = result;
		areaJsonArr3.push(result);
		map3.data.addGeoJson(result);


		map3.data.setStyle(function(feature){
			var styleOptions = {
				fillOpacity : feature.getProperty('fillOpacity')
				, fillColor : feature.getProperty('fillColor')
				, strokeColor : "#ffffff"
				, storkeWeight : 3
				, storkeOpacity : 1
			}
			return styleOptions;
		});

	},6000);
}

function openingChart(response){

	var day_nm = [
		  {"key" : "mon_pop", "key_nm" : "월요일"}
		, {"key" : "tue_pop", "key_nm" : "화요일"}
		, {"key" : "wed_pop", "key_nm" : "수요일"}
		, {"key" : "thu_pop", "key_nm" : "목요일"}
		, {"key" : "fri_pop", "key_nm" : "금요일"}
		, {"key" : "sat_pop", "key_nm" : "토요일"}
		, {"key" : "sun_pop", "key_nm" : "일요일"}
	];

	// 유동 高 요일
	var G01List = [];
	if(!common.isEmpty(response.data.reportG01)) {
		response.data.reportG01.forEach(function (val) {
			if (val.key.indexOf('rate') < 0 && val.key.indexOf('mega') < 0) {
				G01List.push(val);
			}
		});
		G01List.sort(function (a, b) { // 내림
			return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
		});

		var day_rnk1 = "";
		var day_rnk2 = "";
		day_nm.forEach(function (val) {
			if (val.key == G01List[0].key) day_rnk1 = val.key_nm;
			if (val.key == G01List[1].key) day_rnk2 = val.key_nm;
		});

		$("#G01_1").html(day_rnk1 + "<br/>" + common.addComma(G01List[0].value) + "명");
		$("#G01_2").html(day_rnk2 + "<br/>" + common.addComma(G01List[1].value) + "명");
	}else{
		$("#G01_1").html('유동인구가 없습니다.');
		$("#G01_2").html('유동인구가 없습니다.');
	}
	// 유동 高 시간
	var G02List = [];
	if(!common.isEmpty(response.data.reportG02)){
		response.data.reportG02.forEach(function (val){
			if(val.key.indexOf('rate') < 0 && val.key.indexOf('mega') < 0){
				G02List.push(val);
			}
		});
		G02List.sort(function(a, b) { // 내림
			return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
		});

		var time_rnk1 = G02List[0].key.replace('time_','').substr(0,2) + "~" + G02List[0].key.replace('time_','').substr(2,2);
		var time_rnk2 = G02List[1].key.replace('time_','').substr(0,2) + "~" + G02List[1].key.replace('time_','').substr(2,2);
		if(G02List[0].value > 0){
			$("#G02_1").html(time_rnk1+ "시<br/>" + common.addComma(G02List[0].value) + "명");
			$("#G02_2").html(time_rnk2 + "시<br/>" + common.addComma(G02List[1].value) + "명");
		}else{
			$("#G02_1").html('유동인구가 없습니다.');
			$("#G02_2").html('유동인구가 없습니다.');
		}
	}


	let chart12Label = [];
	let chart12Data = [];
	let i = 0;

	if(response.data.reportA01[0].resultList1Tab != '') {
		chart12Tmp = response.data.reportA01[0].resultList1Tab.split('|');
		// console.log('check : '+chart12Tmp.length)
		if(chart12Tmp.length != 0 ){
			while(i < chart12Tmp.length){
				// console.log(chart12Tmp[i].split(',')[0] + ' : ' + chart12Tmp[i].split(',')[1]);
				chart12Label.push(chart12Tmp[i].split(',')[0]);
				chart12Data.push(
					{
						name: chart12Tmp[i].split(',')[0],
						value: chart12Tmp[i].split(',')[1],
						itemStyle: {color: chartColor[i]}
					});
				i++;
			}
		}
		// console.log('chart12Label : '+chart12Label);

		//rpt_chart12
		var chartDom = document.getElementById('rpt_chart12');
		var rpt_chart12 = echarts.init(chartDom);
		var option;

		var option = {
			grid: {
				containLabel: true,
			},
			emphasis: {
				focus: 'self',
			},
			series: [{
				name: '주변 고객 유입',
				type: 'pie',
				radius: ['40%', '60%'],
				top: '0%',
				fontFamily: 'Pretendard',
				data: chart12Data,
				itemStyle: {
					normal: {
						labelLine: {
							show: true
						},
						label: {
							show: true,
							position: 'center',
							formatter: '{b|{b}}' + '\n' + '{d|{d}}' + '{per|%}',
							backgroundColor: '#FFF',
							fontFamily: 'Pretendard',
							width: '74',
							rich: {
								b: {
									color: '#4C5058',
									fontSize: 11,
									fontWeight: '700',
									lineHeight: 18,
									fontFamily: 'Pretendard',
								},
								d: {
									color: '#191F28',
									fontSize: 16,
									fontWeight: '800',
									lineHeight: 20,
									fontFamily: 'Pretendard',
								},
								per: {
									color: '#191F28',
									fontSize: 14,
									fontWeight: '600',
									lineHeight: 20,
									fontFamily: 'Pretendard',
								},
							},
						},
					}
				},
				center: ['50%', '45%'],
				animationDuration: 1000,
				animationEasing: "sinusoidalOut",
			}],
			title: {
				text: '1상권의 특성',
				show: false,
			},
		tooltip: {
			show: false,
			//trigger: 'item',
			//formatter: function(params) {
			//	return params.name + '<br/>'
			//		+ params.marker + ' <b>' + params.value + '</b> %';
			//},
			//fontSize: 10
		},
		legend: {
			show: true,
			data: chart12Label,
			//orient: 'vartical',
			left: 'center',
			bottom: '0',
			fontFamily: 'Pretendard',
		},
	}

	rpt_chart12.setOption(option);
	rpt_chart12.resize();
}



//rpt_chart13
var chartDom = document.getElementById('rpt_chart13');
var rpt_chart13 = echarts.init(chartDom);

let chart13Label = [];
let chart13Data = [];
i = 0;

if(response.data.reportA01[0].resultList2Tab != '') {
	chart13Tmp = response.data.reportA01[0].resultList2Tab.split('|');
	if (chart13Tmp.length != 0) {
		while (i < chart13Tmp.length) {
			// console.log(chart13Tmp[i].split(',')[1] + ' : ' + chart13Tmp[i].split(',')[2]);
			chart13Label.push(chart13Tmp[i].split(',')[1]);
			chart13Data.push(
				{
					name: chart13Tmp[i].split(',')[1],
					value: chart13Tmp[i].split(',')[2],
					itemStyle: {color: chartColor[i]}
				});
			i++;
		}
	}
	var option = {
		grid: {
			containLabel: true
		},
		emphasis: {
			focus: 'self',
			fontFamily: 'Pretendard',
		},
		series: [{
			name: '주변 고객 유입',
			type: 'pie',
			radius: ['40%', '60%'],
			top: '0%',
			data: chart13Data,
			itemStyle: {
				normal: {
					labelLine: {
						show: true
					},
					label: {
						show: true,
						position: 'center',
						formatter: '{b|{b}}' + '\n' + '{d|{d}}' + '{per|%}',
						backgroundColor: '#FFF',
						width: '74',
						rich: {
							b: {
								color: '#4C5058',
								fontSize: 11,
								fontWeight: '700',
								lineHeight: 18,
								fontFamily: 'Pretendard',
							},
							d: {
								color: '#191F28',
								fontSize: 16,
								fontWeight: '800',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
							per: {
								color: '#191F28',
								fontSize: 14,
								fontWeight: '600',
								lineHeight: 20,
								fontFamily: 'Pretendard',
							},
						},
					},
				}
			},
			center: ['50%', '45%'],
			animationDuration: 1000,
			animationEasing: "sinusoidalOut",
		}],
		title: {
			text: '1상권의 특성',
			show: false
		},
		tooltip: {
			show: false,
			//trigger: 'item',
			//formatter: function(params) {
			//	return params.name + '<br/>'
			//		+ params.marker + ' <b>' + params.value + '</b> %';
			//},
			//fontSize: 10
		},
		legend: {
			show: true,
			data: chart13Label,
			//orient: 'vartical',
			left: 'center',
			bottom: '0',
		},

	}

	rpt_chart13.setOption(option);
	rpt_chart13.resize();
}


// 데이터가 없어서 미사용?
//rpt_chart14
// var chart2_label_array =
// 	'주거인구, 직장인구, 유동인구, 시설\n유발인구, 동일유형\n전업종\n매출등급, 상권비중, 성장성, 변동성, 안정성, 구매력 ,수요-공급,동종업종\n평균매출';
// chart2_label_array = chart2_label_array.split(',');
// var rpt_chart14 = echarts.init(document.getElementById('rpt_chart14'));
// option = {
//
// 	grid: {
// 		bottom: '12%',
// 		top: '10%',
// 		left: '0%',
// 		right: '0%',
// 		containLabel: true
// 	},
// 	title: {
// 		text: '상권유형판별',
// 		show: false
// 	},
//
// 	tooltip: {
// 		trigger: 'axis',
// 		axisPointer: {
// 			type: 'shadow'
// 		}
// 	},
// 	legend: {
// 		show: true,
// 		bottom: 'bottom',
// 		left: 'center',
// 		data: [{
// 			name: "result",
// 			itemStyle: {
// 				color: '#f9a629'
// 			}
// 		}, ],
// 	},
// 	label: [],
// 	xAxis: {
// 		type: 'category',
// 		data: chart2_label_array,
// 		axisLine: {
// 			lineStyle: {
// 				color: '#9e9e9e'
// 			}
// 		},
// 		axisLabel: {
// 			show: true,
// 			textStyle: {
// 				color: '#666F7E',
// 				fontSize: 13,
// 				fontWeight: 500,
// 				lineHeight: 16,
// 			},
// 			interval: 0,
// 		},
// 		axisTick: {
// 			show: false
// 		}
// 	},
// 	yAxis: {
// 		show: false,
// 		type: 'value',
// 		splitLine: { // y축 수치선
// 			show: false
// 		},
// 		axisLabel: {
// 			show: false,
// 		},
//
// 	},
// 	series: [{
// 		name: 'result',
// 		type: 'bar',
// 		data: [4, 9, 8, 7, 4, 2, 4, 2, 8, 10, 10, 8],
// 		showBackground: true,
// 		barWidth: '50%',
// 		itemStyle: {
// 			color: '#f9a629',
// 			//barBorderRadius: [4, 4, 0, 0],
// 		},
// 		label: {
// 			show: true,
// 			position: 'inside',
// 			align: 'center',
// 			color: '#fff',
// 			formatter: '{c}',
// 			textPadding: '12',
// 			fontWeight: '600',
// 			borderRadius: '0',
// 			fontSize: '12',
// 			fontFamily: 'Pretendard',
// 		},
// 	}]
// };
//
// function start_rpt_chart14() {
// 	var show = option.yAxis.show;
// 	var left = option.legend.left;
// 	var labelSize = option.label.fontSize;
// 	var grid_l = option.grid.left;
// 	var grid_r = option.grid.right;
// 	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;
//
// 	if (window.innerWidth >= 1380) {
// 		show = 'false';
// 		fontSize = '12';
// 	} else if (window.innerWidth <= 280) {
// 		fontSize = '9';
// 		grid_l = '4';
// 		grid_r = '4';
// 		labelSize = '10';
// 	} else if (window.innerWidth <= 360) {
// 		fontSize = '11';
// 		grid_l = '0';
// 		grid_r = '0';
// 		labelSize = '10';
// 	} else if (window.innerWidth < 1380) {
// 		fontSize = '12';
// 		show = 'false';
// 	}
// 	option.yAxis.show = show;
// 	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
// 	option.label.fontSize = labelSize;
// 	option.grid.left = grid_l;
// 	option.grid.right = grid_r;
// 	option.legend.left = left;
//
// 	rpt_chart14.setOption(option);
// 	rpt_chart14.resize();
// }
// start_rpt_chart14();

//rpt_chart15;
let chart15Label = [];
let chart15Data1 = [];
let chart15Data2 = [];
let chart15Data3 = [];
i = 0;

chart15Tmp = response.data.reportB11;
if(chart15Tmp.length != 0 ){
	while(i < chart15Tmp.length){
		chart15Label.push(chart15Tmp[i].yyyymm);
		chart15Data1.push(chart15Tmp[i].allSaleAmt);
		chart15Data2.push(chart15Tmp[i].beautySaleAmt);
		chart15Data3.push(chart15Tmp[i].cvsSaleAmt);
		i++;
	}
}

var rpt_chart15 = echarts.init(document.getElementById('rpt_chart15'));
option = {
	grid: {
		top: '40px',
		bottom: '60px',
		left: '30px',
		right: '30px'
	},
	label: {
		show: true,
	},
	title: {
		text: '상권 내 성장성 분석',
		show: false
	},
	legend: {
		data: ['화장품업종', '편의점', '전체업종'],
		bottom: 'bottom',
	},
	tooltip: {
		trigger: 'axis',
		fontSize: 10,
		/* axisPointer: {
                	type: 'cross',
                	crossStyle: {
                		color: '#999'
                	}
                } */
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: chart15Label,
		axisLabel: {
			show: true,
			textStyle: {
				color: '#000',
				//fontSize: 9
			}
		},
	},
	yAxis: {
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},
		axisLine: {
			show: false,
			lineStyle: {
				color: '#9e9e9e'
			}
		}
	},
	series: [{
		name: "화장품업종",
		color: '#FF8B61',
		type: 'line',
		symbolSize: 8,
		data: chart15Data2,
		emphasis: {
			focus: 'series'
		},
		lineStyle: {
			color: '#FF8B61',
		},
		symbol: 'circle',
		itemStyle: {
			borderWidth: 1,
			borderColor: '#fff',
			color: '#FF8B61',
			normal: {
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					//color: '#006991',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					//fontSize:'14',
					//lineHeight: '14',
					borderRadius: '10',
					border: '20',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);

						return returnVal;
					},
					borderRadius: 4,
					padding: 4,
				}
			}
		},
	},
		{
			name: "편의점",
			color: '#5F7ECD',
			type: 'line',
			symbolSize: 8,
			data: chart15Data3,
			emphasis: {
				focus: 'series'
			},
			lineStyle: {
				color: '#5F7ECD',
			},
			symbol: 'circle',
			itemStyle: {
				borderWidth: 1,
				borderColor: '#fff',
				color: '#5F7ECD',
				normal: {
					label: {
						show: true,
						position: 'outside',
						align: 'center',
						//color: '#006991',
						textPadding: '12',
						fontWeight: '600',
						borderRadius: '12',
						//fontSize:'14',
						//lineHeight: '14',
						borderRadius: '10',
						border: '20',
						formatter: function (params) {
							var returnVal = echarts.format.addCommas(params.value);

							return returnVal;
						},
						borderRadius: 4,
						padding: 4,
					}
				}
			},
		},
		{
			name: "전체업종",
			color: '#905F43',
			type: 'line',
			symbolSize: 8,
			data: chart15Data1,
			emphasis: {
				focus: 'series'
			},
			lineStyle: {
				color: '#905F43',
			},
			symbol: 'circle',
			itemStyle: {
				borderWidth: 1,
				borderColor: '#fff',
				color: '#905F43',
				normal: {
					label: {
						show: true,
						position: 'outside',
						align: 'center',
						//color: '#006991',
						textPadding: '12',
						fontWeight: '600',
						borderRadius: '12',
						//fontSize:'14',
						//lineHeight: '14',
						borderRadius: '10',
						border: '20',
						formatter: function (params) {
							var returnVal = echarts.format.addCommas(params.value);

							return returnVal;
						},
						borderRadius: 4,
						padding: 4,
					}
				}
			},
		},

	]
};

function start_rpt_chart15() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var grid_l = option.grid.left;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var labelSize = option.label.fontSize;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1024) {
		show = 'true';
		fontSize = '10';
		labelSize = '10';
		left = 'center';
		fontSize = '10';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '24';
		grid_r = '24';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '24';
		grid_r = '24';
		labelSize = '10';
	} else if (window.innerWidth < 1024) {
		grid_l = '24';
		grid_r = '24';
		labelSize = '10';
		left = 'center';
		fontSize = '11';
	}
	option.yAxis.show = show;

	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.legend.left = left;

	rpt_chart15.setOption(option);
	rpt_chart15.resize();
}
start_rpt_chart15();
//rpt_chart15


//rpt_chart16;
let chart16Label = [];
let chart16Data1 = [];
let chart16Data2 = [];
let chart16Data3 = [];
let chart16Data4 = [];
i = 0;

chart16Tmp = response.data.reportD03;
if(chart16Tmp != null){
	if(chart16Tmp.length != 0 ){
		while(i < chart16Tmp.length){
			chart16Data1.push(chart16Tmp[i].beautyPercnt);
			chart16Data2.push(chart16Tmp[i].cvsPercnt);
			chart16Data3.push(chart16Tmp[i].olivePercnt);
			chart16Data4.push(chart16Tmp[i].estiPercnt);
			i++;
		}
	}
}
var rpt_chart16 = echarts.init(document.getElementById('rpt_chart16'));

option = {
	tooltip: {
		//trigger: 'axis',
	},
	legend: {
		show: true,
		bottom: 0,
		left: 'center',
		//data: {'category',''},
	},
	grid: {
		top: '40px',
		bottom: '30px',
		left: '0px',
		right: '0px',
		//containLabel: true
	},
	xAxis: {
		type: 'value',
		axisTick: {
			show: false,
		},
		axisLabel: {
			show: false,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisLine: {
			show: false,
		},
		splitLine: { // y축 수치선
			show: false
		},
	},
	yAxis: {
		type: 'category',
		data: [''],
		axisTick: {
			show: false,
		},
		splitLine: { // y축 수치선
			show: false
		},
		axisLine: {
			show: false,
		},
	},
	series: [{
		name: '자사매장',
		type: 'bar',
		barWidth: '70%',
		stack: 'total',
		label: {
			show: true
		},
		emphasis: {
			focus: 'series'
		},
		data: chart16Data3,
		itemStyle: {
			color: '#f9a629',
		},
		label: {
			color: '#fff',
			show: true,
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '700',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '화장품',
			type: 'bar',
			barWidth: '70%',
			stack: 'total',
			label: {
				show: true
			},
			emphasis: {
				focus: 'series'
			},
			data: chart16Data1,
			itemStyle: {
				color: '#ff8b61',
			},
			label: {
				color: '#fff',
				show: true,
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '700',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
		{
			name: '편의점',
			type: 'bar',
			barWidth: '70%',
			stack: 'total',
			label: {
				show: true
			},
			emphasis: {
				focus: 'series'
			},
			data: chart16Data2,
			itemStyle: {
				color: '#5f7ecd',
			},
			label: {
				color: '#fff',
				show: true,
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '700',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
		// {
		// 	name: '종합생활용품',
		// 	type: 'bar',
		// 	barWidth: '70%',
		// 	stack: 'total',
		// 	label: {
		// 		show: true
		// 	},
		// 	emphasis: {
		// 		focus: 'series'
		// 	},
		// 	data: [5],
		// 	itemStyle: {
		// 		color: '#39bbc3',
		// 	},
		// 	label: {
		// 		color: '#fff',
		// 		show: true,
		// 		formatter: '{c}',
		// 		textPadding: '12',
		// 		fontWeight: '700',
		// 		fontSize: '12',
		// 		fontFamily: 'Pretendard',
		// 	},
		// },
		{
			name: '후보지출점시',
			type: 'bar',
			barWidth: '70%',
			stack: 'total',
			label: {
				show: true
			},
			emphasis: {
				focus: 'series'
			},
			data: chart16Data4,
			itemStyle: {
				color: '#c2e371',
			},
			label: {
				show: true,
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '700',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
	]
};

function start_rpt_chart16() {

	rpt_chart16.setOption(option);
	rpt_chart16.resize();
}
start_rpt_chart16();
//rpt_chart16


//rpt_chart17

let chart17Label = [];
let chart17Data1 = [];
let chart17Data2 = [];
i = 0;

chart17Tmp = response.data.reportD01;
if(chart17Tmp != null){
	if(chart17Tmp.length != 0 ){
		while(i < chart17Tmp.length){
			chart17Label.push(chart17Tmp[i].label);
			chart17Data1.push(chart17Tmp[i].saleAmt);
			chart17Data2.push(chart17Tmp[i].dailySaleAmt);
			i++;
		}
	}
}

var rpt_chart17 = echarts.init(document.getElementById('rpt_chart17'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '0%',
		right: '0%',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [
			{
				name: "상권평균",
				itemStyle: {
					color: '#f9a629'
				}

			},
			{
				name: "일매출평균",
				itemStyle: {
					color: '#C2E371'
				}
			},
		],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart17Label,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '상권평균',
		type: 'bar',
		data: chart17Data1,
		barWidth: '16%',
		itemStyle: {
			color: '#f9a629',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#f49404',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '일매출평균',
			type: 'bar',
			data: chart17Data2,
			barWidth: '16%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84A92C',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}
	]
};

function start_rpt_chart17() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart17.setOption(option);
	rpt_chart17.resize();
}
start_rpt_chart17();


//rpt_chart18

let chart18Label = [];
let chart18Data1 = [];
let chart18Data2 = [];
i = 0;

chart18Tmp = response.data.reportE01;
if(chart18Tmp != null){
	if(chart18Tmp.length != 0 ){
		while(i < chart18Tmp.length){
			if(i%2 == 1){
				chart18Label.push(chart18Tmp[i].label);
			}else{
				chart18Label.push('\n'+chart18Tmp[i].label);
			}
			chart18Data1.push(chart18Tmp[i].percnt1);
			chart18Data2.push(chart18Tmp[i].percnt2);
			i++;
		}
	}
}

var rpt_chart18 = echarts.init(document.getElementById('rpt_chart18'));
option = {
	grid: {
		top: '20px',
		bottom: '66px',
		left: '40px',
		right: '40px'
	},
	label: {
		show: true,
	},
	title: {
		text: '매장별 예상 성장률 추이',
		show: false
	},
	legend: {
		data: [response.data.reportParams[0].megaNm +' 화장품 평균', '해당지역 화장품 평균'],
		bottom: 'bottom',
	},
	tooltip: {
		trigger: 'axis',
		fontSize: 10,
		/* axisPointer: {
                	type: 'cross',
                	crossStyle: {
                		color: '#999'
                	}
                } */
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: chart18Label,
		axisLabel: {
			show: true,
			textStyle: {
				color: '#000',
				//fontSize: 9
				//  padding: [16]
			},
			interval: 0,
		},

	},
	yAxis: {
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},
		axisLine: {
			show: false,
			lineStyle: {
				color: '#9e9e9e'
			}
		}
	},
	series: [{
		name: response.data.reportParams[0].megaNm +' 화장품 평균',
		color: '#C2E371',
		type: 'line',
		symbolSize: 6,
		data: chart18Data1,
		emphasis: {
			focus: 'series'
		},
		lineStyle: {
			color: '#C2E371',
		},
		symbol: 'circle',
		itemStyle: {
			borderWidth: 1,
			borderColor: '#fff',
			color: '#C2E371',
			normal: {
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					//color: '#006991',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '10',
					//lineHeight: '14',
					borderRadius: '10',
					border: '20',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);

						return returnVal;
					},
					borderRadius: 4,
					padding: 4,
				}
			}
		},

	},
		{
			name: '해당지역 화장품 평균',
			color: '#EFB300',
			type: 'line',
			symbolSize: 6,
			data: chart18Data2,
			emphasis: {
				focus: 'series'
			},
			lineStyle: {
				color: '#EFB300',
			},
			symbol: 'circle',
			itemStyle: {
				borderWidth: 1,
				borderColor: '#fff',
				color: '#EFB300',
				normal: {
					label: {
						show: true,
						position: 'outside',
						align: 'center',
						//color: '#006991',
						textPadding: '12',
						fontWeight: '600',
						borderRadius: '12',
						fontSize: '10',
						//lineHeight: '14',
						borderRadius: '10',
						border: '20',
						formatter: function (params) {
							var returnVal = echarts.format.addCommas(params.value);

							return returnVal;
						},
						borderRadius: 4,
						padding: 4,
					}
				}
			},
		},
	]
};

function start_rpt_chart18() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '11';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '11';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart18.setOption(option);
	rpt_chart18.resize();
}
start_rpt_chart18();

//rpt_chart19=====================================================================================

let chart19Label = [];
let chart19Data1 = [];
let chart19Data2 = [];
i = 0;

chart19Tmp = response.data.reportE03;
if(chart19Tmp != null){
	if(chart19Tmp.length != 0 ){
		while(i < chart19Tmp.length){
			if(chart19Tmp[i].infoType == 'HM') {
				chart19Label.push('주거인구 기준');
			}else{
				chart19Label.push('직장인구 기준');
			}
			chart19Data1.push(chart19Tmp[i].megaAvgAnuIncm);
			chart19Data2.push(chart19Tmp[i].admiAvgAnuIncm);
			i++;
		}
	}
}


var rpt_chart19 = echarts.init(document.getElementById('rpt_chart19'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '0%',
		right: '0%',
		containLabel: true
	},
	title: {
		text: '평균 연소득금액',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: "주거인구",
			itemStyle: {
				color: '#C2E371'
			}

		},
			{
				name: "주거인구",
				itemStyle: {
					color: '#efb300'
				}
			},
		],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart19Label,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '직장인구',
		type: 'bar',
		data: chart19Data1,
		barWidth: '20%',
		itemStyle: {
			color: '#efb300',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#efb300',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '직장인구',
			type: 'bar',
			data: chart19Data2,
			barWidth: '20%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84A92C',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}
	]
};

function start_rpt_chart19() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart19.setOption(option);
	rpt_chart19.resize();
}
start_rpt_chart19();

//rpt_chart19_2=====================================================================================
let chart19_2Label = [];
let chart19_2Data1 = [];
let chart19_2Data2 = [];
i = 0;

chart19_2Tmp = response.data.reportE04;
if(chart19_2Tmp != null){
	if(chart19_2Tmp.length != 0 ){
		while(i < chart19_2Tmp.length){
			chart19_2Label.push(chart19_2Tmp[i].quarter);
			chart19_2Data1.push(chart19_2Tmp[i].hmAnuIncmRto);
			chart19_2Data2.push(chart19_2Tmp[i].coAnuIncmRto);
			i++;
		}
	}
}

var rpt_chart19_2 = echarts.init(document.getElementById('rpt_chart19_2'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '0%',
		right: '0%',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart19_2Label,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '주거인구',
		type: 'bar',
		data: chart19_2Data1,
		barWidth: '8%',
		itemStyle: {
			color: '#efb300',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#efb300',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '직장인구',
			type: 'bar',
			data: chart19_2Data2,
			barWidth: '8%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84A92C',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}
	]
};

function start_rpt_chart19_2() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize
	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left
	rpt_chart19_2.setOption(option);
	rpt_chart19_2.resize();
}
start_rpt_chart19_2();
//rpt_chart20=====================================================================================

let chart20Label = [];
let chart20Data1 = [];
let chart20Data2 = [];
i = 0;

chart20Tmp = response.data.reportE05;
if(chart20Tmp != null){
	if(chart20Tmp.length != 0 ){
		while(i < chart20Tmp.length){
			if(chart20Tmp[i].infoType == 'HM') {
				chart20Label.push('주거인구 기준');
			}else{
				chart20Label.push('직장인구 기준');
			}
			chart20Data1.push(chart20Tmp[i].megaAvgCardAmt);
			chart20Data2.push(chart20Tmp[i].admiAvgCardAmt);
			i++;
		}
	}
}

var rpt_chart20 = echarts.init(document.getElementById('rpt_chart20'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '0%',
		right: '0%',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart20Label,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: response.data.reportParams[0].megaNm,
		type: 'bar',
		data: chart20Data1,
		barWidth: '8%',
		itemStyle: {
			color: '#efb300',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#efb300',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: response.data.reportInfo.admiNm,
			type: 'bar',
			data: chart20Data2,
			barWidth: '8%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84A92C',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}
	]
};

function start_rpt_chart20() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart20.setOption(option);
	rpt_chart20.resize();
}
start_rpt_chart20();

//rpt_chart21
let chart21Label = [];
let chart21Data1 = [];
let chart21Data2 = [];
i = 0;

chart21Tmp = response.data.reportE06;
if(chart21Tmp != null){
	if(chart21Tmp.length != 0 ){
		while(i < chart21Tmp.length){
			chart21Label.push(chart21Tmp[i].label);
			chart21Data1.push(chart21Tmp[i].percnt1);
			chart21Data2.push(chart21Tmp[i].percnt2);
			i++;
		}
	}
}


var rpt_chart21 = echarts.init(document.getElementById('rpt_chart21'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '0%',
		right: '0%',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: response.data.reportParams[0].megaNm + " 화장품 평균",
			itemStyle: {
				color: '#C2E371'
			}

		},
			{
				name: "해당지역 화장품 평균",
				itemStyle: {
					color: '#efb300'
				}
			},
		],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart21Label,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: response.data.reportParams[0].megaNm +' 화장품 평균',
		type: 'bar',
		data: chart21Data1,
		barWidth: '20%',
		itemStyle: {
			color: '#efb300',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#efb300',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '해당지역 화장품 평균',
			type: 'bar',
			data: chart21Data2,
			barWidth: '20%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84A92C',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}
	]
};

function start_rpt_chart21() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart21.setOption(option);
	rpt_chart21.resize();
}
start_rpt_chart21();


//rpt_chart22
let chart22Label = [];
let chart22Data1 = [];
let chart22Data2 = [];
i = 0;

chart22Tmp = response.data.reportE07;
if(chart22Tmp != null){
	if(chart22Tmp.length != 0 ){
		while(i < chart22Tmp.length){
			chart22Label.push(chart22Tmp[i].label);
			chart22Data1.push(chart22Tmp[i].percnt1);
			chart22Data2.push(chart22Tmp[i].percnt2);
			i++;
		}
	}
}

var rpt_chart22 = echarts.init(document.getElementById('rpt_chart22'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '0%',
		right: '0%',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: response.data.reportParams[0].megaNm + " 화장품 평균",
			itemStyle: {
				color: '#C2E371'
			}

		},
			{
				name: "해당지역 화장품 평균",
				itemStyle: {
					color: '#efb300'
				}
			},
		],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart22Label,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: response.data.reportParams[0].megaNm +' 화장품 평균',
		type: 'bar',
		data: chart22Data1,
		barWidth: '20%',
		itemStyle: {
			color: '#efb300',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#efb300',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '해당지역 화장품 평균',
			type: 'bar',
			data: chart22Data2,
			barWidth: '20%',
			itemStyle: {
				color: '#C2E371',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#84A92C',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}
	]
};

function start_rpt_chart22() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart22.setOption(option);
	rpt_chart22.resize();
}
start_rpt_chart22();

//rpt_chart23
var chart2_label_array =
	'월,화,수,목,금,토,일';
chart2_label_array = chart2_label_array.split(',');

let chart23Data1 = [];
i = 0;

chart23Tmp = response.data.reportG01;
if(chart23Tmp != null){
	if(chart23Tmp.length != 0 ){
		while(i < chart23Tmp.length){
			if(chart23Tmp[i].key == 'mon_pop') chart23Data1.push(chart23Tmp[i].value);
			if(chart23Tmp[i].key == 'tue_pop') chart23Data1.push(chart23Tmp[i].value);
			if(chart23Tmp[i].key == 'wed_pop') chart23Data1.push(chart23Tmp[i].value);
			if(chart23Tmp[i].key == 'thu_pop') chart23Data1.push(chart23Tmp[i].value);
			if(chart23Tmp[i].key == 'fri_pop') chart23Data1.push(chart23Tmp[i].value);
			if(chart23Tmp[i].key == 'sat_pop') chart23Data1.push(chart23Tmp[i].value);
			if(chart23Tmp[i].key == 'sun_pop') chart23Data1.push(chart23Tmp[i].value);
			i++;
		}
	}
}

var rpt_chart23 = echarts.init(document.getElementById('rpt_chart23'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: "해당지역 유동인구",
			itemStyle: {
				color: '#efb300'
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '해당지역 유동인구',
		type: 'bar',
		data: chart23Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#efb300',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#efb300',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	}, ]
};

function start_rpt_chart23() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart23.setOption(option);
	rpt_chart23.resize();
}
start_rpt_chart23();


//rpt_chart24
var chart2_label_array =
	'월,화,수,목,금,토,일';
chart2_label_array = chart2_label_array.split(',');

let chart24Data1 = [];
i = 0;

chart24Tmp = response.data.reportG01;
if(chart24Tmp != null){
	if(chart24Tmp.length != 0 ){
		while(i < chart24Tmp.length){
			if(chart24Tmp[i].key == 'mega_mon_pop') chart24Data1.push(chart24Tmp[i].value);
			if(chart24Tmp[i].key == 'mega_tue_pop') chart24Data1.push(chart24Tmp[i].value);
			if(chart24Tmp[i].key == 'mega_wed_pop') chart24Data1.push(chart24Tmp[i].value);
			if(chart24Tmp[i].key == 'mega_thu_pop') chart24Data1.push(chart24Tmp[i].value);
			if(chart24Tmp[i].key == 'mega_fri_pop') chart24Data1.push(chart24Tmp[i].value);
			if(chart24Tmp[i].key == 'mega_sat_pop') chart24Data1.push(chart24Tmp[i].value);
			if(chart24Tmp[i].key == 'mega_sun_pop') chart24Data1.push(chart24Tmp[i].value);
			i++;
		}
	}
}

var rpt_chart24 = echarts.init(document.getElementById('rpt_chart24'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: response.data.reportParams[0].megaNm + " 유동인구",
			itemStyle: {
				color: '#c2e371',
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: response.data.reportParams[0].megaNm +' 유동인구',
		type: 'bar',
		data: chart24Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#c2e371',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#84a92c',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	}, ]
};

function start_rpt_chart24() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart24.setOption(option);
	rpt_chart24.resize();
}
start_rpt_chart24();

//rpt_chart25
var chart2_label_array =
	'07~10시,10~12시,12~14시,14~18시,18~21시';
chart2_label_array = chart2_label_array.split(',');

let chart25Data1 = [];
i = 0;

chart25Tmp = response.data.reportG02;
if(chart25Tmp[0] != null){
	if(chart25Tmp.length != 0 ){
		while(i < chart25Tmp.length){
			if(chart25Tmp[i].key == 'time_0710') chart25Data1.push(chart25Tmp[i].value);
			if(chart25Tmp[i].key == 'time_1012') chart25Data1.push(chart25Tmp[i].value);
			if(chart25Tmp[i].key == 'time_1214') chart25Data1.push(chart25Tmp[i].value);
			if(chart25Tmp[i].key == 'time_1418') chart25Data1.push(chart25Tmp[i].value);
			if(chart25Tmp[i].key == 'time_1821') chart25Data1.push(chart25Tmp[i].value);
			i++;
		}
	}
}

var rpt_chart25 = echarts.init(document.getElementById('rpt_chart25'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: "해당지역 유동인구",
			itemStyle: {
				color: '#efb300'
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '해당지역 유동인구',
		type: 'bar',
		data: chart25Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#efb300',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#efb300',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	}, ]
};

function start_rpt_chart25() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart25.setOption(option);
	rpt_chart25.resize();
}
start_rpt_chart25();

//rpt_chart26
var chart2_label_array =
	'07~10시,10~12시,12~14시,14~18시,18~21시';

let chart26Data1 = [];
i = 0;

chart26Tmp = response.data.reportG02;
if(chart26Tmp != null){
	if(chart26Tmp.length != 0 ){
		while(i < chart26Tmp.length){
			if(chart26Tmp[i].key == 'mega_time_0710') chart26Data1.push(chart26Tmp[i].value);
			if(chart26Tmp[i].key == 'mega_time_1012') chart26Data1.push(chart26Tmp[i].value);
			if(chart26Tmp[i].key == 'mega_time_1214') chart26Data1.push(chart26Tmp[i].value);
			if(chart26Tmp[i].key == 'mega_time_1418') chart26Data1.push(chart26Tmp[i].value);
			if(chart26Tmp[i].key == 'mega_time_1821') chart26Data1.push(chart26Tmp[i].value);
			i++;
		}
	}
}
chart2_label_array = chart2_label_array.split(',');
var rpt_chart26 = echarts.init(document.getElementById('rpt_chart26'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: response.data.reportParams[0].megaNm + " 유동인구",
			itemStyle: {
				color: '#c2e371',
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: response.data.reportParams[0].megaNm + ' 유동인구',
		type: 'bar',
		data: chart26Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#c2e371',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#84a92c',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	}, ]
};

function start_rpt_chart26() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart26.setOption(option);
	rpt_chart26.resize();
}
start_rpt_chart26();


//rpt_chart27
var chart2_label_array ='20대,30대,40대,50대,60대 이상';
let chartG03Data1 = [];
let chartG03Data2 = [];
let chartG03_2Data1 = [];
let chartG03_2Data2 = [];
if(!common.isEmpty(response.data.reportG03)){
	// 남성
	chartG03Data1.push(response.data.reportG03[0].inflowM20);
	chartG03Data1.push(response.data.reportG03[0].inflowM30);
	chartG03Data1.push(response.data.reportG03[0].inflowM40);
	chartG03Data1.push(response.data.reportG03[0].inflowM50);
	chartG03Data1.push(response.data.reportG03[0].inflowM60);
	// 여성
	chartG03Data2.push(response.data.reportG03[0].inflowW20);
	chartG03Data2.push(response.data.reportG03[0].inflowW30);
	chartG03Data2.push(response.data.reportG03[0].inflowW40);
	chartG03Data2.push(response.data.reportG03[0].inflowW50);
	chartG03Data2.push(response.data.reportG03[0].inflowW60);

	// 남성
	chartG03_2Data1.push(response.data.reportG03[0].megaInflowM20);
	chartG03_2Data1.push(response.data.reportG03[0].megaInflowM30);
	chartG03_2Data1.push(response.data.reportG03[0].megaInflowM40);
	chartG03_2Data1.push(response.data.reportG03[0].megaInflowM50);
	chartG03_2Data1.push(response.data.reportG03[0].megaInflowM60);
	// 여성
	chartG03_2Data2.push(response.data.reportG03[0].megaInflowW20);
	chartG03_2Data2.push(response.data.reportG03[0].megaInflowW30);
	chartG03_2Data2.push(response.data.reportG03[0].megaInflowW40);
	chartG03_2Data2.push(response.data.reportG03[0].megaInflowW50);
	chartG03_2Data2.push(response.data.reportG03[0].megaInflowW60);
}


chart2_label_array = chart2_label_array.split(',');
var rpt_chart27 = echarts.init(document.getElementById('rpt_chart27'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: "남",
			itemStyle: {
				color: '#63c6c2',
			}

		}, {
			name: "여",
			itemStyle: {
				color: '#ffa695',
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '남',
		type: 'bar',
		data: chartG03Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#63c6c2',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#63c6c2',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '여',
			type: 'bar',
			data: chartG03Data2,
			barWidth: '30%',
			itemStyle: {
				color: '#ffa695',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#ffa695',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
	]
};

function start_rpt_chart27() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart27.setOption(option);
	rpt_chart27.resize();
}
start_rpt_chart27();


//rpt_chart28
var chart2_label_array =
	'20대,30대,40대,50대,60대 이상';
chart2_label_array = chart2_label_array.split(',');
var rpt_chart28 = echarts.init(document.getElementById('rpt_chart28'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: "남",
			itemStyle: {
				color: '#63c6c2',
			}

		}, {
			name: "여",
			itemStyle: {
				color: '#ffa695',
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '남',
		type: 'bar',
		data: chartG03_2Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#63c6c2',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#63c6c2',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '여',
			type: 'bar',
			data: chartG03_2Data2,
			barWidth: '30%',
			itemStyle: {
				color: '#ffa695',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#ffa695',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
	]
};


function start_rpt_chart28() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart28.setOption(option);
	rpt_chart28.resize();
}
start_rpt_chart28();

//rpt_chart29
var chart2_label_array =
	'20대,30대,40대,50대,60대이상';
chart2_label_array = chart2_label_array.split(',');

	let chartG04Data1 = [];
	let chartG04Data2 = [];
	i = 0;

	let chartG04Tmp = response.data.reportG04;
	if(chartG04Tmp != null){
		if(chartG04Tmp.length != 0 ){
			while(i < chartG04Tmp.length){
				// 남성
				chartG04Data1.push(chartG04Tmp[i].popM20);
				chartG04Data1.push(chartG04Tmp[i].popM30);
				chartG04Data1.push(chartG04Tmp[i].popM40);
				chartG04Data1.push(chartG04Tmp[i].popM50);
				chartG04Data1.push(chartG04Tmp[i].popM60);
				// 여성
				chartG04Data2.push(chartG04Tmp[i].popW20);
				chartG04Data2.push(chartG04Tmp[i].popW30);
				chartG04Data2.push(chartG04Tmp[i].popW40);
				chartG04Data2.push(chartG04Tmp[i].popW50);
				chartG04Data2.push(chartG04Tmp[i].popW60);
				i++;
			}
		}
	}

	let chartG04_2Data1 = [];
	let chartG04_2Data2 = [];
	i = 0;

	if(chartG04Tmp != null){
		if(chartG04Tmp.length != 0 ){
			while(i < chartG04Tmp.length){
				// 남성
				chartG04_2Data1.push(chartG04Tmp[i].megaPopM20);
				chartG04_2Data1.push(chartG04Tmp[i].megaPopM30);
				chartG04_2Data1.push(chartG04Tmp[i].megaPopM40);
				chartG04_2Data1.push(chartG04Tmp[i].megaPopM50);
				chartG04_2Data1.push(chartG04Tmp[i].megaPopM60);
				// 여성
				chartG04_2Data2.push(chartG04Tmp[i].megaPopW20);
				chartG04_2Data2.push(chartG04Tmp[i].megaPopW30);
				chartG04_2Data2.push(chartG04Tmp[i].megaPopW40);
				chartG04_2Data2.push(chartG04Tmp[i].megaPopW50);
				chartG04_2Data2.push(chartG04Tmp[i].megaPopW60);
				i++;
			}
		}
	}
var rpt_chart29 = echarts.init(document.getElementById('rpt_chart29'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: "남",
			itemStyle: {
				color: '#63c6c2',
			}

		}, {
			name: "여",
			itemStyle: {
				color: '#ffa695',
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '남',
		type: 'bar',
		data: chartG04Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#63c6c2',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#63c6c2',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '여',
			type: 'bar',
			data: chartG04Data2,
			barWidth: '30%',
			itemStyle: {
				color: '#ffa695',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#ffa695',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
	]
};


function start_rpt_chart29() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart29.setOption(option);
	rpt_chart29.resize();
}
start_rpt_chart29();

//rpt_chart30
var chart2_label_array =
	'20대,30대,40대,50대,60대이상';
chart2_label_array = chart2_label_array.split(',');
var rpt_chart30 = echarts.init(document.getElementById('rpt_chart30'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: "남",
			itemStyle: {
				color: '#63c6c2',
			}

		}, {
			name: "여",
			itemStyle: {
				color: '#ffa695',
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '남',
		type: 'bar',
		data: chartG04_2Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#63c6c2',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#63c6c2',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '여',
			type: 'bar',
			data: chartG04_2Data2,
			barWidth: '30%',
			itemStyle: {
				color: '#ffa695',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#ffa695',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
	]
};


function start_rpt_chart30() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart30.setOption(option);
	rpt_chart30.resize();
}
start_rpt_chart30();


//rpt_chart31
var chart2_label_array =
	'20대,30대,40대,50대,60대 이상';
chart2_label_array = chart2_label_array.split(',');

	let chartG07Data1 = [];
	let chartG07Data2 = [];
	i = 0;

	let chartG07Tmp = response.data.reportG07;
	if(chartG07Tmp != null){
		if(chartG07Tmp.length != 0 ){
			while(i < chartG07Tmp.length){
				// 남성
				chartG07Data1.push(chartG07Tmp[i].empCntM20);
				chartG07Data1.push(chartG07Tmp[i].empCntM30);
				chartG07Data1.push(chartG07Tmp[i].empCntM40);
				chartG07Data1.push(chartG07Tmp[i].empCntM50);
				chartG07Data1.push(chartG07Tmp[i].empCntM60over);
				// 여성
				chartG07Data2.push(chartG07Tmp[i].empCntW20);
				chartG07Data2.push(chartG07Tmp[i].empCntW30);
				chartG07Data2.push(chartG07Tmp[i].empCntW40);
				chartG07Data2.push(chartG07Tmp[i].empCntW50);
				chartG07Data2.push(chartG07Tmp[i].empCntW60over);
				i++;
			}
		}
	}

	let chartG07_2Data1 = [];
	let chartG07_2Data2 = [];
	i = 0;

	if(chartG07Tmp != null){
		if(chartG07Tmp.length != 0 ){
			while(i < chartG07Tmp.length){
				// 남성
				chartG07_2Data1.push(chartG07Tmp[i].megaEmpCntM20);
				chartG07_2Data1.push(chartG07Tmp[i].megaEmpCntM30);
				chartG07_2Data1.push(chartG07Tmp[i].megaEmpCntM40);
				chartG07_2Data1.push(chartG07Tmp[i].megaEmpCntM50);
				chartG07_2Data1.push(chartG07Tmp[i].megaEmpCntM60over);
				// 여성
				chartG07_2Data2.push(chartG07Tmp[i].megaEmpCntM20);
				chartG07_2Data2.push(chartG07Tmp[i].megaEmpCntM30);
				chartG07_2Data2.push(chartG07Tmp[i].megaEmpCntM40);
				chartG07_2Data2.push(chartG07Tmp[i].megaEmpCntM50);
				chartG07_2Data2.push(chartG07Tmp[i].megaEmpCntM60over);
				i++;
			}
		}
	}

var rpt_chart31 = echarts.init(document.getElementById('rpt_chart31'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: "남",
			itemStyle: {
				color: '#63c6c2',
			}

		}, {
			name: "여",
			itemStyle: {
				color: '#ffa695',
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '남',
		type: 'bar',
		data: chartG07Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#63c6c2',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#63c6c2',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '여',
			type: 'bar',
			data: chartG07Data2,
			barWidth: '30%',
			itemStyle: {
				color: '#ffa695',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#ffa695',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
	]
};


function start_rpt_chart31() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart31.setOption(option);
	rpt_chart31.resize();
}
start_rpt_chart31();

//rpt_chart30
var chart2_label_array =
	'20대,30대,40대,50대,60대 이상';
chart2_label_array = chart2_label_array.split(',');

var rpt_chart32 = echarts.init(document.getElementById('rpt_chart32'));
option = {

	grid: {
		bottom: '12%',
		top: '10%',
		left: '20px',
		right: '20px',
		containLabel: true
	},
	title: {
		text: '오늘드림 점유율 상위 10개지역',
		show: false
	},

	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {
		show: true,
		bottom: 'bottom',
		left: 'center',
		data: [{
			name: "남",
			itemStyle: {
				color: '#63c6c2',
			}

		}, {
			name: "여",
			itemStyle: {
				color: '#ffa695',
			}

		}, ],
	},
	label: [],
	xAxis: {
		type: 'category',
		data: chart2_label_array,
		axisLine: {
			lineStyle: {
				color: '#9e9e9e'
			}
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: '#666F7E',
				fontSize: 12,
				fontWeight: 500,
				lineHeight: 16,
			},
			interval: 0,
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		show: false,
		type: 'value',
		splitLine: { // y축 수치선
			show: false
		},
		axisLabel: {
			show: false,
		},

	},
	series: [{
		name: '남',
		type: 'bar',
		data: chartG07_2Data1,
		barWidth: '30%',
		itemStyle: {
			color: '#63c6c2',
			barBorderRadius: [4, 4, 0, 0],
		},
		label: {
			show: true,
			position: 'outside',
			align: 'center',
			color: '#63c6c2',
			formatter: '{c}',
			textPadding: '12',
			fontWeight: '600',
			borderRadius: '12',
			fontSize: '12',
			fontFamily: 'Pretendard',
			formatter: function (params) {
				var returnVal = echarts.format.addCommas(params.value);
				return returnVal;
			}
		},
	},
		{
			name: '여',
			type: 'bar',
			data: chartG07_2Data2,
			barWidth: '30%',
			itemStyle: {
				color: '#ffa695',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#ffa695',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		},
	]
};


function start_rpt_chart32() {
	var show = option.yAxis.show;
	var left = option.legend.left;
	var labelSize = option.label.fontSize;
	var grid_l = option.grid.left;
	var grid_r = option.grid.right;
	var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

	if (window.innerWidth >= 1380) {
		show = 'false';
		fontSize = '12';
		left = 'center';
	} else if (window.innerWidth <= 280) {
		fontSize = '9';
		grid_l = '4';
		grid_r = '4';
		labelSize = '10';
	} else if (window.innerWidth <= 360) {
		fontSize = '11';
		grid_l = '0';
		grid_r = '0';
		labelSize = '10';
	} else if (window.innerWidth < 1380) {
		fontSize = '12';
		show = 'false';
		left = 'center';
	}
	option.yAxis.show = show;
	option.xAxis.axisLabel.textStyle.fontSize = fontSize;
	option.label.fontSize = labelSize;
	option.grid.left = grid_l;
	option.grid.right = grid_r;
	option.legend.left = left;

	rpt_chart32.setOption(option);
	rpt_chart32.resize();
}
start_rpt_chart32();


//echart width 오류 해결
const rp_container12 = document.querySelector('#rpt_chart12');
const rp_chart12 = echarts.init(rp_container12);
new ResizeObserver(() => rp_chart12.resize()).observe(rp_container12);

const rp_container13 = document.querySelector('#rpt_chart13');
const rp_chart13 = echarts.init(rp_container13);
new ResizeObserver(() => rp_chart13.resize()).observe(rp_container13);

// const rp_container14 = document.querySelector('#rpt_chart14');
// const rp_chart14 = echarts.init(rp_container14);
// new ResizeObserver(() => rp_chart14.resize()).observe(rp_container14);

const rp_container15 = document.querySelector('#rpt_chart15');
const rp_chart15 = echarts.init(rp_container15);
new ResizeObserver(() => rp_chart15.resize()).observe(rp_container15);

const rp_container16 = document.querySelector('#rpt_chart16');
const rp_chart16 = echarts.init(rp_container16);
new ResizeObserver(() => rp_chart16.resize()).observe(rp_container16);

const rp_container17 = document.querySelector('#rpt_chart17');
const rp_chart17 = echarts.init(rp_container17);
new ResizeObserver(() => rp_chart17.resize()).observe(rp_container17);

const rp_container18 = document.querySelector('#rpt_chart18');
const rp_chart18 = echarts.init(rp_container18);
new ResizeObserver(() => rp_chart18.resize()).observe(rp_container18);

const rp_container19 = document.querySelector('#rpt_chart19');
const rp_chart19 = echarts.init(rp_container19);
new ResizeObserver(() => rp_chart19.resize()).observe(rp_container19);

const rp_container19_2 = document.querySelector('#rpt_chart19_2');
const rp_chart19_2 = echarts.init(rp_container19_2);
new ResizeObserver(() => rp_chart19_2.resize()).observe(rp_container19_2);

const rp_container20 = document.querySelector('#rpt_chart20');
const rp_chart20 = echarts.init(rp_container20);
new ResizeObserver(() => rp_chart20.resize()).observe(rp_container20);

const rp_container21 = document.querySelector('#rpt_chart21');
const rp_chart21 = echarts.init(rp_container21);
new ResizeObserver(() => rp_chart21.resize()).observe(rp_container21);

const rp_container22 = document.querySelector('#rpt_chart22');
const rp_chart22 = echarts.init(rp_container22);
new ResizeObserver(() => rp_chart22.resize()).observe(rp_container22);

const rp_container23 = document.querySelector('#rpt_chart23');
const rp_chart23 = echarts.init(rp_container23);
new ResizeObserver(() => rp_chart23.resize()).observe(rp_container23);

const rp_container24 = document.querySelector('#rpt_chart24');
const rp_chart24 = echarts.init(rp_container24);
new ResizeObserver(() => rp_chart24.resize()).observe(rp_container24);

const rp_container25 = document.querySelector('#rpt_chart25');
const rp_chart25 = echarts.init(rp_container25);
new ResizeObserver(() => rp_chart25.resize()).observe(rp_container25);

const rp_container26 = document.querySelector('#rpt_chart26');
const rp_chart26 = echarts.init(rp_container26);
new ResizeObserver(() => rp_chart26.resize()).observe(rp_container26);

const rp_container27 = document.querySelector('#rpt_chart27');
const rp_chart27 = echarts.init(rp_container27);
new ResizeObserver(() => rp_chart27.resize()).observe(rp_container27);

const rp_container28 = document.querySelector('#rpt_chart28');
const rp_chart28 = echarts.init(rp_container28);
new ResizeObserver(() => rp_chart28.resize()).observe(rp_container28);

const rp_container29 = document.querySelector('#rpt_chart29');
const rp_chart29 = echarts.init(rp_container29);
new ResizeObserver(() => rp_chart29.resize()).observe(rp_container29);

const rp_container30 = document.querySelector('#rpt_chart30');
const rp_chart30 = echarts.init(rp_container30);
new ResizeObserver(() => rp_chart30.resize()).observe(rp_container30);

const rp_container31 = document.querySelector('#rpt_chart31');
const rp_chart31 = echarts.init(rp_container31);
new ResizeObserver(() => rp_chart31.resize()).observe(rp_container31);

const rp_container32 = document.querySelector('#rpt_chart32');
const rp_chart32 = echarts.init(rp_container32);
new ResizeObserver(() => rp_chart32.resize()).observe(rp_container32);
}

function openingDrawMap(response){

	var areaJsonArr1 = [];

	strCenterx = 126.97787;
	strCentery = 37.56648;

	setTimeout(function (){
		CENTER = new naver.maps.LatLng(strCentery, strCenterx);
		mapOptions = {
			center: new naver.maps.LatLng(strCentery, strCenterx),
			zoom: 14,
		};

		map3 = new naver.maps.Map('map3', mapOptions);            // map2 = new naver.maps.Map('map2', mapOptions);


		// removeAreaGeom();
		// 지도 1------------------------------------------------------------------------------------

		// 범례 클릭 지도 제거 부분
		var filtered1 = response.data.reportD05;
		$(".checkmark").parent().children('input').each(function (){
			if(!$(this).prop('checked')){
				if(!common.isEmpty(filtered1)){
					filtered1 = filtered1.filter(o => Number(o.lv) !== $(this).data('lv'));
				}
			}
		});

		for(idx in filtered1){
			if(filtered1[idx].memberRate == 0){
				// console.log(" center : "+ filtered1[idx].xAxis +" / "+ filtered1[idx].yAxis);
				var center = new naver.maps.Point(filtered1[idx].xAxis, filtered1[idx].yAxis);
				map3.setCenter(center);
				map3.setZoom(13);
			}
		}

		var result = getGeomJson("StoreReport3-1", "FeatureCollection", filtered1);
		strGeoJson = result;
		areaJsonArr1.push(result);
		map3.data.addGeoJson(result);


		map3.data.setStyle(function(feature){
			var styleOptions = {
				fillOpacity : feature.getProperty('fillOpacity')
				, fillColor : feature.getProperty('fillColor')
				, strokeColor : "#ffffff"
				, storkeWeight : 3
				, storkeOpacity : 1
			}
			return styleOptions;
		});

	},6000);
}

function todayChart(response){
	var array_label = [];
	var array_data1 = [];
	var array_data2 = [];
	if(!common.isEmpty(response.data.report3_1[0])){
		response.data.report3_1.forEach(function (val,idx){
			var type = "array_";
			if(common.isEmpty(val.storeNm)){
				type = type + "label";
			}else{
				type = type + "data1";
			}

			if(idx == 0){
				eval(type).push(common.substr(val.month00, 2,2) + "." + common.substr(val.month00, 4,2));
				eval(type).push(common.substr(val.month01, 2,2) + "." + common.substr(val.month01, 4,2));
				eval(type).push(common.substr(val.month02, 2,2) + "." + common.substr(val.month02, 4,2));
				eval(type).push(common.substr(val.month03, 2,2) + "." + common.substr(val.month03, 4,2));
				eval(type).push(common.substr(val.month04, 2,2) + "." + common.substr(val.month04, 4,2));
				eval(type).push(common.substr(val.month05, 2,2) + "." + common.substr(val.month05, 4,2));
				eval(type).push(common.substr(val.month06, 2,2) + "." + common.substr(val.month06, 4,2));
				eval(type).push(common.substr(val.month07, 2,2) + "." + common.substr(val.month07, 4,2));
				eval(type).push(common.substr(val.month08, 2,2) + "." + common.substr(val.month08, 4,2));
				eval(type).push(common.substr(val.month09, 2,2) + "." + common.substr(val.month09, 4,2));
				eval(type).push(common.substr(val.month10, 2,2) + "." + common.substr(val.month10, 4,2));
				eval(type).push(common.substr(val.month11, 2,2) + "." + common.substr(val.month11, 4,2));
				eval(type).push(common.substr(val.month12, 2,2) + "." + common.substr(val.month12, 4,2));
			}else{
				eval(type).push(Number(val.month00));
				eval(type).push(Number(val.month01));
				eval(type).push(Number(val.month02));
				eval(type).push(Number(val.month03));
				eval(type).push(Number(val.month04));
				eval(type).push(Number(val.month05));
				eval(type).push(Number(val.month06));
				eval(type).push(Number(val.month07));
				eval(type).push(Number(val.month08));
				eval(type).push(Number(val.month09));
				eval(type).push(Number(val.month10));
				eval(type).push(Number(val.month11));
				eval(type).push(Number(val.month12));
			}

			if(!common.isEmpty(val.storeNm)){
				var obj = {
					name: val.storeNm,
					type: 'bar',
					stack: 'total',
					data: array_data1,
					barWidth: '60%',
					itemStyle: {
						color : chartColor[idx]
					},
					label: {
						show: true,
						position: 'inside',
						align: 'center',
						color: '#fff',
						formatter: '{c}',
						textPadding: '12',
						fontWeight: '600',
						borderRadius: '12',
						fontSize: '11',
						fontFamily: 'Pretendard',
						formatter: function (params) {
							var returnVal = echarts.format.addCommas(params.value);
							return returnVal;
						}
					},
				};
				array_data2.push(obj);
			}
		});
	}

	//gift_chart01
	var gift_chart01 = echarts.init(document.getElementById('gift_chart01'));
	option = {
		grid: {
			//bottom: '96px', containLabel: false 추가
			bottom: '96px',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: false,
		},
		title: {
			text: '상권유형판별',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: array_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 13,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			}
		},
		series: array_data2
	}

	function start_gift_chart01() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '11';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;
		// option.xAxis.axisLabel.textStyle.padding = [16,0,0,0];
		gift_chart01.setOption(option);
		gift_chart01.resize();
	}
	start_gift_chart01();


	var array_label = [];
	var array_data1 = [];
	var array_data2 = [];
	if(!common.isEmpty(response.data.report3_2[0])){
		response.data.report3_2.forEach(function (val,idx){
			var type = "array_";
			if(common.isEmpty(val.storeNm)){
				type = type + "label";
			}else{
				type = type + "data1";
			}
			if(idx == 0){
				eval(type).push(common.substr(val.month00, 2,2) + "." + common.substr(val.month00, 4,2));
				eval(type).push(common.substr(val.month01, 2,2) + "." + common.substr(val.month01, 4,2));
				eval(type).push(common.substr(val.month02, 2,2) + "." + common.substr(val.month02, 4,2));
				eval(type).push(common.substr(val.month03, 2,2) + "." + common.substr(val.month03, 4,2));
				eval(type).push(common.substr(val.month04, 2,2) + "." + common.substr(val.month04, 4,2));
				eval(type).push(common.substr(val.month05, 2,2) + "." + common.substr(val.month05, 4,2));
				eval(type).push(common.substr(val.month06, 2,2) + "." + common.substr(val.month06, 4,2));
				eval(type).push(common.substr(val.month07, 2,2) + "." + common.substr(val.month07, 4,2));
				eval(type).push(common.substr(val.month08, 2,2) + "." + common.substr(val.month08, 4,2));
				eval(type).push(common.substr(val.month09, 2,2) + "." + common.substr(val.month09, 4,2));
				eval(type).push(common.substr(val.month10, 2,2) + "." + common.substr(val.month10, 4,2));
				eval(type).push(common.substr(val.month11, 2,2) + "." + common.substr(val.month11, 4,2));
				eval(type).push(common.substr(val.month12, 2,2) + "." + common.substr(val.month12, 4,2));
			}else{
				eval(type).push(Number(val.month00));
				eval(type).push(Number(val.month01));
				eval(type).push(Number(val.month02));
				eval(type).push(Number(val.month03));
				eval(type).push(Number(val.month04));
				eval(type).push(Number(val.month05));
				eval(type).push(Number(val.month06));
				eval(type).push(Number(val.month07));
				eval(type).push(Number(val.month08));
				eval(type).push(Number(val.month09));
				eval(type).push(Number(val.month10));
				eval(type).push(Number(val.month11));
				eval(type).push(Number(val.month12));
			}
			if(!common.isEmpty(val.storeNm)){
				var obj = {
					name: val.storeNm,
					type: 'bar',
					stack: 'total',
					data: array_data1,
					barWidth: '60%',
					itemStyle: {
						color : chartColor[idx]
					},
					label: {
						show: true,
						position: 'inside',
						align: 'center',
						color: '#fff',
						formatter: '{c}',
						textPadding: '12',
						fontWeight: '600',
						borderRadius: '12',
						fontSize: '11',
						fontFamily: 'Pretendard',
						formatter: function (params) {
							var returnVal = echarts.format.addCommas(params.value);
							return returnVal;
						}
					},
				};
				array_data2.push(obj);
			}
		});
	}
	//gift_chart02
	var gift_chart02 = echarts.init(document.getElementById('gift_chart02'));
	option = {
		grid: {
			bottom: '96px',
			top: '10%',
			left: '0%',
			right: '0%',
			containLabel: false,
		},
		title: {
			text: '상권유형판별',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: array_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 13,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			}
		},
		series: array_data2
	}

	function start_gift_chart02() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '11';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '11';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;
		// option.xAxis.axisLabel.textStyle.padding = [16,0,0,0];
		gift_chart02.setOption(option);
		gift_chart02.resize();
	}
	start_gift_chart02();

	var array_label = [];
	var array_data1 = [];
	var array_data2 = [];
	// console.log(response.data.report3_3);
	response.data.report3_3.forEach(function (val,idx){
		var type = "array_";
		if(val.type == "DATE"){
			type = type + "label";
		}else if(val.type == '00.cnt'){
			type = type + "data1";
		}else if(val.type == '01.amt'){
			type = type + "data2";
		}
		if(val.type == "DATE"){
			eval(type).push(common.substr(val.yM12, 2,2) + "." + common.substr(val.yM12, 4,2));
			eval(type).push(common.substr(val.yM11, 2,2) + "." + common.substr(val.yM11, 4,2));
			eval(type).push(common.substr(val.yM10, 2,2) + "." + common.substr(val.yM10, 4,2));
			eval(type).push(common.substr(val.yM09, 2,2) + "." + common.substr(val.yM09, 4,2));
			eval(type).push(common.substr(val.yM08, 2,2) + "." + common.substr(val.yM08, 4,2));
			eval(type).push(common.substr(val.yM07, 2,2) + "." + common.substr(val.yM07, 4,2));
			eval(type).push(common.substr(val.yM06, 2,2) + "." + common.substr(val.yM06, 4,2));
			eval(type).push(common.substr(val.yM05, 2,2) + "." + common.substr(val.yM05, 4,2));
			eval(type).push(common.substr(val.yM04, 2,2) + "." + common.substr(val.yM04, 4,2));
			eval(type).push(common.substr(val.yM03, 2,2) + "." + common.substr(val.yM03, 4,2));
			eval(type).push(common.substr(val.yM02, 2,2) + "." + common.substr(val.yM02, 4,2));
			eval(type).push(common.substr(val.yM01, 2,2) + "." + common.substr(val.yM01, 4,2));
			eval(type).push(common.substr(val.yM00, 2,2) + "." + common.substr(val.yM00, 4,2));
			eval(type).push(common.substr(val.yP01, 2,2) + "." + common.substr(val.yP01, 4,2));
			eval(type).push(common.substr(val.yP02, 2,2) + "." + common.substr(val.yP02, 4,2));
			eval(type).push(common.substr(val.yP03, 2,2) + "." + common.substr(val.yP03, 4,2));
			eval(type).push(common.substr(val.yP04, 2,2) + "." + common.substr(val.yP04, 4,2));
			eval(type).push(common.substr(val.yP05, 2,2) + "." + common.substr(val.yP05, 4,2));
			eval(type).push(common.substr(val.yP06, 2,2) + "." + common.substr(val.yP06, 4,2));
			eval(type).push(common.substr(val.yP07, 2,2) + "." + common.substr(val.yP07, 4,2));
			eval(type).push(common.substr(val.yP08, 2,2) + "." + common.substr(val.yP08, 4,2));
			eval(type).push(common.substr(val.yP09, 2,2) + "." + common.substr(val.yP09, 4,2));
			eval(type).push(common.substr(val.yP10, 2,2) + "." + common.substr(val.yP10, 4,2));
			eval(type).push(common.substr(val.yP11, 2,2) + "." + common.substr(val.yP11, 4,2));
			eval(type).push(common.substr(val.yP12, 2,2) + "." + common.substr(val.yP12, 4,2));
		}else{
			eval(type).push(Number(val.yM12));
			eval(type).push(Number(val.yM11));
			eval(type).push(Number(val.yM10));
			eval(type).push(Number(val.yM09));
			eval(type).push(Number(val.yM08));
			eval(type).push(Number(val.yM07));
			eval(type).push(Number(val.yM06));
			eval(type).push(Number(val.yM05));
			eval(type).push(Number(val.yM04));
			eval(type).push(Number(val.yM03));
			eval(type).push(Number(val.yM02));
			eval(type).push(Number(val.yM01));
			eval(type).push(Number(val.yM00));
			eval(type).push(Number(val.yP01));
			eval(type).push(Number(val.yP02));
			eval(type).push(Number(val.yP03));
			eval(type).push(Number(val.yP04));
			eval(type).push(Number(val.yP05));
			eval(type).push(Number(val.yP06));
			eval(type).push(Number(val.yP07));
			eval(type).push(Number(val.yP08));
			eval(type).push(Number(val.yP09));
			eval(type).push(Number(val.yP10));
			eval(type).push(Number(val.yP11));
			eval(type).push(Number(val.yP12));
		}
	});

	//gift_chart03
	var gift_chart03 = echarts.init(document.getElementById('gift_chart03'));
	option = {
		grid: {
			bottom: '12%',
			top: '60px',
			left: '0%',
			right: '0%',
			containLabel: true
		},
		title: {
			text: '상권유형판별',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: array_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 13,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			}
		},
		series: [
			{
				name: '주문액',
				type: 'line',
				data: array_data2,
				barWidth: '50%',
				itemStyle: {
					color: '#f38951',
					//barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					//color: '#006991',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '10',
					//lineHeight: '14',
					borderRadius: '10',
					border: '20',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);

						return returnVal;
					},
					borderRadius: 4,
					padding: 4,
				}
			},
			{
				name: '주문건',
				type: 'bar',
				data: array_data1,
				barWidth: '50%',
				itemStyle: {
					color: '#c2e371',
					//barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					//color: '#006991',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '10',
					//lineHeight: '14',
					borderRadius: '10',
					border: '20',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);

						return returnVal;
					},
					borderRadius: 4,
					padding: 4,
				}
			}
		]
	}

	function start_gift_chart03() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize
		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left
		gift_chart03.setOption(option);
		gift_chart03.resize();
	}
	start_gift_chart03();

	var array_label = [];
	var array_data1 = [];
	response.data.report4_1.forEach(function (val,idx){
		array_label.push(val.admiNm);
		array_label.push('전체');
		array_label.push(val.megaNm);
		array_label.push(val.ctyNm);
		array_data1.push(val.admiPer);
		array_data1.push(val.allPer);
		array_data1.push(val.megaPer);
		array_data1.push(val.ctyPer);
	});
	//gift_chart04
	var gift_chart04 = echarts.init(document.getElementById('gift_chart04'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: array_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [
			{
				name: '오늘드림 점유율',
				type: 'bar',
				stack: 'total',
				data: array_data1,
				barWidth: '30%',
				itemStyle: {
					color: '#efb300',
					barBorderRadius: [4, 4, 0, 0],
				},
				label: {
					show: true,
					position: 'outside',
					align: 'center',
					color: '#efb300',
					formatter: '{c}',
					textPadding: '12',
					fontWeight: '600',
					borderRadius: '12',
					fontSize: '12',
					fontFamily: 'Pretendard',
					formatter: function (params) {
						var returnVal = echarts.format.addCommas(params.value);
						return returnVal;
					}
				},
			},

		]
	};


	function start_gift_chart04() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		gift_chart04.setOption(option);
		gift_chart04.resize();
	}
	start_gift_chart04();


	var array_label = [];
	var array_data1 = [];
	response.data.report4_3.forEach(function (val,idx){
		array_label.push(val.admiNm);
		array_label.push('전체');
		array_label.push(val.megaNm);
		array_label.push(val.ctyNm);
		array_data1.push(val.admiPer);
		array_data1.push(val.allPer);
		array_data1.push(val.megaPer);
		array_data1.push(val.ctyPer);
	});

	//gift_chart05
	var gift_chart05 = echarts.init(document.getElementById('gift_chart05'));
	option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '오늘드림 점유율 상위 10개지역',
			show: false
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
		},
		label: [],
		xAxis: {
			type: 'category',
			data: array_label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '오늘드림 점유율',
			type: 'bar',
			data: array_data1,
			barWidth: '30%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}, ]
	};


	function start_gift_chart05() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		gift_chart05.setOption(option);
		gift_chart05.resize();
	}
	start_gift_chart05();

	const rp_gift_container01 = document.querySelector('#gift_chart01');
	const rp_gift_chart01 = echarts.init(rp_gift_container01);
	new ResizeObserver(() => rp_gift_chart01.resize()).observe(rp_gift_container01);

	const rp_gift_container02 = document.querySelector('#gift_chart02');
	const rp_gift_chart02 = echarts.init(rp_gift_container02);
	new ResizeObserver(() => rp_gift_chart02.resize()).observe(rp_gift_container02);

	const rp_gift_container03 = document.querySelector('#gift_chart03');
	const rp_gift_chart03 = echarts.init(rp_gift_container03);
	new ResizeObserver(() => rp_gift_chart03.resize()).observe(rp_gift_container03);

	const rp_gift_container04 = document.querySelector('#gift_chart04');
	const rp_gift_chart04 = echarts.init(rp_gift_container04);
	new ResizeObserver(() => rp_gift_chart04.resize()).observe(rp_gift_container04);

	const rp_gift_container05 = document.querySelector('#gift_chart05');
	const rp_gift_chart05 = echarts.init(rp_gift_container05);
	new ResizeObserver(() => rp_gift_chart05.resize()).observe(rp_gift_container05);
}

function customerChart(response){

	// console.log("customerChart start " + JSON.stringify(response));
	//tab_chart3------------------------------------------------------------------------------
	// console.log("start3");
	let chart03Label = [];
	let chart03Date = [];
	i = 0;

	let ageTmp = response.data.age;
	if(ageTmp != null){
		if(ageTmp.length != 0 ){
			while(i < ageTmp.length){
				// 남성
				if(i%2 == 1){
					chart03Label.push(ageTmp[i].title);
				}else{
					chart03Label.push('\n'+ageTmp[i].title);
				}
				chart03Date.push(ageTmp[i].per);
				i++;
			}
		}
	}

	//tab_chart3
	var chartDom = document.getElementById('tab_chart3_custom');
	var tab_chart3 = echarts.init(chartDom);

	var option = {
		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '주요 고객 성/연령대',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "해당지역 유동인구",
				itemStyle: {
					color: '#efb300'
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart03Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '주요고객 성/연령대',
			type: 'bar',
			data: chart03Date,
			barWidth: '30%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}, ]
	};

	function start_customer_chart03() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		tab_chart3.setOption(option);
		tab_chart3.resize();
	}
	start_customer_chart03();

	//tab_chart4------------------------------------------------------------------------------
	let chart04Label = [];
	let chart04Date = [];
	i = 0;

	let weekTmp = response.data.week;
	if(weekTmp != null){
		if(weekTmp.length != 0 ){
			while(i < weekTmp.length){
				// 남성
				chart04Label.push(weekTmp[i].title);
				chart04Date.push(weekTmp[i].per);
				i++;
			}
		}
	}
	var tab_chart4 = echarts.init(document.getElementById('tab_chart4_custom'));

	var option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '주요 고객 소비요일',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "해당지역 유동인구",
				itemStyle: {
					color: '#efb300'
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart04Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '주요고객 소비요일',
			type: 'bar',
			data: chart04Date,
			barWidth: '30%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}, ]
	};

	function start_customer_chart04() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		tab_chart4.setOption(option);
		tab_chart4.resize();
	}
	start_customer_chart04();
	//tab_chart4------------------------------------------------------------------------------
	let chart05Label = [];
	let chart05Date = [];
	i = 0;

	let timeTmp = response.data.time;
	if(timeTmp != null){
		if(timeTmp.length != 0 ){
			while(i < timeTmp.length){
				// 남성
				if(i%2 == 1){
					chart05Label.push(timeTmp[i].title);
				}else{
					chart05Label.push('\n'+timeTmp[i].title);
				}
				chart05Date.push(timeTmp[i].per);
				i++;
			}
		}
	}

	var tab_chart5 = echarts.init(document.getElementById('tab_chart5_custom'));
	var option = {

		grid: {
			bottom: '12%',
			top: '10%',
			left: '20px',
			right: '20px',
			containLabel: true
		},
		title: {
			text: '주요 고객 소비기간',
			show: false
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show: true,
			bottom: 'bottom',
			left: 'center',
			data: [{
				name: "해당지역 유동인구",
				itemStyle: {
					color: '#efb300'
				}

			}, ],
		},
		label: [],
		xAxis: {
			type: 'category',
			data: chart05Label,
			axisLine: {
				lineStyle: {
					color: '#9e9e9e'
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#666F7E',
					fontSize: 12,
					fontWeight: 500,
					lineHeight: 16,
				},
				interval: 0,
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {
			show: false,
			type: 'value',
			splitLine: { // y축 수치선
				show: false
			},
			axisLabel: {
				show: false,
			},

		},
		series: [{
			name: '주요고객 소비기간',
			type: 'bar',
			data: chart05Date,
			barWidth: '30%',
			itemStyle: {
				color: '#efb300',
				barBorderRadius: [4, 4, 0, 0],
			},
			label: {
				show: true,
				position: 'outside',
				align: 'center',
				color: '#efb300',
				formatter: '{c}',
				textPadding: '12',
				fontWeight: '600',
				borderRadius: '12',
				fontSize: '12',
				fontFamily: 'Pretendard',
				formatter: function (params) {
					var returnVal = echarts.format.addCommas(params.value);
					return returnVal;
				}
			},
		}, ]
	};

	function start_customer_chart05() {
		var show = option.yAxis.show;
		var left = option.legend.left;
		var labelSize = option.label.fontSize;
		var grid_l = option.grid.left;
		var grid_r = option.grid.right;
		var fontSize = option.xAxis.axisLabel.textStyle.fontSize;

		if (window.innerWidth >= 1380) {
			show = 'false';
			fontSize = '12';
			left = 'center';
		} else if (window.innerWidth <= 280) {
			fontSize = '9';
			grid_l = '4';
			grid_r = '4';
			labelSize = '10';
		} else if (window.innerWidth <= 360) {
			fontSize = '11';
			grid_l = '0';
			grid_r = '0';
			labelSize = '10';
		} else if (window.innerWidth < 1380) {
			fontSize = '12';
			show = 'false';
			left = 'center';
		}
		option.yAxis.show = show;
		option.xAxis.axisLabel.textStyle.fontSize = fontSize;
		option.label.fontSize = labelSize;
		option.grid.left = grid_l;
		option.grid.right = grid_r;
		option.legend.left = left;

		tab_chart5.setOption(option);
		tab_chart5.resize();
	}
	start_customer_chart05();


	const container3 = document.querySelector('#tab_chart3_custom');
	const chart3 = echarts.init(container3);
	new ResizeObserver(() => chart3.resize()).observe(container3);

	const container4 = document.querySelector('#tab_chart4_custom');
	const chart4 = echarts.init(container4);
	new ResizeObserver(() => chart4.resize()).observe(container4);

	const container5 = document.querySelector('#tab_chart5_custom');
	const chart5 = echarts.init(container5);
	new ResizeObserver(() => chart5.resize()).observe(container5);
}