package com.zinidata.eatout.mapper;

import com.zinidata.eatout.vo.AgileFileVO;
import com.zinidata.eatout.vo.AgileMarketVO;
import com.zinidata.eatout.vo.output.AgileFileOutVO;
import com.zinidata.eatout.vo.output.AgileMarketMainOutVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface AgileMarketMapper {
    ArrayList<AgileMarketMainOutVO> getTotUpjongInfo(AgileMarketVO agileMarketVO);
    ArrayList<AgileMarketMainOutVO> getAdmiUpjongInfo(AgileMarketVO agileMarketVO);
    ArrayList<AgileMarketMainOutVO> getUpjongGrowth(AgileMarketVO agileMarketVO);
    ArrayList<AgileMarketMainOutVO> getUpjongDetail(AgileMarketVO agileMarketVO);
    int setFileInfo(AgileFileVO aglieFileVO);
    ArrayList<AgileFileOutVO> getFileInfo(AgileFileVO aglieFileVO);

}
