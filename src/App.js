
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import StocksOverView from './pages/stocksOverView';
import StockDetail from './pages/stockDetail';
import NotFound from './pages/notFound';
import NavBar from './components/navBar';
import Provier ,{useCtx}from './context/ctx';
import { useContext, useEffect } from 'react';

function App() {
 
  // useEffect(()=>console.log(val),[val.name]);
  
  return (
      <main className='container'>
        <Provier>
          <NavBar/>
          <Routes>
            <Route path='/' element={<StocksOverView/>}/>
            <Route path='/detail/:stock' element={<StockDetail/>}/>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Provier>
      </main>
  );
}

export default App;
