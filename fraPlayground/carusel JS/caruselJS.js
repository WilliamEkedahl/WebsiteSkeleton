/**************************************************\
 *      Knappene og wrap for hele bildeserien     *
\**************************************************/
let prevBtn = document.getElementById("prev-button");
let nextBtn = document.getElementById("next-button");
let caruselWrap = document.getElementById("carusel-wrap");

/*******************************\
 *     Mobil bildekarusell     *  
\*******************************/

    let bildeWrap = caruselWrap.getElementsByClassName("bilde-wrap");
    let dotsContainer = document.getElementById("dots");
    let dots = document.getElementsByClassName("dot");


window.onload = (e) =>{
/* * * * * * * * * * * * * * * * * * * * * * * * * *\
 *     Knappene får eventlistener som kjører       *
 *     forskjellige funksjoner avhengig av         *
 *     skjerm-bredden                              *
\* * * * * * * * * * * * * * * * * * * * * * * * * */
    prevBtn.addEventListener('click', ()=>{
        console.log('prev \n');
        let mobile = window.matchMedia("(max-width: 1250px)");
        
        mobile['matches'] === true ? mobilePrev(): pcPrev();
        

    });
    nextBtn.addEventListener('click', ()=>{
        console.log('next \n');
        let mobile = window.matchMedia("(max-width: 1250px)");
        
        mobile['matches'] === true ? mobileNext() : pcNext();

    });
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  *      Denne koden er basert på eksempel fra nettet:        *
  *      https://codepen.io/luxonauta/pen/QWEWvmB             *
  *                                                           *
 \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  *     Dotter som er span-elementer genereres,           *
  *     får klassen dot, indexseres og legges til         *
  *     i dotcontainer, som er et div.element             *
 \* * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
    for (let index = 0; index < bildeWrap.length; index++) {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
      
    }
  /** Dottene får eventlistner som henter ut index og kjører funksjon for å vise nytt bilde */
  for (let i = 0; i < dots.length; i++) {
          dots[i].addEventListener("click", () => {
          let index = parseInt(dots[i].dataset.index);
          showItem(index);
        });
      
  }
};
/* 
    Funksjonen går gjennom alle bildene i serien og tar fra dem klassen "synlig".
    Klassen "synlig" legges til bildet som har index som fulgte med som argument
    fra klikk på knappene eller dottene

*/
function showItem(idx) {
    for (let i = 0; i < bildeWrap.length; i++) {
        bildeWrap[i].classList.remove("synlig");
        dots[i].classList.remove("active");

        if (idx === i) {
            bildeWrap[i].classList.add("synlig");
            dots[i].classList.add("active");
        }
    }
}

function finnSynlig(){
    for (let i = 0; i < bildeWrap.length; i++) {
        bildeWrap[i].classList.contains("synlig") ? funnet = i : funnet = false;
        
        if (funnet !== false) return funnet;
    }
}

function mobilePrev() {

    let index = finnSynlig();
    showItem((index - 1 + bildeWrap.length) % bildeWrap.length);
}

