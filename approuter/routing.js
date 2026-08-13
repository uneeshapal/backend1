import express from "express";

import {
  webRouter,
  myabout,
  blog,
  contect,
  empdata,
  registercontrol,
  logincontrol,
  singleusercontrol,
  addcartcontrol,
  getcartcontrol,
  placeordercontrol,
  removecartcontrol,
  updatecartcontrol,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  adminDashboard,
 getBestSellingProducts,
adminRegister,
adminLogin
} from "../appcontroller/control.js";

const app = express.Router();

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World from Backend 1");
});

// Normal Routes
app.get("/web", webRouter);
app.get("/about", myabout);
app.get("/blog", blog);
app.get("/contect", contect);
app.get("/empdata", empdata);

app.post("/register", registercontrol);
app.post("/login", logincontrol);
app.post("/profile", singleusercontrol);

// Cart Routes
app.post("/addcart", addcartcontrol);
app.post("/getcart", getcartcontrol);
app.put("/cart/:id", updatecartcontrol);
app.delete("/cart/:id", removecartcontrol);

// Order Route
app.post("/placeorder", placeordercontrol);

// -------------------------------------------------
// Admin Product CRUD Routes


// Add Product
app.post("/products", addProduct);

// Get All Products
app.get("/products", getProducts);

// Update Product
app.put("/products/:id", updateProduct);

// Delete Product
app.delete("/products/:id", deleteProduct);

app.get("/admin/dashboard", adminDashboard);



app.get("/best-selling", getBestSellingProducts);


// admin login
app.post("/admin/login", adminLogin);
app.post("/admin/register",adminRegister);

export default app;