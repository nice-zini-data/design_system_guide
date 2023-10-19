package com.zinidata.eatout.service;

import com.zinidata.eatout.mapper.AgileStatisticsMapper;
import com.zinidata.eatout.vo.AgileStatisticsVO;
import com.zinidata.eatout.vo.output.*;
import com.zinidata.util.GsonUtil;
import com.zinidata.util.JsonOutputVo;
import com.zinidata.util.Status;
import com.zinidata.util.ZiniUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Slf4j
@RequiredArgsConstructor
@Service
public class AgileStatisticsService {

    @Autowired
    GsonUtil gsonUtil;

    private final AgileStatisticsMapper agileStatisticsMapper;

    public String getOuteatList(AgileStatisticsVO agileStatisticsVO){
        String result = "";

        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, agileStatisticsVO)));
        ArrayList<AgileEatoutOutVO> outVo = agileStatisticsMapper.getOuteatList(agileStatisticsVO);
        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo)));
        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공, outVo));
        }else{
            // 로그인 실패
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        System.err.println(result);
        return result;
    }

    public String getDeliveryList(AgileStatisticsVO agileStatisticsVO){
        String result = "";

        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, agileStatisticsVO)));
        ArrayList<AgileDeliveryOutVO> outVo = agileStatisticsMapper.getDeliveryList(agileStatisticsVO);
        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo)));
        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공, outVo));
        }else{
            // 로그인 실패
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        System.err.println(result);
        return result;
    }

    public String getPosList(AgileStatisticsVO agileStatisticsVO){
        String result = "";

        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, agileStatisticsVO)));
        ArrayList<AgilePosOutVO> outVo = agileStatisticsMapper.getPosList(agileStatisticsVO);
        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo)));
        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공, outVo));
        }else{
            // 로그인 실패
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        System.err.println(result);
        return result;
    }

    public String getLiviList(AgileStatisticsVO agileStatisticsVO){
        String result = "";

        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, agileStatisticsVO)));
        ArrayList<AgileLiviOutVO> outVo = agileStatisticsMapper.getLiviList(agileStatisticsVO);
        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo)));
        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공, outVo));
        }else{
            // 로그인 실패
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        System.err.println(result);
        return result;
    }

    public String getHousList(AgileStatisticsVO agileStatisticsVO){
        String result = "";

        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, agileStatisticsVO)));
        ArrayList<AgileHousOutVO> outVo = agileStatisticsMapper.getHousList(agileStatisticsVO);
        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo)));
        if(!ZiniUtil.isEmpty(outVo)){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공, outVo));
        }else{
            // 로그인 실패
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        System.err.println(result);
        return result;
    }

    public String getUpjongChgRate(){
        String result = "";

        ArrayList<AgileUpjongChgRateOutVO> outVo = agileStatisticsMapper.getUpjongChgRate();

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

}
