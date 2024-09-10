import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Scheduling from '../pages/Client/Scheduling';
import AppointmentsList from '../pages/Client/AppointmentsList';
import ScheduleView from '../pages/Admin/ScheduleView';
import Home from '../pages/Home';
import BarberList from '../pages/Admin/BarberList';
import BarberForm from '../pages/Admin/BarberForm';
import ProtectedRoute from '../services/ProtectedRoute';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/schedule" element={<ProtectedRoute><Scheduling /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><AppointmentsList /></ProtectedRoute>} />
        <Route path="/admin/barbers" element={<ProtectedRoute><BarberList /></ProtectedRoute>} />
        <Route path="/admin/schedule" element={<ProtectedRoute><ScheduleView /></ProtectedRoute>} />
        <Route path="/admin/form" element={<ProtectedRoute><BarberForm /></ProtectedRoute>} />
        <Route path="/admin/edit/:id" element={<ProtectedRoute><BarberForm /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;