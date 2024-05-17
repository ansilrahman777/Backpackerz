import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import UserWrapper from './Wrapper/UserWrapper ';
import AdminWrapper from './Wrapper/AdminWrapper';
import { miyagi } from 'ldrs'
miyagi.register()

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<UserWrapper />} />
        <Route path="/admin/*" element={<AdminWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
