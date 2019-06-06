const express = require("express");
const mongoose = require("mongoose");
const keys= require('./keys/key.js')
const app = express();
const home = require('./routers/home')
const auth = require('./routers/auth')
const secret = require('./routers/secret')
const cors =require('cors')
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

if (process.env.NODE_ENV === "production") {
   mongoose.connect(keys.mongoURI)
}
else {
    mongoose.connect(keys.mongoURI,{useNewUrlParser:true})
        .then(console.log('connected to mongodb..'))
        .catch(err=>console.log(`error connecting to mongo db ${err}`))
}
app.use(cors())
app.use('/', home)
app.use('/', auth)
app.use('/',secret)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening at port 5000");
});
