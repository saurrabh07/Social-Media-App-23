import express from 'express'
// import multer from 'multer'
import { login } from '../controllers/auth.js';
import bodyParser from 'body-parser';

 
const router = express.Router(); 


router.post("/login" , login);

export default router ;