<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>
<script>
	document.title = "Kingmaker 패스워드 찾기";
</script>

	<div class="login_page">
		<div class="login_box">
			<div class="logo" onclick="location.href='/login'"><img src="/eatout/assets/eatout/images/logo/logo.svg" alt="Kingmaker 로고"/></div>
			<div class="changePwTxt">
				<div class="bk_error_icon">
					<img src="/eatout/assets/eatout/images/icon/bk_error_icon.svg" alt="경고 아이콘"/>
				</div>
				<span class="txt_n_sb">비밀번호 찾기</span>
				<p class="chip_txt_s_m">가입시 입력하신 메일 계정으로 임시 비밀번호가 전송됩니다.</p>
			</div>
			<div class="login_form">
				<div class="">
					<label for="find_id"><span class="txt_s_m">아이디</span></label>
					<input type="text" name="" id="find_id" class="txt_n_m default" placeholder="아이디를 입력해주세요"/>
				</div>
				<div class="">
					<label for="find_name"><span class="txt_s_m">성명</span></label>
					<input type="text" name="" id="find_name" class="txt_n_m default" placeholder="성명을 입력해주세요"/>
				</div>
				<div class="">
					<label for="find_name"><span class="txt_s_m">이메일</span></label>
					<input type="text" name="" id="find_email" class="txt_n_m default" placeholder="이메일을 입력해주세요"/>
				</div>
			</div>
			<div class="login_btn">
				<button type="button" class="pri_defaultBtn txt_l_sb">비밀번호 찾기</button>
			</div>
		</div>
	</div>

<!--로그인만 footer include 없앰 ## 지우지 말 것-->
</body>

</html>


<script type="text/javascript">

	var strCjCode='<%=cjcode%>';

	$(function() {
		$("#find_email").on('keyup', function (e){
			if(e.keyCode == 13){
				$(".pri_defaultBtn").click();
			}
		});
		// 로그인
		$(".pri_defaultBtn").on('click', function (){
			if(isValid()){
				var data = {
					loginId : $("#find_id").val()
					, memNm : $("#find_name").val()
					, emailAddr : $("#find_email").val()
				}
				getAjax("getLoginId", "/common/getPasswordReset", data, function (id, response){
					if(response.code == "C005"){
						alert('비밀번호 초기화 메일을 발송했습니다.');
						location.href = "/login";
					}else if(response.code == "C999"){
						alert('아이디가 없습니다.');
						$("#find_id").val('');
						$("#find_name").val('');
						$("#find_email").val('');
					}else{
						alert('메일 전송 실패[관리자문의]');
					}
				}, fn_error);
			}
		});
	});

	function isValid(){

		if(common.isEmpty($("#find_id").val())){
			alert("아이디를 입력해주세요.");
			$("#find_id").focus();
			return false;
		}

		if(common.isEmpty($("#find_name").val())){
			alert("성명을 입력해주세요.");
			$("#find_name").focus();
			return false;
		}

		if(common.isEmpty($("#find_email").val())){
			alert("이메일을 입력해주세요.");
			$("#find_email").focus();
			return false;
		}

		if($("#find_email").val().indexOf("@") < 0){
			alert("이메일을 정확히 입력해주세요.");
			$("#find_email").focus();
			return false;
		}

		return true;
	}

</script>