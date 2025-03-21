import {db} from '../config/mysql.js'

export const loadLinks = async()=>{
  const [rows] = await db.execute(`select shortCode,url from short_links;`);
  return rows;
}

export const saveLinks = async (link)=>{
  await db.execute(`insert into short_links(shortCode,url) values (?,?)`,[link.shortCode,link.url]);
}

export const getLinkByShortCode= async (shortcode)=>{
  const [rows]=await db.execute(`select url from short_links where shortCode = ?`,[shortcode]);
  return rows.length?rows[0]:null;
}