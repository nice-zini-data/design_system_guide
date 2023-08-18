<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>
<script>
	document.title = "Kingmaker 로그인";
</script>

<style type="text/css">
	a:link { color: red; text-decoration: none;}
	a:visited { color: black; text-decoration: none;}
	a:hover { color: blue; text-decoration: underline;}
</style>

	<div class="login_page">
		<div class="login_box">
			<div class="logo" onclick="location.href='/'"><img src="/eatout/assets/eatout/images/logo/logo.svg" alt="Kingmaker 로고"/></div>
			<p class="txt_l_sb login_tit">로그인하여 선거정보 분석을 시작하세요</p>
			<div class="login_form">
				<div class="login_id">
					<label for="login_id"><span class="txt_s_m">아이디</span></label>
					<input type="text" name="" id="login_id" class="txt_n_m default" placeholder="아이디를 입력해주세요"/>
				</div>
				<div class="login_pw">
					<label for="login_pw"><span class="txt_s_m">비밀번호</span></label>
					<input type="password" name="" id="login_pw" class="txt_n_m default" placeholder="비밀번호를 입력해주세요"/>
				</div>

				<div class="login_id_save ck_squareSmall" style="display: none;">
					<input type="checkbox" id="login_id_save" title="아이디 저장하기"/>
					<label for="login_id_save"><span class="txt_s_sb">아이디 저장하기</span></label>
				</div>
			</div>
			<div class="login_btn">
				<button type="submit" class="pri_defaultBtn txt_l_sb">로그인</button>
			</div>
			<ul class="login_cont">
				<li class="txt_n_sb">
					<a href="/login/findId" style="color: var(--mono_g8);">아이디 찾기</a>
				</li>
				<li class="txt_n_sb">
					<a href="/login/findPassword" style="color: var(--mono_g8);">비밀번호 찾기</a>
				</li>
				<li class="txt_n_sb" onclick="location.href='/login/auth'">권한 신청하기</li>
			</ul>
		</div>
	</div>

<!--로그인만 footer include 없앰 ## 지우지 말 것-->
</body>


</html>



<script type="text/javascript">

	var strCjCode='<%=cjcode%>';

	$(function() {
		$("#login_pw").on('keyup', function (e){
			if(e.keyCode == 13){
				$(".pri_defaultBtn").click();
			}
		});
		// 로그인
		$(".pri_defaultBtn").on('click', function (){
			var param = {
				loginId : $("#login_id").val()
				, pwd : $("#login_pw").val()
				, cjCode : strCjCode
			}
			getAjax("login", "/common/login", param, fn_login, fn_error);
		});
	});


	function fn_login(id, response, param){
		sessionStorage.clear();

		if(response.messageKey == "password.fail"){
			alert('비밀번호가 틀렸습니다');
			return false;
		}else if(response.messageKey == "select.success"){
			if(response.data.outVoLogin[0].resFlagYn == "N"){
				alert('권한 승인 대기중 입니다.');
				location.reload();
				return;
			}
			if(response.data.outVoLogin[0].resFlagYn == ""){
				alert('권한신청 해주시기 바랍니다.');
				location.reload();
				return;
			}

			sessionStorage.setItem("sessionId", response.data.outVoLogin[0].sessionId);
			sessionStorage.setItem("memNo", response.data.outVoLogin[0].memNo);
			sessionStorage.setItem("pwd", response.data.outVoLogin[0].pwd);
			sessionStorage.setItem("token", response.data.authorization);
			$.cookie('token', response.data.authorization);

			if(response.data.outVoLogin[0].tempPwdYn == "Y"){
				alert("임시비밀번호 입니다.\n비밀번호를 변경해주세요.");
				location.href = "/login/changePassword";
			}else{
				//메인 페이지 이동
				location.href = "/";
			}
		}else{
			alert('에러가 발생했습니다. [관리자 문의]');
			return false;
		}
	}


</script>
