package com.zinidata.eatout.vo;

import lombok.Data;

@Data
public class AgilePopVO {

    //input
    private String yyyymm;
    private String megaCd;
    private String ctyCd;
    private String admiCd;
//    private String upjong1Cd;
//    private String upjong2Cd;
//    private String upjong3Cd;
    private String bYear;
    private String aYear;
    private String bHalf;
    private String aHalf;
    private String bQuarter;
    private String aQuarter;
    private String bYyyymm;
    private String aYyyymm;

    //output
    private String pop;
    private String popM20sUnder;
    private String popM30s;
    private String popM40s;
    private String popM50s;
    private String popM60sOver;
    private String popW20sUnder;
    private String popW30s;
    private String popW40s;
    private String popW50s;
    private String popW60sOver;
    private String pop_time_0006;
    private String pop_time_0609;
    private String pop_time_0912;
    private String pop_time_1215;
    private String pop_time_1518;
    private String pop_time_1821;
    private String pop_time_2124;
    private String pop_mon;
    private String pop_tue;
    private String pop_wed;
    private String pop_thu;
    private String pop_fri;
    private String pop_sat;
    private String pop_sun;
}
