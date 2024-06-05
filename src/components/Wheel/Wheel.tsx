import React, { useContext, useEffect, useState } from 'react';

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
  const [degree, setDegree] = useState(0);

  const spinWheel = () => {
    const minDegree = 360;
    const maxDegree = 3600;
    const randomDegree = Math.floor(Math.random() * (maxDegree - minDegree + 1)) + minDegree;
    setDegree(prevDegree => prevDegree + randomDegree);
  }

  // Landing segment not working yet

  /*
  const getLandingSegment = () => {
    // Normalize degree to be within [0, 360)
    let normalizedDegree = degree % 360;
    if (normalizedDegree < 0) {
      normalizedDegree += 360;
    }

    // Calculate which segment the needle is pointing to
    let landingIndex = Math.floor(normalizedDegree / segmentTheta);

    // Adjust landingIndex to match array bounds
    landingIndex = landingIndex % totalSegments;
    if (landingIndex < 0) {
      landingIndex += totalSegments;
    }

    // Return the corresponding player from players array
    return players[landingIndex];
  };
*/


  return (
    <div className={styles.container}>
      <div className={styles.spinBtn}>
        <span onClick={spinWheel}>Wheel of fortune</span>
      </div>
      <div className={styles.needle}>
        <span>winner</span>
      </div>
      <div className={styles.wheel} style={{ transform: `rotate(${degree}deg)` }}>
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
      <div style ={{
        position: 'absolute',
        top: 0,
        left: 200
      }}>
        <h1>Winner: {getLandingSegment().name}</h1>
      </div>
    </div>
  );
};

export default Wheel;
