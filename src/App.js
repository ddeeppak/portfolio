import { useEffect } from 'react';
import './App.css';

import Background from './components/animation/Background';
import Name from './components/animation/Name';
import Skills from './components/animation/Skills';

function App() {
  useEffect(() => {
    window.alert("Under Construction");
  }, []);
  return (
    <div className="App">
      <div className="Background">
        <Background />
      </div>
      <div className="Layout">
        <div className="Profile">
          <Name />
        </div>
        <div className="ProfileName">
          <p>Itachi Uchiha</p>
        </div>
        <div className="Animation"></div>
        <div className="Skills">
          <Skills />
        </div>
        <div className="Contact">VIDEO AND MESSAGE</div>
        <div className="Projects">WORK</div>
        <div className="ProjectsColumn">Projects</div>
        <div className="ProjectsColumn">Projects</div>
      </div>
    </div>
  );
}

export default App;
