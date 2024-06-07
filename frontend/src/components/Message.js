import React from 'react';

/**
 * Componente funcional que muestra un mensaje.
 * 
 * Este componente recibe una prop `text` y muestra su contenido dentro de un
 * div.
 * 
 * @param {Object} props - Las props del componente.
 * @param {string} props.text - El mensaje a mostrar.
 * @returns {JSX.Element} Un div que contiene el mensaje.
 */
const Message = ({ text }) => (
  <div>
    {text}
  </div>
);

export default Message;
