// App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AdminPanel from './pages/AdminPanel';
// import DoctorSelection from './components/DoctorSelection';
// import AppointmentBooking from './components/AppointmentBooking';
// import AppointmentPreview from './components/AppointmentPreview'; // Import AppointmentPreview

// const App = () => {
//     return (
//         <Router>
//             <div>
//                 <Header />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/admin" element={<AdminPanel />} />
//                     <Route path="/doctor-selection" element={<DoctorSelection />} />
//                     <Route path="/appointment/:doctorId" element={<AppointmentBooking />} />
//                     <Route path="/appointment-preview" element={<AppointmentPreview />} /> {/* Add Route */}
//                 </Routes>
//                 <Footer />
//             </div>
//         </Router>
//     );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import DoctorSelection from './components/DoctorSelection';
import AppointmentBooking from './components/AppointmentBooking';
import AppointmentPreview from './components/AppointmentPreview';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    return (
        <Router>
            <div>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
                    <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
                    <Route path="/admin" element={isLoggedIn ? <AdminPanel /> : <Navigate to="/login" />} />
                    <Route path="/doctor-selection" element={isLoggedIn ? <DoctorSelection /> : <Navigate to="/login" />} />
                    <Route path="/appointment/:doctorId" element={isLoggedIn ? <AppointmentBooking /> : <Navigate to="/login" />} />
                    <Route path="/appointment-preview" element={isLoggedIn ? <AppointmentPreview /> : <Navigate to="/login" />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
