package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileFranOutVO {

    //output
    private String yyyymm;      //기준년월
    private double pop;             //총 인구수
    private double m20Under;      //20대 이하 남성
    private double m30;            //30대 남성
    private double m40;            //40대 남성
    private double m50;            //50대 남성
}
