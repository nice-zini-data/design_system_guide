package com.zinidata.common.controller.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.zinidata.common.service.ComAdminService;
import com.zinidata.common.service.ComLogService;
import com.zinidata.common.vo.ComAreaVO;
import com.zinidata.common.vo.ComLoginVO;
import com.zinidata.common.vo.ComUpjongVO;
import com.zinidata.common.vo.TokenResponseNoDataVO;
import com.zinidata.config.JWTAuthorizationFilter;
import com.zinidata.util.*;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;

@RequiredArgsConstructor
@Controller
@Slf4j
@RequestMapping("/common")
class ComAdminControllerApi {

    private final ComAdminService comAdminService;

    private final JwtProvider jwtProvider;

    @Autowired
    GsonUtil gsonUtil;

    @ResponseBody
    @PostMapping(value="registProc")
    @ApiOperation(value="회원가입")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "회원가입")
    })
    public String registProc(HttpServletRequest request, HttpServletResponse response, ComLoginVO comLoginVO) throws NoSuchAlgorithmException {
        String result = comAdminService.registProc(request, response, comLoginVO);
        return result;
    }

    /***
     * loginId      : 아이디
     * pwd          : 비밀번호
     * @param request
     * @param comLoginVO
     * @return
     * @throws NoSuchAlgorithmException
     */
    @ResponseBody
    @PostMapping(value="login")
    @ApiOperation(value="로그인")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "로그인")
    })
    public String login(HttpServletRequest request, HttpServletResponse response, ComLoginVO comLoginVO) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        String result = comAdminService.login(request, response, comLoginVO);
        return result;
    }

    /***
     *
     * @param comLoginVO
     * @return
     */
    @ResponseBody
    @PostMapping(value="loginIdDuplicated")
    @ApiOperation(value="아이디 중복 체크")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "아이디 중복 체크")
    })
    public String loginIdDuplicated(ComLoginVO comLoginVO){
        String result = comAdminService.loginIdDuplicated(comLoginVO);
        return result;
    }

    @ResponseBody
    @PostMapping(value="loginCheck")
    @ApiOperation(value="로그인체크")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "로그인체크")
    })
    public String loginCheck(HttpServletRequest request, HttpServletResponse response, ComLoginVO comLoginVO) throws NoSuchAlgorithmException {
        String jwt = JWTAuthorizationFilter.getJwtFromRequest(request); //request에서 jwt 토큰을 꺼낸다.
        Claims claims = jwtProvider.parseJwtToken(jwt);

        log.info(claims.getId());

        boolean loginCheck = false;
        if(comLoginVO.getMemNo() == Integer.parseInt(claims.getId())){
            loginCheck = true;
        }
        // 토큰에 있는 아이디로 권한 찾기
        ArrayList<ComLoginVO> outVo = comAdminService.memNoInfo(comLoginVO);;
        String result = "";
        if(jwt.equals(outVo.get(0).getToken())){
            if(loginCheck){
                // 로그인 체크 성공
                result = gsonUtil.toJson(new JsonOutputVo(Status.성공, outVo));
            }else{
                // 토큰정보 오류
                result = gsonUtil.toJson(new JsonOutputVo(Status.토큰정보오류));
            }
        }else{
            // 토큰정보 변경시 로그아웃 처리를 위함
            result = gsonUtil.toJson(new JsonOutputVo(Status.다른사람이로그인, outVo));
        }
        return result;
    }

    /***
     * 파라메터 없으면 시/도 조회
     * megaCd   : 시/도
     * ctyCd    : 시/군/구
     * @param request
     * @param comAreaVO
     * @return
     * @throws NoSuchAlgorithmException
     */
    @ResponseBody
    @PostMapping(value="getArea")
    @ApiOperation(value="지역검색")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "지역검색")
    })
    public String getArea(HttpServletRequest request, HttpServletResponse response, ComAreaVO comAreaVO) throws NoSuchAlgorithmException {
        String result = comAdminService.getArea(request, comAreaVO);
        return result;
    }

    @ResponseBody
    @PostMapping(value="getAreaGeom")
    @ApiOperation(value="선택 지역 범위 가져오기")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "선택 지역 범위 가져오기")
    })
    public String getAreaGeom(HttpServletRequest request, HttpServletResponse response, ComAreaVO comAreaVO) throws NoSuchAlgorithmException {
        String result = comAdminService.getAreaGeom(request, comAreaVO);
        return result;
    }

    /***
     * upjong1Cd    : F
     * gubun        : upjong1, upjong2, upjong3
     * @param request
     * @param comUpjongVO
     * @return
     * @throws NoSuchAlgorithmException
     */
    @ResponseBody
    @PostMapping(value="getUpjong")
    @ApiOperation(value="업종 검색")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "업종 검색")
    })
    public String getUpjong(HttpServletRequest request, HttpServletResponse response, ComUpjongVO comUpjongVO) throws NoSuchAlgorithmException {
        String result = comAdminService.getUpjong(request, comUpjongVO);
        return result;
    }



    /***
     *
     * @param comLoginVO
     * @return
     */
    @ResponseBody
    @PostMapping(value="getLoginId")
    @ApiOperation(value="아이디 찾기 메일발송")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "아이디 찾기 메일발송")
    })
    public String getLoginId(ComLoginVO comLoginVO) throws MessagingException, UnsupportedEncodingException, NoSuchAlgorithmException {
        String result = comAdminService.getLoginId(comLoginVO);
        return result;
    }

    /***
     *
     * @param comLoginVO
     * @return
     */
    @ResponseBody
    @PostMapping(value="getPasswordReset")
    @ApiOperation(value="비밀번호 초기화 메일발송")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "비밀번호 초기화 메일발송")
    })
    public String getPasswordReset(ComLoginVO comLoginVO) throws MessagingException, UnsupportedEncodingException, NoSuchAlgorithmException {
        String result = comAdminService.getPasswordReset(comLoginVO);
        return result;
    }

    /***
     *
     * @param comLoginVO
     * @return
     */
    @ResponseBody
    @PostMapping(value="getPasswordUpdate")
    @ApiOperation(value="비밀번호 변경")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "비밀번호 변경")
    })
    public String getPasswordUpdate(ComLoginVO comLoginVO) throws NoSuchAlgorithmException {
        String result = comAdminService.getPasswordUpdate(comLoginVO);
        return result;
    }


    /***
     *
     * @param comLoginVO
     * @return
     */
    @ResponseBody
    @PostMapping(value="setMemberInfoUpdate")
    @ApiOperation(value="회원정보 변경")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "회원정보 변경")
    })
    public String setMemberInfoUpdate(ComLoginVO comLoginVO) throws NoSuchAlgorithmException {
        String result = comAdminService.setMemberInfoUpdate(comLoginVO);
        return result;
    }

    /***
     *
     * @param comLoginVO
     * @return
     */
    @ResponseBody
    @PostMapping(value="getMemNotice")
    @ApiOperation(value="회원 알림 조회")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "회원 알림 조회")
    })
    public String getMemNotice(ComLoginVO comLoginVO){
        String result = comAdminService.getMemNotice(comLoginVO);
        return result;
    }

}
