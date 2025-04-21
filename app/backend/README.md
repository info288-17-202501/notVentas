### Implement Database using PostgreSQL
    - Log in to pgAdmin
    - Create server <NotSales>
    - Create database <notsales>
    - Paste code from the `database.sql` file
    - Verify tables

### Implement Prisma - PostgreSQL
    - npx prisma migrate dev --name init
    Si no funciona lo anterior usar:
    - npx prisma migrate reset
    - npx prisma generate 

### Launch backend
    - Create archive .env in "/app/backend/" and copy/paste from .env-example to configure
    - use command 'npm i' if this is the firts time launching the app
    - Now use 'npm run dev' for develop or 'npm start' to deploy
    - 

# 🛠️ NotSales - Backend

Backend del proyecto **NotVentas**, desarrollado con Node.js, Express, PostgreSQL y Prisma.

---

## 📦 Requisitos

- Node.js ≥ 16
- PostgreSQL instalado y corriendo
- pgAdmin (opcional, para administrar la base de datos gráficamente)

---

## 🗄️ Implementación de la Base de Datos

1. Inicia sesión en **pgAdmin**.
2. Crea un nuevo servidor llamado **`NotVentas`**.
3. Crea una base de datos llamada **`NotVentas`**.
4. Abre el archivo `database.sql`, copia su contenido y pégalo en el panel de consultas de pgAdmin.
5. Ejecuta el script y verifica que las tablas se hayan creado correctamente.

---

## 🔧 Configuración de Prisma con PostgreSQL

1. Ejecuta la migración inicial:
   `npx prisma migrate dev --name init`
2. Si la migración falla, usa:
    `npx prisma migrate reset`
3. Genera el cliente Prisma:
    npx prisma generate

## 🚀 Iniciar el Backend

1. Crea un archivo .env dentro de la carpeta /app/backend/.

2. Copia el contenido de .env-example y configura las variables según tu entorno.

3. Instala las dependencias (solo la primera vez):
    npm install

4. Para iniciar en modo desarrollo:
    npm run dev

5. Para iniciar en modo producción:
    npm start