import React, { useState, useEffect } from "react";
import Stone from "./Stone";

const Board = () => {
  // Initialize the 19x19 empty array
  const initialBoardState = Array.from({ length: 19 }, () =>
    Array.from({ length: 19 }, () => 0)
  );

  const [boardState, setBoardState] = useState(initialBoardState);
  const [currentPlayer, setCurrentPlayer] = useState(1); // will either be 1 or -1
  // Trackers for players captures
  const [p1Captures, setP1Captures] = useState(0);
  const [p2Captures, setP2Captures] = useState(0);
  const [ended, setEnded] = useState(false);
  // Tracker for state of rules
  const [rulesClass, setRulesClass] = useState("hide");

  // Initial play is always in the center of the board
  initialBoardState[9][9] = -1;
  // History for undo functionality
  const [history, setHistory] = useState([
    { boardState: initialBoardState, p1Captures: 0, p2Captures: 0 },
  ]);

  const handleMove = (row, col) => {
    if (ended) {
      return;
    } else if (boardState[row][col] === 0) {
      const newBoardState = boardState.map((rowArr) => [...rowArr]);
      newBoardState[row][col] = currentPlayer;
      setBoardState(newBoardState);
      setCurrentPlayer(currentPlayer * -1);
      checkCaptures(row, col, newBoardState);

      // Update the move history after each valid move
      setHistory((prevHistory) => [
        ...prevHistory,
        {
          boardState: newBoardState,
          p1Captures: p1Captures,
          p2Captures: p2Captures,
        },
      ]);
      // Call checkVictory after each move
      checkVictory(row, col);
    }
  };

  function checkCaptures(row, col, boardCheck) {
    // Check down
    if (row < 16) {
      if (
        boardState[row + 1][col] == currentPlayer * -1 &&
        boardState[row + 2][col] == currentPlayer * -1 &&
        boardState[row + 3][col] == currentPlayer
      ) {
        boardCheck[row + 1][col] = 0;
        boardCheck[row + 2][col] = 0;
        setBoardState(boardCheck);
        if (currentPlayer === -1) {
          setP1Captures(p1Captures + 1);
        } else {
          setP2Captures(p2Captures + 1);
        }
      }
      // Down-Left
      if (col > 2) {
        if (
          boardState[row + 1][col - 1] == currentPlayer * -1 &&
          boardState[row + 2][col - 2] == currentPlayer * -1 &&
          boardState[row + 3][col - 3] == currentPlayer
        ) {
          boardCheck[row + 1][col - 1] = 0;
          boardCheck[row + 2][col - 2] = 0;
          setBoardState(boardCheck);
          if (currentPlayer === -1) {
            setP1Captures((prevP1Captures) => prevP1Captures + 1);
          } else {
            setP2Captures((prevP2Captures) => prevP2Captures + 1);
          }
        }
      }
      // Down-Right
      if (col < 16) {
        if (
          boardState[row + 1][col + 1] == currentPlayer * -1 &&
          boardState[row + 2][col + 2] == currentPlayer * -1 &&
          boardState[row + 3][col + 3] == currentPlayer
        ) {
          boardCheck[row + 1][col + 1] = 0;
          boardCheck[row + 2][col + 2] = 0;
          setBoardState(boardCheck);
          if (currentPlayer === -1) {
            setP1Captures((prevP1Captures) => prevP1Captures + 1);
          } else {
            setP2Captures((prevP2Captures) => prevP2Captures + 1);
          }
        }
      }
    }
    // Check up
    if (row > 2) {
      if (
        boardState[row - 1][col] == currentPlayer * -1 &&
        boardState[row - 2][col] == currentPlayer * -1 &&
        boardState[row - 3][col] == currentPlayer
      ) {
        boardCheck[row - 1][col] = 0;
        boardCheck[row - 2][col] = 0;
        setBoardState(boardCheck);
        if (currentPlayer === -1) {
          setP1Captures((prevP1Captures) => prevP1Captures + 1);
        } else {
          setP2Captures((prevP2Captures) => prevP2Captures + 1);
        }
      }
      // Up-Left
      if (col > 2) {
        if (
          boardState[row - 1][col - 1] == currentPlayer * -1 &&
          boardState[row - 2][col - 2] == currentPlayer * -1 &&
          boardState[row - 3][col - 3] == currentPlayer
        ) {
          boardCheck[row - 1][col - 1] = 0;
          boardCheck[row - 2][col - 2] = 0;
          setBoardState(boardCheck);
          if (currentPlayer === -1) {
            setP1Captures(p1Captures + 1);
          } else {
            setP2Captures(p2Captures + 1);
          }
        }
      }
      // Up-Right
      if (col < 16) {
        if (
          boardState[row - 1][col + 1] == currentPlayer * -1 &&
          boardState[row - 2][col + 2] == currentPlayer * -1 &&
          boardState[row - 3][col + 3] == currentPlayer
        ) {
          boardCheck[row - 1][col + 1] = 0;
          boardCheck[row - 2][col + 2] = 0;
          setBoardState(boardCheck);
          if (currentPlayer === -1) {
            setP1Captures(p1Captures + 1);
          } else {
            setP2Captures(p2Captures + 1);
          }
        }
      }
    }
    // Check left
    if (col > 2) {
      if (
        boardState[row][col - 1] == currentPlayer * -1 &&
        boardState[row][col - 2] == currentPlayer * -1 &&
        boardState[row][col - 3] == currentPlayer
      ) {
        boardCheck[row][col - 1] = 0;
        boardCheck[row][col - 2] = 0;
        setBoardState(boardCheck);
        if (currentPlayer === -1) {
          setP1Captures(p1Captures + 1);
        } else {
          setP2Captures(p2Captures + 1);
        }
      }
    }
    // Check right
    if (col < 16) {
      if (
        boardState[row][col + 1] == currentPlayer * -1 &&
        boardState[row][col + 2] == currentPlayer * -1 &&
        boardState[row][col + 3] == currentPlayer
      ) {
        boardCheck[row][col + 1] = 0;
        boardCheck[row][col + 2] = 0;
        setBoardState(boardCheck);
        if (currentPlayer === -1) {
          setP1Captures(p1Captures + 1);
        } else {
          setP2Captures(p2Captures + 1);
        }
      }
    }
  }

  useEffect(() => {
    if (p1Captures >= 5 || p2Captures >= 5) {
      setEnded(true);
      return;
    }
  }, [p1Captures, p2Captures]);

  function checkVictory(row, col) {
    const directions = [
      [0, 1], // Right
      [1, 1], // Down-Right
      [1, 0], // Down
      [1, -1], // Down-Left
    ];

    for (const [dy, dx] of directions) {
      let count = 1; // Count the number of stones in a row of current player

      // Check forward direction
      for (let i = 1; i <= 4; i++) {
        const newRow = row + i * dy;
        const newCol = col + i * dx;
        if (
          newRow < 0 ||
          newRow > 18 ||
          newCol < 0 ||
          newCol > 18 ||
          boardState[newRow][newCol] !== currentPlayer
        ) {
          break; // If out of bounds or stone of other player found, stop counting
        }
        count++;
      }

      // Check backward direction
      for (let i = 1; i <= 4; i++) {
        const newRow = row - i * dy;
        const newCol = col - i * dx;
        if (
          newRow < 0 ||
          newRow > 18 ||
          newCol < 0 ||
          newCol > 18 ||
          boardState[newRow][newCol] !== currentPlayer
        ) {
          break; // If out of bounds or stone of other player found, stop counting
        }
        count++;
      }

      if (count >= 5) {
        setEnded(true);
        const winner = currentPlayer === 1 ? "two" : "one";
        return;
      }
    }
  }

  const handleNewGame = () => {
    setBoardState(initialBoardState);
    setCurrentPlayer(1);
    setEnded(false);
    setP1Captures(0);
    setP2Captures(0);
    setHistory([
      { boardState: initialBoardState, p1Captures: 0, p2Captures: 0 },
    ]);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      // Get the previous board state from the history
      const prevBoardState = history[history.length - 2].boardState;
      const prevP1Captures = history[history.length - 1].p1Captures;
      const prevP2Captures = history[history.length - 1].p2Captures;

      // Update the board state with the previous state
      setBoardState(prevBoardState);
      setP1Captures(prevP1Captures);
      setP2Captures(prevP2Captures);

      // Remove the last board state from the history
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setCurrentPlayer(currentPlayer * -1);
      setEnded(false); // Allow the game to continue after undoing
    }
  };

  const handleRules = () => {
    if (rulesClass === "hide") {
      setRulesClass("rules");
    } else {
      setRulesClass("hide");
    }
  };

  // Conditional rendering
  let player = currentPlayer === -1 ? "One" : "Two";
  let winner = currentPlayer === -1 ? "two" : "one";
  let endClass = ended ? "game-over" : "hide";

  return (
    <>
      <div className="app-container">
        <div className="board-container">
          <div className="board">
            {boardState.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Stone
                  key={`${rowIndex} ${colIndex}`}
                  color={cell}
                  onClick={() => handleMove(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>
        <div className="console-container">
          <div className="console">
            <div className="info">
              <span className="info-item">Turn: Player {player}</span>
              <br />
              <span className="info-item">P1 Captures: {p1Captures}</span>
              <br />
              <span className="info-item">P2 Captures: {p2Captures}</span>
            </div>
            <div className="controls-list">
              <button className="controls" onClick={handleUndo}>
                Undo
              </button>
              <button className="controls" onClick={handleNewGame}>
                Restart
              </button>
              <button className="controls" onClick={handleRules}>
                Rules
              </button>
              <div className={rulesClass}>
                The goal of Pente is to win by being the first player to either
                achieve five stones in a row, or by capturing five pairs of your
                opponents stones. Pente formations account for cardinal
                directions as well as the diagonals. The first play in a game of
                Pente is always the center of the board. A capture occurs when a
                stone is placed such that, in any direction, it is followed by
                two opposing stones and then an allied stone. Both opposing
                stones are removed from the map.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={endClass}>Player {winner} wins!</div>
    </>
  );
};

export default Board;
