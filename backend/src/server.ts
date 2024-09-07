import express from "express";
const app = express();
const port = undefined;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello, World!");
});

app.listen(port!, () => {
    console.log(`Server started on port ${port}`);
});