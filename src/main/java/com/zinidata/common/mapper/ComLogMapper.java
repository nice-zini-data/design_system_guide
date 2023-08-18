package com.zinidata.common.mapper;

import com.zinidata.common.vo.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface ComLogMapper {

    // 서비스 로그 저장
    int setServiceLog(ComLogVO comLogVO);
}
