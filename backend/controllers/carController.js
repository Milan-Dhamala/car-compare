import mongoose from "mongoose";
import carModel from "../models/carModel.js";
import brandModel from "../models/brandModel.js"
import modelModel from "../models/modelModel.js"
import fs from "fs";

//add car

const addCar = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Car image is required." });
  }

  let image_filename = `${req.file.filename}`;

  const car = new carModel({
    image: image_filename,
    brand: req.body.brand,
    model: req.body.model,
    type: req.body.type,
    price: req.body.price,
    description: req.body.description,
    year: req.body.year,
    mileage: req.body.mileage,
    engineDisplacement: req.body.engineDisplacement,
    fuelType: req.body.fuelType,
    transmission: req.body.transmission,
    power: req.body.power,
    seatingCapacity: req.body.seatingCapacity,
  });

  try {
    await car.save();
    res.status(201).json({ success: true, message: "Car Added" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error", details: error.message });
  }
};

const listCar = async (req, res) => {
  try {
    //const cars = await carModel.find().populate('brand');
    const cars = await carModel.aggregate([
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand'
        }
      },
      {
        $lookup: {
          from: 'models',
          localField: 'model',
          foreignField: '_id',
          as: 'model'
        }
      },
      {
        $unwind: '$brand'
      },
      {
        $unwind: '$model'
      }
    ]);
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching cars" });
  }
};

//search api
const searchCar = async (req, res) => {
  try {
    // Extract form values from the request query parameters
    const { year, type, brand, model, fuelType, transmission } = req.query;

    const brandName = await brandModel.findById(brand);
    const modelName = await modelModel.findById(model);

    // Build the search query based on the provided parameters
    const searchQuery = {};
    if (year) {
      searchQuery.year = parseInt(year, 10); // Ensure year is an integer
    }
    if (type) {
      searchQuery.type = type;
    }
    if (brand) {
      searchQuery.brand = brand;
    }
    if (model) {
      searchQuery.model = model;
    }
    if (fuelType) {
      searchQuery.fuelType = fuelType;
    }
    if (transmission) {
      searchQuery.transmission = transmission;
    }
    const cars = await carModel.find(searchQuery);

   // Modify the brand and model IDs with their names
    const modifiedCars = cars.map(car => ({
      ...car.toObject(),
      brand: brandName ? brandName.name : "",
      model: modelName ? modelName.name : ""
    }));
    res.status(200).json({ success: true, data: modifiedCars });
  } catch (error) {
    // Handle errors
    console.error('Error searching cars:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Get a single car by ID
const getCar = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.id);
    
    if (car) {
      res.json({ success: true, data: car });
    } else {
      res.json({ success: false, message: "Car not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error retrieving car" });
  }
};


//get a single car by modelId
const getCarbyModel = async(req, res) => {
  try {
    const { modelId } = req.params;
    const car = await carModel.findOne({ model: modelId });
    if (car) {
      res.status(200).json({ data: car });
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Update a car
const updateCar = async (req, res) => {
  const {
    id,
    brand,
    model,
    type,
    price,
    description,
    year,
    mileage,
    engineDisplacement,
    fuelType,
    transmission,
    power,
    seatingCapacity
  } = req.body;

  console.log(`Received ID: ${id}`);

  try {
    let updateData = {
      brand,
      model,
      type,
      price,
      description,
      year,
      mileage,
      engineDisplacement,
      fuelType,
      transmission,
      power,
      seatingCapacity
    };

    if (req.file) {
      // If a new image is uploaded, delete the old image and update the image filename
      const car = await carModel.findById(id);
      if (car && car.image) {
        fs.unlink(`uploads/${car.image}`, () => {}); // Delete the old image file
      }
      updateData.image = req.file.filename; // Update the image filename in the update data
    }

    const updatedCar = await carModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json({ success: true, message: 'Car updated successfully', data: updatedCar });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating car', error: error.message });
  }
};


//remove car item
const removeCar = async (req, res) => {
  try {
    const car = await carModel.findById(req.body.id);
    fs.unlink(`uploads/car/${car.image}`, () => {});

    await carModel.findByIdAndDelete(req.body.id);
    res.status(201).json({ success: true, message: "Car Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};



export { addCar, listCar, removeCar,getCar,updateCar,searchCar,getCarbyModel };
