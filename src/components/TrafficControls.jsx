import OrientationSelect from './OrientationSelect.jsx';
import TrafficLights from './TrafficLights.jsx';
import { signalNames } from '../signals.js';

export default function TrafficControls({
  currentSignal, orientation, setOrientation, selectSignal, automatic, start, stop,
}) {
  return (
    <>
      <OrientationSelect orientation={orientation} onChange={setOrientation} />
      <TrafficLights orientation={orientation} currentSignal={currentSignal}
        onSelect={selectSignal} disabled={automatic} />
      <p>Поточний сигнал <strong>{signalNames[currentSignal]}</strong></p>
      <p>Режим <strong>{automatic ? 'Автоматичний' : 'Ручний'}</strong></p>
      <div className="actions">
        <button type="button" className="action" onClick={start} disabled={automatic}>Запустити</button>
        <button type="button" className="action" onClick={stop} disabled={!automatic}>Зупинити</button>
      </div>
    </>
  );
}
