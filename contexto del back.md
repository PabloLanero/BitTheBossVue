# Integracion Frontend <-> Backend (BitTheBoss)

Este documento sirve como contrato rapido para conectar tu frontend con este backend.

## Base URL y arranque

- API local: `http://localhost:5211`
- Swagger: `http://localhost:5211/swagger`
- Autenticacion: JWT Bearer
- CORS: abierto (`AllowAnyOrigin`), no deberias tener bloqueo por origen en local.

## Autenticacion (JWT)

1. Login o register devuelven:

```json
{ "token": "..." }
```

2. Guarda el token en frontend (ej. `localStorage`).
3. En llamadas protegidas envia header:

`Authorization: Bearer <token>`

## Endpoints publicos

### POST `/Login/login`
- Auth: No
- Body:

```json
{
  "email": "Jhon@gmail.com",
  "password": "asd"
}
```

- Respuesta 200:

```json
{ "token": "jwt_token" }
```

### POST `/Login/register`
- Auth: No
- Body:

```json
{
  "userName": "NuevoUsuario",
  "email": "nuevo@correo.com",
  "password": "123456"
}
```

- Respuesta 200:

```json
{ "token": "jwt_token" }
```

## Endpoints protegidos (requieren Bearer token)

## Usuario

- `GET /Usuario` -> `200` lista de usuarios
- `GET /Usuario/{id}` -> `200` usuario | `404`
- `POST /Usuario` -> crea usuario desde credenciales
- `POST /Usuario/fromcredentials` -> alternativa de creacion
- `PUT /Usuario/{id}` -> actualiza (recibe modelo `Usuario`, no `UserDTOIn`)
- `DELETE /Usuario/{id}` -> `204` o `404`

### Body `POST /Usuario`

```json
{
  "userName": "Player3",
  "email": "player3@gmail.com",
  "password": "pass789"
}
```

### Respuesta esperada `POST /Usuario`

```json
{
  "userId": 5,
  "userName": "Player3",
  "email": "player3@gmail.com",
  "role": "Usuario"
}
```

## Partida

- `GET /Partida`
- `GET /Partida/{id}` (`id` es string, ej. `partida-001`)
- `POST /Partida`
- `PUT /Partida/{id}`
- `DELETE /Partida/{id}`

### Body `POST/PUT /Partida`

```json
{
  "idPartida": "partida-003",
  "arrUsuario": [1, 2],
  "lstNodos": [1, 2, 3]
}
```

## Tier

- `GET /Tier`
- `GET /Tier/{id}`
- `POST /Tier`
- `PUT /Tier/{id}`
- `DELETE /Tier/{id}`

### Body `POST/PUT /Tier`

```json
{
  "titulo": "Platino",
  "visible": true
}
```

## Nodo

- `GET /Nodo`
- `GET /Nodo/{id}`
- `POST /Nodo`
- `PUT /Nodo/{id}`
- `DELETE /Nodo/{id}`

### Body `POST/PUT /Nodo`

```json
{
  "arrTropas": [1, 2],
  "idUsuario": 1
}
```

## Movimiento

- `GET /Movimiento`
- `GET /Movimiento/{id}`
- `POST /Movimiento`
- `DELETE /Movimiento/{id}`

### Body `POST /Movimiento`

```json
{
  "tropa": {
    "nombre": "Triangulo",
    "vida": 100,
    "damage": 50
  },
  "nodoDestinoId": 2
}
```

## Formato de errores del backend

Normalmente responde:

```json
{ "message": "texto del error" }
```

Codigos comunes:
- `400`: validacion o regla de negocio
- `401`: no autorizado / token invalido
- `404`: no encontrado
- `500`: error interno

## Tipos TypeScript recomendados para el front

```ts
export type LoginDtoIn = {
  email: string;
  password: string;
};

export type UserDtoIn = {
  userName: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type UserDtoOut = {
  userId?: number;
  userName?: string;
  email?: string;
  role?: string;
};

export type PartidaDtoIn = {
  idPartida: string;
  arrUsuario?: number[];
  lstNodos?: number[];
};

export type TierDtoIn = {
  titulo: string;
  visible?: boolean;
};

export type NodoDtoIn = {
  arrTropas?: number[];
  idUsuario: number;
};

export type TropaDtoIn = {
  nombre: string;
  vida?: number;
  damage?: number;
};

export type MovimientoDtoIn = {
  tropa: TropaDtoIn;
  nodoDestinoId: number;
};
```

## Cliente HTTP sugerido (Axios)

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5211",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

## Checklist minima en el frontend

1. Configurar `API_BASE_URL = http://localhost:5211`.
2. Crear modulo `auth` con `login` y `register`.
3. Guardar token al autenticar y adjuntarlo en cada request protegida.
4. Manejar `401` globalmente (logout o redireccion a login).
5. Implementar servicios: `usuarios`, `partidas`, `tiers`, `nodos`, `movimientos`.
6. Tipar requests/responses con interfaces TypeScript.

## Prompt listo para pegar en Cursor (en el proyecto frontend)

Usa este prompt directamente en la otra ventana de Cursor:

```text
Quiero conectar este frontend con mi backend de BitTheBoss.

Contexto backend:
- Base URL: http://localhost:5211
- Swagger: http://localhost:5211/swagger
- Auth JWT Bearer
- Login: POST /Login/login con body { email, password } => { token }
- Register: POST /Login/register con body { userName, email, password } => { token }
- Endpoints protegidos:
  - Usuarios: GET/GET{id}/POST/POST fromcredentials/PUT{id}/DELETE{id} en /Usuario
  - Partidas: GET/GET{id}/POST/PUT{id}/DELETE{id} en /Partida
  - Tiers: GET/GET{id}/POST/PUT{id}/DELETE{id} en /Tier
  - Nodos: GET/GET{id}/POST/PUT{id}/DELETE{id} en /Nodo
  - Movimientos: GET/GET{id}/POST/DELETE{id} en /Movimiento
- Error habitual: { message: "..." } con codigos 400/401/404/500

Necesito que:
1) Encuentres donde se define el cliente HTTP actual.
2) Crees o adaptes un cliente API centralizado con interceptor Bearer token.
3) Implementes modulo auth (login/register + guardar token).
4) Conectes las pantallas/acciones existentes a los endpoints reales.
5) Añadas manejo global de 401.
6) Tipar DTOs principales (login, user, partida, tier, nodo, movimiento).
7) Si hay mocks, reemplazarlos por llamadas reales.

Haz los cambios directamente en los archivos del front y luego dame resumen de archivos modificados y como probarlo.
```

## Notas importantes de contrato actual

- `Partida/{id}` usa `id` tipo string (ej. `partida-001`), no numerico.
- `PUT /Usuario/{id}` recibe entidad `Usuario` (no el DTO basico).
- `POST /Login/login` y `POST /Login/register` solo devuelven `token` (no perfil completo).
- En local, todo funciona por HTTP en `5211` si el backend esta levantado.

