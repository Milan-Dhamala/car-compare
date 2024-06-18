import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
      },
      shortdesc: {
        type: String, 
        maxlength: 100
      },
      image: {
        type: String,
        required: true
      }
 });

 const modelModel = mongoose.models.model || mongoose.model("model",modelSchema)


 export default modelModel;