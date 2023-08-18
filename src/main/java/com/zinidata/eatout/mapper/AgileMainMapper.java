package com.zinidata.eatout.mapper;

import com.zinidata.eatout.vo.AgileStatisticsVO;
import com.zinidata.eatout.vo.output.AgileAdmiOutVO;
import com.zinidata.eatout.vo.output.AgileDateOutVO;
import com.zinidata.eatout.vo.output.AgileUpjongOutVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface AgileMainMapper {

//    DataUpdateVO getDataUpdateYn(DataUpdateVO dataUpdateVO);
    ArrayList<AgileAdmiOutVO> getAdmiList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileDateOutVO> getDateList(AgileStatisticsVO agileStatisticsVO);
    ArrayList<AgileUpjongOutVO> getUpjongList(AgileStatisticsVO agileStatisticsVO);

}
