You are working on an existing frontend for the SASF system.

The current UI looks visually weak and incomplete. I need you to improve the frontend and implement/refine the screen flow for the TECNICO user role.

# Important:

* Do NOT rewrite the whole frontend from scratch.
* Do NOT break existing routes, authentication, API calls, role-based rendering, or backend contracts.
* Do NOT hardcode fake role logic.
* Do NOT remove existing business logic.
* Keep the current logo.
* Keep the current background image, but improve how it is used.
* Make changes directly in the existing frontend files.
* Reuse existing components where possible.
* Avoid adding dependencies unless clearly necessary.
* If a backend endpoint is missing, do not invent it silently. Create a clean frontend placeholder/TODO and report what endpoint is missing.

# Main goal:
Build a polished, modern, professional frontend experience for the TECNICO role, using the existing backend structure and frontend project.

# Design quality bar:
The result must look like a finished MVP, not a wireframe.

## Visual direction:

* Modern public-service dashboard
* Light theme
* White/off-white surfaces
* Blue as primary color
* Soft borders
* Soft shadows
* Rounded corners
* Better spacing
* Better typography hierarchy
* Better active/hover/focus states
* Better responsive layout
* Calm, clean, professional
* Not childish
* Not cluttered
* Not too colorful

## Existing user roles:

* GESTOR
* TECNICO
* ADMIN
* ORIENTADOR

## Focus now:
Implement/refine the flow for TECNICO.

## TECNICO user flow:

1. Login

Improve the login page:

* Make it visually balanced.
* Do not leave the form floating awkwardly.
* Integrate the background illustration better.
* Keep the logo visible.
* Add a polished login card.
* Improve input/button styling.
* Improve spacing, typography, shadows, and responsiveness.

2. Dashboard

Dashboard must have a sidebar menu with these tabs:

* Visão Geral
* Famílias
* Novo Registro
* Minha Agenda
* Meu Perfil

Keep the dashboard structure, but make it visually polished:

* Better sidebar
* Better selected menu item
* Better content container
* Better card layout
* Less empty awkward space
* More consistent spacing
* Better clickable states
* Responsive behavior

3. Tela Famílias

Create/refine the Families screen for TECNICO.

Filters:

* Benefício
* Orientador
* Prioridade

Search:

* Rua
* Nome/CPF do representante

Sorting:

* Visitas mais recentes
* Visitas menos recentes
* Registro mais recente
* Registro menos recente

View modes:

* Cards
* Lista

Each family card/list item must show:

* Nome do representante
* Rua
* Prioridade
* Última visita
* Orientador responsável, if available

Important visual rule:
Each family card/list item background color should be associated with the responsible orientador.

If the backend already provides orientador color, use it.
If not, create a deterministic frontend color mapping by orientador id/name and mark it clearly as a temporary frontend fallback.

On click:
Open the virtual prontuário for that family.

4. Prontuário Virtual da Família

When the user clicks a family, open a family record/prontuário detail page or modal, depending on the current app routing style.

It must show the family data available from the backend and provide actions:

* Fazer novo registro no prontuário daquela família

  * Goes to the ficha filling screen.
  * The family/prontuário must already be selected/pre-filled.
* Acessar prontuário em PDF
* Imprimir/baixar prontuário
* Contatar orientador
* Contatar representante da família

If any action has no backend endpoint yet, implement the UI state and leave a clear TODO with the required endpoint.

5. Tela Novo Registro

This screen has two flows.

Flow A: Add a ficha to an existing prontuário.

Steps:

1. Open a modal/pop-up to select the family and ficha type.
2. User searches family by representante name or CPF.
3. Show matching families.
4. After selecting a family, show a small preview/thumbnail/list of fichas already existing in that prontuário.
5. Show a card/button with "+" to add a new ficha.
6. On clicking "+", let user select the ficha type.
7. Open the ficha filling screen.
8. Create a new object for that ficha type.
9. Pre-fill fields using the selected family/prontuário DTO.

Flow B: Open new prontuário.

Steps:

1. User chooses "Abrir novo prontuário".

2. Open the ficha filling screen.

3. Create a new prontuário object.

4. Create a new Ficha Cadastral da Família.

5. Use existing backend DTO/contracts if available.

6. Tela de Preenchimento da Ficha

Create/refine a reusable ficha filling layout.

Buttons:

* Salvar
* Sair
* Avançar
* Voltar

Requirements:

* Use the existing CEP API integration for address fields.
* Add automatic CPF formatting.
* Add automatic phone formatting.
* Keep validation readable and user-friendly.
* Use a multi-section layout if the ficha is long.
* Preserve existing backend payload structures.

7. Tela Minha Agenda

Components:

* Large calendar area
* Google Agenda integration placeholder for now
* Scheduling requests area
* "+" button to create appointment/agendar atendimento

Since Google Calendar integration is not ready yet:

* Create a clean placeholder component.
* Make it visually clear it is a future integration.
* Do not fake real Google data.

8. Tela Agendar Atendimento

Flow:

1. Select family.
2. Show a small calendar preview.
3. Choose day and time.
4. Auto-fill the event title using this pattern, but improve wording if useful:

ATENDIMENTO - {Nome do profissional} - {Nome do representante}

5. Set appointment color based on the orientador responsible for the family.
6. On save, show a confirmation modal:

Message:
"Atendimento agendado com sucesso."

Buttons:

* Informar orientador
* Informar representante

If notification/contact endpoints do not exist yet, implement button UI and report missing backend endpoints.

9. Tela Meu Perfil

Create/refine a standard profile screen:

* User data
* Edit profile action
* Basic user settings
* Clean layout
* Responsive

Backend/domain context:

CargoUsuario enum:
GESTOR, TECNICO, ADMIN, ORIENTADOR

## Implementation instructions:

1. Inspect the current frontend structure first.
2. Identify framework, routing system, styling system, API layer, auth handling, and role-based rendering.
3. Find existing pages/components for login, dashboard, sidebar, families, records, forms, calendar, and profile.
4. Reuse and improve existing files where possible.
5. Create reusable components only when they reduce duplication.
6. Keep UI state clean.
7. Keep data fetching isolated in services/hooks if that pattern already exists.
8. Do not invent backend response shapes. Use real types/contracts if present.
9. If data contracts are unclear, infer minimally from existing code and add TODO comments.
10. Make the final UI clearly better than the current screenshots.

Before editing:
Return a short plan with:

* files/components you will inspect
* visual problems found
* missing backend/API information
* proposed implementation steps

Then implement.

After editing:
Return:

* files changed
* screens improved/created
* backend endpoints or DTOs still needed
* what I should manually test

# Backend Swagger

