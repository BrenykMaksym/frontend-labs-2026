import { useState } from 'react';
import TrafficLights from './components/TrafficLights.jsx';
import OrientationSelect from './components/OrientationSelect.jsx';
import StatsBar from './components/StatsBar.jsx';
import { signalNames } from './signals.js';

export default function App() {
  const [currentSignal, setCurrentSignal] = useState('red');
  const [counts, setCounts] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState('vertical');

  function selectSignal(color) {
    setCurrentSignal(color);
    setCounts(previous => ({ ...previous, [color]: previous[color] + 1 }));
  }

  return (
    <main className="shell">
      <h1>Світлофор</h1>
      <div className="grid">
        <section className="panel">
          <h2>Керування</h2>
          <OrientationSelect orientation={orientation} onChange={setOrientation} />
          <TrafficLights orientation={orientation} currentSignal={currentSignal} onSelect={selectSignal} />
          <p>Поточний сигнал <strong>{signalNames[currentSignal]}</strong></p>
        </section>
        <section className="panel">
          <h2>Ручні натискання</h2>
          <StatsBar counts={counts} />
        </section>
      </div>
    </main>
  );
}
