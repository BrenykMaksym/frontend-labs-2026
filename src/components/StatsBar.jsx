import { colors, signalNames } from '../signals.js';

export default function StatsBar({ counts }) {
  const total = colors.reduce((sum, color) => sum + counts[color], 0);

  return (
    <dl className="stats">
      {colors.map(color => (
        <div key={color}><dt>{signalNames[color]}</dt><dd>{counts[color]}</dd></div>
      ))}
      <div><dt>Усього</dt><dd>{total}</dd></div>
    </dl>
  );
}
