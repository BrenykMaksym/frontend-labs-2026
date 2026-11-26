import TrafficLights from './components/TrafficLights.jsx';

export default function App() {
  return (
    <main className="shell">
      <h1>Світлофор</h1>
      <div className="grid">
        <section className="panel">
          <h2>Вертикальний</h2>
          <TrafficLights />
        </section>
        <section className="panel">
          <h2>Горизонтальний</h2>
          <TrafficLights orientation="horizontal" />
        </section>
      </div>
    </main>
  );
}
