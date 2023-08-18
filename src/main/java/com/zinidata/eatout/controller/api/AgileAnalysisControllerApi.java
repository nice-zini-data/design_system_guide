package com.zinidata.eatout.controller.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.zinidata.eatout.service.AgileAnalysisService;
import com.zinidata.eatout.vo.AgileStatisticsVO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@RequiredArgsConstructor
@Controller
@RequestMapping("/agile/analysis")
public class AgileAnalysisControllerApi {
}
