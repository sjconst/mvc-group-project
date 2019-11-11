$(document).ready(function(){
    //APIs for profiles
    const profilesAPI = {
        getTests: groupSelected => {
            return $.get(`api/group/${groupSelected}`);
          },          
        getTests: () => {
            return $.get("api/tests");
        },
        getGroups: () => {
            return $.get("api/groups");
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
    $('select[id="group-display"]').change(function() {
        let groupSelected = $(this).val(); 
        //pull data from Crystal API 
        
        //Send data to database

        //get group's data from database
        profilesAPI.getTests(groupSelected).then(data => {
            //with response, add <tr> to table for each row of data
            console.log(data);
            createRow(data);
        })        
    });
});