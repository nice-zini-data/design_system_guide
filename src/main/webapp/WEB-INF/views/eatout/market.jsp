
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>

<script>
	document.title = "외식통계조회 시스템";
</script>

<%@ include file="/WEB-INF/views/eatout/include/navbar.jsp" %>
<link rel="stylesheet" href="/eatout/assets/eatout/css/swiper-bundle.min.css"/>
<script type="text/javascript" src="/eatout/assets/eatout/js/swiper-bundle.min.js"></script>
<script>
	$(function(){
		var param = {};
		getAjax("getMainInfo", "/agile/main/getMainInfo",param, fn_mainInfo, fn_error,null,null,true);
		$('.navList li:nth-child(2)').addClass('active');
		$('.navList li:nth-child(2) img').attr({src:'/eatout/assets/eatout/images/icon/tab02_icon_on.svg'})
	});

	// 메인화면 최초 데이터 세팅
	function fn_mainInfo(id, response, param){
		var year = response.data[0].yyyymm.substring(0,4);
		var month = response.data[0].yyyymm.substring(4,6);
		$('#minYyyymm').text(year+'.'+month);
		$('#maxYyyymm').text(year+'.'+month);
		$('#setDateInfo2').text('전국기준 / '+year+'.'+month+'월 기준');
		$('#setDateInfo3').text(''+year+'.'+month+'월 기준');
		//(전국기준 / 2024.01 기준)
		$('#calcDateType').text('전월')
	}
</script>

