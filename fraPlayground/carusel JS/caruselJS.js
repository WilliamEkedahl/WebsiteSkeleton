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



async function pcNext() {
    /* Sjekker om bildeserien har kommet til enden */
    let førsteSynlig = finnPcSynlig(), maxIndex = (bildeWrap.length -1);
    if (førsteSynlig > (maxIndex-3)) return;
    /* Forhindrer knappetrykk under animasjonen */
    nextBtn.disabled = true;

    caruselWrap.classList.add("slide-left");


    /* Her er en pause for at trasnition animasjonen skal bli ferdig */
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    await sleep(300);


    /*Endre hvilke bilder som vises */

    let skjul = førsteSynlig,
        vis = førsteSynlig + 4 ;


    caruselWrap.children[skjul].classList.remove("pc-synlig");
    /* Hindrer visning av */
    if (vis <= maxIndex ) {
        caruselWrap.children[vis].classList.add("pc-synlig");
    }
    
    caruselWrap.classList.remove("slide-left");
    nextBtn.disabled = false;
}

function finnPcSynlig(){
    
    for (let i = 0; i < bildeWrap.length; i++) {

        if (bildeWrap[i].classList.contains("pc-synlig")) {
         return i;   
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
  