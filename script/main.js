$(document).ready(function(){

var microfone = $('i.microfono');
var send = $('i.send');
var input = $('.input-container input');
var div = $('.chat-container');
var attivo;

input.click(
  function () {
    attivo = 1;{
    if(attivo == 1)
    microfone.addClass('hide');
    send.removeClass('hide')
    }
  }
);

//   $('.right-side').click(
//     function () {
//       attivo = 0;
//       if(attivo == 0){
//         send.addClass('hide');
//         microfone.removeClass('hide');
//       }
//     }
// );


send.click(
  function () {
    console.log(input.val());
    div.append('<div class = "my-msg">'+input.val()+'</div>');
    input.val("");
  }
);


});
