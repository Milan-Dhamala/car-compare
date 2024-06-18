import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { addBrand, listBrand, removeBrand, updateBrand,getBrand } from '../controllers/brandController.js';
import multer from 'multer';


const brandRouter = express.Router();


// Configure Multer image storage engine

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

const upload = multer({ storage: storage });



brandRouter.post("/add",upload.single("logo"),authMiddleware,addBrand);
brandRouter.get("/list",listBrand)
brandRouter.get("/:id",getBrand)
brandRouter.post("/remove",removeBrand)
brandRouter.put("/update",upload.single("logo"),authMiddleware, updateBrand)



export default brandRouter;