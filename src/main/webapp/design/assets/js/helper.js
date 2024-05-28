
/**
 * Number Add Comma
 * 숫자 콤마 추가
 */
Handlebars.registerHelper("addComma", function (value,blank) {
    return common.addComma(value, blank);
})


/**
 * Number Remove Comma
 * 숫자 콤마 제거
 */
Handlebars.registerHelper("removeComma", function (value) {
    return common.removeComma(value);
})


/**
 * Number Convert To Date
 * 숫자를 날짜로 변환
 *
 *  # Format
 *   ex.) YYYY-MM-DD HH:mm:ss:SSS
 *
 */
Handlebars.registerHelper("convertToDate", function (date, format) {
    if(common.isEmpty(date)){
        return "-";
    }
    if(common.isEmpty(format)){
        format = "YYYY.MM.DD";
    }
    return moment(date).format(format);
})

/**
 * Date 구분자 제거
 *
 */
Handlebars.registerHelper("dateToNumber", function (value) {
    var regExp = /\d/gi;

    return value.toString().replace(regExp, "");
})

Handlebars.registerHelper("replaceString", function (value,valString,chgString) {

    return value.replaceAll(valString, chgString);

})

Handlebars.registerHelper("splitBr", function (value,valString) {

    var t = value.split(valString);
    // console.log(t.length);
    var tmp = [];
    for(var i = 0; i < t.length; i++){
        // console.log(t[i]);
        tmp.push(t[i]+ " <br/>")
    }
    // console.log(tmp);
    return tmp;
})

Handlebars.registerHelper('json', function(obj) {
    return JSON.stringify(obj);
});


/**
 * if
 *
 * ex.)
 * {{#dalbit_if value1 "==" "test1"}}
 *      true code      {{! value1 == "test1" }}
 * {{else}}
 *      false code      {{! value1 != "test1" }}
 * {{/dalbit_if}}
 *
 */
Handlebars.registerHelper("ifCond", function(v1, operator, v2, options){
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
})


/**
 *  테이블 목록 index
 */
Handlebars.registerHelper("index", function(index, no)
{
    return common.isEmpty(index) ? no : parseInt(index) + 1;
});

Handlebars.registerHelper("indexDesc", function(totalCnt, rownum)
{
    return common.isEmpty(totalCnt) ? 0 : totalCnt - rownum + 1;
});

Handlebars.registerHelper("indexDescWithoutRownum", function(totalCnt, pageStart, pageCnt, index)
{
    return common.isEmpty(totalCnt) ? 0 : totalCnt - ((pageStart - 1) * pageCnt) - index;
});

Handlebars.registerHelper("getCommonCodeText", function(value, targetCode)
{
    return util.getCommonCodeText(value, targetCode);
});

