import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config'; // Importar la configuración

/**
 * Componente funcional que muestra los 10 mejores puntajes.
 * 
 * Este componente hace una solicitud HTTP al servidor para obtener los 10 mejores puntajes
 * y los muestra en una lista ordenada.
 * 
 * @returns {JSX.Element} Un div que contiene la lista de los 10 mejores puntajes.
 */
const TopScores = () => {
  // Estado del componente para manejar los puntajes
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Hacer una solicitud HTTP para obtener los 10 mejores puntajes
    axios.get(`${config.apiBaseUrl}/top-scores`)
      .then(response => {
        setScores(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">Top 10 Mejores Puntajes</h2>
      <ol className="space-y-2">
        {scores.map((score, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{index + 1}. {score.name}</span>
            <span className="font-bold">{score.time} s</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopScores;
