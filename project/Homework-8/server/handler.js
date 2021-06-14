const fs= require('fs');
const cart = require('./cart');

const actions={
    add: cart.add,
    edit: cart.edit,
    remove: cart.remove,
};

const handler=(req,res,action,file)=>{
    fs.readFile(file,'utf-8',(err,data)=>{
        if(err){
            res.sendStatus(404,JSON.stringify({status:0, text:err}));
        }else{
            const newCart= actions[action](JSON.parse(data),req);
           
            fs.writeFile(file,newCart, (err)=>{
                if(err){
                    res.send('{"status":0}');      
                      
                }else{
                    res.send('{"status":1}');
                }
            })
        }
    })
}

module.exports= handler;