import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({}); // Track field-specific errors
    const navigate = useNavigate();

    // Validate input fields
    const validateInputs = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Valid email is required';
        if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (phone && !/^\d{10}$/.test(phone)) newErrors.phone = 'Phone must be 10 digits';
        return newErrors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        const validationErrors = validateInputs();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({}); // Clear errors if validation passes

        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
                phone,
            });
            setMessage('Registration successful! Please check your email for the OTP.');
            setIsOtpSent(true);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!otp.trim()) {
            setMessage('OTP is required');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
            setMessage('OTP verified successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'OTP verification failed. Please try again.');
        }
    };

    return (
        <div className="register">
            <h2>{isOtpSent ? 'Verify OTP' : 'Register'}</h2>
            {!isOtpSent ? (
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <input
                        type="text"
                        placeholder="Phone (Optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                    <button type="submit">Register</button>
                </form>
            ) : (
                <form onSubmit={handleOtpVerification}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button type="submit">Verify OTP</button>
                </form>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Register;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './styles/Register.css';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [phone, setPhone] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP state
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setMessage('');

//         try {
//             // Register user and request OTP
//             await axios.post('http://localhost:5000/api/auth/register', {
//                 name,
//                 email,
//                 password,
//                 phone,
//             });

//             setMessage('Registration successful! Please check your email for the OTP.');
//             setIsOtpSent(true); // Move to OTP input state
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
//         }
//     };

//     const handleOtpVerification = async (e) => {
//         e.preventDefault();
//         setMessage('');

//         try {
//             // Verify OTP
//             await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });

//             setMessage('OTP verified successfully! Redirecting to login...');
//             // Redirect to login page after successful OTP verification
//             setTimeout(() => {
//                 navigate('/login');
//             }, 2000);
//         } catch (error) {
//             setMessage(error.response?.data?.message || 'OTP verification failed. Please try again.');
//         }
//     };

//     return (
//         <div className="register">
//             <h2>{isOtpSent ? 'Verify OTP' : 'Register'}</h2>
//             {!isOtpSent ? (
//                 <form onSubmit={handleRegister}>
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Phone (Optional)"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                     />
//                     <button type="submit">Register</button>
//                 </form>
//             ) : (
//                 <form onSubmit={handleOtpVerification}>
//                     <input
//                         type="text"
//                         placeholder="Enter OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         required
//                     />
//                     <button type="submit">Verify OTP</button>
//                 </form>
//             )}
//             {message && <p className="message">{message}</p>}
//         </div>
//     );
// };

// export default Register;


// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom'; // Import useNavigate
// // import './styles/Register.css';

// // const Register = () => {
// //     const [name, setName] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [phone, setPhone] = useState('');
// //     const [message, setMessage] = useState('');
// //     const navigate = useNavigate(); // Initialize useNavigate

// //     const handleRegister = async (e) => {
// //         e.preventDefault();
// //         setMessage('');

// //         try {
// //             await axios.post('http://localhost:5000/api/auth/register', {
// //                 name,
// //                 email,
// //                 password,
// //                 phone,
// //             });

// //             setMessage('Registration successful! Please log in.');
// //             // Redirect to login page after successful registration
// //             setTimeout(() => {
// //                 navigate('/login'); // Navigate to login page
// //             }, 2000); // Redirect after 2 seconds
// //         } catch (error) {
// //             setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
// //         }
// //     };

// //     return (
// //         <div className="register">
// //             <h2>Register</h2>
// //             <form onSubmit={handleRegister}>
// //                 <input
// //                     type="text"
// //                     placeholder="Name"
// //                     value={name}
// //                     onChange={(e) => setName(e.target.value)}
// //                     required
// //                 />
// //                 <input
// //                     type="email"
// //                     placeholder="Email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                 />
// //                 <input
// //                     type="password"
// //                     placeholder="Password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                 />
// //                 <input
// //                     type="text"
// //                     placeholder="Phone"
// //                     value={phone}
// //                     onChange={(e) => setPhone(e.target.value)}
// //                 />
// //                 <button type="submit">Register</button>
// //             </form>
// //             {message && <p className="message">{message}</p>}
// //         </div>
// //     );
// // };

// // export default Register;
