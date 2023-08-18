<%--
    PageName :
    FileName :
    Description : 파일다운로드 jsp
    History :
--%>
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
<%@ page contentType="text/html; charset=EUC-KR" %>
<%@ page import="java.io.*"%>
<%@ page import="java.text.*" %>
<%@ page import="java.lang.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.net.*" %>
<%@ page import="eproject.*,eproject.sql.*,eproject.logic.*,eproject.util.*"%>
<%@ page import="com.zinidata.util.PropertiesUtil" %>
<%@ page import="org.slf4j.Logger" %>
<%@ page import="org.slf4j.LoggerFactory" %>
<%! org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger("fildDownLoad.jsp"); %>
<%
    String homePath = PropertiesUtil.getProperty("bizmap.home.dir");;
    log.info(homePath);

    request.setCharacterEncoding("euc-kr");
    // 파일 업로드된 경로
    String root = request.getSession().getServletContext().getRealPath("/");
    String savePath = root + "upload";
//    String homePath = "F:/nice/ziniDataSpringBoot/src/main/webapp/WEB-INF";
    String paramPath = request.getParameter("filePath");
    String filePath = "/upload/" + paramPath;
    savePath = homePath + filePath;

    String fileName = request.getParameter("fileName");
    String orgFileNm = request.getParameter("orgFileNm");

//    fileName = new String(fileName.getBytes("euc-kr"), "8859_1");
//    orgFileNm = new String(orgFileNm.getBytes("euc-kr"), "8859_1");
    log.info(savePath);
    log.info(fileName);

    InputStream in = null;
    File file = null;
    boolean skip = false;
    String client = "";
    try{
        // 파일을 읽어 스트림에 담기
        try{
            file = new File(savePath, fileName);
            in = new FileInputStream(file);
        }catch(FileNotFoundException fe){
            skip = true;
        }
        client = request.getHeader("User-Agent");
        // 파일 다운로드 헤더 지정
        response.reset() ;
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Description", "JSP Generated Data");
        if(!skip){
            // IE
            if(client.indexOf("MSIE") != -1){
                response.setHeader ("Content-Disposition", "attachment; filename="+new String(orgFileNm.getBytes("KSC5601"),"ISO8859_1"));

            }else{
                // 한글 파일명 처리
                orgFileNm = new String(orgFileNm.getBytes("utf-8"),"iso-8859-1");

                response.setHeader("Content-Disposition", "attachment; filename=\"" + orgFileNm + "\"");
                response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
            }

            response.setHeader ("Content-Length", ""+file.length() );

            out.clear();
            pageContext.pushBody();
            OutputStream os = response.getOutputStream();
            byte b[] = new byte[(int)file.length()];
            int leng = 0;

            while( (leng = in.read(b)) > 0 ){
                os.write(b,0,leng);
            }
            in.close();
            os.close();

        }else{
            response.setContentType("text/html;charset=UTF-8");
            out.println("<script language='javascript'>alert('파일을 찾을 수 없습니다');history.back();</script>");
        }

    }catch(Exception e){
        e.printStackTrace();
    }
%>