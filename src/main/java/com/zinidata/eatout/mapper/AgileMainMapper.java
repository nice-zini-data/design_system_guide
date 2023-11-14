package com.zinidata.eatout.mapper;

import com.zinidata.eatout.vo.AgileFoundationCalcVO;
import com.zinidata.eatout.vo.AgileStatisticsVO;
import com.zinidata.eatout.vo.output.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface AgileMainMapper {

//    DataUpdateVO getDataUpdateYn(DataUpdateVO dataUpdateVO);
    String getYyyymm();
    ArrayList<AgileAdmiOutVO> getAdmiList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileDateOutVO> getDateList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileUpjongOutVO> getUpjongList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileMenuOutVO> getMenuList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileMainOutVO> getMainInfo(String yyyymm);
    ArrayList<AgileFoundationCalcOutVO> getFoundationCalc(AgileFoundationCalcVO agileFoundationCalcVO);

}
