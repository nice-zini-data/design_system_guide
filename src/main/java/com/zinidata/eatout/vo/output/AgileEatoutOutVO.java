package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileEatoutOutVO {

    //output
    private String yyyymm;      //기준년월
    private double saleAmt;        //총매출
    private double storeCnt;       //매장 수
    private double useCnt;         //결제건수
    private double custCnt;
    private double storeAmt;       //점포당 매출
    private double useAmt;         //결제단가
    private double cnt20under;     //20대이하고객수
    private double cnt30;          //30대
    private double cnt40;          //40대
    private double cnt50;          //50대
    private double cnt60over;      //60대 이상
    private double time0609;       //06~09시
    private double time0912;       //09~12시
    private double time1215;       //12~15시
    private double time1518;       //15~18시
    private double time1821;       //18~21시
    private double time2124;       //21~24시
    private double time2406;       //24~06시
    private double mon;            //월요일
    private double tue;            //화요일
    private double wed;            //수요일
    private double thu;            //목요일
    private double fri;            //금요일
    private double sat;            //토요일
    private double sun;            //일요일
}
