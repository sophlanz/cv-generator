
import './saas/App.scss';
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from './components/Skills';
import Projects from './components/Projects';
import Modal from './components/Modal';
function App() {
  return (
    <div className="App">
      <div className="paper">
        <Modal/>
        <About/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Education/>
      </div>
    </div>
  );
};

export default App;
