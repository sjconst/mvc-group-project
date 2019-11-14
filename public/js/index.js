$(document).ready(function() {
// Get references to page elements
const $name = $("#name");
const $email = $("#email");
const $surveyBtn = $(".survey-button-2");
const $surveyForm = $("#surveyForm");
const $group = $("#group");
const $groupSelect = $("#dropdown-home");
//BUG: can't get it to read the process.env here;
//const token = process.env.Crystal_Token;
const token = "d18a5972dc9f0d4460748e825941f8c6";
//API Calls
const API = {
  saveUser: (name, email, group) => {  
    return $.post("api/user", {
              name: name,
              email: email,
              group: group
            });
  }
};
// handleOpenSurvey
// Get name and email from form and send to personality test API
const handleOpenSurvey = event => {
  event.preventDefault(); 
  let nameInput = $name.val().trim();
  let emailInput = $email.val().trim(); 
  let group = ""; 
  let encodedEmail = encodeURIComponent(emailInput); 
  const groupInput = $group.val();   
  if(groupInput != ""){   
    group = groupInput.trim();
  } else if($groupSelect.val()) {  
    group = $groupSelect.val().trim();
  };     
  if (!(nameInput && emailInput && group)) {
    M.toast({html: 'You must enter a name, email, and group!'});
    return;
  }
  window.open(`https://app.crystalknows.com/personality-test?25d0c957-4006-4970-b5ab-460b29d29ef6&api_company_name=Student&api_user_email=${encodedEmail}`, '_blank');   
  try {
    API.saveUser(nameInput, emailInput, group)
    .then(data => {      
      if(data.error){
        M.toast({html: data.error});
      } else {
        console.log("User added");        
        location.reload(true);
      }      
    })
  }
  catch(error) {  
    M.toast({html: error});
  }    
}  
// Add event listeners to the submit and delete buttons
$surveyBtn.on("click", handleOpenSurvey);
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
// Carousel
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});

//to have image that zooms in/out
$(document).ready(function(){
  $('.materialboxed').materialbox();
});
// only let the button work if the form is complete and accurate
function validateInput() {
  var myForm = $('.rform');
  var allGood = myForm.parsley().isValid();
  console.log("field success!");
  $("#test-btn").on("click", function(e) {
    myForm.parsley().validate();
    if (allGood){
      console.log('valid');
      return true;
    }
    else if (!allGood) {
      console.log("!valid");
      e.preventDefault();
      allGood = true;
    }  
  })
}

// validateInput();


});