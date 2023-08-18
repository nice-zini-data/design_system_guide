package com.zinidata.common.vo;

import lombok.Data;

@Data
public class ComLogVO {

    //input
    private String sDate;
    private String eDate;
    private String loginId;

    //output
    private int seqNum;
    private String stTime;
    private int memNo;
    private String logType;
    private String prjType;
    private String detail;
    private String ip;

}