```json
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
    "tags": [
        {
            "name": "usuario-controller"
        },
        {
            "name": "termo-autorizacao-de-uso-de-imagem-controller"
        },
        {
            "name": "tecnico-controller"
        },
        {
            "name": "sintese-pdu-por-area-controller"
        },
        {
            "name": "representante-controller"
        },
        {
            "name": "registro-prosseguimento-controller"
        },
        {
            "name": "prontuario-controller"
        },
        {
            "name": "plano-desenvolvimento-do-usuario-controller"
        },
        {
            "name": "plano-desenvolvimento-familiar-controller"
        },
        {
            "name": "orientador-controller"
        },
        {
            "name": "membro-composicao-familiar-controller"
        },
        {
            "name": "item-pdf-controller"
        },
        {
            "name": "folha-de-prosseguimento-controller"
        },
        {
            "name": "ficha-visita-domiciliar-controller"
        },
        {
            "name": "ficha-cadastral-da-familia-controller"
        },
        {
            "name": "ficha-de-atualizacao-quadro-situacional-controller"
        },
        {
            "name": "familia-controller"
        },
        {
            "name": "endereco-controller"
        },
        {
            "name": "dados-sasf-controller"
        },
        {
            "name": "cuidador-controller"
        },
        {
            "name": "crianca-controller"
        },
        {
            "name": "acao-pdu-controller"
        },
        {
            "name": "acao-intersetorial-pdu-controller"
        }
    ],
    "paths": {
        "/api/usuario/{id}": {
            "get": {
                "tags": [
                    "usuario-controller"
                ],
                "summary": "GET /api/usuario/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string",
                                    "email": "string",
                                    "telefone": "string",
                                    "cargo": "GESTOR",
                                    "ativo": true,
                                    "endereco": "string",
                                    "cpf": "string",
                                    "dataDeInclusao": "2026-05-31",
                                    "ultimaAtualizacao": "2026-05-31"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "usuario-controller"
                ],
                "summary": "PUT /api/usuario/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string",
                                    "email": "string",
                                    "telefone": "string",
                                    "cargo": "GESTOR",
                                    "ativo": true,
                                    "endereco": "string",
                                    "cpf": "string",
                                    "dataDeInclusao": "2026-05-31",
                                    "ultimaAtualizacao": "2026-05-31"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "name": "string",
                                "email": "string",
                                "telefone": "string",
                                "cargo": "GESTOR",
                                "ativo": true,
                                "endereco": "string",
                                "cpf": "string",
                                "dataDeInclusao": "2026-05-31",
                                "ultimaAtualizacao": "2026-05-31"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "usuario-controller"
                ],
                "summary": "DELETE /api/usuario/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/usuario": {
            "get": {
                "tags": [
                    "usuario-controller"
                ],
                "summary": "GET /api/usuario",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "name": "string",
                                        "email": "string",
                                        "telefone": "string",
                                        "cargo": "GESTOR",
                                        "ativo": true,
                                        "endereco": "string",
                                        "cpf": "string",
                                        "dataDeInclusao": "2026-05-31",
                                        "ultimaAtualizacao": "2026-05-31"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "usuario-controller"
                ],
                "summary": "POST /api/usuario",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string",
                                    "email": "string",
                                    "telefone": "string",
                                    "cargo": "GESTOR",
                                    "ativo": true,
                                    "endereco": "string",
                                    "cpf": "string",
                                    "dataDeInclusao": "2026-05-31",
                                    "ultimaAtualizacao": "2026-05-31"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "name": "string",
                                "email": "user@example.com",
                                "telefone": "string",
                                "cargo": "GESTOR",
                                "ativo": true,
                                "endereco": "string",
                                "cpf": "string",
                                "dataDeInclusao": "2026-05-31",
                                "ultimaAtualizacao": "2026-05-31",
                                "senha": "stringst"
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
                "summary": "POST /api/usuario/login",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "token": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "email": "user@example.com",
                                "senha": "string"
                            }
                        }
                    }
                }
            }
        },
        "/api/termo/{id}": {
            "get": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "summary": "GET /api/termo/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "usuarioAutorizanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "numeroCedulaIdentidade": "string",
                                    "cpf": "string",
                                    "nomesCriancasAutorizadas": [
                                        "string"
                                    ],
                                    "dataAssinatura": "2026-05-31T17:39:02.907Z"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "summary": "PUT /api/termo/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "usuarioAutorizanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "numeroCedulaIdentidade": "string",
                                    "cpf": "string",
                                    "nomesCriancasAutorizadas": [
                                        "string"
                                    ],
                                    "dataAssinatura": "2026-05-31T17:39:02.909Z"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "usuarioAutorizanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "numeroCedulaIdentidade": "string",
                                "cpf": "string",
                                "nomesCriancasAutorizadas": [
                                    "string"
                                ],
                                "dataAssinatura": "2026-05-31T17:39:02.909Z"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "summary": "DELETE /api/termo/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/termo": {
            "get": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "summary": "GET /api/termo",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "usuarioAutorizanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "numeroCedulaIdentidade": "string",
                                        "cpf": "string",
                                        "nomesCriancasAutorizadas": [
                                            "string"
                                        ],
                                        "dataAssinatura": "2026-05-31T17:39:02.911Z"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "termo-autorizacao-de-uso-de-imagem-controller"
                ],
                "summary": "POST /api/termo",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "usuarioAutorizanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "numeroCedulaIdentidade": "string",
                                    "cpf": "string",
                                    "nomesCriancasAutorizadas": [
                                        "string"
                                    ],
                                    "dataAssinatura": "2026-05-31T17:39:02.912Z"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "usuarioAutorizanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "numeroCedulaIdentidade": "string",
                                "cpf": "string",
                                "nomesCriancasAutorizadas": [
                                    "string"
                                ],
                                "dataAssinatura": "2026-05-31T17:39:02.912Z"
                            }
                        }
                    }
                }
            }
        },
        "/api/tecnico/{id}": {
            "get": {
                "tags": [
                    "tecnico-controller"
                ],
                "summary": "GET /api/tecnico/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string",
                                    "email": "string",
                                    "telefone": "string",
                                    "cargo": "GESTOR",
                                    "ativo": true,
                                    "endereco": "string",
                                    "cpf": "string",
                                    "dataDeInclusao": "2026-05-31",
                                    "ultimaAtualizacao": "2026-05-31",
                                    "especialidade": "string",
                                    "orientadoresIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ]
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "tecnico-controller"
                ],
                "summary": "PUT /api/tecnico/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string",
                                    "email": "string",
                                    "telefone": "string",
                                    "cargo": "GESTOR",
                                    "ativo": true,
                                    "endereco": "string",
                                    "cpf": "string",
                                    "dataDeInclusao": "2026-05-31",
                                    "ultimaAtualizacao": "2026-05-31",
                                    "especialidade": "string",
                                    "orientadoresIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ]
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "name": "string",
                                "email": "string",
                                "telefone": "string",
                                "cargo": "GESTOR",
                                "ativo": true,
                                "endereco": "string",
                                "cpf": "string",
                                "dataDeInclusao": "2026-05-31",
                                "ultimaAtualizacao": "2026-05-31",
                                "especialidade": "string",
                                "orientadoresIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ]
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "tecnico-controller"
                ],
                "summary": "DELETE /api/tecnico/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/tecnico": {
            "get": {
                "tags": [
                    "tecnico-controller"
                ],
                "summary": "GET /api/tecnico",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "name": "string",
                                        "email": "string",
                                        "telefone": "string",
                                        "cargo": "GESTOR",
                                        "ativo": true,
                                        "endereco": "string",
                                        "cpf": "string",
                                        "dataDeInclusao": "2026-05-31",
                                        "ultimaAtualizacao": "2026-05-31",
                                        "especialidade": "string",
                                        "orientadoresIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "tecnico-controller"
                ],
                "summary": "POST /api/tecnico",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string",
                                    "email": "string",
                                    "telefone": "string",
                                    "cargo": "GESTOR",
                                    "ativo": true,
                                    "endereco": "string",
                                    "cpf": "string",
                                    "dataDeInclusao": "2026-05-31",
                                    "ultimaAtualizacao": "2026-05-31",
                                    "especialidade": "string",
                                    "orientadoresIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ]
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "name": "string",
                                "email": "string",
                                "telefone": "string",
                                "cargo": "GESTOR",
                                "ativo": true,
                                "endereco": "string",
                                "cpf": "string",
                                "dataDeInclusao": "2026-05-31",
                                "ultimaAtualizacao": "2026-05-31",
                                "especialidade": "string",
                                "orientadoresIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ]
                            }
                        }
                    }
                }
            }
        },
        "/api/sintesepdu/{id}": {
            "get": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "summary": "GET /api/sintesepdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "situacoesAgravoIdentificadas": "string",
                                    "acoesCRAS": "string",
                                    "acoesCREAS": "string",
                                    "acoesSaude": "string",
                                    "acoesEducacao": "string",
                                    "acoesTrabalho": "string",
                                    "acoesOutros": "string",
                                    "prazo": "2026-05-31",
                                    "resultadosEsperados": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "summary": "PUT /api/sintesepdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "situacoesAgravoIdentificadas": "string",
                                    "acoesCRAS": "string",
                                    "acoesCREAS": "string",
                                    "acoesSaude": "string",
                                    "acoesEducacao": "string",
                                    "acoesTrabalho": "string",
                                    "acoesOutros": "string",
                                    "prazo": "2026-05-31",
                                    "resultadosEsperados": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "situacoesAgravoIdentificadas": "string",
                                "acoesCRAS": "string",
                                "acoesCREAS": "string",
                                "acoesSaude": "string",
                                "acoesEducacao": "string",
                                "acoesTrabalho": "string",
                                "acoesOutros": "string",
                                "prazo": "2026-05-31",
                                "resultadosEsperados": "string"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "summary": "DELETE /api/sintesepdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/sintesepdu": {
            "get": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "summary": "GET /api/sintesepdu",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "situacoesAgravoIdentificadas": "string",
                                        "acoesCRAS": "string",
                                        "acoesCREAS": "string",
                                        "acoesSaude": "string",
                                        "acoesEducacao": "string",
                                        "acoesTrabalho": "string",
                                        "acoesOutros": "string",
                                        "prazo": "2026-05-31",
                                        "resultadosEsperados": "string"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "sintese-pdu-por-area-controller"
                ],
                "summary": "POST /api/sintesepdu",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "situacoesAgravoIdentificadas": "string",
                                    "acoesCRAS": "string",
                                    "acoesCREAS": "string",
                                    "acoesSaude": "string",
                                    "acoesEducacao": "string",
                                    "acoesTrabalho": "string",
                                    "acoesOutros": "string",
                                    "prazo": "2026-05-31",
                                    "resultadosEsperados": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "situacoesAgravoIdentificadas": "string",
                                "acoesCRAS": "string",
                                "acoesCREAS": "string",
                                "acoesSaude": "string",
                                "acoesEducacao": "string",
                                "acoesTrabalho": "string",
                                "acoesOutros": "string",
                                "prazo": "2026-05-31",
                                "resultadosEsperados": "string"
                            }
                        }
                    }
                }
            }
        },
        "/api/representante/{id}": {
            "get": {
                "tags": [
                    "representante-controller"
                ],
                "summary": "GET /api/representante/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nome": "string",
                                    "dataNascimento": "2026-05-31",
                                    "sexo": "FEMININO",
                                    "nisNitNb": "string",
                                    "naturalidade": "string",
                                    "corRaca": "BRANCA",
                                    "possuiDeficiencia": true,
                                    "cpf": "string",
                                    "rg": "string",
                                    "dataEmissaoRg": "2026-05-31",
                                    "orgaoEmissorRg": "string",
                                    "ufRg": "string",
                                    "ctpsNumero": "string",
                                    "ctpsSerie": "string",
                                    "nomeMae": "string",
                                    "nomePai": "string",
                                    "estadoCivil": "SOLTEIRO",
                                    "grauInstrucao": "ANALFABETO",
                                    "profissao": "string",
                                    "ocupacao": "EMPREGADO",
                                    "renda": 0.1,
                                    "enderecoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "telefoneResidencial": "string",
                                    "telefoneCelular": "string",
                                    "telefone": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "representante-controller"
                ],
                "summary": "PUT /api/representante/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nome": "string",
                                    "dataNascimento": "2026-05-31",
                                    "sexo": "FEMININO",
                                    "nisNitNb": "string",
                                    "naturalidade": "string",
                                    "corRaca": "BRANCA",
                                    "possuiDeficiencia": true,
                                    "cpf": "string",
                                    "rg": "string",
                                    "dataEmissaoRg": "2026-05-31",
                                    "orgaoEmissorRg": "string",
                                    "ufRg": "string",
                                    "ctpsNumero": "string",
                                    "ctpsSerie": "string",
                                    "nomeMae": "string",
                                    "nomePai": "string",
                                    "estadoCivil": "SOLTEIRO",
                                    "grauInstrucao": "ANALFABETO",
                                    "profissao": "string",
                                    "ocupacao": "EMPREGADO",
                                    "renda": 0.1,
                                    "enderecoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "telefoneResidencial": "string",
                                    "telefoneCelular": "string",
                                    "telefone": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "nome": "string",
                                "dataNascimento": "2026-05-31",
                                "sexo": "FEMININO",
                                "nisNitNb": "string",
                                "naturalidade": "string",
                                "corRaca": "BRANCA",
                                "possuiDeficiencia": true,
                                "cpf": "string",
                                "rg": "string",
                                "dataEmissaoRg": "2026-05-31",
                                "orgaoEmissorRg": "string",
                                "ufRg": "string",
                                "ctpsNumero": "string",
                                "ctpsSerie": "string",
                                "nomeMae": "string",
                                "nomePai": "string",
                                "estadoCivil": "SOLTEIRO",
                                "grauInstrucao": "ANALFABETO",
                                "profissao": "string",
                                "ocupacao": "EMPREGADO",
                                "renda": 0.1,
                                "enderecoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "telefoneResidencial": "string",
                                "telefoneCelular": "string",
                                "telefone": "string"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "representante-controller"
                ],
                "summary": "DELETE /api/representante/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/representante": {
            "get": {
                "tags": [
                    "representante-controller"
                ],
                "summary": "GET /api/representante",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "x-rawExampleSnippet": "[\n                         {\n                             \"id\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"nome\": \"string\",\n                             \"dataNascimento\": \"2026-05-31\",\n                             \"sexo\": \"FEMININO\",\n                             \"nisNitNb\": \"string\",\n                             \"naturalidade\": \"string\",\n                             \"corRaca\": \"BRANCA\",\n                             \"possuiDeficiencia\": true,\n                             \"cpf\": \"string\",\n                             \"rg\": \"string\",\n                             \"dataEmissaoRg\": \"2026-05-31\",\n                             \"orgaoEmissorRg\": \"string\",\n                             \"ufRg\": \"string\",\n                             \"ctpsNumero\": \"string\",\n                             \"ctpsSerie\": \"string\",\n                             \"nomeMae\": \"string\",\n                             \"nomePai\": \"string\",\n                             \"estadoCivil\": \"SOLTEIRO\",\n                             \"grauInstrucao\": \"ANALFABETO\",\n                             \"profissao\": \"string\",\n                             \"ocupacao\": \"EMPREGADO\",\n                             \"renda\": 0.1,\n                             \"enderecoId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"telefoneResidencial\": \"string\",\n                             \"telefoneCelular\": \"string\",\n                             \"telefone\": \"string\"",
                                "x-exampleTruncatedInPdf": true
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "representante-controller"
                ],
                "summary": "POST /api/representante",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nome": "string",
                                    "dataNascimento": "2026-05-31",
                                    "sexo": "FEMININO",
                                    "nisNitNb": "string",
                                    "naturalidade": "string",
                                    "corRaca": "BRANCA",
                                    "possuiDeficiencia": true,
                                    "cpf": "string",
                                    "rg": "string",
                                    "dataEmissaoRg": "2026-05-31",
                                    "orgaoEmissorRg": "string",
                                    "ufRg": "string",
                                    "ctpsNumero": "string",
                                    "ctpsSerie": "string",
                                    "nomeMae": "string",
                                    "nomePai": "string",
                                    "estadoCivil": "SOLTEIRO",
                                    "grauInstrucao": "ANALFABETO",
                                    "profissao": "string",
                                    "ocupacao": "EMPREGADO",
                                    "renda": 0.1,
                                    "enderecoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "telefoneResidencial": "string",
                                    "telefoneCelular": "string",
                                    "telefone": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "nome": "string",
                                "dataNascimento": "2026-05-31",
                                "sexo": "FEMININO",
                                "nisNitNb": "string",
                                "naturalidade": "string",
                                "corRaca": "BRANCA",
                                "possuiDeficiencia": true,
                                "cpf": "string",
                                "rg": "string",
                                "dataEmissaoRg": "2026-05-31",
                                "orgaoEmissorRg": "string",
                                "ufRg": "string",
                                "ctpsNumero": "string",
                                "ctpsSerie": "string",
                                "nomeMae": "string",
                                "nomePai": "string",
                                "estadoCivil": "SOLTEIRO",
                                "grauInstrucao": "ANALFABETO",
                                "profissao": "string",
                                "ocupacao": "EMPREGADO",
                                "renda": 0.1,
                                "enderecoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "telefoneResidencial": "string",
                                "telefoneCelular": "string",
                                "telefone": "string"
                            }
                        }
                    }
                }
            }
        },
        "/api/registroprosseguimento/{id}": {
            "get": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "summary": "GET /api/registroprosseguimento/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "dataRegistro": "2026-05-31",
                                    "demanda": "string",
                                    "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "summary": "PUT /api/registroprosseguimento/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "dataRegistro": "2026-05-31",
                                    "demanda": "string",
                                    "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "dataRegistro": "2026-05-31",
                                "demanda": "string",
                                "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "summary": "DELETE /api/registroprosseguimento/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/registroprosseguimento": {
            "get": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "summary": "GET /api/registroprosseguimento",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "dataRegistro": "2026-05-31",
                                        "demanda": "string",
                                        "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "registro-prosseguimento-controller"
                ],
                "summary": "POST /api/registroprosseguimento",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "dataRegistro": "2026-05-31",
                                    "demanda": "string",
                                    "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "dataRegistro": "2026-05-31",
                                "demanda": "string",
                                "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            }
        },
        "/api/prontuario/{id}": {
            "get": {
                "tags": [
                    "prontuario-controller"
                ],
                "summary": "GET /api/prontuario/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ativo": true,
                                    "deletedAt": "2026-05-31T17:39:02.941Z",
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "fichaCadastralDaFamiliaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "fichasAtualizacaoQuadroSituacionalIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "planosDesenvolvimentoFamiliarIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "folhasProsseguimentoIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "planosDesenvolvimentoUsuarioIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ]
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "prontuario-controller"
                ],
                "summary": "PUT /api/prontuario/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ativo": true,
                                    "deletedAt": "2026-05-31T17:39:02.943Z",
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "fichaCadastralDaFamiliaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "fichasAtualizacaoQuadroSituacionalIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "planosDesenvolvimentoFamiliarIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "folhasProsseguimentoIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "planosDesenvolvimentoUsuarioIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ]
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "fichaCadastralDaFamiliaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "fichasAtualizacaoQuadroSituacionalIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "planosDesenvolvimentoFamiliarIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "folhasProsseguimentoIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "planosDesenvolvimentoUsuarioIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ]
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "prontuario-controller"
                ],
                "summary": "DELETE /api/prontuario/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/prontuario": {
            "get": {
                "tags": [
                    "prontuario-controller"
                ],
                "summary": "GET /api/prontuario",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "ativo": true,
                                        "deletedAt": "2026-05-31T17:39:02.945Z",
                                        "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "fichaCadastralDaFamiliaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "fichasAtualizacaoQuadroSituacionalIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ],
                                        "planosDesenvolvimentoFamiliarIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ],
                                        "folhasProsseguimentoIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ],
                                        "planosDesenvolvimentoUsuarioIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "prontuario-controller"
                ],
                "summary": "POST /api/prontuario",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ativo": true,
                                    "deletedAt": "2026-05-31T17:39:02.946Z",
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "fichaCadastralDaFamiliaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "fichasAtualizacaoQuadroSituacionalIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "planosDesenvolvimentoFamiliarIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "folhasProsseguimentoIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "planosDesenvolvimentoUsuarioIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ]
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "fichaCadastralDaFamiliaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "fichasAtualizacaoQuadroSituacionalIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "planosDesenvolvimentoFamiliarIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "folhasProsseguimentoIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "planosDesenvolvimentoUsuarioIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ]
                            }
                        }
                    }
                }
            }
        },
        "/api/pdu/{id}": {
            "get": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "summary": "GET /api/pdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "x-rawExampleSnippet": "{\n                         \"id\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"beneficiarioId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"tipoBeneficiario\": \"IDOSO\",\n                         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"familiaId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"cuidadorId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"tecnicoAcompanhamentoId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"sinteseSituacaoApresentada\": \"string\",\n                         \"situacoesAgravoIdentificadas\": [\n                           \"AUSENCIA_DE_CUIDADOR\"\n                         ],\n                         \"outrasSituacoesAgravo\": \"string\",\n                         \"acoesPrevencaoRiscoOuGarantiaAcessoIds\": [\n                           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n                         ],\n                         \"acoesPactuadasIds\": [\n                           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n                         ],\n                         \"acoesIntersetoriaisSocioassistenciaisIds\": [\n                           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n                         ],\n                         \"numeroPlano\": \"string\",\n                         \"dataElaboracao\": \"2026-05-31\",\n                         \"dataValidade\": \"2026-05-31\",\n                         \"dataReavaliacao\": \"2026-05-31\",\n                         \"sintesesPorAreaIds\": [\n                           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"",
                                "x-exampleTruncatedInPdf": true
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "summary": "PUT /api/pdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "x-rawExampleSnippet": "{\n         \"beneficiarioId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"tipoBeneficiario\": \"IDOSO\",\n         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"familiaId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"cuidadorId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"tecnicoAcompanhamentoId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"sinteseSituacaoApresentada\": \"string\",\n         \"situacoesAgravoIdentificadas\": [\n           \"AUSENCIA_DE_CUIDADOR\"\n         ],\n         \"outrasSituacoesAgravo\": \"string\",\n         \"acoesPrevencaoRiscoOuGarantiaAcessoIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"acoesPactuadasIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"acoesIntersetoriaisSocioassistenciaisIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"numeroPlano\": \"string\",\n         \"dataElaboracao\": \"2026-05-31\",\n         \"dataValidade\": \"2026-05-31\",\n         \"dataReavaliacao\": \"2026-05-31\",\n         \"sintesesPorAreaIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n\n\n\n\n   Responses\n\n\n\n   Code             Description                                                                                       Links\n\n   200              OK                                                                                                No links\n\n                    Media type\n\n                      */*\n                    Controls Accept header.\n\n                    Example Value     Schema\n\n\n                     {\n                         \"id\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"beneficiarioId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"tipoBeneficiario\": \"IDOSO\",\n                         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"familiaId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"cuidadorId\": \"3fa85f64-\n... [truncated in extracted PDF text]",
                            "x-exampleTruncatedInPdf": true
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "summary": "DELETE /api/pdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/pdu": {
            "get": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "summary": "GET /api/pdu",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "x-rawExampleSnippet": "[\n                         {\n                             \"id\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"beneficiarioId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"tipoBeneficiario\": \"IDOSO\",\n                             \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"familiaId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"cuidadorId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"tecnicoAcompanhamentoId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"sinteseSituacaoApresentada\": \"string\",\n                             \"situacoesAgravoIdentificadas\": [\n                                \"AUSENCIA_DE_CUIDADOR\"\n                             ],\n                             \"outrasSituacoesAgravo\": \"string\",\n                             \"acoesPrevencaoRiscoOuGarantiaAcessoIds\": [\n                                \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n                             ],\n                             \"acoesPactuadasIds\": [\n                                \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n                             ],\n                             \"acoesIntersetoriaisSocioassistenciaisIds\": [\n                                \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n                             ],\n                             \"numeroPlano\": \"string\",\n                             \"dataElaboracao\": \"2026-05-31\",\n                             \"dataValidade\": \"2026-05-31\",\n                             \"dataReavaliacao\": \"2026-05-31\",\n                             \"sintesesPorAreaIds\": [",
                                "x-exampleTruncatedInPdf": true
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "plano-desenvolvimento-do-usuario-controller"
                ],
                "summary": "POST /api/pdu",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "x-rawExampleSnippet": "{\n         \"beneficiarioId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"tipoBeneficiario\": \"IDOSO\",\n         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"familiaId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"cuidadorId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"tecnicoAcompanhamentoId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"sinteseSituacaoApresentada\": \"string\",\n         \"situacoesAgravoIdentificadas\": [\n           \"AUSENCIA_DE_CUIDADOR\"\n         ],\n         \"outrasSituacoesAgravo\": \"string\",\n         \"acoesPrevencaoRiscoOuGarantiaAcessoIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"acoesPactuadasIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"acoesIntersetoriaisSocioassistenciaisIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"numeroPlano\": \"string\",\n         \"dataElaboracao\": \"2026-05-31\",\n         \"dataValidade\": \"2026-05-31\",\n         \"dataReavaliacao\": \"2026-05-31\",\n         \"sintesesPorAreaIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n\n\n\n\n   Responses\n\n\n\n   Code             Description                                                                                       Links\n\n   200              OK                                                                                                No links\n\n                    Media type\n\n                      */*\n                    Controls Accept header.\n\n                    Example Value     Schema\n\n\n                     {\n                         \"id\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"beneficiarioId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"tipoBeneficiario\": \"IDOSO\",\n                         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"familiaId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"cuidadorId\": \"3fa85f64-\n... [truncated in extracted PDF text]",
                            "x-exampleTruncatedInPdf": true
                        }
                    }
                }
            }
        },
        "/api/pdf/{id}": {
            "get": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "summary": "GET /api/pdf/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "analiseDiagnostica": "string",
                                    "composicaoFamiliar": "string",
                                    "moradia": "string",
                                    "saude": "string",
                                    "educacao": "string",
                                    "renda": "string",
                                    "observacoes": "string",
                                    "objetivo": "string",
                                    "numeroPlano": "string",
                                    "dataElaboracao": "2026-05-31",
                                    "dataValidade": "2026-05-31",
                                    "dataReavaliacao": "2026-05-31",
                                    "itensPlanoIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "assinaturaResponsavelFamilia": "string",
                                    "tecnicoReferenciaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "summary": "PUT /api/pdf/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "analiseDiagnostica": "string",
                                    "composicaoFamiliar": "string",
                                    "moradia": "string",
                                    "saude": "string",
                                    "educacao": "string",
                                    "renda": "string",
                                    "observacoes": "string",
                                    "objetivo": "string",
                                    "numeroPlano": "string",
                                    "dataElaboracao": "2026-05-31",
                                    "dataValidade": "2026-05-31",
                                    "dataReavaliacao": "2026-05-31",
                                    "itensPlanoIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "assinaturaResponsavelFamilia": "string",
                                    "tecnicoReferenciaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "analiseDiagnostica": "string",
                                "composicaoFamiliar": "string",
                                "moradia": "string",
                                "saude": "string",
                                "educacao": "string",
                                "renda": "string",
                                "observacoes": "string",
                                "objetivo": "string",
                                "numeroPlano": "string",
                                "dataElaboracao": "2026-05-31",
                                "dataValidade": "2026-05-31",
                                "dataReavaliacao": "2026-05-31",
                                "itensPlanoIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "assinaturaResponsavelFamilia": "string",
                                "tecnicoReferenciaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "summary": "DELETE /api/pdf/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/pdf": {
            "get": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "summary": "GET /api/pdf",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "analiseDiagnostica": "string",
                                        "composicaoFamiliar": "string",
                                        "moradia": "string",
                                        "saude": "string",
                                        "educacao": "string",
                                        "renda": "string",
                                        "observacoes": "string",
                                        "objetivo": "string",
                                        "numeroPlano": "string",
                                        "dataElaboracao": "2026-05-31",
                                        "dataValidade": "2026-05-31",
                                        "dataReavaliacao": "2026-05-31",
                                        "itensPlanoIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ],
                                        "assinaturaResponsavelFamilia": "string",
                                        "tecnicoReferenciaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "plano-desenvolvimento-familiar-controller"
                ],
                "summary": "POST /api/pdf",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "analiseDiagnostica": "string",
                                    "composicaoFamiliar": "string",
                                    "moradia": "string",
                                    "saude": "string",
                                    "educacao": "string",
                                    "renda": "string",
                                    "observacoes": "string",
                                    "objetivo": "string",
                                    "numeroPlano": "string",
                                    "dataElaboracao": "2026-05-31",
                                    "dataValidade": "2026-05-31",
                                    "dataReavaliacao": "2026-05-31",
                                    "itensPlanoIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "assinaturaResponsavelFamilia": "string",
                                    "tecnicoReferenciaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "analiseDiagnostica": "string",
                                "composicaoFamiliar": "string",
                                "moradia": "string",
                                "saude": "string",
                                "educacao": "string",
                                "renda": "string",
                                "observacoes": "string",
                                "objetivo": "string",
                                "numeroPlano": "string",
                                "dataElaboracao": "2026-05-31",
                                "dataValidade": "2026-05-31",
                                "dataReavaliacao": "2026-05-31",
                                "itensPlanoIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "assinaturaResponsavelFamilia": "string",
                                "tecnicoReferenciaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            }
        },
        "/api/orientador/{id}": {
            "get": {
                "tags": [
                    "orientador-controller"
                ],
                "summary": "GET /api/orientador/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string",
                                    "email": "string",
                                    "telefone": "string",
                                    "cargo": "GESTOR",
                                    "ativo": true,
                                    "endereco": "string",
                                    "cpf": "string",
                                    "dataDeInclusao": "2026-05-31",
                                    "ultimaAtualizacao": "2026-05-31",
                                    "cor": "VERMELHO",
                                    "familiasIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "tecnicoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "orientador-controller"
                ],
                "summary": "PUT /api/orientador/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string",
                                    "email": "string",
                                    "telefone": "string",
                                    "cargo": "GESTOR",
                                    "ativo": true,
                                    "endereco": "string",
                                    "cpf": "string",
                                    "dataDeInclusao": "2026-05-31",
                                    "ultimaAtualizacao": "2026-05-31",
                                    "cor": "VERMELHO",
                                    "familiasIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "tecnicoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "name": "string",
                                "email": "string",
                                "telefone": "string",
                                "cargo": "GESTOR",
                                "ativo": true,
                                "endereco": "string",
                                "cpf": "string",
                                "dataDeInclusao": "2026-05-31",
                                "ultimaAtualizacao": "2026-05-31",
                                "cor": "VERMELHO",
                                "familiasIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "tecnicoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "orientador-controller"
                ],
                "summary": "DELETE /api/orientador/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/orientador": {
            "get": {
                "tags": [
                    "orientador-controller"
                ],
                "summary": "GET /api/orientador",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "name": "string",
                                        "email": "string",
                                        "telefone": "string",
                                        "cargo": "GESTOR",
                                        "ativo": true,
                                        "endereco": "string",
                                        "cpf": "string",
                                        "dataDeInclusao": "2026-05-31",
                                        "ultimaAtualizacao": "2026-05-31",
                                        "cor": "VERMELHO",
                                        "familiasIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ],
                                        "tecnicoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "orientador-controller"
                ],
                "summary": "POST /api/orientador",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "name": "string",
                                    "email": "string",
                                    "telefone": "string",
                                    "cargo": "GESTOR",
                                    "ativo": true,
                                    "endereco": "string",
                                    "cpf": "string",
                                    "dataDeInclusao": "2026-05-31",
                                    "ultimaAtualizacao": "2026-05-31",
                                    "cor": "VERMELHO",
                                    "familiasIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "tecnicoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "name": "string",
                                "email": "string",
                                "telefone": "string",
                                "cargo": "GESTOR",
                                "ativo": true,
                                "endereco": "string",
                                "cpf": "string",
                                "dataDeInclusao": "2026-05-31",
                                "ultimaAtualizacao": "2026-05-31",
                                "cor": "VERMELHO",
                                "familiasIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "tecnicoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            }
        },
        "/api/membro/{id}": {
            "get": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "summary": "GET /api/membro/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "numeroOrdem": 0,
                                    "nome": "string",
                                    "nomeSocial": "string",
                                    "dataNascimento": "2026-05-31",
                                    "parentescoOuVinculo": "string",
                                    "profissao": "string",
                                    "ocupacao": "string",
                                    "renda": 0.1,
                                    "fatoresRiscoSocial": [
                                        "ALCOOLISMO"
                                    ],
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "summary": "PUT /api/membro/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "numeroOrdem": 0,
                                    "nome": "string",
                                    "nomeSocial": "string",
                                    "dataNascimento": "2026-05-31",
                                    "parentescoOuVinculo": "string",
                                    "profissao": "string",
                                    "ocupacao": "string",
                                    "renda": 0.1,
                                    "fatoresRiscoSocial": [
                                        "ALCOOLISMO"
                                    ],
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "numeroOrdem": 0,
                                "nome": "string",
                                "nomeSocial": "string",
                                "dataNascimento": "2026-05-31",
                                "parentescoOuVinculo": "string",
                                "profissao": "string",
                                "ocupacao": "string",
                                "renda": 0.1,
                                "fatoresRiscoSocial": [
                                    "ALCOOLISMO"
                                ],
                                "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "summary": "DELETE /api/membro/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/membro": {
            "get": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "summary": "GET /api/membro",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "numeroOrdem": 0,
                                        "nome": "string",
                                        "nomeSocial": "string",
                                        "dataNascimento": "2026-05-31",
                                        "parentescoOuVinculo": "string",
                                        "profissao": "string",
                                        "ocupacao": "string",
                                        "renda": 0.1,
                                        "fatoresRiscoSocial": [
                                            "ALCOOLISMO"
                                        ],
                                        "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "membro-composicao-familiar-controller"
                ],
                "summary": "POST /api/membro",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "numeroOrdem": 0,
                                    "nome": "string",
                                    "nomeSocial": "string",
                                    "dataNascimento": "2026-05-31",
                                    "parentescoOuVinculo": "string",
                                    "profissao": "string",
                                    "ocupacao": "string",
                                    "renda": 0.1,
                                    "fatoresRiscoSocial": [
                                        "ALCOOLISMO"
                                    ],
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "numeroOrdem": 0,
                                "nome": "string",
                                "nomeSocial": "string",
                                "dataNascimento": "2026-05-31",
                                "parentescoOuVinculo": "string",
                                "profissao": "string",
                                "ocupacao": "string",
                                "renda": 0.1,
                                "fatoresRiscoSocial": [
                                    "ALCOOLISMO"
                                ],
                                "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            }
        },
        "/api/itempdf/{id}": {
            "get": {
                "tags": [
                    "item-pdf-controller"
                ],
                "summary": "GET /api/itempdf/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "acoesCras": "string",
                                    "acoesFamilia": "string",
                                    "estrategiaIntervencao": "string",
                                    "prazo": "2026-05-31",
                                    "resultadoEsperado": "string",
                                    "observacoes": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "item-pdf-controller"
                ],
                "summary": "PUT /api/itempdf/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "acoesCras": "string",
                                    "acoesFamilia": "string",
                                    "estrategiaIntervencao": "string",
                                    "prazo": "2026-05-31",
                                    "resultadoEsperado": "string",
                                    "observacoes": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "acoesCras": "string",
                                "acoesFamilia": "string",
                                "estrategiaIntervencao": "string",
                                "prazo": "2026-05-31",
                                "resultadoEsperado": "string",
                                "observacoes": "string"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "item-pdf-controller"
                ],
                "summary": "DELETE /api/itempdf/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/itempdf": {
            "get": {
                "tags": [
                    "item-pdf-controller"
                ],
                "summary": "GET /api/itempdf",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "acoesCras": "string",
                                        "acoesFamilia": "string",
                                        "estrategiaIntervencao": "string",
                                        "prazo": "2026-05-31",
                                        "resultadoEsperado": "string",
                                        "observacoes": "string"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "item-pdf-controller"
                ],
                "summary": "POST /api/itempdf",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "acoesCras": "string",
                                    "acoesFamilia": "string",
                                    "estrategiaIntervencao": "string",
                                    "prazo": "2026-05-31",
                                    "resultadoEsperado": "string",
                                    "observacoes": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "acoesCras": "string",
                                "acoesFamilia": "string",
                                "estrategiaIntervencao": "string",
                                "prazo": "2026-05-31",
                                "resultadoEsperado": "string",
                                "observacoes": "string"
                            }
                        }
                    }
                }
            }
        },
        "/api/folhaprosseguimento/{id}": {
            "get": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "summary": "GET /api/folhaprosseguimento/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "numeroFolha": 0,
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "registrosIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "observacoes": "string",
                                    "assinaturaTecnico": "string",
                                    "assinaturaOrientador": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "summary": "PUT /api/folhaprosseguimento/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "numeroFolha": 0,
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "registrosIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "observacoes": "string",
                                    "assinaturaTecnico": "string",
                                    "assinaturaOrientador": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "numeroFolha": 0,
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "registrosIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "observacoes": "string",
                                "assinaturaTecnico": "string",
                                "assinaturaOrientador": "string"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "summary": "DELETE /api/folhaprosseguimento/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/folhaprosseguimento": {
            "get": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "summary": "GET /api/folhaprosseguimento",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "numeroFolha": 0,
                                        "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "registrosIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ],
                                        "observacoes": "string",
                                        "assinaturaTecnico": "string",
                                        "assinaturaOrientador": "string"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "folha-de-prosseguimento-controller"
                ],
                "summary": "POST /api/folhaprosseguimento",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "numeroFolha": 0,
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "registrosIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "observacoes": "string",
                                    "assinaturaTecnico": "string",
                                    "assinaturaOrientador": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "numeroFolha": 0,
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "registrosIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "observacoes": "string",
                                "assinaturaTecnico": "string",
                                "assinaturaOrientador": "string"
                            }
                        }
                    }
                }
            }
        },
        "/api/fichavisita/{id}": {
            "get": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "summary": "GET /api/fichavisita/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "orientadorResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "dataVisita": "2026-05-31T17:39:02.992Z",
                                    "representanteVisitadoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "objetivoDaVisita": "string",
                                    "pessoasFamiliaQueConversaram": "string",
                                    "demandasOrientacoesEncaminhamentos": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "summary": "PUT /api/fichavisita/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "orientadorResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "dataVisita": "2026-05-31T17:39:02.993Z",
                                    "representanteVisitadoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "objetivoDaVisita": "string",
                                    "pessoasFamiliaQueConversaram": "string",
                                    "demandasOrientacoesEncaminhamentos": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "orientadorResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "dataVisita": "2026-05-31T17:39:02.993Z",
                                "representanteVisitadoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "objetivoDaVisita": "string",
                                "pessoasFamiliaQueConversaram": "string",
                                "demandasOrientacoesEncaminhamentos": "string"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "summary": "DELETE /api/fichavisita/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/fichavisita": {
            "get": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "summary": "GET /api/fichavisita",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "orientadorResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "dataVisita": "2026-05-31T17:39:02.995Z",
                                        "representanteVisitadoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "objetivoDaVisita": "string",
                                        "pessoasFamiliaQueConversaram": "string",
                                        "demandasOrientacoesEncaminhamentos": "string"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "ficha-visita-domiciliar-controller"
                ],
                "summary": "POST /api/fichavisita",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "orientadorResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "dataVisita": "2026-05-31T17:39:02.996Z",
                                    "representanteVisitadoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "objetivoDaVisita": "string",
                                    "pessoasFamiliaQueConversaram": "string",
                                    "demandasOrientacoesEncaminhamentos": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "orientadorResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "dataVisita": "2026-05-31T17:39:02.996Z",
                                "representanteVisitadoId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "objetivoDaVisita": "string",
                                "pessoasFamiliaQueConversaram": "string",
                                "demandasOrientacoesEncaminhamentos": "string"
                            }
                        }
                    }
                }
            }
        },
        "/api/fichacadastral/{id}": {
            "get": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "summary": "GET /api/fichacadastral/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "x-rawExampleSnippet": "{\n                         \"id\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"dataMatricula\": \"2026-05-31\",\n                         \"numeroMatricula\": \"string\",\n                         \"dataDesligamento\": \"2026-05-31\",\n                         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"condicoesMoradia\": \"PROPRIA\",\n                         \"valorAluguelOuFinanciamento\": 0.1,\n                         \"tipoConstrucao\": \"ALVENARIA\",\n                         \"situacaoHabitacional\": \"CORTICO\",\n                         \"outraSituacaoHabitacional\": \"string\",\n                         \"numeroComodos\": 0,\n                         \"qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada\": 0,\n                         \"qtdMulheresGestantesNaFamilia\": 0,\n                         \"qtdGestantesComPreNatal\": 0,\n                         \"programasTransferenciaRenda\": [\n                           \"RENDA_MINIMA\"\n                         ],\n                         \"outroProgramaTransferenciaRenda\": \"string\",\n                         \"beneficioPrestacaoContinuada\": [\n                           \"NAO_RECEBE\"\n                         ],\n                         \"composicaoFamiliarIds\": [\n                           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n                         ],\n                         \"informacoesComplementaresCriancasAdolescentesIds\": [\n                           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n                         ],",
                                "x-exampleTruncatedInPdf": true
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "summary": "PUT /api/fichacadastral/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "x-rawExampleSnippet": "{\n         \"dataMatricula\": \"2026-05-31\",\n         \"numeroMatricula\": \"string\",\n         \"dataDesligamento\": \"2026-05-31\",\n         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"condicoesMoradia\": \"PROPRIA\",\n         \"valorAluguelOuFinanciamento\": 0.1,\n         \"tipoConstrucao\": \"ALVENARIA\",\n         \"situacaoHabitacional\": \"CORTICO\",\n         \"outraSituacaoHabitacional\": \"string\",\n         \"numeroComodos\": 0,\n         \"qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada\": 0,\n         \"qtdMulheresGestantesNaFamilia\": 0,\n         \"qtdGestantesComPreNatal\": 0,\n         \"programasTransferenciaRenda\": [\n           \"RENDA_MINIMA\"\n         ],\n         \"outroProgramaTransferenciaRenda\": \"string\",\n         \"beneficioPrestacaoContinuada\": [\n           \"NAO_RECEBE\"\n         ],\n         \"composicaoFamiliarIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"informacoesComplementaresCriancasAdolescentesIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"demandaApresentadaOrientacoesEncaminhamentos\": \"string\",\n\n\n\n\n   Responses\n\n\n\n   Code             Description                                                                                       Links\n\n   200              OK                                                                                                No links\n\n                    Media type\n\n                      */*\n                    Controls Accept header.\n\n                    Example Value     Schema\n\n\n                     {\n                         \"id\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"dataMatricula\": \"2026-05-31\",\n                         \"numeroMatricula\": \"string\",\n                         \"dataDesligamento\": \"2026-05-31\",\n                         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"condicoesMoradia\": \"PROPRIA\",\n                         \"valorAluguelOuFinanciamento\": 0.1,\n                        \n... [truncated in extracted PDF text]",
                            "x-exampleTruncatedInPdf": true
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "summary": "DELETE /api/fichacadastral/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/fichacadastral": {
            "get": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "summary": "GET /api/fichacadastral",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "x-rawExampleSnippet": "[\n                         {\n                             \"id\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"dataMatricula\": \"2026-05-31\",\n                             \"numeroMatricula\": \"string\",\n                             \"dataDesligamento\": \"2026-05-31\",\n                             \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                             \"condicoesMoradia\": \"PROPRIA\",\n                             \"valorAluguelOuFinanciamento\": 0.1,\n                             \"tipoConstrucao\": \"ALVENARIA\",\n                             \"situacaoHabitacional\": \"CORTICO\",\n                             \"outraSituacaoHabitacional\": \"string\",\n                             \"numeroComodos\": 0,\n                             \"qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada\": 0,\n                             \"qtdMulheresGestantesNaFamilia\": 0,\n                             \"qtdGestantesComPreNatal\": 0,\n                             \"programasTransferenciaRenda\": [\n                                \"RENDA_MINIMA\"\n                             ],\n                             \"outroProgramaTransferenciaRenda\": \"string\",\n                             \"beneficioPrestacaoContinuada\": [\n                                \"NAO_RECEBE\"\n                             ],\n                             \"composicaoFamiliarIds\": [\n                                \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n                             ],\n                             \"informacoesComplementaresCriancasAdolescentesIds\": [\n                                \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"",
                                "x-exampleTruncatedInPdf": true
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "ficha-cadastral-da-familia-controller"
                ],
                "summary": "POST /api/fichacadastral",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "x-rawExampleSnippet": "{\n         \"dataMatricula\": \"2026-05-31\",\n         \"numeroMatricula\": \"string\",\n         \"dataDesligamento\": \"2026-05-31\",\n         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n         \"condicoesMoradia\": \"PROPRIA\",\n         \"valorAluguelOuFinanciamento\": 0.1,\n         \"tipoConstrucao\": \"ALVENARIA\",\n         \"situacaoHabitacional\": \"CORTICO\",\n         \"outraSituacaoHabitacional\": \"string\",\n         \"numeroComodos\": 0,\n         \"qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada\": 0,\n         \"qtdMulheresGestantesNaFamilia\": 0,\n         \"qtdGestantesComPreNatal\": 0,\n         \"programasTransferenciaRenda\": [\n           \"RENDA_MINIMA\"\n         ],\n         \"outroProgramaTransferenciaRenda\": \"string\",\n         \"beneficioPrestacaoContinuada\": [\n           \"NAO_RECEBE\"\n         ],\n         \"composicaoFamiliarIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"informacoesComplementaresCriancasAdolescentesIds\": [\n           \"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\n         ],\n         \"demandaApresentadaOrientacoesEncaminhamentos\": \"string\",\n\n\n\n\n   Responses\n\n\n\n   Code             Description                                                                                       Links\n\n   200              OK                                                                                                No links\n\n                    Media type\n\n                      */*\n                    Controls Accept header.\n\n                    Example Value     Schema\n\n                     {\n                         \"id\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"dataMatricula\": \"2026-05-31\",\n                         \"numeroMatricula\": \"string\",\n                         \"dataDesligamento\": \"2026-05-31\",\n                         \"representanteId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",\n                         \"condicoesMoradia\": \"PROPRIA\",\n                         \"valorAluguelOuFinanciamento\": 0.1,\n                         \n... [truncated in extracted PDF text]",
                            "x-exampleTruncatedInPdf": true
                        }
                    }
                }
            }
        },
        "/api/fichaattquadro/{id}": {
            "get": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "summary": "GET /api/fichaattquadro/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "dataAtualizacao": "2026-05-31T17:39:03.010Z",
                                    "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "observacoes": "string",
                                    "informacoesComplementaresCriancasAdolescentesIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "pdf": true,
                                    "pdu": true,
                                    "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "responsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "summary": "PUT /api/fichaattquadro/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "dataAtualizacao": "2026-05-31T17:39:03.012Z",
                                    "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "observacoes": "string",
                                    "informacoesComplementaresCriancasAdolescentesIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "pdf": true,
                                    "pdu": true,
                                    "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "responsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "dataAtualizacao": "2026-05-31T17:39:03.011Z",
                                "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "observacoes": "string",
                                "informacoesComplementaresCriancasAdolescentesIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "pdf": true,
                                "pdu": true,
                                "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "responsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "summary": "DELETE /api/fichaattquadro/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/fichaattquadro": {
            "get": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "summary": "GET /api/fichaattquadro",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "dataAtualizacao": "2026-05-31T17:39:03.014Z",
                                        "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "observacoes": "string",
                                        "informacoesComplementaresCriancasAdolescentesIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ],
                                        "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "pdf": true,
                                        "pdu": true,
                                        "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "responsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "ficha-de-atualizacao-quadro-situacional-controller"
                ],
                "summary": "POST /api/fichaattquadro",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "dataAtualizacao": "2026-05-31T17:39:03.015Z",
                                    "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "observacoes": "string",
                                    "informacoesComplementaresCriancasAdolescentesIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "pdf": true,
                                    "pdu": true,
                                    "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "responsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "dataAtualizacao": "2026-05-31T17:39:03.015Z",
                                "tecnicoResponsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "observacoes": "string",
                                "informacoesComplementaresCriancasAdolescentesIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "pdf": true,
                                "pdu": true,
                                "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "responsavelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            }
        },
        "/api/familia/{id}": {
            "get": {
                "tags": [
                    "familia-controller"
                ],
                "summary": "GET /api/familia/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "membrosIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ativo": true,
                                    "prioridade": "BAIXA",
                                    "ultimaVisita": "2026-05-31",
                                    "proximaVisita": "2026-05-31",
                                    "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "familia-controller"
                ],
                "summary": "PUT /api/familia/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "membrosIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ativo": true,
                                    "prioridade": "BAIXA",
                                    "ultimaVisita": "2026-05-31",
                                    "proximaVisita": "2026-05-31",
                                    "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "membrosIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "ativo": true,
                                "prioridade": "BAIXA",
                                "ultimaVisita": "2026-05-31",
                                "proximaVisita": "2026-05-31",
                                "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "familia-controller"
                ],
                "summary": "DELETE /api/familia/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/familia": {
            "get": {
                "tags": [
                    "familia-controller"
                ],
                "summary": "GET /api/familia",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "membrosIds": [
                                            "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                        ],
                                        "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "ativo": true,
                                        "prioridade": "BAIXA",
                                        "ultimaVisita": "2026-05-31",
                                        "proximaVisita": "2026-05-31",
                                        "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "familia-controller"
                ],
                "summary": "POST /api/familia",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "membrosIds": [
                                        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ],
                                    "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ativo": true,
                                    "prioridade": "BAIXA",
                                    "ultimaVisita": "2026-05-31",
                                    "proximaVisita": "2026-05-31",
                                    "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "representanteId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "membrosIds": [
                                    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                ],
                                "prontuarioId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                "ativo": true,
                                "prioridade": "BAIXA",
                                "ultimaVisita": "2026-05-31",
                                "proximaVisita": "2026-05-31",
                                "orientadorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            }
        },
        "/api/endereco/{id}": {
            "get": {
                "tags": [
                    "endereco-controller"
                ],
                "summary": "GET /api/endereco/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "logradouro": "string",
                                    "numero": "string",
                                    "complemento": "string",
                                    "bairro": "string",
                                    "cep": "string",
                                    "distrito": "string",
                                    "pontoReferencia": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "endereco-controller"
                ],
                "summary": "PUT /api/endereco/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "logradouro": "string",
                                    "numero": "string",
                                    "complemento": "string",
                                    "bairro": "string",
                                    "cep": "string",
                                    "distrito": "string",
                                    "pontoReferencia": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "logradouro": "string",
                                "numero": "string",
                                "complemento": "string",
                                "bairro": "string",
                                "cep": "string",
                                "distrito": "string",
                                "pontoReferencia": "string"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "endereco-controller"
                ],
                "summary": "DELETE /api/endereco/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/endereco": {
            "get": {
                "tags": [
                    "endereco-controller"
                ],
                "summary": "GET /api/endereco",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "logradouro": "string",
                                        "numero": "string",
                                        "complemento": "string",
                                        "bairro": "string",
                                        "cep": "string",
                                        "distrito": "string",
                                        "pontoReferencia": "string"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "endereco-controller"
                ],
                "summary": "POST /api/endereco",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "logradouro": "string",
                                    "numero": "string",
                                    "complemento": "string",
                                    "bairro": "string",
                                    "cep": "string",
                                    "distrito": "string",
                                    "pontoReferencia": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "logradouro": "string",
                                "numero": "string",
                                "complemento": "string",
                                "bairro": "string",
                                "cep": "string",
                                "distrito": "string",
                                "pontoReferencia": "string"
                            }
                        }
                    }
                }
            }
        },
        "/api/dados/{id}": {
            "get": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "summary": "GET /api/dados/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nomeServicoSasf": "string",
                                    "cas": "string",
                                    "cras": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "summary": "PUT /api/dados/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nomeServicoSasf": "string",
                                    "cas": "string",
                                    "cras": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "nomeServicoSasf": "string",
                                "cas": "string",
                                "cras": "string"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "summary": "DELETE /api/dados/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/dados": {
            "get": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "summary": "GET /api/dados",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "nomeServicoSasf": "string",
                                        "cas": "string",
                                        "cras": "string"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "dados-sasf-controller"
                ],
                "summary": "POST /api/dados",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nomeServicoSasf": "string",
                                    "cas": "string",
                                    "cras": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "nomeServicoSasf": "string",
                                "cas": "string",
                                "cras": "string"
                            }
                        }
                    }
                }
            }
        },
        "/api/cuidador/{id}": {
            "get": {
                "tags": [
                    "cuidador-controller"
                ],
                "summary": "GET /api/cuidador/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nome": "string",
                                    "grauParentesco": "string",
                                    "ausente": true
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "cuidador-controller"
                ],
                "summary": "PUT /api/cuidador/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nome": "string",
                                    "grauParentesco": "string",
                                    "ausente": true
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "nome": "string",
                                "grauParentesco": "string",
                                "ausente": true
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "cuidador-controller"
                ],
                "summary": "DELETE /api/cuidador/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/cuidador": {
            "get": {
                "tags": [
                    "cuidador-controller"
                ],
                "summary": "GET /api/cuidador",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "nome": "string",
                                        "grauParentesco": "string",
                                        "ausente": true
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "cuidador-controller"
                ],
                "summary": "POST /api/cuidador",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nome": "string",
                                    "grauParentesco": "string",
                                    "ausente": true
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "nome": "string",
                                "grauParentesco": "string",
                                "ausente": true
                            }
                        }
                    }
                }
            }
        },
        "/api/crianca/{id}": {
            "get": {
                "tags": [
                    "crianca-controller"
                ],
                "summary": "GET /api/crianca/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nome": "string",
                                    "dataNascimento": "2026-05-31",
                                    "estuda": true,
                                    "grauInstrucao": "ANALFABETO",
                                    "inseridoCca": true,
                                    "inseridoCj": true,
                                    "inseridoCedesp": true,
                                    "inseridoNci": true,
                                    "outrosServicos": "string",
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "crianca-controller"
                ],
                "summary": "PUT /api/crianca/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nome": "string",
                                    "dataNascimento": "2026-05-31",
                                    "estuda": true,
                                    "grauInstrucao": "ANALFABETO",
                                    "inseridoCca": true,
                                    "inseridoCj": true,
                                    "inseridoCedesp": true,
                                    "inseridoNci": true,
                                    "outrosServicos": "string",
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "nome": "string",
                                "dataNascimento": "2026-05-31",
                                "estuda": true,
                                "grauInstrucao": "ANALFABETO",
                                "inseridoCca": true,
                                "inseridoCj": true,
                                "inseridoCedesp": true,
                                "inseridoNci": true,
                                "outrosServicos": "string",
                                "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "crianca-controller"
                ],
                "summary": "DELETE /api/crianca/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/crianca": {
            "get": {
                "tags": [
                    "crianca-controller"
                ],
                "summary": "GET /api/crianca",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "nome": "string",
                                        "dataNascimento": "2026-05-31",
                                        "estuda": true,
                                        "grauInstrucao": "ANALFABETO",
                                        "inseridoCca": true,
                                        "inseridoCj": true,
                                        "inseridoCedesp": true,
                                        "inseridoNci": true,
                                        "outrosServicos": "string",
                                        "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "crianca-controller"
                ],
                "summary": "POST /api/crianca",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "nome": "string",
                                    "dataNascimento": "2026-05-31",
                                    "estuda": true,
                                    "grauInstrucao": "ANALFABETO",
                                    "inseridoCca": true,
                                    "inseridoCj": true,
                                    "inseridoCedesp": true,
                                    "inseridoNci": true,
                                    "outrosServicos": "string",
                                    "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "nome": "string",
                                "dataNascimento": "2026-05-31",
                                "estuda": true,
                                "grauInstrucao": "ANALFABETO",
                                "inseridoCca": true,
                                "inseridoCj": true,
                                "inseridoCedesp": true,
                                "inseridoNci": true,
                                "outrosServicos": "string",
                                "familiaId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        }
                    }
                }
            }
        },
        "/api/acaopdu/{id}": {
            "get": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "summary": "GET /api/acaopdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ordemPrioridade": 0,
                                    "descricao": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "summary": "PUT /api/acaopdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ordemPrioridade": 0,
                                    "descricao": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "ordemPrioridade": 0,
                                "descricao": "string"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "summary": "DELETE /api/acaopdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/acaopdu": {
            "get": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "summary": "GET /api/acaopdu",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "ordemPrioridade": 0,
                                        "descricao": "string"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "acao-pdu-controller"
                ],
                "summary": "POST /api/acaopdu",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ordemPrioridade": 0,
                                    "descricao": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "ordemPrioridade": 0,
                                "descricao": "string"
                            }
                        }
                    }
                }
            }
        },
        "/api/acaointerpdu/{id}": {
            "get": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "summary": "GET /api/acaointerpdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ordem": 0,
                                    "tipo": "SAUDE",
                                    "nomeServico": "string",
                                    "formaOuTipoPactuacao": "string",
                                    "periodoAcompanhamento": "string",
                                    "profissionalReferencia": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            },
            "put": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "summary": "PUT /api/acaointerpdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ordem": 0,
                                    "tipo": "SAUDE",
                                    "nomeServico": "string",
                                    "formaOuTipoPactuacao": "string",
                                    "periodoAcompanhamento": "string",
                                    "profissionalReferencia": "string"
                                }
                            }
                        }
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "ordem": 0,
                                "tipo": "SAUDE",
                                "nomeServico": "string",
                                "formaOuTipoPactuacao": "string",
                                "periodoAcompanhamento": "string",
                                "profissionalReferencia": "string"
                            }
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "summary": "DELETE /api/acaointerpdu/{id}",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                },
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "id",
                        "schema": {
                            "type": "string",
                            "format": "uuid"
                        }
                    }
                ]
            }
        },
        "/api/acaointerpdu": {
            "get": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "summary": "GET /api/acaointerpdu",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": [
                                    {
                                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                        "ordem": 0,
                                        "tipo": "SAUDE",
                                        "nomeServico": "string",
                                        "formaOuTipoPactuacao": "string",
                                        "periodoAcompanhamento": "string",
                                        "profissionalReferencia": "string"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "acao-intersetorial-pdu-controller"
                ],
                "summary": "POST /api/acaointerpdu",
                "responses": {
                    "200": {
                        "description": "OK",
                        "content": {
                            "*/*": {
                                "example": {
                                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                    "ordem": 0,
                                    "tipo": "SAUDE",
                                    "nomeServico": "string",
                                    "formaOuTipoPactuacao": "string",
                                    "periodoAcompanhamento": "string",
                                    "profissionalReferencia": "string"
                                }
                            }
                        }
                    }
                },
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "example": {
                                "ordem": 0,
                                "tipo": "SAUDE",
                                "nomeServico": "string",
                                "formaOuTipoPactuacao": "string",
                                "periodoAcompanhamento": "string",
                                "profissionalReferencia": "string"
                            }
                        }
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "UsuarioUpdateDTO": {
                "type": "object"
            },
            "UsuarioResponseDTO": {
                "type": "object"
            },
            "TermoAutorizacaoDeUsoDeImagemUpdateDTO": {
                "type": "object"
            },
            "TermoAutorizacaoDeUsoDeImagemResponseDTO": {
                "type": "object"
            },
            "TecnicoUpdateDTO": {
                "type": "object"
            },
            "TecnicoResponseDTO": {
                "type": "object"
            },
            "SintesePduPorAreaUpdateDTO": {
                "type": "object"
            },
            "SintesePduPorAreaResponseDTO": {
                "type": "object"
            },
            "RepresentanteUpdateDTO": {
                "type": "object"
            },
            "RepresentanteResponseDTO": {
                "type": "object"
            },
            "RegistroProsseguimentoUpdateDTO": {
                "type": "object"
            },
            "RegistroProsseguimentoResponseDTO": {
                "type": "object"
            },
            "ProntuarioUpdateDTO": {
                "type": "object"
            },
            "ProntuarioResponseDTO": {
                "type": "object"
            },
            "PlanoDesenvolvimentoDoUsuarioUpdateDTO": {
                "type": "object"
            },
            "PlanoDesenvolvimentoDoUsuarioResponseDTO": {
                "type": "object"
            },
            "PlanoDesenvolvimentoFamiliarUpdateDTO": {
                "type": "object"
            },
            "PlanoDesenvolvimentoFamiliarResponseDTO": {
                "type": "object"
            },
            "OrientadorUpdateDTO": {
                "type": "object"
            },
            "OrientadorResponseDTO": {
                "type": "object"
            },
            "MembroComposicaoFamiliarUpdateDTO": {
                "type": "object"
            },
            "MembroComposicaoFamiliarResponseDTO": {
                "type": "object"
            },
            "ItemPdfUpdateDTO": {
                "type": "object"
            },
            "ItemPdfResponseDTO": {
                "type": "object"
            },
            "FolhaDeProsseguimentoUpdateDTO": {
                "type": "object"
            },
            "FolhaDeProsseguimentoResponseDTO": {
                "type": "object"
            },
            "FichaVisitaDomiciliarUpdateDTO": {
                "type": "object"
            },
            "FichaVisitaDomiciliarResponseDTO": {
                "type": "object"
            },
            "FichaCadastralDaFamiliaUpdateDTO": {
                "type": "object"
            },
            "FichaCadastralDaFamiliaResponseDTO": {
                "type": "object"
            },
            "FichaDeAtualizacaoQuadroSituacionalUpdateDTO": {
                "type": "object"
            },
            "FichaDeAtualizacaoQuadroSituacionalResponseDTO": {
                "type": "object"
            },
            "FamiliaUpdateDTO": {
                "type": "object"
            },
            "FamiliaResponseDTO": {
                "type": "object"
            },
            "EnderecoUpdateDTO": {
                "type": "object"
            },
            "EnderecoResponseDTO": {
                "type": "object"
            },
            "DadosSasfUpdateDTO": {
                "type": "object"
            },
            "DadosSasfResponseDTO": {
                "type": "object"
            },
            "CuidadorUpdateDTO": {
                "type": "object"
            },
            "CuidadorResponseDTO": {
                "type": "object"
            },
            "CriancaUpdateDTO": {
                "type": "object"
            },
            "CriancaResponseDTO": {
                "type": "object"
            },
            "AcaoPduUpdateDTO": {
                "type": "object"
            },
            "AcaoPduResponseDTO": {
                "type": "object"
            },
            "AcaoIntersetorialPduUpdateDTO": {
                "type": "object"
            },
            "AcaoIntersetorialPduResponseDTO": {
                "type": "object"
            },
            "UsuarioSaveDTO": {
                "type": "object"
            },
            "UsuarioLoginDTO": {
                "type": "object"
            },
            "TokenResponseDTO": {
                "type": "object"
            },
            "TermoAutorizacaoDeUsoDeImagemSaveDTO": {
                "type": "object"
            },
            "TecnicoSaveDTO": {
                "type": "object"
            },
            "SintesePduPorAreaSaveDTO": {
                "type": "object"
            },
            "RepresentanteSaveDTO": {
                "type": "object"
            },
            "RegistroProsseguimentoSaveDTO": {
                "type": "object"
            },
            "ProntuarioSaveDTO": {
                "type": "object"
            },
            "PlanoDesenvolvimentoDoUsuarioSaveDTO": {
                "type": "object"
            },
            "PlanoDesenvolvimentoFamiliarSaveDTO": {
                "type": "object"
            },
            "OrientadorSaveDTO": {
                "type": "object"
            },
            "MembroComposicaoFamiliarSaveDTO": {
                "type": "object"
            },
            "ItemPdfSaveDTO": {
                "type": "object"
            },
            "FolhaDeProsseguimentoSaveDTO": {
                "type": "object"
            },
            "FichaVisitaDomiciliarSaveDTO": {
                "type": "object"
            },
            "FichaCadastralDaFamiliaSaveDTO": {
                "type": "object"
            },
            "FichaDeAtualizacaoQuadroSituacionalSaveDTO": {
                "type": "object"
            },
            "FamiliaSaveDTO": {
                "type": "object"
            },
            "EnderecoSaveDTO": {
                "type": "object"
            },
            "DadosSasfSaveDTO": {
                "type": "object"
            },
            "CuidadorSaveDTO": {
                "type": "object"
            },
            "CriancaSaveDTO": {
                "type": "object"
            }
        }
    },
    "x-source": {
        "file": "Swagger UI.pdf",
        "extraction": "Converted from visible Swagger UI PDF text. Long examples hidden/clipped in PDF scroll boxes are marked with x-exampleTruncatedInPdf."
    }
}

```


