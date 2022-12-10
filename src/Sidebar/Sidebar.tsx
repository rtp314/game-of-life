import Templates from './Templates/Templates';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Templates</h2>
      <p>Drag and drop a template on to the grid to see it in action.</p>
      <Templates />
    </div>
  );
}
