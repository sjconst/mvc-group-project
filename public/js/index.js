$(document).ready(function() {
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
const $groupSelect = $("#group-select");
const $group = $("#group");
//BUG: can't get it to read the process.env here;
//const token = process.env.Crystal_Token;
const token = "d18a5972dc9f0d4460748e825941f8c6";
//API Calls
const API = {
  saveUser: (name, email, group) => {  
    return $.post("api/tests", {
              name: name,
              email: email,
              group: group
            });
  },
  getTests: () => {
    return $.get("api/tests");
  },
  getGroups: () => {
    return $.get("api/groups");
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
//On load, populate available groups to dropdown
loadGroups();

//Function for creating group options
function createGroupOption(groupData){  
  let newOption = $(`<option value=${groupData.group}>${groupData.group}</option>`);  
  console.log(newOption);
  return newOption;
}

//Get Groups function
function loadGroups() {  
  //let data = API.getGroups();
  $.get("/api/groups", data => {
    let allGroups = [];
    for (var i = 0; i < data.length; i++){
    console.log(data[i]);
    allGroups.push(createGroupOption(data[i]));
    }  
    console.log(allGroups);
    renderGroupList(allGroups);
  })  
};

//Render list of groups to the page
function renderGroupList(allGroups){
  console.log(`<option value="" disabled selected>Group</option>${allGroups}`)
  $groupSelect.html(`<option value="" disabled selected>Group</option>${allGroups}`)
}

// handleOpenSurvey
// Get name and email from form and send to personality test API
const handleOpenSurvey = event => {
  event.preventDefault(); 
  let nameInput = $name.val().trim();
  let emailInput = $email.val().trim();
  let groupInput = $group.val().trim();
  let encodedEmail = encodeURIComponent(email) 
  if (!(nameInput && emailInput && groupInput)) {
    M.toast({html: 'You must enter a name, email, and group!'})
    return;
  } else {    
   window.open(`https://app.crystalknows.com/personality-test?25d0c957-4006-4970-b5ab-460b29d29ef6&api_company_name=Student&api_user_email=${encodedEmail}`, '_blank');
   //for some reason, trigger collapses the field names into the input, on top of placeholder
   $surveyForm.trigger("reset");  
   API.saveUser(nameInput, emailInput, groupInput).then(data => console.log("Data from front end: " + data));   
  }  
};

const handleFormSubmit = event => {
  event.preventDefault();
  let energy = $energy.charAt(0);
  let info = $information.charAt(0);
  let decisions = $decisions.charAt(0);
  let organization = $organization.charAt(0);
  console.log(energy, info, decisions, organization);
  // API.getFromCrystal(encodedEmail).then(data => {
  //   console.log("Crystal" + data);
  // })
}

// Add event listeners to the submit and delete buttons
$surveyBtn.on("click", handleOpenSurvey);
$submitBtn.on("click", handleFormSubmit);

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



//GRAVEYARD
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// $exampleList.on("click", ".delete", handleDeleteBtnClick);



        
});