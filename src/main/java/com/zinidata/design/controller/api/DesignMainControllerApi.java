package com.zinidata.design.controller.api;

import com.zinidata.design.service.DesignMainService;
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
@RequestMapping("/design/main")
public class DesignMainControllerApi {

    private final DesignMainService designMainService;
    /***
     * 소비정보
     * @param
     * @return
     * @throws IOException
     */
    @ResponseBody
    @PostMapping(value="/getTest")
    @ApiOperation(value="getTest")
    @ApiResponses(value = {
            @ApiResponse(code=200, message = "테스트용")
    })
    public String getTest(){
        String result = "getTest";
        return result;
    }

}
