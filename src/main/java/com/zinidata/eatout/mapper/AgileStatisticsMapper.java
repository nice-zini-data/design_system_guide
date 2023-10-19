package com.zinidata.eatout.mapper;

import com.zinidata.eatout.vo.AgileStatisticsVO;
import com.zinidata.eatout.vo.output.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface AgileStatisticsMapper {


    ArrayList<AgileEatoutOutVO> getOuteatList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileDeliveryOutVO> getDeliveryList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgilePosOutVO> getPosList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileLiviOutVO> getLiviList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileHousOutVO> getHousList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileUpjongChgRateOutVO> getUpjongChgRate();
}
