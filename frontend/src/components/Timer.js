import React, { useState, useEffect, useRef } from 'react';

/**
 * Componente funcional Timer que muestra un temporizador regresivo.
 * 
 * Este componente recibe un tiempo inicial, una función a llamar cuando
 * el tiempo se agote y una función para actualizar el tiempo restante.
 * 
 * @param {Object} props - Las props del componente.
 * @param {number} props.initialTime - El tiempo inicial del temporizador en segundos.
 * @param {function} props.onTimeUp - Función a llamar cuando el tiempo se agote.
 * @param {function} props.setRemainingTime - Función para actualizar el tiempo restante.
 * @returns {JSX.Element} Un div que contiene el tiempo restante.
 */
const Timer = ({ initialTime, onTimeUp, setRemainingTime }) => {
  // Estado del componente para manejar el tiempo restante
  const [time, setTime] = useState(initialTime);
  const timerRef = useRef(null); // Referencia para el temporizador
  const endTimeRef = useRef(Date.now() + initialTime * 1000); // Referencia para el tiempo de finalización

  useEffect(() => {
    /**
     * Función que actualiza el tiempo restante y maneja el temporizador.
     */
    const tick = () => {
      const now = Date.now();
      const remainingTime = Math.max(0, Math.round((endTimeRef.current - now) / 1000));

      setTime(remainingTime);
      setRemainingTime(remainingTime);

      if (remainingTime === 0) {
        onTimeUp();
      } else {
        timerRef.current = setTimeout(tick, 1000);
      }
    };

    timerRef.current = setTimeout(tick, 1000);

    // Limpia el temporizador cuando el componente se desmonte
    return () => clearTimeout(timerRef.current);
  }, [onTimeUp, setRemainingTime]);

  return (
    <div className="text-left mt-4">
      <div className="inline-block bg-gray-800 text-white text-lg font-bold py-1.5 px-3.5 rounded-md shadow-md">
        {time} seconds remaining
      </div>
    </div>
  );
};

export default Timer;
