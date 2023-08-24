package com.zinidata.eatout.mapper;

import com.zinidata.eatout.vo.AgileFileVO;
import com.zinidata.eatout.vo.output.AgileFileOutVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface AgileFileMapper {

    ArrayList<AgileFileOutVO> getFileList(AgileFileVO agileFileVo);
    int setFileDelete(AgileFileVO agileFileVo);

    int setFileUpload(AgileFileVO agileFileVO);
}
