<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>
<script>
	document.title = "Kingmaker 이용권한 신청";
</script>

	<div class="login_page scrollYPage">
		<div class="scrollYpage_cont login_box_pageScroll">
		<div class="login_box apply_box ">
			<div class="logo" onclick="location.href='/login'"><img src="/eatout/assets/eatout/images/logo/logo.svg" alt="Kingmaker 로고"/></div>
			<p class="txt_l_sb login_tit">킹메이커 이용권한을 신청해 주세요</p>
			<div class="login_form">
				<div class="ap_id">
					<label for="ap_id"><span class="txt_s_m">아이디</span></label>
					<div class="flex">
						<input type="text" name="" id="ap_id" class="txt_n_m default" placeholder="아이디를 입력해주세요"/>
						<button type="submit" class="sec_defaultBtn txt_n_sb"><span>중복확인</span></button>
					</div>
				</div>
				<div class="ap_pw pw_check_common">
					<label for="ap_pw"><span class="txt_s_m">비밀번호</span></label>
					<input type="password" name="" id="ap_pw" class="txt_n_m default" placeholder="비밀번호를 입력해주세요"/>
					<p class="txt_s_m after_pwd_1">! 문자, 숫자, 특수문자(~!@#$%^&*()) 포함 8~20 글자</p>
					<p class="txt_s_m error_3_col after_pwd_2" style="display: none;color: var(--error_3);">! 문자, 숫자, 특수문자(~!@#$%^&*()) 포함 8~20 글자</p>
					<!--일치하지 않을 때 class [error_txt] 추가-->
				</div>
				<div class="ap_pw_check pw_check_common">
					<label for="ap_pw_check"><span class="txt_s_m">비밀번호 확인</span></label>
					<input type="password" name="" id="ap_pw_check" class="txt_n_m default" placeholder="비밀번호를 한 번 더 입력해주세요"/>
					<p class="txt_s_m after_check_pwd_1">비밀번호가 일치합니다.</p>
					<p class="txt_s_m error_txt after_check_pwd_2" style="display: none;color: var(--error_3)!important;">비밀번호가 일치하지 않습니다.</p>
				</div>
				<div class="ap_department">
					<label for="ap_name"><span class="txt_s_m">소속</span></label>
					<input type="text" name="" id="ap_department" class="txt_n_m default" placeholder="소속을 입력해주세요"/>
				</div>
				<div class="ap_name">
					<label for="ap_name"><span class="txt_s_m">성명</span></label>
					<input type="text" name="" id="ap_name" class="txt_n_m default" placeholder="성명을 입력해주세요"/>
				</div>
				<div class="ap_email">
					<label for="ap_email"><span class="txt_s_m">이메일</span></label>
					<input type="text" name="" id="ap_email" class="txt_n_m default" placeholder="이메일 주소를 입력해주세요"/>
				</div>
				<div class="ap_select">
					<p class="txt_s_m">권한 선택</p>
					<div class="ap_selectBox">
						<div class="ap_radio ck_roundSmall">
							<input type="radio" id="ap_general" name="ap_radio" value="general" checked>
							<label for="ap_general"><span class="txt_s_sb">일반사용자</span></label>
							<input type="radio" id="ap_master" name="ap_radio" value="master">
							<label for="ap_master"><span class="txt_s_sb">마스터사용자</span></label>
						</div>
						<p class="txt_s_m mono_g7_col mt20" style="word-break: keep-all">! 전체 시/군/구(선거구) 데이터를 볼 수 있는 마스터 권한은 담당자에게 별도 문의 바랍니다.</p>

					</div>
				</div>
				<div class="ap_select">
					<p class="txt_s_m">관심 시/군/구(선거구)</p>
					<div class="select_box2 flex ap_selectBox">
						<div class="select_field_small select">
							<div class="selectTit mega">
								<span class="txt_n_m" data-id="11">시/도</span>
							</div>
							<div class="select_listBox mega">
								<ul>
									<li class="txt_n_sb">서울특별시</li>
								</ul>
							</div>
						</div>
						<div class="select_field_small select ">
							<div class="selectTit cty disabled">
								<span class="txt_n_m">시/군/구(선거구)</span>
							</div>
							<div class="select_listBox cty">
								<ul>
									<li class="txt_n_sb">영등포구</li>
								</ul>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="login_btn">
				<button type="submit" class="pri_defaultBtn txt_l_sb">권한신청</button>
			</div>
			<ul class="login_cont">
				<li class="txt_n_sb" onclick="location.href='/login/findPassword'">비밀번호 찾기</li>
				<li class="txt_n_sb" onclick="location.href='/login'">로그인 하기</li>
			</ul>
		</div>
		</div>
	</div>

<!--로그인만 footer include 없앰 ## 지우지 말 것-->
</body>

</html>



<script type="text/javascript">

	var strCjCode='<%=cjcode%>';

	var loginIdDuplicated = false;
	var radioGubun = "general";


	$(function() {
		// 아이디 중복 확인
		$(".sec_defaultBtn").on('click', function (){
			if(common.isEmpty($("#ap_id").val())){
				alert('아이디를 입력해주세요.');
				$('#ap_id').focus();
				return false;
			}
			if($("#ap_id").val().length > 10){
				alert('아이디가 10자 이상입니다.');
				$('#ap_id').focus();
				return false;
			}

			var param = {
				loginId : $("#ap_id").val()
			}
			getAjax("login", "/common/loginIdDuplicated", param, function (id, response, param){
				if(response.code == "C999"){
					alert("아이디가 있습니다");
					loginIdDuplicated = false;
					$('#ap_id').focus();
				}else if(response.code == "C005"){
					alert("사용 가능한 아이디 입니다.");
					loginIdDuplicated = true;
				}
			}, fn_error)
		});

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

		$("#ap_pw").on('keyup', function (e){
			if(common.checkSpace($(this).val())){
				alert('비밀번호에 공백이 있습니다.');
			}
			$(this).val($(this).val().trim());
			$(".after_pwd_1").hide();
			$(".after_pwd_2").hide();
			if(common.checkSpecial($(this).val())){
				$(".after_pwd_1").show();
			}else{
				$(".after_pwd_2").show();
			}

			$('.after_check_pwd_1').hide();
			$('.after_check_pwd_2').hide();
			if($("#ap_pw").val() == $("#ap_pw_check").val()){
				$('.after_check_pwd_1').show();
			}else{
				$('.after_check_pwd_2').show();
			}
		});
		$("#ap_pw_check").on('keyup', function (e){
			$('.after_check_pwd_1').hide();
			$('.after_check_pwd_2').hide();
			if($("#ap_pw").val() == $("#ap_pw_check").val()){
				$('.after_check_pwd_1').show();
			}else{
				$('.after_check_pwd_2').show();
			}
		});

		getElectionArea("mega");

		// 권한신청
		$(".pri_defaultBtn").on('click', function (){
			if(isValid()){
				var param = {
					cjCode : strCjCode
					, loginId : $("#ap_id").val()
					, pwd : $("#ap_pw").val()
					, department : $("#ap_department").val()
					, memNm : $("#ap_name").val()
					, emailAddr : $("#ap_email").val()
					, memStat : 1
					, vno : '999999999999'
					, memType : 1
					, smsYn : 'N'
					, emailYn : 'N'
					, alarmYn : 'N'
					, joinsiteCorpCd : 'A00000'
					, reqAuthCd : 'AUTH111'
					, resAuthCd : 'AUTH000'
				}
				param.eatoutArea = $(".selectTit.cty > span").attr('data-areacd')
				param.gabeulGb = $(".selectTit.cty > span").attr('data-gabeulgb')
				if(radioGubun == "general"){
					param.authGubun = 0;
				}else if(radioGubun == "master"){
					param.authGubun = 1;
				}
				getAjax("registProc", "/common/registProc", param, function (id, response, param){
					if(response.message="success"){
						alert('권한 신청이 완료 되었습니다.');
						location.href = "/login";
					}else{
						alert('권한 신청실패 [관리자 문의]');
					}
				}, fn_error)
			}
		});
	});

	function isValid(){

		if(common.isEmpty($("#ap_id").val())){
			alert('아이디를 입력해주세요.');
			$('#ap_id').focus();
			return false;
		}
		if(!loginIdDuplicated){
			alert('아이디 중복확인 해주세요.');
			$('.sec_defaultBtn').focus();
			return false;
		}
		if(common.isEmpty($("#ap_pw").val())){
			alert('비밀번호를 입력해주세요.');
			$('#ap_pw').focus();
			return false;
		}
		if(common.isEmpty($("#ap_pw_check").val())){
			alert('비밀번호 확인을 입력해주세요.');
			$('#ap_pw_check').focus();
			return false;
		}
		if($("#ap_pw").val() != $("#ap_pw_check").val()){
			alert('비밀번호를 확인해주세요.');
			$("#new_pw_check").focus();
			return false;
		}
		if(!common.checkPasswordPattern($("#ap_pw").val())){
			return false;
		}
		if(common.isEmpty($("#ap_department").val())){
			alert('소속을 입력해주세요.');
			$('#ap_department').focus();
			return false;
		}
		if(common.isEmpty($("#ap_name").val())){
			alert('이름을 입력해주세요.');
			$('#ap_name').focus();
			return false;
		}
		if(common.isEmpty($("#ap_email").val())){
			alert('이메일을 입력해주세요.');
			$('#ap_email').focus();
			return false;
		}

		if($("#ap_email").val().indexOf("@") < 0){
			alert("이메일을 정확히 입력해주세요.");
			$("#ap_email").focus();
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

	function getElectionArea(gubun){

		var param = {
			gubun : gubun
			, areaCd : $(".selectTit.mega > span").attr('data-id')
		};
		getAjax("getElectionArea", "/main/getElectionArea", param, function (id, response, param){
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
					getElectionArea("cty")
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
		}, fn_error)

	}

</script>

<script type="text/x-handlebars-template" id="tmp_areaList">
	<ul>
		{{#each this}}
		<li class="txt_n_sb" data-areaCd="{{areaCd}}" data-gabeulGb="{{gabeulGb}}">{{areaNm}} {{gabeulGbNm}}</li>
		{{/each}}
	</ul>
</script>