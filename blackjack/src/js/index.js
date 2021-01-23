/**
 * Aunque no debería repetir código, me sirve para recordar el código
 */

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

//se hereda los métodos del prototipo y se hace referencia a la clase hija con el constructor
BlackJack.prototype = Object.create(Deck.prototype);
BlackJack.prototype.constructor = BlackJack;

//metodos a usar en BlackJack
BlackJack.prototype.doAction = function(action){

    const valcardToBjValue = (strValue)=>{
        let num = parseInt(strValue);
        if(num){return num}

        let figures = ["JACK", "QUEEN", "KING"];
        if(figures.includes(strValue)){return 10}

        // llegado aqui quiere decir que es una A "ACE" que puede tener valor de 1 o 11
        return -1;

    }

    //crea elemtos HTML de tag img y las añade al DOM
    const setCards = (data) =>{
        
        let playerArea = document.getElementById("player");
        let playerCardsArea = playerArea.querySelector(".cards");
        let sumCardsTag = playerArea.querySelector("#sumCards");
        let player = THISAPP.game.player;
        data.cards.forEach(card =>{
            
            player.hand.push(card); // push y pop
            let cardNumVal = valcardToBjValue(card.value);
            if(cardNumVal != -1){
                player.bjValue += cardNumVal;
                player.bjValue2 += cardNumVal;
            }else{
                player.bjValue += 1;
                player.bjValue2 += 11;
            }
            if(player.bjValue <= 21){
                sumCardsTag.textContent = player.bjValue;
                console.log("mostrando 1");
            }
            
            if(player.bjValue != player.bjValue2 && player.bjValue2 <= 21){
                sumCardsTag.textContent += ` or ${player.bjValue2}`;
                console.log("mostrando 2");
            }else if(player.bjValue > 21){
                sumCardsTag.textContent = player.bjValue2;
                console.log("mostrando 3");
            }

            if( player.bjValue > 21 && player.bjValue2 >= 21){
                let playerButtons = playerArea.querySelectorAll("#actionsArea > .action");
                playerButtons.forEach(button => button.disabled = true);
                let startButton = playerButtons[2];
                startButton.disabled = false;
                startButton.textContent = "Again";

            }

            let cardImg = document.createElement("img");
            cardImg.classList.add("card");
            cardImg.setAttribute("src",card.image)
            playerCardsArea.appendChild(cardImg);
        })
    }


    if(action == "Pedir"){
        let requestNumCards = 1;
        THISAPP.game.deck.started? requestNumCards = 1 : requestNumCards = 2;
        THISAPP.game.deck.started = true;
        let api = `https://deckofcardsapi.com/api/deck/${THISAPP.game.deck.deckId}/draw/?count=${requestNumCards}`;
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if(this.readyState == 4 && this.status == 200){
                setCards(JSON.parse(this.responseText));
            }
        }        
        xhttp.open("GET",api);
        xhttp.send();
    
    }else if(action == "Plantar"){

    }else if(action == "Again"){
        THISAPP.game.deck.started = false;
        let playerArea = document.getElementById("player");
        let buttons = playerArea.querySelectorAll("#actionsArea > .action");
        let againStartButton = buttons[2];

        THISAPP.game.player = {"hand":[], "bjValue":0, "bjValue2": 0};
        playerArea.querySelector("#sumCards").textContent = "0";

        let playerCardsArea = playerArea.querySelector(".cards");
        playerCardsArea.innerHTML = "";
        buttons.forEach(btn => btn.disabled = false);
        againStartButton.disabled = true;



        let api = `https://deckofcardsapi.com/api/deck/${THISAPP.game.deck.deckId}/shuffle/`
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(xhttp.readyState == 4 && xhttp.status == 200){
                console.log("Se barjó el deck")
                console.table(xhttp.responseText)
            }
        }
        xhttp.open("GET", api);
        xhttp.send;
    }

}


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
let apiUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
//llamarApi(apiUrl, mostrarPorConsola);

//Practicando 
const startBlackJackDeck = (dataRequested) => {
   
    THISAPP.game.deck = new BlackJack(dataRequested.deck_id, 1);
    THISAPP.game.player = {"hand":[], "bjValue":0, "bjValue2": 0};
    document.querySelector("#deckId").textContent = dataRequested.deck_id;
}
//llamarApi(apiUrl, startBlackJackDeck);

//Botones del juego
const playerActions = function() {
    
    let typeAction = this.textContent;
    console.log(this.textContent);
    if(typeAction == "Start"){
        llamarApi(apiUrl, startBlackJackDeck);
        let brothers = this.parentElement.childNodes
        brothers.forEach(node => node.disabled = false)
        this.disabled = true;
        return ;
    }
    THISAPP.game.deck.doAction(typeAction);
}

window.onload = () => {
    let but = document.querySelectorAll(".action");
    but.forEach(button =>THISAPP.events.addListener(button,"click", playerActions))
    
}
//addListener()