import { colors } from '../signals.js';
import Light from './Light.jsx';

export default function TrafficLights({ orientation = 'vertical' }) {
  return (
    <div className="traffic-lights" data-orientation={orientation} role="group" aria-label="Сигнали світлофора">
      {colors.map(color => <Light key={color} color={color} />)}
    </div>
  );
}
