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
.modal {
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	display: none;

	background-color: rgba(0, 0, 0, 0.4);
}
.modal_body {
	position: absolute;
	top: 50%;
	left: 50%;

	width: 500px;
	height: 600px;

	padding: 40px;

	text-align: center;

	background-color: rgb(255, 255, 255);
	border-radius: 10px;
	box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

	transform: translateX(-50%) translateY(-50%);
}
</style>
</head>

<body class="mypage_layout">
	<!--skipNavi-->
	<div class="main_wrap">
		<div class="main_section_wrap pd main_layout">
			<!--main_section full_sec END-->
			<div class="center myLayout">
				<div class="row myL_Table">
					<div class="col-12 center">
						<table class="board_tb">
							<thead>
							<tr>
								<th>V</th>
								<th>NO</th>
								<th>파일명</th>
								<th>정보</th>
								<th>등록일자</th>
							</tr>
							</thead>
							<tbody id="tbodyList">

							</tbody>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="flex flexRight">
						<div class="col-4">
							<button id="uploadFile">등록하기</button>
						</div>
						<div class="col-4">
							<button id="deleteFile">삭제하기</button>
						</div>
					</div>
					<div class="col-4">
						<div id="paginate_filelist"></div>
					</div>

				</div>
			</div>
			<!--main_section full_sec END-->
		</div>
		<!--main_section_wrap END-->
	</div>
	<div class="modal0913">
		<div class="modal">
			<div class="modal_body">
				<div class="row">
					<div class="col-12 text0913_01">파일업로드</div>
				</div>
				<div class="row">
					<div class="col-3 text0913_02">파일경로</div>
					<div class="col-9"><input type="file" id="uploadfiles"></div>
					<div class="col-3 text0913_02">파일설명</div>
					<div class="col-9"><input type="text" id="fileInfoTxt"></div>

				</div>
				<div class="row flex w50_0913">
					<div class="col-12"><input type="button" value="파일업로드" id="uploadBtn"></div>
					<div class="col-12"><input type="button" value="창닫기" id="closeBtn"></div>
				</div>
			</div>
		</div>
	</div>
</body>


</html>


<script type="text/javascript">

	<%--var strCjCode='<%=cjcode%>';--%>

	var pagingInfo = {
		totalCnt : 0,
		pageNo : 1,
		pageCnt : 5
	};

	var fileInfo = {};

	$(function() {
		// 페이지 출력
		list();
		$('.modal').css('display','none');

		//삭제 버튼
		$('#deleteFile').on('click',function(){
			console.log('delete파일');
			console.log($('input:checkbox[name="file_list"]').is(":checked"));
			if($('input:checkbox[name="file_list"]').is(":checked")) {
				if(confirm("선택한 내용을 삭제하시겠습니다.?")){
					$('input:checkbox[name="file_list"]').each(function() {
						// this.checked = true; //checked 처리
						if(this.checked){//checked 처리된 항목의 값
							// alert(this.value);
							fileInfo.fileNo = this.value;
							getAjax("setFileDelete", "/file/setFileDelete", fileInfo, fn_list,fn_error, null,false,true);
						}
					});
					console.log('삭제 후 페이지 호출')
					list();
				}
			}
		})

		$('#uploadFile').on('click',function(){
			console.log('upload파일');
			$('.modal').css('display','block');
		})

		$('#closeBtn').on('click',function(){
			console.log('창닫기');
			upload_close();
		})

		$('#uploadBtn').on('click',function(){
			console.log('파일 업로드 처리');
			if(confirm('파일을 업로드 하시겠습니까?')){

				var form = new FormData();
				var uploadParam = {};
				var tmpFileInfo = $('#uploadfiles')[0].files[0];
				// console.log(tmpFileInfo);
				form.append("uploadFile",tmpFileInfo);
				var tmpfileNm = tmpFileInfo.name.lastIndexOf('.');

				// 실제 파일 업로드
				jQuery.ajax({
					url : "/common/file/upload"
					, type : "POST"
					, processData : false
					, contentType : false
					, data : form
					, success:function(response) {
						var tmpdata = JSON.parse(response).data;
						// 파일 정보 업로드
						uploadParam.fileOriNm = tmpdata.original;
						uploadParam.fileNm = tmpdata.fileName;
						uploadParam.filePath = tmpdata.filePath;
						uploadParam.fileInfo = $('#fileInfoTxt').val();
						console.log(uploadParam)
						getAjax("setFileUpload", "/file/setFileUpload", uploadParam,fn_upload,fn_error,'POST',true);
						console.log('파일업로드 성공?')
						console.log(response);
					}
					,error: function (jqXHR)
					{
						alert(jqXHR.responseText);
					}
				});
			}
		})
	});
	function fn_upload(){
		alert("성공하였습니다.");
		console.log('업로드 완료');
		upload_close();
		list();
	}
	function upload_close(){
		$('.modal').css('display','none');
		$('#uploadfiles').val('');
		$('#fileInfoTxt').val('');
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
		var template = $('#tmp_tbodyList').html();
		var templateScript = Handlebars.compile(template);
		var context = response.data;
		var html = templateScript(context);
		$('#tbodyList').html(html);

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

</script>

<script type="text/x-handlebars_template" id="tmp_tbodyList">
    {{#each this}}
    <tr>
		<td>
			<input type="checkbox" name="file_list" value="{{fileNo}}">
		</td>
        <td>{{fileNo}}</td>
        <td>{{fileOriNm}}</td>
        <td>{{fileInfo}}</td>
        <td>{{regDate}}</td>
    </tr>
    {{/each}}
</script>

