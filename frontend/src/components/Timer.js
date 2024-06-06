import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimeUp, setRemainingTime }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTime(time - 1);
      setRemainingTime(time - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [time, onTimeUp]);

  return (
    <div>
      {time} seconds remaining
    </div>
  );
};

export default Timer;
