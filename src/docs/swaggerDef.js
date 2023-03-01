import {port} from "../config/secret.js";

export const swaggerDef = {
    openapi: "3.0.0",
    info: {
        title: "API-project(3/4)",
        version: '0.1.0',
        description: "This is my API for toys shop",
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
            url: `http://localhost:${port}`,
            description: "This is my local server"
        }
    ],
    paths: {
        "/toys": {
            "get": {
                "summary": "Get a list of all products",
                "description": "Returns a list of all products available in the store",
                "responses": {
                    "200": {
                        "description": "A list of products",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "type": "string"
                                            },
                                            "id": {
                                                "type": "string",
                                                "minimum": 1
                                            },
                                            "img_url": {
                                                "type": "string"
                                            },
                                            "price": {
                                                "type": "number",
                                                "minimum": 0
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Server error"
                    }
                }
            },
            "post": {
                "summary": "Post a product",
                "description": "Creates a new product and returns its details",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "id": {
                                        "type": "string",
                                        "minimum": 1
                                    },
                                    "img_url": {
                                        "type": "string"
                                    },
                                    "price": {
                                        "type": "number",
                                        "minimum": 1
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "A single product",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "type": "string"
                                        },
                                        "id": {
                                            "type": "string",
                                            "minimum": 1
                                        },
                                        "img_url": {
                                            "type": "string"
                                        },
                                        "price": {
                                            "type": "number",
                                            "minimum": 1
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Product not found"
                    },
                    "500": {
                        "description": "Server error"
                    }
                }
            }
        },
            "/toys/id": {
                delete: {
                    summary: "Delete a product by ID",
                    description: "Deletes a single product identified by its ID",
                    parameters: [
                        {
                            id: "id",
                            required: true,
                            schema: {
                                type: "integer",
                                minimum: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "A single product",
                            content: {
                                "application/json": {
                                    // schema: {
                                    //     $ref: "#/components/schemas/Product"
                                    // }
                                }
                            }
                        },
                        404: {
                            description: "Product not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },
            "/toys/search/": {
                get: {
                    summary: "Get a product by name",
                    description: "Returns a single product identified by its name",
                    parameters: [
                        {
                            name: "",
                            in: "query",
                            description: "The ID of the product to retrieve",
                            required: true,
                            schema: {
                                type: "integer",
                                minimum: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "",
                            content: {
                                "application/json": {
                                    // schema: {
                                    //     $ref: "#/components/schemas/Product"
                                    // }
                                }
                            }
                        },
                        404: {
                            description: "Product not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },
            "/toys/category": {
                get: {
                    summary: "Get a product/s by category name",
                    description: "Returns a numerous amount of products identified by its category name",
                    parameters: [
                        {
                            name: "category",
                            in: "query",
                            description: "The name of the product to retrieve",
                            required: true,
                            schema: {
                                type: "integer",
                                minimum: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Uncertain amount of products",
                            content: {
                                "application/json": {
                                    // schema: {
                                    //     $ref: "#/components/schemas/Product"
                                    // }
                                }
                            }
                        },
                        404: {
                            description: "Product not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },
            "/toys/single/:id": {
                get: {
                    summary: "Get a product by ID",
                    description: "Returns a single product identified by its ID",
                    parameters: [
                        {
                            id: "productId",
                            in: "path",
                            description: "The ID of the product to retrieve",
                            required: true,
                            schema: {
                                type: "integer",
                                minimum: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "A single product",
                            content: {
                                "application/json": {
                                    // schema: {
                                    //     $ref: "#/components/schemas/Product"
                                    // }
                                }
                            }
                        },
                        404: {
                            description: "Product not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },
            "/toys/:id": {
                put: {
                    summary: "Changes the body of the product by its id",
                    description: "Returns a single product identified by its ID",
                    parameters: [
                        {
                            id: "productId",
                            info: "",
                            img_url: "",
                            price: "",
                            in: "path",
                            description: "The ID of the product to retrieve",
                            required: true,
                            schema: {
                                type: "integer",
                                minimum: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "A single product",
                            content: {
                                "application/json": {
                                    // schema: {
                                    //     $ref: "#/components/schemas/Product"
                                    // }
                                }
                            }
                        },
                        404: {
                            description: "Product not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },
            "/users": {
                get: {
                    summary: "Users endpoint",
                    description: "",
                    responses: {
                        200: {
                            description: "All users",
                            content: {
                                "application/json": {
                                    // schema: {
                                    //     $ref: "#/components/schemas/Product"
                                    // }
                                }
                            }
                        },
                        404: {
                            description: "Users not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },
            "/users/userInfo": {
                get: {
                    summary: "Gives an info about user if you have a token",
                    description: "Returns a single user by his token",
                    parameters: [
                        {
                            email: "",
                            password: "",
                            role: "",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                                minimum: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "A single user",
                            content: {
                                "application/json": {
                                    // schema: {
                                    //     $ref: "#/components/schemas/Product"
                                    // }
                                }
                            }
                        },
                        404: {
                            description: "User not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },
            "/users/": {
                post: {
                    summary: "creates user",
                    description: "creates a single user",
                    parameters: [
                        {
                            name: "",
                            email: "",
                            password: "",
                            role: "",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                                minimum: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "A single user",
                            content: {
                                "application/json": {
                                    // schema: {
                                    //     $ref: "#/components/schemas/Product"
                                    // }
                                }
                            }
                        },
                        404: {
                            description: "User not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },
            "/users/login": {
                post: {
                    summary: "log into user",
                    description: "Returns token that gives you a right to log in",
                    parameters: [
                        {
                            email: "",
                            password: "",
                            role: "",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer",
                                minimum: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "A single user",
                            content: {
                                "application/json": {
                                    // schema: {
                                    //     $ref: "#/components/schemas/Product"
                                    // }
                                }
                            }
                        },
                        404: {
                            description: "User not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },
        }
    }

