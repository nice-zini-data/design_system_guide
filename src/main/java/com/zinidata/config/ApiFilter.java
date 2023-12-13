package com.zinidata.config;


import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@WebFilter(urlPatterns = "/*")
public class ApiFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) {
        log.info("=====================Filter TEST  : init ApiFilter=====================");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        log.info("=====================Filter TEST  : doFilter=====================");
        log.info("doFilter ApiFilter, uri : {}", ((HttpServletRequest)servletRequest).getRequestURI());
        log.info("doFilter ApiFilter, uri : {}", ((HttpServletRequest)servletRequest).getRequestURI());
        log.info("=====================Filter TEST  : doFilter=====================");
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.setHeader("X-Frame-Options", "ALLOW-FROM https://www.atfis.or.kr/");
        log.info("doFilter ApiFilter, X-Frame-Options : {}", ((HttpServletRequest)servletRequest).getHeader("X-Frame-Options"));
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
        log.info("=====================Filter TEST  : destroy ApiFilter=====================");
    }
}