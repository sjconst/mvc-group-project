//a backend function to test for email
const checkEmail = function(email){
    if(email.includes('@')){
        return true;
    }else{
        return false;
    }
};
module.exports = checkEmail;