// src/pages/HomePage.jsx
import React from 'react';
import ContactForm from '../components/ContactForm';
import TravelBookingForm from '../components/TravelBookingForm';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Home Page</h1>
                <p className="text-gray-700">
                    Explore our services and feel free to reach out using the contact form below.
                </p>
            </div>
            {/* <ContactForm /> */}
            <TravelBookingForm />
        </div>
    );
};

export default HomePage;
