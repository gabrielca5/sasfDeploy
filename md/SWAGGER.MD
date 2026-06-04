{
    "openapi": "3.1.0",
    "info": {
        "title": "OpenAPI definition",
        "version": "v0"
    },
    "servers": [
        {
            "url": "http://localhost:8080",
            "description": "Generated server url"
        }
    ],
    "paths": {
        "/api/usuario/{id}": {
            "get": {
                "tags": [
                    "usuario-controller"
                ],
                "operationId": "buscarPorId",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/UsuarioResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "usuario-controller"
                ],
                "operationId": "atualizar",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UsuarioUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/UsuarioResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "usuario-controller"
                ],
                "operationId": "deletar",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/termo/{id}": {
            "get": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "operationId": "buscarPorId_1",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/TermoAutorizacaoDeUsoDeImagemResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "operationId": "atualizar_1",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/TermoAutorizacaoDeUsoDeImagemUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/TermoAutorizacaoDeUsoDeImagemResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "operationId": "deletar_1",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/tecnico/{id}": {
            "get": {
                "tags": [
                    "tecnico-controller"
                ],
                "operationId": "buscarPorId_2",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/TecnicoResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "tecnico-controller"
                ],
                "operationId": "atualizar_2",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/TecnicoUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/TecnicoResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "tecnico-controller"
                ],
                "operationId": "deletar_2",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/sintesepdu/{id}": {
            "get": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "operationId": "buscarPorId_3",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/SintesePduPorAreaResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "operationId": "atualizar_3",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/SintesePduPorAreaUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/SintesePduPorAreaResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "operationId": "deletar_3",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/representante/{id}": {
            "get": {
                "tags": [
                    "representante-controller"
                ],
                "operationId": "buscarPorId_4",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/RepresentanteResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "representante-controller"
                ],
                "operationId": "atualizar_4",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RepresentanteUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/RepresentanteResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "representante-controller"
                ],
                "operationId": "deletar_4",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/registroprosseguimento/{id}": {
            "get": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "operationId": "buscarPorId_5",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/RegistroProsseguimentoResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "operationId": "atualizar_5",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RegistroProsseguimentoUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/RegistroProsseguimentoResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "operationId": "deletar_5",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/prontuario/{id}": {
            "get": {
                "tags": [
                    "prontuario-controller"
                ],
                "operationId": "buscarPorId_6",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProntuarioResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "prontuario-controller"
                ],
                "operationId": "atualizar_6",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/ProntuarioUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProntuarioResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "prontuario-controller"
                ],
                "operationId": "deletar_6",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/pdu/{id}": {
            "get": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "operationId": "buscarPorId_7",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/PlanoDesenvolvimentoDoUsuarioResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "operationId": "atualizar_7",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/PlanoDesenvolvimentoDoUsuarioUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/PlanoDesenvolvimentoDoUsuarioResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "operationId": "deletar_7",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/pdf/{id}": {
            "get": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "operationId": "buscarPorId_8",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/PlanoDesenvolvimentoFamiliarResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "operationId": "atualizar_8",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/PlanoDesenvolvimentoFamiliarUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/PlanoDesenvolvimentoFamiliarResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "operationId": "deletar_8",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/orientador/{id}": {
            "get": {
                "tags": [
                    "orientador-controller"
                ],
                "operationId": "buscarPorId_9",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/OrientadorResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "orientador-controller"
                ],
                "operationId": "atualizar_9",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/OrientadorUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/OrientadorResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "orientador-controller"
                ],
                "operationId": "deletar_9",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/membro/{id}": {
            "get": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "operationId": "buscarPorId_10",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/MembroComposicaoFamiliarResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "operationId": "atualizar_10",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/MembroComposicaoFamiliarUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/MembroComposicaoFamiliarResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "operationId": "deletar_10",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/itempdf/{id}": {
            "get": {
                "tags": [
                    "item-pdf-controller"
                ],
                "operationId": "buscarPorId_11",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ItemPdfResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "item-pdf-controller"
                ],
                "operationId": "atualizar_11",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/ItemPdfUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ItemPdfResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "item-pdf-controller"
                ],
                "operationId": "deletar_11",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/folhaprosseguimento/{id}": {
            "get": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "operationId": "buscarPorId_12",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FolhaDeProsseguimentoResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "operationId": "atualizar_12",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FolhaDeProsseguimentoUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FolhaDeProsseguimentoResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "operationId": "deletar_12",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/fichavisita/{id}": {
            "get": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "operationId": "buscarPorId_13",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FichaVisitaDomiciliarResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "operationId": "atualizar_13",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FichaVisitaDomiciliarUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FichaVisitaDomiciliarResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "operationId": "deletar_13",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/fichacadastral/{id}": {
            "get": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "operationId": "buscarPorId_14",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FichaCadastralDaFamiliaResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "operationId": "atualizar_14",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FichaCadastralDaFamiliaUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FichaCadastralDaFamiliaResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "operationId": "deletar_14",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/fichaattquadro/{id}": {
            "get": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "operationId": "buscarPorId_15",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FichaDeAtualizacaoQuadroSituacionalResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "operationId": "atualizar_15",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FichaDeAtualizacaoQuadroSituacionalUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FichaDeAtualizacaoQuadroSituacionalResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "operationId": "deletar_15",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/familia/{id}": {
            "get": {
                "tags": [
                    "familia-controller"
                ],
                "operationId": "buscarPorId_16",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FamiliaResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "familia-controller"
                ],
                "operationId": "atualizar_16",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FamiliaUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FamiliaResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "familia-controller"
                ],
                "operationId": "deletar_16",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/endereco/{id}": {
            "get": {
                "tags": [
                    "endereco-controller"
                ],
                "operationId": "buscarPorId_17",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/EnderecoResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "endereco-controller"
                ],
                "operationId": "atualizar_17",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/EnderecoUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/EnderecoResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "endereco-controller"
                ],
                "operationId": "deletar_17",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/dados/{id}": {
            "get": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "operationId": "buscarPorId_18",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/DadosSasfResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "operationId": "atualizar_18",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/DadosSasfUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/DadosSasfResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "operationId": "deletar_18",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/cuidador/{id}": {
            "get": {
                "tags": [
                    "cuidador-controller"
                ],
                "operationId": "buscarPorId_19",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/CuidadorResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "cuidador-controller"
                ],
                "operationId": "atualizar_19",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CuidadorUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/CuidadorResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "cuidador-controller"
                ],
                "operationId": "deletar_19",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/crianca/{id}": {
            "get": {
                "tags": [
                    "crianca-controller"
                ],
                "operationId": "buscarPorId_20",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/CriancaResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "crianca-controller"
                ],
                "operationId": "atualizar_20",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CriancaUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/CriancaResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "crianca-controller"
                ],
                "operationId": "deletar_20",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/acaopdu/{id}": {
            "get": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "operationId": "buscarPorId_21",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/AcaoPduResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "operationId": "atualizar_21",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/AcaoPduUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/AcaoPduResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "operationId": "deletar_21",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/acaointerpdu/{id}": {
            "get": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "operationId": "buscarPorId_22",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/AcaoIntersetorialPduResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "operationId": "atualizar_22",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/AcaoIntersetorialPduUpdateDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/AcaoIntersetorialPduResponseDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "operationId": "deletar_22",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/usuario": {
            "get": {
                "tags": [
                    "usuario-controller"
                ],
                "operationId": "listar",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/UsuarioResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "usuario-controller"
                ],
                "operationId": "criar",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UsuarioSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/UsuarioResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/usuario/login": {
            "post": {
                "tags": [
                    "usuario-controller"
                ],
                "operationId": "login",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/UsuarioLoginDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/TokenResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/termo": {
            "get": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "operationId": "listar_1",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/TermoAutorizacaoDeUsoDeImagemResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "operationId": "criar_1",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/TermoAutorizacaoDeUsoDeImagemSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/TermoAutorizacaoDeUsoDeImagemResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/tecnico": {
            "get": {
                "tags": [
                    "tecnico-controller"
                ],
                "operationId": "listar_2",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/TecnicoResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "tecnico-controller"
                ],
                "operationId": "criar_2",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/TecnicoSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/TecnicoResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/sintesepdu": {
            "get": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "operationId": "listar_3",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/SintesePduPorAreaResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "operationId": "criar_3",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/SintesePduPorAreaSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/SintesePduPorAreaResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/representante": {
            "get": {
                "tags": [
                    "representante-controller"
                ],
                "operationId": "listar_4",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/RepresentanteResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "representante-controller"
                ],
                "operationId": "criar_4",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RepresentanteSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/RepresentanteResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/registroprosseguimento": {
            "get": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "operationId": "listar_5",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/RegistroProsseguimentoResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "operationId": "criar_5",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/RegistroProsseguimentoSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/RegistroProsseguimentoResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/prontuario": {
            "get": {
                "tags": [
                    "prontuario-controller"
                ],
                "operationId": "listar_6",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ProntuarioResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "prontuario-controller"
                ],
                "operationId": "criar_6",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/ProntuarioSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ProntuarioResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/pdu": {
            "get": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "operationId": "listar_7",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/PlanoDesenvolvimentoDoUsuarioResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "operationId": "criar_7",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/PlanoDesenvolvimentoDoUsuarioSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/PlanoDesenvolvimentoDoUsuarioResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/pdf": {
            "get": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "operationId": "listar_8",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/PlanoDesenvolvimentoFamiliarResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "operationId": "criar_8",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/PlanoDesenvolvimentoFamiliarSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/PlanoDesenvolvimentoFamiliarResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/orientador": {
            "get": {
                "tags": [
                    "orientador-controller"
                ],
                "operationId": "listar_9",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/OrientadorResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "orientador-controller"
                ],
                "operationId": "criar_9",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/OrientadorSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/OrientadorResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/membro": {
            "get": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "operationId": "listar_10",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/MembroComposicaoFamiliarResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "operationId": "criar_10",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/MembroComposicaoFamiliarSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/MembroComposicaoFamiliarResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/itempdf": {
            "get": {
                "tags": [
                    "item-pdf-controller"
                ],
                "operationId": "listar_11",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/ItemPdfResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "item-pdf-controller"
                ],
                "operationId": "criar_11",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/ItemPdfSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ItemPdfResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/google-calendar/eventos": {
            "get": {
                "tags": [
                    "google-calendar-controller"
                ],
                "operationId": "listarEventos",
                "parameters": [
                    {
                        "name": "calendarId",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "timeMin",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "timeMax",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "string",
                            "format": "date-time"
                        }
                    },
                    {
                        "name": "maxResults",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "format": "int32"
                        }
                    }
                ],
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/GoogleCalendarEventResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "google-calendar-controller"
                ],
                "operationId": "criarEvento",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/GoogleCalendarEventSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/GoogleCalendarEventResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/google-calendar/callback": {
            "post": {
                "tags": [
                    "google-calendar-controller"
                ],
                "operationId": "callback",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/GoogleCalendarCallbackDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/GoogleCalendarStatusDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/folhaprosseguimento": {
            "get": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "operationId": "listar_12",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FolhaDeProsseguimentoResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "operationId": "criar_12",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FolhaDeProsseguimentoSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FolhaDeProsseguimentoResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/fichavisita": {
            "get": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "operationId": "listar_13",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FichaVisitaDomiciliarResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "operationId": "criar_13",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FichaVisitaDomiciliarSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FichaVisitaDomiciliarResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/fichacadastral": {
            "get": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "operationId": "listar_14",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FichaCadastralDaFamiliaResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "operationId": "criar_14",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FichaCadastralDaFamiliaSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FichaCadastralDaFamiliaResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/fichaattquadro": {
            "get": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "operationId": "listar_15",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FichaDeAtualizacaoQuadroSituacionalResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "operationId": "criar_15",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FichaDeAtualizacaoQuadroSituacionalSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FichaDeAtualizacaoQuadroSituacionalResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/familia": {
            "get": {
                "tags": [
                    "familia-controller"
                ],
                "operationId": "listar_16",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FamiliaResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "familia-controller"
                ],
                "operationId": "criar_16",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/FamiliaSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/FamiliaResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/endereco": {
            "get": {
                "tags": [
                    "endereco-controller"
                ],
                "operationId": "listar_17",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/EnderecoResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "endereco-controller"
                ],
                "operationId": "criar_17",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/EnderecoSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/EnderecoResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/dados": {
            "get": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "operationId": "listar_18",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/DadosSasfResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "operationId": "criar_18",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/DadosSasfSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/DadosSasfResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/cuidador": {
            "get": {
                "tags": [
                    "cuidador-controller"
                ],
                "operationId": "listar_19",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/CuidadorResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "cuidador-controller"
                ],
                "operationId": "criar_19",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CuidadorSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/CuidadorResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/crianca": {
            "get": {
                "tags": [
                    "crianca-controller"
                ],
                "operationId": "listar_20",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/CriancaResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "crianca-controller"
                ],
                "operationId": "criar_20",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CriancaSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/CriancaResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/acaopdu": {
            "get": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "operationId": "listar_21",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/AcaoPduResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "operationId": "criar_21",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/AcaoPduSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/AcaoPduResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/acaointerpdu": {
            "get": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "operationId": "listar_22",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/AcaoIntersetorialPduResponseDTO"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "operationId": "criar_22",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/AcaoIntersetorialPduSaveDTO"
                            }
                        }
                    },
                    "required": true
                },
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/AcaoIntersetorialPduResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/health": {
            "get": {
                "tags": [
                    "health-controller"
                ],
                "operationId": "health",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/HealthResponseDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/google-calendar/status": {
            "get": {
                "tags": [
                    "google-calendar-controller"
                ],
                "operationId": "status",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/GoogleCalendarStatusDTO"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/google-calendar/conexao": {
            "get": {
                "tags": [
                    "google-calendar-controller"
                ],
                "operationId": "conexao",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/GoogleCalendarStatusDTO"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "google-calendar-controller"
                ],
                "operationId": "desconectar",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/google-calendar/auth-url": {
            "get": {
                "tags": [
                    "google-calendar-controller"
                ],
                "operationId": "authUrl",
                "responses": {
                    "404": {
                        "description": "Not Found",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "409": {
                        "description": "Conflict",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorDTO"
                                }
                            }
                        }
                    },
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "schema": {
                                    "$ref": "#/components/schemas/GoogleCalendarAuthUrlDTO"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "ErrorDTO": {
                "type": "object",
                "properties": {
                    "mensagem": {
                        "type": "string"
                    },
                    "codigoHttp": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "data": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "path": {
                        "type": "string"
                    },
                    "codigoErro": {
                        "type": "string"
                    }
                }
            },
            "UsuarioUpdateDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    },
                    "cargo": {
                        "type": "string",
                        "enum": [
                            "GESTOR",
                            "TECNICO",
                            "ADMIN",
                            "ORIENTADOR"
                        ]
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "endereco": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "dataDeInclusao": {
                        "type": "string",
                        "format": "date"
                    },
                    "ultimaAtualizacao": {
                        "type": "string",
                        "format": "date"
                    }
                }
            },
            "UsuarioResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    },
                    "cargo": {
                        "type": "string",
                        "enum": [
                            "GESTOR",
                            "TECNICO",
                            "ADMIN",
                            "ORIENTADOR"
                        ]
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "endereco": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "dataDeInclusao": {
                        "type": "string",
                        "format": "date"
                    },
                    "ultimaAtualizacao": {
                        "type": "string",
                        "format": "date"
                    }
                }
            },
            "TermoAutorizacaoDeUsoDeImagemUpdateDTO": {
                "type": "object",
                "properties": {
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "usuarioAutorizanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "numeroCedulaIdentidade": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "nomesCriancasAutorizadas": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "dataAssinatura": {
                        "type": "string",
                        "format": "date-time"
                    }
                }
            },
            "TermoAutorizacaoDeUsoDeImagemResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "usuarioAutorizanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "numeroCedulaIdentidade": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "nomesCriancasAutorizadas": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "dataAssinatura": {
                        "type": "string",
                        "format": "date-time"
                    }
                }
            },
            "TecnicoUpdateDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    },
                    "cargo": {
                        "type": "string",
                        "enum": [
                            "GESTOR",
                            "TECNICO",
                            "ADMIN",
                            "ORIENTADOR"
                        ]
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "endereco": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "dataDeInclusao": {
                        "type": "string",
                        "format": "date"
                    },
                    "ultimaAtualizacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "especialidade": {
                        "type": "string"
                    },
                    "orientadoresIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                }
            },
            "TecnicoResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    },
                    "cargo": {
                        "type": "string",
                        "enum": [
                            "GESTOR",
                            "TECNICO",
                            "ADMIN",
                            "ORIENTADOR"
                        ]
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "endereco": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "dataDeInclusao": {
                        "type": "string",
                        "format": "date"
                    },
                    "ultimaAtualizacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "especialidade": {
                        "type": "string"
                    },
                    "orientadoresIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                }
            },
            "SintesePduPorAreaUpdateDTO": {
                "type": "object",
                "properties": {
                    "situacoesAgravoIdentificadas": {
                        "type": "string"
                    },
                    "acoesCRAS": {
                        "type": "string"
                    },
                    "acoesCREAS": {
                        "type": "string"
                    },
                    "acoesSaude": {
                        "type": "string"
                    },
                    "acoesEducacao": {
                        "type": "string"
                    },
                    "acoesTrabalho": {
                        "type": "string"
                    },
                    "acoesOutros": {
                        "type": "string"
                    },
                    "prazo": {
                        "type": "string",
                        "format": "date"
                    },
                    "resultadosEsperados": {
                        "type": "string"
                    }
                }
            },
            "SintesePduPorAreaResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "situacoesAgravoIdentificadas": {
                        "type": "string"
                    },
                    "acoesCRAS": {
                        "type": "string"
                    },
                    "acoesCREAS": {
                        "type": "string"
                    },
                    "acoesSaude": {
                        "type": "string"
                    },
                    "acoesEducacao": {
                        "type": "string"
                    },
                    "acoesTrabalho": {
                        "type": "string"
                    },
                    "acoesOutros": {
                        "type": "string"
                    },
                    "prazo": {
                        "type": "string",
                        "format": "date"
                    },
                    "resultadosEsperados": {
                        "type": "string"
                    }
                }
            },
            "RepresentanteUpdateDTO": {
                "type": "object",
                "properties": {
                    "nome": {
                        "type": "string"
                    },
                    "dataNascimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "sexo": {
                        "type": "string",
                        "enum": [
                            "FEMININO",
                            "MASCULINO",
                            "OUTRO"
                        ]
                    },
                    "nisNitNb": {
                        "type": "string"
                    },
                    "naturalidade": {
                        "type": "string"
                    },
                    "corRaca": {
                        "type": "string",
                        "enum": [
                            "BRANCA",
                            "PRETA",
                            "AMARELA",
                            "PARDA",
                            "INDIGENA",
                            "SEM_DECLARACAO"
                        ]
                    },
                    "possuiDeficiencia": {
                        "type": "boolean"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "rg": {
                        "type": "string"
                    },
                    "dataEmissaoRg": {
                        "type": "string",
                        "format": "date"
                    },
                    "orgaoEmissorRg": {
                        "type": "string"
                    },
                    "ufRg": {
                        "type": "string"
                    },
                    "ctpsNumero": {
                        "type": "string"
                    },
                    "ctpsSerie": {
                        "type": "string"
                    },
                    "nomeMae": {
                        "type": "string"
                    },
                    "nomePai": {
                        "type": "string"
                    },
                    "estadoCivil": {
                        "type": "string",
                        "enum": [
                            "SOLTEIRO",
                            "CASADO",
                            "SEPARADO",
                            "DIVORCIADO",
                            "VIUVO"
                        ]
                    },
                    "grauInstrucao": {
                        "type": "string",
                        "enum": [
                            "ANALFABETO",
                            "ENSINO_FUNDAMENTAL_COMPLETO",
                            "ENSINO_FUNDAMENTAL_INCOMPLETO",
                            "ENSINO_MEDIO_COMPLETO",
                            "ENSINO_MEDIO_INCOMPLETO",
                            "ENSINO_SUPERIOR_COMPLETO",
                            "ENSINO_SUPERIOR_INCOMPLETO"
                        ]
                    },
                    "profissao": {
                        "type": "string"
                    },
                    "ocupacao": {
                        "type": "string",
                        "enum": [
                            "EMPREGADO",
                            "DESEMPREGADO",
                            "APOSENTADO",
                            "PENSIONISTA",
                            "OUTRO"
                        ]
                    },
                    "renda": {
                        "type": "number",
                        "format": "double"
                    },
                    "enderecoId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "telefoneResidencial": {
                        "type": "string"
                    },
                    "telefoneCelular": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    }
                }
            },
            "RepresentanteResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "nome": {
                        "type": "string"
                    },
                    "dataNascimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "sexo": {
                        "type": "string",
                        "enum": [
                            "FEMININO",
                            "MASCULINO",
                            "OUTRO"
                        ]
                    },
                    "nisNitNb": {
                        "type": "string"
                    },
                    "naturalidade": {
                        "type": "string"
                    },
                    "corRaca": {
                        "type": "string",
                        "enum": [
                            "BRANCA",
                            "PRETA",
                            "AMARELA",
                            "PARDA",
                            "INDIGENA",
                            "SEM_DECLARACAO"
                        ]
                    },
                    "possuiDeficiencia": {
                        "type": "boolean"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "rg": {
                        "type": "string"
                    },
                    "dataEmissaoRg": {
                        "type": "string",
                        "format": "date"
                    },
                    "orgaoEmissorRg": {
                        "type": "string"
                    },
                    "ufRg": {
                        "type": "string"
                    },
                    "ctpsNumero": {
                        "type": "string"
                    },
                    "ctpsSerie": {
                        "type": "string"
                    },
                    "nomeMae": {
                        "type": "string"
                    },
                    "nomePai": {
                        "type": "string"
                    },
                    "estadoCivil": {
                        "type": "string",
                        "enum": [
                            "SOLTEIRO",
                            "CASADO",
                            "SEPARADO",
                            "DIVORCIADO",
                            "VIUVO"
                        ]
                    },
                    "grauInstrucao": {
                        "type": "string",
                        "enum": [
                            "ANALFABETO",
                            "ENSINO_FUNDAMENTAL_COMPLETO",
                            "ENSINO_FUNDAMENTAL_INCOMPLETO",
                            "ENSINO_MEDIO_COMPLETO",
                            "ENSINO_MEDIO_INCOMPLETO",
                            "ENSINO_SUPERIOR_COMPLETO",
                            "ENSINO_SUPERIOR_INCOMPLETO"
                        ]
                    },
                    "profissao": {
                        "type": "string"
                    },
                    "ocupacao": {
                        "type": "string",
                        "enum": [
                            "EMPREGADO",
                            "DESEMPREGADO",
                            "APOSENTADO",
                            "PENSIONISTA",
                            "OUTRO"
                        ]
                    },
                    "renda": {
                        "type": "number",
                        "format": "double"
                    },
                    "enderecoId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "telefoneResidencial": {
                        "type": "string"
                    },
                    "telefoneCelular": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    }
                }
            },
            "RegistroProsseguimentoUpdateDTO": {
                "type": "object",
                "properties": {
                    "dataRegistro": {
                        "type": "string",
                        "format": "date"
                    },
                    "demanda": {
                        "type": "string"
                    },
                    "tecnicoResponsavelId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "RegistroProsseguimentoResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataRegistro": {
                        "type": "string",
                        "format": "date"
                    },
                    "demanda": {
                        "type": "string"
                    },
                    "tecnicoResponsavelId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "ProntuarioUpdateDTO": {
                "type": "object",
                "properties": {
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "fichaCadastralDaFamiliaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "fichasAtualizacaoQuadroSituacionalIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "planosDesenvolvimentoFamiliarIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "folhasProsseguimentoIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "planosDesenvolvimentoUsuarioIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                }
            },
            "ProntuarioResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "deletedAt": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "fichaCadastralDaFamiliaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "fichasAtualizacaoQuadroSituacionalIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "planosDesenvolvimentoFamiliarIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "folhasProsseguimentoIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "planosDesenvolvimentoUsuarioIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                }
            },
            "PlanoDesenvolvimentoDoUsuarioUpdateDTO": {
                "type": "object",
                "properties": {
                    "beneficiarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "tipoBeneficiario": {
                        "type": "string",
                        "enum": [
                            "IDOSO",
                            "DEFICIENTE_ADULTO",
                            "DEFICIENTE_CRIANCA",
                            "DEFICIENTE_ADOLESCENTE"
                        ]
                    },
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "cuidadorId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "tecnicoAcompanhamentoId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "sinteseSituacaoApresentada": {
                        "type": "string"
                    },
                    "situacoesAgravoIdentificadas": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "AUSENCIA_DE_CUIDADOR",
                                "MAUS_TRATOS_OU_NEGLIGENCIA",
                                "VIOLENCIA_DOMESTICA",
                                "FRAGILIZACAO_DOS_VINCULOS_FAMILIARES",
                                "ROMPIMENTO_DOS_VINCULOS_FAMILIARES",
                                "CONFINAMENTO",
                                "ISOLAMENTO",
                                "SEM_ACESSO_EDUCACAO",
                                "SEM_ACESSO_SAUDE",
                                "SEM_ACESSO_TRANSPORTE_ESPECIALIZADO",
                                "SEM_ACESSO_REDE_SOCIOASSISTENCIAL",
                                "OUTRAS_SITUACOES"
                            ]
                        }
                    },
                    "outrasSituacoesAgravo": {
                        "type": "string"
                    },
                    "acoesPrevencaoRiscoOuGarantiaAcessoIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "acoesPactuadasIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "acoesIntersetoriaisSocioassistenciaisIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "numeroPlano": {
                        "type": "string"
                    },
                    "dataElaboracao": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataValidade": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataReavaliacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "sintesesPorAreaIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "assinaturaResponsavelFamilia": {
                        "type": "boolean"
                    },
                    "tecnicoReferenciaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "observacoes": {
                        "type": "string"
                    }
                }
            },
            "PlanoDesenvolvimentoDoUsuarioResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "beneficiarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "tipoBeneficiario": {
                        "type": "string",
                        "enum": [
                            "IDOSO",
                            "DEFICIENTE_ADULTO",
                            "DEFICIENTE_CRIANCA",
                            "DEFICIENTE_ADOLESCENTE"
                        ]
                    },
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "cuidadorId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "tecnicoAcompanhamentoId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "sinteseSituacaoApresentada": {
                        "type": "string"
                    },
                    "situacoesAgravoIdentificadas": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "AUSENCIA_DE_CUIDADOR",
                                "MAUS_TRATOS_OU_NEGLIGENCIA",
                                "VIOLENCIA_DOMESTICA",
                                "FRAGILIZACAO_DOS_VINCULOS_FAMILIARES",
                                "ROMPIMENTO_DOS_VINCULOS_FAMILIARES",
                                "CONFINAMENTO",
                                "ISOLAMENTO",
                                "SEM_ACESSO_EDUCACAO",
                                "SEM_ACESSO_SAUDE",
                                "SEM_ACESSO_TRANSPORTE_ESPECIALIZADO",
                                "SEM_ACESSO_REDE_SOCIOASSISTENCIAL",
                                "OUTRAS_SITUACOES"
                            ]
                        }
                    },
                    "outrasSituacoesAgravo": {
                        "type": "string"
                    },
                    "acoesPrevencaoRiscoOuGarantiaAcessoIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "acoesPactuadasIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "acoesIntersetoriaisSocioassistenciaisIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "numeroPlano": {
                        "type": "string"
                    },
                    "dataElaboracao": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataValidade": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataReavaliacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "sintesesPorAreaIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "assinaturaResponsavelFamilia": {
                        "type": "boolean"
                    },
                    "tecnicoReferenciaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "observacoes": {
                        "type": "string"
                    }
                }
            },
            "PlanoDesenvolvimentoFamiliarUpdateDTO": {
                "type": "object",
                "properties": {
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "analiseDiagnostica": {
                        "type": "string"
                    },
                    "composicaoFamiliar": {
                        "type": "string"
                    },
                    "moradia": {
                        "type": "string"
                    },
                    "saude": {
                        "type": "string"
                    },
                    "educacao": {
                        "type": "string"
                    },
                    "renda": {
                        "type": "string"
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "objetivo": {
                        "type": "string"
                    },
                    "numeroPlano": {
                        "type": "string"
                    },
                    "dataElaboracao": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataValidade": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataReavaliacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "itensPlanoIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "assinaturaResponsavelFamilia": {
                        "type": "string"
                    },
                    "tecnicoReferenciaId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "PlanoDesenvolvimentoFamiliarResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "analiseDiagnostica": {
                        "type": "string"
                    },
                    "composicaoFamiliar": {
                        "type": "string"
                    },
                    "moradia": {
                        "type": "string"
                    },
                    "saude": {
                        "type": "string"
                    },
                    "educacao": {
                        "type": "string"
                    },
                    "renda": {
                        "type": "string"
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "objetivo": {
                        "type": "string"
                    },
                    "numeroPlano": {
                        "type": "string"
                    },
                    "dataElaboracao": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataValidade": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataReavaliacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "itensPlanoIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "assinaturaResponsavelFamilia": {
                        "type": "string"
                    },
                    "tecnicoReferenciaId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "OrientadorUpdateDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    },
                    "cargo": {
                        "type": "string",
                        "enum": [
                            "GESTOR",
                            "TECNICO",
                            "ADMIN",
                            "ORIENTADOR"
                        ]
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "endereco": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "dataDeInclusao": {
                        "type": "string",
                        "format": "date"
                    },
                    "ultimaAtualizacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "cor": {
                        "type": "string",
                        "enum": [
                            "VERMELHO",
                            "AMARELO",
                            "VERDE",
                            "AZUL",
                            "ROXO",
                            "LARANJA",
                            "ROSA",
                            "MARROM"
                        ]
                    },
                    "familiasIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "tecnicoId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "OrientadorResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    },
                    "cargo": {
                        "type": "string",
                        "enum": [
                            "GESTOR",
                            "TECNICO",
                            "ADMIN",
                            "ORIENTADOR"
                        ]
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "endereco": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "dataDeInclusao": {
                        "type": "string",
                        "format": "date"
                    },
                    "ultimaAtualizacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "cor": {
                        "type": "string",
                        "enum": [
                            "VERMELHO",
                            "AMARELO",
                            "VERDE",
                            "AZUL",
                            "ROXO",
                            "LARANJA",
                            "ROSA",
                            "MARROM"
                        ]
                    },
                    "familiasIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "tecnicoId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "MembroComposicaoFamiliarUpdateDTO": {
                "type": "object",
                "properties": {
                    "numeroOrdem": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "nome": {
                        "type": "string"
                    },
                    "nomeSocial": {
                        "type": "string"
                    },
                    "dataNascimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "parentescoOuVinculo": {
                        "type": "string"
                    },
                    "profissao": {
                        "type": "string"
                    },
                    "ocupacao": {
                        "type": "string"
                    },
                    "renda": {
                        "type": "number",
                        "format": "double"
                    },
                    "fatoresRiscoSocial": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "ALCOOLISMO",
                                "DEFICIENCIA_AUDITIVA",
                                "DEFICIENCIA_FISICA",
                                "DEFICIENCIA_MENTAL",
                                "DEFICIENCIA_VISUAL",
                                "DESEMPREGO",
                                "DROGADICAO",
                                "HIV_POSITIVO",
                                "PROBLEMAS_PSIQUIATRICOS",
                                "SITUACAO_DE_RUA",
                                "TRABALHO_INFANTIL",
                                "VIOLENCIA_DOMESTICA",
                                "MEDIDA_SOCIOEDUCATIVA",
                                "PRIVACAO_DE_LIBERDADE",
                                "ACOLHIMENTO_INSTITUCIONAL",
                                "OUTRO"
                            ]
                        }
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "MembroComposicaoFamiliarResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "numeroOrdem": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "nome": {
                        "type": "string"
                    },
                    "nomeSocial": {
                        "type": "string"
                    },
                    "dataNascimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "parentescoOuVinculo": {
                        "type": "string"
                    },
                    "profissao": {
                        "type": "string"
                    },
                    "ocupacao": {
                        "type": "string"
                    },
                    "renda": {
                        "type": "number",
                        "format": "double"
                    },
                    "fatoresRiscoSocial": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "ALCOOLISMO",
                                "DEFICIENCIA_AUDITIVA",
                                "DEFICIENCIA_FISICA",
                                "DEFICIENCIA_MENTAL",
                                "DEFICIENCIA_VISUAL",
                                "DESEMPREGO",
                                "DROGADICAO",
                                "HIV_POSITIVO",
                                "PROBLEMAS_PSIQUIATRICOS",
                                "SITUACAO_DE_RUA",
                                "TRABALHO_INFANTIL",
                                "VIOLENCIA_DOMESTICA",
                                "MEDIDA_SOCIOEDUCATIVA",
                                "PRIVACAO_DE_LIBERDADE",
                                "ACOLHIMENTO_INSTITUCIONAL",
                                "OUTRO"
                            ]
                        }
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "ItemPdfUpdateDTO": {
                "type": "object",
                "properties": {
                    "acoesCras": {
                        "type": "string"
                    },
                    "acoesFamilia": {
                        "type": "string"
                    },
                    "estrategiaIntervencao": {
                        "type": "string"
                    },
                    "prazo": {
                        "type": "string",
                        "format": "date"
                    },
                    "resultadoEsperado": {
                        "type": "string"
                    },
                    "observacoes": {
                        "type": "string"
                    }
                }
            },
            "ItemPdfResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "acoesCras": {
                        "type": "string"
                    },
                    "acoesFamilia": {
                        "type": "string"
                    },
                    "estrategiaIntervencao": {
                        "type": "string"
                    },
                    "prazo": {
                        "type": "string",
                        "format": "date"
                    },
                    "resultadoEsperado": {
                        "type": "string"
                    },
                    "observacoes": {
                        "type": "string"
                    }
                }
            },
            "FolhaDeProsseguimentoUpdateDTO": {
                "type": "object",
                "properties": {
                    "numeroFolha": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "registrosIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "assinaturaTecnico": {
                        "type": "string"
                    },
                    "assinaturaOrientador": {
                        "type": "string"
                    }
                }
            },
            "FolhaDeProsseguimentoResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "numeroFolha": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "registrosIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "assinaturaTecnico": {
                        "type": "string"
                    },
                    "assinaturaOrientador": {
                        "type": "string"
                    }
                }
            },
            "FichaVisitaDomiciliarUpdateDTO": {
                "type": "object",
                "properties": {
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "orientadorResponsavelId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataVisita": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "representanteVisitadoId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "objetivoDaVisita": {
                        "type": "string"
                    },
                    "pessoasFamiliaQueConversaram": {
                        "type": "string"
                    },
                    "demandasOrientacoesEncaminhamentos": {
                        "type": "string"
                    }
                }
            },
            "FichaVisitaDomiciliarResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "orientadorResponsavelId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataVisita": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "representanteVisitadoId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "objetivoDaVisita": {
                        "type": "string"
                    },
                    "pessoasFamiliaQueConversaram": {
                        "type": "string"
                    },
                    "demandasOrientacoesEncaminhamentos": {
                        "type": "string"
                    }
                }
            },
            "FichaCadastralDaFamiliaUpdateDTO": {
                "type": "object",
                "properties": {
                    "dataMatricula": {
                        "type": "string",
                        "format": "date"
                    },
                    "numeroMatricula": {
                        "type": "string"
                    },
                    "dataDesligamento": {
                        "type": "string",
                        "format": "date"
                    },
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "condicoesMoradia": {
                        "type": "string",
                        "enum": [
                            "PROPRIA",
                            "ALUGADA",
                            "CEDIDA"
                        ]
                    },
                    "valorAluguelOuFinanciamento": {
                        "type": "number",
                        "format": "double"
                    },
                    "tipoConstrucao": {
                        "type": "string",
                        "enum": [
                            "ALVENARIA",
                            "MADEIRA",
                            "MISTA"
                        ]
                    },
                    "situacaoHabitacional": {
                        "type": "string",
                        "enum": [
                            "CORTICO",
                            "FAVELA",
                            "LOTEAMENTO_IRREGULAR",
                            "OUTRO"
                        ]
                    },
                    "outraSituacaoHabitacional": {
                        "type": "string"
                    },
                    "numeroComodos": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "qtdMulheresGestantesNaFamilia": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "qtdGestantesComPreNatal": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "programasTransferenciaRenda": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "RENDA_MINIMA",
                                "BOLSA_FAMILIA",
                                "RENDA_CIDADA",
                                "ACAO_JOVEM",
                                "PETI",
                                "OUTRO"
                            ]
                        }
                    },
                    "outroProgramaTransferenciaRenda": {
                        "type": "string"
                    },
                    "beneficioPrestacaoContinuada": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "NAO_RECEBE",
                                "IDOSO",
                                "PESSOA_COM_DEFICIENCIA"
                            ]
                        }
                    },
                    "composicaoFamiliarIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "informacoesComplementaresCriancasAdolescentesIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "demandaApresentadaOrientacoesEncaminhamentos": {
                        "type": "string"
                    },
                    "tecnicoReferenciaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataAtendimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "FichaCadastralDaFamiliaResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataMatricula": {
                        "type": "string",
                        "format": "date"
                    },
                    "numeroMatricula": {
                        "type": "string"
                    },
                    "dataDesligamento": {
                        "type": "string",
                        "format": "date"
                    },
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "condicoesMoradia": {
                        "type": "string",
                        "enum": [
                            "PROPRIA",
                            "ALUGADA",
                            "CEDIDA"
                        ]
                    },
                    "valorAluguelOuFinanciamento": {
                        "type": "number",
                        "format": "double"
                    },
                    "tipoConstrucao": {
                        "type": "string",
                        "enum": [
                            "ALVENARIA",
                            "MADEIRA",
                            "MISTA"
                        ]
                    },
                    "situacaoHabitacional": {
                        "type": "string",
                        "enum": [
                            "CORTICO",
                            "FAVELA",
                            "LOTEAMENTO_IRREGULAR",
                            "OUTRO"
                        ]
                    },
                    "outraSituacaoHabitacional": {
                        "type": "string"
                    },
                    "numeroComodos": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "qtdMulheresGestantesNaFamilia": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "qtdGestantesComPreNatal": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "programasTransferenciaRenda": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "RENDA_MINIMA",
                                "BOLSA_FAMILIA",
                                "RENDA_CIDADA",
                                "ACAO_JOVEM",
                                "PETI",
                                "OUTRO"
                            ]
                        }
                    },
                    "outroProgramaTransferenciaRenda": {
                        "type": "string"
                    },
                    "beneficioPrestacaoContinuada": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "NAO_RECEBE",
                                "IDOSO",
                                "PESSOA_COM_DEFICIENCIA"
                            ]
                        }
                    },
                    "composicaoFamiliarIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "informacoesComplementaresCriancasAdolescentesIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "demandaApresentadaOrientacoesEncaminhamentos": {
                        "type": "string"
                    },
                    "tecnicoReferenciaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataAtendimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "FichaDeAtualizacaoQuadroSituacionalUpdateDTO": {
                "type": "object",
                "properties": {
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataAtualizacao": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "tecnicoResponsavelId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "informacoesComplementaresCriancasAdolescentesIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "pdf": {
                        "type": "boolean"
                    },
                    "pdu": {
                        "type": "boolean"
                    },
                    "orientadorId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "responsavelId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "FichaDeAtualizacaoQuadroSituacionalResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataAtualizacao": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "tecnicoResponsavelId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "informacoesComplementaresCriancasAdolescentesIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "pdf": {
                        "type": "boolean"
                    },
                    "pdu": {
                        "type": "boolean"
                    },
                    "orientadorId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "responsavelId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "FamiliaUpdateDTO": {
                "type": "object",
                "properties": {
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "membrosIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "prioridade": {
                        "type": "string",
                        "enum": [
                            "BAIXA",
                            "MEDIA",
                            "ALTA"
                        ]
                    },
                    "ultimaVisita": {
                        "type": "string",
                        "format": "date"
                    },
                    "proximaVisita": {
                        "type": "string",
                        "format": "date"
                    },
                    "orientadorId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "FamiliaResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "membrosIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "prioridade": {
                        "type": "string",
                        "enum": [
                            "BAIXA",
                            "MEDIA",
                            "ALTA"
                        ]
                    },
                    "ultimaVisita": {
                        "type": "string",
                        "format": "date"
                    },
                    "proximaVisita": {
                        "type": "string",
                        "format": "date"
                    },
                    "orientadorId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "EnderecoUpdateDTO": {
                "type": "object",
                "properties": {
                    "logradouro": {
                        "type": "string"
                    },
                    "numero": {
                        "type": "string"
                    },
                    "complemento": {
                        "type": "string"
                    },
                    "bairro": {
                        "type": "string"
                    },
                    "cep": {
                        "type": "string"
                    },
                    "distrito": {
                        "type": "string"
                    },
                    "pontoReferencia": {
                        "type": "string"
                    }
                }
            },
            "EnderecoResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "logradouro": {
                        "type": "string"
                    },
                    "numero": {
                        "type": "string"
                    },
                    "complemento": {
                        "type": "string"
                    },
                    "bairro": {
                        "type": "string"
                    },
                    "cep": {
                        "type": "string"
                    },
                    "distrito": {
                        "type": "string"
                    },
                    "pontoReferencia": {
                        "type": "string"
                    }
                }
            },
            "DadosSasfUpdateDTO": {
                "type": "object",
                "properties": {
                    "nomeServicoSasf": {
                        "type": "string"
                    },
                    "cas": {
                        "type": "string"
                    },
                    "cras": {
                        "type": "string"
                    }
                }
            },
            "DadosSasfResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "nomeServicoSasf": {
                        "type": "string"
                    },
                    "cas": {
                        "type": "string"
                    },
                    "cras": {
                        "type": "string"
                    }
                }
            },
            "CuidadorUpdateDTO": {
                "type": "object",
                "properties": {
                    "nome": {
                        "type": "string"
                    },
                    "grauParentesco": {
                        "type": "string"
                    },
                    "ausente": {
                        "type": "boolean"
                    }
                }
            },
            "CuidadorResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "nome": {
                        "type": "string"
                    },
                    "grauParentesco": {
                        "type": "string"
                    },
                    "ausente": {
                        "type": "boolean"
                    }
                }
            },
            "CriancaUpdateDTO": {
                "type": "object",
                "properties": {
                    "nome": {
                        "type": "string"
                    },
                    "dataNascimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "estuda": {
                        "type": "boolean"
                    },
                    "grauInstrucao": {
                        "type": "string",
                        "enum": [
                            "ANALFABETO",
                            "ENSINO_FUNDAMENTAL_COMPLETO",
                            "ENSINO_FUNDAMENTAL_INCOMPLETO",
                            "ENSINO_MEDIO_COMPLETO",
                            "ENSINO_MEDIO_INCOMPLETO",
                            "ENSINO_SUPERIOR_COMPLETO",
                            "ENSINO_SUPERIOR_INCOMPLETO"
                        ]
                    },
                    "inseridoCca": {
                        "type": "boolean"
                    },
                    "inseridoCj": {
                        "type": "boolean"
                    },
                    "inseridoCedesp": {
                        "type": "boolean"
                    },
                    "inseridoNci": {
                        "type": "boolean"
                    },
                    "outrosServicos": {
                        "type": "string"
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "CriancaResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "nome": {
                        "type": "string"
                    },
                    "dataNascimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "estuda": {
                        "type": "boolean"
                    },
                    "grauInstrucao": {
                        "type": "string",
                        "enum": [
                            "ANALFABETO",
                            "ENSINO_FUNDAMENTAL_COMPLETO",
                            "ENSINO_FUNDAMENTAL_INCOMPLETO",
                            "ENSINO_MEDIO_COMPLETO",
                            "ENSINO_MEDIO_INCOMPLETO",
                            "ENSINO_SUPERIOR_COMPLETO",
                            "ENSINO_SUPERIOR_INCOMPLETO"
                        ]
                    },
                    "inseridoCca": {
                        "type": "boolean"
                    },
                    "inseridoCj": {
                        "type": "boolean"
                    },
                    "inseridoCedesp": {
                        "type": "boolean"
                    },
                    "inseridoNci": {
                        "type": "boolean"
                    },
                    "outrosServicos": {
                        "type": "string"
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "AcaoPduUpdateDTO": {
                "type": "object",
                "properties": {
                    "ordemPrioridade": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "descricao": {
                        "type": "string"
                    }
                }
            },
            "AcaoPduResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "ordemPrioridade": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "descricao": {
                        "type": "string"
                    }
                }
            },
            "AcaoIntersetorialPduUpdateDTO": {
                "type": "object",
                "properties": {
                    "ordem": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "tipo": {
                        "type": "string",
                        "enum": [
                            "SAUDE",
                            "EDUCACAO",
                            "ASSISTENCIA_SOCIAL",
                            "TRABALHO",
                            "CULTURA",
                            "OUTRO"
                        ]
                    },
                    "nomeServico": {
                        "type": "string"
                    },
                    "formaOuTipoPactuacao": {
                        "type": "string"
                    },
                    "periodoAcompanhamento": {
                        "type": "string"
                    },
                    "profissionalReferencia": {
                        "type": "string"
                    }
                }
            },
            "AcaoIntersetorialPduResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "ordem": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "tipo": {
                        "type": "string",
                        "enum": [
                            "SAUDE",
                            "EDUCACAO",
                            "ASSISTENCIA_SOCIAL",
                            "TRABALHO",
                            "CULTURA",
                            "OUTRO"
                        ]
                    },
                    "nomeServico": {
                        "type": "string"
                    },
                    "formaOuTipoPactuacao": {
                        "type": "string"
                    },
                    "periodoAcompanhamento": {
                        "type": "string"
                    },
                    "profissionalReferencia": {
                        "type": "string"
                    }
                }
            },
            "UsuarioSaveDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "minLength": 1
                    },
                    "email": {
                        "type": "string",
                        "format": "email",
                        "minLength": 1
                    },
                    "telefone": {
                        "type": "string"
                    },
                    "cargo": {
                        "type": "string",
                        "enum": [
                            "GESTOR",
                            "TECNICO",
                            "ADMIN",
                            "ORIENTADOR"
                        ]
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "endereco": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "dataDeInclusao": {
                        "type": "string",
                        "format": "date"
                    },
                    "ultimaAtualizacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "senha": {
                        "type": "string",
                        "maxLength": 2147483647,
                        "minLength": 8
                    }
                },
                "required": [
                    "cargo",
                    "email",
                    "name",
                    "senha"
                ]
            },
            "UsuarioLoginDTO": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "format": "email",
                        "minLength": 1
                    },
                    "senha": {
                        "type": "string",
                        "minLength": 1
                    }
                },
                "required": [
                    "email",
                    "senha"
                ]
            },
            "TokenResponseDTO": {
                "type": "object",
                "properties": {
                    "token": {
                        "type": "string"
                    }
                }
            },
            "TermoAutorizacaoDeUsoDeImagemSaveDTO": {
                "type": "object",
                "properties": {
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "usuarioAutorizanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "numeroCedulaIdentidade": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "nomesCriancasAutorizadas": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "dataAssinatura": {
                        "type": "string",
                        "format": "date-time"
                    }
                }
            },
            "TecnicoSaveDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    },
                    "cargo": {
                        "type": "string",
                        "enum": [
                            "GESTOR",
                            "TECNICO",
                            "ADMIN",
                            "ORIENTADOR"
                        ]
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "endereco": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "dataDeInclusao": {
                        "type": "string",
                        "format": "date"
                    },
                    "ultimaAtualizacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "especialidade": {
                        "type": "string"
                    },
                    "orientadoresIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                }
            },
            "SintesePduPorAreaSaveDTO": {
                "type": "object",
                "properties": {
                    "situacoesAgravoIdentificadas": {
                        "type": "string"
                    },
                    "acoesCRAS": {
                        "type": "string"
                    },
                    "acoesCREAS": {
                        "type": "string"
                    },
                    "acoesSaude": {
                        "type": "string"
                    },
                    "acoesEducacao": {
                        "type": "string"
                    },
                    "acoesTrabalho": {
                        "type": "string"
                    },
                    "acoesOutros": {
                        "type": "string"
                    },
                    "prazo": {
                        "type": "string",
                        "format": "date"
                    },
                    "resultadosEsperados": {
                        "type": "string"
                    }
                }
            },
            "RepresentanteSaveDTO": {
                "type": "object",
                "properties": {
                    "nome": {
                        "type": "string"
                    },
                    "dataNascimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "sexo": {
                        "type": "string",
                        "enum": [
                            "FEMININO",
                            "MASCULINO",
                            "OUTRO"
                        ]
                    },
                    "nisNitNb": {
                        "type": "string"
                    },
                    "naturalidade": {
                        "type": "string"
                    },
                    "corRaca": {
                        "type": "string",
                        "enum": [
                            "BRANCA",
                            "PRETA",
                            "AMARELA",
                            "PARDA",
                            "INDIGENA",
                            "SEM_DECLARACAO"
                        ]
                    },
                    "possuiDeficiencia": {
                        "type": "boolean"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "rg": {
                        "type": "string"
                    },
                    "dataEmissaoRg": {
                        "type": "string",
                        "format": "date"
                    },
                    "orgaoEmissorRg": {
                        "type": "string"
                    },
                    "ufRg": {
                        "type": "string"
                    },
                    "ctpsNumero": {
                        "type": "string"
                    },
                    "ctpsSerie": {
                        "type": "string"
                    },
                    "nomeMae": {
                        "type": "string"
                    },
                    "nomePai": {
                        "type": "string"
                    },
                    "estadoCivil": {
                        "type": "string",
                        "enum": [
                            "SOLTEIRO",
                            "CASADO",
                            "SEPARADO",
                            "DIVORCIADO",
                            "VIUVO"
                        ]
                    },
                    "grauInstrucao": {
                        "type": "string",
                        "enum": [
                            "ANALFABETO",
                            "ENSINO_FUNDAMENTAL_COMPLETO",
                            "ENSINO_FUNDAMENTAL_INCOMPLETO",
                            "ENSINO_MEDIO_COMPLETO",
                            "ENSINO_MEDIO_INCOMPLETO",
                            "ENSINO_SUPERIOR_COMPLETO",
                            "ENSINO_SUPERIOR_INCOMPLETO"
                        ]
                    },
                    "profissao": {
                        "type": "string"
                    },
                    "ocupacao": {
                        "type": "string",
                        "enum": [
                            "EMPREGADO",
                            "DESEMPREGADO",
                            "APOSENTADO",
                            "PENSIONISTA",
                            "OUTRO"
                        ]
                    },
                    "renda": {
                        "type": "number",
                        "format": "double"
                    },
                    "enderecoId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "telefoneResidencial": {
                        "type": "string"
                    },
                    "telefoneCelular": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    }
                }
            },
            "RegistroProsseguimentoSaveDTO": {
                "type": "object",
                "properties": {
                    "dataRegistro": {
                        "type": "string",
                        "format": "date"
                    },
                    "demanda": {
                        "type": "string"
                    },
                    "tecnicoResponsavelId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "ProntuarioSaveDTO": {
                "type": "object",
                "properties": {
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "fichaCadastralDaFamiliaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "fichasAtualizacaoQuadroSituacionalIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "planosDesenvolvimentoFamiliarIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "folhasProsseguimentoIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "planosDesenvolvimentoUsuarioIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                }
            },
            "PlanoDesenvolvimentoDoUsuarioSaveDTO": {
                "type": "object",
                "properties": {
                    "beneficiarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "tipoBeneficiario": {
                        "type": "string",
                        "enum": [
                            "IDOSO",
                            "DEFICIENTE_ADULTO",
                            "DEFICIENTE_CRIANCA",
                            "DEFICIENTE_ADOLESCENTE"
                        ]
                    },
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "cuidadorId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "tecnicoAcompanhamentoId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "sinteseSituacaoApresentada": {
                        "type": "string"
                    },
                    "situacoesAgravoIdentificadas": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "AUSENCIA_DE_CUIDADOR",
                                "MAUS_TRATOS_OU_NEGLIGENCIA",
                                "VIOLENCIA_DOMESTICA",
                                "FRAGILIZACAO_DOS_VINCULOS_FAMILIARES",
                                "ROMPIMENTO_DOS_VINCULOS_FAMILIARES",
                                "CONFINAMENTO",
                                "ISOLAMENTO",
                                "SEM_ACESSO_EDUCACAO",
                                "SEM_ACESSO_SAUDE",
                                "SEM_ACESSO_TRANSPORTE_ESPECIALIZADO",
                                "SEM_ACESSO_REDE_SOCIOASSISTENCIAL",
                                "OUTRAS_SITUACOES"
                            ]
                        }
                    },
                    "outrasSituacoesAgravo": {
                        "type": "string"
                    },
                    "acoesPrevencaoRiscoOuGarantiaAcessoIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "acoesPactuadasIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "acoesIntersetoriaisSocioassistenciaisIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "numeroPlano": {
                        "type": "string"
                    },
                    "dataElaboracao": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataValidade": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataReavaliacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "sintesesPorAreaIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "assinaturaResponsavelFamilia": {
                        "type": "boolean"
                    },
                    "tecnicoReferenciaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "observacoes": {
                        "type": "string"
                    }
                }
            },
            "PlanoDesenvolvimentoFamiliarSaveDTO": {
                "type": "object",
                "properties": {
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "analiseDiagnostica": {
                        "type": "string"
                    },
                    "composicaoFamiliar": {
                        "type": "string"
                    },
                    "moradia": {
                        "type": "string"
                    },
                    "saude": {
                        "type": "string"
                    },
                    "educacao": {
                        "type": "string"
                    },
                    "renda": {
                        "type": "string"
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "objetivo": {
                        "type": "string"
                    },
                    "numeroPlano": {
                        "type": "string"
                    },
                    "dataElaboracao": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataValidade": {
                        "type": "string",
                        "format": "date"
                    },
                    "dataReavaliacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "itensPlanoIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "assinaturaResponsavelFamilia": {
                        "type": "string"
                    },
                    "tecnicoReferenciaId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "OrientadorSaveDTO": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "telefone": {
                        "type": "string"
                    },
                    "cargo": {
                        "type": "string",
                        "enum": [
                            "GESTOR",
                            "TECNICO",
                            "ADMIN",
                            "ORIENTADOR"
                        ]
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "endereco": {
                        "type": "string"
                    },
                    "cpf": {
                        "type": "string"
                    },
                    "dataDeInclusao": {
                        "type": "string",
                        "format": "date"
                    },
                    "ultimaAtualizacao": {
                        "type": "string",
                        "format": "date"
                    },
                    "cor": {
                        "type": "string",
                        "enum": [
                            "VERMELHO",
                            "AMARELO",
                            "VERDE",
                            "AZUL",
                            "ROXO",
                            "LARANJA",
                            "ROSA",
                            "MARROM"
                        ]
                    },
                    "familiasIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "tecnicoId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "MembroComposicaoFamiliarSaveDTO": {
                "type": "object",
                "properties": {
                    "numeroOrdem": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "nome": {
                        "type": "string"
                    },
                    "nomeSocial": {
                        "type": "string"
                    },
                    "dataNascimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "parentescoOuVinculo": {
                        "type": "string"
                    },
                    "profissao": {
                        "type": "string"
                    },
                    "ocupacao": {
                        "type": "string"
                    },
                    "renda": {
                        "type": "number",
                        "format": "double"
                    },
                    "fatoresRiscoSocial": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "ALCOOLISMO",
                                "DEFICIENCIA_AUDITIVA",
                                "DEFICIENCIA_FISICA",
                                "DEFICIENCIA_MENTAL",
                                "DEFICIENCIA_VISUAL",
                                "DESEMPREGO",
                                "DROGADICAO",
                                "HIV_POSITIVO",
                                "PROBLEMAS_PSIQUIATRICOS",
                                "SITUACAO_DE_RUA",
                                "TRABALHO_INFANTIL",
                                "VIOLENCIA_DOMESTICA",
                                "MEDIDA_SOCIOEDUCATIVA",
                                "PRIVACAO_DE_LIBERDADE",
                                "ACOLHIMENTO_INSTITUCIONAL",
                                "OUTRO"
                            ]
                        }
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "ItemPdfSaveDTO": {
                "type": "object",
                "properties": {
                    "acoesCras": {
                        "type": "string"
                    },
                    "acoesFamilia": {
                        "type": "string"
                    },
                    "estrategiaIntervencao": {
                        "type": "string"
                    },
                    "prazo": {
                        "type": "string",
                        "format": "date"
                    },
                    "resultadoEsperado": {
                        "type": "string"
                    },
                    "observacoes": {
                        "type": "string"
                    }
                }
            },
            "GoogleCalendarEventSaveDTO": {
                "type": "object",
                "properties": {
                    "titulo": {
                        "type": "string",
                        "minLength": 1
                    },
                    "descricao": {
                        "type": "string"
                    },
                    "local": {
                        "type": "string"
                    },
                    "inicio": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "fim": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "fusoHorario": {
                        "type": "string"
                    },
                    "calendarId": {
                        "type": "string"
                    },
                    "participantes": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "email"
                        }
                    }
                },
                "required": [
                    "fim",
                    "inicio",
                    "titulo"
                ]
            },
            "GoogleCalendarEventResponseDTO": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "calendarId": {
                        "type": "string"
                    },
                    "titulo": {
                        "type": "string"
                    },
                    "descricao": {
                        "type": "string"
                    },
                    "local": {
                        "type": "string"
                    },
                    "status": {
                        "type": "string"
                    },
                    "htmlLink": {
                        "type": "string"
                    },
                    "inicio": {
                        "type": "string"
                    },
                    "fim": {
                        "type": "string"
                    }
                }
            },
            "GoogleCalendarCallbackDTO": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string",
                        "minLength": 1
                    },
                    "state": {
                        "type": "string",
                        "minLength": 1
                    }
                },
                "required": [
                    "code",
                    "state"
                ]
            },
            "GoogleCalendarStatusDTO": {
                "type": "object",
                "properties": {
                    "clientIdConfigured": {
                        "type": "boolean"
                    },
                    "clientSecretConfigured": {
                        "type": "boolean"
                    },
                    "redirectUriConfigured": {
                        "type": "boolean"
                    },
                    "conectado": {
                        "type": "boolean"
                    },
                    "applicationName": {
                        "type": "string"
                    },
                    "redirectUri": {
                        "type": "string"
                    },
                    "scopes": {
                        "type": "string"
                    },
                    "conectadoEm": {
                        "type": "string"
                    },
                    "tokenExpiraEm": {
                        "type": "string"
                    }
                }
            },
            "FolhaDeProsseguimentoSaveDTO": {
                "type": "object",
                "properties": {
                    "numeroFolha": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "registrosIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "assinaturaTecnico": {
                        "type": "string"
                    },
                    "assinaturaOrientador": {
                        "type": "string"
                    }
                }
            },
            "FichaVisitaDomiciliarSaveDTO": {
                "type": "object",
                "properties": {
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "orientadorResponsavelId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataVisita": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "representanteVisitadoId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "objetivoDaVisita": {
                        "type": "string"
                    },
                    "pessoasFamiliaQueConversaram": {
                        "type": "string"
                    },
                    "demandasOrientacoesEncaminhamentos": {
                        "type": "string"
                    }
                }
            },
            "FichaCadastralDaFamiliaSaveDTO": {
                "type": "object",
                "properties": {
                    "dataMatricula": {
                        "type": "string",
                        "format": "date"
                    },
                    "numeroMatricula": {
                        "type": "string"
                    },
                    "dataDesligamento": {
                        "type": "string",
                        "format": "date"
                    },
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "condicoesMoradia": {
                        "type": "string",
                        "enum": [
                            "PROPRIA",
                            "ALUGADA",
                            "CEDIDA"
                        ]
                    },
                    "valorAluguelOuFinanciamento": {
                        "type": "number",
                        "format": "double"
                    },
                    "tipoConstrucao": {
                        "type": "string",
                        "enum": [
                            "ALVENARIA",
                            "MADEIRA",
                            "MISTA"
                        ]
                    },
                    "situacaoHabitacional": {
                        "type": "string",
                        "enum": [
                            "CORTICO",
                            "FAVELA",
                            "LOTEAMENTO_IRREGULAR",
                            "OUTRO"
                        ]
                    },
                    "outraSituacaoHabitacional": {
                        "type": "string"
                    },
                    "numeroComodos": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "qtdMulheresGestantesNaFamilia": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "qtdGestantesComPreNatal": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "programasTransferenciaRenda": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "RENDA_MINIMA",
                                "BOLSA_FAMILIA",
                                "RENDA_CIDADA",
                                "ACAO_JOVEM",
                                "PETI",
                                "OUTRO"
                            ]
                        }
                    },
                    "outroProgramaTransferenciaRenda": {
                        "type": "string"
                    },
                    "beneficioPrestacaoContinuada": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "NAO_RECEBE",
                                "IDOSO",
                                "PESSOA_COM_DEFICIENCIA"
                            ]
                        }
                    },
                    "composicaoFamiliarIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "informacoesComplementaresCriancasAdolescentesIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "demandaApresentadaOrientacoesEncaminhamentos": {
                        "type": "string"
                    },
                    "tecnicoReferenciaId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataAtendimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "FichaDeAtualizacaoQuadroSituacionalSaveDTO": {
                "type": "object",
                "properties": {
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "dataAtualizacao": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "tecnicoResponsavelId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "observacoes": {
                        "type": "string"
                    },
                    "informacoesComplementaresCriancasAdolescentesIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "pdf": {
                        "type": "boolean"
                    },
                    "pdu": {
                        "type": "boolean"
                    },
                    "orientadorId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "responsavelId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "FamiliaSaveDTO": {
                "type": "object",
                "properties": {
                    "representanteId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "membrosIds": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "format": "uuid"
                        }
                    },
                    "prontuarioId": {
                        "type": "string",
                        "format": "uuid"
                    },
                    "ativo": {
                        "type": "boolean"
                    },
                    "prioridade": {
                        "type": "string",
                        "enum": [
                            "BAIXA",
                            "MEDIA",
                            "ALTA"
                        ]
                    },
                    "ultimaVisita": {
                        "type": "string",
                        "format": "date"
                    },
                    "proximaVisita": {
                        "type": "string",
                        "format": "date"
                    },
                    "orientadorId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "EnderecoSaveDTO": {
                "type": "object",
                "properties": {
                    "logradouro": {
                        "type": "string"
                    },
                    "numero": {
                        "type": "string"
                    },
                    "complemento": {
                        "type": "string"
                    },
                    "bairro": {
                        "type": "string"
                    },
                    "cep": {
                        "type": "string"
                    },
                    "distrito": {
                        "type": "string"
                    },
                    "pontoReferencia": {
                        "type": "string"
                    }
                }
            },
            "DadosSasfSaveDTO": {
                "type": "object",
                "properties": {
                    "nomeServicoSasf": {
                        "type": "string"
                    },
                    "cas": {
                        "type": "string"
                    },
                    "cras": {
                        "type": "string"
                    }
                }
            },
            "CuidadorSaveDTO": {
                "type": "object",
                "properties": {
                    "nome": {
                        "type": "string"
                    },
                    "grauParentesco": {
                        "type": "string"
                    },
                    "ausente": {
                        "type": "boolean"
                    }
                }
            },
            "CriancaSaveDTO": {
                "type": "object",
                "properties": {
                    "nome": {
                        "type": "string"
                    },
                    "dataNascimento": {
                        "type": "string",
                        "format": "date"
                    },
                    "estuda": {
                        "type": "boolean"
                    },
                    "grauInstrucao": {
                        "type": "string",
                        "enum": [
                            "ANALFABETO",
                            "ENSINO_FUNDAMENTAL_COMPLETO",
                            "ENSINO_FUNDAMENTAL_INCOMPLETO",
                            "ENSINO_MEDIO_COMPLETO",
                            "ENSINO_MEDIO_INCOMPLETO",
                            "ENSINO_SUPERIOR_COMPLETO",
                            "ENSINO_SUPERIOR_INCOMPLETO"
                        ]
                    },
                    "inseridoCca": {
                        "type": "boolean"
                    },
                    "inseridoCj": {
                        "type": "boolean"
                    },
                    "inseridoCedesp": {
                        "type": "boolean"
                    },
                    "inseridoNci": {
                        "type": "boolean"
                    },
                    "outrosServicos": {
                        "type": "string"
                    },
                    "familiaId": {
                        "type": "string",
                        "format": "uuid"
                    }
                }
            },
            "AcaoPduSaveDTO": {
                "type": "object",
                "properties": {
                    "ordemPrioridade": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "descricao": {
                        "type": "string"
                    }
                }
            },
            "AcaoIntersetorialPduSaveDTO": {
                "type": "object",
                "properties": {
                    "ordem": {
                        "type": "integer",
                        "format": "int32"
                    },
                    "tipo": {
                        "type": "string",
                        "enum": [
                            "SAUDE",
                            "EDUCACAO",
                            "ASSISTENCIA_SOCIAL",
                            "TRABALHO",
                            "CULTURA",
                            "OUTRO"
                        ]
                    },
                    "nomeServico": {
                        "type": "string"
                    },
                    "formaOuTipoPactuacao": {
                        "type": "string"
                    },
                    "periodoAcompanhamento": {
                        "type": "string"
                    },
                    "profissionalReferencia": {
                        "type": "string"
                    }
                }
            },
            "HealthResponseDTO": {
                "type": "object",
                "properties": {
                    "status": {
                        "type": "string"
                    },
                    "api": {
                        "type": "string"
                    },
                    "database": {
                        "type": "string"
                    },
                    "timestamp": {
                        "type": "string",
                        "format": "date-time"
                    }
                }
            },
            "GoogleCalendarAuthUrlDTO": {
                "type": "object",
                "properties": {
                    "authorizationUrl": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string"
                    },
                    "redirectUri": {
                        "type": "string"
                    }
                }
            }
        }
    }
}