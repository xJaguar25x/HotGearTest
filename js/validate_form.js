/**
 * Created by Jaguar25 on 21.02.2018.
 */
$(function() {
    //при нажатии на кнопку с id="send"
    $('#send').click(function() {
        //переменная formValid
        var formValid = true;
        //перебрать все элементы управления input 
        $('input').each(function() {
            //найти предков, которые имеют класс .form-gr, для установления success/error
            var formGr = $(this).parents('.form-gr');
            //найти glyphicon, который предназначен для показа иконки успеха или ошибки
            var glyphicon = formGr.find('.form-control-feedback');
            //для валидации данных используем HTML5 функцию checkValidity
            if (this.checkValidity()) {
                //добавить к formGr класс .has-success, удалить has-error
                formGr.addClass('has-success').removeClass('has-error');
                //добавить к glyphicon класс glyphicon-ok, удалить glyphicon-remove
                glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');
                formGr.find('.input').addClass('form-control-success');//.removeClass('form-control-error');
                console.log(formGr.find('.input'));
            } else {
                //добавить к formGr класс .has-error, удалить .has-success
                formGr.addClass('has-error').removeClass('has-success');
                //добавить к glyphicon класс glyphicon-remove, удалить glyphicon-ok
                glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');
                formGr.find('.input').addClass('form-control-success');//.removeClass('form-control-success');
                //отметить форму как невалидную 
                formValid = false;
            }
        });
        //если форма валидна, то
        if (formValid) {
            //сркыть модальное окно
            $('#myModal').modal('hide');
            //отобразить сообщение об успехе
            $('#success-alert').removeClass('hidden');
        }
    });
});