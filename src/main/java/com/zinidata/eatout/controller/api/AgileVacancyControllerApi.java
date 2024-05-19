package com.zinidata.eatout.controller.api;

import com.zinidata.common.service.ComLogService;
import com.zinidata.eatout.service.AgileMarketService;
import com.zinidata.eatout.service.AgileVacancyService;
import com.zinidata.eatout.vo.AgileFileVO;
import com.zinidata.eatout.vo.AgileMarketVO;
import com.zinidata.eatout.vo.AgileVacancyVO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RequiredArgsConstructor
@Controller
@RequestMapping("/agile/vacancy")
public class AgileVacancyControllerApi {

    private final AgileVacancyService agileVacancyService;
    private final ComLogService comLogService;

    /***
     * 소비정보
     * @param agileVacancyVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getAdmiList")
    @ApiOperation(value="소비정보")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "소비정보 가져오기")
    })
    public String getAdmiList(AgileVacancyVO agileVacancyVO) throws IOException {
        String result = agileVacancyService.getAdmiList(agileVacancyVO);
        return result;
    }

    /***
     * 소비정보
     * @param agileVacancyVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getDateList")
    @ApiOperation(value="소비정보")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "소비정보 가져오기")
    })
    public String getDateList(AgileVacancyVO agileVacancyVO) throws IOException {
        System.err.println(agileVacancyVO);
        String result = agileVacancyService.getDateList(agileVacancyVO);
        return result;
    }


    /***
     * 소비정보
     * @param agileVacancyVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getDepositList")
    @ApiOperation(value="소비정보")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "소비정보 가져오기")
    })
    public String getDepositList(HttpServletRequest request, HttpServletResponse response,AgileVacancyVO agileVacancyVO) throws IOException {
        System.err.println(agileVacancyVO);
        comLogService.setServiceLog(request, response, 0);
        String result = agileVacancyService.getDepositList(agileVacancyVO);
        return result;
    }

    /***
     * 소비정보
     * @param agileVacancyVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getVacancyList")
    @ApiOperation(value="소비정보")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "소비정보 가져오기")
    })
    public String getVacancyList(HttpServletRequest request, HttpServletResponse response, AgileVacancyVO agileVacancyVO) throws IOException {
        System.err.println(agileVacancyVO);
        comLogService.setServiceLog(request, response, 0);
        String result = agileVacancyService.getVacancyList(agileVacancyVO);
        return result;
    }

}
