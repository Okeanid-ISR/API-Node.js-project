import {port} from "../config/secret.js";

export const swaggerDef = {
    openapi: "3.0.0",
    info: {
        title: "API-project(3/4)",
        version: '0.1.0',
        description:
            "API for toys shop",
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html"
        },
        contact: {
            name: "Ilya Tsoy",
            email: "iliya_tsoy@mail.ru",
            phone: "050-9880081"
        }
    },
    servers: [
        {
            url: `http://localhost:${port}/api`
        }
    ]
};