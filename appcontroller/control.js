import user from "../schema/schema.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import addcart from "../schema/addcart.js";
import Order from "../schema/order.js";
import Product from "../schema/adminproduct.js";
import Admin from "../schema/admin.js";


export const webRouter = (req, res) => {
    res.send("Welcome to the Web Router!");
}

export const myabout = (req, res) => {
    res.send("This is the About Page of Backend 1");
}

export const blog = (req, res) => {
    res.send("Welcome to the Blog Page of Backend 1");
}

export const contect  = ( req, res) => {
    res.send ("this is  the contect page of backend 1");
}


export const empdata = async(req,res)=>{
    const emp1data = await user.find({age:30});
    res.status(200).json({datalist:emp1data});
}


export const registercontrol = async (req, res) => {
    console.log("Register API Hit");
    console.log(req.body);

    const { name, email, password ,address,phone,gender,role} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const rdata = await user.create({
        name,
        email,
        password:hashPassword,
        address,
        phone,
        gender,
        role
    });

    res.status(200).json({
        message: "User registered successfully",
        data: rdata
    });
};

export const logincontrol = async (req, res) => {

    const { email, password} = req.body;

    if (email == "") {
        return res.status(200).json({
            msg: "email is required",
            status: 210
        });
    }

    if (password == "") {
        return res.status(200).json({
            msg: "password is required",
            status: 211
        });
    }

    const userdata = await user.findOne({ email });

    if (!userdata) {
        return res.status(200).json({
            msg: "email not found",
            status: 260
        });
    }

const passwordcomp = await bcrypt.compareSync(password,userdata.password)

    if (email == userdata.email && passwordcomp) {

        const mytoken = jwt.sign({name:"kumar"},"hello",{expiresIn:"1h"});
        res.cookie("mytoken",mytoken,{
            httpOnly:true,
            secure:false,
            SameSite:"lax",
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({
            msg: "welcome to dashboard",
            status: 251,
            userinfo: userdata,
            token:mytoken
        });
    } else {
        return res.status(200).json({
            msg: "email and password wrong",
            status: 240
        });
    }
};



export const singleusercontrol = async (req, res) => {
  const { email } = req.body;

  const singleuserdata = await user.findOne({ email });

  console.log("User Found:", singleuserdata);

  res.status(200).json({
    userlist: singleuserdata,
  });
};
// product
export const addcartcontrol = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const data = await addcart.create(req.body);

    console.log("Saved:", data);
    console.log("Collection:", addcart.collection.name);

    res.status(200).json({
      msg: "Product Added",
      cart: data
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      error: err.message
    });
  }
};
export const getcartcontrol = async (req, res) => {
  try {
    const { email } = req.body;

    const data = await addcart.find({ email });

    res.status(200).json({
      cart: data
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const placeordercontrol = async (req, res) => {

  const data = await Order.create(req.body);

  res.status(200).json({
    msg: "Order Placed Successfully",
    order: data
  });

};

export const removecartcontrol = async (req, res) => {
  try {
    await addcart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      msg: "Item Removed"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updatecartcontrol = async (req, res) => {
  try {
    const { quantity } = req.body;

    const data = await addcart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    res.status(200).json({
      cart: data
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// admin product control functions

// Add Product
export const addProduct = async (req, res) => {
  try {
    console.log("PRODUCT BODY:", req.body);

    const { adminId } = req.body;

    // Admin ID check
    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    // Check admin exists
    const adminData = await Admin.findById(adminId);

    if (!adminData) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Create product
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      oldPrice: req.body.oldPrice || 0,
      discount: req.body.discount || "0%",
      category: req.body.category,
      stock: req.body.stock,
      description: req.body.description,
      image: req.body.image,

      showOnHome: false,
      bestSelling: false,

      // IMPORTANT
      createdBy: adminId,
    });

    // Admin ke added count ko +1 karo
    await Admin.findByIdAndUpdate(adminId, {
      $inc: {
        productsAdded: 1,
      },
    });

    console.log("PRODUCT SAVED:", product);

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    console.log("GET PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const adminDashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await user.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      success: true,
      totalProducts,
      totalUsers,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getBestSellingProducts = async (req, res) => {
   try {
      const products = await Product.find({
         bestSelling: true
      });

      res.status(200).json({
         success: true,
         products
      });

   } catch(err){
      res.status(500).json({
         success:false,
         message:err.message
      });
   }
}



// admin login control
// admin login control
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const adminData = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!adminData) {
      return res.status(401).json({
        success: false,
        message: "Seller not found",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      adminData.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
  {
    id: adminData._id,
    email: adminData.email,
    role: "admin",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Seller Login Successful",
      token,
      admin: {
        id: adminData._id,
        name: adminData.name,
        email: adminData.email,
        role: adminData.role,
      },
    });

  } catch (error) {
    console.log("ADMIN LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// admin register
export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Seller already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      message: "Seller registered successfully",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.log("ADMIN REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};