package com.zinidata.eatout.service;

import com.zinidata.eatout.mapper.AgileFileMapper;
import com.zinidata.eatout.vo.AgileFileVO;
import com.zinidata.eatout.vo.output.AgileFileOutVO;
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
public class AgileFileService {

    @Autowired
    GsonUtil gsonUtil;

    private final AgileFileMapper agileFileMapper;
    public String getFileList(AgileFileVO agileFileVo){
        String result = "";
        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, agileFileVo)));

        ArrayList<AgileFileOutVO> outVo = agileFileMapper.getFileList(agileFileVo);

        if (!ZiniUtil.isEmpty(outVo)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, outVo));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

    public String setFileDelete(AgileFileVO agileFileVo){
        String result = "";
        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, agileFileVo)));

        int outResult = agileFileMapper.setFileDelete(agileFileVo);

        if(outResult > 0){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

    public String setFileUpload(AgileFileVO agileFileVo){
        String result = "";
        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, agileFileVo)));

        int outResult = agileFileMapper.setFileUpload(agileFileVo);

        if(outResult > 0){
            result = gsonUtil.toJson(new JsonOutputVo(Status.성공));
        }else{
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }

}
