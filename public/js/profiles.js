$(document).ready(function(){
//DOM elements
const $tbody = $("#tbody");

//APIs for profiles
const profilesAPI = {
    getTestsByGroup: groupSelected => {
        return $.get(`/api/group/${groupSelected}`);
        },
    getFromCrystal: encodedEmail => {
        return $.get(`https://api.crystalknows.com/v1/profiles/find?token=d18a5972dc9f0d4460748e825941f8c6&email=${encodedEmail}`);
    },
    postResult: (email, resultDISC, resultMyer, resultEnn) => {
        return $.post(`/api/result/${email}`, {
            resultDISC: resultDISC,
            resultMyer: resultMyer,
            resultEnn: resultEnn
        })
    },
    getTests: () => {
        return $.get("/api/tests");
    },
    deleteTest: id => {
        return $.ajax({
        url: `/api/tests/${id}`,
        type: "DELETE"
        });
    } 
};
//Functions for creating new rows for table
function createRow(data) {   
    console.log(data);
    let newTable = "";
    let testName = [];    
    for(var i = 0; i < data.length; i++){
        if (data.enneagramResults === "not available"){            
            testName.push("Enneagram");
        } if (data.myersResults === "not available"){            
            testName.push("Myers-Brigs type-Indicator");
        } if (data.discResults === "not available"){           
            testName.push("Disc");
        } if (testName.length >= 3) {
            testName = ["Enneagram, Myers-Brigs type-Indicator, and Disc"];
        } if (testName.length > 1){
            testName.join(", ");
        }
        let emailAddress = data.email;
        const emailSubject = "Reminder: Take your personality test";
        //can add link to site once it is deployed
        let emailBody = `This is a reminder to complete your ${testName} personality test(s).`
        let myHref= `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`
        let newRow = `
        <tr>
        <td>${data[i].name_}</td>
        <td>${data[i].discResults}</td>
        <td>${data[i].myersResults}</td> 
        <td>${data[i].enneagramResults}</td> 
        <td><button><a href=${myHref}>Email Reminder</a></button><td>
        </tr>
        `
        newTable += newRow;
    }
    //append to table newTable;    
    $tbody.append(newTable);       
} 
//Event listeners
$('#group-display').change(() => {    
    $tbody.empty()
    let groupSelected = $('#group-display').val();     
    //get group's data from database to get emails
    profilesAPI.getTestsByGroup(groupSelected).then(data => {       
        //pull each emails results from Crystal API 
        data.forEach(el => {
            let encodedEmail = encodeURIComponent(el.email);    
            profilesAPI.getFromCrystal(encodedEmail)
            .then(result => {
                //update database with response from Crystal                 
                //if any results null, add "not available to db"
                let disc = result.personalities.disc_type;
                let myer = result.personalities.myers_briggs_type;
                let enn = result.personalities.enneagram_type;
                if(!myer){
                    myer = "not available";
                };
                if(!disc){
                    disc = "not available";
                };
                if(!enn){
                    enn = "not available";
                }
                profilesAPI.postResult(el.email, disc, myer, enn)                
            })
            .fail(err => {    
                //if Crystal API responds with error, means user doesn't have profile. Display "user not registered"            
                console.log("User hasn't set up Crystal profile");
                let disc = "user not registered";
                let myer = "user not registered";
                let enn = "user not registered"; 
                profilesAPI.postResult(el.email, disc, myer, enn)   
            })
        });             
        //Pull from database again, add <tr> to table for each row of data   
        profilesAPI.getTestsByGroup(groupSelected)                    
        .then(data => {   
            createRow(data);
        })  
    })         
});
});