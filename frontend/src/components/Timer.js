import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ initialTime, onTimeUp, setRemainingTime }) => {
  const [time, setTime] = useState(initialTime);
  const timerRef = useRef(null);
  const endTimeRef = useRef(Date.now() + initialTime * 1000);

  useEffect(() => {
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
