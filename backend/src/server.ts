import "dotenv/config";
import env from "../src/util/validateEnv";
import mongoose from "mongoose";
import express from "express";
const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World!");
})
const port = env.PORT;


mongoose.connect(env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("MongoDB Connected!");
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
})
