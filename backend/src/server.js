import "dotenv/config";
import { connectDB } from "./config/db.js";
import app from "./app.js"

const PORT = process.env.PORT ?? 8080;

try{
    await connectDB();
    console.log("db ok");
    app.listen (PORT, () => {
        console.log(`API corriendo en el servidor http://localhost:${PORT}`)
    })
}catch(err){
    console.error(`Error`, err)
}