import React, { useContext, useEffect, useRef, useState } from 'react';

import styles from './Wheel.module.scss';
import { PlayersContext } from '../../store/players-context';

const Wheel = () => {
  const playersCtx = useContext(PlayersContext);
  const players = playersCtx.players;

  // const players = generatePlayers(50);

  const totalSegments = players.length;
  const segmentTheta = 360 / totalSegments;
  function getTanFromDegrees(degrees: number) {
    return Math.tan((degrees * Math.PI) / 180);
  }
  const clipPathEdgePerc = 1 - getTanFromDegrees((90 - segmentTheta) / 2);
  const clipPathEdgePercStr = `${(clipPathEdgePerc * 100).toFixed(2)}%`;
  const clipPath = `polygon(0 0, ${clipPathEdgePercStr} 0, 100% 100%, 0 ${clipPathEdgePercStr})`;

  const generateRandomColor = (index: number) => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 100;
    let lightness;

    if (index % 2 === 0) {
      // Even index, lighter colors
      lightness = Math.floor(Math.random() * 11) + 90;
    } else {
      // Odd index, darker colors
      lightness = Math.floor(Math.random() * 36) + 25;
    }

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  useEffect(() => {
    const ws = new WebSocket('ws://10.5.1.105:8765');

    ws.onmessage = (event) => {
      console.log('Message received: ', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  // Spin the wheel
  const [visualDegree, setVisualDegree] = useState(0);
  const actualDegreeRef = useRef(0);

  const handleSpinWheel = () => {
    const minDegree = 360 * 3;
    const maxDegree = 360 * 10;
    const randomDegree =
      Math.floor(Math.random() * (maxDegree - minDegree + 1)) + minDegree;

    console.log(randomDegree);
    actualDegreeRef.current += randomDegree;
    const newVisualDegree = visualDegree - randomDegree;
    setVisualDegree(newVisualDegree);

    // Calculate the winning segment after 4 seconds (because of your 4s ease out transition)
    setTimeout(() => {
      const normalizedDegree = actualDegreeRef.current % 360;

      // Adjust the normalized degree to account for the needle starting at the middle of segment index 0
      const adjustedDegree = (normalizedDegree + segmentTheta / 2) % 360;

      const winningIndex = Math.floor(adjustedDegree / segmentTheta);
      const winner = players[winningIndex];

      console.log('Winner:', winner.name);
    }, 4000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.spinBtn}>
        <span onClick={handleSpinWheel}>Wheel of fortune</span>
      </div>
      <div className={styles.needle}>
        <span>winner</span>
      </div>
      <div
        className={styles.wheel}
        style={{ transform: `rotate(${visualDegree}deg)` }}
      >
        {players.map((player, index) => (
          <div
            key={player.id}
            className={styles.segment}
            style={
              {
                '--segment-index': index,
                '--total-segments': totalSegments,
                '--segment-color': generateRandomColor(index),
                '--clip-path': clipPath,
              } as React.CSSProperties
            }
          >
            <span className={styles.label}>{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wheel;
