
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>

<script>
	document.title = "Kingmaker";
</script>

<div class="wrap admin">
	<%@ include file="/WEB-INF/views/eatout/include/side.jsp" %>
	<%@ include file="/WEB-INF/views/eatout/include/navbar.jsp" %>

	<div class="com_gridBox">
		<div class="com_gridInner">
			<h1 class="hd1 comTit subTit">관리자페이지</h1>

			<div class="admin_topBox" style="display: none">
				<div class="ad_txt01">
					<p style="width: 230px;">관심 선거 설정</p>
					<div class="select_field_small select" style="display: none;">
						<div class="flex admin_selectBox">
							<p class="txt_n">선거명</p>
							<div class="selectTit eatout_gubun">
								<span class="txt_n_m"></span>
							</div>
							<div class="select_listBox eatout_gubun">
								<ul>
									<li class="txt_n_sb" data-eatoutgubuncd="0">대통령 선거</li>
									<li class="txt_n_sb" data-eatoutgubuncd="1">국회의원 선거</li>
									<li class="txt_n_sb" data-eatoutgubuncd="2">지방 선거</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="select_field_small select">
						<div class="flex admin_selectBox">
							<p class="txt_n">회차</p>
							<div class="selectTit eatout_th">
								<span class="txt_n_m"></span>
							</div>
							<div class="select_listBox eatout_th">
							</div>
						</div>
					</div>
				</div>
				<button type="submit" class="fourthiary eatout_info">관심선거 변경</button>
			</div>
			<section class="mb120">
			<div class="admin_tableTit">
				<p>이용자 목록</p>
				<div class="areaSearch adminSearch">
					<input type="text" name="" id="searchText" class="txt_n_m default" placeholder="검색어를 입력해주세요"/>

				</div>

			</div>
			<div class="mo_table">
				<table class="admin_table member_list">

				</table>
			</div>

				<div class="pagination">
					<div class="dataTables_paginate paging_full_numbers" id="paginate_auth"></div>
					<%--<ul>
						<li><img src="/eatout/assets/eatout/images/icon/ico_arrow_line_g02.svg" alt="처음으로 이동"></li>
						<li><img src="/eatout/assets/eatout/images/icon/ico_arrow_line_g.svg" alt="이전으로 이동"></li>
						<li class="on"><a href="">1</a></li>
						<li><a href="">2</a></li>
						<li><a href="">3</a></li>
						<li><a href="">4</a></li>
						<li><a href="">5</a></li>
						<li><img src="/eatout/assets/eatout/images/icon/ico_arrow_line_g.svg" alt="다음으로 이동"></li>
						<li><img src="/eatout/assets/eatout/images/icon/ico_arrow_line_g02.svg" alt="끝으로 이동"></li>
					</ul>--%>
				</div>
			</section>
		</div>
	</div>
	<div class="ad_cgPopup">
		<div class="ad_cgInner">
			<div class="ad_popupClose">
				<img src="/eatout/assets/eatout/images/icon/close_line_b.svg" alt="닫기 아이콘" />
			</div>
			<p class="hd3">권한수정</p>
			<p class="txt_l mono_g7_col mt4"><span id="mem_nm">김국회</span> 회원의 권한을 다음과 같이 수정합니다.</p>
			<div class="ad_popupSelectBox">
				<div class="ap_radio ck_roundSmall">
					<input type="radio" id="ad_general" name="ap_radio" value="general" checked="">
					<label for="ad_general"><span class="txt_s_sb">일반사용자</span></label>
					<input type="radio" id="ad_master" name="ap_radio" value="master">
					<label for="ad_master"><span class="txt_s_sb">마스터사용자</span></label>
				</div>
				<p class="txt_s_m ad_popupSelect_slTit">관심 시/군/구(선거구)</p>
				<div class="ad_popupSelect_sl flex">

					<div class="select_field_small select">
						<div class="selectTit mega">
							<span class="txt_n_m">서울특별시 </span>
						</div>
						<div class="select_listBox mega">
							<ul>
								<li class="txt_n_sb">서울특별시 </li>
							</ul>
						</div>
					</div>

					<div class="select_field_small select">
						<div class="selectTit cty">
							<span class="txt_n_m">성동구 을</span>
						</div>
						<div class="select_listBox cty">
							<ul>
								<li class="txt_n_sb">성동구 갑</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<button class="pri_defaultBtn txt_l_sb w100p auth_update">
				<span>확인</span>
			</button>
		</div>

	</div>
</div>



