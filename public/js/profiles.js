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
//Test result variables for charts
let discC = 0;
let discD = 0;
let discI = 0;
let discS = 0;
let enn1= 0;
let enn2 = 0;
let enn3 = 0;
let enn4 = 0;
let enn5 = 0;
let enn6 = 0;
let enn7 = 0;
let enn8 = 0;
let enn9 = 0;
let ISTJ = 0;
let ISTP = 0;
let ESTP = 0;
let ESTJ = 0;
let ISFJ = 0;
let ISFP = 0;
let ESFP = 0;
let ESFJ = 0;
let INFJ = 0;
let INFP = 0;
let ENFP = 0;
let ENFJ = 0;
let INTJ = 0;
let INTP = 0;
let ENTP = 0;
let ENTJ = 0;
//Functions for creating new rows for table
function createRow(data) {      
    let newTable = "";
    var testName = "";    
    for(var i = 0; i < data.length; i++){
        if (data[i].enneagramResults === "not available"){            
            testName +="Enneagram";
        } if (data[i].myersResults === "not available"){            
            testName += "Myers-Brigs type-Indicator";
        } if (data[i].discResults === "available"){           
            testName +="Disc";
        } if (testName.length = 2) {
            var commaIndex = testName.indexOf(" ");
            var comma = ","
            testName = [testName.slice(0, commaIndex), comma, testName.slice(commaIndex)].join();
            console.log("testName1: ");
            console.log("testName1: ");
        } if (testName.length >= 3) {
            testName = "Enneagram, Myers-Brigs Type-Indicator, and Disc";
        } 
        testName = encodeURIComponent(testName);
        console.log(testName);
        let emailAddress = data[i].email;
        const emailSubject = encodeURIComponent("Reminder to take your personality test");
        let emailBody = `This%20is%20a%20reminder%20to%20complete%20your%20${testName}%20personality%20test(s).`;
        let myHref= `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`
        let newRow = `
        <tr>
        <td>${data[i].name_}</td>
        <td>${data[i].discResults}</td>
        <td>${data[i].myersResults}</td> 
        <td>${data[i].enneagramResults}</td> 
        <td><button class="emailBtn"><a href=${myHref}>Email Reminder</a></button><td>
        </tr>
        `
        newTable += newRow;
    }
    //append to table newTable;    
    $tbody.append(newTable);  
        //Results for graphs
            //DISC            
            switch (data[i].discResults){
                case "C":
                    discC++;
                    break;
                case "D":
                    discD++;
                    break;
                case "I":
                    discI++;
                    break;
                case "S":
                    discS++;
                    break;
                default:
                    let text = "no value found";
            }
            //Enneagram
            switch (data[i].enneagramResults){
                case 1:
                    enn1++;
                    break;
                case 2:
                    enn2++;
                    break;
                case 3:
                    enn3++;
                    break;
                case 4:
                    enn4++;
                    break;
                case 5:
                    enn5++;
                    break;
                case 6:
                    enn6++;
                    break;
                case 7:
                    enn7++;
                    break;
                case 8:
                    enn8++;
                    break;
                case 9:
                    enn9++;
                    break;
                default:
                    let text = "no value found";
            }
            //Myers-Briggs
            switch (data[i].myersResults){
                case "ISTJ":
                    ISTJ++;
                    break;
                case "ISTP":
                    ISTP++;
                    break;
                case "ESTP":
                    ESTP++;
                    break;
                case "ESTJ":
                    ESTJ++;
                    break;
                case "ISFJ":
                    ISFJ++;
                    break;
                case "ISFP":
                    ISFP++;
                    break;
                case "ESFP":
                    ESFP++;
                    break;
                case "ESFJ":
                    ESFJ++;
                    break;
                case "INFJ":
                    INFJ++;
                    break;
                case "INFP":
                    INFP++;
                    break;
                case "ENFP":
                    ENFP++;
                    break;
                case "ENFJ":
                    ENFJ++;
                    break;
                case "INTJ":
                    INTJ++;
                    break;
                case "INTP":
                    INTP++;
                    break;
                case "ENTP":
                    ENTP++;
                    break;
                case "ENTJ":
                    ENTJ++;
                    break;
                default:
                        let text = "no value found";
            }
    }        
}; 
//Charts code
function getCharts() { 
    let ctx = document.getElementById('chart1').getContext('2d');  
    let ctx2 = document.getElementById('chart2').getContext('2d');  
    let ctx3 = document.getElementById('chart3').getContext('2d');  
    let chart1 = new Chart(ctx, {
        type: 'bar',       
        data: {
            labels: ['I', 'S', 'C', 'D'],
            datasets: [{
                label: 'DISC',
                data: [discI, discS, discC, discD],
                backgroundColor: [
                    '#769fb6',
                    '#188fa7',
                    '#468847',
                    '#B94A48'                    
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 20
                    }
                }]
            },
            legend: false,
            title: {
                display: true,
                text: "DISC"
            }
        }
    }); 
    let chart2 = new Chart(ctx2, {
        type: 'radar',       
        data: {
            labels: ['1', '2', '3', '4', "5", "6", "7", "8", "9"],
            datasets: [{
                label: 'Enneagram',
                data: [enn1, enn2, enn3, enn4, enn5, enn6, enn7, enn8, enn9],                
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,                        
                    }
                }]
            },
            legend: false,
            title: {
                display: true,
                text: "Enneagram"
            }
        }
    });
    let chart3 = new Chart(ctx3, {
        type: 'radar',       
        data: {
            labels: ["ISTJ", "ISTP", "ESTP", "ESTJ", "ISFJ", "ISFP", "ESFP", "ESFJ", "INFJ", "INFP", "ENFP", "ENFJ", "INTJ", "INTP", "ENTP", "ENTJ"],
            datasets: [{
                label: 'DISC',
                data: [ISTJ, ISTP, ESTP, ESTJ, ISFJ, ISFP, ESFP, ESFJ, INFJ, INFP, ENFP, ENFJ, INTJ, INTP, ENTP, ENTJ],                
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 20
                    }
                }]
            },
            legend: false,
            title: {
                display: true,
                text: "Myers-Briggs"
            }
        }
    });
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
                .then(data => {                
                    //Pull from database again, add <tr> to table for each row of data   
                    profilesAPI.getTests()                    
                    .then(data => {   
                        createRow(data);
                        console.log(data);
                    })                    
                })
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
        .then(() => { 
            getCharts()
        })  
    })           
});
});