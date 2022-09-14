
import './saas/App.scss';
import CV from './components/CV';
import Register from './components/Register';
import Welcome from './components/Welcome';
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    
        <Routes>
            <Route path = "/" element={<Welcome/>}/>
            <Route path='/create-cv' element={<CV/>}/>
            <Route path='/register' element={<Register/>} />
        </Routes>
      
    </div>
  );
};

export default App;
