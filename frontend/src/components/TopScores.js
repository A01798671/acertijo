import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopScores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/top-scores')
      .then(response => {
        setScores(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <h2>Top 10 Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.name}</td>
              <td>{score.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopScores;
