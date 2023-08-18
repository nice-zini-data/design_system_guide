var strMegaCd;
var strAdmiCd;
var mapClickListener;
var mouseoverListener;
var mouseoutListener;
var markers = [];
var markersInfra = [];
var geomList = [];
var infoWindow = null;
let infoWindows = []; // 정보창을 담는 배열
var mapGubun = "normal";
var mapZoomSw = true;

var hitMapReponse;

var sisulInfoData;

$( document ).ready(function() {
	strCenterx = 127.6810808;
	strCentery = 35.728245;

	CENTER = new naver.maps.LatLng(strCentery, strCenterx);
	mapOptions = {
		center: new naver.maps.LatLng(strCentery, strCenterx),
		zoom: 8,
	};

	map = new naver.maps.Map('map', mapOptions);

	map.setOptions({ //모든 지도 컨트롤 숨기기
		scaleControl: false,
		logoControl: false,
		mapDataControl: false,
		zoomControl: false,
		mapTypeControl: false
	});

	naver.maps.Event.addListener(map, 'tilesloaded', function (e) {
		$("#map > div:nth-child(2)").css('display', 'none');
	});

	// 지도 드레그 종료
	dragendListener = naver.maps.Event.addListener(map, 'dragend', function (e){
		setTimeout(function (){
			if(!common.isEmpty(sisulInfoData)){
				sisulInfo(sisulInfoData, 'drage', 0);
			}
		}, 50);

		if(strAuthGubun == 1){

			var mapCenter = map.getCenter();
			strCenterx = mapCenter.lng();
			strCentery = mapCenter.lat();
			var data={
				centerx: strCenterx
				, centery: strCentery
				, zoomStatus : "admiCd"
			}
			// 현위치 주소 조회
			getCenterAddress(data);

		}
	});

	// 지도 줌 변화 감지
	naver.maps.Event.addListener(map, 'zoom_changed', function(zoom) {
		setTimeout(function (){
			if(!common.isEmpty(sisulInfoData)){
				sisulInfo(sisulInfoData);
			}
		}, 50);
	});

	// 일반지도
	$("#normal_map").on('click', function (){
		// 다시 조회하는 경우는 줌 안되도록 하기
		reload = false;
		reSearchSw = false;
		mapZoomSw = false;

		$(".flo_filter").addClass("dpl_n");
		$(".flo_box01").addClass("dpl_n");

		sisulInfoData = null;
		mapGubun = "normal";
		$("#hit_map").removeClass('sel');
		$(this).addClass('sel');

		if(common.isEmpty($(".selectTit.admi").children('span').attr('data-areacd'))){
			var param = {
				gubun : "admi"
				,areaCd : $(".selectTit.cty.top > span").attr('data-areacd')
				,gabeulGb : $(".selectTit.cty.top > span").attr('data-gabeulgb')
			}
			getElectionAreaAdmi(param);

		}else{
			var param = {
				xAxis : "0.0"
				, admiCd : $(".selectTit.admi").children('span').attr('data-areacd')
				, zoomStatus : 'admiCd'
				, gubun : "normal"
			}
			getAjax("getAdmiFeatures", "/analysis/admiFeatures", param, function (id, response, param) {
				setMapGeom(response, param);
			}, fn_error, "", true, true);
		}

		if(sessionStorage.getItem("menu") == "infra"){
			setTimeout(function (){
				getChartData();
			}, 1000);
		}

	});

	// 히트맵
	$("#hit_map").on('click', function (){
		// 다시 조회하는 경우는 줌 안되도록 하기
		reload = false;
		reSearchSw = false;
		mapZoomSw = false;

		if (common.isEmpty($(".selectTit.admi").children('span').attr('data-areacd'))) {
			alert('읍/면/동을 선택해 주세요.');
			$("#hit_map").removeClass('txt_n_sb').removeClass('sec_defaultBtn').removeClass('sel');
			$("#hit_map").addClass('txt_n_sb').addClass('checkNone');

			$("#normal_map").removeClass('txt_n_sb').removeClass('checkNone');
			$("#normal_map").addClass('txt_n_sb').addClass('sec_defaultBtn').addClass('sel');
			return;
		}
		sisulInfoData = null;
		mapGubun = "hit";
		$("#normal_map").removeClass('sel');
		$(this).addClass('sel');

		var param = {
			mapType: "hit"
			, yyyymmdd : $(".select_field_small.select.yyyymm > div > span").attr('data-yyyymmdd')
			, gender: $(".select_field_small.select.gender > div > span").attr('data-gender')
			, age: $(".select_field_small.select.age2 > div > span").attr('data-age')
			, yy5AglvIdS: $(".select_field_small.select.age > div > span").attr('data-yy5_aglv_id_s')
			, yy5AglvIdE: $(".select_field_small.select.age > div > span").attr('data-yy5_aglv_id_e')
			, dow: $(".select_field_small.select.dow > div > span").attr('data-dow')
			, sTmzn: $(".select_field_small.select.tmzn > div > span").attr('data-stmzn')
			, eTmzn: $(".select_field_small.select.tmzn > div > span").attr('data-etmzn')
		}
		param.areaCd = $(".selectTit.admi.top > span").attr('data-areacd');
		param.gubun = 'admi';
		param.menu = sessionStorage.getItem("menu");

		if(sessionStorage.getItem("menu") == "flowpop") {
			getAjax("getFlowpop50x50", "/flowpop/getFlowpop50x50", param, function (id, response, param) {
				setMapGeom(response, param);
			}, fn_error, "", true, true);
		}
		if(sessionStorage.getItem("menu") == "incom") {
			getAjax("getIncomStats","/incom/getIncomBlock", param, function (id,response,param){
				setMapGeom(response, param);
			}, fn_error, "", true, true);
		}
		if(sessionStorage.getItem("menu") == "loan") {
			getAjax("getLoanBlock","/incom/getLoanBlock", param, function (id,response,param){
				setMapGeom(response, param);
			}, fn_error, "", true, true);
		}
		$(".flo_filter").removeClass("dpl_n");
		$(".flo_box01").removeClass("dpl_n");
	});

	/*if (navigator.geolocation) { // GPS를 지원하면
		navigator.geolocation.getCurrentPosition(function(position) {
			strCenterx = position.coords.longitude;
			strCentery = position.coords.latitude;

			var data = {
				centerx : strCenterx
				, centery : strCentery
			}
			// 지도 이동
			mapMove(data);

		}, function(error) {
			console.error(error);
		}, {
			enableHighAccuracy: false,
			maximumAge: 0,
			timeout: Infinity
		});
	} else {
		alert('GPS를 지원하지 않습니다');
	}*/

	// addListener();
});

