import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import Navbar from './components/navbar';
import CreatePromotion from './pages/CreatePromotion';
import Waiting from './pages/Waiting';
import Bot from "./pages/Bot"
import PromotionCategories from './pages/PromotionCategories';
import PromotionView from './pages/Promotion';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {

  useEffect(() => {
    document.documentElement.classList.add('dark')
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, [])






  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path='user/:userId' element={<Home />} />
          <Route path='/user/:userId/create/:promotion' element={<CreatePromotion />} />
          <Route path='/user/:userId/promotion/:promotion' element={<PromotionCategories />} />
          <Route path='/user/:userId/promotion/:promotion/category/:category' element={<Promotions />} />
          <Route path='/user/:userId/promotion/:promotion/view/:id' element={<PromotionView />} />
          <Route path='/user/:userId/waiting' element={<Waiting />} />
          <Route path='/user/:userId/my-profile' element={<Profile />} />
          <Route path='/user/:userId/bot' element={<Bot />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;