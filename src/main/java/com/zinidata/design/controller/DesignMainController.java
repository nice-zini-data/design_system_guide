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
    //페이지 URL
    
    @GetMapping("")
    public String mainPage(HttpServletRequest request, HttpServletResponse response){
        return "index";
    }

    @GetMapping("/echart/eChart")
    public String eChart(HttpServletRequest request, HttpServletResponse response){
        return "echart/eChart";
    }

    @GetMapping("/echart/barChart")
    public String barChart(HttpServletRequest request, HttpServletResponse response){
        return "echart/barChart";
    }

    @GetMapping("/tag/table")
    public String table(HttpServletRequest request, HttpServletResponse response){
        return "tag/table";
    }

    @GetMapping("/tag/colorPage")
    public String colorPage(HttpServletRequest request, HttpServletResponse response){
        return "tag/colorPage";
    }

    @GetMapping("/tag/layoutPage")
    public String layoutPage(HttpServletRequest request, HttpServletResponse response){
        return "tag/layoutPage";
    }

    @GetMapping("/tag/typography")
    public String typography(HttpServletRequest request, HttpServletResponse response){
        return "tag/typography";
    }

    @GetMapping("/tag/button")
    public String button(HttpServletRequest request, HttpServletResponse response){
        return "tag/button";
    }
}
