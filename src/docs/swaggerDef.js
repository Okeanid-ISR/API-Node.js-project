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
                summary: "Delete a single product by ID",
                description: "Deletes a single product identified by its ID",
                parameters: [
                    {
                        name: "id",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Product deleted successfully"
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
        "/toys/search": {
            get: {
                summary: "Get a product by name",
                description: "Returns a single product identified by its name",
                parameters: [
                    {
                        name: "name",
                        in: "query",
                        description: "The name of the product to retrieve",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "A single product",
                        content: {
                            "application/json": {
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
                summary: "Get products by category name",
                description: "Returns a list of products identified by their category name",
                parameters: [
                    {
                        name: "category",
                        in: "query",
                        description: "The name of the category to search for",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "List of products",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: "No products found for the given category",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
        "/toys/:id": {
            get: {
                summary: "Get a product by ID",
                description: "Returns a single product identified by its ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "The ID of the product to retrieve",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1,
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "A single product",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Product not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            put: {
                summary: "Update a product by ID",
                description: "Updates a single product identified by its ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "The ID of the product to update",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1,
                        },
                    },
                    {
                        name: "product",
                        in: "body",
                        description: "The updated product data",
                        required: true,
                        schema: {
                            $ref: "#/components/schemas/ProductInput",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "The updated product",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Product not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            delete: {
                summary: "Delete a product by ID",
                description: "Deletes a single product identified by its ID",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "The ID of the product to delete",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1,
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "The deleted product",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product",
                                },
                            },
                        },
                    },
                    404: {
                        description: "Product not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },

        "/users": {
            get: {
                summary: "Get all users",
                description: "Returns all users",
                responses: {
                    200: {
                        description: "A list of users",
                        content: {
                            "application/json": {
                                // schema: {
                                //   $ref: "#/components/schemas/User"
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
            },
            post: {
                summary: "Create a user",
                description: "Creates a single user",
                requestBody: {
                    content: {
                        "application/json": {
                            // schema: {
                            //   $ref: "#/components/schemas/User"
                            // }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "A single user",
                        content: {
                            "application/json": {
                                // schema: {
                                //   $ref: "#/components/schemas/User"
                                // }
                            }
                        }
                    },
                    500: {
                        description: "Server error"
                    }
                }
            }
        },
        "/users/userInfo": {
            get: {
                summary: "Get user info by token",
                description: "Returns a single user identified by their token",
                parameters: [
                    {
                        name: "token",
                        in: "query",
                        description: "The token of the user to retrieve",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "A single user",
                        content: {
                            "application/json": {
                                // schema: {
                                //   $ref: "#/components/schemas/User"
                                // }
                            }
                        }
                    },
                    401: {
                        description: "Unauthorized"
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
            "post": {
                "summary": "Log into user",
                "description": "Returns a token that gives you access to the system",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "role": {
                                        "type": "string"
                                    }
                                },
                                "required": ["email", "password", "role"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "A token that gives access to the system",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "token": {
                                            "type": "string"
                                        }
                                    },
                                    "required": ["token"]
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "User not found"
                    },
                    "500": {
                        "description": "Server error"
                    }
                }
            }
        },
    }
}

