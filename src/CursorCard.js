import React from 'react';

const CursorCard = ({ numberInCursor, cursorPosition }) => {
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

export default CursorCard;
