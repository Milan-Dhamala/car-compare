import brandModel from '../models/brandModel.js';
import fs from 'fs'

//addbrand

const addBrand = async (req, res) => {
  let logo_filename = `${req.file.filename}`;

  const brand = new brandModel({
    name: req.body.name,
    logo: logo_filename,
  });
  try {
    await brand.save();
    res.json({ success: true, message: "Brand Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


//get all brand list
const listBrand = async (req, res) => {
  try {
    const brands = await brandModel.find({});
    res.json({ success: true, data: brands });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get a single brand by ID
const getBrand = async (req, res) => {
  try {
    const brand = await brandModel.findById(req.params.id);
    if (brand) {
      res.json({ success: true, data: brand });
    } else {
      res.json({ success: false, message: "Brand not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error retrieving brand" });
  }
};


//remove brand item
const removeBrand = async (req, res) => {
  try {
    const brand = await brandModel.findById(req.body.id);
    fs.unlink(`uploads/${brand.logo}`, () => {});

    await brandModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Brand Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Update brand
const updateBrand = async (req, res) => {
  try {
    const { id, name } = req.body;
    let updateData = { name };

    if (req.file) {
      // If a new logo is uploaded, delete the old logo and update the logo filename
      const brand = await brandModel.findById(id);
      if (brand && brand.logo) {
        fs.unlink(`uploads/${brand.logo}`, () => {});
      }
      updateData.logo = req.file.filename;
    }

    const updatedBrand = await brandModel.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ success: true, message: "Brand Updated", data: updatedBrand });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addBrand, listBrand, getBrand, removeBrand, updateBrand };