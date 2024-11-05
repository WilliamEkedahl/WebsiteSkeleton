document.addEventListener('click', e=> {
    const isDropdownButton = e.target.matches("[data-dropDown-button]");
    if (!isDropdownButton && e.target.closest('[data-dropDown]') != null) {
        return
    }

    let currentDropdown;
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropDown]');
        currentDropdown.classList.toggle('active');

    }
    document.querySelectorAll('[data-dropDown].active').forEach(dropdown => { 
        if (dropdown === currentDropdown) { return }
        dropdown.classList.remove('active');

    }) 
})