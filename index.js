import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.get("/", (req, res) => res.send("welcome"));
app.all("*", (req, res) =>res.send("route doesnt exist"));

app.listen(3000, () =>console.log(`Server running on port: http://localhost:3000`));
