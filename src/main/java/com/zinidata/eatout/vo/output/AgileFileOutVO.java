package com.zinidata.eatout.vo.output;

import lombok.Data;

@Data
public class AgileFileOutVO {

    //input
    private int     fileNo;
    private String  fileOriNm;
    private String  fileNm;
    private String  filePath;
    private String  fileInfo;
    private String  regDate;

    private int     totalCnt;
    private int     pageNo;
    private int     pageCnt;
}
