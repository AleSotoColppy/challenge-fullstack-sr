# 🏆 Challenge Técnico Senior – Módulo de Gestión Contable Avanzado

## 📌 Contexto
Colppy es un sistema de gestión contable para pymes y contadores.  
Buscamos evaluar tu capacidad para diseñar y construir un **módulo contable completo**, considerando **arquitectura, escalabilidad y buenas prácticas**.

---

## 🎯 Objetivo
Construir un módulo de **gestión contable** (mini Colppy) con:
- **Backend robusto (Node.js + DB real)**.
- **Frontend SPA** moderno.
- **Arquitectura limpia y escalable**.

---

## ✅ Requerimientos funcionales
### 1️⃣ Autenticación real
- Registro y login de usuarios.
- Uso de JWT.
- Middleware para proteger endpoints.

### 2️⃣ Gestión de facturas (CRUD completo)
- Crear, listar, editar, eliminar.
- Filtrar y paginar resultados desde la API.

### 3️⃣ Gestión de clientes (CRUD)
- CRUD básico de clientes (nombre, CUIT, email).
- Las facturas deben pertenecer a un cliente.

### 4️⃣ Exportar reportes
- Endpoint `/api/reportes` que genere un **CSV o PDF** con las facturas de un mes.

---

## 📦 Requerimientos técnicos
- **Backend en Node.js/Express** con arquitectura modular (services, controllers, routes).
- **Base de datos real:** PostgreSQL o MongoDB.
- **ORM recomendado:** Prisma o Sequelize.
- **Frontend SPA** (React o Vue):
  - Pantallas para login, dashboard, clientes, facturas.
- **Testing** obligatorio:
  - Unit tests + integración de API.

---

## 🚀 Bonus (muy valorado)
- **Dockerfile** para levantar todo.
- **Swagger/OpenAPI** para documentar la API.
- **CI/CD básico** con GitHub Actions.
- **Implementar cache (Redis)** para mejorar performance de `/api/facturas`.

---

## 🕑 Tiempo estimado
12 a 16 horas.

---

## 📂 Estructura sugerida
```
📦 modulo-contable
 ┣ 📂 backend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📂 services
 ┃ ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📂 models
 ┃ ┃ ┗ 📜 server.js
 ┃ ┣ 📜 prisma/schema.prisma (o models SQL)
 ┃ ┣ 📜 Dockerfile
 ┃ ┗ 📜 README.md
 ┣ 📂 frontend
 ┃ ┣ 📜 src/pages/Login.jsx
 ┃ ┣ 📜 src/pages/Dashboard.jsx
 ┃ ┣ 📜 src/pages/Clientes.jsx
 ┃ ┣ 📜 src/pages/Facturas.jsx
 ┃ ┗ 📜 App.jsx
 ┗ 📜 README.md
```

---

## 📤 Entrega
- Subí tu código a **GitHub**.
- Incluí instrucciones claras para levantar backend y frontend.
- Bonus: agrega docker-compose para levantar DB y servidor.
