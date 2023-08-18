package com.zinidata.eatout.controller;

import com.zinidata.common.service.ComLogService;
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
@RequestMapping("/agile")
public class AgileMainController {

    private final ComLogService comLogService;

    @GetMapping("/statistics")
    public String main(HttpServletRequest request, HttpServletResponse response){
//        comLogService.setServiceLog(request, response, 0);
        return "eatout/statistics";
    }
    @GetMapping("/market")
    public String market(HttpServletRequest request, HttpServletResponse response){
//        comLogService.setServiceLog(request, response, 0);
        return "eatout/market";
    }
}
