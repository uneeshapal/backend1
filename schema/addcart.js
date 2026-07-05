import mongoose from "mongoose";

const addcartSchema = new mongoose.Schema({
  email: String,
  productid: Number,
  name: String,
  price: String,
  image: String,
  quantity: {
    type: Number,
    default: 1
  }
});

const addcart = mongoose.model("addcart", addcartSchema);

export default addcart;