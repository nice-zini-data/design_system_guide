package com.zinidata.common.service;

import com.zinidata.common.mapper.ComAdminMapper;
import com.zinidata.common.vo.*;
import com.zinidata.config.SecureHashAlgorithm;
import com.zinidata.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@Service
public class ComAdminService {

    @Value("${bizmap.home.dir}")
    private String homeDir;

    @Autowired
    GsonUtil gsonUtil;

    private final ComAdminMapper comAdminMapper;
    private final JwtProvider jwtProvider;

    private final ComLogService comLogService;

    public BizBatchLogVO getBatchLog(){
        BizBatchLogVO outVo = comAdminMapper.getBatchLog();
        return outVo;
    }


    public String registProc(HttpServletRequest request, HttpServletResponse response, ComLoginVO comLoginVO) throws NoSuchAlgorithmException {
        String result = "";

        // 비밀번호 sha256 변환
        comLoginVO.setPwd(SecureHashAlgorithm.encryptSHA256(comLoginVO.getPwd()));

        try{
            ComLoginVO memberSeq = comAdminMapper.getMemberSeq();
            comLoginVO.setMemNo(memberSeq.getMemNo());

            comAdminMapper.setMember(comLoginVO);
            comAdminMapper.setAuth(comLoginVO);
            comAdminMapper.setElectionMemberInfo(comLoginVO);
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }catch (Exception e){
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public String registProc(HttpServletRequest request, ComLoginVO comLoginVO, String tmp) throws NoSuchAlgorithmException {
        String result = "";

        // 비밀번호 sha256 변환
        comLoginVO.setPwd(SecureHashAlgorithm.encryptSHA256(comLoginVO.getPwd()));

        try{
            comAdminMapper.setMember(comLoginVO);
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }catch (Exception e){
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패, e));
        }

        return result;
    }

    public String login(HttpServletRequest request, HttpServletResponse response, ComLoginVO comLoginVO) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        String result = "";

        HashMap outVo = new HashMap<>();

        comLoginVO.setPwd(SecureHashAlgorithm.encryptSHA256(comLoginVO.getPwd()));

        int duplicate = comAdminMapper.loginIdDuplicated(comLoginVO);
        if(duplicate > 0){
            ArrayList<ComLoginVO> outVoLogin = comAdminMapper.getMember(comLoginVO);
            if(!ZiniUtil.isEmpty(outVoLogin)){
                comLogService.setServiceLog(request, response, outVoLogin.get(0).getMemNo());

                // 조회한 어드민 타입 넣기
                // session 저장
                HttpSession session = request.getSession(true);
                outVoLogin.get(0).setSessionId(session.getId());

                String tokenResponse = jwtProvider.createToken(Integer.toString(outVoLogin.get(0).getMemNo()));

                String encodedValue = URLEncoder.encode( tokenResponse, "UTF-8" ) ;
                Cookie cookie = new Cookie("token", encodedValue);
                session.setAttribute("Authorization", tokenResponse);
                response.setHeader("Authorization", tokenResponse);
                response.addCookie(cookie); //response에 Cookie 추가

                outVo.put("outVoLogin", outVoLogin);            // 로그인정보
                outVo.put("authorization", tokenResponse);      // 토큰정보

                // 발급 받은 토큰정보 tb_member update
                comLoginVO.setMemNo(outVoLogin.get(0).getMemNo());
                comLoginVO.setToken(tokenResponse);
                comAdminMapper.setMemberToken(comLoginVO);

                result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
            }else{
                // 로그인 실패 (비밀번호 틀림)
                result = gsonUtil.toJson(new JsonOutputVo(Status.비밀번호오류));
            }
        }else{
            // 로그인 실패 아이디 없음
            result = gsonUtil.toJson(new JsonOutputVo(Status.데이터없음));
        }


