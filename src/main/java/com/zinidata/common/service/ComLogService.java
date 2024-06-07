package com.zinidata.common.service;

import com.zinidata.common.mapper.ComLogMapper;
import com.zinidata.common.vo.ComLogVO;
import com.zinidata.util.GsonUtil;
import com.zinidata.util.JwtProvider;
import com.zinidata.util.ZiniUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@Service
public class ComLogService {

    @Value("${bizmap.home.dir}")
    private String homeDir;

    @Autowired
    GsonUtil gsonUtil;

    private final ComLogMapper comLogMapper;
    private final JwtProvider jwtProvider;

    public void setServiceLog(HttpServletRequest request, HttpServletResponse response, int paramMemNo) {
        String token = "";

        int memNo = 0;
        if(paramMemNo > 0){
            memNo = paramMemNo;
        }else {
            Cookie[] cookies = request.getCookies(); // 모든 쿠키 가져오기
            if(!ZiniUtil.isEmpty(cookies)) {
                for (Cookie cookie : cookies) {
                    if (cookie.getName().equals("token")) {
                        token = cookie.getValue().replace("Bearer%20", "Bearer ");
                    }
                }
                if(!ZiniUtil.isEmpty(token)) {
                    try {
                        Claims claims = jwtProvider.parseJwtToken(token);
                        memNo = Integer.valueOf(claims.getId());
                    } catch (Exception e) {
                        Cookie cookie = new Cookie("token", null);
                        cookie.setMaxAge(0);
                        response.addCookie(cookie);
                    }
                }
            }
        }
        if(!ZiniUtil.isEmpty(token)) {
            if(memNo > 0){
                String url = String.valueOf(request.getRequestURL());
                ComLogVO logVo = new ComLogVO();
                logVo.setDetail(url);
                logVo.setMemNo(memNo);
                logVo.setPrjType("Design");
                logVo.setIp(getClientIP(request));
                int result = comLogMapper.setServiceLog(logVo);
            }else{
                Cookie cookie = new Cookie("token", null);
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }else{
            String url = String.valueOf(request.getRequestURL());
            ComLogVO logVo = new ComLogVO();
            logVo.setDetail(url);
            logVo.setMemNo(memNo);
            logVo.setPrjType("Design");
            logVo.setIp(getClientIP(request));
            int result = comLogMapper.setServiceLog(logVo);
        }

    }

    public static String getClientIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null) {
            ip = request.getRemoteAddr();
        }

        return ip;
    }

}