function mobileNext() {
    let index = finnSynlig();
    showItem((index + 1) % bildeWrap.length);
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
 *      Bildene flyttes til venstre med animasjon gjennom transition                         *
 *      Med tanke på at brukeren kan trykke igjen før animasjonen er ferdig                  *
 *      har vi valgt en løsning der animasjon oppstår i det translate fjernes.               *
 *      Bilderekken flyttes til venstre gjennom å få negaiv left verdi eks left: -500px      *
 *      Deretter flyttes bilderekken til høyre med transform:translate,                      *
 *      ingen endring i visningen                                                            *
 *      Bildeserien får transistion på translate og translate settes til 0, bildene glir     *
 *      over skjermen til sin nye posisjon, en bildebredde til høyre                         *
 *      Left verdien som flyttet posisjonen til bildene fjernes ikke før animasjonen er      *
 *      er ferdig. Først da endres får bildet som ikke lenger vises display none og          *
 *      kollapser. Kollapsen ville vanligvis ført til at bildene i bildeserien ble           *
 *      forskjøvet til høyre, men opphøret av en bildebreddes forskyvning til venstre        *
 *      gjør at bildene blir stående.                                                        * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
async function pcNext(){
 /* klassen slide-left flytter alle bildene til venstre, med avstanden en bildebredde */   
caruselWrap.classList.add("slide-left");
/* Klassen translate-right flytter bildene en bildebredde til høyre, bildene flyttes dermed ikke */
caruselWrap.classList.add("translate-right");
/* Denne pausen er viktig. Uten den ville det ikke blitt noen transition effekt */
const sleep = ms => new Promise(r => setTimeout(r, ms));
await sleep(1);

/* Klassen remove-translate gir transition til carusel-wrap og
   setter translate til 0. Dermed glir bildene over skjermen til
   sin nye posisjon. en bildebredde til venstre */

caruselWrap.classList.add("remove-translate");


/* Her er en pause for at trasnition animasjonen skal bli ferdig */
await sleep(1000);


/*Endre hvilke bilder som vises */

let femSynlig = finnPcSynlig();





    let lavestIndex = Math.min(...femSynlig),
        høyestIndex = Math.max(...femSynlig), maxIndex = (bildeWrap.length - 1);
        console.log(lavestIndex);
        console.log(høyestIndex);
    if (høyestIndex === maxIndex && lavestIndex === 0) {


        /*                     #0   #1   #2   #3    #4
    if( femSynlig[1] > 1){      0   8    9    10    11  skjul 8     vis 1
    if( femSynlig[2] > 2){      0   1    9    10    11  skjul 9     vis 2
    if( femSynlig[2] > 1){      0   1    2    10    11  skjul 10    vis 3
    if( femSynlig[2] > 1){      0   1    2    3     11  skjul 11    vis 4
    
          */
        if (femSynlig[1] > 1) {
            var vis = (lavestIndex + 1);
            var skjul = (høyestIndex - 3);
        } else if (femSynlig[2] > 2) {
            var vis = (lavestIndex + 2);
            var skjul = (høyestIndex - 2);

        } else if (femSynlig[3] > 3) {
            var vis = (lavestIndex + 3);
            var skjul = (høyestIndex - 1);

        } else {
            var vis = (lavestIndex + 4);
            var skjul = (høyestIndex);
        }



    } else {
        var skjul = femSynlig[0];
        var vis = (femSynlig[0] + 5) % bildeWrap.length;
    }

    caruselWrap.children[skjul].classList.remove("pc-synlig");
    caruselWrap.children[vis].classList.add("pc-synlig");


console.log(' fjernet ' + skjul + ' viser ' + vis )










/* klassen slide-left som flyttet alle bildene mot venstre oppheves og opphever
   effekten av bildet som forsvant */
caruselWrap.classList.remove("slide-left");
caruselWrap.classList.remove("translate-right");
/* klassen som fjernet translate med fjernes */
caruselWrap.classList.remove("remove-translate");

/***********************************************
 * Problemet med denne løsningen er å identifisere bildet som skal kollapses.
 * Hvilket bilde er skjøvet ut av rekken?
 * 
 * Jeg tror at løsningen ligger i bruk av dataset. Og vil lage mobilversjonen
 * først og så komme tilbake hit
 * 
 */

}

function finnPcSynlig(){
    let funnet = [];
    for (let i = 0; i < bildeWrap.length; i++) {
        if (bildeWrap[i].classList.contains("pc-synlig")) {
         funnet.push(i);
         if(funnet.length>4) return funnet;
        }
    }

}


function pcPrev(){
    console.log('pcPrev is empty');
    console.info( caruselWrap.children[0]);
   
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *\
 
   ***           Mobil bilde-skifter           ***
 
 * * * * * * * * * * * * * * * * * * * * * * * * * */




      // Function to show a specific item
  