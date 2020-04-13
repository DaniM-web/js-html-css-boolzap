$(document).ready(function(){

var microfone = $('i.fas.fa-microphone');
var plane = $('i.send');
var invio = $('span.icon-change');
var input = $('.input-container input');
var attivo = false;
var arrow = $('.arrow-msg');
var inputSearch = $('.search-container input');
var contacts = $('.contact-item')
var date = new Date();
var hour = date.getHours() + ".";
var minutes = date.getMinutes()


//Click sul contatto mostra la conversazione del contatto cliccato
// click sul contatto che ha data-attr che corrisponde a stesso data-attr in chat
// salvo il valore dell’attr e lo usso per dire quale chat è attiva
contacts.click(
  function () {
    var containerChat = $(".chat-container")
    var dataContatto = $(this).data("chat");
    var headerInfo = $('.header-right-sx')
    console.log("il data del contatto è: " + dataContatto);

    // rimuovo la classe active ai contatti e la do a quello cliccato
    contacts.removeClass("active");
    $(this).addClass("active");
    //rimuovo la classe active dal container chat e dall'header con l'ultimo accesso
    headerInfo.removeClass('active');
    containerChat.removeClass('active');

    //ciclo i containerChat per vedere i data attr. corrispondenti
    containerChat.each(
      function () {
        var dataChat = $(this).data("chat");
        //Se i data attr. del contatto e del containerChat corrispondono allora do al container la classe active
        if (dataContatto == dataChat) {
          $(this).addClass("active");
        }
      }
    );
    //ciclo gli headerInfo per vedere i data attr. corrispondenti
    headerInfo.each(
      function () {
        var headerData = $(this).data("chat")
        //Se i data attr. del contatto e dell'header corrispondono allora do all'header la classe active
        if (dataContatto == headerData) {
          $(this).addClass("active");
        }
      }
    );
//chiusura contacts.click
  }
);


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
      inviaRispondi()
      console.log("io premuto invio");
    }
  }
});

// al click dell'icona paperPlane invio il messaggio
$(document).on( "click", "span.icon-change",
  inviaRispondi,
);
//definisco la funzione inviaRispondi
function inviaRispondi() {
    console.log(input.val());
    //salvo nella variabile il container con classe active al momento del click
    var boxChat = $(".chat-container.active");
    console.log(this);
    //appendo alla chat attiva il div con relativa classe
    boxChat.append('<div class= "my-msg message"> <span>'+ input.val() +'</span><i class="fa fa-chevron-down arrow-msg"></i><span class="message-time">'+ hour + minutes +'</span><div class="option-box"><span>Info messaggio</span><span class="delete">Cancella messaggio</span></div></div>');
    input.val("");
  // imposto la funzione che risponde al mio msg dopo 1 secondo
    setTimeout(
      function(){
        var boxChat = $(".chat-container.active");
        // var writing = $('.header-right-sx.active .header-right-sx-info p');
        // writing.html('Sta scrivendo...');
        console.log(this);
        console.log("io ritardo");
        boxChat.append('<div class= "your-msg message"> <span>Spero di rivederti molto presto</span><i class="fa fa-chevron-down arrow-msg"></i><span class="message-time">'+ hour + minutes +'</span><div class="option-box"><span>Info messaggio</span><span class="delete">Cancella messaggio</span></div></div>');
      }, 1000);
};


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
      $(this).parents(".message").html('<i class="fas fa-ban"></i> Messaggio eliminato').addClass('deleted-msg');
  });


//chiusura document ready
});
