package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileVacancyOutVO {

    //output
    private String  year;       //기준년도
    private String  label;      //시군구
    private double  gnsl;       //전월대비 퍼센트
    private double  rentPyn;    //전월대비 퍼센트
    private double  cstPyn;     //전월대비 퍼센트
    private double  deposit;     //
}
