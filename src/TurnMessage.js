import React from 'react';

const TurnMessage = ({ turnMessage, turnMessageColor }) => {
  return (
    <div className="turn-message" style={{ color: turnMessageColor }}>
      {turnMessage}
    </div>
  );
};

export default TurnMessage;
