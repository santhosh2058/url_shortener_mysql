import { getLinkByShortCode } from '../models/shortener.model.js';
export const redirectToShortCode = async(req,res)=>{
  try{
    const {shortCode}= req.params;
    
    const link = await getLinkByShortCode(shortCode);
    if(!link.url){
      return res.status(404).send("shortend url is not found.");
    }
    res.redirect(link.url);
  }catch(err){
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}