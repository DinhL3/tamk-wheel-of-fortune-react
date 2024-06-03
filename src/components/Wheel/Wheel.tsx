import styles from './Wheel.module.scss';

interface WheelProps {
  players: string[];
}

const Wheel = ({ players }: WheelProps) => {
  const numberOfSegments = players.length;

  const colors = Array.from({ length: numberOfSegments }, () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    const lightness = Math.floor(Math.random() * 100);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  });

  const segments = players.map((player, index) => {
    const angle = (360 / numberOfSegments) * index;
    const transform = `rotate(${angle}deg) skewY(${
      90 - 360 / numberOfSegments
    }deg)`;
    const labelTransform = `skewY(${-(
      90 -
      360 / numberOfSegments
    )}deg) rotate(75deg)`;

    const rightValue = `${900 / (numberOfSegments * 1.5)}px`;
    const fontSize = `${Math.max(8, 24 - numberOfSegments / 2)}px`;

    return (
      <div
        key={index}
        className={styles.segment}
        style={{ transform, backgroundColor: colors[index] }}
      >
        <span
          className={styles.label}
          style={{ transform: labelTransform, right: rightValue, fontSize }}
        >
          {numberOfSegments <= 40 ? player : index}
        </span>
      </div>
    );
  });

  return <div className={styles.wheel}>{segments}</div>;
};

export default Wheel;
