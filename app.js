const express = require("express");
const http = require("http");
const path = require("path");
require("dotenv").config();
// const cors  = require("cors"); мидлвер

const {routesInit} = require("./routes/configRoutes");
require("./db/mongoConnect");

const app = express();
// app.use(cors()); мидлвер
app.use(express.json()); //мидлвер
app.use(express.static(path.join(__dirname,"public")));

routesInit(app);

const server = http.createServer(app);

let port = process.env.PORT || 3001;
server.listen(port);
