const express = require('express');
const fs = require('fs');
const util = require('./util/util')

const app = express();
const port  = 3000;

app.use(express.json())

app.post('/user/add', (req,res) =>{
    const existUsers = getUserData()
    const userData = req.body
    const existsUsers = util.getUserData()
    
    // console.log(userData)
    if(userData.fullname == null || userData.age == null){
        return res.status(401).send({error: true, msg: 'User data missing'})
    }
    const findExist = existUsers.find(user => user.username === userData.username)
    if(findExist) {
        return res.status(409).send({error: true, msg: 'username already exist'})
    }
    existsUsers.push(userData)
    util.saveUserData(existsUsers);
    res.send({success: true, msg: 'User data added successfully'})
})




app.get('/user/list', (req,res) => {
    const output = util.getUserData()
    res.send(output)
})

app.patch('/user/update/:username',(req,res) => {
    const username = req.params.username
    const userdata = req.body
    const existsUsers = util.getUserData()
    const findExist = existsUsers.find(user => user.username === username)
    if(!findExist){
        return res.status(409).send({error: true, msg: 'username not exists'})
    }

    const updateuser = existsUsers.filter(user => user.username === username)
    updateuser.push(userdata);

    util.saveUserData(updateuser);
    res.send({success: true, msg: 'successfully updated'})
})

app.delete('/user/delete/:username',(req,res) => {
    const username = req.params.username
    const existsUsers = util.getUserData()

    const filteruser = existsUsers.filter(user => user.username !== username)

    if(existsUsers.length === filteruser.length){
        return res.status(409).send({error: true, msg: 'username does not exist'})
    }

    util.saveUserData(filteruser)
    res.send({success: true, msg: 'successfully deleted'})
})

app.listen(port,() => {
    console.log(`app listening at http://localhost:${port}`)
})