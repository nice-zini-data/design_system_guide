var COMMON_CODE = function(type, value, code){
    this.type = type;
    this.value = value;
    this.code = code;
};

var dang_color = [
    new COMMON_CODE('0', '더불어민주당', '#005EE7')
    , new COMMON_CODE('1', '미래통합당', '#ff8383')
    , new COMMON_CODE('2', '기타', '#666')
];


var dang_color_fill = [
    new COMMON_CODE('0', '더불어민주당', 'rgba(0,94,231,0.51)')
    , new COMMON_CODE('1', '미래통합당', 'rgba(255,131,131,0.51)')
    , new COMMON_CODE('2', '기타', 'rgba(102,102,102,0.51)')
]