const express = require('express')
const app = express.Router()
const auth=require('../middleware/authmiddle')
 
app.get('/app/secret',auth, async (req, res) => {
    res.send('this is because you have login in and you have a token')
})
module.exports=app