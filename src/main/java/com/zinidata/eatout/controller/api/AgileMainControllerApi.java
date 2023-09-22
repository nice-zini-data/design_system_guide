package com.zinidata.eatout.controller.api;

import com.zinidata.eatout.service.AgileMainService;
import com.zinidata.eatout.service.AgileStatisticsService;
import com.zinidata.eatout.vo.AgileStatisticsVO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@RequiredArgsConstructor
@Controller
@RequestMapping("/agile/main")
public class AgileMainControllerApi {

    private final AgileMainService agileMainService;
    /***
     * 소비정보
     * @param agileStatisticsVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getAdmiList")
    @ApiOperation(value="지역리스트 정보 가져오기")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "지역리스트 정보 가져오기")
    })
    public String getAdmiList(AgileStatisticsVO agileStatisticsVO){
        String result = agileMainService.getAdmiList(agileStatisticsVO);
        return result;
    }

    /***
     * 소비정보
     * @param agileStatisticsVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getUpjongList")
    @ApiOperation(value="업정정보 가져오기")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "업종정보 가져오기")
    })
    public String getUpjongList(AgileStatisticsVO agileStatisticsVO){
        String result = agileMainService.getUpjongList(agileStatisticsVO);
        return result;
    }

    /***
     * 소비정보
     * @param agileStatisticsVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getDateList")
    @ApiOperation(value="업정정보 가져오기")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "업종정보 가져오기")
    })
    public String getDateList(AgileStatisticsVO agileStatisticsVO){
        System.err.println(agileStatisticsVO);
        String result = agileMainService.getDateList(agileStatisticsVO);
        return result;
    }

    /***
     * 소비정보
     * @param
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getMainInfo")
    @ApiOperation(value="업정정보 가져오기")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "업종정보 가져오기")
    })
    public String getMainInfo(){
        System.err.println("getMainInfo");
        String result = agileMainService.getMainInfo();
        return result;
    }

}
