
import './App.css';
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from './components/Skills';
function App() {
  return (
    <div className="App">
        <About/>
        <Skills/>
        <Education/>
        <Experience/>
    </div>
  );
}

export default App;
