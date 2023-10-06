package com.zinidata.eatout.mapper;

import com.zinidata.eatout.vo.AgileMarketVO;
import com.zinidata.eatout.vo.AgileVacancyVO;
import com.zinidata.eatout.vo.output.AgileAdmiOutVO;
import com.zinidata.eatout.vo.output.AgileDateOutVO;
import com.zinidata.eatout.vo.output.AgileDepositOutVO;
import com.zinidata.eatout.vo.output.AgileVacancyOutVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface AgileVacancyMapper {
    ArrayList<AgileAdmiOutVO> getAdmiList(AgileVacancyVO agileVacancyVO);
    ArrayList<AgileDateOutVO> getDateList(AgileVacancyVO agileVacancyVO);
    ArrayList<AgileDepositOutVO> getDepositList(AgileVacancyVO agileVacancyVO);

    ArrayList<AgileVacancyOutVO> getVacancyList(AgileVacancyVO agileVacancyVO);


}