function removeListener(){
	naver.maps.Event.removeListener(mouseoverListener);
	naver.maps.Event.removeListener(mouseoutListener);
}


// 현위치 주소 조회
function getCenterAddress(data){
	data.xAxis = data.centerx;
	data.yAxis = data.centery;
	data.zoomStatus = "eatout";

	getAjax("getAreaNm", "/analysis/admiFeatures", data, function (id, response){
		if(!common.isEmpty(response.data)){
			strMegaCd = response.data[0].megaCd;
			strElectionArea = response.data[0].ctyCd;
			strAdmiCd = response.data[0].admiCd;
			strGabeulGb = response.data[0].gabeulGb;
			$("#reSearch > span").text(response.data[0].admiNm + " 조회");
			$("#reSearch").show();
		}
	}, fn_error,"POST", true);
}

function removeListener(){
	naver.maps.Event.removeListener(mapClickListener);
}

function mapMove(data){

	strCenterx = data.centerx;
	strCentery = data.centery;

	// 지도 이동
	var center = new naver.maps.Point(strCenterx, strCentery);
	map.setCenter(center);

	$(".search_at_txt").removeClass('active');
	if(strAuthGubun == 1){
		var mapCenter = map.getCenter();
		strCenterx = mapCenter.lng();
		strCentery = mapCenter.lat();
		var data={
			centerx: strCenterx
			, centery: strCentery
			, zoomStatus : "admiCd"
		}
		// 현위치 주소 조회
		getCenterAddress(data);
	}
}


