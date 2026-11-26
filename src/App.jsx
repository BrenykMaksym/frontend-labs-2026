import { BrowserRouter, Link, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import { TrafficLightsProvider } from './TrafficLightsContext.jsx';
import TrafficLightPage from './pages/TrafficLightPage.jsx';
import StatsPage from './pages/StatsPage.jsx';

function Layout() {
  return (
    <div className="shell">
      <nav className="nav" aria-label="Основна навігація">
        <NavLink to="/" end>Головна</NavLink>
        <NavLink to="/traffic-light">Світлофор</NavLink>
        <NavLink to="/stats">Статистика</NavLink>
      </nav>
      <main><Outlet /></main>
    </div>
  );
}

function Home() {
  return (
    <>
      <h1>Світлофор</h1>
      <section className="panel">
        <h2>Керування сигналами</h2>
        <p>Перемикайте сигнали вручну або запустіть автоматичний цикл. На сторінці статистики можна переглянути кількість ручних натискань і поточний стан.</p>
        <Link className="action link-action" to="/traffic-light">Відкрити світлофор</Link>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <>
      <h1>Сторінку не знайдено</h1>
      <Link className="action link-action" to="/">На головну</Link>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TrafficLightsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="traffic-light" element={<TrafficLightPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TrafficLightsProvider>
    </BrowserRouter>
  );
}
