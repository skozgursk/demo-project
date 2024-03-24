import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './utils/route';
import { Loading } from './components';

function App() {
  return <>
    <RouterProvider router={router} fallbackElement={<><Loading /></>} />
  </>
}

export default App;
