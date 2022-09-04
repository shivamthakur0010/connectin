const express = require('express')
const connectDB = require('./config/db');
const path = require('path');

const app = express();
// init middleware
app.use(express.json({extended:false}))

app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))

// serve static assets in production
if(process.env.NODE_ENV ==='production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT = process.env.PORT || 5000;

connectDB();

app.get('/',(req, res)=>{
    res.send('hello express');
})

app.listen(PORT,()=>console.log(`server running at port no : ${PORT}`));