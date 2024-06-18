import express from 'express';
import { addCar,getCar,getCarbyModel,listCar,removeCar, searchCar, updateCar } from '../controllers/carController.js';
import multer from 'multer';

const carRouter = express.Router();


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

  carRouter.post("/add",upload.single("image"),addCar);
  carRouter.get("/list",listCar);
  carRouter.get("/search",searchCar)
  carRouter.get("/:id",getCar)
  carRouter.get("/detailsbymodel/:modelId",getCarbyModel)
  carRouter.post("/remove",removeCar);
  carRouter.put("/update",upload.single("image"), updateCar)


  export default carRouter;