//Denne koden er tatt fra javacript turtorial for og gi oss funktionaliteten som vi trengte til dropdownen vår.

document.addEventListener('click', e=> {
    const isDropdownButton = e.target.matches("[data-dropDown-button]");
    if (!isDropdownButton && e.target.closest('[data-dropDown]') != null){
        return;
    }
//added .querySelector('.dropdown-menu');
    let currentDropdown;
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropDown]').querySelector('.dropdown-menu');
        currentDropdown.classList.toggle('active');

    }
    // changed querySelectorAll target from '[data-dropDown]' to '.dropdown-menu.active'
    document.querySelectorAll('.dropdown-menu.active').forEach(dropdown => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('active');

    });
});