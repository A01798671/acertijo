/**
 * Configuración de la URL base de la API.
 * 
 * Este archivo define la URL base que la aplicación usará para hacer
 * solicitudes HTTP al servidor backend.  
 * Esto con el fin de que sea mas fácil cambiar la URL
 * sin necesidad de modificar múltiples archivos en el proyecto.
 */

// Dirección base de la API
const config = {
  apiBaseUrl: 'http://YOUR_IP_ADDRESS:5000'
};

// Exporta la configuración para que pueda ser utilizada en otros archivos
export default config;