<div class="container com_gridInner market">
<%--	<%@ include file="/WEB-INF/views/eatout/include/side.jsp" %>--%>
	<div class="row">
		<div class="col-8 left_box">
			<div class="left_slide">
				<div class="col">
					<div class="col-3 flex_0228 mb10"><!--slide_titleText-->
						<p class="com_titleT mb0 ">
							<img src="/eatout/assets/eatout/images/icon/icon_title_001.svg" alt=""/>
							업종별 경기 변동
						</p>
						<div class="setDate_txt0227 flex_0228">
							<p id="setDateInfo2"></p>
							<p class="data_text0228 mr_50">데이터 출처 : 신용카드사</p>
						</div>
					</div>
				</div>
				<div class="slideBox">
					<div id="upjongList" class="swiper mySwiper">
					</div>
				</div>
			</div>
			<div id="tableList" style="display:block;">
				<div>
					<div class="row">
						<div class="col-3 flex_0228 mb20">
							<p class="com_titleT mb0">
								<img src="/eatout/assets/eatout/images/icon/icon_title_004.svg" alt=""/>
								지역별 외식업 경기
							</p>
							<div class="setDate_txt0227 flex_0228">
								<p id="setDateInfo3"></p>
							</div>
						</div>
						<div class="col-9">
							<div class="row flex">
								<div id="typeChk" class="col-3 flex radioWrap">
									<input type="radio" class="btn-check btn-sm" name="typeChk" id="typeChk1" value="sales"/>
									<label class="btn btn-outline-primary" for="typeChk1"><span class="tc_change01"><img src="/eatout/assets/eatout/images/icon/icon_coin_mt.svg" alt=""/>매출</span></label>
									<input type="radio" class="btn-check btn-sm" name="typeChk" id="typeChk2"  value="store"/>
									<label class="btn btn-outline-primary" for="typeChk2"><span class="tc_change02"><img src="/eatout/assets/eatout/images/icon/icon_store_mono.svg" alt=""/>점포 수</span></label>
								</div>

								<div id="orderChk" class="col-2 flex radioWrap">
									<input type="radio" class="btn-check btn-sm" name="orderChk" id="orderChk1" value="desc"/>
									<label class="btn btn-outline-primary" for="orderChk1"><span class="orderChk1">증가</span></label>
									<input type="radio" class="btn-check btn-sm" name="orderChk" id="orderChk2" value="asc"/>
									<label class="btn btn-outline-primary" for="orderChk2"><span class="orderChk2">감소</span></label>
								</div>

								<div id="dateChk" class="col-6 flex radioWrap">
									<input type="radio" class="btn-check" name="dateChk" id="dateChk1" value="1"/>
									<label class="btn btn-outline-primary" for="dateChk1"><span>1개월</span></label>
									<input type="radio" class="btn-check" name="dateChk" id="dateChk2" value="3"/>
									<label class="btn btn-outline-primary" for="dateChk2"><span>3개월</span></label>
									<input type="radio" class="btn-check" name="dateChk" id="dateChk3" value="6"/>
									<label class="btn btn-outline-primary" for="dateChk3"><span>6개월</span></label>
									<input type="radio" class="btn-check" name="dateChk" id="dateChk4" value="12"/>
									<label class="btn btn-outline-primary" for="dateChk4"><span>1년</span></label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="mk_list01_box">
					<div id="admiUpjongInfo">
					</div>
				</div>
			</div>
			<div id="chartList">
				<div class="row">
					<div class="col-12">
						<p id="chartTitle">업종명</p>
					</div>
					<div class="popupBtn">

						<div class="popup_close"><img src="/eatout/assets/eatout/images/icon/close.svg" alt=""/></div>
					</div>
					<div class="popupInner">
						<div class="popupBox">
							<div class="col-6">
								<p class="popupChart_tit">
									<img src="/eatout/assets/eatout/images/icon/s_dish.svg" alt=""/>
									외식 총매출</p>
								<span class="popup_sTxt">[단위 : 억 원/월]</span>
								<div id="market_chart01" class="popupChart"></div>
							</div>
							<div class="col-6">
								<p class="popupChart_tit">
									<img src="/eatout/assets/eatout/images/icon/s_delivery_bike.svg" alt=""/>
									배달 총매출</p>
								<span class="popup_sTxt">[단위 : 억 원/월]</span>
								<div id="market_chart02" class="popupChart"></div>
							</div>
						</div>
						<div class="popupBox">
							<div class="col-6">
								<p class="popupChart_tit">
									<img src="/eatout/assets/eatout/images/icon/s_mart.svg" alt=""/>
									점포 수</p>
								<span class="popup_sTxt">[단위 : 개소]</span>
								<div id="market_chart03" class="popupChart"></div>
							</div>
							<div class="col-6">
								<p class="popupChart_tit">
									<img src="/eatout/assets/eatout/images/icon/s_coin.svg" alt=""/>
									점포당 매출액</p>
								<span class="popup_sTxt">[단위 : 만 원/월]</span>
								<div id="market_chart04" class="popupChart"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-4 right_box">

			<div class="rightInner">
				<div class="mk_right_tit">
					<div class="row flex">
						<div class="col-2">
							<p class="com_titleT">
								<img src="/eatout/assets/eatout/images/icon/icon_title_002.svg" alt=""/>
								업종별 경기<br>변동 상승률
							</p>
						</div>
						<div class="col-10 font12Radio">
							<div class="row">
								<div id="dateChk_2" class="col-4 flex radioWrap">
									<input type="radio" class="btn-check" name="dateChk_2" id="dateChk1_2" value="1"/>
									<label class="btn btn-outline-primary" for="dateChk1_2"><span>1개월</span></label>
									<input type="radio" class="btn-check" name="dateChk_2" id="dateChk2_2" value="3"/>
									<label class="btn btn-outline-primary" for="dateChk2_2"><span>3개월</span></label>
									<input type="radio" class="btn-check" name="dateChk_2" id="dateChk3_2" value="6"/>
									<label class="btn btn-outline-primary" for="dateChk3_2"><span>6개월</span></label>
									<input type="radio" class="btn-check" name="dateChk_2" id="dateChk4_2" value="12"/>
									<label class="btn btn-outline-primary" for="dateChk4_2"><span>1년</span></label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="upjongGrowth">
				</div>
			</div>

			<div class="rightInner rt_bottomBox">
				<p class="com_titleT">
					<img src="/eatout/assets/eatout/images/icon/icon_title_003.svg" alt=""/>
					외식상권 분석 보고서
				</p>
				<div class="col-12 center">
					<table class="board_tb">
						<!--<thead>
						<tr>
							<th>NO</th>
							<th>파일명</th>
							<th>정보</th>
							<th>등록일자</th>
						</tr>
						</thead>-->
						<tbody id="tfileList">

						</tbody>
					</table>
				</div>
				<div class="col-12">
					<div id="paginate_filelist"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="bk_bg"></div>
</div>

<script type="text/javascript" src="/eatout/assets/eatout/js/chart/statistics.js"></script>

