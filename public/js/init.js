$(document.ready(function() {
    // Dropdown Trigger 
    $(".dropdown-trigger").dropdown({
        coverTrigger: false,
        hover: true
    });

    // Form Select
    $('select').formSelect();

    // Parallax
    $('.parallax').parallax();

    // Sidenav
    $('.sidenav').sidenav();

    // Modal
    $('.modal').modal();
}))

