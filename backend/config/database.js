const mongoose = require ('mongoose')
require('dotenv/config')

const mongoUri = "mongodb+srv://ahmed123:ahmed123@contactlist-68oo2.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{useNewUrlParser : true,useUnifiedTopology: true, useCreateIndex:true },()=>{
    console.log('Connected to MongoDB...')
})