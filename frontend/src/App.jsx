import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import UserWrapper from './Wrapper/UserWrapper ';
import AdminWrapper from './Wrapper/AdminWrapper';
import { AuthProvider } from './Store/AuthContext';
import { miyagi } from 'ldrs';
miyagi.register();

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/admin/*" element={<AdminWrapper />} />
          <Route path="*" element={<UserWrapper />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
