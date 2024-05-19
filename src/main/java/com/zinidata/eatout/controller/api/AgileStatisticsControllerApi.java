package com.zinidata.eatout.controller.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.zinidata.common.service.ComLogService;
import com.zinidata.eatout.service.AgileStatisticsService;
import com.zinidata.eatout.vo.AgileStatisticsVO;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@Controller
@RequestMapping("/agile/statistics")
public class AgileStatisticsControllerApi {

    private final AgileStatisticsService agileStatisticsService;
    private final ComLogService comLogService;

    /***
     * 지역, 업종, 기간, 정보 리스트
     * @param agileStatisticsVO
     * @return
     * @throws JsonProcessingException
     */
    @ResponseBody
    @PostMapping(value="/getOuteatList")
    @ApiOperation(value="외식데이터 결과 리스트 호출")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "외식데이터 결과 리스트 호출")
    })
    public String getOuteatList(HttpServletRequest request, HttpServletResponse response,AgileStatisticsVO agileStatisticsVO) throws Exception {
        System.out.println(agileStatisticsVO);
        comLogService.setServiceLog(request, response, 0);
        String result = agileStatisticsService.getOuteatList(agileStatisticsVO);
        return result;
    }

    /***
     * 지역, 업종, 기간, 정보 리스트
     * @param agileStatisticsVO
     * @return
     * @throws JsonProcessingException
     */
    @ResponseBody
    @PostMapping(value="/getDeliveryList")
    @ApiOperation(value="외식데이터 결과 리스트 호출")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "외식데이터 결과 리스트 호출")
    })
    public String getDeliveryList(HttpServletRequest request, HttpServletResponse response,AgileStatisticsVO agileStatisticsVO) throws Exception {
        System.out.println(agileStatisticsVO);
        comLogService.setServiceLog(request, response, 0);
        String result = agileStatisticsService.getDeliveryList(agileStatisticsVO);
        return result;
    }

    /***
     * 지역, 업종, 기간, 정보 리스트
     * @param agileStatisticsVO
     * @return
     * @throws JsonProcessingException
     */
    @ResponseBody
    @PostMapping(value="/getPosList")
    @ApiOperation(value="Pos데이터 결과 리스트 호출")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "Pos데이터 결과 리스트 호출")
    })
    public String getPosList(HttpServletRequest request, HttpServletResponse response,AgileStatisticsVO agileStatisticsVO) throws Exception {
        System.out.println(agileStatisticsVO);
        comLogService.setServiceLog(request, response, 0);
        String result = agileStatisticsService.getPosList(agileStatisticsVO);
        return result;
    }

    /***
     * 지역, 업종, 기간, 정보 리스트
     * @param agileStatisticsVO
     * @return
     * @throws JsonProcessingException
     */
    @ResponseBody
    @PostMapping(value="/getLiviList")
    @ApiOperation(value="외식데이터 결과 리스트 호출")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "외식데이터 결과 리스트 호출")
    })
    public String getLiviList(HttpServletRequest request, HttpServletResponse response,AgileStatisticsVO agileStatisticsVO) throws Exception {
        System.out.println(agileStatisticsVO);
        comLogService.setServiceLog(request, response, 0);
        String result = agileStatisticsService.getLiviList(agileStatisticsVO);
        return result;
    }

    /***
     * 지역, 업종, 기간, 정보 리스트
     * @param agileStatisticsVO
     * @return
     * @throws JsonProcessingException
     */
    @ResponseBody
    @PostMapping(value="/getHousList")
    @ApiOperation(value="외식데이터 결과 리스트 호출")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "외식데이터 결과 리스트 호출")
    })
    public String getHousList(HttpServletRequest request, HttpServletResponse response,AgileStatisticsVO agileStatisticsVO) throws Exception {
        System.out.println(agileStatisticsVO);
        comLogService.setServiceLog(request, response, 0);
        String result = agileStatisticsService.getHousList(agileStatisticsVO);
        return result;
    }

    /***
     * 지역, 업종, 기간, 정보 리스트
     * @param agileStatisticsVO
     * @return
     * @throws JsonProcessingException
     */
    @ResponseBody
    @PostMapping(value="/getFranList")
    @ApiOperation(value="프랜차이즈 점유율 결과 리스트 호출")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "프랜차이즈 점유율 결과 리스트 호출")
    })
    public String getFranList(HttpServletRequest request, HttpServletResponse response,AgileStatisticsVO agileStatisticsVO) throws Exception {
        System.out.println(agileStatisticsVO);
        comLogService.setServiceLog(request, response, 0);
        String result = agileStatisticsService.getFranList(agileStatisticsVO);
        return result;
    }

    /***
     * 지역, 업종, 기간, 정보 리스트
     * @return
     * @throws JsonProcessingException
     */
    @ResponseBody
    @PostMapping(value="/getUpjongChgRate")
    @ApiOperation(value="외식데이터 결과 리스트 호출")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "외식데이터 결과 리스트 호출")
    })
    public String getUpjongChgRate() throws Exception {
//        System.out.println(agileStatisticsVO);
        String result = agileStatisticsService.getUpjongChgRate();
        return result;
    }

}
