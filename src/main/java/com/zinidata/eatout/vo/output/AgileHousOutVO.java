package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileHousOutVO {

    //output
    private String yyyymm;      //기준년월
    private double pop;             //총 인구수
    private double m20Under;      //20대 이하 남성
    private double m20;            //30대 남성
    private double m30;            //30대 남성
    private double m40;            //40대 남성
    private double m50;            //50대 남성
    private double m60Over;       //60대 이상 남성
    private double w20Under;      //20대 이하 여성
    private double w20;            //30대
    private double w30;            //30대
    private double w40;            //40대
    private double w50;            //50대
    private double w60Over;       //60대 이상 여성
}
