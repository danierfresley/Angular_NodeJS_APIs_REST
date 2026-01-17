# Guía Maestra: Creación y Explicación Detallada (MEAN Stack)

Este documento es una guía exhaustiva que cubre los comandos de creación y, lo más importante, una **explicación línea por línea** del código fundamental para que entiendas exactamente qué hace cada parte de tu aplicación.

---

## PARTE 1: BACKEND (Node.js + Express + MongoDB)

### 1. Preparación y Comandos

**Paso 1: Crear e inicializar**
```bash
mkdir backend
cd backend
npm init -y  # Crea el package.json con valores por defecto
```

**Paso 2: Instalar librerías clave**
```bash
npm install express mongoose cors body-parser
```
*   `express`: El framework para crear el servidor web.
*   `mongoose`: Librería para interactuar con MongoDB de forma sencilla.
*   `cors`: Permite que tu Frontend (puerto 4200) hable con tu Backend (puerto 3000).
*   `body-parser`: Ayuda a leer los datos JSON que envía el frontend.

### 2. Explicación Detallada del Código (`server.js`)

A continuación, analizamos el archivo `server.js` que hace funcionar tu backend:

```javascript
/* 1 */ const express = require('express');
/* 2 */ const mongoose = require('mongoose');
/* 3 */ const cors = require('cors');
/* 4 */ const bodyParser = require('body-parser');
```
*   **Línea 1**: Importamos **Express**, que es el motor de nuestro servidor (maneja rutas, peticiones HTTP, etc.).
*   **Línea 2**: Importamos **Mongoose**, que sirve de "puente" para conectarnos y consultar la base de datos MongoDB.
*   **Línea 3**: Importamos **CORS**. Sin esto, el navegador bloquearía las peticiones de Angular al backend por seguridad.
*   **Línea 4**: Importamos **body-parser**. Aunque Express moderno ya lo trae integrado, muchas guías lo usan explícitamente para asegurar que el servidor entienda JSON.

```javascript
/* 6 */ const app = express();
/* 7 */ const PORT = 3000;
```
*   **Línea 6**: Inicializamos la aplicación. La variable `app` es ahora nuestro servidor, al cual le agregaremos configuraciones y rutas.
*   **Línea 7**: Definimos el **puerto** donde escuchará el servidor. El 3000 es el estándar para Node.js.

```javascript
/* 10 */ app.use(cors());
/* 11 */ app.use(bodyParser.json());
```
*   **Líneas 10-11 (Middleware)**: Son funciones que se ejecutan antes de llegar a las rutas.
    *   `app.use(cors())`: "Abre las puertas" del servidor a peticiones externas.
    *   `app.use(bodyParser.json())`: Transforma cualquier dato "body" que llegue en formato JSON a objetos JavaScript usables.

```javascript
/* 14 */ const mongoURI = 'mongodb://root:tu_contraseña_segura@127.0.0.1:27017/mean-tech-store?authSource=admin';
/* 16 */ mongoose.connect(mongoURI)
/* 17 */   .then(() => console.log('✅ Conectado a MongoDB (Container)'))
/* 18 */   .catch(err => console.error('❌ Error conectando a MongoDB:', err));
```
*   **Línea 14**: Define la dirección de tu base de datos. Incluye usuario (`root`), contraseña, host (`127.0.0.1`), puerto (`27017`) y el nombre de la base de datos (`mean-tech-store`).
*   **Línea 16**: Inicia la conexión real. Mongoose devuelve una "Promesa" (operación asíncrona).
*   **Línea 17**: `.then()` se ejecuta si la conexión es **exitosa**. Imprimimos un mensaje de éxito.
*   **Línea 18**: `.catch()` captura cualquier **error** (ej. base de datos apagada, contraseña incorrecta) y lo muestra en consola.

```javascript
/* 21 */ const productRoutes = require('./routes/products');
/* 22 */ app.use('/api/products', productRoutes);
```
*   **Línea 21**: Importamos un archivo externo de rutas. Esto es buena práctica para no tener todo el código en un solo archivo.
*   **Línea 22**: Definimos que **cualquier** petición que empiece con `/api/products` será manejada por ese archivo de rutas importado.

```javascript
/* 24 */ app.get('/', (req, res) => {
/* 25 */   res.send('API REST funcionando OK (MongoDB)');
/* 26 */ });
```
*   **Línea 24**: Define una ruta base (`/`). Si entras a `http://localhost:3000/` en el navegador...
*   **Línea 25**: ...el servidor responde (`res.send`) con un texto simple confirmando que funciona.