<script type="text/javascript" src="/eatout/assets/eatout/js/mypage.js"></script>
<!--공통 footer-->
<%@ include file="/WEB-INF/views/eatout/include/footer.jsp" %>

<script type="text/javascript">

	var strCjCode='<%=cjcode%>';
	var memberData;
	var reload = true;

	var pagingInfo = {
		totalCnt : 0,
		pageNo : 1,
		pageCnt : 10
	};

	$(function() {

		if(common.isEmpty(sessionStorage.getItem("token"))){
			// 로그아웃 처리
			logout();
		}else{
			loginCheck();
		}

		getAjax("geteatoutInfo", "/main/geteatoutInfo",{}, function (id, response, param){
			$(".eatout_gubun").attr('data-eatoutgubuncd', response.data[0].eatoutGubunCd);
			$(".eatout_gubun > span").text(response.data[0].eatoutGubunNm);
			$(".eatout_th").attr('data-eatout_th', response.data[0].eatoutTh);
			$(".eatout_th > span").text(response.data[0].eatoutTh);

			var param = {
				eatoutGubunCd: response.data[0].eatoutGubunCd
			}
			getAjax("getSeleatoutThList", "/main/getSeleatoutThList",param, function (id, response, param){
				var template = $('#tmp_eatoutThList').html();
				var templateScript = Handlebars.compile(template);
				var context = response.data;
				var html = templateScript(context);
				$(".select_listBox.eatout_th").html(html);

				$(".select_listBox.eatout_th > ul > li").on('click', function (){
					$(".eatout_th > span").text($(this).text());
					$(".eatout_th").attr('data-eatout_th', $(this).data('eatout_th'));
					$(".selectTit.eatout_th").removeClass("active");
					$(this).parents('.select_listBox').slideUp(500);
					// $(this).parents('.select_listBox').slideUp(500);
				});
			}, fn_error);

		}, fn_error);

		$(".select_listBox.eatout_gubun > ul > li").on('click', function (){
			$(".eatout_gubun > span").text($(this).text());
			$(".eatout_gubun").attr('data-eatoutgubuncd', $(this).data('eatoutgubuncd'));

			var param = {
				eatoutGubunCd: $(".eatout_gubun").attr('data-eatoutgubuncd')
			}
			getAjax("getSeleatoutThList", "/main/getSeleatoutThList",param, function (id, response, param){
				var template = $('#tmp_eatoutThList').html();
				var templateScript = Handlebars.compile(template);
				var context = response.data;
				var html = templateScript(context);
				$(".select_listBox.eatout_th").html(html);

				$(".eatout_th").attr('data-eatout_th', response.data[0].eatoutTh);
				$(".eatout_th > span").text(response.data[0].eatoutTh);

				$(".select_listBox.eatout_th > ul > li").on('click', function (){
					$(".eatout_th > span").text($(this).text());
					$(".eatout_th").attr('data-eatout_th', $(this).data('eatout_th'));
					$(".selectTit.eatout_th").removeClass("active");
					$(this).parents('.select_listBox').slideUp(500);
				});
			}, fn_error);
		});


		$(".eatout_info").on('click', function (){
			if(confirm("관심 선거를 변경하시겠습니까?")){
				var param = {
					// eatoutGubunCd : $(".eatout_gubun").attr('data-eatoutgubuncd')
					eatoutGubunCd : 1
					, eatoutGubunNm : $(".eatout_gubun > span").text()
					, eatoutTh : $(".eatout_th").attr('data-eatout_th')
				}
				getAjax("seteatoutInfoUpdate", "/main/seteatoutInfoUpdate",param, function (id, response, param){
					alert('관심선거 기준 설정 변경완료');
					$(".ad_popupClose").click();
				}, fn_error);
			}
		});

		$("#searchText").on('keyup', function(e) {
			if (e.keyCode == 13) {
				pagingInfo = {
					totalCnt : 0,
					pageNo : 1,
					pageCnt : 10
				};
				getMemberList();
			}
		});

		$(".auth_update").on('click', function (){
			if(common.isEmpty($(".selectTit.cty > span").attr('data-areacd'))){
				alert('시/군/구(선거구)를 선택해 주세요.');
				return;
			}
			var authGubun = $("input:radio[id=ad_master]:checked").is(":checked") ? "1" : "0";
			var param = {
				memNo: memberData.memno,
				eatoutArea: $(".selectTit.cty > span").attr('data-areacd'),
				gabeulGb: $(".selectTit.cty > span").attr('data-gabeulgb'),
				authGubun : authGubun,
				gubun : "M"
			};
			getAjax("setMemberAuth", "/auth/setMemberAuth", param, function (id,response, param){
				if(response.code == "C005"){
					alert('사용자 권한 수정 성공');
				}else{
					alert('사용자 권한 수정 실패[관리자문의]');
				}
				$(".ad_popupClose").click();
				getMemberList();
			}, fn_error);
		});
		$(".ad_popupClose").click();
		getMemberList();

	});

	function login(){

	}

	function getMemberList(){

		if (pagingInfo.pageNo < 1) {
			return;
		}

		if(pagingInfo.pageNo == NaN){
			pagingInfo.pageNo = 0;
		}

		if (Math.ceil(pagingInfo.totalCnt / pagingInfo.pageCnt) != 0
				&& Math.ceil(pagingInfo.totalCnt / pagingInfo.pageCnt) < pagingInfo.pageNo) {
			return;
		}
		var param = {
			pageNo : (((pagingInfo.pageNo == 0) ? 1 : pagingInfo.pageNo - 1) * pagingInfo.pageCnt),
			pageCnt : pagingInfo.pageCnt
			, cjCode : strCjCode
		};

		if (!common.isEmpty($('#searchText').val())) {
			param.searchText = $('#searchText').val();
		}

		getAjax("getMemberList", "/auth/getMemberList",param, memberList, fn_error);

	}

	function memberList(id, response, param){
		// console.log(response);
		var template = $('#tmp_member_list').html();
		var templateScript = Handlebars.compile(template);
		var context = response.data;
		var html = templateScript(context);
		$(".member_list").html(html);

		if (!common.isEmpty(response.data)) {
			pagingInfo.totalCnt = response.data[0].totalCnt;
			util.renderPagingNavigation('paginate_auth', pagingInfo);
			pagingInfo.pageNo = 1;
		} else {
			pagingInfo.totalCnt = 0;
		}
		(pagingInfo.totalCnt < 1) ? $("#paginate_auth").hide() : $("#paginate_auth").show();


		$(".authProc").on('click', function () {
			var message = "";
			if($(this).data('gubun') == "Y"){
				message = "승인 하시겠습니까?";
			}else{
				message = "승인취소 하시겠습니까?";
			}
			if(confirm(message)){
				var param = {
					memNo: $(this).data('memno'),
					gubun: $(this).data('gubun'),
					cjCode: strCjCode,
				};

				// console.log(param);
				getAjax("setMemberAuth", "/auth/setMemberAuth", param, getMemberList, fn_error);
			}
		});
		$(".authDel").on('click', function () {
			if(confirm($(this).data('memnm') + ' 님의 아이디를 삭제 하시겠습니까?')){
				var param = {
					memNo: $(this).data('memno'),
					cjCode: strCjCode,
				};
				getAjax("setMemberAuth", "/auth/setMemberDel", param, function (id, response){
					// console.log(response);
					if(response.code == 'C004'){
						alert('삭제 성공');
						getMemberList();
					}else{
						alert('삭제 실패[관리자문의]');
					}
				}, fn_error);
			}
		});

		$('button.authUpd.popupOpen').click(function(){
			memberData = $(this).data();
			$("#mem_nm").text(memberData.memnm);
			geteatoutArea("mega", (memberData.eatoutarea+"").substr(3,2));
			if(memberData.authgubun == "1"){
				$("#ad_master").click();
			}
			$('.ad_cgPopup').addClass('active');
		});

		$('.ad_popupClose').click(function(){
			$('.ad_cgPopup').removeClass('active');
		});
	}

	function handlebarsPaging(targetId, pagingInfo) {
		pagingInfo = pagingInfo;
		getMemberList();
	}

	function geteatoutArea(gubun, areaCd){
		var param = {
			gubun : gubun
			, areaCd : areaCd.substr(0,2)
		};
		getAjax("geteatoutArea", "/main/geteatoutArea", param, function (id, response, param){
			var template = $('#tmp_areaList').html();
			var templateScript = Handlebars.compile(template);
			var context = response.data;
			var html = templateScript(context);

			if(param.gubun == "mega"){
				$(".select_listBox.mega").html(html);

				$(".select_listBox.mega > ul > li").on('click', function (){
					$(".selectTit.mega > span").text($(this).text());
					$(".selectTit.mega > span").attr('data-id', $(this).data('areacd'));
					$(".selectTit.mega").removeClass("active");
					$(this).parents('.select_listBox').slideUp(500);
					geteatoutArea("cty", $(this).attr('data-areacd'));
				});

				if(reload){
					$(".select_listBox.mega > ul > li").each(function (){
						console.log($(this).data('areacd') + " / " + (memberData.eatoutarea+"").substr(3,2));
						if($(this).data('areacd') == (memberData.eatoutarea+"").substr(3,2)){
							$(this).click();
						}
					});
				}

			}else if(param.gubun == "cty"){
				$(".select_listBox.cty").html(html);

				$(".select_listBox.cty > ul > li").on('click', function (){
					$(".selectTit.cty > span").text($(this).text());
					$(".selectTit.cty > span").attr('data-areaCd', $(this).data('areacd'));
					$(".selectTit.cty > span").attr('data-gabeulgb', $(this).data('gabeulgb'));
					$(".selectTit.cty").removeClass("active");
					$(this).parents('.select_listBox').slideUp(500);
				});

				if(reload) {
					$(".select_listBox.cty > ul > li").each(function () {
						console.log($(this).data('areacd') + " / " + (memberData.eatoutarea+""));
						if ($(this).data('areacd') == (memberData.eatoutarea + "")) {
							$(this).click();
							reload = false;
						}
					});
				}else{
					$(".selectTit.cty > span").text('시/군/구(선거구)');
					$(".selectTit.cty > span").attr('data-areaCd', '');
					$(".selectTit.cty > span").attr('data-gabeulgb', '');
				}
			}
		}, fn_error, "", false);

	}


