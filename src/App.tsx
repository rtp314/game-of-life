import './App.scss';
import Game from './Game/Game';
import Sidebar from './Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="layout">
        <Sidebar />
        <Game />
      </div>
    </div>
  );
}

export default App;
