import TrafficControls from '../components/TrafficControls.jsx';
import { useTrafficLightsContext } from '../TrafficLightsContext.jsx';

export default function TrafficLightPage() {
  const traffic = useTrafficLightsContext();

  return (
    <>
      <h1>Світлофор</h1>
      <section className="panel">
        <h2>Керування</h2>
        <TrafficControls {...traffic} />
      </section>
    </>
  );
}
