package com.zinidata.common.service;

import com.zinidata.common.mapper.ComAdminMapper;
import com.zinidata.common.vo.*;
import com.zinidata.config.SecureHashAlgorithm;
import com.zinidata.util.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Properties;

@Slf4j
@RequiredArgsConstructor
@Service
public class ComEmailService {

    @Autowired
    GsonUtil gsonUtil;

    public String send(ComEmailVO comEmailVO) throws NoSuchAlgorithmException, UnsupportedEncodingException, MessagingException {
        String result = "";
        try
        {
            String subject = comEmailVO.getTitle();
            String fromAddr = "tbridgecs@naver.com";
            String fromName = "티브릿지코퍼레이션";
            String emailAddr = comEmailVO.getToAddr();

            StringBuffer msg = new StringBuffer();

            msg.append(comEmailVO.getMessage());

            Properties p = System.getProperties();
            p.put("mail.smtp.starttls.enable", "true");
            p.put("mail.smtp.host", "smtp.naver.com");
            p.put("mail.smtp.auth", "true");
            p.put("mail.smtp.port", "587");

            Authenticator auth = new MyAuthentication();
            Session sess = Session.getInstance(p, auth);
            MimeMessage m_Msg = new MimeMessage(sess);
            try {
                m_Msg.setSentDate(new Date());
                InternetAddress from = new InternetAddress();

                from = new InternetAddress(fromAddr, fromName, "euc-kr");
                m_Msg.setFrom(from);

                InternetAddress to = new InternetAddress(emailAddr);
                m_Msg.setRecipient(Message.RecipientType.TO, to);

                m_Msg.setSubject(MimeUtility.encodeText(subject, "euc-kr", "B"));
                m_Msg.setText(msg.toString(), "euc-kr");
                m_Msg.setHeader("content-Type", "text/html");

                javax.mail.Transport.send(m_Msg);

                result = "success";
            } catch (AddressException addr_e) {
                result = "fail";
                addr_e.printStackTrace();
            } catch (MessagingException msg_e) {
                result = "fail";
                msg_e.printStackTrace();
            }
        }catch(Exception e){
            result = "fail";
            e.printStackTrace();
        }

        return result;
    }

}
