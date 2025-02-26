import {createServer} from 'http'
import { readFile, writeFile } from 'fs/promises'
import crypto from 'crypto'
import path from 'path'

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join("data","links.json");
const loadLinks = async()=>{
  try{
    const data= await readFile(DATA_FILE,"utf-8");
    return JSON.parse(data);
  }catch(err){
    if(err.code==="ENOENT"){
      await writeFile(DATA_FILE,JSON.stringify({}));
      return {};
    }
    throw err;
  }
}

const saveLinks = async(links)=>{
  await writeFile(DATA_FILE,JSON.stringify(links));
}
const serveFile = async(res,filePath,contentType)=>{
  try{
    const data = await readFile(filePath);
    res.writeHead(200,{ "content-type": contentType});
    res.end(data);
  }catch(err){
    res.writeHead(404,{ "content-type": "text/plain"});
    res.end("404 page not found");
  }
}
const server=createServer(async(req,res)=>{
  if(req.method==='GET'){
    if(req.url==='/'){
      return serveFile(res,path.join('public','index.html'),"text/html");
    }else if(req.url==="/index.css"){
        return serveFile(res,path.join('public','index.css'),"text/css");
    }else if(req.url==="/links"){
      const links = await loadLinks();
      res.writeHead(200,{"Content-Type":"application/json"});
      return res.end(JSON.stringify(links));
    }else{
      const links = await loadLinks();
      const shortCode = req.url.slice(1);
      if(links[shortCode]){
        res.writeHead(302, { location: links[shortCode]});
        return res.end();
      }
      res.writeHead(404, {"Content-Type": "text/plain"});
      return res.end("shortend url is not found.");
    }
  }
  if(req.method==='POST' && req.url==='/shorten'){
    const links = await loadLinks();

    let body="";
    req.on('data',(chunk)=>{
      body+=chunk;
    });
    req.on('end',async()=>{
      console.log(body);
      const {url,shortCode} = JSON.parse(body);

      if(!url){
        res.writeHead(400, {"Content-Type": "text/plain"});
        return res.end("url is required.");
      }

      const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

      if(links[finalShortCode]){
        res.writeHead(400, {"Content-Type": "text/plain"});
        return res.end("short code already exists. please choose another.");
      }

      links[finalShortCode]=url;

      await saveLinks(links);
      res.writeHead(200, {"content-type": "application/json"});
      res.end(JSON.stringify({success: 'true', shortCode: finalShortCode}));
    })
  }
});

server.listen(PORT,"0.0.0.0",()=>{
  console.log(`listening on port ${PORT}`);
});