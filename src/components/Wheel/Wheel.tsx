import React, { useContext, useEffect, useRef, useState } from 'react';

import styles from './Wheel.module.scss';
import { PlayersContext } from '../../store/players-context';
import {
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

const Wheel = () => {
  const [visualDegree, setVisualDegree] = useState<number>(0);

  const actualDegreeRef = useRef<number>(0);
  const [isWebMode, setIsWebMode] = useState<boolean>(true);
  const playersCtx = useContext(PlayersContext);
  const players = playersCtx.players;

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

  const handleSpinWheel = () => {
    const minDegree = 360 * 3;
    const maxDegree = 360 * 10;
    const randomDegree =
      Math.floor(Math.random() * (maxDegree - minDegree + 1)) + minDegree;

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

  const handleWheelModeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsWebMode(event.target.checked);
    if (event.target.checked) {
      setVisualDegree(0);
    }
  };

  useEffect(() => {
    let ws: WebSocket | null = null;

    if (!isWebMode) {
      ws = new WebSocket('ws://localhost:8765');

      ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.onmessage = (event) => {
        // convert string to number, then to degrees
        setVisualDegree(-Number(event.data) * (360 / 50));
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [isWebMode]);

  return (
    <div className={styles.container}>
      <div onClick={handleSpinWheel} className={styles.spinBtn}>
        <span>{isWebMode ? 'Spin' : 'Reset'}</span>
      </div>
      <div className={styles.needle}>
        <span>winner</span>
      </div>
      <FormGroup sx={{ position: 'absolute', top: 0, right: '-50px' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Embedded</Typography>
          <FormControlLabel
            control={
              <Switch checked={isWebMode} onChange={handleWheelModeChange} />
            }
            label="Web only"
          />
        </Stack>
      </FormGroup>
      <div
        className={`${styles.wheel} ${
          isWebMode ? styles.web : styles.embedded
        }`}
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
