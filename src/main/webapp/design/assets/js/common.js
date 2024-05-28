/**
 * 공통 자바스크립트 함수
 */
common = {};

common.isEmpty = function(value){
    if(typeof value === 'function'){
        return false;
    }
    return (value == null || value.length === 0);
}

/* 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다. */
common.nvl = function(str, defaultStr){
    return !str ? defaultStr : str;
}


/* Date Type 체크 */
common.isDate = function(value){
    var date = new Date(value);
    return !this.isEmpty(date);
}

/* Date to Number 변환 ex.) 2019-05-13 ==> 20190513 */
common.dateToNumber = function(date){
    if(this.isEmpty(date)){
        dalbitLog("[dateToNumber] 데이터가 Null 입니다. (" + date + ")" )
        return "-";
    }

    if(this.isDate(date)){
        dalbitLog("[dateToNumber] Date 형식이 아닙니다. (" + date + ")" )
        return "-";
    }

    var regExp = /\d/gi;
    return date.toString().replace(regExp, "");
}

common.getMaxDay = function(year, month){
    var date = new Date(year, month, 0);

    if(this.isEmpty(date)) return 0;

    return date.getDate();
}

common.addComma = function(value, blank, dot){
    if(common.isEmpty(value)){
        return 0;
    }
    if(value == "null" || value == "NaN" || isNaN(value)){
        return 0;
    }
    if(!common.isEmpty(blank) && value == 0) {
        if (blank == "Y") {
            return '';
        }
    }
    if (value === Infinity || value === Infinity) {
        return 0;
    }
    if(!common.isEmpty(dot)){
        value = Math.round(value, dot);
    }else{
        value = Math.round(value, 0);
    }
    var regExp = /\B(?=(\d{3})+(?!\d))/g;
    return value.toString().replace(regExp, ",");
}

common.removeComma = function(value){
    if(common.isEmpty(value)){
        return 0;
    }
    var regExp = /,/gi;
    return value.toString().replace(regExp, "");
}

common.convertToDate = function(date, format){
    if(this.isEmpty(date)){
        return "-";
    }else if(date.length == 14 || 0 < Number(date)){
        var regExp = /(\d{8})(\d{6})/;
        date = date.toString().replace(regExp, '$1 $2');
    }
    if(this.isEmpty(format)){
        format = "YYYY.MM.DD HH:mm:ss";
    }
    return moment(date).format(format);
}

common.convertSort = function(value){
    return this.isEmpty(value) ? null : (value === 'asc') ? 0 : 1;
}

common.getValue = function(value){
    return typeof(value) == 'function' ? value() : value;
}

common.replace = function(value, from, to){
    var string = this.getValue(value);
    var from = this.getValue(from);
    var to = this.getValue(to);

    return string.replace(new RegExp(from, 'gi'), to);
}

common.formatDate = function(date, stringFormat){
    var format = this.getValue(stringFormat);
    format = (format.length) ? format : 'YYYY.MM.DD';
    return moment(this.getValue(date)).format(format);
}

