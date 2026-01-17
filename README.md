# MEAN Stack Tech Store

Este proyecto consiste en una aplicación completa usando el Stack MEAN (MongoDB, Express, Angular, Node.js).

## Estructura

- `backend/`: API RESTful con Node.js, Express y MongoDB.
- `frontend/`: Aplicación Angular 17+ (Standalone Components).

## Requisitos Previos

1. **MongoDB**: Asegúrate de tener MongoDB ejecutándose en `mongodb://localhost:27017`.
2. **Node.js LTS**: Se recomienda usar versiones LTS (v18, v20) para evitar incompatibilidades con drivers de bases de datos.

## Instrucciones de Ejecución

### 1. Iniciar el Backend

Abre una terminal y ejecuta:

```bash
cd backend
npm install # Si no se ha instalado
node server.js
```

El servidor correrá en `http://localhost:3000`.

### 2. Iniciar el Frontend

Abre **otra** terminal y ejecuta:

```bash
cd frontend
npm install # Si no se ha instalado
npx ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

## Funcionalidades

- **Crear Producto**: Formulario para agregar productos a la base de datos.
- **Listar Productos**: Visualización en cuadrícula de los productos.
- **Eliminar Producto**: Opción para borrar productos.
