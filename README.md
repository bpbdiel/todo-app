# TODO App

Aplicación web desarrollada como prueba técnica para la gestión de actividades.

La aplicación permite crear, editar, eliminar y marcar actividades como completadas.

## Tecnologías utilizadas

### Frontend
- React
- Vite
- Material UI

### Backend
- Node.js
- Express

### Base de datos
- PostgreSQL

### Despliegue
- Docker
- Docker Compose

## Estructura del proyecto

```text
todo-app/
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── Dockerfile
│
├── database/
│   └── init.sql
│
├── docker-compose.yml
└── README.md
```

## Funcionalidades

- Crear actividades.
- Listar actividades.
- Editar actividades.
- Eliminar actividades.
- Marcar actividades como completadas o pendientes.
- Persistir los datos en PostgreSQL.

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- Docker
- Docker Compose

## Ejecutar el proyecto

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar a la carpeta:

```bash
cd todo-app
```

Levantar los contenedores:

```bash
docker compose up -d --build
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

La API estará disponible en:

```text
http://localhost:3000/api/actividades
```

## API REST

### Obtener todas las actividades

```http
GET /api/actividades
```

### Crear una actividad

```http
POST /api/actividades
```

Ejemplo:

```json
{
  "titulo": "Comprar una camara"
}
```

### Actualizar una actividad

```http
PUT /api/actividades/:id
```

Ejemplo:

```json
{
  "titulo": "Comprar una camara",
  "completada": true
}
```

### Eliminar una actividad

```http
DELETE /api/actividades/:id
```

## Detener el proyecto

Para detener los contenedores:

```bash
docker compose down
```