// src/components/LoginSignupForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginSignupForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        address: '',
        dob: '',
        country: '',
        gender: '',
        termsAccepted: false
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin && !formData.termsAccepted) {
            alert("You must accept the terms and conditions");
            return;
        }

        try {
            const url = isLogin
                ? 'http://localhost:3000/login'
                : 'http://localhost:3000/signup';

            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    password: formData.password,
                    address: formData.address,
                    gender: formData.gender,
                    country: formData.country,
                    dob: formData.dob
                };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                alert(isLogin ? "Login successful!" : "Signup successful!");

                if (isLogin) {
                    // ✅ Directly store user data from response
                    dispatch(setUser({ user: data.user }));
                    navigate('/home');
                } else {
                    setFormData({
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                        address: '',
                        dob: '',
                        country: '',
                        gender: '',
                        termsAccepted: false
                    });
                    setIsLogin(true);
                    dispatch(setUser({ user: data.user }));
                    navigate('/home');
                }
            } else {
                alert(data.message || (isLogin ? "Login failed." : "Signup failed."));
            }
        } catch (error) {
            console.error(isLogin ? "Login error:" : "Signup error:", error);
            alert("Error connecting to server.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            className="w-full border p-2 rounded"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            className="w-full border p-2 rounded"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="w-full border p-2 rounded"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="date"
                            name="dob"
                            className="w-full border p-2 rounded"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="country"
                            className="w-full border p-2 rounded"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Country</option>
                            <option value="india">India</option>
                            <option value="usa">USA</option>
                            <option value="uk">UK</option>
                        </select>

                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleChange}
                                    required
                                />
                                <span>Male</span>
                            </label>
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleChange}
                                    required
                                />
                                <span>Female</span>
                            </label>
                        </div>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                            />
                            <span>I accept terms and conditions</span>
                        </label>
                    </>
                )}

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
                    {isLogin ? 'Login' : 'Signup'}
                </button>
            </form>

            <button
                className="mt-4 text-blue-500 underline"
                onClick={() => setIsLogin(!isLogin)}
            >
                {isLogin ? "Don't have an account? Signup" : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default LoginSignupForm;
