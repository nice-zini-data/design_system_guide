
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>

<script>
	document.title = "Kingmaker";
</script>

<div class="wrap mypage">
	<%@ include file="/WEB-INF/views/eatout/include/side.jsp" %>
	<%@ include file="/WEB-INF/views/eatout/include/navbar.jsp" %>

	<div class="com_gridBox mb120">
		<div class="com_gridInner">
			<h1 class="hd1 comTit subTit">마이페이지</h1>
			<div class="mp_tab">
				<ul>
					<li class="active">
						<p class="hd4">내 정보</p>
					</li>
					<li>
						<p class="hd4">비밀번호 변경</p>
					</li>
				</ul>
			</div>
			<!--내 정보 ST-->
			<div class="card_box_g mypage_box active">
				<div class="mp_ifBox mp_infoChBox">
					<ul>
						<li>
							<p class="">이름</p>
							<div class="mp_if_rightTxt">
								<span class="txt_l" id="mem_nm"></span>
							</div>
						</li>
						<li>
							<p class="">아이디</p>
							<div class="mp_if_rightTxt">
								<span class="txt_l" id="login_id"></span>
							</div>
						</li>
						<li>
							<p class="">소속</p>
							<div class="mp_if_rightTxt">
								<input type="text" name="department" id="department" placeholder="소속을 입력해주세요."/>
							</div>
						</li>
						<li>
							<p class="">이메일</p>
							<div class="mp_if_rightTxt">
								<input type="text" name="email" id="email" placeholder="email@gamil.com"/>
							</div>
						</li>
						<li>
							<p class="">가입일</p>
							<div class="mp_if_rightTxt">
								<span class="txt_l" id="crt_dt"></span>
							</div>
						</li>
						<li>
							<p class="">권한</p>
							<div class="mp_if_rightTxt">

								<div class="ap_selectBox">
									<div class="ap_radio ck_roundSmall">
										<input type="radio" id="mp_general" name="ap_radio" value="general" checked="">
										<label for="mp_general"><span class="txt_n_m">일반사용자</span></label>
										<input type="radio" id="mp_master" name="ap_radio" value="master">
										<label for="mp_master"><span class="txt_n_m">마스터사용자</span></label>
									</div>
									<p class="txt_s_m mono_g7_col">*전체 시/군/구(선거구) 데이터를 볼 수 있는 마스터 권한은 담당자에게 별도 문의 바랍니다.</p>
								</div>
							</div>
						</li>
						<li>
							<p class="">관심 시/군/구(선거구)</p>
							<div class="mp_if_rightTxt flex">
								<div class="select_field_small select">
									<div class="selectTit mega">
										<span class="txt_n_m">시/도</span>
									</div>
									<div class="select_listBox mega">
										<ul>
											<li class="txt_n_sb">서울특별시</li>
										</ul>
									</div>
								</div>

								<div class="select_field_small select">
									<div class="selectTit cty">
										<span class="txt_n_m">시/군/구(선거구)</span>
									</div>
									<div class="select_listBox cty">
										<ul>
											<li class="txt_n_sb">영등포구</li>
										</ul>
									</div>
								</div>
							</div>
						</li>
					</ul>

					<div class="mp_btn">
						<button class="pri_defaultBtn txt_l_sb info">
							<span>변경신청</span>
						</button>
					</div>
				</div>
			</div>

			<!--비밀번호 변경 ST-->
			<div class="card_box_g mypage_box">
				<div class="mp_ifBox mp_pwChBox">
					<ul>
						<li>
							<p class="">기존 비밀번호</p>
							<div class="mp_if_rightTxt">
								<input type="password" name="before_pwd" id="before_pwd" placeholder="기존 비밀번호를 입력해주세요."/>
							</div>
						</li>
						<li>
							<p class="">새 비밀번호</p>
							<div class="mp_if_rightTxt">
								<input type="password" name="after_pwd" id="after_pwd" placeholder="새 비밀번호를 입력해주세요."/>
								<p class="txt_s_m mono_g7_col after_pwd_1">! 문자, 숫자, 특수문자(~!@#$%^&*()) 포함 8~20 글자</p>
								<p class="txt_s_m error_3_col after_pwd_2" style="display: none;">! 문자, 숫자, 특수문자(~!@#$%^&*()) 포함 8~20 글자</p>
							</div>
						</li>
						<li>
							<p class="">새 비밀번호 확인</p>
							<div class="mp_if_rightTxt">
								<input type="password" name="after_check_pwd" id="after_check_pwd" placeholder="새 비밀번호를 한 번 더 입력해주세요."/>
								<p class="txt_s_m mono_g7_col after_check_pwd_1">! 비밀번호가 일치합니다.</p>
								<p class="txt_s_m error_3_col after_check_pwd_2" style="display: none">! 비밀번호가 일치하지 않습니다.</p>
							</div>
						</li>
					</ul>
					<div class="mp_btn">
						<button class="pri_defaultBtn txt_l_sb pwd">
							<span>변경하기</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>

<script type="text/javascript" src="/eatout/assets/eatout/js/mypage.js"></script>
<!--공통 footer-->
<%@ include file="/WEB-INF/views/eatout/include/footer.jsp" %>

<script type="text/javascript">

	var strCjCode='<%=cjcode%>';

	var loginIdDuplicated = false;
	var radioGubun = "general";


	$(function() {
		geteatoutArea("mega");

		if(common.isEmpty(sessionStorage.getItem("token"))){
			// 로그아웃 처리
			logout();
		}else{
			loginCheck();
		}

		$('input[name="ap_radio"]').on('change', function (){
			radioGubun = $(this).val();
			/*if($(this).val() == "master"){
				$(".selectTit.mega").addClass('disabled');
				$(".selectTit.cty").addClass('disabled');

				$(".selectTit.mega > span").text('시/도');
				$(".selectTit.mega > span").attr('data-id', '');
				$(".selectTit.cty > span").text('시/군/구(선거구)');
				$(".selectTit.cty > span").attr('data-areaCd', '');


				$(".selectTit.mega").removeClass("active");
				$(".selectTit.cty").removeClass("active");
				$(".select_listBox.mega").hide();
				$(".select_listBox.cty").hide();

			}else{
				$(".selectTit.mega").removeClass('disabled');
			}*/
		});

		$("#after_pwd").on('keyup', function (e){
			if(common.checkSpace($(this).val())){
				alert('비밀번호에 공백이 있습니다.');
				$(this).val($(this).val().trim());
			}
			$(".after_pwd_1").hide();
			$(".after_pwd_2").hide();
			if(common.checkSpecial($(this).val())){
				$(".after_pwd_1").show();
			}else{
				$(".after_pwd_2").show();
			}

			$('.after_check_pwd_1').hide();
			$('.after_check_pwd_2').hide();
			if($("#after_pwd").val() == $("#after_check_pwd").val()){
				$('.after_check_pwd_1').show();
			}else{
				$('.after_check_pwd_2').show();
			}
		});
		$("#after_check_pwd").on('keyup', function (e){
			$('.after_check_pwd_1').hide();
			$('.after_check_pwd_2').hide();
			if($("#after_pwd").val() == $("#after_check_pwd").val()){
				$('.after_check_pwd_1').show();
			}else{
				$('.after_check_pwd_2').show();
			}
		});

		// 권한신청
		$(".pri_defaultBtn.info").on('click', function (){
			if(isValid()){
				var param = {
					cjCode : strCjCode
					, department : $("#department").val()
					, memNm : $("#mem_nm").text()
					, emailAddr : $("#email").val()
				}
				param.eatoutArea = $(".selectTit.cty > span").attr('data-areacd')
				param.gabeulGb = $(".selectTit.cty > span").attr('data-gabeulgb')
				if($("input:radio[id='mp_general']:checked").val() == "general"){
					param.authGubun = 0;
				}else {
					param.authGubun = 1;
				}
				var updateSw = false;

				if(strAuthGubun == 0){
					if(param.authGubun != strAuthGubun
							|| $(".selectTit.cty > span").attr('data-areacd') != streatoutArea
							|| $(".selectTit.cty > span").attr('data-gabeulgb') != strGabeulGb){
						if(confirm("관심 시/군/구(선거구) 선택 변경 시 관리자의 권한 승인이 필요하며, 확인을 누르면 즉시 로그아웃됩니다. \n관심 시/군/구(선거구) 선택를 변경하시겠습니까?")){
							updateSw = true;
							param.resFlagYn = "N";
						}
					}else{
						updateSw = true;
					}
				}else{
					updateSw = true;
				}
				if(updateSw){
					getAjax("registProc", "/common/setMemberInfoUpdate", param, function (id, response, param){
						if(response.message="success"){
							if(strAuthGubun == 0){
								if(param.authGubun != strAuthGubun
										|| $(".selectTit.cty > span").attr('data-areacd') != streatoutArea
										|| $(".selectTit.cty > span").attr('data-gabeulgb') != strGabeulGb){
									alert('변경 신청이 완료 되었습니다.');
									logout();
								}
							}else{
								alert('변경이 완료 되었습니다.');
								location.reload();
							}

						}else{
							alert('변경 신청실패 [관리자 문의]');
						}
					}, fn_error, "", "", true)
				}
			}
		});

		$(".pri_defaultBtn.pwd").on('click', function (){
			if(isPwdValid()){
				var param = {
					cjCode : strCjCode
					, pwdBefore : $("#before_pwd").val()
					, pwd : $("#after_pwd").val()
				}
				getAjax("registProc", "/common/getPasswordUpdate", param, function (id, response, param){
					if(response.code=="C010"){
						alert('비밀번호 변경 실패.\n기존 비밀번호가 틀렸습니다.');
					}else if(response.code=="C005"){
						alert('비밀번호 변경이 완료되었습니다.');
						$("#before_pwd").val('');
						$("#after_pwd").val('');
						$("#after_check_pwd").val('');
					}else if(response.code=="C012"){
						alert('변경 전 비밀번호와 동일합니다.');
						$("#after_pwd").val('');
						$("#after_check_pwd").val('');
					}else{
						alert('변경 신청실패 [관리자 문의]');
					}
				}, fn_error, "", "", true);
			}
		});
	});

	function isValid(){

		if(common.isEmpty($("#department").val())){
			alert('소속을 입력해주세요.');
			$('#department').focus();
			return false;
		}

		/*if(common.isEmpty($("#mem_nm").val())){
			alert('이름을 입력해주세요.');
			$('#mem_nm').focus();
			return false;
		}*/

		if(common.isEmpty($("#email").val())){
			alert('이메일을 입력해주세요.');
			$('#email').focus();
			return false;
		}

		if($("#email").val().indexOf("@") < 0){
			alert("이메일을 정확히 입력해주세요.");
			$("#email").focus();
			return false;
		}

		// if(radioGubun == "general"){
			if(common.isEmpty($(".selectTit.cty > span").attr('data-areacd'))){
				alert("관심 시/군/구(선거구) 선택를 선택해 주세요.");
				return false;
			}
		// }

		return true;
	}

	function isPwdValid(){

		if(common.isEmpty($("#before_pwd").val())){
			alert('기존 비밀번호를 입력해주세요.');
			$('#before_pwd').focus();
			return false;
		}

		if(common.isEmpty($("#after_pwd").val())){
			alert('새 비밀번호를 입력해주세요.');
			$('#after_pwd').focus();
			return false;
		}

		if(common.isEmpty($("#after_check_pwd").val())){
			alert('새 비밀번호 확인을 입력해주세요.');
			$('#after_check_pwd').focus();
			return false;
		}

		if(!common.checkPasswordPattern($("#after_check_pwd").val())){
			return false;
		}

		if($("#after_pwd").val() != $("#after_check_pwd").val()){
			alert('비밀번호를 확인해주세요.')
			return false;
		}

		return true;
	}

	function login(){
		$("#mem_nm").text(strMemNm);
		$("#login_id").text(strLoginId);
		$("#department").val(strDepartment);
		$("#email").val(strEmail);
		$("#crt_dt").text(strCrtDt.substr(0,19));

		$('.mp_tab li').click(function(){
			$('.mp_tab li').removeClass('active');
			$(this).addClass('active');
			const idx = $('.mp_tab li').index(this);
			$('.mypage_box').removeClass('active');
			$('.mypage_box').eq(idx).addClass('active');
		});

		if(strAuthGubun != "0"){
			$("#mp_master").click();
		}

		/*if(strAuthGubun != "0"){
			$("#mp_master").click();
		}else{*/
			setTimeout(function (){
				$(".select_listBox.mega > ul > li").each(function (){
					if(streatoutArea.substr(3,2) == $(this).data('areacd')){
						$(this).click();
					}
				});

				setTimeout(function (){
					$(".select_listBox.cty > ul > li").each(function (){
						if(streatoutArea.substr(3) == $(this).data('areacd') && strGabeulGb == $(this).data('gabeulgb')){
							$(this).click();
						}
					});
				}, 100);
			}, 100);
		// }
	}

	function geteatoutArea(gubun){

		var param = {
			gubun : gubun
			, areaCd : $(".selectTit.mega > span").attr('data-id')
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
					$(".selectTit.cty").removeClass('disabled');
					$(".selectTit.cty > span").text('시/군/구(선거구)');
					$(".selectTit.cty > span").attr('data-areaCd', '');
					geteatoutArea("cty")
				});

			}else if(param.gubun == "cty"){
				$(".select_listBox.cty").html(html);

				$(".select_listBox.cty > ul > li").on('click', function (){
					$(".selectTit.cty > span").text($(this).text());
					$(".selectTit.cty > span").attr('data-areaCd', $(this).data('areacd'));
					$(".selectTit.cty > span").attr('data-gabeulgb', $(this).data('gabeulgb'));
					$(".selectTit.cty").removeClass("active");
					$(this).parents('.select_listBox').slideUp(500);
				});
			}
		}, fn_error, "", false);

	}

</script>


<script type="text/x-handlebars-template" id="tmp_areaList">
	<ul>
		{{#each this}}
		<li class="txt_n_sb" data-areaCd="{{areaCd}}" data-gabeulGb="{{gabeulGb}}">{{areaNm}} {{gabeulGbNm}}</li>
		{{/each}}
	</ul>
</script>
