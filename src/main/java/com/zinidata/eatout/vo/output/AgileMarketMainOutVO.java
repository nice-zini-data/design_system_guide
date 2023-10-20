package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileMarketMainOutVO {

    //output
    private String  upjong3Nm;
    private String  upjong3Cd;
    private String  megaNm;
    private String  megaCd;
    private double     calcSaleAmt;
    private double  salePer;
    private double  storePer;
    private double  calcPer;
    
    // 파일 정보
    private int     rnk;

    private String  yyyymm;
    private long     eSaleAmt;
    private long     dSaleAmt;
    private int     storeCnt;
    private int     storeAmt;

}
