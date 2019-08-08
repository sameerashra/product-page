$(document).ready(function(){

    $('li').on('click',function(){
        var item=$(this).text().replace(/ /g,'-');       
        $.ajax({
            type: 'DELETE',
            url: '/delete/'+item,
            success: function(data){
                location.reload();
                alert('Item removed.')
            }
        });
    });
});