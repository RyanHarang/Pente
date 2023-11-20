import React from "react";

const Stone = ({ color, onClick }) => {
  const stoneColor =
    color === 1 ? "player-two" : color === -1 ? "player-one" : "empty";

  return (
    <>
      <div className={`stone ${stoneColor}`} onClick={onClick} />
    </>
  );
};

export default Stone;
