$(document).ready(function(){
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
    deleteTest: id => {
        return $.ajax({
        url: `/api/tests/${id}`,
        type: "DELETE"
        });
    } 
};
//Functions for creating new rows for table
function createRow(data) {
    //discResults: "C"
    // email: "test@test.com"
    // enneagramResults: null
    // group_: "Bootcamp"
    // id: 1
    // myersResults: null
    // name_: "Stephanie"
    //email link = 
    let newTable = "";
    const notAvail ="Not available";
    for(var i = 0; i < data.length; i++){
        if (!data.enneagramResults){
            data.enneagramResults = notAvail;
        } else if(! data.myersResults){
            data.myersResults = notAvail;
        }
        let newRow = `
        <td>${data.name_}<td>
        <td>${data.discResults}<td>
        <td><button><a href=${myHref}></a></button><td>
        `
        newTable += newRow;
    }
    //append to table newTable;        
} 
//Event listeners
$('#group-display').change(() => {
    let groupSelected = $('#group-display').val();     
    //get group's email from database
    profilesAPI.getTestsByGroup(groupSelected).then(data => {
        console.log(data);
        //pull data from Crystal API 
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
                .then(data => console.log(data))
            })
            .fail(err => {
                console.log("User hasn't set up Crystal profile");
                let disc = "user not registered";
                let myer = "user not registered";
                let enn = "user not registered"; 
                profilesAPI.postResult(el.email, disc, myer, enn)
            })
        }
            
        )
        
        
         

        //Pull from database again, add <tr> to table for each row of data
     
        //createRow(data);
    }) 
        
});
});