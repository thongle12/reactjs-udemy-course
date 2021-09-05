import './App.css';
import productApi from './api/productApi';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import CounterFeature from './features/Counter';
import Header from 'components/Header';
import ProductFeature from 'features/Product';


function App() {
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productList = await productApi.getAll();
  //     console.log(productList);
  //   }

  //   fetchProducts();
  // }, [])

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={CounterFeature} exact /> 
        <Route path="/products" component={ProductFeature} /> 

      </Switch>
    </div>
  );
}

export default App;
