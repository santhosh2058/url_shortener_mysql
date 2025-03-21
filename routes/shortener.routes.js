import express from 'express'
import {getShortenerPage} from '../controllers/controller.getShortener.js'
import { postURLShortener } from '../controllers/controller.postURLShortener.js'
import {redirectToShortCode} from '../controllers/controller.redirectToShortCode.js'
const router=express.Router();


router.get("/", getShortenerPage)

router.post("/",postURLShortener)

router.get("/:shortCode", redirectToShortCode)

export const shortnedRoutes = router;