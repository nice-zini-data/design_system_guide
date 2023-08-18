package com.zinidata.eatout.controller.api;

import com.zinidata.eatout.service.AgileMarketService;
import com.zinidata.eatout.vo.AgileFileVO;
import com.zinidata.eatout.vo.AgileMarketVO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;


@RequiredArgsConstructor
@Controller
@RequestMapping("/agile/market")
public class AgileMarketControllerApi {

    private final AgileMarketService agileMarketService;

    /***
     * 소비정보
     * @param agileMarketVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getTotUpjongInfo")
    @ApiOperation(value="소비정보")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "소비정보 가져오기")
    })
    public String getTotUpjongInfo(AgileMarketVO agileMarketVO) throws IOException {
        String result = agileMarketService.getUpjongList(agileMarketVO);
        return result;
    }

    /***
     * 소비정보
     * @param agileMarketVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getAdmiUpjongInfo")
    @ApiOperation(value="소비정보")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "소비정보 가져오기")
    })
    public String getAdmiUpjongInfo(AgileMarketVO agileMarketVO) throws IOException {
        System.err.println(agileMarketVO);
        String result = agileMarketService.getAdmiUpjongInfo(agileMarketVO);
        return result;
    }

    /***
     * 소비정보
     * @param agileMarketVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getUpjongGrowth")
    @ApiOperation(value="소비정보")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "소비정보 가져오기")
    })
    public String getUpjongGrowth(AgileMarketVO agileMarketVO) throws IOException {
        String result = agileMarketService.getUpjongGrowth(agileMarketVO);
        return result;
    }

    /***
     * 소비정보
     * @param agileMarketVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getUpjongDetail")
    @ApiOperation(value="소비정보")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "소비정보 가져오기")
    })
    public String getUpjongDetail(AgileMarketVO agileMarketVO) throws IOException {
        String result = agileMarketService.getUpjongDetail(agileMarketVO);
        return result;
    }

    /***
     * 소비정보
     * @param agileFileVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/setFileInfo")
    @ApiOperation(value="업로드 파일 처리")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "업로드 파일 처리")
    })
    public String setFileInfo(AgileFileVO agileFileVO) throws IOException {
        String result = agileMarketService.setFileInfo(agileFileVO);
        return result;
    }

    /***
     * 소비정보
     * @param agileFileVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getFileInfo")
    @ApiOperation(value="업로드 파일 리스트")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "업로드 파일 리스트")
    })
    public String getFileInfo(AgileFileVO agileFileVO) throws IOException {
        String result = agileMarketService.getFileInfo(agileFileVO);
        return result;
    }

}
