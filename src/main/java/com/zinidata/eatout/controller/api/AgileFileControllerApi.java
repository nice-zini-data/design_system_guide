package com.zinidata.eatout.controller.api;

import com.zinidata.eatout.service.AgileFileService;
import com.zinidata.eatout.service.AgileMainService;
import com.zinidata.eatout.vo.AgileFileVO;
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
@RequestMapping("/")
public class AgileFileControllerApi {

    @Value("agile!2#4")
    private String passwdKey;

    private final AgileFileService agileFileService;

    /***
     * 파일리스트 출력
     * @param agileFileVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getFileList")
    @ApiOperation(value="파일리스트 정보 가져오기")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "파일리스트 정보 가져오기")
    })
    public String getFileList(AgileFileVO agileFileVO){
        String result = agileFileService.getFileList(agileFileVO);
        return result;
    }

    /***
     * 파일업로드
     * @param agileFileVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/file/setFileUpload")
    @ApiOperation(value="파일 업로드 처리")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "파일 업로드 처리")
    })
    public String setFileUpload(AgileFileVO agileFileVO){
        String result = agileFileService.setFileUpload(agileFileVO);
        return result;
    }

    /***
     * 파일 제거
     * @param agileFileVO
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/file/setFileDelete")
    @ApiOperation(value="파일 삭제 기능")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "파일 삭제 기능")
    })
    public String setFileDelete(AgileFileVO agileFileVO){
        String result = agileFileService.setFileDelete(agileFileVO);
        return result;
    }


}
