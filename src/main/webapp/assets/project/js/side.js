$(function(){
    sideListSearch();
});

const sideListSearch = () => {
    const sideSearch = document.getElementById('#sideSearch');
    const sideListArr = document.querySelectorAll('.sideListSub li');
    console.log(sideListArr);
    const sideList = {}

    $('#sideSearch').on("keyup", function(){
        const listSearch = $('#sideSearch').value;

        sideListArr.forEach(function(e){
            if(!listSearch && listSearch === ''){
                return console.log('hide')
            }

            const dataList = e.dataset.name;
            console.log(dataList)
            if(listSearch.charAt(0) === dataList.charAt(0)){
                console.log('on')

            }else{
                console.log('hide')
            }
        });

    });
}