import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error(err));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