```javascript
/* 28 */ app.listen(PORT, () => {
/* 29 */   console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
/* 30 */ });
```
*   **Línea 28**: Enciende el servidor y se queda "escuchando" indefinidamente en el puerto 3000.

---

## PARTE 2: FRONTEND (Angular)

### 1. Preparación y Comandos

**Paso 1: Generar el proyecto**
```bash
ng new frontend --no-standalone --routing --style=css
# O si usas standalone (moderno):
ng new frontend
```

**Paso 2: Estructura de carpetas**
Dentro de `src/app/` tendrás tus componentes. Angular divide la lógica (`.ts`), la vista (`.html`) y el estilo (`.css`).

### 2. Explicación Detallada del Código (`app.ts`)

Analizamos el componente principal (`app.ts`), que es el "padre" de todos los demás componentes.

```typescript
/* 1 */ import { Component, ViewChild } from '@angular/core';
/* 2 */ import { CommonModule } from '@angular/common';
/* 3 */ import { ProductListComponent } from './components/product-list/product-list';
/* 4 */ import { ProductFormComponent } from './components/product-form/product-form';
```
*   **Línea 1**: Importamos herramientas del núcleo de Angular.
    *   `Component`: Necesario para definir que esta clase es un componente visual.
    *   `ViewChild`: Nos permite acceder a un componente "hijo" (como la lista de productos) desde este componente "padre".
*   **Línea 2**: `CommonModule` trae directivas básicas como `*ngIf` y `*ngFor`.
*   **Líneas 3-4**: Importamos nuestros propios componentes personalizados (Lista y Formulario) para usarlos aquí.

```typescript
/* 6 */ @Component({
/* 7 */   selector: 'app-root',
/* 8 */   standalone: true,
/* 9 */   imports: [CommonModule, ProductListComponent, ProductFormComponent],
/* 10 */  templateUrl: './app.html',
/* 11 */  styleUrl: './app.css'
/* 12 */ })
```
*   **Línea 6 (@Component)**: Este "Decorador" le dice a Angular cómo tratar a la clase `App`.
*   **Línea 7 (selector)**: Define la etiqueta HTML personalizada (`<app-root></app-root>`) donde se insertará esta app en el `index.html`.
*   **Línea 8 (standalone)**: `true` indica que este componente es independiente y no necesita un `app.module.ts`. Es la forma moderna de Angular.
*   **Línea 9 (imports)**: Aquí registramos qué otros componentes o módulos va a utilizar este componente. Sin esto, no podrías usar `<app-product-list>` en el HTML.
*   **Línea 10 y 11**: Enlazan el archivo de vista HTMl y el archivo de estilos CSS.

```typescript
/* 13 */ export class App {
/* 14 */   title = 'frontend';
/* 16 */   @ViewChild(ProductListComponent) productList!: ProductListComponent;
```
*   **Línea 13**: Define la clase lógica. `export` permite que otros archivos la usen.
*   **Línea 14**: Una propiedad simple de texto.
*   **Línea 16**: Aquí ocurre la **magia de comunicación**.
    *   `@ViewChild(ProductListComponent)`: Busca en el HTML (`app.html`) una etiqueta que corresponda a este componente.
    *   `productList!`: Es la variable donde guardaremos esa referencia. El `!` le dice a TypeScript "confía en mí, esto existirá, no será nulo".

```typescript
/* 18 */   onProductCreated() {
/* 19 */     this.productList.loadProducts();
/* 20 */   }
```
*   **Línea 18**: Es un método que creamos para reaccionar a eventos. Su nombre sugiere que se llamará "cuando se cree un producto".
*   **Línea 19**: Llama al método `loadProducts()` **dentro** del componente hijo `productList`. Esto fuerza a la lista a recargar los datos desde el servidor para mostrar el nuevo producto recién añadido.

---

## RESUMEN DE FLUJO

1.  **Backend** inicia en **3000**, conecta a **MongoDB** y espera peticiones.
2.  **Frontend** inicia en **4200**, carga `App` (padre).
3.  `App` muestra el `ProductFormComponent` y el `ProductListComponent`.
4.  Cuando creas un producto en el formulario, `App` detecta el evento y le dice a `ProductListComponent` **"¡Ei! Hay datos nuevos, recárgate"** usando `loadProducts()`.
