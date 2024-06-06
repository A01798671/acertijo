import React from 'react';

const Riddle = ({ riddle, onAnswer }) => {
  const [answer, setAnswer] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswer(answer);
  };

  return (
    <div>
      <p>{riddle}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Riddle;
