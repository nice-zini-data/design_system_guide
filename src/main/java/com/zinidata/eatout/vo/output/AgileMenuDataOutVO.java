package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileMenuDataOutVO {

    //output
    private String yyyymm;      //기준년월
    private int saleAmt;        //총매출
    private int storeCnt;       //표본점포 수
    private int saleCnt;        //판매건수
    private int salePrice;      //판매단가
}
