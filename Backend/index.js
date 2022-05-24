import express from "express";
import cors from "cors";
const app = express();
import { query } from "./db";

app.use(cors());
//app.use(express.json()) //will give access to req.body
//routes
app.get("/users", async(req,res)=>{
    try{
        const {name} = req.query;
        const users = await query("SELECT * FROM users FROM first_name || '' || last_name || '' || email || '' || gender ILIKE $1" [`%${name}%`]);
    res.json(users.rows);

    }catch{
        console.error(err.message);
    }
})
app.listen(3000, () =>{
    console.log("server is starting")
})