import http from "http";

import path from "path";

import express from "express";

require("./src/db/mongoConnect");

import {config} from "dotenv";
import {routesInit} from "./src/routes/configRoutes.js";

// const cors  = require("cors"); мидлвер


config();

const app = express();
// app.use(cors()); мидлвер
app.use(express.json()); //мидлвер
app.use(express.static(path.join(__dirname, "public")));

routesInit(app);

const server = http.createServer(app);

let port = process.env.PORT || 3001;
server.listen(port);
