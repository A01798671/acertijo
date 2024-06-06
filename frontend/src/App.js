import React, { useState } from 'react';
import axios from 'axios';
import Button from './components/Button';
import Timer from './components/Timer';
import Riddle from './components/Riddle';
import Message from './components/Message';
import TopScores from './components/TopScores';

const App = () => {
  const [showRiddle, setShowRiddle] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [timeUp, setTimeUp] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);

  const riddle = "What is 2 + 2?";
  const correctAnswer = "4";

  const handleStart = () => {
    setShowRiddle(true);
    setTimeUp(false);
    setShowMessage('');
    setShowScores(false);
  };

  const handleAnswer = (answer) => {
    if (answer === correctAnswer) {
      const name = prompt('You won! Enter your name:');
      const time = 60 - remainingTime;
      axios.post('http://localhost:5000/winner', { name, time })
        .then(response => console.log(response.data))
        .catch(error => console.error('There was an error!', error));
      setShowMessage('You won! Your time has been saved.');
      setShowRiddle(false);
    } else {
      setShowMessage('Wrong answer, try again!');
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setShowMessage('Time is up! You lost.');
    setShowRiddle(false);
  };

  const handleShowScores = () => {
    setShowScores(true);
    setShowRiddle(false);
    setShowMessage('');
  };

  return (
    <div>
      {!showRiddle && !timeUp && (
        <div>
          <Button onClick={handleStart} label="Start Riddle" />
          <Button onClick={handleShowScores} label="Show Top Scores" />
        </div>
      )}
      {showRiddle && (
        <div>
          <Riddle riddle={riddle} onAnswer={handleAnswer} />
          <Timer initialTime={60} onTimeUp={handleTimeUp} setRemainingTime={setRemainingTime} />
        </div>
      )}
      {showMessage && <Message text={showMessage} />}
      {showScores && <TopScores />}
    </div>
  );
};

export default App;