        return result;
    }


    public String loginIdDuplicated(ComLoginVO comLoginVO){

        int outVo = comAdminMapper.loginIdDuplicated(comLoginVO);

        String result = "";
        if(outVo < 1){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public ArrayList<ComLoginVO> memNoInfo(ComLoginVO comLoginVO){

        ArrayList<ComLoginVO> outVo = comAdminMapper.memNoInfo(comLoginVO);
        return outVo;
    }

    public String getArea(HttpServletRequest request, ComAreaVO comAreaVO){
        String result = "";

        ArrayList<ComAreaVO> outVo = comAdminMapper.getArea(comAreaVO);

        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public String getAreaGeom(HttpServletRequest request, ComAreaVO comAreaVO){
        ArrayList<ComAreaVO> outVo = comAdminMapper.getAreaGeom(comAreaVO);

        String result = "";
        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public String getUpjong(HttpServletRequest request, ComUpjongVO comUpjongVO){
        String result = "";

        HashMap<String, ArrayList<ComUpjongVO>> map = new HashMap<>();
        ArrayList<ComUpjongVO> outVo = comAdminMapper.getUpjong(comUpjongVO);
        if(comUpjongVO.getGubun().equals("upjong2")){

            ComUpjongVO inputVo = new ComUpjongVO();
            inputVo.setGubun("upjong3");
            inputVo.setUpjong1Cd(comUpjongVO.getUpjong1Cd());

            ArrayList<ComUpjongVO> outVo2 = comAdminMapper.getUpjong(inputVo);
            map.put("upjong2", outVo);
            map.put("upjong3", outVo2);
        }else{
            map.put("upjong1", outVo);
        }

        if(!ZiniUtil.isEmpty(map)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, map));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }


    public String getLoginId(ComLoginVO comLoginVO) throws MessagingException, UnsupportedEncodingException, NoSuchAlgorithmException {

        ComLoginVO outVo = comAdminMapper.getLoginId(comLoginVO);

        String result = "";
        if(!ZiniUtil.isEmpty(outVo)){
            ComEmailService comEmailService = new ComEmailService();
            ComEmailVO comEmailVO = new ComEmailVO();
            comEmailVO.setTitle("[Kingmaker] 아이디 찾기 메일입니다.");
            comEmailVO.setToAddr(outVo.getEmailAddr());

            String message = "<table width=\"670\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "    <tbody>\n" +
                    "    <tr>\n" +
                    "        <td>\n" +
                    "            <div style=\"letter-spacing: -2px; margin: 10px 0 10px 0;padding:25px 0 25px 0;font-size:15px;font-weight:bold;font-family:Dotum,verdana,arial;color:#666666;border:1px solid #dddddd;background-color: #005EE7;text-align:center\">\n" +
                    "                <font color=\"#fff\">Kingmaker 아이디 찾기</font><br>\n" +
                    "            </div>\n" +
                    "\n" +
                    "        </td>\n" +
                    "    </tr>\n" +
                    "    <tr>\n" +
                    "        <td style=\"border:1px solid #eaeaea\">\n" +
                    "            <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"width: 100%;\">\n" +
                    "                <tbody>\n" +
                    "                <tr>\n" +
                    "                    <td\n" +
                    "                            style=\"letter-spacing: -1px; padding:70px 75px 40px 75px;text-align:left;font-size:12px;line-height:18px;font-family:Dotum,verdana,arial\">\n" +
                    "                        <font color=\"#282828\"><strong>Kingmaker</strong></font>\n" +
                    "                        <font color=\"#666666\">를 이용해 주셔서 감사합니다.<br><strong style='color:#282828'>" + outVo.getMemNm() + "</strong> 회원님의 아이디는\n" +
                    "                            다음과 같습니다.</font>\n" +
                    "                        <div\n" +
                    "                                style=\"margin:20px 0 20px 0;padding:25px 0 25px 0;font-size:15px;font-weight:bold;font-family:Dotum,verdana,arial;color:#666666;border:1px solid #dddddd;background-color:#f2f2f2;text-align:center\">\n" +
                    "                            <font color=\"#282828\">로그인아이디 : " + outVo.getLoginId() + " </font>\n" +
                    "                        </div>\n" +
                    "                    </td>\n" +
                    "                </tr>\n" +
                    "                <tr>\n" +
                    "                    <td height=\"15px\"></td>\n" +
                    "                </tr>\n" +
                    "                <tr>\n" +
                    "                    <td></td>\n" +
                    "                </tr>\n" +
                    "                <tr>\n" +
                    "                    <td style=\"letter-spacing: -1px; font-size:11px;line-height:15px;font-family:Dotum,verdana,arial;color:#999999;padding:15px;border-top: 1px solid #eee;\">\n" +
                    "                        본 메일은 발신전용 메일입니다.<br>불편한 점이나 다른 문의사항은 <strong>고객센터(1566-2122)</strong>로 문의해 주시기\n" +
                    "                        바랍니다.</td>\n" +
                    "                </tr>\n" +
                    "                </tbody>\n" +
                    "            </table>\n" +
                    "        </td>\n" +
                    "    </tr>\n" +
                    "    <tr>\n" +
                    "        <td height=\"15px\"></td>\n" +
                    "    </tr>\n" +
                    "    <tr>\n" +
                    "        <td></td>\n" +
                    "    </tr>\n" +
                    "    </tbody>\n" +
                    "</table>";
            comEmailVO.setMessage(message);

            result = comEmailService.send(comEmailVO);

            if(result.equals("success")){
                result = gsonUtil.toJson(new JsonOutputVo(Status.성공, outVo));
            }else{
                // 메일전송 실패
                result = gsonUtil.toJson(new JsonOutputVo(Status.메일발송실패));
            }
        }else{
            // 로그인 실패 (아이디 없음)
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public String getPasswordReset(ComLoginVO comLoginVO) throws MessagingException, UnsupportedEncodingException, NoSuchAlgorithmException {

        ComLoginVO outVo = comAdminMapper.getPasswordReset(comLoginVO);

        String result = "";
        if(!ZiniUtil.isEmpty(outVo)){

            String randomPassword = ZiniUtil.randomValue("a", 6);

            outVo.setPwd(SecureHashAlgorithm.encryptSHA256(randomPassword));
            outVo.setTempPwdYn("Y");
            comAdminMapper.updatePassword(outVo);

            ComEmailService comEmailService = new ComEmailService();
            ComEmailVO comEmailVO = new ComEmailVO();
            comEmailVO.setTitle("[Kingmaker] 비밀번호 찾기 메일입니다.");
            comEmailVO.setToAddr(outVo.getEmailAddr());

            String message = "<table width=\"670\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                    "        <tbody>\n" +
                    "            <tr>\n" +
                    "                <td>\n" +
                    "                    <div style=\"letter-spacing: -2px; margin: 10px 0 10px 0;padding:25px 0 25px 0;font-size:15px;font-weight:bold;font-family:Dotum,verdana,arial;color:#666666;border:1px solid #dddddd;background-color: #005EE7;text-align:center\">\n" +
                    "                        <font color=\"#fff\">Kingmaker 임시 비밀번호</font><br>\n" +
                    "                    </div>\n" +
                    "\n" +
                    "                </td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td style=\"border:1px solid #eaeaea\">\n" +
                    "                    <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"width: 100%;\">\n" +
                    "                        <tbody>\n" +
                    "                            <tr>\n" +
                    "                                <td\n" +
                    "                                    style=\"letter-spacing: -1px; padding:70px 75px 40px 75px;text-align:left;font-size:12px;line-height:18px;font-family:Dotum,verdana,arial\">\n" +
                    "                                    <font color=\"#282828\"><strong>Kingmaker</strong></font>\n" +
                    "                                    <font color=\"#666666\">을 이용해 주셔서 감사합니다.<br><strong style='color:#282828'>" +outVo.getMemNm()+ "</strong> 회원님께서 요청하신 임시 비밀번호는\n" +
                    "                                        다음과 같습니다.</font>\n" +
                    "                                    <div\n" +
                    "                                        style=\"margin:20px 0 20px 0;padding:25px 0 25px 0;font-size:15px;font-weight:bold;font-family:Dotum,verdana,arial;color:#666666;border:1px solid #dddddd;background-color:#f2f2f2;text-align:center\">\n" +
                    "                                        <font color=\"#282828\">임시비밀번호&nbsp;" +randomPassword+ "</font>\n" +
                    "                                    </div>\n" +
                    "                                    <font color=\"#282828\"><strong>Kingmaker</strong></font>\n" +
                    "                                    <font color=\"#666666\">의 개인정보보호 정책에 따라 회원님의 비밀번호를 암호화 하여<br />관리되므로 임시 비밀번호를 발급해\n" +
                    "                                        드립니다.<br>발급된 임시 비밀번호는 로그인 후 바로 사용하실 비밀번호로 변경하여 주시기 바랍니다.<br><br>감사합니다.</font>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                            <tr>\n" +
                    "                                <td height=\"15px\"></td>\n" +
                    "                            </tr>\n" +
                    "                            <tr>\n" +
                    "                                <td></td>\n" +
                    "                            </tr>\n" +
                    "                            <tr>\n" +
                    "                                <td style=\"letter-spacing: -1px; font-size:11px;line-height:15px;font-family:Dotum,verdana,arial;color:#999999;padding:15px;border-top: 1px solid #eee;\">\n" +
                    "                                    본 메일은 발신전용 메일입니다.<br>불편한 점이나 다른 문의사항은 <strong>고객센터(1566-2122)</strong>로 문의해 주시기\n" +
                    "                                    바랍니다.</td>\n" +
                    "                            </tr>\n" +
                    "                        </tbody>\n" +
                    "                    </table>\n" +
                    "                </td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td height=\"15px\"></td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td></td>\n" +
                    "            </tr>\n" +
                    "        </tbody>\n" +
                    "    </table>";

            comEmailVO.setMessage(message);
            result = comEmailService.send(comEmailVO);

            if(result.equals("success")){
                result = gsonUtil.toJson(new JsonOutputVo(Status.성공, outVo));
            }else{
                // 메일전송 실패
                result = gsonUtil.toJson(new JsonOutputVo(Status.메일발송실패));
            }
        }else{
            // 로그인 실패 (아이디 없음)
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public String getPasswordUpdate(ComLoginVO comLoginVO) throws NoSuchAlgorithmException {

        String pwdBefore = comLoginVO.getPwdBefore();

        comLoginVO.setPwdBefore(SecureHashAlgorithm.encryptSHA256(comLoginVO.getPwdBefore()));
        int outVo = comAdminMapper.passwordCheck(comLoginVO);

        String result = "";
        if(outVo > 0){
            if(pwdBefore.equals(comLoginVO.getPwd())){
                result = gsonUtil.toJson(new JsonOutputVo(Status.비밀번호동일));
            }
            if(ZiniUtil.isEmpty(result)){
                comLoginVO.setPwd(SecureHashAlgorithm.encryptSHA256(comLoginVO.getPwd()));
                comLoginVO.setTempPwdYn("N");
                int outVo2 = comAdminMapper.updatePassword(comLoginVO);

                if(outVo2 > 0){
                    result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
                }else{
                    // 비밀번호 변경 실패
                    result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
                }
            }
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.비밀번호오류));
        }

        return result;
    }


    public String setMemberInfoUpdate(ComLoginVO comLoginVO) throws NoSuchAlgorithmException {

//        comLoginVO.setPwd(SecureHashAlgorithm.encryptSHA256(comLoginVO.getPwd()));
        int outVo = comAdminMapper.setMemberInfoUpdate(comLoginVO);
        outVo = comAdminMapper.setMemberInfoUpdate2(comLoginVO);
        outVo = comAdminMapper.setMemberInfoUpdate3(comLoginVO);

        String result = "";
        if(outVo > 0){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }else{
            // 비밀번호 변경 실패
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

    public String getMemNotice(ComLoginVO comLoginVO){
        // 선거 기준 회차
        ArrayList<ComLoginVO> outVo = comAdminMapper.getMemNotice(comLoginVO);

        String result = "";
        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }

        return result;
    }

}
