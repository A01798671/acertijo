import React, { useState } from 'react';
import axios from 'axios';
import Timer from './Timer';
import Message from './Message';
import TopScores from './TopScores';

const RiddleGame = () => {
  const [showRiddle, setShowRiddle] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [timeUp, setTimeUp] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [answer, setAnswer] = useState('');
  const [gameOver, setGameOver] = useState(false); // Para manejar el estado del juego
  const [scoreMessage, setScoreMessage] = useState(''); // Mensaje para puntajes

  const correctAnswer = "49";

  const handleStart = () => {
    setShowRiddle(true);
    setTimeUp(false);
    setShowMessage('');
    setShowScores(false);
    setGameOver(false);
    setScoreMessage('');
  };

  const handleAnswer = (event) => {
    event.preventDefault();
    if (answer === correctAnswer) {
      const name = prompt('Ganaste! Ingresa tu nombre:');
      const time = 60 - remainingTime;
      axios.post('http://10.48.91.196:5000/winner', { name, time })
        .then(response => console.log(response.data))
        .catch(error => console.error('There was an error!', error));
      setShowMessage('Ganaste! Tu puntaje ha sido guardado.');
      setGameOver(true); // Indicar que el juego ha terminado
    } else {
      setShowMessage('Respuesta incorrecta, intenta de nuevo!');
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setShowMessage('¡Se acabó el tiempo! Perdiste.');
    setShowRiddle(false);
    setGameOver(true); // Indicar que el juego ha terminado
  };

  const handleShowScores = () => {
    if (gameOver) {
      setShowScores(true);
      setScoreMessage('');
    } else {
      setScoreMessage('Primero debes finalizar el reto antes de poder ver la puntuación.');
    }
  };

  const handleReload = () => {
    window.location.reload(); // Recargar la página
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
      {!showRiddle && !gameOver ? (
        <button onClick={handleStart} className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2">
          Comenzar acertijo
        </button>
      ) : (
        <div className="max-w-3xl w-full px-6 py-12 bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-lg">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Acertijo Matemático</h1>
            <p className="text-lg text-gray-300">
              ¡Pon a prueba tus habilidades con este desafío intrigante!
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold">Descripción del Acertijo</h2>
                <p className="mt-2 text-gray-300">
                En un lago hay un espacio lleno  de lirios. Por cada día que pasa, los lirios se duplican. 
                Si los lirios tardan 50 días en cubrir todo el lago, ¿Cuántos días tardarán en cubrir la mitad del lago?
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Ingresa tu Respuesta</h2>
                {showRiddle && !gameOver && (
                  <form onSubmit={handleAnswer} className="mt-2 flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="Tu respuesta"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-md px-4 py-2"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md px-4 py-2"
                    >
                      Enviar
                    </button>
                  </form>
                )}
                {showRiddle && !gameOver && (
                  <Timer initialTime={60} onTimeUp={handleTimeUp} setRemainingTime={setRemainingTime} />
                )}
                {showMessage && (
                  <div>
                    <Message text={showMessage} />
                    {gameOver && (
                      <button onClick={handleReload} className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 mt-4">
                        Volver a la pantalla de inicio
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Instrucciones y Reglas</h2>
              <div className="mt-2 space-y-2 text-gray-300">
                <p>1. Cada jugador tiene un número en la frente, pero no puede ver su propio número.</p>
                <p>2. Los jugadores pueden ver los números de los demás jugadores.</p>
                <p>3. Los jugadores deben adivinar su propio número basándose en la información que tienen sobre los números de los demás.</p>
                <p>4. El primer jugador en adivinar correctamente su número gana el juego.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div className="top-scores">
              <h2 className="text-2xl font-bold">Puntajes y Clasificaciones</h2>
              <div className="mt-2 space-y-2 text-gray-300">
                <p>¡Mira quiénes han resuelto este acertijo con éxito!</p>
                <button onClick={handleShowScores} className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2">Mostrar Puntaje</button>
                {scoreMessage && <p className="text-red-500 mt-2">{scoreMessage}</p>}
                {showScores && <TopScores />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiddleGame;
