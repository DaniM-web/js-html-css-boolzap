$(document).ready(function(){

var microfone = $('i.fas.fa-microphone');
var plane = $('i.send');
var invio = $('span.icon-change');
var input = $('.input-container input');
var div = $('.chat-container');
var attivo = false;
var arrow = $('.arrow-msg');


// eventi sull'input della chat
input.on({
  // quando il'input è cliccato l'icona cambia
  'focus':
  function () {
    attivo = true;
    microfone.hide();
    plane.show();
  },
  //quando il focus esce dall'input l'icona torna microfono
  'blur':
  function () {
    attivo = false;
    microfone.show();
    plane.hide();
  },
  // al press invio il msg viene inviato
  'keyup':
  function (e) {
    if(e.which == 13) {
      inviaRispondi();
    }
  }
});

// al click dell'icona paperPlane ivio il messaggio
invio.on({
  'click':
    inviaRispondi
});

function inviaRispondi() {
    console.log(input.val());
    //appendo il div con relativa classe
    div.append('<div class = "my-msg message"> <span>'+ input.val() +'</span><i class="fa fa-chevron-down arrow-msg"></i><span class="message-time">18.01</span><div class="option-box"><span>Info messaggio</span><span class="delete">Cancella messaggio</span></div></div>');
    input.val("");
  // imposto la funzione che risponde al mio msg dopo 1 secondo
    setTimeout(
      function(){
        div.append('<div class = "your-msg message"> <span>Spero di rivederti molto presto</span><i class="fa fa-chevron-down arrow-msg"></i><span class="message-time">18.01</span><div class="option-box"><span>Info messaggio</span><span class="delete">Cancella messaggio</span></div></div>');
      }, 1000);
}

var inputSearch = $('.search-container input');
var contacts = $('.contact-item')

//eventi sull input di ricerca
// filtro contatti
  //gestirte evento su tastiera (oppure su click di bottone di input ricerca)
  inputSearch.keyup(
    function (event) {
      // salvarmi input utente in campo del filtro (stringa1)
      var textInsert = inputSearch.val().toLowerCase();

      console.log("Testo inserito: " + textInsert);
      // selezionare tutti i blocchi di contatto e ciclare tra di essi (each())
      contacts.each(
        function () {
        //salvo in una var il valore del testo del nome nel contatto (stringa2)
          var nameText = $(this).find('.contact-item-text span.text h5').text().toLowerCase();
          console.log("NameText: " + nameText);
          // confronto per vedere se la stringa inserita nell'input è inclusa nel nome del contatto
          //se l'occorenza è stata trovata lascio il blocco di contatto visibile
          if(nameText.includes(textInsert)){
            $(this).show();
            // altrimenti lo rendo non visibile (this)
          }else{
            $(this).hide();
          }
        }
      );
    }
  );

//cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato



  $(".chat-container").on("click", ".arrow-msg",
    function () {
      $(this).siblings(".option-box").toggle();
  });
  // cliccando sull'opz cancella messaggio, il messaggio selezioanto viene eliminato
  $(".chat-container").on("click", ".delete",
    function () {
      console.log(this);
      $(this).parents(".message").remove();
  });




//Click sul contatto mostra la conversazione del contatto cliccato
// click sul contatto che ha data-attr che corrisponde a stesso data-attr in chat
// salvo il valore dell’attr e lo usso per dire quale chat è attiva
// è possibile inserire nuovi messaggi per ogni conversazione [attiva]




});
