<%--
    PageName    :
    FileName    :
    Description :
    Author      :
    Make DT     :
    Modify DT   :
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%--<%@ include file = "/loginCheck.jsp"%>--%>
<%
response.setHeader("cache-control", "no-cache"); //-- HTTP 1.1
response.setHeader("expires", "-1"); //-- HTTP 1.0
response.setHeader("pragma", "no-cache");

request.setCharacterEncoding("euc-kr");
%>
<!doctype html>
<html lang="ko">
<head>
<meta charset="euc-kr" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<title>Kingmaker</title>

<!-- css 모음 -->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp"%>

<!-- js 모음 -->
<%@ include file="/WEB-INF/views/eatout/include/script.jsp"%>
<script type="text/javascript" src="/eatout/assets/eatout/js/script.js"></script>



<script>
    </script>
<style>
html, body {
	position: relative;
}
</style>
</head>

<body class="mypage_layout">
	<!--skipNavi-->

	<!-- 로딩 SVG 모달없이 흰 배경일때 -->
	<div class="loader loader-style1"  style="display: none;">
		<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 40 40" enable-background="new 0 0 40 40"
			xml:space="preserve">
        <path opacity="0.4" fill="#1F67FD"
				d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
  s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
  c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
        <path fill="#FF8B61"
				d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
  C22.32,8.481,24.301,9.057,26.013,10.047z">
            <animateTransform attributeType="xml"
				attributeName="transform" type="rotate" from="0 20 20"
				to="360 20 20" dur="0.8s" repeatCount="indefinite" />
        </path>
    </svg>
	</div>
	<!-- 로딩 SVG 모달없이 흰 배경일때 -->

	<!-- 로딩 SVG 모달과 함께 -->
	<div class="loader loader--style3"  style="display: none;">
		<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 50 50" style="enable-background: new 0 0 50 50;"
			xml:space="preserve">
        <path fill="#FF8B61"
				d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
            <animateTransform attributeType="xml"
				attributeName="transform" type="rotate" from="0 25 25"
				to="360 25 25" dur="0.8s" repeatCount="indefinite">
            </animateTransform>
        </path>
    </svg>
	</div>
	<!-- 로딩 SVG 모달과 함께 -->


	<!-- login_pop for_change_pw-->
	<div class="login_pop edit_info_pop1" style="display: none;">
		<div class="login_pop_side">
			<div class="log_inner">
				<p>점포전략 서비스</p>
			</div>
		</div>
		<div class="login_pop_section">
			<div class="close_login_pop">
				<a href="javascript:;" class="ico_close_line_b ico32"></a>
			</div>
			<div class="log_inner">
				<div class="log_pop_scroll login_proc">
					<div class="login_pop_header">
						<h4>비밀번호 확인</h4>
						<p>회원님의 정보를 안전하게 보호하기 위해<br/>비밀번호를 한번 더 확인해 주세요.</p>
					</div>
					<div class="login_pop_body mb20">
						<div class="form_group">
							<form class="form">
								<div class="input-group ico_lock_line_g ico20">
									<input type="password" required=""> <span
										class="highlight"></span> <span class="bar"></span> <label
										class="w300">비밀번호 입력</label>
								</div>
							</form>
						</div>
					</div>
					<div class="login_pop_footer">
						<div class="button_box full">
							<button class="btn1 mb12" id="confirmPw">확인</button>
							<button class="btn2 mb12">취소</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- login_pop for_change_pw-->

	<!-- 권한변경 -->
	<div class="login_pop register_pop edit_info_pop2" style="display:none;">
		<div class="login_pop_side">
			<div class="log_inner">
				<p>점포전략 서비스</p>
			</div>
		</div>
		<div class="login_pop_section">
			<div class="close_login_pop">
				<a href="javascript:;" class="ico_close_line_b ico32"></a>
			</div>
			<div class="log_inner">
				<div class="log_pop_scroll auth register">
					<div class="login_pop_header">
						<h4>내 정보 수정</h4>
						<p>변경을 원하는 정보를 수정해주세요.</p>
					</div>
					<div class="login_pop_body mb20">
						<div class="form_group">
							<div class="cb">
								<div class="input-group ico_user_line_g ico20 fl">
									<input type="text" required="" id="rLoginId">
									<span class="highlight"></span>
									<span class="bar"></span>
									<label class="w300">아이디 입력</label>
								</div>
								<div class="fr">
									<button class="btn3" id="rDuplicated">중복확인</button>
								</div>
							</div>
							<div class="input-group ico_lock_line_g ico20">
								<input type="password" required="" id="rPwd">
								<span class="highlight"></span>
								<span class="bar"></span>
								<label class="w300">비밀번호 입력</label>
							</div>
							<div class="input-group ico_lock_line_g ico20">
								<input type="password" required="" id="rPwdCheck">
								<span class="highlight"></span>
								<span class="bar"></span>
								<label class="w300">비밀번호 확인</label>
							</div>
							<p id="pwdCheck" style="font-weight: 500;font-size: 14px;color: #ff4e4e;margin-bottom:20px;display: none">
								비밀번호가 맞지 않습니다
							</p>
							<div class="input-group ico_build_line_g ico20">
								<input type="text" required="" id="rDepartment">
								<span class="highlight"></span>
								<span class="bar"></span>
								<label class="w300">소속부서</label>
							</div>
							<div class="input-group ico_idcard_line_g ico20">
								<input type="text" required="" id="rMemNm">
								<span class="highlight"></span>
								<span class="bar"></span>
								<label class="w300">성명</label>
							</div>
							<div class="input-group ico_at_line_g ico20">
								<input type="text" required="" id="rEmail">
								<span class="highlight"></span>
								<span class="bar"></span>
								<label class="w300">이메일</label>
							</div>
						</div>
						<div class="show_body_title_box flx mb8">
							<p class="show_body_title">이용권한 선택</p>
						</div>
						<div class="min_box has_border">
							<ul class="flx">
								<li>
									<label class="container">상권분석
										<input type="checkbox" checked="checked">
										<span class="checkmark"></span>
									</label>
								</li>
								<li>
									<label class="container">상권통계
										<input type="checkbox" checked="checked">
										<span class="checkmark"></span>
									</label>
								</li>
							</ul>
						</div>
					</div>
					<div class="login_pop_footer">
						<div class="button_box register">
							<button class="btn2 mb12">취소</button>
							<button class="btn1 registerProc">적용</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 권한변경 -->
	<!--사이드바 모달 modal START-->
	<div class="modal modal1"></div>
	<!--modal END-->
	<!--bottom popup시 모달 modal START-->
	<div class="modal modal2"></div>
	<!--modal END-->


	<%@ include file="/WEB-INF/views/eatout/include/navbar.jsp"%>

	<div class="main_wrap">
		<div class="main_section_wrap pd main_layout">
			<div class="main_section lft_sec">
				<div class="sec_wrap">
					<div class="box_div mb12">
						<div class="box_div_inner">
							<div class="user_navi_head login_main admin">
								<div class="user_big_gra mb12 user_navi">
									<div class="user_big"></div>
								</div>
								<div class="txt">
									<p class="userNm"></p>
									<p class="department"></p>
								</div>
							</div>
						</div>
					</div>
					<div class="box_div mb12">
						<div class="box_div_header">
							<button class="quick_btn direct" data-menu="">
								<p>상권분석</p>
								<div class="ico20 ico_arrow_line_b"></div>
							</button>
						</div>
						<div class="mini_quick_link_box">

							<ul class="mini_quick_link cb">
								<li class="fl"><a href="javascript:;" class="direct ico20 ico_chart_full_c" data-menu="sales">매출</a></li>
								<li class="fl"><a href="javascript:;" class="direct ico20 ico_customer_full_c" data-menu="customer">고객</a></li>
								<li class="fl"><a href="javascript:;" class="direct ico20 ico_finance_full_c" data-menu="finance">금융</a></li>
								<li class="fl"><a href="javascript:;" class="direct ico20 ico_map_full_c" data-menu="area">지역</a></li>
								<li class="fl"><a href="javascript:;" class="direct ico20 ico_gift_full_c" data-menu="today">오늘드림</a></li>
							</ul>

						</div>

					</div>
					<div class="box_div mb12">
						<div class="box_div_header">
							<button class="quick_btn stat">
								<p>상권통계</p>
								<div class="ico20 ico_arrow_line_b"></div>
							</button>
						</div>
					</div>
					<div class="button_box flx link_howto">
						<button class="ico16 ico_ask_line_g" href="#">도움말</button>
					</div>
				</div>
			</div>
			<!--main_section full_sec END-->
			<div class="main_section full_sec">
				<div class="sec_wrap">
					<div class="box_div_section">
						<div class="box_div_title_r mb12">
							<h3 class="title_full_sec admin">관리자페이지</h3>
						</div>
						<div class="box_div_wrap">
							<div class="box_div">
								<div class="box_div_inner">
									<div class="box_div_body">
										<div class="mypage_head_box cb mb20">
											<div class="mp_hd_left fl">
												<div class="box_div_title_m mb4">
													<p class="tt_txt">사용자 목록</p>
												</div>
											</div>
											<div class="mp_hd_right fr">
												<div class="bbs_search">
													<div class="flx">
														<div class="search_form_box">
															<input name="search_word" type="text" id="searchText"
																value="" title="검색어를 입력하세요" placeholder="검색어를 입력하세요">
															<button type="button" name="btn_search" id="btnSearch"
																class="bbs_search_btn" title="검색하기" onclick="list();">검색</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="board_table_box admin_table_box x-scroll mb20">
											<table class="board_tb">
												<thead>
													<tr>
														<th>NO</th>
														<th>신청일자</th>
														<th>소속부서</th>
														<th>로그인ID</th>
														<th>담당자</th>
														<th>email</th>
														<th>신청 지역</th>
														<th>신청 구분</th>
														<th>승인 확인</th>
													</tr>
												</thead>
												<tbody id="tbodyList">

												</tbody>
											</table>
										</div>
										<div>
											<div class="board_pg_navi">
												<div class="dataTables_paginate paging_full_numbers"
													id="paginate_auth"></div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--main_section full_sec END-->
		</div>
		<!--main_section_wrap END-->
	</div>
