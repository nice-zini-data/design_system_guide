
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>

<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=jbzd2c9qh7&submodules=geocoder"></script>

<link href='/eatout/assets/fullcalendar/main.css' rel='stylesheet' />

<script src='/eatout/assets/fullcalendar/main.js'></script>
<script src='/eatout/assets/fullcalendar/locales-all.js'></script>
<script src='/eatout/assets/eatout/js/fullcalendar.js'></script>
<script src='/eatout/assets/fullcalendar/interaction/main.js'></script>

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>


<script>
	document.title = "Kingmaker";
</script>

<div class="wrap calendar">
	<%@ include file="/WEB-INF/views/eatout/include/side.jsp" %>
	<%@ include file="/WEB-INF/views/eatout/include/navbar.jsp" %>

	<div class="com_gridBox">
		<div class="com_gridInner">
			<h1 class="hd1 comTit subTit"><span class="mem_nm"></span>님의 선거캘린더</h1>
			<div class="d_dayList login_done cal_topBox">
			</div>

			<section class="cal_popupOpen0531">
				<p class="comSTit hd3">다가오는 선거운동 일정</p>
				<div class="cal_box01_flex">
				</div>
			</section>

			<section class="calendar_box">
				<div class="card_box_g">
					<div id="calendar"></div>

				</div>
			</section>
		</div>
	</div>

</div>

