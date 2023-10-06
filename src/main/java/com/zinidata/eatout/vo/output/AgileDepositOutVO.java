package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileDepositOutVO {

    //output
    private String  ctyNm;          //시군구
    private String  ctyCd;          //시군구 코드
    private double  per;            //전월대비 퍼센트
    private int     thisDeposit;    //평균 보증금
}
