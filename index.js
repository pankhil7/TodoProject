const express=require('express');
const mongoose=require('mongoose');
const config=require('./config.js');
const todorouter=require('./routes/todos');

const app=express();
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
})
app.use('/todos',todorouter.router);
 
connecttodb(config.urldb).then(()=>{listen(config.port)});
function listen(port){
     app.listen(port,(error)=>{
         if(error)
           console.log('error occured');
         else
           console.log('listening on port');
     })
}
function connecttodb(dburl){
    mongoose.connection.on('error',(error)=>{
        console.log("An error occured");
    })
    mongoose.connection.once('open',()=>{
        console.log("Successfully Connected");
    })
    return mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});
}