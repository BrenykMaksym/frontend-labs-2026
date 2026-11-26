import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { listTrafficLights, updateTrafficLightState } from './api/trafficLightsApi.js';
import { colors } from './signals.js';
import useTrafficLights from './useTrafficLights.js';

const TrafficLightsContext = createContext(null);
const recordId = 'main';

export function TrafficLightsProvider({ children }) {
  const traffic = useTrafficLights();
  const { restoreSignal } = traffic;
  const [savedRecord, setSavedRecord] = useState(null);
  const [load, setLoad] = useState({ status: 'loading' });
  const [save, setSave] = useState({ status: 'idle' });
  const pendingRead = useRef(null);
  const saving = useRef(false);

  const reloadTrafficLights = useCallback(async () => {
    pendingRead.current?.abort();
    const controller = new AbortController();
    pendingRead.current = controller;
    setLoad({ status: 'loading' });
    try {
      const records = await listTrafficLights(controller.signal);
      const record = records.find(item => item.id === recordId);
      if (!colors.includes(record?.currentSignal)) throw new Error('Запис main відсутній або містить некоректний сигнал.');
      if (controller.signal.aborted) return;
      setSavedRecord(record);
      restoreSignal(record.currentSignal);
      setLoad({ status: 'success' });
    } catch (error) {
      if (!controller.signal.aborted) setLoad({ status: 'error', message: error.message });
    }
  }, [restoreSignal]);

  useEffect(() => {
    reloadTrafficLights();
    return () => pendingRead.current?.abort();
  }, [reloadTrafficLights]);

  async function saveCurrentSignal() {
    if (load.status !== 'success' || saving.current) return;
    saving.current = true;
    setSave({ status: 'saving' });
    try {
      setSavedRecord(await updateTrafficLightState(recordId, traffic.currentSignal));
      setSave({ status: 'success' });
    } catch (error) {
      setSave({ status: 'error', message: error.message });
    } finally {
      saving.current = false;
    }
  }

  return (
    <TrafficLightsContext.Provider value={{
      ...traffic, savedRecord, load, save, reloadTrafficLights, saveCurrentSignal,
    }}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

export function useTrafficLightsContext() {
  const traffic = useContext(TrafficLightsContext);
  if (!traffic) throw new Error('TrafficLightsProvider is required');
  return traffic;
}
