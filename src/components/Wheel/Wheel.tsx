import { Box } from '@mui/material';
import styles from './Wheel.module.scss';
import { Player } from '../../models/player.model';

interface WheelProps {
  players: Player[];
}

const Wheel = ({ players }: WheelProps) => {
  const totalSegments = players.length;

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    const lightness = Math.floor(Math.random() * 100);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.spinBtn} />
      <div className={styles.wheel}>
        {players.map((player, index) => (
          <div
            key={player.id}
            className={styles.segment}
            style={
              {
                '--segment-pos': index + 1,
                '--total-segments': totalSegments,
                '--segment-color': generateRandomColor(),
              } as React.CSSProperties
            }
          >
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wheel;
