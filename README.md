# MiniInventario - Guía Rápida

Este proyecto integra un backend en Spring Boot y un frontend en Angular 19.

## Estructura
- `Backend_SpringBoot/`: Contiene la API en Java (Spring Boot) y las entidades JPA.
- `frontend-angular/`: Contiene el proyecto en Angular con la interfaz web, componentes y servicios.

## Requisitos
- Node.js (v18+)
- Java 25
- Maven (incluido vía `mvnw`)

## Arrancar todo el proyecto (Frontend + Backend)

Para facilitar el desarrollo, se ha creado un comando unificado que enciende la base de datos temporal en memoria (H2), la API en Spring Boot y el servidor de Angular al mismo tiempo.

1. Abre una terminal.
2. Navega a la carpeta de Angular:
   ```bash
   cd frontend-angular
   ```
3. Ejecuta el comando de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en [http://localhost:4200](http://localhost:4200)

## Funcionalidades
- **Base de Datos H2**: Si ejecutas el proyecto con `npm run dev`, no necesitas instalar PostgreSQL ni Docker. Spring Boot usará automáticamente una base de datos en memoria llamada H2. *Nota: Los datos registrados se perderán al apagar el servidor.*
- **Conexión a BD Real**: Si prefieres que tus datos se guarden de forma permanente, configura las variables `${DATABASE_URL}`, `${DATABASE_USERNAME}`, y `${DATABASE_PASSWORD}` en tu IDE y ejecuta el backend desde ahí, o colócalas directamente en el archivo `application.properties`.
- **Modales Funcionales**: Puedes crear, editar y eliminar Categorías y Productos, y ver estadísticas en tiempo real en el Dashboard.
