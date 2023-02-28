import http from "http";

import path from "path";

import express from "express";

import { dirname } from 'path'
import { fileURLToPath} from 'url'
import {config} from "dotenv";
import {routesInit} from "./src/routes/configRoutes.js";
import {main} from "./src/db/mongoConnect.js";
import {port} from "./src/config/secret.js";

// const cors  = require("cors"); мидлвер
main().catch((err) => console.log(err))

const __dirname = dirname(fileURLToPath(import.meta.url))

config();

const app = express();
// app.use(cors()); мидлвер
app.use(express.json()); //мидлвер
app.use(express.static(path.join(__dirname, "public")));

routesInit(app);

const server = http.createServer(app);

server.listen(port);