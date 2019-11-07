// Get references to page elements
const $submitBtn = $("#submit");
const $name = $("#name");
const $email = $("#email");
const $energy = $("#energy-select"); 
const $information =  $("#information-select");
const $decisions = $("#decisions-select");
const $organization = $("#organization-select");
const $surveyBtn = $(".survey-button-2");
const $surveyForm = $("#surveyForm");
//BUG: can't get it to read the process.env here;
//const token = process.env.Crystal_Token;
const token = "d18a5972dc9f0d4460748e825941f8c6"

const API = {
  saveTest: (name, email) => {  
    return $.post("api/tests", {
              name: name,
              email: email
            });
  },
  getTests: () => {
    return $.get("api/tests");
  },
  getByType: (letter1, letter2, letter3, letter4) => {
    return $.get(`api/type/${letter1}${letter2}${letter3}${letter4}`);
  },
  getFromCrystal: (encodedEmail) => {
    return $.get(`https://api.crystalknows.com/v1/profiles/find?token=d18a5972dc9f0d4460748e825941f8c6&email=${encodedEmail}`);
  },
  deleteTest: id => {
    return $.ajax({
      url: `api/tests/${id}`,
      type: "DELETE"
    });
  } 
};
// handleOpenSurvey
// Get name and email from form and send to personality test API
const handleOpenSurvey = event => {
  event.preventDefault(); 
  let name = $name.val().trim();
  let email = $email.val().trim();
  let encodedEmail = encodeURIComponent(email) 
  if (!(name && email)) {
    alert("You must enter a name and email!");
    return;
  } else {    
   window.open(`https://app.crystalknows.com/personality-test?25d0c957-4006-4970-b5ab-460b29d29ef6&api_company_name=Student&api_user_email=${encodedEmail}`, '_blank');
   //for some reason, trigger collapses the field names into the input, on top of placeholder
   $surveyForm.trigger("reset");  
   API.saveTest(name, email).then(data => console.log("Data from front end: " + data));
   API.getFromCrystal(encodedEmail).then(data => console.log("Crystal" + data))
  }  
};
const handleFormSubmit = event => {
  event.preventDefault();

}
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$surveyBtn.on("click", handleOpenSurvey);
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
// Dropdown Trigger 
// $(".dropdown-trigger").dropdown({
//   coverTrigger: false,
//   hover: true
// });
// Form Select
$(document).ready(function(){
  $('select').formSelect();
});
        
