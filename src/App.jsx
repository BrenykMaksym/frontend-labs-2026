import useTrafficLights from './useTrafficLights.js';
import TrafficControls from './components/TrafficControls.jsx';
import StatsBar from './components/StatsBar.jsx';

export default function App() {
  const traffic = useTrafficLights();

  return (
    <main className="shell">
      <h1>Світлофор</h1>
      <div className="grid">
        <section className="panel">
          <h2>Керування</h2>
          <TrafficControls {...traffic} />
        </section>
        <section className="panel">
          <h2>Ручні натискання</h2>
          <StatsBar counts={traffic.counts} />
        </section>
      </div>
    </main>
  );
}
