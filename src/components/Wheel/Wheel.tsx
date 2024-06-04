import { Box } from '@mui/material';
import styles from './Wheel.module.scss';
import { Player } from '../../models/player.model';

interface WheelProps {
  players: Player[];
}

const Wheel = ({ players }: WheelProps) => {
  const totalSegments = players.length;
  const segmentTheta = 360 / totalSegments;
  function getTanFromDegrees(degrees: number) {
    return Math.tan((degrees * Math.PI) / 180);
  }
  const clipPathEdgePerc = 1 - getTanFromDegrees((90 - segmentTheta) / 2);
  const clipPathEdgePercStr = `${(clipPathEdgePerc * 100).toFixed(2)}%`;
  const clipPath = `polygon(0 0, ${clipPathEdgePercStr} 0, 100% 100%, 0 ${clipPathEdgePercStr})`;
  console.log(segmentTheta);
  console.log(clipPathEdgePerc);
  console.log(clipPathEdgePercStr);
  console.log(clipPath);

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
                '--segment-index': index,
                '--total-segments': totalSegments,
                '--segment-color': generateRandomColor(),
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
