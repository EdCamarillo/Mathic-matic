import React from 'react';
import SwapIcon from './swap.png';

const SwapButton = ({ className, onClick, disabled }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      <img src={SwapIcon} alt="Button Image" />
    </button>
  );
};

export default SwapButton;
