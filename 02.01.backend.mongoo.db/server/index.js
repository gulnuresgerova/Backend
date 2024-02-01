const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const { Schema } = mongoose;
const DB_URL = `mongodb+srv://gulnur:gs1905@cluster0.bmon9ym.mongodb.net/`;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected succesfuly !");
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});
const ProductModel = mongoose.model("ProductModel", productSchema);

//get all products

app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.send(products).status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

// //get product by id

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    res.send(product).status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

// //delete product by id

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    res.send(deleteProduct).status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

// //post new product

app.post("/products", async (req, res) => {
  const newProduct = new Products(req.body);
  try {
    await newProduct.save();
    res.status(201).send({
      message: "created succesfully!",
      data: newProduct,
    });
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

// // update data, put

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Products.findByIdAndUpdate(id, req.body);
    const updatedProduct = await Products.findById(id);
    res.status(200).send({
      message: "updated succesfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});