function tabClick(){
	// 다시 조회하는 경우는 줌 안되도록 하기

	$(".flo_filter").addClass("dpl_n");
	$(".flo_box01").addClass("dpl_n");

	sisulInfoData = null;
	mapGubun = "normal";
	$("#hit_map").removeClass('sel').removeClass('txt_n_sb').removeClass('sec_defaultBtn').addClass('txt_n_sb').addClass('checkNone');
	$("#normal_map").addClass('sel').addClass('txt_n_sb').addClass('sec_defaultBtn').removeClass('checkNone');


	if(common.isEmpty($(".selectTit.admi").children('span').attr('data-areacd'))){
		var param = {
			gubun : "admi"
			,areaCd : $(".selectTit.cty.top > span").attr('data-areacd')
			,gabeulGb : $(".selectTit.cty.top > span").attr('data-gabeulgb')
		}
		getElectionAreaAdmi(param);

	}else{
		var param = {
			xAxis : "0.0"
			, admiCd : $(".selectTit.admi").children('span').attr('data-areacd')
			, zoomStatus : 'admiCd'
			, gubun : "normal"
		}
		getAjax("getAdmiFeatures", "/analysis/admiFeatures", param, function (id, response, param) {
			setMapGeom(response, param);
		}, fn_error, "", true, true);
	}

	if(sessionStorage.getItem("menu") == "infra"){
		setTimeout(function (){
			getChartData();
		}, 1000);
	}
}