<script type="text/javascript">

	var pagingInfo = {
		totalCnt : 0,
		pageNo : 1,
		pageCnt : 5
	};

	var fileInfo = {};

	$(function() {
		var param ={};
		param.admGb = '1';
		param.dateType = '1';
		getAjax("getTotUpjongInfo", "/agile/market/getTotUpjongInfo",param, fn_upjongInfo, fn_error,null,null,true);

		param ={};
		param.outeatType = 'sales';
		param.outeatDateType = '1';
		param.outeatOrderType = 'desc';
		getAjax("getAdmiUpjongInfo", "/agile/market/getAdmiUpjongInfo",param, fn_admiUpjongInfo, fn_error,null,null,true);
		$('#typeChk1').prop('checked',true);
		$('#dateChk1').prop('checked',true);
		$('#orderChk1').prop('checked',true);
		$('#dateChk1_2').prop('checked',true);



		$('.tc_change01').click(function(){
			$('.tc_change01 img').attr({src:'/eatout/assets/eatout/images/icon/icon_coin_mt.svg'})
			$('.tc_change02 img').attr({src:'/eatout/assets/eatout/images/icon/icon_store_mono.svg'})
		});

		$('.tc_change02').click(function(){
			$('.tc_change01 img').attr({src:'/eatout/assets/eatout/images/icon/icon_coin_g.svg'})
			$('.tc_change02 img').attr({src:'/eatout/assets/eatout/images/icon/icon_store_mt.svg'})
		});

		//지역별 외식업 이벤트
		$('input[name="typeChk"]').change(function(){
			console.log('click typechk : '+$(this).val());

			if($(this).val() == 'sales'){
				param.outeatType = 'sales';
			}else{
				param.outeatType = 'store';
			}

			// $('input[name="typeChk"]').find('input:checked').val();
			$('input[name="dateChk"]').each(function (index) {
				if($(this).is(":checked")==true){
					console.log($(this).val());
					param.outeatDateType = $(this).val();
				}
			})

			$('input[name="orderChk"]').each(function (index) {
				if($(this).is(":checked")==true){
					console.log($(this).val());
					param.outeatOrderType = $(this).val();
				}
			})
			getAjax("getAdmiUpjongInfo", "/agile/market/getAdmiUpjongInfo",param, fn_admiUpjongInfo, fn_error,null,null,true);

		});
		$('input[name="dateChk"]').change(function(){
			console.log('click dateChk : '+$(this).val());
			param.outeatDateType = $(this).val();
			// $('input[name="typeChk"]').find('input:checked').val();
			$('input[name="typeChk"]').each(function (index) {
				if($(this).is(":checked")==true){
					console.log($(this).val());
					param.outeatType = $(this).val();
				}
			})
			$('input[name="orderChk"]').each(function (index) {
				if($(this).is(":checked")==true){
					console.log($(this).val());
					param.outeatOrderType = $(this).val();
				}
			})
			getAjax("getAdmiUpjongInfo", "/agile/market/getAdmiUpjongInfo",param, fn_admiUpjongInfo, fn_error,null,null,true);
		});
		$('input[name="orderChk"]').change(function(){
			console.log('click dateChk : '+$(this).val());
			param.outeatOrderType = $(this).val();
			// $('input[name="typeChk"]').find('input:checked').val();
			$('input[name="dateChk"]').each(function (index) {
				if($(this).is(":checked")==true){
					console.log($(this).val());
					param.outeatDateType = $(this).val();
				}
			})
			$('input[name="typeChk"]').each(function (index) {
				if($(this).is(":checked")==true){
					console.log($(this).val());
					param.outeatType = $(this).val();
				}
			})
			getAjax("getAdmiUpjongInfo", "/agile/market/getAdmiUpjongInfo",param, fn_admiUpjongInfo, fn_error,null,null,true);



		});

		param ={};
		param.outeatDateType = '1';
		getAjax("getUpjongGrowth", "/agile/market/getUpjongGrowth",param, fn_upjongGrowth, fn_error,null,null,true);

		$('input[name="dateChk_2"]').change(function(){
			console.log('click dateChk : '+$(this).val());
			param.outeatDateType = $(this).val();
			getAjax("getUpjongGrowth", "/agile/market/getUpjongGrowth",param, fn_upjongGrowth, fn_error,null,null,true);
		});
		list();

	});

	// 전지역 업종 증감률 리스트
	function fn_upjongInfo(id, response, param){

		var upjongInfoResp = response.data;

		// console.log(eatoutDiffResponse);
		var template = $('#tmp_upjongList').html();
		var templateScript = Handlebars.compile(template);
		var context = upjongInfoResp;
		var html = templateScript(context);
		$('#upjongList').html(html);

		//슬라이드
		var swiper = new Swiper(".mySwiper", {
			slidesPerView: 4,
			grid: {
				rows: 2,
			},
			spaceBetween: 24,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
			},
		});

		// $(".ed1").find('.label_m').text($(".selectTit.cty.cty1 > span").text());
		// $(".ed2").find('.label_m').text($(".selectTit.cty.cty2 > span").text());
	}
	// 전지역 업종 증감률 리스트
	function fn_admiUpjongInfo(id, response, param){
		console.log(response);
		var admiUpjongInfoResp = {};
		var tmpUpjongInfoArr = [];
		var tmpAdmiArr = [];
		// var tmpAdmi = [];
		var tmpAdmiCd = '';
		var tmpAdmiNm = '';

		$.each(response.data,function(key,value){
			var tmpVal = {};
			if(key == 0) tmpAdmiCd = value.megaCd;
			if(key == 0) tmpAdmiNm = value.megaNm;
			if(tmpAdmiCd != value.megaCd){
				tmpUpjongInfoArr.push(tmpAdmiArr);
				admiUpjongInfoResp.tmpAdmi = tmpUpjongInfoArr;
				admiUpjongInfoResp.tmpAdmi.tmpAdmiNm = tmpAdmiNm;
				tmpAdmiCd = value.megaCd;
				tmpAdmiNm = value.megaNm;
				tmpAdmiArr = [];
				tmpAdmiArr.push(value)
			}else{
				tmpAdmiArr.push(value)
			}

		});
		console.log(admiUpjongInfoResp);
		// console.log(eatoutDiffResponse);
		var template = $('#tmp_admiUpjongInfo').html();
		var templateScript = Handlebars.compile(template);
		var context = admiUpjongInfoResp;
		var html = templateScript(context);
		$('#admiUpjongInfo').html(html);

	}


	// 전지역 업종 증감률 리스트
	function fn_upjongGrowth(id, response, param){

		var upjongGrowthResp = response.data;

		// console.log(eatoutDiffResponse);
		var template = $('#tmp_upjongGrowth').html();
		var templateScript = Handlebars.compile(template);
		var context = upjongGrowthResp;
		var html = templateScript(context);
		$('#upjongGrowth').html(html);
	}
	//
	function makeChart(upjongCd,upjongNm){
		var param ={};

		//화면 전환
		//$('#chartList').css('display','block');
		//$('#tableList').css('display','none');
		$('#chartTitle').text(upjongNm);

		param.upjong3Cd = upjongCd;
		getAjax("getUpjongDetail", "/agile/market/getUpjongDetail",param, fn_UpjongDetail, fn_error,null,null,true);

		$('#chartList').addClass('active');
		$('.bk_bg').addClass('active');

		$('#chartList .popup_close').click(function(){
			$('#chartList').removeClass('active');
			$('.bk_bg').removeClass('active');
		});





	}

	function list() {
		if (pagingInfo.pageNo < 1) {
			return;
		}
		if (Math.ceil(pagingInfo.totalCnt / pagingInfo.pageCnt) != 0
				&& Math.ceil(pagingInfo.totalCnt / pagingInfo.pageCnt) < pagingInfo.pageNo) {
			return;
		}
		var data = {
			pageNo : (((pagingInfo.pageNo == 0) ? 1 : pagingInfo.pageNo - 1) * pagingInfo.pageCnt),
			pageCnt : pagingInfo.pageCnt
		};

		if (!common.isEmpty($('#searchText').val())) {
			data.searchText = $('#searchText').val();
		}
		// data.cjCode = strCjCode;

		// console.log(data);
		getAjax("getFileList", "/getFileList", data, fn_list,fn_error,null,null,true);

	}

	function fn_list(id, response, param) {
		var template = $('#tmp_tfileList').html();
		var templateScript = Handlebars.compile(template);
		var context = response.data;
		var html = templateScript(context);
		$('#tfileList').html(html);

		$('#tfileList tr').click(function(){
			$('#tfileList tr').removeClass('active');
			$(this).addClass('active');
		});

		if (!common.isEmpty(response.data)) {
			pagingInfo.totalCnt = response.data[0].totalCnt;
			util.renderPagingNavigation('paginate_filelist', pagingInfo);
			pagingInfo.pageNo = 1;
		} else {
			pagingInfo.totalCnt = 0;
		}
		(pagingInfo.totalCnt < 1) ? $("#paginate_filelist").hide() : $("#paginate_filelist").show();



	}

	function handlebarsPaging(targetId, pagingInfo) {
		pagingInfo = pagingInfo;
		list();
	}
	function fileDownload(filePath,fileName){
		var param = {};
		console.log(fileName);
		param.filePath = filePath;
		param.fileName = fileName;
		param.orgFileNm = fileName;
		// getAjax("fileDownLoad", "/common/fileDownLoad", param, fn_fileDownload,fn_error);
		common.fileDownload("/common/fileDownLoad",param)
	}

