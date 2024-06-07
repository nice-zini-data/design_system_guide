package com.zinidata.design.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/")
public class DesignMainController {

    @GetMapping("/")
    public String main(HttpServletRequest request, HttpServletResponse response){
//        comLogService.setServiceLog(request, response, 0);
        return "design/index";
    }
}
