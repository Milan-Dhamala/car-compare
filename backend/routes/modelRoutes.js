import express from 'express';
import authMiddleware from '../middleware/auth.js'
import { addModel, listModel, removeModel,listModelsByBrand,updateModel,getModel,listModelsByBrandId } from '../controllers/modelController.js'; 
import multer from 'multer';

const modelRouter = express.Router();

// Configure Multer image storage engine

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

const upload = multer({ storage: storage});



modelRouter.post("/add",upload.single("image"),authMiddleware,addModel)
modelRouter.get("/list",listModel)
modelRouter.get("/listbybrand",listModelsByBrand)
modelRouter.get('/listbybrand/:brandId', listModelsByBrandId);
modelRouter.get("/:id",getModel)
modelRouter.post("/remove",removeModel)
modelRouter.put("/update",upload.single("image"),authMiddleware, updateModel)




export default modelRouter;