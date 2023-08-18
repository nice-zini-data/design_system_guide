package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileAnalysisOutVO {

    //output
    private String yyyymm;      //기준년월
    private int saleAmt;        //총매출
    private int storeCnt;       //매장 수
    private int storeAmt;       //점포당 매출
    private int useCnt;         //결제건수
    private int useAmt;         //결제단가
    private int cnt20under;     //20대이하고객수
    private int cnt30;          //30대
    private int cnt40;          //40대
    private int cnt50;          //50대
    private int cnt60over;      //60대 이상
    private int time0609;       //06~09시 
    private int time0912;       //09~12시
    private int time1215;       //12~15시
    private int time1518;       //15~18시
    private int time1821;       //18~21시
    private int time2124;       //21~24시
    private int time2406;       //24~06시
    private int mon;            //월요일
    private int tue;            //화요일
    private int wed;            //수요일
    private int thu;            //목요일
    private int fri;            //금요일
    private int sat;            //토요일
    private int sun;            //일요일
}