# SecurityConfig + login/auth
```java
package br.insper.sasf.common;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    private static final String GESTOR = "GESTOR";
    private static final String TECNICO = "TECNICO";
    private static final String ADMIN = "ADMIN";
    private static final String ORIENTADOR = "ORIENTADOR";

        private static final String[] ROTAS_USUARIOS = {
                "/api/usuario", "/api/usuario/**",
                "/api/tecnico", "/api/tecnico/**",
                "/api/orientador", "/api/orientador/**",
                "/api/gestor", "/api/gestor/**"
        };

        private static final String[] ROTAS_NUCLEO_FAMILIAR = {
                "/api/familia", "/api/familia/**",
                "/api/representante", "/api/representante/**",
                "/api/membro", "/api/membro/**",
                "/api/crianca", "/api/crianca/**",
                "/api/cuidador", "/api/cuidador/**",
                "/api/endereco", "/api/endereco/**"
        };

        private static final String[] ROTAS_PRONTUARIO = {
                "/api/prontuario", "/api/prontuario/**",
                "/api/fichacadastral", "/api/fichacadastral/**"
        };

        private static final String[] ROTAS_FICHAS = {
                "/api/termo", "/api/termo/**",
                "/api/pdf", "/api/pdf/**",
                "/api/itempdf", "/api/itempdf/**",
                "/api/folhaprosseguimento", "/api/folhaprosseguimento/**",
                "/api/registroprosseguimento", "/api/registroprosseguimento/**",
                "/api/pdu", "/api/pdu/**",
                "/api/acaopdu", "/api/acaopdu/**",
                "/api/acaointerpdu", "/api/acaointerpdu/**",
                "/api/sintesepdu", "/api/sintesepdu/**"
        };

        private static final String[] ROTAS_ADMIN_GESTOR = {
                "/api/dados", "/api/dados/**",
                "/api/fichaattquadro", "/api/fichaattquadro/**",
        };

        private static final String[] ROTAS_ORIENTADOR = {
                "/api/fichavisita", "/api/fichavisita/**",
        };

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            return http
                    .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                    .csrf(AbstractHttpConfigurer::disable)
                    .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .authorizeHttpRequests(auth -> auth

                            // Preflight CORS
                            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                            // Rotas públicas
                            .requestMatchers(HttpMethod.POST, "/usuario/login").permitAll()
                            .requestMatchers(HttpMethod.POST, "/usuario").permitAll()
                            .requestMatchers(HttpMethod.GET, "/").permitAll()

                            // Gestão de usuários
                            .requestMatchers(ROTAS_USUARIOS).hasAnyRole(ADMIN, GESTOR)

                            // Consulta do núcleo familiar
                            .requestMatchers(HttpMethod.GET, ROTAS_NUCLEO_FAMILIAR)
                            .hasAnyRole(ADMIN, TECNICO, ORIENTADOR, GESTOR)

                            // Criação e alteração do núcleo familiar
                            .requestMatchers(HttpMethod.POST, ROTAS_NUCLEO_FAMILIAR)
                            .hasAnyRole(ADMIN, TECNICO, GESTOR)

                            .requestMatchers(HttpMethod.PUT, ROTAS_NUCLEO_FAMILIAR)
                            .hasAnyRole(ADMIN, TECNICO, GESTOR)

                            .requestMatchers(HttpMethod.PATCH, ROTAS_NUCLEO_FAMILIAR)
                            .hasAnyRole(ADMIN, TECNICO, GESTOR)

                            // Exclusão do núcleo familiar
                            .requestMatchers(HttpMethod.DELETE, ROTAS_NUCLEO_FAMILIAR)
                            .hasAnyRole(ADMIN, GESTOR)

                            // Consulta de prontuário
                            .requestMatchers(HttpMethod.GET, ROTAS_PRONTUARIO)
                            .hasAnyRole(ADMIN, TECNICO, ORIENTADOR, GESTOR)

                            // Criação e atualização de prontuário
                            .requestMatchers(HttpMethod.POST, ROTAS_PRONTUARIO)
                            .hasAnyRole(ADMIN, TECNICO, GESTOR)

                            .requestMatchers(HttpMethod.PUT, ROTAS_PRONTUARIO)
                            .hasAnyRole(ADMIN, TECNICO, GESTOR)

                            .requestMatchers(HttpMethod.PATCH, ROTAS_PRONTUARIO)
                            .hasAnyRole(ADMIN, TECNICO, GESTOR)

                            // Exclusão de prontuário
                            .requestMatchers(HttpMethod.DELETE, ROTAS_PRONTUARIO)
                            .hasAnyRole(ADMIN, GESTOR)

                            // Consulta de fichas
                            .requestMatchers(HttpMethod.GET, ROTAS_FICHAS)
                            .hasAnyRole(ADMIN, TECNICO, ORIENTADOR, GESTOR)

                            // Criação e atualização de fichas.
                            .requestMatchers(HttpMethod.POST, ROTAS_FICHAS)
                            .hasAnyRole(ADMIN, TECNICO, GESTOR)

                            .requestMatchers(HttpMethod.PUT, ROTAS_FICHAS)
                            .hasAnyRole(ADMIN, TECNICO, GESTOR)

                            .requestMatchers(HttpMethod.PATCH, ROTAS_FICHAS)
                            .hasAnyRole(ADMIN, TECNICO, GESTOR)

                            // Exclusão de fichas.
                            .requestMatchers(HttpMethod.DELETE, ROTAS_FICHAS)
                            .hasAnyRole(ADMIN, GESTOR)

                            // Rotas do Orientador
                            .requestMatchers(HttpMethod.GET, ROTAS_ORIENTADOR)
                            .hasAnyRole(ADMIN, GESTOR, TECNICO, ORIENTADOR)

                            .requestMatchers(HttpMethod.POST, ROTAS_ORIENTADOR)
                            .hasAnyRole(ADMIN, GESTOR, ORIENTADOR)

                            .requestMatchers(HttpMethod.PUT, ROTAS_ORIENTADOR)
                            .hasAnyRole(ADMIN, GESTOR, ORIENTADOR)

                            .requestMatchers(HttpMethod.PATCH, ROTAS_ORIENTADOR)
                            .hasAnyRole(ADMIN, GESTOR, ORIENTADOR)

                            // Exclusão de rotas do orientador.
                            .requestMatchers(HttpMethod.DELETE, ROTAS_ORIENTADOR)
                            .hasAnyRole(ADMIN, GESTOR)

                            // Rotas de Admin e Gestor
                            .requestMatchers(HttpMethod.GET, ROTAS_ADMIN_GESTOR)
                            .hasAnyRole(ADMIN, GESTOR, TECNICO, ORIENTADOR)

                            .requestMatchers(HttpMethod.POST, ROTAS_ADMIN_GESTOR)
                            .hasAnyRole(ADMIN, GESTOR)

                            .requestMatchers(HttpMethod.PUT, ROTAS_ADMIN_GESTOR)
                            .hasAnyRole(ADMIN, GESTOR)

                            .requestMatchers(HttpMethod.PATCH, ROTAS_ADMIN_GESTOR)
                            .hasAnyRole(ADMIN, GESTOR)

                            // Exclusão de rotas do orientador.
                            .requestMatchers(HttpMethod.DELETE, ROTAS_ADMIN_GESTOR)
                            .hasAnyRole(ADMIN, GESTOR)

                            // Acesso ao Swagger
                            .requestMatchers(
                                    "/swagger-ui/**",
                                    "/v3/api-docs/**",
                                    "/v3/api-docs.yaml"
                            ).permitAll()

                            // Qualquer outra rota precisa estar autenticada
                            .anyRequest().authenticated()


                    )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

```java
package br.insper.sasf.Usuario;

