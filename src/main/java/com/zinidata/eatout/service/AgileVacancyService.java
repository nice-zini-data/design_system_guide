package com.zinidata.eatout.service;

import com.zinidata.eatout.mapper.AgileMarketMapper;
import com.zinidata.eatout.mapper.AgileVacancyMapper;
import com.zinidata.eatout.vo.AgileFileVO;
import com.zinidata.eatout.vo.AgileMarketVO;
import com.zinidata.eatout.vo.AgileVacancyVO;
import com.zinidata.eatout.vo.output.*;
import com.zinidata.util.GsonUtil;
import com.zinidata.util.JsonOutputVo;
import com.zinidata.util.Status;
import com.zinidata.util.ZiniUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;

@Slf4j
@RequiredArgsConstructor
@Service
public class AgileVacancyService {

    @Autowired
    GsonUtil gsonUtil;

    private final AgileVacancyMapper agileVacancyMapper;

    public String getAdmiList(AgileVacancyVO agileVacancyVO){
        String result = "";

        ArrayList<AgileAdmiOutVO> outVo = agileVacancyMapper.getAdmiList(agileVacancyVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }
    public String getDateList(AgileVacancyVO agileVacancyVO){
        String result = "";

        ArrayList<AgileDateOutVO> outVo = agileVacancyMapper.getDateList(agileVacancyVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

    public String getDepositList(AgileVacancyVO agileVacancyVO){
        String result = "";

        ArrayList<AgileDepositOutVO> outVo = agileVacancyMapper.getDepositList(agileVacancyVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

    public String getVacancyList(AgileVacancyVO agileVacancyVO){
        String result = "";

        ArrayList<AgileVacancyOutVO> outVo = agileVacancyMapper.getVacancyList(agileVacancyVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

}
