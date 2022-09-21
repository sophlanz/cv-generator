
import './saas/App.scss';
import CV from './components/CV';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Workstation from './components/Workstation';
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    
        <Routes>
            <Route path = "/" element={<Welcome/>}/>
            <Route path='/create-cv' element={<CV/>}/>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/workstation' element={<Workstation/>}/>
        </Routes>
      
    </div>
  );
};

export default App;