</script>



<script type="text/x-handlebars-template" id="tmp_upjongList">
	<div class="row swiper-wrapper">
		{{#each this}}
		<div class="col-4 border border-4 swiper-slide" onclick="makeChart('{{upjong3Cd}}','{{upjong3Nm}}')">
			<div class="slideTit">
				{{upjong3Nm}}
			</div>
			<div>
				<div class="slide_txt01">전월대비</div>
				<div class="slide_flex {{checkUpDown salePer}}"> <!--slide_flex 위치에 클래스 추가 부탁드립니다. 상승 : up / 하락 : down-->
					<div class="slide_txt02">{{addComma calcSaleAmt}}원</div>
					<div class="slide_txt03">{{salePer}} %</div>
				</div>
			</div>
		</div>
		{{/each}}

	</div>
	<div class="swiper-button-next"></div>
	<div class="swiper-button-prev"></div>
	<div class="swiper-pagination"></div>
</script>

<script type="text/x-handlebars-template" id="tmp_admiUpjongInfo">
	<div class="row">
	{{#each this.tmpAdmi}}
		<div class="col-4 border border-4">
			<!--증감률 td에 클래스 추가 부탁드립니다. 상승 : up / 하락 : down-->
			<table class="cpTable">
				<thead>
				<tr>
					<th colspan="3">{{this.[0].megaNm}}</th>
				</tr>
				<tr>
					<th>순위</th>
					<th>업종</th>
					<th>증감률</th>
				</tr>
				</thead>
				<tbody>
				{{#each this}}
				<tr>
					<td>{{rnk}}</td>
					<td>{{upjong3Nm}}</td>
					<td class="{{checkUpDown calcPer}}"><span>{{calcPer}} %</span></td>
				</tr>
				{{/each}}
				</tbody>
			</table>
		</div>
	{{/each}}
	</div>
</script>


<script type="text/x-handlebars-template" id="tmp_upjongGrowth">
	<table class="cpTable">
		<%--<thead>
		<tr>
			<th>순위</th>
			<th>업종</th>
			<th>증감률</th>
		</tr>
		</thead>--%>
		<tbody>
		{{#each this}}
		<tr>
			<td style="width:5%;">{{rnk}}</td>
			<td style="width:40%;"><button onclick="makeChart('{{upjong3Cd}}','{{upjong3Nm}}')">{{upjong3Nm}}</button></td>
			<td style="width:20%;" class="{{checkUpDown salePer}}"><span>{{salePer}} %</span></td>
			<td style="width:25%;"><span>{{addComma calcSaleAmt}} 천만원</span></td>
		</tr>
		{{/each}}
		</tbody>
	</table>
</script>

<script type="text/x-handlebars_template" id="tmp_tfileList">
	<!--리스트 최대 갯수 5개 부탁드립니다.-->
	{{#each this}}
	<tr>
		<td><img src="/eatout/assets/eatout/images/icon/pdf.svg" alt=""/><!--{{fileNo}}--></td>
		<td><span class="icon_show "><a onclick="fileDownload('{{filePath}}','{{fileNm}}','{{fileOriNm}}')">{{fileOriNm}}</a></span></td>
		<!--td>{{fileInfo}}</td-->
		<td><p>{{regDate}}</p></td>
	</tr>
	{{/each}}
</script>