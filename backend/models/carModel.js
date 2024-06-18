import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    image: {
        type: String,
        required:true
      },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
      },
      model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        required: true
      },
      type: {
        type: String,
        enum: ['SUV', 'Coupe', 'Hatchback', 'Sedan', 'Wagon', 'Minivan', 'Pickup Truck'],
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String
      },
      year: {
        type: Number,
        //required: true
      },
      mileage: {
        type: Number,
        //required: true
      },
      engineDisplacement: {
        type: String,
        //required: true
      },
      fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric'],
        //required: true
      },
      transmission: {
        type: String,
        enum: ['Manual', 'Automatic', 'Semi-Automatic'],
        //required: true
      },
      power: {
        type: String,
        //required: true
      },
      seatingCapacity: {
        type: Number,
        //required: true
      }
 });

 const carModel = mongoose.models.car || mongoose.model("car",carSchema)


 export default carModel;