import { signalNames } from '../signals.js';

export default function Light({ color, active, disabled, onSelect }) {
  const attributes = {
    className: 'light',
    'data-color': color,
    'aria-label': signalNames[color],
  };

  if (!onSelect) return <span {...attributes} role="img" />;

  return (
    <button {...attributes} type="button" aria-pressed={active} disabled={disabled}
      onClick={() => onSelect(color)} />
  );
}
