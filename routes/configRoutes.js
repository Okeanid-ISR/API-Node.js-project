const indexR = require("./index");
const toysR = require("./toys");

exports.routesInit = (app) => {
    app.use("/",indexR);
    app.use("/toys",toysR);
}