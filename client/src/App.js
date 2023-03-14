import React, { useState } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';


//import Components
import Header from './components/HomeScreen/Header/Header';
import Footer from './components/HomeScreen/Footer/Footer';
import Home from './components/HomeScreen/Home';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import FavoriteProducts from './components/FavoriteProducts/FavoriteProducts';
import Profile from './components/Profile/Profile';
import FooterMobile from './components/HomeScreen/Footer/Footer_Mobile/FooterMobile';
import Catalog from "./components/Catalog/Catalog";
import SingleCategory from "./components/Catalog/SingleCategory/SingleCategory";
import SingleProduct from "./components/Catalog/SingleCategory/productGrid/SingleProduct/SingleProduct";
import Order from './components/Order/Order'

//import Style
import './App.css'


function App() {

  //FOR LIGHT OR DARK THEME
  const [bg, setBg] = useState(false)

  //HANDLE FOR LIGHT THEME
  const handleClickBgWhite = () => {
    setBg(false)
  }
  //HANDLE FOR DARK THEME
  const handleClickBgDark = () => {
    setBg(true)
  }



  return (
    <div className='app'>
      <BrowserRouter>
        <Header bg={bg} handleClickBgWhite={handleClickBgWhite} handleClickBgDark={handleClickBgDark} />
        <Routes>
          <Route path='/' element={<Home bg={bg} />} />
          <Route path='/shopping-cart' element={<ShoppingCart bg={bg} />} />
          <Route path='/favorite-products' element={<FavoriteProducts bg={bg} />} />
          <Route path='/profile' element={<Profile bg={bg} />} />
          <Route path="/catalog" element={<Catalog bg={bg} />} />
          <Route path="catalog/:category" element={<SingleCategory bg={bg} />} />
          <Route path="catalog/:category/:id" element={<SingleProduct bg={bg} />} />
          <Route path="/order" element={<Order bg={bg} />} />
        </Routes>
        <Footer />
        <FooterMobile />
      </BrowserRouter>
    </div>
  );
}

export default App;
