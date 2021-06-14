const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler= require('./handler.js')

router.get('/', (req,res)=>{
    fs.readFile('./server/db/usercart.json','utf-8',(err,data)=>{
        if(err){
            res.send(JSON.stringify({result:0, text:err}))
        }else{
            res.send(data);
        }
    })
});

router.post('/',(req,res)=>{
    handler(req,res,'add','./server/db/usercart.json')
});

router.put('/:id',(req,res)=>{
    handler(req,res,'edit','./server/db/usercart.json')
});
router.delete('/:id',(req,res)=>{
    handler(req,res,'remove','./server/db/usercart.json')
})


module.exports= router;