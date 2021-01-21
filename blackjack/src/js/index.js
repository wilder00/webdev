//setTimeout(()=> console.log("terminó"), 10000);

//namespace global o algo así
//let THISAPP;
var THISAPP = THISAPP || {}; //https://developer.mozilla.org/es/docs/Web/JavaScript/Introducci%C3%B3n_a_JavaScript_orientado_a_objetos
    //  cuando le pongo let o const no funciona, solo con var
THISAPP.game = {};
THISAPP.events = {
    
    addListener: function(element, type, fn){
        element.addEventListener(type,fn)
        console.log("se añadió un evento");
    },
    removeListener: function(element, type, fn){
       element.removeEventListener(type,fn)
    },
    getEvent: function(e) {
    }
};
// clases de objetos para blackjack
function Deck(deckId){
    this.deckId = deckId;
    this.deckApiUrl = "";
    this.started = false;
}
Deck.prototype.chargeDeck = function(){}

function BlackJack(deckId, handNumber){
    Deck.call(this, deckId);
    this.handNumber =  handNumber;
}

BlackJack.prototype = Object.create(Deck.prototype);
BlackJack.prototype.constructor = BlackJack;


//para cominucación con la API
const llamarApi = (api, fn)=>{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(xhttp.status);
            fn(JSON.parse(xhttp.responseText));
        }
    }
    xhttp.open('GET',api);
    xhttp.send();
}
const mostrarPorConsola = (obj) => console.table(obj);
let apiUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2";
//llamarApi(apiUrl, mostrarPorConsola);

//Practicando 
const startBlackJackDeck = (dataRequested) => {
    THISAPP.game.deck = new BlackJack(dataRequested.deck_id, 2);
    document.querySelector("#deckId").textContent = dataRequested.deck_id;
}
//llamarApi(apiUrl, startBlackJackDeck);

const mensaje = () => console.log("Termina todo");

window.onload = () => {
    let but = document.querySelectorAll(".action");
    THISAPP.events.addListener(but[0],"click", mensaje);
    
}
//addListener()