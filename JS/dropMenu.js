//Denne koden er tatt fra javacript turtorial for og gi oss funktionaliteten som vi trengte till dropdownen vår. 

document.addEventListener('click', e=> {console.info(e.target);
    const isDropdownButton = e.target.matches("[data-dropDown-button]");


    if (!isDropdownButton && e.target.closest('[data-dropDown]') != null) {
        return
    }

    let currentDropdown;
    if (isDropdownButton) {
      
       /*  currentDropdown = document.getElementById('runar'); */

       
          currentDropdown = e.target.closest('[data-dropDown]');

        currentDropdown.classList.toggle('active');

    }

    document.querySelectorAll('[data-dropDown].active').forEach(dropdown => { 
        if (dropdown === currentDropdown) { return }
        dropdown.classList.remove('active');

    }) 
    console.log('kom til enden');
})