<!--일정 추가-->
<div class="cal_popup">
	<div class="cal_popupCont">
		<div class="cal_pop_topBox">
			<p class="hd4" id="cal_pop_topBox_title">일정추가</p>
			<div class="inf_center">
				<button type="submit" class="txt_s_sb mono_g7_col del_btn" style="display: none">
					<img src="/eatout/assets/eatout/images/icon/delete_gr.svg" alt="일정삭제 아이콘" />
					일정 삭제
				</button>
				<div class="cal_pop_closeBtn">
					<img src="/eatout/assets/eatout/images/icon/close_line_b.svg" alt="닫기 아이콘" />
				</div>
			</div>
		</div>
		<div class="cal_popupInner">
			<div class="cal_pop_txtBox">
				<input type="text" placeholder="일정 제목 입력" class="cal_popupTit"/>
				<ul class="cal_pop_txtUl">
					<li>
						<div class="cal_pop_iconBox">
							<img src="/eatout/assets/eatout/images/icon/date_range_g.svg" alt="날짜 아이콘"/>
							<p class="txt_l">날짜</p>
						</div>
						<div class="cal_pop_right_box0518">
							<div class="cal_pop_txtSbox">
								<div class="datepkBox">
									<input type="text" class="txt_l mono_g7_col" id="daterangepicker"/>
								</div>
							</div>
							<div class="cal_pop_txtSbox end_arrow" style="display:none;">
								<div class="datepkBox">
									<input type="text" class="txt_l mono_g7_col" id="daterangepicker_end"/>
								</div>
							</div>
							<div class="date_tm_ch date_rd_box inf_center">
								<div class="date_end end_check">
									<span class=""></span>
								</div>
								<p class="txt_n_sb">종료일 포함</p>
							</div>
						</div>
					</li>
					<%--<li>
						<div class="cal_pop_iconBox">
							<img src="/eatout/assets/eatout/images/icon/arrow_drop_down_circle_g.svg" alt="타겟선거 아이콘"/>
							<p class="txt_l">타겟선거</p>
						</div>
						<div class="cal_pop_txtSbox">
							<p class="txt_l mono_g7_col eatout_target">국회의원</p>
						</div>
					</li>--%>
					<li>
						<div class="cal_pop_iconBox">
							<img src="/eatout/assets/eatout/images/icon/sticky_note_g.svg" alt="상세내용 아이콘"/>
							<p class="txt_l">상세내용</p>
						</div>
						<div class="cal_pop_txtSbox w100_0531">
							<input type="text" class="cal_popTxtInput txt_l" placeholder="상세 내용을 입력해 주세요" />
						</div>
					</li>
					<li>
						<div class="cal_pop_iconBox">
							<img src="/eatout/assets/eatout/images/icon/bookmark_border_1.svg" alt="일정색상 아이콘"/>
							<p class="txt_l">일정색상</p>
						</div>
						<div class="cal_pop_txtSbox inf_center cal_color_box">
							<div class="cal_col01" data-fontcolor="#005EE7" data-color="#F3F7FF"></div>
							<div class="cal_col02" data-fontcolor="#007186" data-color="#EDF8FB"></div>
							<div class="cal_col03" data-fontcolor="#136D42" data-color="#EDF9F3"></div>
							<div class="cal_col04" data-fontcolor="#2C187B" data-color="#F8F6FF"></div>
							<div class="cal_col05" data-fontcolor="#986400" data-color="#FFFFEC"></div>
							<div class="cal_col06" data-fontcolor="#C53D0B" data-color="#FFF3EC"></div>
							<div class="cal_col07" data-fontcolor="#CA1697" data-color="#FFF3FC"></div>
							<div class="cal_col08" data-fontcolor="#0C5496" data-color="#EFF5FB"></div>
							<div class="cal_col09" data-fontcolor="#525252" data-color="#F6F6F6"></div>
							<div class="cal_col10" data-fontcolor="#73482F" data-color="#F6EEE9"></div>
						</div>
					</li>
				</ul>
			</div>
			<div class="cal_h_0518">
				<div class="cal_pop_mapBox">
				<div class="cal_pop_leftBox">
					<p class="txt_l_sb">선거운동 지역선택</p>
					<div class="cal_plusBox " id="dragBox">
					</div>
					<button type="submit" class="cal_pop_plusBoxBtn txt_s_m mono_g7_col" ><img src="/eatout/assets/eatout/images/icon/add_circle_gr.svg" alt="선택지역 추가 아이콘">추가하기</button>
				</div>
				<div class="cal_pop_mapInner">
					<input type="text" class="cal_popMapInput hd4" placeholder="선택지역" />
					<button type="submit" class="fourthiary cal_pop_update">
						지역 선택
					</button>
					<div class="cal_pop_map">
						<div class="subMap_imgBox">
							<div class="map_section mapZoom" id="map" style="width: 100%">
							</div>
						</div>

						<div class="cal_pop_selBox">
							<div class="mapChangeTab">
								<button type="submit" class="sec_defaultBtn txt_n_sb sel" id="normal_map"><span>일반지도</span></button>
								<button type="submit" class="txt_n_sb checkNone" id="hit_map"><span>히트맵</span></button>
							</div>
							<div class="cal_pop_sel_flex">
								<div class="select_field_small select">
									<div class="selectTit mega top">
										<span class="txt_n_m">시/도</span>
									</div>
									<div class="select_listBox mega top">
										<ul>
											<li class="txt_n_sb">서울시</li>
										</ul>
									</div>
								</div>

								<div class="select_field_small select">
									<div class="selectTit cty top">
										<span class="txt_n_m">시/군/구(선거구)</span>
									</div>
									<div class="select_listBox cty top">
									</div>
								</div>

								<div class="select_field_small select">
									<div class="selectTit admi top">
										<span class="txt_n_m">읍/면/동</span>
									</div>
									<div class="select_listBox admi top">
									</div>
								</div>
							</div>
							<div class="cal_pop_search areaSearch">
								<img src="/eatout/assets/eatout/images/icon/search.svg" alt="검색 아이콘"/>
							</div>
							<div class="cal_pop_search_box">
								<input type="text" class="txt_n_m" id="areaSearch" placeholder="검색어를 입력하세요" />
								<div class="cal_pop_searchCloseBtn">
									<img src="/eatout/assets/eatout/images/icon/close_line_b.svg" alt="닫기 아이콘">
								</div>
							</div>
							<div class="search_at_txt">
								<ul>
									<li>경기 <span class="pri_5_col">광명</span>시
										<br>
										<span>경기 광명시 </span>
									</li>
									<li>경기 <span class="pri_5_col">광명</span>시
										<br>
										<span>경기 광명시 </span>
									</li>
									<li>경기 <span class="pri_5_col">광명</span>시
										<br>
										<span>경기 광명시 </span>
									</li>
									<li>경기 <span class="pri_5_col">광명</span>시
										<br>
										<span>경기 광명시 </span>
									</li>
									<li>경기 <span class="pri_5_col">광명</span>시
										<br>
										<span>경기 광명시 </span>
									</li>
								</ul>
							</div>
						</div>
						<div class="cal_pop_txtBtn" style="display: none">
							<p class="txt_n_m marker_address"></p>

						</div>
						<div class="cal_pop_selBox02" style="display: none;">
							<div class="cal_pop_sel_flex">
								<div class="select_field_small select yyyymm">
									<div class="selectTit disabled">
										<span class="txt_s_m"></span>
									</div>
								</div>
								<div class="select_field_small select_tab">
									<p class="txt_s_sb select_tab01 active"><span></span>성 · 연령 기준</p>
									<p class="txt_s_sb select_tab02"><span></span>요일 · 시간 기준</p>
								</div>
								<div class="select_field_small select gender">
									<div class="selectTit">
										<span class="txt_s_m" data-gender="">성별전체</span>
									</div>
									<div class="select_listBox">
										<ul>
											<li class="txt_s_sb" data-gender="">성별전체</li>
											<li class="txt_s_sb" data-gender="MALE">남</li>
											<li class="txt_s_sb" data-gender="FEMALE">여</li>
										</ul>
									</div>
								</div>
								<div class="select_field_small select age">
									<div class="selectTit">
										<span class="txt_s_m" data-yy5_aglv_id_s="" data-yy5_aglv_id_e="">연령전체</span>
									</div>
									<div class="select_listBox">
										<ul>
											<li class="txt_s_sb" data-yy5_aglv_id_s="" data-yy5_aglv_id_e="">연령전체</li>
											<li class="txt_s_sb" data-yy5_aglv_id_s="1" data-yy5_aglv_id_e="1">10대 미만</li>
											<li class="txt_s_sb" data-yy5_aglv_id_s="2" data-yy5_aglv_id_e="3">10대</li>
											<li class="txt_s_sb" data-yy5_aglv_id_s="4" data-yy5_aglv_id_e="5">20대</li>
											<li class="txt_s_sb" data-yy5_aglv_id_s="6" data-yy5_aglv_id_e="7">30대</li>
											<li class="txt_s_sb" data-yy5_aglv_id_s="8" data-yy5_aglv_id_e="9">40대</li>
											<li class="txt_s_sb" data-yy5_aglv_id_s="10" data-yy5_aglv_id_e="11">50대</li>
											<li class="txt_s_sb" data-yy5_aglv_id_s="12" data-yy5_aglv_id_e="13">60대</li>
											<li class="txt_s_sb" data-yy5_aglv_id_s="14" data-yy5_aglv_id_e="14">70대 이상</li>
										</ul>
									</div>
								</div>
								<div class="select_field_small select dow dpl_n">
									<div class="selectTit">
										<span class="txt_s_m" data-dow="">요일전체</span>
									</div>
									<div class="select_listBox">
										<ul>
											<li class="txt_s_sb" data-dow="">요일전체</li>
											<li class="txt_s_sb" data-dow="월">월</li>
											<li class="txt_s_sb" data-dow="화">화</li>
											<li class="txt_s_sb" data-dow="수">수</li>
											<li class="txt_s_sb" data-dow="목">목</li>
											<li class="txt_s_sb" data-dow="금">금</li>
											<li class="txt_s_sb" data-dow="토">토</li>
											<li class="txt_s_sb" data-dow="일">일</li>
										</ul>
									</div>
								</div>
								<div class="select_field_small select tmzn dpl_n">
									<div class="selectTit">
										<span class="txt_s_m" data-stmzn="" data-etmzn="">시간대전체</span>
									</div>
									<div class="select_listBox">
										<ul>
											<li class="txt_s_sb" data-stmzn="" data-etmzn="">시간대전체</li>
											<li class="txt_s_sb" data-stmzn="1" data-etmzn="6">01~06시</li>
											<li class="txt_s_sb" data-stmzn="7" data-etmzn="9">07~09시</li>
											<li class="txt_s_sb" data-stmzn="10" data-etmzn="12">10~12시</li>
											<li class="txt_s_sb" data-stmzn="13" data-etmzn="15">13~15시</li>
											<li class="txt_s_sb" data-stmzn="16" data-etmzn="18">16~18시</li>
											<li class="txt_s_sb" data-stmzn="19" data-etmzn="21">19~21시</li>
											<li class="txt_s_sb" data-stmzn="22" data-etmzn="24">22~24시</li>
										</ul>
									</div>
								</div>
							</div>
							<button class="pri_defaultBtn txt_s_sb map_filter">
								<span>필터 적용</span>
							</button>
						</div>
						<div class="cal_pop_dot dpl_n">
							<div class="flo_box01">
							</div>
						</div>
					</div>

					<!--일반지도-->
					<div class="cal_pop_guBox mb120">
						<p class="txt_l_m">
							<span class="pri_5_col">히트맵</span> 버튼을 클릭하여<br/>
							선택 지역의 성/연령별 인구 분포와 순위를 확인하세요.
						</p>
					</div>

					<!--히트맵-->
					<div class="cal_popChartBox">
						<div class="flex">
							<div class="card_box_g mr10">
								<div class="cal_popCtTit flex">
									<p class="txt_l_sb">선택지역 인구수 비례</p>
									<span class="txt_s_m mono_g7_col">[단위:명]</span>
								</div>
								<div id="flowpup_chart02" class="cal_chart01Box"></div>
							</div>
							<div class="card_box_g">
								<div class="cal_popCtTit">
									<p class="txt_l_sb">선택지역 인구수 순위</p>
								</div>
								<div class="flowpop_rank">

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
			<div class="cal_pop_fix_btm">
				<div class="cal_pop_fixBtn">
					<button class="pri_defaultBtn label_sb wh_btn cal_pop_closeBtn">
						<span>취소</span>
					</button>
					<button class="pri_defaultBtn label_sb set_schedule">
						<span>일정 저장</span>
					</button>
				</div>
			</div>
		</div>
	</div>

