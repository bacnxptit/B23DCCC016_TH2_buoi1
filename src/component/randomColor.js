import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const RandomColorApp = () => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.randomColor.color);
  const history = useSelector((state) => state.randomColor.history);
  const [autoChange, setAutoChange] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(null);

  const getRandomColor = () => {
    const colors = ['red', 'blue', 'green'];
    return colors[Math.floor(Math.random() * 3)];
  };

  const changeColor = (newColor) => {
    dispatch({ type: 'CHANGE_COLOR', payload: newColor });
  };

  const undoColor = () => {
    dispatch({ type: 'UNDO_COLOR' });
  };

  const toggleAutoChange = () => {
    setAutoChange(!autoChange);
  };

  useEffect(() => {
    if (autoChange) {
      const id = setInterval(() => {
        changeColor(getRandomColor());
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [autoChange]);

  return (
    <div style={{ padding: 24, margin: 24, width: 500, height: 500, border: '3px solid #ccc' }}>
      <h1>Random Color</h1>
      <button onClick={() => changeColor(getRandomColor())}>Change Background Color</button>
      <button onClick={undoColor} disabled={history.length <= 1}>Undo</button>
      <button onClick={toggleAutoChange}>{autoChange ? 'Stop Auto Change' : 'Start Auto Change'}</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Current Color:</h2>
          <div style={{ width: 50, height: 50, backgroundColor: color, borderRadius: 5 }}></div>
        </div>
        <div>
          <h2>Color History:</h2>
          <ul>
            {history.map((col, index) => (
              <li key={index} style={{ color: col }}>{col}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RandomColorApp;