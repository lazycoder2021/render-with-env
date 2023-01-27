const express = require('express'); 
const app = express(); 
require('dotenv').config({}); 
const mongoose = require('mongoose'); 
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI); 

mongoose.connection.on('open', function () {
    console.log('db connected...')
})

app.use(express.json()); 
app.use(express.static('public')); 

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }
})

const User = mongoose.model('User', userSchema);


app.post('/add', async function (req, res) {
    console.log(req.body)
    const user = new User(req.body); 
    await user.save(); 
    res.send('user added')
})


app.listen(process.env.PORT, function () {
    console.log(`server -- up and running @ ${process.env.PORT}...`)
})
