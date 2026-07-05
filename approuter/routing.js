import express from 'express';

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
  placeordercontrol
} from "../appcontroller/control.js";

const app = express.Router();

app.get("/", (req, res) => {
    res.send("Hello World from Backend 1");
});

app.get("/web", webRouter);
app.get("/about", myabout);
app.get("/blog", blog);
app.get("/contect",contect);
app.get("/empdata" ,empdata);
app.post("/register", registercontrol);
app.post("/login", logincontrol);
app.post("/profile",singleusercontrol);
app.post("/addcart", addcartcontrol);
app.post("/getcart", getcartcontrol);
app.post("/placeorder", placeordercontrol);

export default app;