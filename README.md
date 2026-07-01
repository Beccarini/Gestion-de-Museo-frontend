# TP4: Sistema MUIC (Gestión de Museo) - Frontend

## Descripción
Cliente web desarrollado en React para interactuar con la API de Gestión de Museo. La aplicación permite la administración interna de los recursos del museo, incluyendo el control de accesos, el seguimiento de eventos, la gestión de plantillas y la asignación de permisos para los integrantes del equipo.

## Tecnologías Utilizadas
* **Framework/Librería:** React.js (React Router v6)
* **Gestión de Estado Global:** API Context (`useContext` mediante `AuthProvider`)
* **Estilos / UI:** Material UI (MUI)
* **Cliente HTTP:** Axios / Fetch

## Instalación y Ejecución

> **Nota:** Para realizar esta parte, es necesario primero tener el backend de la aplicación funcionando de forma paralela.

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Beccarini/Gestion-de-Museo-frontend
   Abrir la carpeta del proyecto desde la terminal
2. **Instalar dependencias**
    Ya con la carpeta abierta, ejecutar el comando:
    "npm install"
3. **Ejecutar el frontend**
    Hay que tener la carpeta de la aplicación abierta en la terminal, luego ejecutar el comando:
    "npm run dev"