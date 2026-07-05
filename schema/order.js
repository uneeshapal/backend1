import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  pincode: String,

  productid: Number,
  productname: String,
  price: String,
  image: String,
  quantity: Number,

  payment: String,
  status: {
    type: String,
    default: "Pending"
  }
});

export default mongoose.model("Order", orderSchema);