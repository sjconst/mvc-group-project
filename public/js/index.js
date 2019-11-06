// Get references to page elements
const $submitBtn = $("#submit");
const $name = $("#name");
const $email = $("#email");
const $energy = $("#energy-select"); 
const $information =  $("#information-select");
const $decisions = $("#decisions-select");
const $organization = $("#organization-select");
//BUG: can't get it to read the process.env here;
//const token = process.env.Crystal_Token;
const token = "d18a5972dc9f0d4460748e825941f8c6"

const API = {
  saveTest: result => {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/tests",
      data: JSON.stringify(result)
    });
  },
  getTests: () => {
    return $.ajax({
      url: "api/tests",
      type: "GET"
    });
  },
  getByType: (letter1, letter2, letter3, letter4) => {
    return $.ajax({
      url: `api/type/${letter1}${letter2}${letter3}${letter4}`,
      type: "GET"
    });
  },
  deleteTest: id => {
    return $.ajax({
      url: `api/tests/${id}`,
      type: "DELETE"
    });
  },
  personalityTest: (name, email) => {
    return $.ajax({
      url: `https://app.crystalknows.com/personality-test?api_customer_id=${token}&api_company_name=${name}&api_user_email=${email}`,
      type: "GET"
    })
  }
};

// handleFormSubmit
// Get name and email from form and send to personality test API
const handleFormSubmit = function(event) {
  event.preventDefault();
  let name = $name.val().trim();
  let email = $email.val().trim();
  if (!(name && email)) {
    alert("You must enter an example text and description!");
    return;
  }
  let data = API.personalityTest(name, email);
  console.log(data);  
  API.saveTest(data);
};

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
        
