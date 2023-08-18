package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileLiviOutVO {

    //output
    private String yyyymm;      //기준년월
    private double pop;             //총 인구수
    private double m20Under;      //20대 이하 남성
    private double m30;            //30대 남성
    private double m40;            //40대 남성
    private double m50;            //50대 남성
    private double m60Over;       //60대 이상 남성
    private double w20Under;      //20대 이하 여성
    private double w30;            //30대
    private double w40;            //40대
    private double w50;            //50대
    private double w60Over;       //60대 이상 여성
    private double time0006;       //06~09시
    private double time0609;       //09~12시
    private double time0912;       //12~15시
    private double time1215;       //15~18시
    private double time1518;       //18~21시
    private double time1821;       //21~24시
    private double time2124;       //24~06시
    private double popMon;         //월요일
    private double popTue;         //화요일
    private double popWed;         //수요일
    private double popThu;         //목요일
    private double popFri;         //금요일
    private double popSat;         //토요일
    private double popSun;         //일요일
}
