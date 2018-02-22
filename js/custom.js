//https://restcountries.eu/rest/v2/name/russia - пример запроса
/* Данная функция создаёт кроссбраузерный объект XMLHTTP */
function getXmlHttp(){
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  };
//
var data;
// после загрузки документа
$( document ).ready(function() {
    $( 'form' ).submit(function( event ) {
        event.preventDefault();
    //    alert($(this).attr('action'));
    //    name = document.forms["reg"].elements["name"].value;
    // alert(document.forms[0].elements[0].value);
    //    return;
        var input_name= document.forms[0].elements[0].value;
        // alert("https://restcountries.eu/rest/v2/name/" + input_name);

        var req = getXmlHttp();
        req.open('GET', "https://restcountries.eu/rest/v2/name/"+ input_name +"?fields=name;flag;col;alpha3Code;languages;borders", true); 
        req.onreadystatechange = function() {
         if (req.readyState == 4) {
           // проверяем статусы ответа на запрос
            if(req.status == 200) {
            
                // парсинг ответа
                data = JSON.parse(req.responseText);
                // вывод получинного объекта
                console.log(data);
                
                console.log(data[0].name); // название страны
                console.log(data[0].flag); // флаг страны
                console.log(data[0].alpha3Code); // alpha3Code страны
                console.log(data[0].languages[0].name); // официальный язык
                //console.log(data[0].languages[1].name); // 2-й язык нужно сделать проверку
                console.log(data[0].borders); // соседние страны 

                
                /*----- обход объекта и формирование блока с кнопками -----*/

                var out_html_str = "";  //  HTML-код кнопок для вставки на сайт              
                var out_id_mass =[]; // массив тегов                 
                var but_id =''; // теги для кнопок

                for (var item in data){
                    // console.log(item + ": " + data[item].name);
                    // записываем теги для кнопок
                    but_id ='btn_pressed_' + item;
                    // создаем HTML-код кнопок для вставки на сайт
                    
                    // имя страны на кнопке
                    // out_html_str +=
                    //     '<div class="btn_city"><button type="button" id="'+ but_id +'" class="btn-default btn-block">'
                    //     + data[item].name + '</button></div>';
                    // имя страны раздельно от кнопки
                    out_html_str += '<div class="btn_city col-lg-12"><div class="col-lg-6"><span>' + item + '. '
                        + data[item].name +
                        '</span></div><div class="col-lg-6"><button type="button" id="'+ but_id +
                        '" class="btn-default">Показать подробнее</button></div></div>';
                    // записываем массив тегов            
                    out_id_mass[item]=but_id;
                }

                // вывод строки с кнопками в блок
                document.getElementById('target_btn').innerHTML = out_html_str;
                

                // console.log( document.getElementById( but_id ) );
                // console.log( out_id_mass );
                for(var i=0; i<out_id_mass.length; i++){      
                  // получаем ссылку на объект дерева(наша кнопка)            
                  out_id_mass[i] = document.getElementById( out_id_mass[i] );  
                  // вешаем обработчикк      
                  out_id_mass[i].addEventListener('click', handler);      
// проверить работу этой штуке			
//out_id_mass[i].addEventListener('click', () => handler);         
                }
                console.log( out_id_mass );
           }
           if(req.status == 404) {
             // alert("попробуйте сменить раскладку!");
           }
        }
        };
        req.send(null); 
        return;
      });    
      
});

/* Функция Обработка нажатий наших кнопок*/
handler = function () {
  // уберае все лишнее из названия тега, оставляя порядковый номер
  //   var id_btn = this.id.slice(-1);
    var id_btn = parseInt(this.id.replace(/\D+/g,""));

    var outer_html_city =
      'Имя страны - ' + data[id_btn].name
       + '<br><img src="'+ data[id_btn].flag +'" id="city_flag" width="30%" height="30%" alt="флаг страны ' + data[id_btn].name + '"><br> '+
      'alpha3Code страны - ' + data[id_btn].alpha3Code;
    outer_html_city +='<br> Языки: ';
    for ( item in data[id_btn].languages ){
        outer_html_city += data[id_btn].languages[item].name
    }
    // console.log(data[id_btn].languages);
    // проверка на существование 2 языка
    //   if( typeof data[id_btn].languages[1] !== 'undefined') {
    //       outer_html_city += data[id_btn].languages[1].name;
    //   }
    if( data[id_btn].borders !== '') {
        outer_html_city += "<br>Граничащие сухопутные государства: " + data[id_btn].borders;
    }
    // вывод HTML кода с информацией о стране
    document.getElementById('target_city_info').innerHTML = outer_html_city;
}
//var elem_btn = document.getElementById('btn_pressed_0');
// btn_pressed_0.addEventListener("click", handler);
// ....
// input.removeEventListener("click", handler);
// document.getElementById(Id)

