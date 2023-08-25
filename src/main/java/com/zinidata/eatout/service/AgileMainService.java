package com.zinidata.eatout.service;

import com.zinidata.eatout.mapper.AgileMainMapper;
import com.zinidata.eatout.mapper.AgileStatisticsMapper;
import com.zinidata.eatout.vo.AgileStatisticsVO;
import com.zinidata.eatout.vo.output.AgileAdmiOutVO;
import com.zinidata.eatout.vo.output.AgileDateOutVO;
import com.zinidata.eatout.vo.output.AgileUpjongOutVO;
import com.zinidata.util.GsonUtil;
import com.zinidata.util.JsonOutputVo;
import com.zinidata.util.Status;
import com.zinidata.util.ZiniUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;

@Slf4j
@RequiredArgsConstructor
@Service
public class AgileMainService {

    @Autowired
    GsonUtil gsonUtil;

    @Value("${bizmap.reports.trancallback}")
    private String tranCallback;

    PreparedStatement pstmt = null;

    private final AgileMainMapper agileMainMapper;

    public String getAdmiList(AgileStatisticsVO agileStatisticsVO){
        String result = "";
        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, agileStatisticsVO)));

        ArrayList<AgileAdmiOutVO> outVo = agileMainMapper.getAdmiList(agileStatisticsVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

    public String getDateList(AgileStatisticsVO agileStatisticsVO){
        String result = "";

        ArrayList<AgileDateOutVO> outVo = agileMainMapper.getDateList(agileStatisticsVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

    public String getUpjongList(AgileStatisticsVO agileStatisticsVO){
        String result = "";

        ArrayList<AgileUpjongOutVO> outVo = agileMainMapper.getUpjongList(agileStatisticsVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }


}