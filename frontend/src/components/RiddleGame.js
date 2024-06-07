/**
 * Archivo RiddleGame.js: Componente principal del juego de acertijos.
 * Fecha de creación: 6 de junio, 2024
 * Autor: Alberto Cebreros González
 * Para: Cracking the Code
 */

import React, { useState } from 'react';
import axios from 'axios';
import Timer from './Timer';
import Message from './Message';
import TopScores from './TopScores';
import config from './config'; // Importar configuración

/**
 * Componente principal del juego de acertijos.
 */
const RiddleGame = () => {
  // Estado del componente para manejar la lógica del juego
  const [showRiddle, setShowRiddle] = useState(false); // Controla si se muestra el acertijo
  const [showMessage, setShowMessage] = useState(''); // Mensaje para mostrar el estado del juego
  const [showScores, setShowScores] = useState(false); // Controla si se muestran los puntajes
  const [remainingTime, setRemainingTime] = useState(60); // Tiempo restante para el acertijo
  const [answer, setAnswer] = useState(''); // Respuesta del usuario
  const [gameOver, setGameOver] = useState(false); // Indica si el juego ha terminado
  const [scoreMessage, setScoreMessage] = useState(''); // Mensaje para mostrar el estado de los puntajes

  // Respuesta correcta para el acertijo
  const correctAnswer = "49";

  /**
   * Maneja el inicio del acertijo.
   */
  const handleStart = () => {
    setShowRiddle(true);
    setShowMessage('');
    setShowScores(false);
    setGameOver(false);
    setScoreMessage('');
  };

  /**
   * Maneja la respuesta del usuario.
   * @param {Object} event - El evento del formulario.
   */
  const handleAnswer = (event) => {
    event.preventDefault();
    if (answer === correctAnswer) {
      const name = prompt('¡Ganaste! Ingresa tu nombre:');
      const time = 60 - remainingTime;
      // Enviar la respuesta correcta al servidor para guardar el puntaje
      axios.post(`${config.apiBaseUrl}/winner`, { name, time })
        .then(response => console.log(response.data))
        .catch(error => console.error('There was an error!', error));
      setShowMessage('¡Ganaste! Tu puntaje ha sido guardado.');
      setGameOver(true);
    } else {
      setShowMessage('Respuesta incorrecta, intenta de nuevo.');
    }
  };

  /**
   * Maneja el tiempo agotado.
   */
  const handleTimeUp = () => {
    setShowMessage('¡Se acabó el tiempo! Perdiste.');
    setShowRiddle(false);
    setGameOver(true);
  };

  /**
   * Maneja la visualización de los puntajes.
   */
  const handleShowScores = () => {
    if (gameOver) {
      setShowScores(true);
      setScoreMessage('');
    } else {
      setScoreMessage('Primero debes finalizar el reto antes de poder ver la puntuación.');
    }
  };

  /**
   * Maneja la recarga de la página.
   */
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
      {/* Muestra el botón para comenzar el acertijo si no se ha iniciado o el juego ha terminado */}
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
                En un lago hay un espacio lleno de lirios. Por cada día que pasa, los lirios se duplican. 
                Si los lirios tardan 50 días en cubrir todo el lago, ¿Cuántos días tardarán en cubrir la mitad del lago?
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Ingresa tu Respuesta</h2>
                {/* Formulario para ingresar la respuesta del usuario */}
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
                {/* Temporizador del acertijo */}
                {showRiddle && !gameOver && (
                  <Timer initialTime={60} onTimeUp={handleTimeUp} setRemainingTime={setRemainingTime} />
                )}
                {/* Mostrar mensaje al usuario */}
                {showMessage && (
                  <div>
                    <Message text={showMessage} />
                    {/* Botón para volver a la pantalla de inicio si el juego ha terminado */}
                    {gameOver && (
                      <button onClick={handleReload} className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 mt-4">
                        Volver a empezar
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Instrucciones</h2>
              <div className="mt-2 space-y-2 text-gray-300">
                <p>1. Lee la descripción del acertijo.</p>
                <p>2. Piensa la respuesta correcta y escribela en la sección "Ingresa tu Respuesta".</p>
                <p>3. Da click en el botón "Enviar" para verificarla.</p>
                <p>4. En caso de tener la respuesta correcta, ingresa tu nombre para guardar tu puntuación.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div className="top-scores">
              <h2 className="text-2xl font-bold">Puntajes y Clasificaciones</h2>
              <div className="mt-2 space-y-2 text-gray-300">
                <p>¡Mira quiénes han resuelto este acertijo con éxito!</p>
                {/* Botón para mostrar los puntajes */}
                <button onClick={handleShowScores} className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2">Mostrar Puntaje</button>
                {/* Mensaje sobre la visualización de los puntajes */}
                {scoreMessage && <p className="text-red-500 mt-2">{scoreMessage}</p>}
                {/* Componente para mostrar los puntajes */}
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