</div>

<script src='/eatout/assets/eatout/js/chart/fullcalendar_chart.js'></script>

<!--공통 footer-->
<%@ include file="/WEB-INF/views/eatout/include/footer.jsp" %>

<script type="text/javascript">

	var strScheduleAreaCd ="";
	var strScheduleGabeulGb ="";

	var strScheduleCenterx;
	var strScheduleCentery;

	var strScheduleCenterXMax;
	var strScheduleCenterYMax;
	var strScheduleCenterXMin;
	var strScheduleCenterYMin;
	var scheduleMarkers = [];
	var strScheduleAreaId;
	var strStartDt = "";
	var strEndDt = "";
	var strTimeSw = "0";

	var reload = true;
	$(function() {

		if(!common.isEmpty(sessionStorage.getItem("scheduleId"))){
			strScheduleId = sessionStorage.getItem("scheduleId");
			var param = {
				id : sessionStorage.getItem("scheduleId")
			}
			getAjax("getScheduleAreaList" , "/schedule/getScheduleAreaList", param, fn_cal_popup, fn_error);
			$('.cal_popup').addClass('active');
			sessionStorage.setItem("scheduleId", '');
		}

		$(".date_end").on('click', function (){
			$(this).toggleClass('active');
			if($(this).hasClass("active")){
				$("#daterangepicker_end").parent().parent().show();
			}else{
				$("#daterangepicker_end").parent().parent().hide();
			}
			$("#daterangepicker_end").val($("#daterangepicker").val());
		});

		$(".select_tab01").on('click', function (){
			$(this).addClass('active');
			$(".select_tab02").removeClass('active');
			$(".select.gender").removeClass("dpl_n");
			$(".select.age").removeClass("dpl_n");
			$(".select.dow").addClass("dpl_n");
			$(".select.tmzn").addClass("dpl_n");
			$(".select_field_small.select.dow > .selectTit > span").attr('data-dow','');
			$(".select_field_small.select.tmzn > .selectTit > span").attr('data-stmzn','').attr('data-etmzn','');
			$(".select_field_small.select.dow > .selectTit > span").text('요일전체');
			$(".select_field_small.select.tmzn > .selectTit > span").text('시간대전체');
		});

		$(".select_tab02").on('click', function (){
			$(this).addClass('active');
			$(".select_tab01").removeClass('active');
			$(".select.dow").removeClass("dpl_n");
			$(".select.tmzn").removeClass("dpl_n");
			$(".select.gender").addClass("dpl_n");
			$(".select.age").addClass("dpl_n");
			$(".select_field_small.select.gender > .selectTit > span").attr('data-gender','');
			$(".select_field_small.select.age > .selectTit > span").attr('data-yy5_aglv_id_s','').attr('data-yy5_aglv_id_e','');
			$(".select_field_small.select.gender > .selectTit > span").text('성별전체');
			$(".select_field_small.select.age > .selectTit > span").text('연령대전체');
		});

		$(".select_listBox > ul > li").on('click', function (){
			$(this).parent().parent().parent().children('.selectTit').children('span').text($(this).text());

			if($(this).parent().parent().parent().hasClass("gender")){
				$(this).parent().parent().parent().children('.selectTit').children('span').attr('data-gender',($(this).data('gender')));
			}else if($(this).parent().parent().parent().hasClass("age")){
				$(this).parent().parent().parent().children('.selectTit').children('span').attr('data-yy5_aglv_id_s',($(this).data('yy5_aglv_id_s')));
				$(this).parent().parent().parent().children('.selectTit').children('span').attr('data-yy5_aglv_id_e',($(this).data('yy5_aglv_id_e')));
			}else if($(this).parent().parent().parent().hasClass("dow")){
				$(this).parent().parent().parent().children('.selectTit').children('span').attr('data-dow',($(this).data('dow')));
			}else if($(this).parent().parent().parent().hasClass("tmzn")){
				$(this).parent().parent().parent().children('.selectTit').children('span').attr('data-stmzn',($(this).data('stmzn')));
				$(this).parent().parent().parent().children('.selectTit').children('span').attr('data-etmzn',($(this).data('etmzn')));
			}

			if($(this).parent().parent().parent().hasClass("gender") || $(this).parent().parent().parent().hasClass("age")){
				$(".select_field_small.select.dow > .selectTit > span").attr('data-dow','');
				$(".select_field_small.select.tmzn > .selectTit > span").attr('data-stmzn','').attr('data-etmzn','');
				$(".select_field_small.select.dow > .selectTit > span").text('요일전체');
				$(".select_field_small.select.tmzn > .selectTit > span").text('시간대전체');
			}else if($(this).parent().parent().parent().hasClass("dow") || $(this).parent().parent().parent().hasClass("tmzn")){
				$(".select_field_small.select.gender > .selectTit > span").attr('data-gender','');
				$(".select_field_small.select.age > .selectTit > span").attr('data-yy5_aglv_id_s','').attr('data-yy5_aglv_id_e','');
				$(".select_field_small.select.gender > .selectTit > span").text('성별전체');
				$(".select_field_small.select.age > .selectTit > span").text('연령대전체');
			}
		});

		$(".map_filter").on('click', function (){
			$("#hit_map").click();
		});


		CENTER = new naver.maps.LatLng(35.728245, 127.6810808);
		mapOptions = {
			center: new naver.maps.LatLng(35.728245, 127.6810808),
			zoom: 16,
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
			$("#map > div:nth-child(5)").css('display', 'none');
		});

		if(common.isEmpty(sessionStorage.getItem("token"))){
			// 로그아웃 처리
			logout();
		}else{
			loginCheck();
		}

		// 선거일 d-day
		getAjax("geteatoutDday", "/main/geteatoutDday", {}, function (id, response, param){
			var tmp_html = "";
			response.data.forEach(function (val, idx){
				tmp_html += '<li>';
				tmp_html +=  ' <p class="hd4">' + val.eatoutGubun + '</p>';
				if(idx == 0){
					tmp_html +=  ' <span class="dDay label_m active">D-' + common.addComma(val.eatoutDday)+'</span>';
				}else{
					tmp_html +=  ' <span class="dDay label_m">D-' + common.addComma(val.eatoutDday)+'</span>';
				}
				tmp_html +=  '</li>';
			});
			tmp_html += '<button class="pri_defaultBtn txt_n_sb print_btn cal_print">';
			tmp_html += '<img src="/eatout/assets/eatout/images/icon/print_wh.svg" alt="프린트 아이콘"/>';
			tmp_html += '<span>인쇄하기</span>';
			tmp_html += '</button>';
			$(".d_dayList").html('<ul>' + tmp_html + '</ul>')

		}, fn_error);

		//다가오는 선거운동 일정, 캘린더
		scheduleList();
	});
	function login(){

	}

	function scheduleList(){
		var year = calendar.currentData.currentDate.getFullYear();
		var month = ('0' + (calendar.currentData.currentDate.getMonth() + 1)).slice(-2);
		var startDt = year + '-' + month  + '-01';

		var param = {
			startDt : startDt
			, endDt : startDt
		}
		getAjax("getScheduleList", "/schedule/getScheduleList", param, function (id, response, param) {
			var comming = [];
			response.data.comming.forEach(function (val, idx){
				val.isEmpty = "N";
				comming.push(val);
			});
			if(comming.length < 3){
				for(var i = comming.length ; i<3; i++){
					comming.push({isEmpty:"Y"});
				}
			}
			var template = $('#tmp_cal_box01_flex').html();
			var templateScript = Handlebars.compile(template);
			var context = comming;
			var html = templateScript(context);
			$(".cal_box01_flex").html(html);

			$(".comming_schedule").on('click', function (){
				if(!common.isEmpty($(this).data().id)){
					strScheduleId = $(this).data().id;
					var param = {
						id : $(this).data().id
					}
					getAjax("getScheduleAreaList" , "/schedule/getScheduleAreaList", param, fn_cal_popup, fn_error);
					$('.cal_popup').addClass('active');
				}else{
					strScheduleId = 0;
					strClickDate = common.toDay().replace(/-/gi,".");

					var param = {
						id : strScheduleId
					}
					getAjax("getScheduleAreaList" , "/schedule/getScheduleAreaList", param, fn_cal_popup, fn_error);
					$('.cal_popup').addClass('active');
				}
				$('body').addClass('fix');
			})

			var list = [];
			response.data.list.forEach(function (val, idx){
				var obj = {
					  id : val.id
					, title : val.title
					, start : val.startDt.substr(0,10)
					, end : val.endDt.substr(0,10)
					, color: val.color
					, textColor:val.fontColor
					, description : val.description
					, dDay : val.dDay
					, eatoutTarget : val.eatoutTarget
				}
				list.push(obj);
			});
			list.startDt = param.startDt;
			setSchedule(list);

			// 메인또는 알림에서 넘어왔을 경우 달력 이동
			if(!common.isEmpty(sessionStorage.getItem("scheduleDate"))){
				calendar.gotoDate(sessionStorage.getItem("scheduleDate"));
				sessionStorage.setItem("scheduleDate", "")
			}

			// 알림
			getAjax("getMemNotice", "/common/getMemNotice", {}, fn_notice, fn_error);
		}, fn_error);
	}

	function fn_cal_popup(id, response, param){
		reload = true;
		CENTER = new naver.maps.LatLng(35.728245, 127.6810808);
		mapOptions = {
			center: new naver.maps.LatLng(35.728245, 127.6810808),
			zoom: 16,
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
			$("#map > div:nth-child(5)").css('display', 'none');
		});

		// 지도 클릭
		naver.maps.Event.addListener(map, 'click', function (e){
			searchCoordinateToAddress(e.coord);
		});

		$(".date_end").removeClass('active');
		$(".radio_rdBtn.date_tm").removeClass('active');
		//$('.calendar-time').addClass('dpl_ib');
		$('.calendar-time').removeClass('dpl_ib');
		$('.cal_pop_right_box0518 .cal_pop_txtSbox').removeClass('on_wh');
		$('.daterangepicker').removeClass('time_on');
		$("#daterangepicker_end").parent().parent().hide();
		$(".del_btn").hide();

		if(response.code!="C999") {
			$(".del_btn").show();
			$('.cal_popupTit').val(common.replaceHtml(response.data[0].title));
			$('#daterangepicker').val();
			// $('.eatout_target').text(response.data[0].eatoutTargetNm);
			$('.cal_popTxtInput').val(common.replaceHtml(response.data[0].description));
			$('#cal_pop_topBox_title').text("일정수정");

			// 스캐쥴 색깔
			$(".cal_color_box > div").each(function (){
				$(this).removeClass('active');
				if($(this).data('fontcolor') == response.data[0].fontColor){
					$(this).addClass('active');
				}
			});

			if(response.data[0].areaId != 0){
				var template = $('#tmp_dragBox').html();
				var templateScript = Handlebars.compile(template);
				var context = response.data;
				var html = templateScript(context);
				$('#dragBox').html(html);
				$(".plusBox").off('click');
				$(".plusBox").on('click', function (){
					$(".plusBox").removeClass('active');
					$(this).addClass('active');

					strScheduleAreaId = $(this).data('areaid') + "";
					strScheduleCenterx = $(this).data('centerx') + "";
					strScheduleCentery = $(this).data('centery') + "";

					$(".cal_popMapInput").val($(this).attr('data-areatitle'));
					$(".marker_address").text($(this).attr('data-areanm'));
					$(".marker_address").parent().show();
					removeMarkers();
					var data = {
						centerx : strScheduleCenterx
						, centery : strScheduleCentery
					}
					mapMove(data);
				});
			}else{
				var template = $('#tmp_dragBox').html();
				var templateScript = Handlebars.compile(template);
				var context = {};
				var html = templateScript(context);
				$('#dragBox').html(html);
			}

			strScheduleCenterXMax = response.data[0].centerXMax;
			strScheduleCenterYMax = response.data[0].centerYMax;
			strScheduleCenterXMin = response.data[0].centerXMin;
			strScheduleCenterYMin = response.data[0].centerYMin;
			// 선거 운동 지역 마커 찍기
			for(var i=0; i< scheduleMarkers.length; i++){
				scheduleMarkers[i].setMap(null);
			}
			scheduleMarkers = [];
			response.data.forEach(function (val, idx){
				var areaId = common.lpad(val.areaId, 2, '0');

				var scheduleMarker = new naver.maps.Marker({
					map     : map,
					position: new naver.maps.LatLng(val.centerY, val.centerX),
					icon    : {
						content : '<img class="schedule_marker marker_'+areaId+'" src="/eatout/assets/eatout/images/icon/ico_location_' + areaId + '.svg" alt="마커"/>',
						size    : new naver.maps.Size(24, 34),
						origin  : new naver.maps.Point(0, 0),
						anchor  : new naver.maps.Point(20,30),
					}
				});
				scheduleMarkers.push(scheduleMarker);
			});

			if(response.data.length > 0){
				$(".plusBox").eq(0).click();
			}

			strTimeSw = response.data[0].timeSw;
			if(response.data[0].timeSw == "1"){
				$('#daterangepicker').val(response.data[0].startDt.substr(0,16).replace(/-/gi,"."));
				$('#daterangepicker_end').val(response.data[0].endDt.substr(0,16).replace(/-/gi,"."));
			}else{
				$('#daterangepicker').val(response.data[0].startDt.substr(0,10).replace(/-/gi,"."));
				$('#daterangepicker_end').val(response.data[0].endDt.substr(0,10).replace(/-/gi,"."));
			}

			if(response.data[0].endSw == "1"){
				$(".date_end").addClass('active');
				$("#daterangepicker_end").parent().parent().show();
			}
			if(response.data[0].timeSw == "1"){
				$(".radio_rdBtn.date_tm").addClass('active');
				$('.calendar-time').addClass('dpl_ib');
				$('.cal_pop_right_box0518 .cal_pop_txtSbox').addClass('on_wh');
				$('.daterangepicker').addClass('time_on');

				strStartDt = response.data[0].startDt;
				strEndDt = response.data[0].endDt;
			}
		}else{
			$('.cal_popupTit').val('');
			$('#daterangepicker').val(strClickDate);
			$('#daterangepicker_end').val(strClickDate);

			var streatoutGubunNm = "";
			if(streatoutGubunCd == "0") streatoutGubunNm = '대통령 선거';
			if(streatoutGubunCd == "1") streatoutGubunNm = '국회의원 선거';
			if(streatoutGubunCd == "2") streatoutGubunNm = '지방 선거';
			// $('.eatout_target').text(streatoutGubunNm);
			$('.cal_popTxtInput').val('');
			$('#cal_pop_topBox_title').text("일정추가");

			var template = $('#tmp_dragBox').html();
			var templateScript = Handlebars.compile(template);
			var context = {};
			var html = templateScript(context);
			$('#dragBox').html(html);

			$(".cal_col01").click();
		}
		geteatoutArea("mega");

		// 일반지도
		$("#normal_map").off('click');
		$("#normal_map").on('click', function (){
			$(".flo_filter").addClass("dpl_n");
			$(".flo_box01").addClass("dpl_n");
			$(".cal_pop_selBox02").hide();

			$("#hit_map").removeClass('sel');
			$(this).addClass('sel');

			for(var i=0; i< markers.length; i++){
				markers[i].setMap(null);
			}
			markers = [];
			geomList.forEach(function (val, idx){
				map.data.removeGeoJson(val);
			});
			geomList = [];

		});

		// 히트맵
		$("#hit_map").off('click');
		$("#hit_map").on('click', function (){

			$('.cal_pop_dot').addClass('dpl_n');

			if (common.isEmpty($(".selectTit.admi").children('span').attr('data-areacd'))) {
				alert('읍/면/동을 선택해 주세요.');
				$("#hit_map").removeClass('txt_n_sb').removeClass('sec_defaultBtn').removeClass('sel');
				$("#hit_map").addClass('txt_n_sb').addClass('checkNone');

				$("#normal_map").removeClass('txt_n_sb').removeClass('checkNone');
				$("#normal_map").addClass('txt_n_sb').addClass('sec_defaultBtn').addClass('sel');
				return;
			}
			mapGubun = "hit";
			$("#normal_map").removeClass('sel');
			$(this).addClass('sel');

			var param = {
				mapType: "hit"
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
			param.menu = "flowpop";
			$(".cal_pop_selBox02").show();
			$(".flo_filter").removeClass("dpl_n");
			$(".flo_box01").removeClass("dpl_n");
			getAjax("getFlowpop50x50", "/flowpop/getFlowpop50x50", param, function (id, response, param) {
				setMapGeom(response, param);
			}, fn_error, "", true, true);

			var gubun = "";
			var areaCd = "";
			var gabeulGb = "";
			if(!common.isEmpty($(".selectTit.admi.top > span").attr("data-areacd"))){
				areaCd = $(".selectTit.admi.top > span").attr("data-areacd");
				gubun = "admi";
			}else if(!common.isEmpty($(".selectTit.cty.top > span").attr("data-areacd"))){
				areaCd = $(".selectTit.cty.top > span").attr("data-areacd");
				gabeulGb = $(".selectTit.cty.top > span").attr("data-gabeulgb");
				gubun = "cty";
			}else if(!common.isEmpty($(".selectTit.mega.top > span").attr("data-areacd"))) {
				areaCd = $(".selectTit.mega.top > span").attr("data-areacd");
				gubun = "mega";
			}
			var param = {
				gubun : gubun
				, areaCd : areaCd
				, gabeulGb : gabeulGb
			}
			getAjax("getSchedulePopcnt", "/schedule/getSchedulePopcnt", param, fn_getSchedulePopcnt, fn_error);
		});

		$(".del_btn").off('click');
		$(".del_btn").on('click', function(){
			if(confirm("일정을 삭제하시겠습니까?")){
				var param = {
					id : strScheduleId
					, gubun : "D"
				}
				getAjax("setSchedule", "/schedule/setSchedule", param, function (){
					alert("일정 삭제 완료");
					$('.cal_pop_closeBtn').click();
					scheduleList();
				}, fn_error);
			}
		});

		setTimeout(function (){
			if($(".plusBox").length < 1){
				$('.cal_pop_plusBoxBtn, .cal_pop_plusIcon').click();
			}
		}, 100);
	}
	function fn_getSchedulePopcnt(id, response, param){

		var areaNm = "";
		if(!common.isEmpty($(".selectTit.admi.top > span").attr("data-areacd"))){
			areaNm = $(".selectTit.admi.top > span").text();
		}else if(!common.isEmpty($(".selectTit.cty.top > span").attr("data-areacd"))){
			areaNm = $(".selectTit.cty.top > span").text();
		}else if(!common.isEmpty($(".selectTit.mega.top > span").attr("data-areacd"))) {
			areaNm = $(".selectTit.mega.top > span").text();
		}
		response.data.areaNm = areaNm;


		var totalPopCnt = 0;

		response.data.forEach(function(val,idx){
			totalPopCnt += Number(val.popCnt);
		});

		// 선택지역 주거인구 성 연령대별 구성
		var data = [];
		response.data.forEach(function(val,idx){
			val.per = ((Number(val.popCnt) / totalPopCnt) * 100).toFixed(1);
			data.push(val);
		});

		data.sort(function(a, b) {
			return b.per - a.per;
		});
		data = data.slice(0, 5);

		data.forEach(function (val, idx){
			val.idx = idx + 1;
		});

		$(".cal_pop_guBox").hide();
		var template = $('#tmp_chart02_listBox_stpp').html();
		var templateScript = Handlebars.compile(template);
		var context = data;
		var html = templateScript(context);
		$(".flowpop_rank").html(html);

		flowpopChart(response);
		$(".cal_popChartBox").show();
	}


	// 시/군/구(선거구) 지역현황 비교 지역 가져오기
	function geteatoutArea(gubun) {
		var param = {
			gubun: gubun
		};

		getAjax("geteatoutArea", "/main/geteatoutArea", param, function (id, response, param) {
			response.data.gubun = param.gubun;
			var template = $('#tmp_areaList').html();
			var templateScript = Handlebars.compile(template);
			var context = response.data;
			var html = templateScript(context);
			$(".select_listBox.mega.top").html(html);

			$(".select_listBox.mega.top > ul > li").on('click', function (){
				$(".selectTit.mega").children('span').text($(this).text());
				$(".selectTit.mega").children('span').attr('data-areacd', $(this).data('areacd'));
				$(".selectTit.mega").removeClass("active");
				$(this).parents('.select_listBox').slideUp(500);

				// 지도 이동
				var center = new naver.maps.Point($(this).data('centerx'), $(this).data('centery'));
				map.setCenter(center);
				map.setZoom(9);

				var param = {
					gubun : "cty"
					,areaCd : $(this).data('areacd')
				}
				geteatoutAreaCty(param);

			});

			// 마스터 권한자가 아니면 무조건 신청 지역만 되도록
			if(strAuthGubun == "0"){
				$(".selectTit.mega.top").addClass("disabled");
			}
			$(".select_listBox.mega.top > ul > li").each(function (){
				if(streatoutArea.substr(3,2) == $(this).data("areacd")){
					$(this).click();
				}
			});

		}, fn_error);
	}


	function geteatoutAreaCty(param){
		loadingBar(true);

		$(".selectTit.cty").children('span').text("시/군/구(선거구)");
		$(".selectTit.cty").children('span').attr('data-areacd', '');
		$(".selectTit.cty").children('span').attr('data-gabeulgb', '');
		$(".selectTit.admi").children('span').text("읍/면/동");
		$(".selectTit.admi").children('span').attr('data-areacd', '');
		$(".selectTit.admi").children('span').attr('data-gabeulgb', '');

		getAjax("geteatoutArea", "/main/geteatoutArea", param, function (id, response, param) {
			response.data.gubun = 'cty';
			var template = $('#tmp_areaList').html();
			var templateScript = Handlebars.compile(template);
			var context = response.data;
			var html = templateScript(context);
			$(".select_listBox.cty.top").html(html);

			var template = $('#tmp_areaList').html();
			var templateScript = Handlebars.compile(template);
			var context = {};
			var html = templateScript(context);
			$(".select_listBox.admi.top").html(html);

			loadingBar(false);
			$(".select_listBox.cty.top > ul > li").on('click', function (){
				$("#onlyBody").css("display","block");
				$('.com_chImg').removeClass('active');
				$(".selectTit.cty").children('span').text($(this).text());
				$(".selectTit.cty").children('span').attr('data-areacd', $(this).data('areacd'));
				$(".selectTit.cty").children('span').attr('data-gabeulgb', $(this).data('gabeulgb'));
				$(".selectTit.cty").removeClass("active");
				$(this).parents('.select_listBox').slideUp(500);

				// 지도 이동
				var center = new naver.maps.Point($(this).data('centerx'), $(this).data('centery'));
				map.setCenter(center);
				map.setZoom(14);

				var param = {
					gubun : "admi"
					,areaCd : $(this).data('areacd')
					,gabeulGb : $(this).data('gabeulgb')
				}
				geteatoutAreaAdmi(param);

			});

			// 마스터 권한자가 아니면 무조건 신청 지역만 되도록
			if(strAuthGubun == "0"){
				$(".selectTit.cty.top").addClass("disabled");
				$(".select_listBox.cty.top > ul > li").each(function (){
					if(streatoutArea.substr(3) == $(this).data("areacd").substr(3) && strGabeulGb == $(this).data("gabeulgb")){
						$(this).click();
					}
				});
			}else{
				if(reload){
					$(".select_listBox.cty.top > ul > li").each(function (){
						if(streatoutArea.substr(3) == $(this).data("areacd").substr(3) && strGabeulGb == $(this).data("gabeulgb")){
							$(this).click();
						}
					});
					reload = false;
				}
			}

		}, fn_error);
	}

	function geteatoutAreaAdmi(param){

		$(".selectTit.admi").children('span').text("읍/면/동");
		$(".selectTit.admi").children('span').attr('data-areacd', '');
		$(".selectTit.admi").children('span').attr('data-gabeulgb', '');

		getAjax("geteatoutArea", "/main/geteatoutArea", param, function (id, response, param) {
			response.data.gubun = param.gubun;
			var template = $('#tmp_areaList').html();
			var templateScript = Handlebars.compile(template);
			var context = response.data;
			var html = templateScript(context);
			$(".select_listBox.admi.top").html(html);

			$(".select_listBox.admi.top > ul > li").on('click', function (){
				$(".selectTit.admi").children('span').text($(this).text());
				$(".selectTit.admi").children('span').attr('data-areacd', $(this).data('areacd'));
				$(".selectTit.admi").removeClass("active");
				$(this).parents('.select_listBox').slideUp(500);

				var center = new naver.maps.Point($(this).data('centerx'), $(this).data('centery'));
				map.setCenter(center);
				map.setZoom(14);

				// 히트맵
				if(!$("#normal_map").hasClass('sel')) {
					if(common.isEmpty($(".selectTit.admi").children('span').attr('data-areacd'))){
						alert('읍/면/동을 선택해 주세요.');
						return;
					}
					var param = {
						mapType : "hit"
						, gender : $(".select_field_small.select.gender > div > span").attr('data-gender')
						, age: $(".select_field_small.select.age2 > div > span").attr('data-age')
						, yy5AglvIdS : $(".select_field_small.select.age > div > span").attr('data-yy5_aglv_id_s')
						, yy5AglvIdE : $(".select_field_small.select.age > div > span").attr('data-yy5_aglv_id_e')
						, dow : $(".select_field_small.select.dow > div > span").attr('data-dow')
						, sTmzn : $(".select_field_small.select.tmzn > div > span").attr('data-stmzn')
						, eTmzn : $(".select_field_small.select.tmzn > div > span").attr('data-etmzn')
					}
					param.areaCd = $(".selectTit.admi.top > span").attr('data-areacd')
					param.gubun = 'admi'
					getAjax("getFlowpop50x50", "/flowpop/getFlowpop50x50", param, function (id, response, param) {
						setMapGeom(response, param);
					}, fn_error, "", true, true);
				}

			});
			$(".select_listBox.admi.top > ul > li").each(function (){
				if(streatoutArea == $(this).data("areacd")){
					$(this).click();
				}
			});
		}, fn_error);
	}

