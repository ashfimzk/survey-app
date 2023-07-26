import logo from './logo.svg';
import './App.css';
import Survey from './pages/survey/survey';
import { Routes,Route } from 'react-router-dom';
import EndPage from './pages/end/endPage';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Survey/>}/>
      <Route path='/end' element={<EndPage/>}/>
    </Routes>
    </>
  );
}

export default App;