</body>


</html>


<script type="text/javascript">

	var strCjCode='<%=cjcode%>';

	var pagingInfo = {
		totalCnt : 0,
		pageNo : 1,
		pageCnt : 10
	};

	$(function() {
		$(".stat").on('click', function (){
			location.href="/stat";
		});

		$("#searchText").on('keyup', function(e) {
			if (e.keyCode == 13) {
				pagingInfo = {
					totalCnt : 0,
					pageNo : 1,
					pageCnt : 10,
					cjCode : strCjCode
				};
				list();
			}
		});

		$(".direct").on('click', function (){
			// console.log(sessionStorage.getItem("loginId"));
			sessionStorage.setItem("menu", $(this).data('menu'));
			location.href="/analysis";
		});

		// 로그인 체크
		loginCheck();

		// 목록 조회
		list();

	});
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
		data.cjCode = strCjCode;

		getAjax("getMemberList", "/auth/getMemberList", data, fn_list,fn_error);

	}

	function fn_list(id, response, param) {
		var template = $('#tmp_tbodyList').html();
		var templateScript = Handlebars.compile(template);
		var context = response.data;
		var html = templateScript(context);
		$('#tbodyList').html(html);

		if (!common.isEmpty(response.data)) {
			pagingInfo.totalCnt = response.data[0].totalCnt;
			util.renderPagingNavigation('paginate_auth', pagingInfo);
			pagingInfo.pageNo = 1;
		} else {
			pagingInfo.totalCnt = 0;
		}
		(pagingInfo.totalCnt < 1) ? $("#paginate_auth").hide() : $("#paginate_auth").show();

		// 승인 확인 버튼
		$(".authProc").on( 'click', function() {

			var param = {
				memNo : $(this).data('memno'),
				gubun : $(this).data('gubun'),
				cjCode : strCjCode,
				reqAuthCd : "AUTH110"
			};

			getAjax("setMemberAuth", "/auth/setMemberAuth", param, list, fn_error);
		});
	}

	function handlebarsPaging(targetId, pagingInfo) {
		pagingInfo = pagingInfo;
		list();
	}

