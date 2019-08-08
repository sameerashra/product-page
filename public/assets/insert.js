$(document).ready(function(){
    $('form').on('submit',function(){
        var item=$('form input');
        var todo={name: item[0].value, brand: item[1].value, description: item[2].value};

        $.ajax({
            type: 'POST',
            url: '/insert',
            data: todo,
            success: function(data){
                location.reload();
            }
        });
        return false;
    });
});