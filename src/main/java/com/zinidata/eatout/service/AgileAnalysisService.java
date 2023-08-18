package com.zinidata.eatout.service;

import com.zinidata.eatout.mapper.AgileAnalysisMapper;
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
public class AgileAnalysisService {

    @Autowired
    GsonUtil gsonUtil;
}
