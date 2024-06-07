# Acertijo Matemático
Prueba Técnica para Reclutamiento de Programador Full Stack Cracking The Code_Alberto Cebreros

## Descripción del Proyecto

Este proyecto es una página web de un acertijo matemático donde los usuarios deben obtener la respuesta correcta en un tiempo limitado de 1 minuto. Los puntajes se guardan en una base de datos y se pueden visualizar los 10 mejores puntajes.

## Requisitos para correr el proyecto en localhost

- Node.js (Para instalar Node.js se puede hacer a través de su página oficial en: https://nodejs.org/en/download/prebuilt-installer)
- MongoDB (Para instalar MongoDB de manera gratuita se puede hacer a traves de su página oficial con la versión de comunidad: https://www.mongodb.com/try/download/community)
- MongoDB Compass (Recomiendo instalar MongoDB Compass que es una herramienta gráfica para interactuar con ls base de datos MongoDB y facilita mucho ver los datos. Se puede instalar a traves de su página oficial: https://www.mongodb.com/products/tools/compass)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/A01798671/acertijo.git
   cd acertijo
   ```

2. Instala las dependencias del servidor backend:

   ```bash
   cd backend
   npm install
   ```

3. Instala las dependencias del frontend:

   ```bash
   cd frontend
   npm install
   ```

4. Configura la base de datos:

   Asegúrate de tener MongoDB instalado y corriendo en `localhost:27017`. Puedes iniciar MongoDB con el siguiente comando:

   ```bash
   mongod
   ```
   O bien puedes abrir MongoDBCompass, y con esta URL: mongodb://localhost:27017 dar click en conect.

5. Configura la IP de tu computadora:

   Edita el archivo `config.js` en la raíz del proyecto y reemplaza `YOUR_IP_ADDRESS` con la IP de tu computadora. Puedes obtener tu IP ejecutando `ipconfig` en la terminal.

   ```javascript
   const config = {
     apiBaseUrl: 'http://YOUR_IP_ADDRESS:5000'
   };

   export default config;
   ```

   Esto es con la finalidad de que en su telefono movil, en su navegador (safari o chrome), puedan acceder a la página web.
   Cabe aclarar que para esto, la computadora donde corran el servidor y el telefono movil deben estar en la misma red de internet.
   Para entrar a la página web en el telefono se debe entrar a la dirección: http://YOUR_IP_ADDRESS:3000
   

## Ejecución

1. Inicia el servidor backend:

   ```bash
   cd backend
   node server.js
   ```

2. Inicia el servidor frontend:

   ```bash
   cd frontend
   npm start
   ```

3. Abre tu navegador y ve a `http://YOUR_IP_ADDRESS:3000` para jugar al acertijo.

## Uso

- Haz clic en "Comenzar acertijo" para iniciar el juego.
- Ingresa tu respuesta en el campo de texto y haz clic en "Enviar".
- Si ganas, se te pedirá que ingreses tu nombre para guardar tu puntaje.
- Haz clic en "Mostrar Puntaje" para ver los mejores puntajes.

## Ejemplo en video del proyecto en funcionamiento

Para visualizar un video del proyecto en funcionamiento ingresa al siguiente link: https://youtu.be/OIKvlGURsjc