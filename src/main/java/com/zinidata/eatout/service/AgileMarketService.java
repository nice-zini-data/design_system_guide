package com.zinidata.eatout.service;

import com.zinidata.eatout.mapper.AgileMarketMapper;
import com.zinidata.eatout.vo.AgileFileVO;
import com.zinidata.eatout.vo.AgileMarketVO;
import com.zinidata.eatout.vo.output.AgileFileOutVO;
import com.zinidata.eatout.vo.output.AgileMarketMainOutVO;
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
public class AgileMarketService {

    @Autowired
    GsonUtil gsonUtil;

    private final AgileMarketMapper agileMarketMapper;

    public String getUpjongList(AgileMarketVO agileMarketVO){
        String result = "";

        ArrayList<AgileMarketMainOutVO> outVo = agileMarketMapper.getTotUpjongInfo(agileMarketVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }
    public String getAdmiUpjongInfo(AgileMarketVO agileMarketVO){
        String result = "";

        ArrayList<AgileMarketMainOutVO> outVo = agileMarketMapper.getAdmiUpjongInfo(agileMarketVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }
    public String getUpjongGrowth(AgileMarketVO agileMarketVO){
        String result = "";

        ArrayList<AgileMarketMainOutVO> outVo = agileMarketMapper.getUpjongGrowth(agileMarketVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }
    public String getUpjongDetail(AgileMarketVO agileMarketVO){
        String result = "";

        ArrayList<AgileMarketMainOutVO> outVo = agileMarketMapper.getUpjongDetail(agileMarketVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

    public String setFileInfo(AgileFileVO agileFileVO) throws IOException {
        String result = "";

        try {
            agileMarketMapper.setFileInfo(agileFileVO);
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회));
        }catch(Exception e){
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패,e));
        }

        return result;
    }
    public String getFileInfo(AgileFileVO agileFileVO){
        String result = "";

        ArrayList<AgileFileOutVO> outVo = agileMarketMapper.getFileInfo(agileFileVO);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }
}
