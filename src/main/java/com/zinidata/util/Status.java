package com.zinidata.util;

import lombok.Getter;

@Getter
public enum Status {

    //공통
    조회("C001", "select.success", "조회"),
    수정("C002", "update.success", "수정"),
    생성("C003", "insert.success", "생성"),
    삭제("C004", "delete.success", "삭제"),
    성공("C005", "success", "성공"),
    보고서생성_실패("R999", "report.fail", "보고서생성 실패 시"),
    보고서생성_성공("R001", "report.success", "보고서생성 성공 시"),
    메일발송실패("C998", "email.send.fail", "메일 전송 실패 시"),
    실패("C999", "fail", "실패"),
    파라미터오류("C005", "param.error", "파라미터 오류 시"),
    비즈니스로직오류("C006", "business.error", "비즈니스로직 오류 시"),
    데이터없음("0", "no.data", "데이터가 없을 시"),
    처리완료("C008", "operate.success", "처리완료 시"),
    권한없음("C009", "no.auth", "접근 권한이 없을 시"),
    비밀번호오류 ("C010", "password.fail", "비밀번호 틀렸을 시"),
    비밀번호동일 ("C012", "password.same", "변경 비밀번호와 이전 비밀번호가 같을 시"),
    인증번호발송초과 ("C011", "cert.cnt.over", "인정번호 발송 건수 초과"),

    토큰정보오류 ("T999", "token.error", "토큰정보오류시"),
    다른사람이로그인 ("T001", "login.check.error", "다른 사람이 로그인해서 token 정보 변경 되는 경우"),
    ;

    final private String RESULT_SUCCESS = "success";
    final private String RESULT_FAIL = "fail";

    final private String result;
    final private String messageCode;
    final private String messageKey;
    final private String desc;

    Status(String messageCode, String messageKey, String desc){
        this.result = messageKey.contains("success") ? RESULT_SUCCESS : RESULT_FAIL;;
        this.messageCode = messageCode;
        this.messageKey = messageKey;
        this.desc = desc;
    }
}
