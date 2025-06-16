import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const userFromRedux = useSelector((state) => state.user.user);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Keep local state in sync with Redux
    useEffect(() => {
        setIsLoggedIn(!!userFromRedux);
    }, [userFromRedux]);

    const handleLogout = () => {
        dispatch(logoutUser());
        setIsLoggedIn(false);
        navigate('/'); // After logout, redirect to login page
    };

    const handleLogin = () => {
        navigate('/home');
    };

    return (
        <header className="flex justify-between items-center bg-gray-800 text-white p-4">
            <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                MyApp
            </h1>
            <div>
                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <span>Hello, {userFromRedux?.firstname}!</span>
                        <button
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
