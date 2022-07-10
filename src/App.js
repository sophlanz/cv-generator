
import './saas/App.scss';
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from './components/Skills';
import Projects from './components/Projects';
function App() {
  return (
    <div className="App">
      <div className="paper">
        <About/>
        <Skills/>
        <Projects/>
        <Education/>
        <Experience/>
      </div>
        
    </div>
  );
}

export default App;
