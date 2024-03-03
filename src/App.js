import React, { useState, useEffect } from 'react';
import './App.css';

function Mathic() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [numberInCursor, setNumberInCursor] = useState(0);
  const [buttonValues, setButtonValues] = useState({ 
    player1_button1: 1, player1_button2: 1, 
    player2_button1: 1, player2_button2: 1});

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const transferValue = (buttonKey) => {
  setButtonValues((prevButtonValues) => {
    const updatedButtonValues = { ...prevButtonValues };
    const buttonValue = updatedButtonValues[buttonKey];

    if (numberInCursor === 0) {
      setNumberInCursor(buttonValue);
    } else {
      const newValue = updatedButtonValues[buttonKey] + numberInCursor;

      updatedButtonValues[buttonKey] = newValue % 5;
      setNumberInCursor(0);

      if (updatedButtonValues[buttonKey] === 5) {
        updatedButtonValues[buttonKey] = 0;
      }
    }

    return updatedButtonValues;
  });
};

  const cursorCard = () => {
    return numberInCursor > 0 ? (
      <div
        className="Cursor-card"
        style={{
          left: cursorPosition.x + 10,
          top: cursorPosition.y + 10,
        }}
      >
        <p>{numberInCursor}</p>
      </div>
    ) : null;
  };

  return (
    <div>
      <div>
        <button
          id="Player1-button"
          className="Player-button"
          onClick={() => transferValue('player1_button1')}
          disabled={buttonValues.player1_button1 === 0 || buttonValues.player1_button1 === 5}
        >
          {buttonValues.player1_button1}
        </button>
        <button
          id="Player2-button"
          className="Player-button"
          onClick={() => transferValue('player2_button1')}
          disabled={buttonValues.player2_button1 === 0 || buttonValues.player2_button1 === 5}
        >
          {buttonValues.player2_button1}
        </button>
        {cursorCard()}
      </div>
    </div>
  );
}

export default Mathic;
