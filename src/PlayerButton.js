import React from 'react';

const PlayerButton = ({ onClick, disabled, value, id }) => {
  return (
    <button
      id={id}
      className="Player-button"
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default PlayerButton;
