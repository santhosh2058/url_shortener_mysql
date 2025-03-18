import { readFile, writeFile } from 'fs/promises'
import crypto from 'crypto'
import path from 'path'
import express from 'express'

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join("data","links.json");

const app =express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const loadLinks = async()=>{
  try{
    const data= await readFile(DATA_FILE,"utf-8");
    return JSON.parse(data);
  }catch(err){
    if(err.code==="ENOENT"){
      await writeFile(DATA_FILE, JSON.stringify({}), "utf-8");
      return {};
    }
    throw err;
  }
}

const saveLinks = async(links)=>{
  await writeFile(DATA_FILE,JSON.stringify(links));
}

app.get("/", async(req,res)=>{
  try{
    const file = await readFile(path.join('views','index.html'));
    const links = await loadLinks();

    const content = file.toString().replaceAll('{{ shortened_urls }}',
      Object.entries(links)
        .map(
          ([shortCode,url]) =>
            `<li><a href="/${shortCode}" target="_blank">
        ${req.hostname}/${shortCode}</a> - ${url}</li>`
        )
        .join("")
      );
    return res.send(content);
  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
})

app.post("/",async(req,res)=>{
  try{
    const {url,shortCode} = req.body;
    if (!url) return res.status(400).send("URL is required.");
    const links = await loadLinks();

    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    if(links[finalShortCode]){
      return res.status(400).send("short code already exists. please choose another.");
    }

    links[finalShortCode]=url;

    await saveLinks(links);
    return res.redirect("/");
  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
})

app.get("/:shortCode", async(req,res)=>{
  try{
    const {shortCode}= req.params;
    const links = await loadLinks();
    if(!links[shortCode]){
      return res.status(404).send("shortend url is not found.");
    }
    res.redirect(links[shortCode]);
  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
})

app.listen(PORT,"0.0.0.0",()=>{
  console.log(`listening on port ${PORT}`);
});