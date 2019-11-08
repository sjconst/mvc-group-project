const checkName = function(name){
    if(typeof name === "string"){
        return true;
    }else{
        return false;
    };
};

module.exports = checkName;