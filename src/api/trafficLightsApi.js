import { colors } from '../signals.js';

const API_URL = import.meta.env.VITE_TRAFFIC_LIGHTS_API_URL;

function endpoint() {
  if (!API_URL) throw new Error('Налаштуйте VITE_TRAFFIC_LIGHTS_API_URL.');
  const url = new URL(API_URL);
  if (url.origin !== 'https://script.google.com' || !url.pathname.endsWith('/exec')) {
    throw new Error('Потрібна адреса версійного розгортання GAS /exec.');
  }
  return url;
}

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const payload = await response.json();
  if (payload?.ok !== true || !payload.data) {
    throw new Error(payload?.error?.message ?? 'Неочікувана відповідь сервера.');
  }
  return payload.data;
}

export async function listTrafficLights(signal) {
  const url = endpoint();
  url.searchParams.set('action', 'list');
  const { trafficLights } = await request(url, { signal, cache: 'no-store' });
  if (!Array.isArray(trafficLights)) throw new Error('Сервер не повернув список сигналів.');
  return trafficLights;
}

export async function updateTrafficLightState(id, currentSignal) {
  const { trafficLight } = await request(endpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'updateState', id, currentSignal }),
  });
  if (trafficLight?.id !== id || !colors.includes(trafficLight.currentSignal)) {
    throw new Error('Сервер не підтвердив оновлений запис.');
  }
  return trafficLight;
}
