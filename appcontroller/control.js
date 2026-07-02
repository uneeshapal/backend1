import user from "../schema/schema.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { SiAmeba, SiAssemblyscript } from "react-icons/si";
// import addcart from "../schema/addcart.js";



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

  const { email, productid, name, price, image } = req.body;

  const data = await addcart.create({
    email,
    productid,
    name,
    price,
    image,
    quantity: 1
  });

  res.status(200).json({
    msg: "Product Added To Cart",
    cart: data
  });

};