</script>

<script type="text/x-handlebars_template" id="tmp_tbodyList">

    {{#each this}}
    <tr>
        <td>{{rowNum}}</td>
        <td><span class="reference">{{substr crtDt 0 19}}</span></td>
        <td>{{replaceHtml department}}</td>
        <td>{{loginId}}</td>
        <td>{{memNm}}</td>
        <td>{{emailAddr}}</td>
		<td>{{areaNm}}</td>
        <td>
			{{#ifCond eatoutGubunCd '==' 'P'}} 대통령 {{/ifCond}}
			{{#ifCond eatoutGubunCd '==' 'N'}} 국회의원 {{/ifCond}}
			{{#ifCond eatoutGubunCd '==' 'L'}} 구청장 {{/ifCond}}
			{{#ifCond gabeulGb '==' ''}}  {{/ifCond}}
			{{#ifCond gabeulGb '==' '1'}} 갑 {{/ifCond}}
			{{#ifCond gabeulGb '==' '2'}} 을 {{/ifCond}}
			{{#ifCond gabeulGb '==' '3'}} 병 {{/ifCond}}
			{{#ifCond gabeulGb '==' '4'}} 정 {{/ifCond}}
		</td>
        <td>
			{{#ifCond resFlagYn '==' 'N'}}
			<div class="button_box">
				<button type="button" class="authProc btn3" data-memno="{{memNo}}" data-gubun="Y">승인</button>
			</div>
			{{else}}
			<div class="button_box">
				<button type="button" class="authProc btn2" data-memno="{{memNo}}" data-gubun="N">승인취소</button>
				<button type="button" class="authProc btn1" data-memno="{{memNo}}" data-gubun="M">권한변경</button>
			</div>
			{{/ifCond}}
		</td>
    </tr>
    {{else}}
	<tr>{{{isEmptyData 9}}}</tr>
    {{/each}}
</script>
