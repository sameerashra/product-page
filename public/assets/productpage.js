$(document).ready(function(){

    $('li').on('click',function(){
        var item=$(this).text().replace(/ /g,'-');
       
        $.ajax({
            url: '/cart/'+item,
            success: function(data){
                location.reload();
                alert('Item added.')
            }
        });
    });
});