<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>
<script>
	document.title = "Kingmaker 패스워드 변경";
</script>

	<div class="login_page">
		<div class="login_box">
			<div class="logo" onclick="location.href='/login'"><img src="/eatout/assets/eatout/images/logo/logo.svg" alt="Kingmaker 로고"/></div>
			<div class="changePwTxt">
				<div class="bk_error_icon">
					<img src="/eatout/assets/eatout/images/icon/bk_error_icon.svg" alt="경고 아이콘"/>
				</div>
				<span class="txt_n_sb">비밀번호 변경</span>
				<p class="chip_txt_s_m">안전한 서비스 이용을 위해 비밀번호를 변경해 주세요.</p>
			</div>
			<div class="login_form">
				<div class="">
					<label for="now_pw"><span class="txt_s_m">현재 비밀번호</span></label>
					<input type="password" name="" id="now_pw" class="txt_n_m default" placeholder="현재 비밀번호를 입력해주세요"/>
				</div>
				<div class="">
					<label for="new_pw"><span class="txt_s_m">새로운 비밀번호</span></label>
					<input type="password" name="" id="new_pw" class="txt_n_m default" placeholder="새로운 비밀번호를 입력해주세요"/>

				</div>
				<div class="pw_check_common">
					<label for="new_pw_check"><span class="txt_s_m">새로운 비밀번호 확인</span></label>
					<input type="password" name="" id="new_pw_check" class="txt_n_m default" placeholder="새로운 비밀번호를 한 번 더 입력해주세요"/>
					<!--
					####### 일치 #######
					<p class="txt_s_m">비밀번호가 일치합니다.</p>

					####### 일치 X #######
					<p class="txt_s_m error_txt">비밀번호가 일치하지 않습니다.</p>
					-->
				</div>
			</div>
			<div class="login_btn" >
				<button type="button" class="pri_defaultBtn txt_l_sb">변경하기</button>
			</div>
		</div>

	</div>

<!--로그인만 footer include 없앰 ## 지우지 말 것-->
</body>

</html>


<script type="text/javascript">

	var strCjCode='<%=cjcode%>';

	$(function() {
		$("#new_pw_check").on('keyup', function (e){
			if(e.keyCode == 13){
				$(".pri_defaultBtn").click();
			}
		});
		// 로그인
		$(".pri_defaultBtn").on('click', function (){
			if(isValid()){
				var data = {
					pwdBefore : $("#now_pw").val()
					, pwd : $("#new_pw").val()
				}
				getAjax("getLoginId", "/common/getPasswordUpdate", data, function (id, response){
					if(response.code == "C005"){
						alert('비밀번호 변경 완료');
						location.href="/";
					}else if(response.code == "C010"){
						alert('현재 비밀번호가 틀렸습니다.');
						$("#now_pw").val('');
					}else{
						alert('비밀번호 변경 실패[관리자문의]');
					}
				}, fn_error);
			}
		});
	});

	function isValid(){
		if(common.isEmpty($("#now_pw").val())){
			alert('현재 비밀번호를 입력주세요.');
			$("#now_pw").focus();
			return false;
		}

		if(common.isEmpty($("#new_pw").val())){
			alert('새로운 비밀번호를 입력주세요.');
			$("#new_pw").focus();
			return false;
		}
		if(common.isEmpty($("#new_pw_check").val())){
			alert('새로운 비밀번호 확인을 입력해주세요.');
			$("#new_pw_check").focus();
			return false;
		}
		if($("#new_pw").val() != $("#new_pw_check").val()){
			alert('새로운 비밀번호가 다릅니다.');
			$("#new_pw_check").focus();
			return false;
		}

		return true;
	}

</script>