import br.insper.sasf.Usuario.DTOs.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuario")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> criar(@Valid @RequestBody UsuarioSaveDTO dto) {
        return ResponseEntity.ok(usuarioService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(usuarioService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listar() {
        return ResponseEntity.ok(usuarioService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> atualizar(
            @PathVariable UUID id,
            @Valid @RequestBody UsuarioUpdateDTO dto
    ) {
        return ResponseEntity.ok(usuarioService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO> login(@Valid @RequestBody UsuarioLoginDTO loginDTO) {
        String token = usuarioService.authenticateAndGenerateToken(loginDTO);

        TokenResponseDTO dto = new TokenResponseDTO();
        dto.setToken(token);

        return ResponseEntity.ok(dto);
    }
}
```

```java
package br.insper.sasf.Usuario.DTOs;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioLoginDTO {
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    private String senha;
}
```

```java
package br.insper.sasf.Usuario.DTOs;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TokenResponseDTO {
    private String token;
}

```

```java
package br.insper.sasf.common;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String email = jwtUtil.getEmailFromToken(token);
                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    String cargoUsuario = jwtUtil.getCargoUsuarioFromToken(token);
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    email, null,
                                    List.of(new SimpleGrantedAuthority("CARGO_" + cargoUsuario))
                            );
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
```

```java
package br.insper.sasf.common;

import br.insper.sasf.Usuario.ENUMS.CargoUsuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

        public String generateToken(String email, String userId, CargoUsuario cargoUsuario) {
        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .claim("cargoUsuario", cargoUsuario.name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public String getCargoUsuarioFromToken(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("cargoUsuario", String.class);
    }
}
```

```java
package br.insper.sasf.Usuario.ENUMS;
public enum CargoUsuario {
    GESTOR,
    TECNICO,
    ADMIN,
    ORIENTADOR
}
```

```java

```

```java

```


# Main Controllers + DTOs

# Existing Fichas
```json
{
  "documento": {
    "tipo": "prontuario_socioassistencial",
    "total_paginas": 12,
    "observacao": "Documento em branco escaneado (por isso campos estão identificados como null)"
  },
  "ficha_cadastral_familia": {
    "pagina_1": {
      "nome_servico_sasf": null,
      "cas": null,
      "cras": null,
      "fl": "1/2",
      "representante_familia": {
        "nome": null,
        "sexo": null,
        "data_nascimento": null,
        "idade": null,
        "nis_nit_pis_pasep": null,
        "naturalidade": null,
        "uf": null,
        "nacionalidade": null,
        "documentos": {
          "rg": null,
          "cpf": null,
          "raca_cor": null
        },
        "deficiencia": {
          "possui": null,
          "qual": null
        },
        "estado_civil": null,
        "grau_escolaridade": null,
        "ensino_fundamental": null,
        "ensino_medio": null,
        "ensino_superior": null,
        "profissao": null,
        "ocupacao": null,
        "situacao_trabalho": null,
        "renda": null
      },
      "endereco": {
        "logradouro": null,
        "numero": null,
        "complemento": null,
        "bairro": null,
        "cep": null,
        "ponto_referencia": null
      },
      "contato": {
        "telefone_residencial": null,
        "telefone_celular": null,
        "telefone_recado": null
      },
      "condicoes_moradia": {
        "tipo_construcao": null,
        "situacao_habitacional": null,
        "recebe_programa_transferencia_renda": null,
        "recebe_servico_protecao_social": null
      },
      "composicao_familiar": []
    },
    "pagina_2": {
      "informacoes_complementares_familia": [],
      "demanda_orientacoes_encaminhamentos": null,
      "tecnico_referencia_atendimento": null,
      "data": null
    }
  },
  "ficha_atualizacao_quadro_situacional": {
    "pagina_3": {
      "matricula": null,
      "rf": null,
      "nis": null,
      "cpf": null,
      "composicao_familiar": [],
      "faixa_etaria_membros": {
        "0_a_5_anos": null,
        "6_a_14_anos": null,
        "15_a_17_anos": null,
        "18_a_29_anos": null,
        "30_a_59_anos": null,
        "60_anos_ou_mais": null,
        "nao_pcd": null
      },
      "beneficios": {
        "bpc_idoso": null,
        "bpc_pcd": null,
        "bolsa_familia": null
      },
      "situacao_beneficios": {
        "condicionalidades": null,
        "status": null
      },
      "situacao_escolar": {
        "0_a_5_anos_aguardando_vaga_em_creche_emei": null,
        "frequenta_cei": null,
        "frequenta_emei": null,
        "6_a_17_anos_fora_da_escola": null,
        "0_a_17_anos_aguardando_vaga_em_escola": null,
        "ensino_fundamental": null,
        "ensino_medio": null,
        "eja_mova_cieja_ou_supletivo_similar": null,
        "pcd_escola_sala_recursos_atendimento_especializado": null,
        "curso_superior": null
      },
      "rede_socioassistencial": {
        "cca": null,
        "cj": null,
        "cedesp": null,
        "nci": null,
        "maispd": null
      },
      "saude": {
        "criancas_ate_07_anos_vacinacao_atualizada": null,
        "mulheres_gestantes_na_familia": null,
        "gestantes_com_pre_natal": null
      },
      "situacoes_vulnerabilidade_social": {
        "situacao_de_rua": null,
        "situacao_trabalho_infantil": null,
        "dependencia_alcool": null,
        "dependencia_drogas": null,
        "adolescente_em_medida_socioeducativa_meio_aberto": null,
        "adolescente_jovem_em_sistema_prisional": null,
        "adulto_em_sistema_prisional": null,
        "crianca_adolescente_em_situacao_de_abuso_exploracao_sexual": null,
        "crianca_adolescente_em_saica": null,
        "idoso_em_situacao_de_acolhimento_institucional": null
      },
      "observacoes": null,
      "pdf": null,
      "pdu": null,
      "data": null,
      "tecnico": null,
      "cidade": "São Paulo",
      "orientador": null,
      "responsavel": null
    }
  },
  "termo_autorizacao_uso_imagem": {
    "pagina_4": {
      "instituicao": "União de Núcleos, Associações dos Moradores de Heliópolis e Região",
      "autorizante": {
        "nome": null,
        "rg": null,
        "cpf": null
      },
      "autorizacao": {
        "uso_imagem": true,
        "beneficiarios": [],
        "servico": "SASF Chico Mendes",
        "finalidade_comercial": false,
        "midias": [
          "home page",
          "cartazes",
          "divulgacao_geral"
        ]
      },
      "local": "São Paulo",
      "data": null,
      "assinatura": null
    }
  },
  "plano_desenvolvimento_familiar_pdf": {
    "pagina_5": {
      "nome_servico_sasf": null,
      "cas": null,
      "cras": null,
      "fl": "1/2",
      "representante_familia": null,
      "numero_matricula": null,
      "numero_nis_nit_pis": null,
      "numero_do_prontuario": null,
      "analise_parecer_tecnico": null,
      "objetivo": null
    },
    "pagina_6": {
      "estrategias_intervencao": [],
      "local": null,
      "data_elaboracao_plano": null,
      "data_revisao_plano": null,
      "data_prevista_reavaliacao": null,
      "data_desligamento": null,
      "tecnico_referencia_atendimento": null,
      "assinatura_responsavel_familia": null
    }
  },
  "folha_prosseguimento": {
    "pagina_7": {
      "numero": null,
      "nome_representante_familia": null,
      "numero_matricula": null,
      "nis_nit_pis_pasep": null,
      "demanda_apresentada_orientacao_encaminhamentos": null
    },
    "pagina_8": {
      "verso": true,
      "demanda_apresentada_orientacao_encaminhamentos": null
    }
  },
  "ficha_visita_domiciliar": {
    "pagina_9": {
      "nome_servico_sasf": null,
      "cras": null,
      "nome_tecnico_realizou_visita": null,
      "data": null,
      "nome": null,
      "nis_nit_pis_pasep": null,
      "fl": "1/2",
      "endereco": null,
      "objetivos_visita": null,
      "observacao_familia_nao_encontrada": null,
      "demandas_apresentadas_orientacoes_encaminhamentos": null
    },
    "pagina_10": {
      "fl": "2/2",
      "demandas_apresentadas_orientacoes_encaminhamentos": null
    }
  },
  "plano_desenvolvimento_usuario_pdu": {
    "pagina_11": {
      "nome_servico_sasf": null,
      "cas": null,
      "cras": null,
      "fl": "1/2",
      "nome_representante_familia": null,
      "sexo": null,
      "data_nascimento": null,
      "idade": null,
      "nome_do_usuario": null,
      "nis_nit_pis_pasep": null,
      "nome_do_responsavel_usuario": null,
      "nome_da_tecnica_referencia": null,
      "nome_da_unidade_referenciada": null,
      "sintese_situacao_apresentada": null,
      "situacao_registro_deficiencia": null,
      "diagnostico_medico": null,
      "acoes_propostas_protecao_social": [],
      "acoes_propostas_socializacao": [],
      "acoes_intersetoriais": []
    },
    "pagina_12": {
      "fl": "2/2",
      "sintese_do_plano_desenvolvimento_usuario": {
        "situacao_registro_deficiencia": null,
        "acoes_concretas": {
          "cras": null,
          "cas": null,
          "saude": null,
          "educacao": null,
          "esporte": null,
          "outros": null
        },
        "prazo": null,
        "resultado_esperado": null
      },
      "local": null,
      "data_elaboracao_plano": null,
      "data_revisao_plano": null,
      "data_prevista_reavaliacao": null,
      "data_desligamento": null,
      "tecnico_referencia_atendimento": null,
      "assinatura_responsavel_pelo_usuario": null
    }
  }
}
```

```java
package br.insper.sasf.Familia.DTOs;

import br.insper.sasf.Familia.ENUMS.Prioridade;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FamiliaResponseDTO {

    private UUID id;
    private UUID representanteId;
    private List<UUID> membrosIds;
    private UUID prontuarioId;
    private Boolean ativo;
    private Prioridade prioridade;
    private LocalDate ultimaVisita;
    private LocalDate proximaVisita;
    private UUID orientadorId;
}
```

```java
package br.insper.sasf.Familia.DTOs;

import br.insper.sasf.Familia.ENUMS.Prioridade;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FamiliaSaveDTO {

    private UUID representanteId;
    private List<UUID> membrosIds;
    private UUID prontuarioId;
    private Boolean ativo;
    private Prioridade prioridade;
    private LocalDate ultimaVisita;
    private LocalDate proximaVisita;
    private UUID orientadorId;
}
```

```java
package br.insper.sasf.Familia.DTOs;

import br.insper.sasf.Familia.ENUMS.Prioridade;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FamiliaUpdateDTO {

    private UUID representanteId;
    private List<UUID> membrosIds;
    private UUID prontuarioId;
    private Boolean ativo;
    private Prioridade prioridade;
    private LocalDate ultimaVisita;
    private LocalDate proximaVisita;
    private UUID orientadorId;
}
```

```java
package br.insper.sasf.Familia.ENUMS;
public enum Prioridade {
    BAIXA,
    MEDIA,
    ALTA,
    ;
}

```

```java
package br.insper.sasf.Familia;

import br.insper.sasf.Familia.ENUMS.Prioridade;
import br.insper.sasf.FichaCadastralDaFamilia.FichaCadastralDaFamilia;
import br.insper.sasf.FolhaDeProsseguimento.FolhaDeProsseguimento;
import br.insper.sasf.MembroComposicaoFamiliar.MembroComposicaoFamiliar;
import br.insper.sasf.Orientador.Orientador;
import br.insper.sasf.Prontuario.Prontuario;
import br.insper.sasf.Representante.Representante;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "familia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Familia {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_representante")
    private Representante representante;

    @OneToMany(mappedBy = "familia")
    private List<MembroComposicaoFamiliar> membros;

    @OneToOne(mappedBy = "familia", cascade = CascadeType.ALL)
    private Prontuario prontuario;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Enumerated(EnumType.STRING)
    private Prioridade prioridade;

    private LocalDate ultimaVisita;
    private LocalDate proximaVisita;

    @ManyToOne
    @JoinColumn(name = "id_orientador")
    private Orientador orientador;
}
```

```java
package br.insper.sasf.Familia;

import br.insper.sasf.Familia.DTOs.FamiliaResponseDTO;
import br.insper.sasf.Familia.DTOs.FamiliaSaveDTO;
import br.insper.sasf.Familia.DTOs.FamiliaUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/familia")
@RequiredArgsConstructor
public class FamiliaController {

    private final FamiliaService familiaService;

    @PostMapping
    public ResponseEntity<FamiliaResponseDTO> criar(@Valid @RequestBody FamiliaSaveDTO dto) {
        return ResponseEntity.ok(familiaService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FamiliaResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(familiaService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<FamiliaResponseDTO>> listar() {
        return ResponseEntity.ok(familiaService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FamiliaResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody FamiliaUpdateDTO dto) {
        return ResponseEntity.ok(familiaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        familiaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.Representante.DTOs;

import br.insper.sasf.Representante.ENUMS.EstadoCivil;
import br.insper.sasf.Representante.ENUMS.Ocupacao;
import br.insper.sasf.Representante.ENUMS.Sexo;
import br.insper.sasf.enums.CorRaca;
import br.insper.sasf.enums.GrauInstrucao;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RepresentanteResponseDTO {

    private UUID id;
    private String nome;
    private LocalDate dataNascimento;
    private Sexo sexo;
    private String nisNitNb;
    private String naturalidade;
    private CorRaca corRaca;
    private Boolean possuiDeficiencia;
    private String cpf;
    private String rg;
    private LocalDate dataEmissaoRg;
    private String orgaoEmissorRg;
    private String ufRg;
    private String ctpsNumero;
    private String ctpsSerie;
    private String nomeMae;
    private String nomePai;
    private EstadoCivil estadoCivil;
    private GrauInstrucao grauInstrucao;
    private String profissao;
    private Ocupacao ocupacao;
    private Double renda;
    private UUID enderecoId;
    private String telefoneResidencial;
    private String telefoneCelular;
    private String telefone;
}
```

```java
package br.insper.sasf.Representante.DTOs;

import br.insper.sasf.Representante.ENUMS.EstadoCivil;
import br.insper.sasf.Representante.ENUMS.Ocupacao;
import br.insper.sasf.Representante.ENUMS.Sexo;
import br.insper.sasf.enums.CorRaca;
import br.insper.sasf.enums.GrauInstrucao;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RepresentanteSaveDTO {

    private String nome;
    private LocalDate dataNascimento;
    private Sexo sexo;
    private String nisNitNb;
    private String naturalidade;
    private CorRaca corRaca;
    private Boolean possuiDeficiencia;
    private String cpf;
    private String rg;
    private LocalDate dataEmissaoRg;
    private String orgaoEmissorRg;
    private String ufRg;
    private String ctpsNumero;
    private String ctpsSerie;
    private String nomeMae;
    private String nomePai;
    private EstadoCivil estadoCivil;
    private GrauInstrucao grauInstrucao;
    private String profissao;
    private Ocupacao ocupacao;
    private Double renda;
    private UUID enderecoId;
    private String telefoneResidencial;
    private String telefoneCelular;
    private String telefone;
}
```

```java
package br.insper.sasf.Representante.DTOs;

import br.insper.sasf.Representante.ENUMS.EstadoCivil;
import br.insper.sasf.Representante.ENUMS.Ocupacao;
import br.insper.sasf.Representante.ENUMS.Sexo;
import br.insper.sasf.enums.CorRaca;
import br.insper.sasf.enums.GrauInstrucao;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RepresentanteUpdateDTO {

    private String nome;
    private LocalDate dataNascimento;
    private Sexo sexo;
    private String nisNitNb;
    private String naturalidade;
    private CorRaca corRaca;
    private Boolean possuiDeficiencia;
    private String cpf;
    private String rg;
    private LocalDate dataEmissaoRg;
    private String orgaoEmissorRg;
    private String ufRg;
    private String ctpsNumero;
    private String ctpsSerie;
    private String nomeMae;
    private String nomePai;
    private EstadoCivil estadoCivil;
    private GrauInstrucao grauInstrucao;
    private String profissao;
    private Ocupacao ocupacao;
    private Double renda;
    private UUID enderecoId;
    private String telefoneResidencial;
    private String telefoneCelular;
    private String telefone;
}
```


```java
package br.insper.sasf.Representante.ENUMS;
public enum EstadoCivil {
    SOLTEIRO,
    CASADO,
    SEPARADO,
    DIVORCIADO,
    VIUVO,
    ;
}

```


```java
package br.insper.sasf.Representante.ENUMS;
public enum Ocupacao {
    EMPREGADO,
    DESEMPREGADO,
    APOSENTADO,
    PENSIONISTA,
    OUTRO,
    ;
}

```


```java
package br.insper.sasf.Representante.ENUMS;
public enum Sexo {
    FEMININO,
    MASCULINO,
    OUTRO,
    ;
}

```

```java
package br.insper.sasf.Representante;

import br.insper.sasf.Endereco.Endereco;
import br.insper.sasf.Representante.ENUMS.EstadoCivil;
import br.insper.sasf.Representante.ENUMS.Ocupacao;
import br.insper.sasf.Representante.ENUMS.Sexo;
import br.insper.sasf.enums.CorRaca;
import br.insper.sasf.enums.GrauInstrucao;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "representante")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Representante {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    private String nome;
    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    private String nisNitNb;
    private String naturalidade;

    @Enumerated(EnumType.STRING)
    private CorRaca corRaca;

    private Boolean possuiDeficiencia;
    private String cpf;
    private String rg;
    private LocalDate dataEmissaoRg;
    private String orgaoEmissorRg;
    private String ufRg;
    private String ctpsNumero;
    private String ctpsSerie;
    private String nomeMae;
    private String nomePai;

    @Enumerated(EnumType.STRING)
    private EstadoCivil estadoCivil;

    @Enumerated(EnumType.STRING)
    private GrauInstrucao grauInstrucao;

    private String profissao;

    @Enumerated(EnumType.STRING)
    private Ocupacao ocupacao;

    private Double renda;

    @ManyToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    private String telefoneResidencial;
    private String telefoneCelular;
    private String telefone;
}
```

```java
package br.insper.sasf.Representante;

import br.insper.sasf.Representante.DTOs.RepresentanteResponseDTO;
import br.insper.sasf.Representante.DTOs.RepresentanteSaveDTO;
import br.insper.sasf.Representante.DTOs.RepresentanteUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/representante")
@RequiredArgsConstructor
public class RepresentanteController {

    private RepresentanteService representanteService;

    @PostMapping
    public ResponseEntity<RepresentanteResponseDTO> criar(@Valid @RequestBody RepresentanteSaveDTO dto) {
        return ResponseEntity.ok(representanteService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RepresentanteResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(representanteService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<RepresentanteResponseDTO>> listar() {
        return ResponseEntity.ok(representanteService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RepresentanteResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody RepresentanteUpdateDTO dto) {
        return ResponseEntity.ok(representanteService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        representanteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.Endereco;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "endereco")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; 
    
    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    private String logradouro;
    private String numero;
    private String complemento;
    private String bairro;
    private String cep;
    private String distrito;
    private String pontoReferencia;
}
```

```java
package br.insper.sasf.DadosSasf;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "dados_sasf")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DadosSasf {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    private String nomeServicoSasf;
    private String cas;
    private String cras;
}
```

```java
package br.insper.sasf.FichaCadastralDaFamilia;

import br.insper.sasf.FichaCadastralDaFamilia.DTOs.FichaCadastralDaFamiliaResponseDTO;
import br.insper.sasf.FichaCadastralDaFamilia.DTOs.FichaCadastralDaFamiliaSaveDTO;
import br.insper.sasf.FichaCadastralDaFamilia.DTOs.FichaCadastralDaFamiliaUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/fichacadastral")
@RequiredArgsConstructor
public class FichaCadastralDaFamiliaController {

    private final FichaCadastralDaFamiliaService fichaCadastralDaFamiliaService;

    @PostMapping
    public ResponseEntity<FichaCadastralDaFamiliaResponseDTO> criar(@Valid @RequestBody FichaCadastralDaFamiliaSaveDTO dto) {
        return ResponseEntity.ok(fichaCadastralDaFamiliaService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FichaCadastralDaFamiliaResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(fichaCadastralDaFamiliaService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<FichaCadastralDaFamiliaResponseDTO>> listar() {
        return ResponseEntity.ok(fichaCadastralDaFamiliaService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FichaCadastralDaFamiliaResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody FichaCadastralDaFamiliaUpdateDTO dto) {
        return ResponseEntity.ok(fichaCadastralDaFamiliaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        fichaCadastralDaFamiliaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.FichaCadastralDaFamilia.DTOs;

import br.insper.sasf.FichaCadastralDaFamilia.ENUMS.CondicoesMoradia;
import br.insper.sasf.FichaCadastralDaFamilia.ENUMS.TipoConstrucao;
import br.insper.sasf.enums.BeneficioPrestacaoContinuada;
import br.insper.sasf.enums.ProgramaTransferenciaRenda;
import br.insper.sasf.enums.SituacaoHabitacional;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FichaCadastralDaFamiliaResponseDTO {

    private UUID id;
    private LocalDate dataMatricula;
    private String numeroMatricula;
    private LocalDate dataDesligamento;
    private UUID representanteId;
    private CondicoesMoradia condicoesMoradia;
    private Double valorAluguelOuFinanciamento;
    private TipoConstrucao tipoConstrucao;
    private SituacaoHabitacional situacaoHabitacional;
    private String outraSituacaoHabitacional;
    private Integer numeroComodos;
    private Integer qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada;
    private Integer qtdMulheresGestantesNaFamilia;
    private Integer qtdGestantesComPreNatal;
    private List<ProgramaTransferenciaRenda> programasTransferenciaRenda;
    private String outroProgramaTransferenciaRenda;
    private List<BeneficioPrestacaoContinuada> beneficioPrestacaoContinuada;
    private List<UUID> composicaoFamiliarIds;
    private List<UUID> informacoesComplementaresCriancasAdolescentesIds;
    private String demandaApresentadaOrientacoesEncaminhamentos;
    private UUID tecnicoReferenciaId;
    private LocalDate dataAtendimento;
    private String observacoes;
    private UUID prontuarioId;
}
```

```java
package br.insper.sasf.FichaCadastralDaFamilia.DTOs;

import br.insper.sasf.FichaCadastralDaFamilia.ENUMS.CondicoesMoradia;
import br.insper.sasf.FichaCadastralDaFamilia.ENUMS.TipoConstrucao;
import br.insper.sasf.enums.BeneficioPrestacaoContinuada;
import br.insper.sasf.enums.ProgramaTransferenciaRenda;
import br.insper.sasf.enums.SituacaoHabitacional;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FichaCadastralDaFamiliaSaveDTO {

    private LocalDate dataMatricula;
    private String numeroMatricula;
    private LocalDate dataDesligamento;
    private UUID representanteId;
    private CondicoesMoradia condicoesMoradia;
    private Double valorAluguelOuFinanciamento;
    private TipoConstrucao tipoConstrucao;
    private SituacaoHabitacional situacaoHabitacional;
    private String outraSituacaoHabitacional;
    private Integer numeroComodos;
    private Integer qtdCriancasAte7AnosComCarteiraVacinacaoAtualizada;
    private Integer qtdMulheresGestantesNaFamilia;
    private Integer qtdGestantesComPreNatal;
    private List<ProgramaTransferenciaRenda> programasTransferenciaRenda;
    private String outroProgramaTransferenciaRenda;
    private List<BeneficioPrestacaoContinuada> beneficioPrestacaoContinuada;
    private List<UUID> composicaoFamiliarIds;
    private List<UUID> informacoesComplementaresCriancasAdolescentesIds;
    private String demandaApresentadaOrientacoesEncaminhamentos;
    private UUID tecnicoReferenciaId;
    private LocalDate dataAtendimento;
    private String observacoes;
    private UUID prontuarioId;
}
```

```java
package br.insper.sasf.FichaDeAtualizacaoQuadroSituacional.DTOs;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FichaDeAtualizacaoQuadroSituacionalResponseDTO {

    private UUID id;
    private UUID representanteId;
    private LocalDateTime dataAtualizacao;
    private UUID tecnicoResponsavelId;
    private String observacoes;
    private List<UUID> informacoesComplementaresCriancasAdolescentesIds;
    private UUID prontuarioId;
    private Boolean pdf;
    private Boolean pdu;
    private UUID orientadorId;
    private UUID responsavelId;
}
```

```java
package br.insper.sasf.FichaDeAtualizacaoQuadroSituacional.DTOs;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FichaDeAtualizacaoQuadroSituacionalSaveDTO {

    private UUID representanteId;
    private LocalDateTime dataAtualizacao;
    private UUID tecnicoResponsavelId;
    private String observacoes;
    private List<UUID> informacoesComplementaresCriancasAdolescentesIds;
    private UUID prontuarioId;
    private Boolean pdf;
    private Boolean pdu;
    private UUID orientadorId;
    private UUID responsavelId;
}
```

```java
package br.insper.sasf.FichaDeAtualizacaoQuadroSituacional;

import br.insper.sasf.FichaDeAtualizacaoQuadroSituacional.DTOs.FichaDeAtualizacaoQuadroSituacionalResponseDTO;
import br.insper.sasf.FichaDeAtualizacaoQuadroSituacional.DTOs.FichaDeAtualizacaoQuadroSituacionalSaveDTO;
import br.insper.sasf.FichaDeAtualizacaoQuadroSituacional.DTOs.FichaDeAtualizacaoQuadroSituacionalUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/fichaattquadro")
@RequiredArgsConstructor
public class FichaDeAtualizacaoQuadroSituacionalController {

    private final FichaDeAtualizacaoQuadroSituacionalService fichaDeAtualizacaoQuadroSituacionalService;

    @PostMapping
    public ResponseEntity<FichaDeAtualizacaoQuadroSituacionalResponseDTO> criar(@Valid @RequestBody FichaDeAtualizacaoQuadroSituacionalSaveDTO dto) {
        return ResponseEntity.ok(fichaDeAtualizacaoQuadroSituacionalService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FichaDeAtualizacaoQuadroSituacionalResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(fichaDeAtualizacaoQuadroSituacionalService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<FichaDeAtualizacaoQuadroSituacionalResponseDTO>> listar() {
        return ResponseEntity.ok(fichaDeAtualizacaoQuadroSituacionalService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FichaDeAtualizacaoQuadroSituacionalResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody FichaDeAtualizacaoQuadroSituacionalUpdateDTO dto) {
        return ResponseEntity.ok(fichaDeAtualizacaoQuadroSituacionalService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        fichaDeAtualizacaoQuadroSituacionalService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.FichaVisitaDomiciliar;

import br.insper.sasf.FichaVisitaDomiciliar.DTOs.FichaVisitaDomiciliarResponseDTO;
import br.insper.sasf.FichaVisitaDomiciliar.DTOs.FichaVisitaDomiciliarSaveDTO;
import br.insper.sasf.FichaVisitaDomiciliar.DTOs.FichaVisitaDomiciliarUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/fichavisita")
@RequiredArgsConstructor
public class FichaVisitaDomiciliarController {

    private final FichaVisitaDomiciliarService fichaVisitaDomiciliarService;

    @PostMapping
    public ResponseEntity<FichaVisitaDomiciliarResponseDTO> criar(@Valid @RequestBody FichaVisitaDomiciliarSaveDTO dto) {
        return ResponseEntity.ok(fichaVisitaDomiciliarService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FichaVisitaDomiciliarResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(fichaVisitaDomiciliarService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<FichaVisitaDomiciliarResponseDTO>> listar() {
        return ResponseEntity.ok(fichaVisitaDomiciliarService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FichaVisitaDomiciliarResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody FichaVisitaDomiciliarUpdateDTO dto) {
        return ResponseEntity.ok(fichaVisitaDomiciliarService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        fichaVisitaDomiciliarService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

```

```java
package br.insper.sasf.FichaVisitaDomiciliar.DTOs;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FichaVisitaDomiciliarResponseDTO {

    private UUID id;
    private UUID prontuarioId;
    private UUID orientadorResponsavelId;
    private LocalDateTime dataVisita;
    private UUID representanteVisitadoId;
    private String objetivoDaVisita;
    private String pessoasFamiliaQueConversaram;
    private String demandasOrientacoesEncaminhamentos;
}

```

```java
package br.insper.sasf.FichaVisitaDomiciliar.DTOs;

import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FichaVisitaDomiciliarSaveDTO {

    private UUID prontuarioId;
    private UUID orientadorResponsavelId;
    private LocalDateTime dataVisita;
    private UUID representanteVisitadoId;
    private String objetivoDaVisita;
    private String pessoasFamiliaQueConversaram;
    private String demandasOrientacoesEncaminhamentos;
}

```

```java
package br.insper.sasf.FichaVisitaDomiciliar;

import br.insper.sasf.FichaVisitaDomiciliar.DTOs.FichaVisitaDomiciliarResponseDTO;
import br.insper.sasf.FichaVisitaDomiciliar.DTOs.FichaVisitaDomiciliarSaveDTO;
import br.insper.sasf.FichaVisitaDomiciliar.DTOs.FichaVisitaDomiciliarUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/fichavisita")
@RequiredArgsConstructor
public class FichaVisitaDomiciliarController {

    private final FichaVisitaDomiciliarService fichaVisitaDomiciliarService;

    @PostMapping
    public ResponseEntity<FichaVisitaDomiciliarResponseDTO> criar(@Valid @RequestBody FichaVisitaDomiciliarSaveDTO dto) {
        return ResponseEntity.ok(fichaVisitaDomiciliarService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FichaVisitaDomiciliarResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(fichaVisitaDomiciliarService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<FichaVisitaDomiciliarResponseDTO>> listar() {
        return ResponseEntity.ok(fichaVisitaDomiciliarService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FichaVisitaDomiciliarResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody FichaVisitaDomiciliarUpdateDTO dto) {
        return ResponseEntity.ok(fichaVisitaDomiciliarService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        fichaVisitaDomiciliarService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

```

```java
package br.insper.sasf.FolhaDeProsseguimento.DTOs;

import lombok.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FolhaDeProsseguimentoResponseDTO {

    private UUID id;
    private Integer numeroFolha;
    private UUID prontuarioId;
    private List<UUID> registrosIds;
    private String observacoes;
    private String assinaturaTecnico;
    private String assinaturaOrientador;
}
```

```java
package br.insper.sasf.FolhaDeProsseguimento.DTOs;

import lombok.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FolhaDeProsseguimentoSaveDTO {

    private Integer numeroFolha;
    private UUID prontuarioId;
    private List<UUID> registrosIds;
    private String observacoes;
    private String assinaturaTecnico;
    private String assinaturaOrientador;
}
```

```java
package br.insper.sasf.FolhaDeProsseguimento;

import br.insper.sasf.FolhaDeProsseguimento.DTOs.FolhaDeProsseguimentoResponseDTO;
import br.insper.sasf.FolhaDeProsseguimento.DTOs.FolhaDeProsseguimentoSaveDTO;
import br.insper.sasf.FolhaDeProsseguimento.DTOs.FolhaDeProsseguimentoUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/folhaprosseguimento")
@RequiredArgsConstructor
public class FolhaDeProsseguimentoController {

    private final FolhaDeProsseguimentoService folhaDeProsseguimentoService;

    @PostMapping
    public ResponseEntity<FolhaDeProsseguimentoResponseDTO> criar(@Valid @RequestBody FolhaDeProsseguimentoSaveDTO dto) {
        return ResponseEntity.ok(folhaDeProsseguimentoService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FolhaDeProsseguimentoResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(folhaDeProsseguimentoService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<FolhaDeProsseguimentoResponseDTO>> listar() {
        return ResponseEntity.ok(folhaDeProsseguimentoService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FolhaDeProsseguimentoResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody FolhaDeProsseguimentoUpdateDTO dto) {
        return ResponseEntity.ok(folhaDeProsseguimentoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        folhaDeProsseguimentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.ItemPdf.DTOs;

import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemPdfResponseDTO {

    private UUID id;
    private String acoesCras;
    private String acoesFamilia;
    private String estrategiaIntervencao;
    private LocalDate prazo;
    private String resultadoEsperado;
    private String observacoes;
}
```

```java
package br.insper.sasf.ItemPdf.DTOs;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemPdfSaveDTO {

    private String acoesCras;
    private String acoesFamilia;
    private String estrategiaIntervencao;
    private LocalDate prazo;
    private String resultadoEsperado;
    private String observacoes;
}
```

```java
package br.insper.sasf.ItemPdf;

import br.insper.sasf.ItemPdf.DTOs.ItemPdfResponseDTO;
import br.insper.sasf.ItemPdf.DTOs.ItemPdfSaveDTO;
import br.insper.sasf.ItemPdf.DTOs.ItemPdfUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/itempdf")
@RequiredArgsConstructor
public class ItemPdfController {

    private ItemPdfService itemPdfService;

    @PostMapping
    public ResponseEntity<ItemPdfResponseDTO> criar(@Valid @RequestBody ItemPdfSaveDTO dto) {
        return ResponseEntity.ok(itemPdfService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemPdfResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(itemPdfService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<ItemPdfResponseDTO>> listar() {
        return ResponseEntity.ok(itemPdfService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemPdfResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody ItemPdfUpdateDTO dto) {
        return ResponseEntity.ok(itemPdfService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        itemPdfService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.MembroComposicaoFamiliar.DTOs;

import br.insper.sasf.enums.FatorRiscoSocial;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MembroComposicaoFamiliarResponseDTO {

    private UUID id;
    private Integer numeroOrdem;
    private String nome;
    private String nomeSocial;
    private LocalDate dataNascimento;
    private String parentescoOuVinculo;
    private String profissao;
    private String ocupacao;
    private Double renda;
    private List<FatorRiscoSocial> fatoresRiscoSocial;
    private UUID familiaId;
}
```

```java
package br.insper.sasf.MembroComposicaoFamiliar.DTOs;

import br.insper.sasf.enums.FatorRiscoSocial;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MembroComposicaoFamiliarSaveDTO {

    private Integer numeroOrdem;
    private String nome;
    private String nomeSocial;
    private LocalDate dataNascimento;
    private String parentescoOuVinculo;
    private String profissao;
    private String ocupacao;
    private Double renda;
    private List<FatorRiscoSocial> fatoresRiscoSocial;
    private UUID familiaId;
}
```

```java
package br.insper.sasf.MembroComposicaoFamiliar;

import br.insper.sasf.MembroComposicaoFamiliar.DTOs.MembroComposicaoFamiliarResponseDTO;
import br.insper.sasf.MembroComposicaoFamiliar.DTOs.MembroComposicaoFamiliarSaveDTO;
import br.insper.sasf.MembroComposicaoFamiliar.DTOs.MembroComposicaoFamiliarUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/membro")
@RequiredArgsConstructor
public class MembroComposicaoFamiliarController {

    private final MembroComposicaoFamiliarService membroComposicaoFamiliarService;

    @PostMapping
    public ResponseEntity<MembroComposicaoFamiliarResponseDTO> criar(@Valid @RequestBody MembroComposicaoFamiliarSaveDTO dto) {
        return ResponseEntity.ok(membroComposicaoFamiliarService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembroComposicaoFamiliarResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(membroComposicaoFamiliarService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<MembroComposicaoFamiliarResponseDTO>> listar() {
        return ResponseEntity.ok(membroComposicaoFamiliarService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<MembroComposicaoFamiliarResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody MembroComposicaoFamiliarUpdateDTO dto) {
        return ResponseEntity.ok(membroComposicaoFamiliarService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        membroComposicaoFamiliarService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.PlanoDesenvolvimentoDoUsuario.DTOs;

import br.insper.sasf.enums.SituacaoAgravoPdu;
import br.insper.sasf.enums.TipoBeneficiarioPdu;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanoDesenvolvimentoDoUsuarioResponseDTO {

    private UUID id;
    private UUID beneficiarioId;
    private TipoBeneficiarioPdu tipoBeneficiario;
    private UUID representanteId;
    private UUID familiaId;
    private UUID cuidadorId;
    private UUID tecnicoAcompanhamentoId;
    private String sinteseSituacaoApresentada;
    private List<SituacaoAgravoPdu> situacoesAgravoIdentificadas;
    private String outrasSituacoesAgravo;
    private List<UUID> acoesPrevencaoRiscoOuGarantiaAcessoIds;
    private List<UUID> acoesPactuadasIds;
    private List<UUID> acoesIntersetoriaisSocioassistenciaisIds;
    private String numeroPlano;
    private LocalDate dataElaboracao;
    private LocalDate dataValidade;
    private LocalDate dataReavaliacao;
    private List<UUID> sintesesPorAreaIds;
    private Boolean assinaturaResponsavelFamilia;
    private UUID tecnicoReferenciaId;
    private String observacoes;
}
```

```java
package br.insper.sasf.PlanoDesenvolvimentoDoUsuario.DTOs;

import br.insper.sasf.enums.SituacaoAgravoPdu;
import br.insper.sasf.enums.TipoBeneficiarioPdu;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanoDesenvolvimentoDoUsuarioSaveDTO {

    private UUID beneficiarioId;
    private TipoBeneficiarioPdu tipoBeneficiario;
    private UUID representanteId;
    private UUID familiaId;
    private UUID cuidadorId;
    private UUID tecnicoAcompanhamentoId;
    private String sinteseSituacaoApresentada;
    private List<SituacaoAgravoPdu> situacoesAgravoIdentificadas;
    private String outrasSituacoesAgravo;
    private List<UUID> acoesPrevencaoRiscoOuGarantiaAcessoIds;
    private List<UUID> acoesPactuadasIds;
    private List<UUID> acoesIntersetoriaisSocioassistenciaisIds;
    private String numeroPlano;
    private LocalDate dataElaboracao;
    private LocalDate dataValidade;
    private LocalDate dataReavaliacao;
    private List<UUID> sintesesPorAreaIds;
    private Boolean assinaturaResponsavelFamilia;
    private UUID tecnicoReferenciaId;
    private String observacoes;
}
```

```java
package br.insper.sasf.PlanoDesenvolvimentoDoUsuario;

import br.insper.sasf.PlanoDesenvolvimentoDoUsuario.DTOs.PlanoDesenvolvimentoDoUsuarioResponseDTO;
import br.insper.sasf.PlanoDesenvolvimentoDoUsuario.DTOs.PlanoDesenvolvimentoDoUsuarioSaveDTO;
import br.insper.sasf.PlanoDesenvolvimentoDoUsuario.DTOs.PlanoDesenvolvimentoDoUsuarioUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pdu")
@RequiredArgsConstructor
public class PlanoDesenvolvimentoDoUsuarioController {

    private final PlanoDesenvolvimentoDoUsuarioService planoDesenvolvimentoDoUsuarioService;

    @PostMapping
    public ResponseEntity<PlanoDesenvolvimentoDoUsuarioResponseDTO> criar(@Valid @RequestBody PlanoDesenvolvimentoDoUsuarioSaveDTO dto) {
        return ResponseEntity.ok(planoDesenvolvimentoDoUsuarioService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanoDesenvolvimentoDoUsuarioResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(planoDesenvolvimentoDoUsuarioService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<PlanoDesenvolvimentoDoUsuarioResponseDTO>> listar() {
        return ResponseEntity.ok(planoDesenvolvimentoDoUsuarioService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanoDesenvolvimentoDoUsuarioResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody PlanoDesenvolvimentoDoUsuarioUpdateDTO dto) {
        return ResponseEntity.ok(planoDesenvolvimentoDoUsuarioService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        planoDesenvolvimentoDoUsuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.PlanoDesenvolvimentoFamiliar.DTOs;

import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanoDesenvolvimentoFamiliarResponseDTO {

    private UUID id;
    private UUID familiaId;
    private String analiseDiagnostica;
    private String composicaoFamiliar;
    private String moradia;
    private String saude;
    private String educacao;
    private String renda;
    private String observacoes;
    private String objetivo;
    private String numeroPlano;
    private LocalDate dataElaboracao;
    private LocalDate dataValidade;
    private LocalDate dataReavaliacao;
    private List<UUID> itensPlanoIds;
    private String assinaturaResponsavelFamilia;
    private UUID tecnicoReferenciaId;
}
```

```java
package br.insper.sasf.PlanoDesenvolvimentoFamiliar.DTOs;

import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanoDesenvolvimentoFamiliarSaveDTO {

    private UUID familiaId;
    private String analiseDiagnostica;
    private String composicaoFamiliar;
    private String moradia;
    private String saude;
    private String educacao;
    private String renda;
    private String observacoes;
    private String objetivo;
    private String numeroPlano;
    private LocalDate dataElaboracao;
    private LocalDate dataValidade;
    private LocalDate dataReavaliacao;
    private List<UUID> itensPlanoIds;
    private String assinaturaResponsavelFamilia;
    private UUID tecnicoReferenciaId;
}
```

```java
package br.insper.sasf.PlanoDesenvolvimentoFamiliar;

import br.insper.sasf.PlanoDesenvolvimentoFamiliar.DTOs.PlanoDesenvolvimentoFamiliarResponseDTO;
import br.insper.sasf.PlanoDesenvolvimentoFamiliar.DTOs.PlanoDesenvolvimentoFamiliarSaveDTO;
import br.insper.sasf.PlanoDesenvolvimentoFamiliar.DTOs.PlanoDesenvolvimentoFamiliarUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pdf")
@RequiredArgsConstructor
public class PlanoDesenvolvimentoFamiliarController {

    private PlanoDesenvolvimentoFamiliarService planoDesenvolvimentoFamiliarService;

    @PostMapping
    public ResponseEntity<PlanoDesenvolvimentoFamiliarResponseDTO> criar(@Valid @RequestBody PlanoDesenvolvimentoFamiliarSaveDTO dto) {
        return ResponseEntity.ok(planoDesenvolvimentoFamiliarService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanoDesenvolvimentoFamiliarResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(planoDesenvolvimentoFamiliarService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<PlanoDesenvolvimentoFamiliarResponseDTO>> listar() {
        return ResponseEntity.ok(planoDesenvolvimentoFamiliarService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanoDesenvolvimentoFamiliarResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody PlanoDesenvolvimentoFamiliarUpdateDTO dto) {
        return ResponseEntity.ok(planoDesenvolvimentoFamiliarService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        planoDesenvolvimentoFamiliarService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.Prontuario.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ProntuarioResponseDTO {

    private UUID id;

    private Boolean ativo;

    private LocalDateTime deletedAt;

    private UUID familiaId;

    private UUID fichaCadastralDaFamiliaId;

    private List<UUID> fichasAtualizacaoQuadroSituacionalIds;

    private List<UUID> planosDesenvolvimentoFamiliarIds;

    private List<UUID> folhasProsseguimentoIds;

    private List<UUID> planosDesenvolvimentoUsuarioIds;
}
```

```java
package br.insper.sasf.Prontuario.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ProntuarioSaveDTO {

    private UUID familiaId;

    private UUID fichaCadastralDaFamiliaId;

    private List<UUID> fichasAtualizacaoQuadroSituacionalIds;

    private List<UUID> planosDesenvolvimentoFamiliarIds;

    private List<UUID> folhasProsseguimentoIds;

    private List<UUID> planosDesenvolvimentoUsuarioIds;
}
```

```java
package br.insper.sasf.Prontuario;

import br.insper.sasf.Prontuario.DTOs.ProntuarioResponseDTO;
import br.insper.sasf.Prontuario.DTOs.ProntuarioSaveDTO;
import br.insper.sasf.Prontuario.DTOs.ProntuarioUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/prontuario")
@RequiredArgsConstructor
public class ProntuarioController {

    private final ProntuarioService prontuarioService;

    @PostMapping
    public ResponseEntity<ProntuarioResponseDTO> criar(@Valid @RequestBody ProntuarioSaveDTO dto) {
        return ResponseEntity.ok(prontuarioService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProntuarioResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(prontuarioService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<ProntuarioResponseDTO>> listar() {
        return ResponseEntity.ok(prontuarioService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProntuarioResponseDTO> atualizar(
            @PathVariable UUID id,
            @Valid @RequestBody ProntuarioUpdateDTO dto
    ) {
        return ResponseEntity.ok(prontuarioService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        prontuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.RegistroProsseguimento.DTOs;

import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistroProsseguimentoResponseDTO {

    private UUID id;
    private LocalDate dataRegistro;
    private String demanda;
    private UUID tecnicoResponsavelId;
}
```

```java
package br.insper.sasf.RegistroProsseguimento.DTOs;

import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistroProsseguimentoSaveDTO {

    private LocalDate dataRegistro;
    private String demanda;
    private UUID tecnicoResponsavelId;
}
```

```java
package br.insper.sasf.RegistroProsseguimento;

import br.insper.sasf.RegistroProsseguimento.DTOs.RegistroProsseguimentoResponseDTO;
import br.insper.sasf.RegistroProsseguimento.DTOs.RegistroProsseguimentoSaveDTO;
import br.insper.sasf.RegistroProsseguimento.DTOs.RegistroProsseguimentoUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/registroprosseguimento")
@RequiredArgsConstructor
public class RegistroProsseguimentoController {

    private RegistroProsseguimentoService registroProsseguimentoService;

    @PostMapping
    public ResponseEntity<RegistroProsseguimentoResponseDTO> criar(@Valid @RequestBody RegistroProsseguimentoSaveDTO dto) {
        return ResponseEntity.ok(registroProsseguimentoService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroProsseguimentoResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(registroProsseguimentoService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<RegistroProsseguimentoResponseDTO>> listar() {
        return ResponseEntity.ok(registroProsseguimentoService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistroProsseguimentoResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody RegistroProsseguimentoUpdateDTO dto) {
        return ResponseEntity.ok(registroProsseguimentoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        registroProsseguimentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.SintesePduPorArea.DTOs;

import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SintesePduPorAreaResponseDTO {

    private UUID id;
    private String situacoesAgravoIdentificadas;
    private String acoesCRAS;
    private String acoesCREAS;
    private String acoesSaude;
    private String acoesEducacao;
    private String acoesTrabalho;
    private String acoesOutros;
    private LocalDate prazo;
    private String resultadosEsperados;
}
```

```java
package br.insper.sasf.SintesePduPorArea.DTOs;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SintesePduPorAreaSaveDTO {

    private String situacoesAgravoIdentificadas;
    private String acoesCRAS;
    private String acoesCREAS;
    private String acoesSaude;
    private String acoesEducacao;
    private String acoesTrabalho;
    private String acoesOutros;
    private LocalDate prazo;
    private String resultadosEsperados;
}
```

```java
package br.insper.sasf.SintesePduPorArea;

import br.insper.sasf.SintesePduPorArea.DTOs.SintesePduPorAreaResponseDTO;
import br.insper.sasf.SintesePduPorArea.DTOs.SintesePduPorAreaSaveDTO;
import br.insper.sasf.SintesePduPorArea.DTOs.SintesePduPorAreaUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/sintesepdu")
@RequiredArgsConstructor
public class SintesePduPorAreaController {

    private SintesePduPorAreaService sintesePduPorAreaService;

    @PostMapping
    public ResponseEntity<SintesePduPorAreaResponseDTO> criar(@Valid @RequestBody SintesePduPorAreaSaveDTO dto) {
        return ResponseEntity.ok(sintesePduPorAreaService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SintesePduPorAreaResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(sintesePduPorAreaService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<SintesePduPorAreaResponseDTO>> listar() {
        return ResponseEntity.ok(sintesePduPorAreaService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SintesePduPorAreaResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody SintesePduPorAreaUpdateDTO dto) {
        return ResponseEntity.ok(sintesePduPorAreaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        sintesePduPorAreaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
```

```java
package br.insper.sasf.TermoAutorizacaoDeUsoDeImagem.DTOs;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TermoAutorizacaoDeUsoDeImagemResponseDTO {

    private UUID id;
    private UUID prontuarioId;
    private UUID usuarioAutorizanteId;
    private String numeroCedulaIdentidade;
    private String cpf;
    private List<String> nomesCriancasAutorizadas;
    private LocalDateTime dataAssinatura;
}

```

```java
package br.insper.sasf.TermoAutorizacaoDeUsoDeImagem.DTOs;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TermoAutorizacaoDeUsoDeImagemSaveDTO {

    private UUID prontuarioId;
    private UUID usuarioAutorizanteId;
    private String numeroCedulaIdentidade;
    private String cpf;
    private List<String> nomesCriancasAutorizadas;
    private LocalDateTime dataAssinatura;
}

```


```java
package br.insper.sasf.TermoAutorizacaoDeUsoDeImagem;

import br.insper.sasf.TermoAutorizacaoDeUsoDeImagem.DTOs.TermoAutorizacaoDeUsoDeImagemResponseDTO;
import br.insper.sasf.TermoAutorizacaoDeUsoDeImagem.DTOs.TermoAutorizacaoDeUsoDeImagemSaveDTO;
import br.insper.sasf.TermoAutorizacaoDeUsoDeImagem.DTOs.TermoAutorizacaoDeUsoDeImagemUpdateDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/termo")
@RequiredArgsConstructor
public class TermoAutorizacaoDeUsoDeImagemController {

    private final TermoAutorizacaoDeUsoDeImagemService termoAutorizacaoDeUsoDeImagemService;

    @PostMapping
    public ResponseEntity<TermoAutorizacaoDeUsoDeImagemResponseDTO> criar(@Valid @RequestBody TermoAutorizacaoDeUsoDeImagemSaveDTO dto) {
        return ResponseEntity.ok(termoAutorizacaoDeUsoDeImagemService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TermoAutorizacaoDeUsoDeImagemResponseDTO> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(termoAutorizacaoDeUsoDeImagemService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<TermoAutorizacaoDeUsoDeImagemResponseDTO>> listar() {
        return ResponseEntity.ok(termoAutorizacaoDeUsoDeImagemService.listar());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TermoAutorizacaoDeUsoDeImagemResponseDTO> atualizar(@PathVariable UUID id, @Valid @RequestBody TermoAutorizacaoDeUsoDeImagemUpdateDTO dto) {
        return ResponseEntity.ok(termoAutorizacaoDeUsoDeImagemService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        termoAutorizacaoDeUsoDeImagemService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

```