const express = require('express')
const app = express.Router()
app.get('/', (req, res) => {
    res.send('hello this is home rooter')
})
module.exports=app