function setMapGeom(response, param){
	if(common.isEmpty(response.data)){
		loadingBar(false);
		return;
	}
	if(param.mapType == "hit"){

		// 범례 flo_box01
		hitMapReponse = response;

		var box1 =[];
		var box2 =[];
		var box3 =[];
		var box4 =[];
		var box5 =[];
		if(param.menu == "flowpop"){
			$(".select_field_small.select.yyyymm > div > span").text(response.data[0].yyyymm.substr(0,4) + "." + response.data[0].yyyymm.substr(4,2));
			response.data.forEach(function (val,idx){
				if(val.cume == '1') box1.push(val.popCnt);
				if(val.cume == '2') box2.push(val.popCnt);
				if(val.cume == '3') box3.push(val.popCnt);
				if(val.cume == '4') box4.push(val.popCnt);
				if(val.cume == '5') box5.push(val.popCnt);
			});
		} else if(param.menu == "incom"){
			// $(".select_field_small.select.yyyymm > div > span").text(response.data[0].yyyymmdd.substr(0,4) + "." + response.data[0].yyyymmdd.substr(4,2));
			response.data.forEach(function (val,idx){
				if(val.cume == '1') box1.push(val.anuIncm);
				if(val.cume == '2') box2.push(val.anuIncm);
				if(val.cume == '3') box3.push(val.anuIncm);
				if(val.cume == '4') box4.push(val.anuIncm);
				if(val.cume == '5') box5.push(val.anuIncm);
			});
		} else if(param.menu == "loan"){
			response.data.forEach(function (val,idx){
				if(val.cume == '1') box1.push(val.loanAmt);
				if(val.cume == '2') box2.push(val.loanAmt);
				if(val.cume == '3') box3.push(val.loanAmt);
				if(val.cume == '4') box4.push(val.loanAmt);
				if(val.cume == '5') box5.push(val.loanAmt);
			});
		}

		if(common.isEmpty(box1)) box1 = [0];
		if(common.isEmpty(box2)) box2 = [0];
		if(common.isEmpty(box3)) box3 = [0];
		if(common.isEmpty(box4)) box4 = [0];
		if(common.isEmpty(box5)) box5 = [0];

		var tmp_text = (param.menu == "flowpop") ? "명" : "만원" ;
		var tmp_box = [
			{cume:1, gubun:"max", val:common.addComma(Math.max.apply(Math,box1)) + tmp_text}
			, {cume:1, gubun:"min", val:common.addComma(Math.min.apply(Math,box1)) + tmp_text}
			, {cume:2, gubun:"max", val:common.addComma(Math.min.apply(Math,box1)) + tmp_text}
			, {cume:2, gubun:"min", val:common.addComma(Math.min.apply(Math,box2)) + tmp_text}
			, {cume:3, gubun:"max", val:common.addComma(Math.min.apply(Math,box2)) + tmp_text}
			, {cume:3, gubun:"min", val:common.addComma(Math.min.apply(Math,box3)) + tmp_text}
			, {cume:4, gubun:"max", val:common.addComma(Math.min.apply(Math,box3)) + tmp_text}
			, {cume:4, gubun:"min", val:common.addComma(Math.min.apply(Math,box4)) + tmp_text}
			, {cume:5, gubun:"max", val:common.addComma(Math.min.apply(Math,box4)) + tmp_text}
			, {cume:5, gubun:"min", val:common.addComma(Math.min.apply(Math,box5)) + tmp_text}
		];

		var template = $('#tmp_flo_box01').html();
		var templateScript = Handlebars.compile(template);
		var context = tmp_box;
		var html = templateScript(context);
		$(".flo_box01").html(html);

		$(".flo_box01 > p").on('click', function (){

			//toggleClass
			$(this).toggleClass('check');

			var filtered = hitMapReponse.data;
			$(".flo_box01 > p").each(function (){
				if($(this).hasClass('check')){
					if(!common.isEmpty(filtered)){
						filtered = filtered.filter(o => Number(o.cume) !== $(this).data('cume'));
					}
				}
			});

			geomList.forEach(function (val, idx){
				map.data.removeGeoJson(val);
			});
			geomList = [];
			var result = getGeomJson("geomFeatures", "FeatureCollection", filtered);
			geomList.push(result);
			map.data.addGeoJson(result);

			var geom_color = [
				'#01144B'
				, '#003EAA'
				, '#5181FF'
				, '#6DC9FD'
				, '#89EDED'
				, '#CCCCCC'
			];

			map.data.setStyle(function(feature) {
				var strokeColor = "";
				var fillColor = "";
				(param.mapType == "hit") ? fillColor = geom_color[Number(feature.getProperty('cume')) -1] : "";
				(param.mapType != "hit") ? fillColor = geom_color[2] : "";
				var styleOptions = {
					fillOpacity: 0.8
					, strokeColor: "rgb(255,255,255)"
					, fillColor: fillColor
					, storkeWeight: 0.1
					, storkeOpacity: 0.1
				}
				return styleOptions;
			});
		});
	}
	var minxList = [];
	var maxxList = [];
	var minyList = [];
	var maxyList = [];
	if(common.isEmpty(response.data)){
		for(var i=0; i< markers.length; i++){
			markers[i].setMap(null);
		}
		markers = [];
		if(infoWindow != null) infoWindow.close();
		geomList.forEach(function (val, idx){
			map.data.removeGeoJson(val);
		});
		geomList = [];


		for(var i=0; i< markersInfra.length; i++){
			markersInfra[i].setMap(null);
		}
		markersInfra = [];

		for( var i=0 ; i<infoWindows.length; i++){
			infoWindow = infoWindows[i];
			infoWindow.close();
		}
		infoWindows = [];

		return;
	}

	response.data.forEach(function (val,idx){
		if(param.mapType != "hit"){
			minxList.push(val.minx);
			maxxList.push(val.maxx);
			minyList.push(val.miny);
			maxyList.push(val.maxy);
		}else{
			minxList.push(val.centerx);
			maxxList.push(val.centerx);
			minyList.push(val.centery);
			maxyList.push(val.centery);
		}
	});

	for(var i=0; i< markers.length; i++){
		markers[i].setMap(null);
	}
	markers = [];
	geomList.forEach(function (val, idx){
		map.data.removeGeoJson(val);
	});
	geomList = [];

	for(var i=0; i< markersInfra.length; i++){
		markersInfra[i].setMap(null);
	}
	markersInfra = [];

	for( var i=0 ; i<infoWindows.length; i++){
		infoWindow = infoWindows[i];
		infoWindow.close();
	}
	infoWindows = [];


	var result = getGeomJson("geomFeatures", "FeatureCollection", response.data);
	geomList.push(result);
	map.data.addGeoJson(result);

	var geom_color = [
		'#01144B'
		, '#003EAA'
		, '#5181FF'
		, '#6DC9FD'
		, '#89EDED'
		, '#CCCCCC'
	];

	map.data.setStyle(function(feature) {
		var strokeColor = "";
		var fillColor = "";
		(param.mapType == "hit") ? fillColor = geom_color[Number(feature.getProperty('cume')) -1] : "";
		(param.mapType != "hit") ? fillColor = geom_color[2] : "";
		var styleOptions = {
			fillOpacity: 0.6
			, strokeColor: "rgb(255,255,255)"
			, fillColor: fillColor
			, storkeWeight: 0.1
			, storkeOpacity: 0.1
		}
		return styleOptions;
	});

	// 현위치 조회, 일반지도 히트맵 선택시 줌 안되도록
	if(mapZoomSw){
		if(reload){
			var bounds = new naver.maps.LatLngBounds(
				new naver.maps.LatLng(Math.min.apply(Math,minyList), Math.min.apply(Math,minxList))
				, new naver.maps.LatLng(Math.max.apply(Math,maxyList), Math.max.apply(Math,maxxList))
			);
			// 줌이 안되는 현상이 있어 추가함
			setTimeout(function (){
				map.fitBounds(bounds);
			}, 100)
		}
	}

	reload = true;
	reSearchSw  = false;
	mapZoomSw = true;

	/*mouseoverListener = map.data.addListener('mouseover', function(e){
		for(var i=0; i< markers.length; i++){
			markers[i].setMap(null);
		}
		markers = [];

		marker = new naver.maps.Marker({
			map     : map,
			position: new naver.maps.LatLng(e.feature.getProperty('centery'), e.feature.getProperty('centerx')),
			icon    : {
				content : '<span id="marker" class="material-symbols-outlined font16 pri_5_col fill" style="display: none">location_on</span>',
				size    : new naver.maps.Size(24, 34),
				origin  : new naver.maps.Point(0, 0),
				anchor  : new naver.maps.Point(0,0),
			}
		});
		markers.push(marker);

		var text =""
		if(mapGubun == "normal"){
			text = e.feature.getProperty('areaNm')
		}else{
			if(sessionStorage.getItem("menu") == "flowpop") {
				text = common.addComma(e.feature.getProperty('popCnt'))
			}else if(sessionStorage.getItem("menu") == "incom") {
				text = common.addComma(e.feature.getProperty('anuIncm'))
			}else if(sessionStorage.getItem("menu") == "loan") {
				text = common.addComma(e.feature.getProperty('loanAmt'))
			}
		}
		var contentString = '<div class="map_mark">' +
							'   <p class="txt_n_sb">' +text+ '</p>' +
							'</div>'
		if(infoWindow != null){
			infoWindow.close();
			infoWindow = "";
		}
		infoWindow = new naver.maps.InfoWindow({
			content        : contentString,
			maxWidth       : 0,
			backgroundColor: "rgba(0,0,0,0)",
			borderColor    : "transparent",
			borderWidth    : 1,
			anchorSize     : new naver.maps.Size(0, 0),
			anchorSkew     : false,
			anchorColor    : "#94B58B",
			pixelOffset    : new naver.maps.Point(0, -8)
		});

		if (infoWindow != null) {
			infoWindow.open(map, marker);
		} else {
			infoWindow.close();
		}

		map.data.overrideStyle(e.feature,{
			fillOpacity : 0.8
		});
	});

	// 범위 마우스 아웃
	mouseoutListener = map.data.addListener('mouseout', function(e){
		for(var i=0; i< markers.length; i++){
			markers[i].setMap(null);
		}
		markers = [];
		infoWindow.close();

		map.data.overrideStyle(e.feature,{
			fillOpacity : 0.6
		});
	});*/
}

