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
import './language/language';
// import OrganizationPage from './pages/OrganizationPage';
import MyPromotion from './pages/MyPromotions';
import MyPromotionCategories from './pages/MyPromotionCategories';


import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
const App: React.FC = () => {

  useEffect(() => {
    document.documentElement.classList.add('dark')
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      // window.Telegram.WebApp.BackButton.show();


    }
  }, [])






  return (
    <Router>
      <ScrollToTop />
      <PrimeReactProvider>

        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path='user/:userId' element={<Home />} />
            <Route path='/user/:userId/create/:promotion' element={<CreatePromotion />} />
            <Route path='/user/:userId/promotion/:promotion' element={<PromotionCategories />} />
            <Route path='/user/:userId/promotion/:promotion/category/:category' element={<Promotions />} />
            <Route path='/user/:userId/promotion/:promotion/view/:id' element={<PromotionView />} />
            <Route path='/user/:userId/my-promotion-categories' element={<MyPromotionCategories />} />
            <Route path='/user/:userId/promotion/:promotion/my-promotion' element={<MyPromotion />} />
            <Route path='/user/:userId/waiting' element={<Waiting />} />
            <Route path='/user/:userId/my-profile' element={<Profile />} />
            <Route path='/user/:userId/bot' element={<Bot />} />
          </Route>
        </Routes>
      </PrimeReactProvider>
    </Router>
  );
};

export default App;