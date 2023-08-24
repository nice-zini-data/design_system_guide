package com.zinidata.eatout.controller;

import com.zinidata.common.service.ComLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/")
public class AgileFileController {

    private final ComLogService comLogService;

    @Value("${fileupload.passwd}")
    private String passwd;

//    @PostMapping("/file/upload")
    @RequestMapping(value="/file/upload", method={RequestMethod.GET, RequestMethod.POST})

    public String pwcheck(HttpServletRequest request, HttpServletResponse response){
        String tmpPasswd = request.getParameter("passwd");
        System.err.println(tmpPasswd);
        System.err.println(passwd);
        String tmpVal = "";
        if(passwd.equals(tmpPasswd)){
            tmpVal = "eatout/fileupload/fileUpload";
//            return "redirect:/file/upload";
        }else{
            tmpVal = "redirect:/login";
        }
        System.err.println(tmpVal);
        return tmpVal;
    }

    @GetMapping("/login")
    public String login(HttpServletRequest request, HttpServletResponse response){
//        comLogService.setServiceLog(request, response, 0);
        return "eatout/fileupload/login";
    }
}
