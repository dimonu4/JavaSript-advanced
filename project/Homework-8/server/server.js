let express =require("express");
let fs = require("fs");
const cartRouter= require('./cartRouter')

let app = express();
app.use("/",express.static("./public"));
app.use(express.json());
app.use('/api/cart', cartRouter);


app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
});

app.get('/api/products',(req,res)=>{
    fs.readFile('./server/db/products.json','utf-8',(err,data)=>{
        if(err){
            res.send(JSON.stringify({result:0, text:err}));
        } else{
            res.send(data);
        }
    })
});