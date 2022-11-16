import './App.css';
import Menu from './components/template/Menu';
//import Main from './components/template/Main';
//import CrudAluno from './components/CrudAluno/CrudAluno';
import Rotas from './Rotas';
import { BrowserRouter } from 'react-router-dom';
export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Rotas />
      </div>

    </BrowserRouter>
  );
  }