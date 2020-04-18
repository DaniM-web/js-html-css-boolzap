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
contacts.click(correspondingData);

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
    }
  }
});

// al click dell'icona paperPlane invio il messaggio
$(document).on( "click", "span.icon-change",
  inviaRispondi,
);

//eventi sull input di ricerca
// filtro contatti
  inputSearch.keyup(filterContacts);

//cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
  $(".chat-container").on("click", ".arrow-msg", optionBoxShow);
  // cliccando sull'opz cancella messaggio, il messaggio selezioanto viene eliminato
  $(".chat-container").on("click", ".delete",deleteMsg);

//definisco la funzione inviaRispondi
function inviaRispondi() {
  // --------- HANDLEBARS DEFINITIONS
  var source = $('#msg-template').html();
  var template = Handlebars.compile(source);
  var msg = input.val();
  var context = {class: "my-msg", msgToShow: msg, hoMin: hour + minutes};
  var html = template(context);

  console.log(input.val());
  //salvo nella variabile il container con classe active al momento del click
  var boxChat = $(".chat-container.active");

  //appendo alla chat attiva il div con relativa classe
   //solo se (if) l'input contiene caratteri (diverso da stringa vuota)
  if(input.val() != ""){
  boxChat.append(html);
  input.val("");

// imposto la funzione che risponde al mio msg dopo 1 secondo
  // prima spunta la scritta sta scrivendo sotto il nome
    setTimeout(
      function(){
          var writing = $('.header-right-sx .header-right-sx-info p');
          console.log("io sto scrivendo");
          writing.html('Sta scrivendo...');
        }, 1000);
        //poi la risposta automatica
    setTimeout(
      function(){
        var context = {class: "your-msg", msgToShow: "Ok bello !", hoMin: hour + minutes};
        var html = template(context);

        var boxChat = $(".chat-container.active");
        var writing = $('.header-right-sx .header-right-sx-info p');
        console.log("io ritardo");
        boxChat.append(html);
        writing.html("Ultimo accesso alle "+ hour + minutes);
      }, 2000);
    }else{
      console.log("input vuoto");
    }
};


function correspondingData () {
  //clono img del contatto cliccato
  var infoImg = $(this).find('img').clone();
  console.log("infoImg è :", infoImg);
  //clono nome del contatto cliccato
  var infoName = $(this).find('span.text h5').clone();
  console.log("infoName è : ", infoName);
  var headerInfo = $(".header-right-sx");
  var containerChat = $(".chat-container");
//salvo il valore del corrente data attr del contatto
  var dataContatto = $(this).data("chat");
  console.log("il data del contatto è: " + dataContatto);
  // rimuovo la classe active ai contatti e la do a quello cliccato
  contacts.removeClass("active");
  $(this).addClass("active");
  //rimuovo la classe active dal container chat e dall'header con l'ultimo accesso
  containerChat.removeClass('active');
  //Assegno la classe active ai container che hanno stesso data attribute dei contatti
  $('.chat-container[data-chat="' + dataContatto + '"]').addClass('active');
  //copio gli elementi clonati (img e nome) nell'header corrispondente
  headerInfo.find(".header-right-sx-logo").empty().append(infoImg);
  headerInfo.find("span.header-right-sx-info h5").html(infoName);



};

function deleteMsg () {
    console.log(this);
    $(this).parents(".message").html('<i class="fas fa-ban"></i> Messaggio eliminato').addClass('deleted-msg');
};
function optionBoxShow () {
  $(this).siblings(".option-box").toggle();
};

function filterContacts (event) {
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

//chiusura document ready
});
