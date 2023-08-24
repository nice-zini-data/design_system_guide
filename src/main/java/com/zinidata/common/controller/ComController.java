package com.zinidata.common.controller;

import com.zinidata.common.service.ComLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/common")
public class ComController {

	private final ComLogService comLogService;
	@PostMapping("fileDownLoad")
	public String fileDownLoad(HttpServletRequest request, HttpServletResponse response) {
		// comLogService.setServiceLog(request, response, 0);
		return "fileDownLoad";
	}

}
