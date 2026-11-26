import { useEffect, useState } from 'react';

const phases = [
  { color: 'red', duration: 3000 },
  { color: 'yellow', duration: 1200 },
  { color: 'green', duration: 2500 },
  { color: 'yellow', duration: 1200 },
];

export default function useTrafficLights() {
  const [phase, setPhase] = useState(0);
  const [counts, setCounts] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState('vertical');
  const [automatic, setAutomatic] = useState(false);

  useEffect(() => {
    if (!automatic) return;

    const timer = setTimeout(() => {
      setPhase((phase + 1) % phases.length);
    }, phases[phase].duration);

    return () => clearTimeout(timer);
  }, [automatic, phase]);

  function selectSignal(color) {
    if (automatic) return;
    setPhase(phases.findIndex(phase => phase.color === color));
    setCounts(previous => ({ ...previous, [color]: previous[color] + 1 }));
  }

  function start() {
    setPhase(0);
    setAutomatic(true);
  }

  function stop() {
    setAutomatic(false);
  }

  return {
    currentSignal: phases[phase].color,
    counts, orientation, automatic, selectSignal, setOrientation, start, stop,
  };
}
