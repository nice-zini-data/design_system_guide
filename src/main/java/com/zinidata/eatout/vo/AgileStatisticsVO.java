package com.zinidata.eatout.vo;

import lombok.Data;

@Data
public class AgileStatisticsVO {

    private String mainType;    //데이터 타입(외식,배달,메뉴,생활,주거)
    private String admGb;
    private String megaCd;      // 시/도
    private String ctyCd;       // 시/군/구
    private String admiCd;      // 읍/면/동
    private String areaCd;
    private String upjongType;
    private String upjongCd;    // 공통 사용 업종
    private String upjong1Cd;   // 대분류 업종
    private String upjong2Cd;   // 중분류 업종
    private String upjong3Cd;   // 소분류 업종
    private String dateType;    // 기간타입
    private String dateStart;   // 년도기준 시작
    private String subDateStart;   // 년도기준 시작
    private String dateEnd;     // 년도기준 종료
    private String subDateEnd;   // 년도기준 시작
    private String columnType;  // 항목 타입(총 매출, 점포당 매출,....)
    private String menuType;    // 메뉴 타입선택(대분류 : 1 /중분류 : 2/소분류 : 3)
    private String menuCd;      // 선택메뉴 코드
    private String dataType;    // 선택 메뉴타입
    private String posType;    // 선택 포스타입
}
