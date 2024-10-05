const http =require('http')
const fs =require('fs')

http.createServer((req,res)=>{  
        fs.readFile("demo.html",(err,data)=>{
        if(err){
            console.log("error occured");
        }
        else{
            res.write(data.toString());
            res.end();
        }
        
    })
}).listen(8080);