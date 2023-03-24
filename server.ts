"use strict";

//Imports
import http from 'http';
import fs from 'fs';
import mime from 'mime-types'

//Variables
const port = process.env.PORT || 3000;
let lookup = mime.lookup;


//Configuration

//Static Configuration
const server = http.createServer((req, res) => {

   let path : string = req.url as string;
   if(path === "/" || path === "/home"){
      path = "/index.html"
   }

   console.log(__dirname);



   let mime_type : string = lookup(path.substring(1)) as string;

   fs.readFile(__dirname + path, function(err, data){

      if(err){
         res.writeHead(404);
         res.end("Error 404 - File Not Found" + err.message);
         return;
      }

      //Used to prevent user from changing the content-type
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.writeHead(200, {'Content-Type' : mime_type})
      res.end(data);

   });

});

server.listen(port,() => {
   console.log(`Server running at :${port}/`);
});