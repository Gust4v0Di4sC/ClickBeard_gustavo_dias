// App.js
import React from 'react';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <div>
      <AppRoutes/>  
      <ToastContainer autoClose={3000}/>
    </div>
  ) 
}

export default App;