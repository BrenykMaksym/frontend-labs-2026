export default function OrientationSelect({ orientation, onChange }) {
  return (
    <label className="field">
      Орієнтація
      <select value={orientation} onChange={event => onChange(event.target.value)}>
        <option value="vertical">Вертикальна</option>
        <option value="horizontal">Горизонтальна</option>
      </select>
    </label>
  );
}
