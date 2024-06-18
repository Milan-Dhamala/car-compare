import modelModel from '../models/modelModel.js';
import brandModel from '../models/brandModel.js';
import fs from 'fs'


//addmodel

const addModel = async (req, res) => {
  const { name, brandName, shortdesc } = req.body;

  if (!name || !brandName) {
    return res.status(400).json({ success: false, message: "Name and brandName are required." });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: "Model image is required." });
  }

  try {
    // Find the brand by its name
    const existingBrand = await brandModel.findOne({ name: brandName });
    if (!existingBrand) {
      return res.status(404).json({ success: false, message: "Brand not found." });
    }

    let image_filename = `${req.file.filename}`;


    // Create a new model instance
    const model = new modelModel({
      name,
      brand: existingBrand._id, // Use the _id of the existing brand
      shortdesc,
      image: image_filename
    });

    // Save the model to the database
    await model.save();

    res.status(201).json({ success: true, message: "Model added successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding model"});
  }
};


//all model list
const listModel = async (req, res) => {
    try {
      const models = await modelModel.find({});
      res.status(201).json({ success: true, data: models });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error" });
    }
  };


 //listmodel by brand

const listModelsByBrand = async (req, res) => {
  try {
    const brands = await brandModel.find({});
    const brandsWithModels = await Promise.all(
      brands.map(async (brand) => {
        const models = await modelModel.find({ brand: brand._id });
        return { brand, models };
      })
    );
    res.json({ success: true, data: brandsWithModels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching models by brands" });
  }
};


// List models by specific brand ID
const listModelsByBrandId = async (req, res) => {
  try {
    const { brandId } = req.params;

    // Validate if brand exists
    const brand = await brandModel.findById(brandId);
    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    // Find models by brand ID
    const models = await modelModel.find({ brand: brandId });

    if (models.length === 0) {
      return res.status(404).json({ success: false, message: "No models found for this brand" });
    }

    res.status(200).json({ success: true, data: models });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching models by brand", details: error.message });
  }
};


// Get a single model by ID
const getModel = async (req, res) => {
  try {
    const model = await modelModel.findById(req.params.id);
    if (model) {
      res.json({ success: true, data: model });
    } else {
      res.json({ success: false, message: "Model not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error retrieving model" });
  }
};

  

//update a model
const updateModel = async (req, res) => {
  const { id, name, brand, shortdesc } = req.body; // Remove 'image' from here as it will be handled separately

  try {
    let updateData = { name, brand: brand._id, shortdesc };

    if (req.file) {
      // If a new image is uploaded, delete the old image and update the image filename
      const model = await modelModel.findById(id);
      if (model && model.image) {
        fs.unlink(`uploads/${model.image}`, () => {}); // Delete the old image file
      }
      updateData.image = req.file.filename; // Update the image filename in the update data
    }

    const updatedModel = await modelModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ message: 'Model not found' });
    }

    res.status(200).json({ success: true, message: 'Model updated successfully', data: updatedModel });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating model', error: error.message });
  }
};

//remove a model item
const removeModel = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ success: false, message: "Model ID is required." });
    }
    const model = await modelModel.findById(req.body.id);
    fs.unlink(`uploads/car/${model.image}`,() =>{});

    await modelModel.findByIdAndDelete(req.body.id);
    res.status(201).json({ success: true, message: "Model Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing model"});
  }
};


export { addModel, listModel,removeModel,listModelsByBrand,updateModel,getModel,listModelsByBrandId };
