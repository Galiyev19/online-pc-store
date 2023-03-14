import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from './store/store'
import { fetchCategories } from './store/slices/categorySlice';
import { fetchAllProducts } from './store/slices/allProductsSlice';


const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchCategories())
store.dispatch(fetchAllProducts())


root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);



