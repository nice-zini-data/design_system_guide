package com.zinidata.eatout.vo.output;

import lombok.Data;
@Data
public class AgileFoundationCalcOutVO {

    //월 고정비용
    private int     cost1;      // 월세
    private int     cost2;      // 인건비(고정인력)
    private int     cost3;      // 초기투자비에 대한 월 발생비용
    private int     cost4;      // 기타비용
    private int     sum1;       //  소계
    //월 변동비용
    private int     cost5;      // 재료비
    private int     cost6;      // 인건비(변동인력)
    private int     sum2;       //  소계
    private int     total1;     //총 비용(세전)
    private int     total2;     //총 비용(세후)
    //손익분기점
    private int     cost7;      //
    private int     cost8;      //
    //사업타당성 지표(투자비 대비월 3% 수익률)
    private int     cost9;      //
    private int     cost10;     //
    private int     cost11;     //
    // 2년 내 투자비 회수(투자비 대비월 4.2% 수익률)
    private int     cost12;     //
    private int     cost13;     //
    private int     cost14;     //
}
