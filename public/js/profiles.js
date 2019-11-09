$(document).ready(function(){
    //APIs for profiles
    const profilesAPI = {
        getTests: groupSelected => {
            return $.get(`api/group/${groupSelected}`);
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
        //get group's data from database
        profilesAPI.getTests(groupSelected).then(data => {
            //with response, add <tr> to table for each row of data
            console.log(data);
            createRow(data);
        })        
    });
});