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

    @GetMapping("/design/designPage/eChartOption")
    public String eChartOption(HttpServletRequest request, HttpServletResponse response){
        return "design/designPage/eChartOption";
    }

    @GetMapping("/design/designPage/table")
    public String table(HttpServletRequest request, HttpServletResponse response){
        return "design/designPage/table";
    }

    @GetMapping("/design/designPage/colorPage")
    public String colorPage(HttpServletRequest request, HttpServletResponse response){
        return "design/designPage/colorPage";
    }

    @GetMapping("/design/designPage/layoutPage")
    public String layoutPage(HttpServletRequest request, HttpServletResponse response){
        return "design/designPage/layoutPage";
    }

    @GetMapping("/design/designPage/typography")
    public String typography(HttpServletRequest request, HttpServletResponse response){
        return "design/designPage/typography";
    }

    @GetMapping("/design/designPage/button")
    public String button(HttpServletRequest request, HttpServletResponse response){
        return "design/designPage/button";
    }
}
