import React, { useState, useEffect } from 'react';
import './App.css';
import './Animations.css';
import CursorCard from './CursorCard';
import TurnMessage from './TurnMessage';
import PlayerButton from './PlayerButton';
import SwapButton from './SwapButton';

function Mathic() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [numberInCursor, setNumberInCursor] = useState(0);
  const [buttonValues, setButtonValues] = useState({ 
    player1_button1: 1, player1_button2: 1, 
    player2_button1: 1, player2_button2: 1
  });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [turnState, setTurnState] = useState(1);
  const [turnMessage, setTurnMessage] = useState("Player 1's Turn");
  const [turnMessageColor, setTurnMessageColor] = useState("rgb(231, 118, 124)");
  const [swappingState, setSwappingState] = useState(false);
  const [sourceButtonId, setSourceButtonId] = useState(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleOverflow = () => {
      const updatedButtonValues = { ...buttonValues };

      for (let key in updatedButtonValues) {
        if (updatedButtonValues[key] > 5) {
          updatedButtonValues[key] %= 5;
        }
      }

      setButtonValues(updatedButtonValues);
    };

    handleOverflow();
  }, [buttonValues]);

  const transferValue = (buttonKey) => {
    setButtonValues((prevButtonValues) => {
      const updatedButtonValues = { ...prevButtonValues };
      const buttonValue = updatedButtonValues[buttonKey];
      
      if (swappingState){
        if (numberInCursor > 0){
          setNumberInCursor(numberInCursor - 1);
          updatedButtonValues[buttonKey] += 1;
        }
        else {
          setNumberInCursor(buttonValue - 1);
          updatedButtonValues[buttonKey] = 1;
        }
      }
      else {
        if (currentPlayer === 1) {
          // Player1's turn
          if (turnState === 1) {
            // Player1 clicks own button
            setNumberInCursor(buttonValue);
            setTurnState(2);
          } else if (turnState === 2) {
            // Player1 clicks opponent's button
            const newValue = (buttonValue + numberInCursor) % 5;
            updatedButtonValues[buttonKey] = newValue;
            setNumberInCursor(0);
            setTurnState(3);
            setCurrentPlayer(2);
          }
        } else {
          // Player2's turn
          if (turnState === 3) {
            // Player2 clicks own button
            setNumberInCursor(buttonValue);
            setTurnState(4);
          } else if (turnState === 4) {
            // Player2 clicks opponent's button
            const newValue = (buttonValue + numberInCursor) % 5;
            updatedButtonValues[buttonKey] = newValue;
            setNumberInCursor(0);
            setTurnState(1);
            setCurrentPlayer(1);
          }
        }
      }
      
      return updatedButtonValues;
    });
  };

  // Check Player turn
  useEffect(() => {
    if (currentPlayer === 1) {
      swappingState 
        ? setTurnMessage("Player 1 swapping...")
        : setTurnMessage("Player 1's Turn");

      setTurnMessageColor("rgb(231, 118, 124)");
    } else {
      swappingState 
        ? setTurnMessage("Player 2 swapping...")
        : setTurnMessage("Player 2's Turn");

      setTurnMessageColor("rgb(135, 180, 238)");
    }
  }, [currentPlayer, swappingState]);

  // Check Winner
  useEffect(() => {
    if (buttonValues.player1_button1 === 0 && buttonValues.player1_button2 === 0) {
      setTurnMessage("Player 2 Wins!");
      setTurnMessageColor("rgb(135, 180, 238)");
    } else if (buttonValues.player2_button1 === 0 && buttonValues.player2_button2 === 0) {
      setTurnMessage("Player 1 Wins!");
      setTurnMessageColor("rgb(231, 118, 124)");
    }
  }, [buttonValues]);

  const isCapped = () => {
    const values = Object.values(buttonValues);
    return values.includes(5);
  };

  return (
    <div>
      <div className="game-container">
        {/* Player1's Buttons */}
        <div className="player1-container">
          <SwapButton 
            className="Swap-button player1"
            disabled={(currentPlayer === 2 || turnState === 2 || numberInCursor > 0 || isCapped())}
            onClick={() => {
              if (turnState === 1) {
                if (!swappingState) {
                  setSwappingState(true);
                }
                else {
                  setSwappingState(false);
                  setTurnState(3);
                  setCurrentPlayer(2);
                }
              }
            }}
          />
          <PlayerButton
            id="Player1-button-1"
            onClick={() => transferValue('player1_button1')}
            disabled={buttonValues.player1_button1 === 0 || (currentPlayer === 1 && turnState === 2) || (currentPlayer === 2 && turnState === 3)}
            value={buttonValues.player1_button1}
          />
          <PlayerButton
            id="Player1-button-2"
            onClick={() => transferValue('player1_button2')}
            disabled={buttonValues.player1_button2 === 0 || (currentPlayer === 1 && turnState === 2) || (currentPlayer === 2 && turnState === 3)}
            value={buttonValues.player1_button2}
          />
        </div>
  
        <TurnMessage
          turnMessage={turnMessage}
          turnMessageColor={turnMessageColor}
        />
  
        {/* Player2's Buttons */}
        <div className="player2-container">
          <PlayerButton
            id="Player2-button-1"
            onClick={() => transferValue('player2_button1')}
            disabled={buttonValues.player2_button1 === 0 || (currentPlayer === 2 && turnState === 4) || (currentPlayer === 1 && turnState === 1)}
            value={buttonValues.player2_button1}
          />
          <PlayerButton
            id="Player2-button-2"
            onClick={() => transferValue('player2_button2')}
            disabled={buttonValues.player2_button2 === 0 || (currentPlayer === 2 && turnState === 4) || (currentPlayer === 1 && turnState === 1)}
            value={buttonValues.player2_button2}
          />
          <SwapButton 
            className="Swap-button player2"
            disabled={(currentPlayer === 1 || turnState === 4 || numberInCursor > 0 || isCapped())}
            onClick={() => {
              if (turnState === 3) {
                if (!swappingState) {
                  setSwappingState(true);
                }
                else {
                  setSwappingState(false);
                  setTurnState(1);
                  setCurrentPlayer(1);
                }
              }
            }}
          />
        </div>
        
        <CursorCard
          numberInCursor={numberInCursor}
          cursorPosition={cursorPosition}
        />
      </div>
    </div>
  );  
}

export default Mathic;
