package com.zinidata.common.controller.api;

import com.zinidata.common.service.ComAdminService;
import com.zinidata.common.service.ComEmailService;
import com.zinidata.common.vo.ComAreaVO;
import com.zinidata.common.vo.ComEmailVO;
import com.zinidata.common.vo.ComLoginVO;
import com.zinidata.common.vo.ComUpjongVO;
import com.zinidata.util.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Properties;

@RequiredArgsConstructor
@Controller
@RequestMapping("/common/email")
class ComEmailControllerApi {

    @Autowired
    GsonUtil gsonUtil;

    private final ComEmailService comEmailService;

    /***
     * title        : 제목
     * fromName     : 보내는 사람 이름
     * toAddr       : 받는사람 메일
     * message      : 내용
     * @param comEmailVO
     * @return
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     * @throws MessagingException
     */
    @ResponseBody
    @PostMapping(value="send")
    @ApiOperation(value="메일전송")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "메일전송")
    })
    public String send(ComEmailVO comEmailVO) throws NoSuchAlgorithmException, UnsupportedEncodingException, MessagingException {
        String result = comEmailService.send(comEmailVO);

        if(result.equals("success")){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }else{
            // 메일전송 실패
            result = gsonUtil.toJson(new JsonOutputVo(Status.메일발송실패));
        }

        return result;
    }


}