</script>


<script type="text/x-handlebars-template" id="tmp_cal_box01_flex">
	{{#each this}}
		{{#ifCond isEmpty '==' 'N'}}
			<div class="card_box_g comming_schedule" data-id="{{id}}">
				<div class="flex">
					<div class="cal_txtBox">
						<div class="loanList_icon {{#ifCond @key '==' 0}}pri_5{{/ifCond}}  {{#ifCond @key '==' 1}}sec_5{{/ifCond}}  {{#ifCond @key '==' 2}}red_bg_cal{{/ifCond}}  ">
							<img src="/eatout/assets/eatout/images/icon/date_range_wh.svg" alt="일정 아이콘"/>
						</div>
						<p class="txt_l_m">{{startDt}}</p>
					</div>
					<div class="cal_plusBtn">
						<a class="cal_box01_plus" href="javascript:;"><img src="/eatout/assets/eatout/images/icon/add.svg" alt="일정 아이콘"/></a>
					</div>
				</div>
				<span class="txt_s_m  real_bg_fir ">
					D-{{dDay}}
					<%--{{#ifCond dDay '<' 1}}
					 {{dDayTime}}
					{{/ifCond}}--%>
				</span>
				<p class="hd4">{{replaceHtml title}}</p>
				<div class="cal_stxt_line">
					<p class="txt_n mono_g7_col">{{eatoutTargetNm}}</p>
					<p class="txt_n mono_g7_col">{{description}}</p>
				</div>
			</div>
		{{else}}
			<div class="card_box_g d_none comming_schedule"  data-id="">
				<div class="flex">
					<div class="cal_txtBox">
						<div class="loanList_icon mono_g3">
							<img src="/eatout/assets/eatout/images/icon/date_range_wh.svg" alt="일정 아이콘"/>
						</div>
						<p class="txt_l_m mono_g7_col">일정없음</p>
					</div>
					<div class="cal_plusBtn">
						<a class="cal_box01_plus" href="javascript:;"><img src="/eatout/assets/eatout/images/icon/add.svg" alt="일정 아이콘"/></a>
					</div>
				</div>
				<p class="hd4">일정추가</p>
				<div class="cal_stxt_line">
					<p class="txt_n mono_g7_col">다가오는 선거운동 일정을 추가해 주세요</p>
				</div>
			</div>
		{{/ifCond}}
	{{/each}}
</script>


<script type="text/x-handlebars-template" id="tmp_areaList">
	<ul>
		{{#ifCond gubun '==' 'mega'}}
		<li class="txt_n_sb" data-areaCd="">시/도</li>
		{{else}}
		{{#ifCond gubun '==' 'cty'}}
		<li class="txt_n_sb" data-areaCd="" data-gabeulGb="">시/군/구(선거구)</li>
		{{else}}
		<li class="txt_n_sb" data-areaCd="">읍/면/동</li>
		{{/ifCond}}
		{{/ifCond}}
		{{#each this}}
		<li class="txt_n_sb" data-centerx={{centerx}} data-centery={{centery}} data-areaCd="{{areaCd}}" data-gabeulGb="{{gabeulGb}}">{{areaNm}} {{#ifCond gubun '==' 'cty'}} {{gabeulGbNm}} {{/ifCond}}</li>
		{{/each}}
	</ul>
</script>


<script type="text/x-handlebars-template" id="tmp_dragBox">
	{{#each this}}
	<div class="plusBox {{#ifCond areaId '==' '1'}}active{{/ifCond}}"
		 data-centerx="{{centerX}}" data-centery="{{centerY}}"
		 data-areaid="{{areaId}}" data-areacd="{{areaCd}}"
		 data-gabeulgb="{{gabeulGb}}" data-areanm="{{replaceHtml areaNm}}"
		 data-areatitle="{{replaceHtml areaTitle}}"
	>
		<div class="cal_plus_close">
			<img src="/eatout/assets/eatout/images/icon/close_gy.svg" alt="닫기 아이콘"/>
		</div>
		<p class="label_sb ch_ar areaTitle">{{replaceHtml areaTitle}}</p>
		<p class="txt_s_m mono_g7_col areaNm">{{replaceHtml areaNm}}</p>
	</div>
	{{/each}}
	<%--<div class="plusBox">
		<div class="cal_plus_close">
			<img src="/eatout/assets/eatout/images/icon/close_gy.svg" alt="닫기 아이콘"/>
		</div>
		<p class="txt_s_m mono_g7_col">지역<span class="num">2</span></p>
		<p class="label_sb ch_ar">선택지역<span class="num">2</span></p>
	</div>--%>
</script>


<script type="text/x-handlebars-template" id="tmp_flo_box01">
	<p class="txt_n_m" data-cume="{{this.1.cume}}"><span class="color_dt chart_color_01"></span>{{this.1.val}} 이상</p>
	<p class="txt_n_m" data-cume="{{this.2.cume}}"><span class="color_dt chart_color_02"></span>{{this.3.val}} ~ {{this.2.val}}</p>
	<p class="txt_n_m" data-cume="{{this.4.cume}}"><span class="color_dt chart_color_03"></span>{{this.5.val}} ~ {{this.4.val}}</p>
	<p class="txt_n_m" data-cume="{{this.6.cume}}"><span class="color_dt chart_color_04"></span>{{this.7.val}} ~ {{this.6.val}}</p>
	<p class="txt_n_m" data-cume="{{this.8.cume}}" style="margin-bottom: 0px;"><span class="color_dt chart_color_05"></span>{{this.8.val}} 이하</p>
</script>


<script type="text/x-handlebars-template" id="tmp_search_at_txt">
	<ul>
		{{#each this}}
		<li data-centerx="{{x}}" data-centery="{{y}}" data-address="{{address}}" onclick="mapMove($(this).data());">
			{{{addressHtml}}}
			<br/>
			<span>{{subAddress}}</span>
		</li>
		{{/each}}
	</ul>
</script>


<script type="text/x-handlebars-template" id="tmp_chart02_listBox_stpp">
	<ul>
		{{#each this}}
		<li class="flp_chart02_list">
			<span class="num txt_n_m mono_g7_col mr20">{{idx}}위</span>
			<div class="flp_listTxt">
                <span>
                    {{#ifCond sexDivsCd '==' 'MALE'}}
                    <img src="/eatout/assets/eatout/images/icon/ico_people_pri.svg" alt="남자 아이콘">
                    {{else}}
                    <img src="/eatout/assets/eatout/images/icon/ico_people_sec.svg" alt="여자 아이콘">
                    {{/ifCond}}
                </span>
				<p class="chip_txt_s_m">
					{{#ifCond sexDivsCd '==' 'MALE'}}
					{{ageNm}} 남
					{{else}}
					{{ageNm}} 여
					{{/ifCond}}
				</p>
			</div>
			<span class="txt_n_m mono_g7_col tar">{{per}}%</span>
		</li>
		{{/each}}
	</ul>
</script>