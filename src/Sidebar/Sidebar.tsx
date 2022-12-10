import { useState } from 'react';
import Templates from './Templates/Templates';
import './Sidebar.scss';

export default function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className={`sidebar ${openSidebar ? 'open' : ''}`}>
      <div className="open-sidebar">
        <button onClick={() => setOpenSidebar(prev => !prev)}>Open</button>
      </div>
      {openSidebar && (
        <div className="sidebar-content">
          <h2>Templates</h2>
          <p>Drag and drop a template on to the grid to see it in action.</p>
          <Templates />
        </div>
      )}
    </div>
  );
}
