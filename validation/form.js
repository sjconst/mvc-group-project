//this can be used to test front-end without the module export line
const checkEmpty = function(form){
    if (form.value == null || form.value == undefined || form.value.length == 0){
        alert("name can't be empty");
        return false;
    }
};
// module.exports = checkEmpty;