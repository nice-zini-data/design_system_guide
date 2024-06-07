package com.zinidata.design.service;

import com.zinidata.design.mapper.DesignMainMapper;
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

@Slf4j
@RequiredArgsConstructor
@Service
public class DesignMainService {

    @Autowired
    GsonUtil gsonUtil;

    @Value("${bizmap.reports.trancallback}")
    private String tranCallback;

    PreparedStatement pstmt = null;

    private final DesignMainMapper designMainMapper;

    public String getYyyymm(){
        String result = "";
//        System.err.println(gsonUtil.toJson(new JsonOutputVo(Status.조회, designStatisticsVO)));

        String getString = designMainMapper.getYyyymm();

        if (!ZiniUtil.isEmpty(getString)) {
            result = gsonUtil.toJson(new JsonOutputVo(Status.조회, getString));
        } else {
            result = gsonUtil.toJson(new JsonOutputVo(Status.실패));
        }
        return result;
    }


}
