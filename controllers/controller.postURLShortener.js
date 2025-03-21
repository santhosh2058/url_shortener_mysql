import crypto from 'crypto'
import { loadLinks,saveLinks } from '../models/shortener.model.js';
export const postURLShortener=async(req,res)=>{
  try{
    const {url,shortCode} = req.body;
    if (!url) return res.status(400).send("URL is required.");
    const links=await loadLinks();

    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const existingShortCode=links.find((link)=>link.shortCode == finalShortCode)
  
    if(existingShortCode){
      return res.status(400).send("short code already exists. please choose another.");
      
    }


    await saveLinks({shortCode,url});
    return res.redirect("/");
  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}