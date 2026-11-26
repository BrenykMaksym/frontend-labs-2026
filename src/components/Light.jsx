import { signalNames } from '../signals.js';

export default function Light({ color }) {
  return <span className="light" data-color={color} role="img" aria-label={signalNames[color]} />;
}
