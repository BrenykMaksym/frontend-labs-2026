import StatsBar from '../components/StatsBar.jsx';
import { useTrafficLightsContext } from '../TrafficLightsContext.jsx';
import { signalNames } from '../signals.js';

export default function StatsPage() {
  const { counts, currentSignal, automatic, orientation } = useTrafficLightsContext();

  return (
    <>
      <h1>Статистика</h1>
      <div className="grid">
        <section className="panel">
          <h2>Ручні натискання</h2>
          <StatsBar counts={counts} />
        </section>
        <section className="panel">
          <h2>Стан світлофора</h2>
          <dl className="stats">
            <div><dt>Сигнал</dt><dd>{signalNames[currentSignal]}</dd></div>
            <div><dt>Режим</dt><dd>{automatic ? 'Автоматичний' : 'Ручний'}</dd></div>
            <div><dt>Орієнтація</dt><dd>{orientation === 'vertical' ? 'Вертикальна' : 'Горизонтальна'}</dd></div>
          </dl>
        </section>
      </div>
    </>
  );
}
