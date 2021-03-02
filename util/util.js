

const fs = require('fs')
const fileName = './data/users.json'

function saveUserData(data){
    try{
        const stringifyData = JSON.stringify(data)
    fs.writeFileSync(fileName, stringifyData)
    }
    catch(ex){
        console.log(ex);
    }    
}

function getUserData (){
    const jsonData = fs.readFileSync(fileName)
    return JSON.parse(jsonData);
}


exports.saveUserData = saveUserData
exports.getUserData = getUserData