Handlebars.registerHelper("getCommonCodeSelect", function(value, targetCode, isExcludeAllYn, name)
{
    return util.getCommonCodeSelect(value, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("getCommonCodeSelectForName", function(value, targetCode, isExcludeAllYn, name)
{
    return util.getCommonCodeSelectForName(value, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("getCommonCodeRadio", function(value, targetCode, isExcludeAllYn, name)
{
    return util.getCommonCodeRadio(value, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("getCommonCodeCheck", function(value, targetCode, isExcludeAllYn, name)
{
    return util.getCommonCodeCheck(value, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("replaceHtml", function(value)
{
    return common.replaceHtml(value);
});

Handlebars.registerHelper("replaceHtml_json", function(value)
{
    return common.replaceHtml_json(value);
});

Handlebars.registerHelper("equal", function (value, value2, opt){
    return common.equal(value, value2, opt);
});

Handlebars.registerHelper("getOnOffSwitch", function(value, name){
   return util.getOnOffSwitch(value, name);
});

Handlebars.registerHelper("timeStamp", function(value) {
   return common.timeStamp(value);
});

Handlebars.registerHelper("timeStampAll", function(value) {
    return common.timeStampAll(value);
});

Handlebars.registerHelper("phoneNumHyphen", function(value) {
    return common.phoneNumHyphen(value);
});

Handlebars.registerHelper("fontColor", function(value, minValue, fontColor) {
    return common.fontColor(value, minValue, fontColor);
});

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": common.addComma(lvalue + rvalue),
        "-": common.addComma(lvalue - rvalue),
        "*": common.addComma(lvalue * rvalue),
        "/": common.addComma(lvalue / rvalue),
        "%": common.addComma(lvalue % rvalue)
    }[operator];
});

Handlebars.registerHelper("evalJS_isEmpty", function(varName, options) {
    var v = eval(varName);

    if(common.isEmpty(v)){
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});

Handlebars.registerHelper("isChild", function(birthDate, options) {
    return common.isChild(birthDate) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("substr", function(value, st, ed) {
    return common.substr(value,st, ed);
});

Handlebars.registerHelper("moment", function(value, format) {
    return moment(value).format(format);
});

Handlebars.registerHelper("isCurrentDisplay", function(is_view, startDate, endDate) {

    var on_text = '<span style="color:blue;">ON</span>';
    var off_text = '<span style="color:gray">OFF</span>';

    if(is_view == 1){
        if(startDate != '0000-00-00 00:00:00'){
            var start = moment(startDate).format('YYYYMMDDHHmmss');
            var end = moment(endDate).format('YYYYMMDDHHmmss');
            var current = moment(new Date()).format('YYYYMMDDHHmmss');
            if(start <= current && current <= end){
                return on_text;
            }else{
                return off_text;
            }
        }
        return on_text
    }
    return off_text;
});

Handlebars.registerHelper('getCommonCodeRadio', function(code, targetCode, isExcludeAllYn, name){
    return util.getCommonCodeRadio(code, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper('getCommonCodeCheck', function(code, targetCode, isExcludeAllYn, name){
    return util.getCommonCodeCheck(code, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper('getCommonCodeSelect', function(code, targetCode, isExcludeAllYn, name){
    return util.getCommonCodeSelect(code, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper('getCommonCodeSelectForName', function(code, targetCode, isExcludeAllYn, name){
    return util.getCommonCodeSelectForName(code, targetCode, isExcludeAllYn, name);
});

Handlebars.registerHelper("split", function (value, pattern ,location) {
    return value.split(pattern)[location];
});

Handlebars.registerHelper("rowNumDesc", function (total, value, pageNo, pageCnt) {
    pageNo = isNaN(Number(pageNo)) ? 1 : pageNo;
    pageCnt = isNaN(Number(pageCnt)) ? 0 : pageCnt;
    return total - value - ((pageNo - 1) * pageCnt);
});

Handlebars.registerHelper("rowNumAsc", function (total, value, pageNo, pageCnt) {
    pageNo = isNaN(Number(pageNo)) ? 1 : pageNo;
    pageCnt = isNaN(Number(pageCnt)) ? 0 : pageCnt;
    return value + ((pageNo - 1) * pageCnt) + 1;
});

Handlebars.registerHelper("upAndDownClass", function(value) {
    return common.upAndDownClass(value);
});

Handlebars.registerHelper("getCodeSelect", function(code, id, allYn, selectVal) {
    return util.getCodeSelect(code, id, allYn, selectVal);
});

Handlebars.registerHelper("getCodeMultiSelect", function(code, id, allYn) {
    return util.getCodeMultiSelect(code, id, allYn);
});

Handlebars.registerHelper("getCodeLabel", function(code, id) {
    return util.getCodeLabel(code, id);
});

Handlebars.registerHelper("rankCheck", function (value,checkRnk) {

    let returnVal = '';

    value.forEach((item,idx)=>{
        if(item.cntRnk == checkRnk){
            returnVal = item.typeNm;
        }
    });

    return returnVal;
})

Handlebars.registerHelper("rankChg", function (value,type,rnk) {
    if(common.isEmpty(value)){
        return "";
    }

    let returnVal = "";
    let tmpArr = [];
    let size = 0;

    if(!(value == undefined || value == '')){

        value.sort((a,b) => {
            if(type == 'percnt2'){
                return b.percnt2 - a.percnt2
            }else if(type == 'percnt3'){
                return b.percnt3 - a.percnt3
            }
        })

        if(value.length > rnk){
            size = rnk;
        }else{
            size = value.length;
        }

        for (var i = 0, j = size; i < j; i++) {
            if(type == 'percnt2'){
                returnVal += value[i].label + ' ' + value[i].percnt2 ;
            }else if(type == 'percnt3'){
                returnVal += value[i].label + ' ' + value[i].percnt3 ;
            }
            if(i != value.length){
                returnVal += ' %<br> '
            }
        }
    }else{
        returnVal = '데이터가 없습니다.'
    }
    return returnVal;
})

Handlebars.registerHelper("numCalc", function (valueA,valueB,operator,point) {

    if(point == null || point == '' || point == 0 ){
        point = 0;
    }

    switch (operator) {
        case '+':
            return (valueA + valueB).toFixed(point);
        case '-':
            return (valueA - valueB).toFixed(point);
        case '/':
            return (valueA / valueB).toFixed(point);
        case '*':
            return (valueA * valueB).toFixed(point);
    }
})

Handlebars.registerHelper("setRound", function (value,size) {
    // if(common.isEmpty(value)){
    //     return 0;
    // }
    return (Number(value)).toFixed(size);
})

Handlebars.registerHelper("setNum", function (value,setVal) {

    return (value/setVal).toFixed(0);
})

Handlebars.registerHelper("checkUpDown", function (value) {
    if(value > 0){
        return "up_p";
    }else if(value < 0){
        return "down_p";
    }else{
        return "";
    }
})
Handlebars.registerHelper("checkDot", function (value) {

    switch (value) {
        case 'Gold Olive':
            return 'dot5';
        case 'Black Olive':
            return 'dot6';
        case 'Green Olive':
            return 'dot7';
        case 'Pink Olive':
            return 'dot8';
        case 'Baby Olive':
            return 'dot9';
    }
})

Handlebars.registerHelper("listView", function (value,listNum) {

    let tmpArr = [];

    if(value.split(',').length < listNum){
        for(let i = 0; i < value.split(',').length; i++){
            tmpArr += value.split(',')[i] + '<br>';
        }
    }else{
        for(let i = 0; i < listNum; i++){
            tmpArr += value.split(',')[i] + '<br>';
        }
    }

    return tmpArr;
})

// 수정 필요
Handlebars.registerHelper("LabelDate", function (yyyymm) {

    let returnVal = '';
    let now = new Date(yyyymm.substring(0,4)+'-'+yyyymm.substring(5,6)); // 2002년 1월 1일 09:00:00

    for (let i = 0; i < 4; i++) {
        let title = (3-i) + 'year'
        let tmp = (now.getFullYear()-(3-i))+'.'+yyyymm.substring(4,6)+ '~' + (now.getFullYear()-(2-i))+'.'+yyyymm.substring(4,6)
        returnVal += '<th scope="col" width="8.3%"><span class="table_date">' + tmp + '</span></th>';
    }

    let tmp = (now.getMonth()-6)+ '~' +now.getMonth()
    returnVal += '<th scope="col" width="8.3%"><span class="table_date">' + tmp + '</span></th>';

    tmp = (now.getMonth())+ '~' +(now.getMonth()+6)
    returnVal += '<th scope="col" width="8.3%"><span class="table_date">' + tmp + '</span></th>';

    return returnVal;
})

Handlebars.registerHelper("typeListSort", function (value,type) {

    let tmpMArr = [];
    let tmpWArr = [];
    let returnVal = '';
    let idx = 1;

    for(let i = 0; i < value.length; i++){
        if(value[i].type == type){
            let tmpVal = value[i];
            delete tmpVal.type;
            for(key in tmpVal) {
                if(idx <= ( Object.keys(tmpVal).length/ 2)) {
                    tmpMArr.push('<td>'+common.addComma(tmpVal[key],'N')+'</td>');
                }else{
                    tmpWArr.push('<td>'+common.addComma(tmpVal[key],'N')+'</td>');
                }
                idx++;
            }
            for(let j = 0; j < tmpMArr.length; j++){
                returnVal += tmpMArr[j];
                returnVal += tmpWArr[j];
            }
            tmpVal.type = type;
        }
    }
    return returnVal;
})

Handlebars.registerHelper("blkTypeNmChg", function (value) {
    if(common.isEmpty(value)){
        return "";
    }

    let tmpStr = [];
    let returnVal = '';
    tmpStr = value.split(' ');

    if(tmpStr[0].replace('입지','') == '1'){
        returnVal = '상권규모 상위 0~1%'
    }else if(tmpStr[0].replace('입지','') == '2') {
        returnVal = '상권규모 상위 1~3%'
    }else if(tmpStr[0].replace('입지','') == '3') {
        returnVal = '상권규모 상위 3~5%'
    }else if(tmpStr[0].replace('입지','') == '4') {
        returnVal = '상권규모 상위 5~7%'
    }else if(tmpStr[0].replace('입지','') == '5') {
        returnVal = '상권규모 상위 7~10%'
    }else if(tmpStr[0].replace('입지','') == '6') {
        returnVal = '상권규모 상위 10~20%'
    }else if(tmpStr[0].replace('입지','') == '7') {
        returnVal = '상권규모 상위 20~30%'
    }else if(tmpStr[0].replace('입지','') == '8') {
        returnVal = '상권규모 상위 30~50%'
    }else if(tmpStr[0].replace('입지','') == '9') {
        returnVal = '상권규모 상위 50~70%'
    }else if(tmpStr[0].replace('입지','') == '10') {
        returnVal = '상권규모 상위 70~100%'
    }else{
        returnVal = '';
    }
    if(!common.isEmpty(returnVal)){
        returnVal += ', ';
    }

    if(tmpStr[1] == '상업형'){
        returnVal += '상업지 입점업종(주점, 숙박, 노래방, 영화관 등)이 많은 지역'
    }else if(tmpStr[1] == '주거형'){
        returnVal += '주거지 입점업종(학원, 약국, 세탁, 식료품 등)이 많은 지역'
    }else if(tmpStr[1] == '소매형'){
        returnVal += '소매업종(의류, 패션잡화, 가전, 가구 등) 이 많은 지역'
    }else if(tmpStr[1] == '상업주거형'){
        returnVal += '상업지 입점업종과 주거지 입점업종 비중이 5:5 비율로 나타나는 지역'
    }else if(tmpStr[1] == '혼합형'){
        returnVal += '상업+주거+소매형 업종이 4:3:3 비율로 나타나는 지역'
    }else{
        returnVal += '';
    }

    return returnVal;
})

Handlebars.registerHelper("calcUpDown", function (value1,value2) {

    let tmpVal = 0;

    tmpVal = value2 - value1

    if(tmpVal > 0){
        return '<span class="up_p">+'+ tmpVal.toFixed(1) + '%</span>'
    }else if(tmpVal < 0){
        return '<span class="down_p">'+ tmpVal.toFixed(1) + '%</span>'
    }else{
        return '<span> 0%</span>'
    }


})

Handlebars.registerHelper("getAverage", function (value1,value2,point) {

    return common.average(value1,value2,point)

})

Handlebars.registerHelper("getChangeRate", function (value1,value2) {
    // console.log('val1 : '+value1 + ' : val2 : '+ value2);

    let tmpVal = common.changeRate(value1,value2);

    // console.log('tmpVal is : '+tmpVal);


    if(tmpVal > 0){
        return '<span class="up_p">+'+ tmpVal + '%</span>'
    }else if(tmpVal < 0){
        return '<span class="down_p">'+ tmpVal + '%</span>'
    }else{
        return '<span> 0%</span>'
    }

})

Handlebars.registerHelper("setDateInfo", function (value,type,year) {
    var tmp = common.setDate(value,type,year);
    // console.log(tmp);
    return tmp.substring(2,4) + "." + tmp.substring(5,7);
})

Handlebars.registerHelper("minus", function (val1,val2) {
    return common.minus(val1,val2);
})

Handlebars.registerHelper("isEmptyData", function(col, row) {
    if(common.isEmpty(col)) col = 1;
    if(common.isEmpty(row)) row = 1;
    var html = '<td colspan="'+col+'" rowspan="'+row+'">조회된 데이터가 없습니다.</td>';
    return html;
});

Handlebars.registerHelper("growthRate", function (before, after, dot) {
    return common.growthRate(before, after, dot);
});

Handlebars.registerHelper("chgAbs", function (value) {
    return Math.abs(value);
});

