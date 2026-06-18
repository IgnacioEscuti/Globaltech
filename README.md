# Globaltech — E-commerce Full Stack

Aplicación de e-commerce full-stack con **React + Vite** en el frontend y **Node.js + Express + MongoDB** en el backend.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18, React Router v6, Vite |
| Backend | Node.js, Express 5 |
| Base de datos | MongoDB + Mongoose |
| Paginación | mongoose-paginate-v2 |

---

## Estructura del proyecto

```
├── backend/               # API REST con Express (arquitectura en capas)
│   ├── src/
│   │   ├── server.js              # Entry point: conecta la DB y levanta el server
│   │   ├── app.js                 # Configuración de Express y montaje de rutas
│   │   ├── config/
│   │   │   └── db.js              # Conexión a MongoDB
│   │   ├── controllers/
│   │   │   ├── product.controller.js
│   │   │   └── cart.controller.js
│   │   ├── services/
│   │   │   ├── product.service.js
│   │   │   └── cart.service.js
│   │   ├── repositories/
│   │   │   ├── product.repository.js
│   │   │   └── cart.repository.js
│   │   ├── dao/
│   │   │   ├── product.dao.js
│   │   │   └── cart.dao.js
│   │   ├── models/
│   │   │   ├── product.model.js
│   │   │   └── cart.model.js
│   │   └── routes/
│   │       ├── products.router.js
│   │       └── carts.router.js
│   ├── scripts/
│   │   └── seed.js        # Carga productos de ejemplo
│   ├── .env.example
│   └── package.json
│
└── frontend/              # SPA con React
    ├── src/
    │   ├── main.jsx              # Entry point
    │   ├── App.jsx
    │   ├── context/
    │   │   └── CartContext.jsx   # Estado global del carrito
    │   ├── services/
    │   │   └── api.js            # Llamadas al backend
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── CartSidebar.jsx
    │   │   ├── ProductCard.jsx
    │   │   └── Pagination.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetail.jsx
    │   │   └── Cart.jsx
    │   └── utils/
    │       └── categoryIcon.js   # Iconos por categoría de producto
    └── package.json
```

---

## Instalación y uso

### Requisitos
- Node.js v18+
- MongoDB corriendo localmente en el puerto 27017

### Backend

```bash
cd backend
npm install
cp .env.example .env
node scripts/seed.js   # (opcional) carga productos de ejemplo
npm run dev            # corre en http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev            # corre en http://localhost:5173
```

> El frontend usa el proxy de Vite para redirigir `/api` al backend, sin necesidad de configurar CORS.

---

## Endpoints — Productos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/products` | Lista con filtros, paginación y orden |
| GET | `/api/products/:id` | Detalle de un producto |

### Query params de GET /api/products

| Param | Default | Descripción |
|---|---|---|
| `limit` | 10 | Resultados por página |
| `page` | 1 | Página a consultar |
| `sort` | — | `asc` o `desc` por precio |
| `query` | — | Filtro en formato `campo:valor` (ej: `category:audio`) |

### Formato de respuesta

```json
{
  "status": "success",
  "payload": [...],
  "totalPages": 3,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevLink": null,
  "nextLink": "http://localhost:8080/api/products?page=2&limit=10"
}
```

---

## Endpoints — Carrito

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/carts` | Crear carrito vacío |
| GET | `/api/carts/:cid` | Obtener carrito con productos (populate) |
| POST | `/api/carts/:cid/products/:pid` | Agregar producto (o incrementar cantidad) |
| PUT | `/api/carts/:cid` | Reemplazar todos los productos |
| PUT | `/api/carts/:cid/products/:pid` | Actualizar cantidad de un producto |
| DELETE | `/api/carts/:cid/products/:pid` | Eliminar un producto del carrito |
| DELETE | `/api/carts/:cid` | Vaciar el carrito completo |
