import React, { useContext } from 'react';

import styles from './Wheel.module.scss';
import { Player } from '../../models/player.model';
import { PlayersContext } from '../../store/players-context';

const generatePlayers = (numPlayers: number) => {
  const names = [
    'Alice',
    'Bob',
    'Charlie',
    'Dave',
    'Eve',
    'Frank',
    'Grace',
    'Heidi',
    'Ivan',
    'Judy',
    'Mallory',
    'Oscar',
    'Peggy',
    'Trent',
    'Walter',
    'Xavier',
    'Yvonne',
    'Zack',
    'Uma',
    'Victor',
  ];
  const generatedPlayers: Player[] = [];

  const generateId = () => {
    return Math.random().toString().slice(2, 9);
  };

  for (let i = 0; i < numPlayers; i++) {
    const name = names[i % names.length];
    const suffix = Math.floor(i / names.length);
    const playerName = suffix === 0 ? name : `${name} ${suffix}`;
    generatedPlayers.push({ id: generateId(), name: playerName });
  }

  return generatedPlayers;
};

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

  return (
    <div className={styles.container}>
      <div className={styles.spinBtn}>
        <span>Wheel of fortune</span>
      </div>
      <div className={styles.needle}>
        <span>winner</span>
      </div>
      <div className={styles.wheel}>
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
