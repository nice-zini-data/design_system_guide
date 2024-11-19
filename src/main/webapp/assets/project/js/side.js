$(function(){
    sideListSearch();
});

const sideListSearch = () => {
    $('.sideListSearchShow').hide();

    $('#sideSearch').keyup(function(){

        var searchValue = $(this).val().toLowerCase();
        var matchedItems = [];

        $('.sideListSub li').each(function() {
            var listItem = $(this);
            var dataName = listItem.data('name').toLowerCase();

            if (dataName.includes(searchValue)) {
                listItem.show();
                matchedItems.push(listItem.data('name'));
                $('.sideListSearchShow').show();
            }else {
                listItem.hide();
            }

        });

        // Update the preview list
        var previewList = $('.sideListSearchShow');
        previewList.empty();

        var searchInput = $('#sideSearch').val();
        matchedItems.forEach(function(item) {
            previewList.append('<li>' + item + '</li>')

            if(searchInput == 0 || searchInput == ''){
                $('.sideListSearchShow').hide();
            }

        });
    });
}

const sideSearchEnter = () => {

}