package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgilePosOutVO {

    //output
    private String yyyymm;          // 기준년월
    private String upjong3Cd;       // 업종코드
    private String admiCd;          // 읍면동코드
    private double totSaleAmt;      //총매출
    private double storeCnt;        //매장 수
    private double saleQty;         //점포당 매출
    private double saleAmt;         //판매단가
}
