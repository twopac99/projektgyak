const express = require("express"); //könyvtárimportálás
const app=express();
const mongoose=require("mongoose"); 
const dotenv=require("dotenv");
const userRoute=require("./routes/user")
const authRoute=require("./routes/auth")
const productRoute=require("./routes/product")
const cartRoute=require("./routes/cart")
const orderRoute=require("./routes/order")
const stripeRoute=require("./routes/stripe")
var cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB Connection successful!")).catch((err)=>{
    console.log(err);
}); //app összekapcsolása MongoDB-vel (és siker/kudard jelzése)

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
   
    next();
  });
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running"); //terminálba írás
});
