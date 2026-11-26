import TrafficControls from '../components/TrafficControls.jsx';
import { useTrafficLightsContext } from '../TrafficLightsContext.jsx';
import { signalNames } from '../signals.js';

export default function TrafficLightPage() {
  const traffic = useTrafficLightsContext();
  const { load, save, savedRecord, reloadTrafficLights, saveCurrentSignal } = traffic;

  return (
    <>
      <h1>Світлофор</h1>
      <div className="grid">
        <section className="panel">
          <h2>Керування</h2>
          <TrafficControls {...traffic} />
        </section>
        <section className="panel" aria-labelledby="server-heading">
          <h2 id="server-heading">Сигнал у Google Таблицях</h2>
          {load.status === 'loading' && <p role="status">Завантаження даних світлофора…</p>}
          {load.status === 'error' && (
            <>
              <p role="alert">Не вдалося завантажити збережений сигнал. {load.message}</p>
              <button className="action" type="button" onClick={reloadTrafficLights}>Повторити</button>
            </>
          )}
          {load.status === 'success' && (
            <>
              <p>Збережений сигнал <strong>{signalNames[savedRecord.currentSignal]}</strong></p>
              <button className="action" type="button" disabled={save.status === 'saving'}
                onClick={saveCurrentSignal}>Зберегти поточний сигнал</button>
              {save.status === 'saving' && <p role="status">Збереження…</p>}
              {save.status === 'success' && <p role="status">Збереження підтверджено.</p>}
              {save.status === 'error' && <p role="alert">Збереження не підтверджено. {save.message}</p>}
            </>
          )}
        </section>
      </div>
    </>
  );
}
