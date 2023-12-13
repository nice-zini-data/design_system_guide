<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!--공통 header-->
<%@ include file="/WEB-INF/views/eatout/include/head.jsp" %>
<%@ include file="/WEB-INF/views/eatout/include/script.jsp" %>
<script>
	document.title = "외식통계조회 시스템";
</script>

<style type="text/css">
	a:link { color: red; text-decoration: none;}
	a:visited { color: black; text-decoration: none;}
	a:hover { color: blue; text-decoration: underline;}
</style>

	<div class="login_page">
		<div class="login_box">
<%--			<div class="logo" onclick="location.href='/'"><img src="/eatout/assets/eatout/images/logo/logo.svg" alt="Kingmaker 로고"/></div>--%>
			<p class="txt_l_sb login_tit">파일업로드 페이지</p>
			<div class="login_form">
				<div class="login_pw">
					<label for="login_pw"><span class="txt_s_m">비밀번호</span></label>
					<input type="password" name="" id="login_pw" class="txt_n_m default" placeholder="비밀번호를 입력해주세요"/>
				</div>
			</div>
			<div class="login_btn">
				<button type="submit" class="pri_defaultBtn txt_l_sb">로그인</button>
			</div>
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
				passwd : $("#login_pw").val()
			}
			// getAjax("login", "/pwcheck", param, fn_login, fn_error,'POST');
			// location.href = "/file/upload?passwd="+$("#login_pw").val();
			//---
			var newForm = $('<form></form>');
			//set attribute (form)
			newForm.attr("name","newForm");
			newForm.attr("method","post");
			newForm.attr("action","/file/upload");
			newForm.attr("target","_self");

			// create element & set attribute (input)
			newForm.append($('<input/>', {type: 'hidden', name: 'passwd', value:$("#login_pw").val() }));

			// append form (to body)
			newForm.appendTo('body');

			// submit form
			newForm.submit();
		});
	});

</script>