</script>

<script type="text/x-handlebars-template" id="tmp_eatoutThList">
	<ul>
		{{#each this}}
		<li class="txt_n_sb" data-eatout_th="{{eatoutTh}}">{{eatoutTh}}</li>
		{{/each}}
	</ul>
</script>


<script type="text/x-handlebars-template" id="tmp_member_list">
	<colgroup>
		<col width="15%"/>
		<col width="12%"/>
		<col width="12%"/>
		<col width="12%"/>
		<col width="12%"/>
		<col width="15%"/>
		<col width="6%"/>
		<col width="7%"/>
		<col width="11%"/>
	</colgroup>
	<tr class="ad_tableTh">
		<th>신청일자</th>
		<th>로그인ID</th>
		<th>담당자</th>
		<th>이메일</th>
		<th>신청권한</th>
		<th>신청지역</th>
		<th>관리자</th>
		<th>상태</th>
		<th>승인 확인</th>
	</tr>
	<!--결과없음 ED-->
	{{#each this}}
	<tr>
		<td>{{substr updDt 0 19}}</td>
		<td>{{loginId}}</td>
		<td>{{memNm}}</td>
		<td>{{emailAddr}}</td>
		<td>
			<span class="txt_n_m">
				{{#ifCond authGubun '==' '0'}}
				일반사용자
				{{else}}
				마스터사용자
				{{/ifCond}}
			</span>
		</td>
		<td>
			{{areaNm}}
		</td>
		<td>
			{{#ifCond resAuthCd '==' 'AUTH1111'}}
			관리자
			{{/ifCond}}
		</td>
		<td>
			{{#ifCond resFlagYn '==' 'Y'}}
			<button type="submit" class="outLine authProc" data-memno="{{memNo}}" data-gubun="N">승인취소</button>
			{{else}}
			<button type="button" class="fourthiary authProc" data-memno="{{memNo}}" data-gubun="Y">권한승인</button>
			{{/ifCond}}
		</td>
		<td>
			<div class="flex">
				<button type="submit" class="outLine authUpd popupOpen" data-memno="{{memNo}}" data-memnm="{{memNm}}" data-authgubun="{{authGubun}}" data-eatoutarea="{{eatoutArea}}">수정</button>
				<button type="submit" class="errorBtn authDel" data-memno="{{memNo}}" data-memnm="{{memNm}}" style="color: #cf250d;">삭제</button>
			</div>
		</td>
	</tr>
	{{else}}
	<!--결과없음 ST-->
	<tr class="searchNone">
		<td class="chip_txt_s_m" colspan="9">검색하신 결과가 없습니다.</td>
	</tr>
	{{/each}}
</script>


<script type="text/x-handlebars-template" id="tmp_areaList">
	<ul>
		{{#each this}}
		<li class="txt_n_sb" data-areaCd="{{areaCd}}" data-gabeulGb="{{gabeulGb}}">{{areaNm}} {{gabeulGbNm}}</li>
		{{/each}}
	</ul>
</script>
