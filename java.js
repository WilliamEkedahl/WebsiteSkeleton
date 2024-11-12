//om vi vill använda skriv - KILDA Victoria :)
let nextDom=document.getElementById('next');  //Knappen next
let prevDom=document.getElementById('prev');  //knappen før
let carouselDom=document.querySelector('.carousel'); //Dette er fra html <div class="carousel">
let listItemDom=document.querySelector('.carousel .list'); //Dette er innholdet i carousel
let thumbnailDom=document.querySelector('.carousel .thumbnail'); //Dette er både gruppen carousel og thumbnail fra html

nextDom.onclick=function(){
    showSlider('next');
}
prevDom.onclick=function(){
    showSlider('prev');
}
let timeAutoNext= 1500; //Dette er for at bildene skal gå automatisk uten å trykke på de
let runTimeOut;
let runAutoRun = setTimeout(()=>{
    nextDom.click();
}, timeAutoNext); //Hvor lenge den skal gå automatisk. Skriver også lenger ned i koden

function showSlider(type){ 
    let itemSlider=document.querySelectorAll('.carousel .list .item');
    let itemThumbnail=document.querySelectorAll('.carousel .thumbnail .item');

    if(type  === 'next'){
        listItemDom.appendChild(itemSlider[0]); //Dette er for å flytte bildet på den andre siden. Nå vil det andre bildet være det første bildet.
        thumbnailDom.appendChild(itemThumbnail[0]); //Dette er for å flytte de små bildene på slutten, når du trykker på knappen eller når det går automatisk
        carouselDom.classList.add('next');
    }else{
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);  //clearTimeout passer på at bildene beveger seg hvert valgte sekund. Den passer på at når tiden er ferdig, da teller den om igjen.
    runTimeOut=setTimeout(()=>{
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runAutoRun); //Her fortsetter koden for å kjøre bildene automatisk
    runAutoRun=setTimeout(()=>{
        nextDom.click();
    }, timeAutoNext);
}