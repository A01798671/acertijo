import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config'; // Importar la configuración

const TopScores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
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
      <h2 className="text-xl font-bold mb-4">Top 10 Scores</h2>
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
