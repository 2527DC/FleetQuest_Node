import express from "express";
import router from "./src/routes/admin.js";


const app=express()
app.use(express.json())

// Use the admin router
app.use("/api", router);

// Define the port
const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})