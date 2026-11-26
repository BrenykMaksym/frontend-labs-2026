import { createContext, useContext } from 'react';
import useTrafficLights from './useTrafficLights.js';

const TrafficLightsContext = createContext(null);

export function TrafficLightsProvider({ children }) {
  const traffic = useTrafficLights();
  return <TrafficLightsContext.Provider value={traffic}>{children}</TrafficLightsContext.Provider>;
}

export function useTrafficLightsContext() {
  const traffic = useContext(TrafficLightsContext);
  if (!traffic) throw new Error('TrafficLightsProvider is required');
  return traffic;
}
