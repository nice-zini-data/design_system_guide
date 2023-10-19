package com.zinidata.eatout.vo;

import lombok.Data;

@Data
public class AgileFoundationCalcVO {

    private int     rentArea1;     // 임대면적(평)
    private int     rentArea2;     // 임대면적(m)
    private int     area1;          // 실면적(평)
    private int     area2;          // 실면적(m2)
    private String  flow;           // 층수(A:1층,B:2층,C:지하,D:3층 이상)
    private String  region;         // 유형(A:활성화 지역, B:비활성화 지역)
    private int     toojaCost1;    // 권리금
    private int     toojaCost2;    // 보증금
    private int     toojaCost3;    // 대출금
    private int     toojaCost4;    // 이자
    private int     toojaCost5;    // 기타 투자비(설비, 인테리어, 교육비, 가맹비 등)
    private int     toojaCost6;    // 감가상각 기간
    private int     operCost1;     // 월세
    private int     operCost2;     // 인건비
    private int     operCost3;     // 재료비
    private int     operCost4;     // 기타비용(공과잡비 등)
    private int     dangaCost;     // 객 단가
}
