// import {db} from '../config/mysql.js'
// import pkg from "@prisma/client";
// const { PrismaClient } =pkg;

import {db} from '../config/db.js'
import { user} from '../drizzle/schema.js'
import { eq } from 'drizzle-orm';

// const prisma = new PrismaClient();
export const loadLinks = async()=>{
  // const [rows] = await db.execute(`select shortCode,url from short_links;`);
  // return rows;

  // const allLinks = await prisma.user.findMany();
  // return allLinks;

  const allLinks = await db.select({shortCode:user.shortCode,url:user.url}).from(user);
  return allLinks;
}

export const saveLinks = async (link)=>{
  //await db.execute(`insert into short_links(shortCode,url) values (?,?)`,[link.shortCode,link.url]);
  // await prisma.user.create({
  //   data:{
  //     shortCode: link.shortCode,
  //     url: link.url
  //   }
  // });

  await db.insert(user).values({shortCode:link.shortCode,url:link.url});
}

export const getLinkByShortCode= async (shortcode)=>{
  // const [rows]=await db.execute(`select url from short_links where shortCode = ?`,[shortcode]);
  // return rows.length?rows[0]:null;

  // const link = await prisma.user.findUnique({
  //   where: {shortCode: shortcode}
  // })
  // console.log(link);
  // return link;

  const [link] = await db.select().from(user).where(eq(user.shortCode,shortcode));
  console.log(link);
  return link;
}
