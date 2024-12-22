// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import './Header.css';

// const Header = () => {
//     return (
//         <header className="header">
//             <div className="logo">Healthcare App</div>
//             <nav>
//                 <ul className="nav-links">
//                     <li><Link to="/">Home</Link></li> {/* Use Link instead of anchor tag */}
//                     <li><Link to="/register">Register</Link></li>
//                     <li><Link to="/login">Login</Link></li>
//                     <li><Link to="/appointment-preview">Appointment Preview</Link></li> {/* Add link to Appointment Preview */}
//                 </ul>
//             </nav>
//         </header>
//     );
// };

// export default Header;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false); // Update the logged-in state
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="header">
            <div className="logo">Healthcare App</div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    {!isLoggedIn && <li><Link to="/register">Register</Link></li>}
                    {!isLoggedIn ? (
                        <li><Link to="/login">Login</Link></li>
                    ) : (
                        <>
                            <li><Link to="/appointment-preview">Appointment Preview</Link></li>
                            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