function searchAddress(data){
	mapMove(data);
}

function reSearch(){
	reSearchSw = true;
	mapZoomSw = false;
	$("#reSearch").hide();

	$(".select_listBox.mega.top > ul > li").each(function(){
		if($(this).data('areacd') == strMegaCd){
			$(this).click();
		}
	});
}

function searchAddressList(data){

	var address = $("#areaSearch").val();
	data.forEach(function(val,idx){
		if(val.address.indexOf(address) > -1){
			var tmp = val.address.substring(0,val.address.indexOf(address)) + '<span class="pri_5_col">'+ address + '</span>' +  val.address.substring(val.address.indexOf(address) + address.length);
			val.addressHtml = tmp;
		}else{
			val.addressHtml = val.address;
		}
	});

	var template = $('#tmp_search_at_txt').html();
	var templateScript = Handlebars.compile(template);
	var context = data;
	var html = templateScript(context);
	$(".search_at_txt").html(html);

	if(data.length > 0){
		$('.areaSearch .search_at_txt').addClass('active');
		$('.areaSearch .areaSearch_icon').addClass('search_on');
	}else{
		$('.areaSearch .search_at_txt').removeClass('active');
		$('.areaSearch .areaSearch_icon').removeClass('search_on');
	}
}

function searchAddressClick(data){
	// console.log(data);
}
