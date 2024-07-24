import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import Navbar from './components/navbar';
import CreatePromotion from './pages/CreatePromotion';
import Waiting from './pages/Waiting';
import Bot from "./pages/Bot"

const App: React.FC = () => {

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])






  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='/user/:userId' element={<Home />} />
          <Route path='/user/:userId/create/:promotion' element={<CreatePromotion />} />
          <Route path='/user/:userId/for-me/:promotion' element={<Promotions />} />
          <Route path='/user/:userId/waiting' element={<Waiting />} />
          <Route path='/user/:userId/bot' element={<Bot />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;