common.replaceHtml = function(text){
    if(!common.isEmpty(text)){
        var tmp = text;
        tmp = tmp.replaceAll(/\\n/gi, '');
        tmp = tmp.replace(/&amp;/gi, "&");
        tmp = tmp.replace(/&lt;/gi, "<");
        tmp = tmp.replace(/&gt;/gi, ">");
        tmp = tmp.replace(/&quot;/gi, '"');
        tmp = tmp.replace(/&#39;/gi, "'");
        tmp = tmp.replace(/&#40;/gi, "(')");
        tmp = tmp.replace(/&#41;/gi, ")");
        return tmp;
    }
}

common.replaceHtml_json = function(text){
    if(!common.isEmpty(text)){
        text = text.replace(/\\n/g, '');
        text = this.replace(text, /\\\\/g, "\\");
        text = this.replace(text, "&lt;", "<");
        text = this.replace(text, "&gt;", ">");
        text = this.replace(text, "&amp;", "&");
        return text;
    }
}

common.replaceTag = function(text){
    if(!common.isEmpty(text)){
        text = text.replace(/\r\n/g, '<br/>');
        text = text.replace(/\n/g, '<br/>');
        text = text.replace(/\t/g, ' ');
        return text;
    }
}

common.lpad = function(s, padLength, padString){
    s = String(s);
    while(s.length < padLength)
        s = padString + s;
    return s;
}

common.rpad = function(s, padLength, padString){
    s = String(s);
    while(s.length < padLength)
        s = s + padString;
    return s;
}

common.timeStampAll = function(time){
    if(!common.isEmpty(time) && time != 0){
        time = parseInt(time);
        var day = Math.floor(time / 60 / 60 / 24);
        var day_s = day * 60 * 60 * 24;
        var hours_s = time - (day_s);
        var hours = Math.floor(hours_s / 60 / 60);
        var minutes_s = time - (day_s + (hours * 60 * 60));
        var minutes = Math.floor(minutes_s / 60);
        var seconds = time - ((day * 60 * 60 * 24) + (hours * 60 * 60) + (minutes * 60) );

        if(hours < 10){
            hours = '0'+hours;
        }
        if(minutes < 10){
            minutes = '0'+minutes;
        }
        if(seconds < 10){
            seconds = '0'+seconds;
        }

        if(day > 0){
            return day + " " + hours  + ":" + minutes + ":" + seconds;
        }else{
            return hours  + ":" + minutes + ":" + seconds;
        }
    }else{
        return "";
    }
}

common.phoneNumHyphen = function(value) {
    if(common.isEmpty(value)) {
        return '-';
    }
    var regExp = /(\d{3})(\d{3,4})(\d{4})/
    return value.toString().replace(regExp, '$1-$2-$3');
}

common.scrollTop = function(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    $('#back-to-top').tooltip('show');
};

common.average = function(lvalue, rvalue, point) {
    /*if(lvalue == "null" || lvalue == "NaN" || rvalue == "null" || rvalue == "NaN"){
        return '';
    }
    if (rvalue == 0 || common.isEmpty(rvalue)) {
        return 0;
    }
    if (lvalue == 0 || common.isEmpty(lvalue)) {
        return 0;
    }*/
    var tmp = (lvalue / rvalue) * 100;
    if(!common.isEmpty(point)){
        return tmp.toFixed(point);
    }
    return tmp.toFixed(1);
};

common.division = function(lvalue,rvalue, dot) {
    if (rvalue == 0) {
        return 0;
    }
    var tmp = lvalue / rvalue;
    if(!common.isEmpty(dot)){
        return common.addComma(tmp.toFixed(dot));
    }else{
        return common.addComma(tmp.toFixed(1));
    }
};

common.substr = function(value, st, ed){
    if(common.isEmpty(value)) {
        return "";
    }

    if(ed > 0){
        return value.substr(st,ed);
    }else{
        return value.substr(st);
    }
};

common.upAndDownClass = function(value){
    var result = '';
    if(0 < Number(value)){
        result = 'up';
    }else if(Number(value) < 0){
        result = 'down';
    }else{
        result = '';
    }
    return result;
}

/*common.escapeHtml = function(text){
    if(!common.isEmpty(text)){
        text = this.replace(text,"'","$#34;");
        return text;
    }
}*/
common.toDay = function (){
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day;

    return dateString;
}

common.toTime = function (){
    var today = new Date();

    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);

    var timeString = hours + ':' + minutes  + ':' + seconds;

    return timeString;
}

common.toDateTime = function (){
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);

    var dateString = year + '-' + month  + '-' + day;
    var timeString = hours + ':' + minutes  + ':' + seconds;


    return dateString + " " + timeString;
}

common.growthRate = function(before, after, dot){
    var result = (((after - before) / before) * 100);

    if(!common.isEmpty(dot)){
        result = Math.round(result, dot);
    }else{
        result = Math.round(result, 1);
    }
    if(isNaN(result)){
        result = 0;
    }
    return result;
}

common.getTodayTime = function(){
    var date = new Date();
    var yyyy = date.getFullYear(); // 년도
    var MM = ("0" + (1 + date.getMonth())).slice(-2);
    var dd = ("0" + date.getDate()).slice(-2);
    var hh = ("0" + date.getHours()).slice(-2); // 시
    var mm = ("0" + date.getMinutes()).slice(-2); // 분
    var ss = ("0" + date.getSeconds()).slice(-2); // 초

    return yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
}

// 절대값으로 변경
common.abs = function(val){
    var tmp = Number(val);
    return Math.abs(tmp);
}

common.proj4 = function(val, gubun) {
    Proj4js.defs["EPSG:6645"] = '+proj=tmerc +lat_0=38.0 +lon_0=128.0 +x_0=400000.0 +y_0=600000.0 +k=0.9999 +ellps=bessel +a=6377397.155 +b=6356078.9628181886 +units=m +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43';
    Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    var _6645 = new Proj4js.Proj("EPSG:6645");
    var _4326 = new Proj4js.Proj("EPSG:4326");
    var pt = new Proj4js.Point(val.x, val.y);	//포인트 생성
    var result = (gubun == 6645) ? Proj4js.transform(_4326,_6645,pt) : Proj4js.transform(_6645, _4326, pt);
    return result;
}

common.changeRate = function(val1,val2) {

    return (((val1-val2)/val1)*100).toFixed(2);

}

common.setDate = function(value,type,year) {
// 기준월 이전 3년,2년,1년,반년,
// 기준년 이후 반년,1년
//     console.log(value.substr(0,4)+' / '+value.substr(4,6)-1);
    let date = new Date(value.substr(0,4),value.substr(4,6)-1);
    let date1 = new Date(value.substr(0,4),value.substr(4,6)-1);
    let month1 = '';
    let month2 = '';

    //console.log('param : '+ value + ' : ' + type + ' : ' + year );
    // console.log('setDate : ' +date.getFullYear()+' / '+(date.getMonth()+1));
    // console.log('setDate1 : ' +date1.getFullYear()+' / '+(date1.getMonth()+1));

    if(type == 'after') {
        if (year < 1) {
            if ((date.getMonth() + 1) > 10) {
                month1 = (date.getMonth() + 1);
            } else {
                month1 = '0' + (date.getMonth() + 1);
            }
            date1.setMonth((date1.getMonth() + (year * 10)));
            if ((date1.getMonth() + 1) > 10) {
                month2 = (date1.getMonth() + 1);
            } else {
                month2 = '0' + (date1.getMonth() + 1);
            }
        } else {
            date.setFullYear(date.getFullYear() + (year - 1));
            date1.setFullYear(date1.getFullYear() + year);
            month1 = (date.getMonth() + 1);
            month2 = (date1.getMonth() + 1);
        }

        // return date.getFullYear() + '.' + month1 + ' ~   ' + date1.getFullYear() + '.' + month2;
        return date1.getFullYear() + '.' + common.lpad(month2,2,'0');
    }else if(type == 'quarter'){
        // 기준 분기 확인
        // console.log('default Month : '+(date.getMonth()+1));
        date.setMonth((date.getMonth()+year));
        // console.log('change Month : '+(date.getMonth()+1));
        // console.log("month : "+(date.getMonth()+1) + ' / quarter is : '+Math.ceil((date.getMonth()+ 1)/3));

        return date.getFullYear() + '.' + common.lpad(Math.ceil((date.getMonth()+ 1)/3), 2, '0');
    }else{
        if(year < 1) {
            if((date.getMonth()+1) > 10){
                month1 = (date.getMonth()+1);
            }else{
                month1 = '0'+(date.getMonth()+1);
            }
            date1.setMonth((date1.getMonth() - (year * 10)));
            if((date1.getMonth() +1) > 10){
                month2 = (date1.getMonth() +1)
            }else{
                month2 = '0'+(date1.getMonth()+1)
            }
        }else{
            date.setFullYear(date.getFullYear() - (year-1));
            date1.setFullYear(date1.getFullYear() - year);
            month1 = (date.getMonth()+1);
            month2 = (date1.getMonth()+1);
        }
        // console.log('before_date : '+date1.getFullYear()+'.'+month1+ ' ~ ' + date.getFullYear()+'.'+month2);
        // return date1.getFullYear()+'.'+month2+ ' ~ ' + date.getFullYear()+'.'+month1;
        return date1.getFullYear()+'.'+common.lpad(month2, 2, '0');
    }
}

common.minus = function(val1, val2){
    return Number(val1) - Number(val2);
}

common.minus = function(val1, val2){
    return Number(val1) - Number(val2);
}

common.checkSpace = function(str) {
    if(str.search(/\s/) != -1) {
        return true;
    } else {
        return false;
    }
}

// 특수 문자가 있나 없나 체크
common.checkSpecial = function(str) {
    var special_pattern = /[~!@#$%^&*()]/gi;

    if(special_pattern.test(str) == true) {
        return true;
    } else {
        return false;
    }
}

// 비밀번호 패턴 체크 (8자 이상, 문자, 숫자, 특수문자 포함여부 체크)
common.checkPasswordPattern = function(str) {
    var pattern1 = /[0-9]/;				// 숫자
    var pattern2 = /[a-zA-Z]/;			// 문자
    var pattern3 = /[~!@#$%^&*()]/;	// 특수문자

    if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str) || str.length < 8) {
        alert("비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성하여야 합니다.");
        return false;
    } else {
        return true;
    }
}


// 가져온 날짜 형식 바꿔 보내기
// 필요한 유형있으면 추가해주세요.
common.getDateString = function(val, gubun) {
    var date = val;
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hh = ("0" + date.getHours()).slice(-2); // 시
    var mm = ("0" + date.getMinutes()).slice(-2); // 분
    var ss = ("0" + date.getSeconds()).slice(-2); // 초
    var dateString = "";

    if(gubun == "YYYY-MM-DD"){
        dateString = year + '-' + month  + '-' + day;
    }else if(gubun == "YYYY-MM-DD HH24:MI:SS"){
        dateString = year + '-' + month  + '-' + day + " " + hh + ":" + mm + ":" + ss;
    }else if(gubun == "YYYY-MM-DD HH24:MI"){
        dateString = year + '-' + month  + '-' + day + " " + hh + ":" + mm;
    }
    return dateString;
}


// 표준편차 구하는 함수
common.standardDeviation = function(array) {
    var sum = 0;
    var n = array.length;
    for (var i = 0; i < n; i++) {
        sum += array[i];
    }
    var mean = sum / n;
    var variance = 0;
    for (var i = 0; i < n; i++) {
        variance += (array[i] - mean) ** 2;
    }
    var standardDeviation = Math.sqrt(variance / n);
    return standardDeviation;
}

// 반올림 함수
common.round = function(number, decimals) {
    if(common.isEmpty(decimals)){
        decimals = 0;
    }
    var multiplier = Math.pow(10, decimals);
    return Math.round(number * multiplier) / multiplier;
}

common.checkDateAfter = function(sdate,edate){
    if(sdate > edate){
        alert('종료일을 시작일보다 이후로 선택하셔야됩니다.');
    }
}

common.fileDownload = function(url,param){


    $.ajax({
        url: url,
        data: param,
        type: 'POST',
        cache: false,
        xhrFields: {
            responseType: "blob",
        },
    }).done(function (blob, status, xhr) {
        console.log(status);
        if(status == 'success'){    // check for a filename
            var fileName = "";
            var disposition = xhr.getResponseHeader("Content-Disposition");

            if (disposition && disposition.indexOf("attachment") !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);

                if (matches != null && matches[1]) {
                    fileName = decodeURI(matches[1].replace(/['"]/g, ""));
                }
            }
            // for IE
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (fileName) {
                    var a = document.createElement("a");

                    // for safari
                    if (a.download === undefined) {
                        window.location.href = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
                    window.location.href = downloadUrl;
                }
            }
        }
    });

}