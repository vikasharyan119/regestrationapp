import React, { useState } from 'react';

const TravelBookingForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        passportNumber: '',
        departureCountry: '',
        destinationCountry: '',
        travelDate: '',
        returnDate: '',
        travelType: 'One Way',
        travelers: 1,
        travelClass: 'Economy',
        specialRequests: '',
        mealPreference: 'Vegetarian',
        addOns: {
            travelInsurance: false,
            airportPickup: false,
        },
        paymentMethod: 'Credit Card',
    });
    const [submittedData, setSubmittedData] = useState(null);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'travelInsurance' || name === 'airportPickup') {
            setFormData((prev) => ({
                ...prev,
                addOns: {
                    ...prev.addOns,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'number' ? parseInt(value) : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedAddOns = Object.entries(formData.addOns)
            .filter(([, isSelected]) => isSelected)
            .map(([key]) => key);

        const submissionData = {
            ...formData,
            addOns: selectedAddOns,
        };

        try {
            const response = await fetch('https://signupbackend.azurewebsites.net/travel-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                setSubmittedData(result.booking);
                console.log("Returned booking:", result.booking);

                // Reset the form
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    passportNumber: '',
                    departureCountry: '',
                    destinationCountry: '',
                    travelDate: '',
                    returnDate: '',
                    travelType: 'One Way',
                    travelers: 1,
                    travelClass: 'Economy',
                    specialRequests: '',
                    mealPreference: 'Vegetarian',
                    addOns: {
                        travelInsurance: false,
                        airportPickup: false,
                    },
                    paymentMethod: 'Credit Card',
                });
            } else {
                alert(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('An error occurred. Please try again.');
        }
    };



    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl space-y-6"
            >
                <h2 className="text-4xl font-bold text-center text-blue-600 mb-4">Travel Booking Form</h2>

                {/* Full Name */}
                <div>
                    <label className="block font-medium mb-1">Full Name</label>
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-md"
                    />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-md"
                        />
                    </div>
                </div>

                {/* Passport */}
                <div>
                    <label className="block font-medium mb-1">Passport Number</label>
                    <input
                        name="passportNumber"
                        value={formData.passportNumber}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-md"
                    />
                </div>

                {/* Country Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Departure Country</label>
                        <input
                            name="departureCountry"
                            value={formData.departureCountry}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Destination Country</label>
                        <input
                            name="destinationCountry"
                            value={formData.destinationCountry}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-md"
                        />
                    </div>
                </div>

                {/* Travel Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Travel Date</label>
                        <input
                            type="date"
                            name="travelDate"
                            value={formData.travelDate}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Return Date</label>
                        <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-md"
                        />
                    </div>
                </div>

                {/* Travel Type */}
                <div>
                    <label className="block font-medium mb-1">Travel Type</label>
                    <div className="flex gap-4 mt-1">
                        {['One Way', 'Round Trip'].map((type) => (
                            <label key={type} className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="travelType"
                                    value={type}
                                    checked={formData.travelType === type}
                                    onChange={handleChange}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Travelers & Class */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Number of Travelers</label>
                        <input
                            type="number"
                            name="travelers"
                            min="1"
                            value={formData.travelers}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Class</label>
                        <select
                            name="travelClass"
                            value={formData.travelClass}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-md"
                        >
                            <option>Economy</option>
                            <option>Business</option>
                            <option>First Class</option>
                        </select>
                    </div>
                </div>

                {/* Meal Preference */}
                <div>
                    <label className="block font-medium mb-1">Meal Preference</label>
                    <div className="flex gap-4 mt-1">
                        {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'No Meal'].map((option) => (
                            <label key={option} className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="mealPreference"
                                    value={option}
                                    checked={formData.mealPreference === option}
                                    onChange={handleChange}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Add-ons */}
                <div>
                    <label className="block font-medium mb-1">Add-ons</label>
                    <div className="flex gap-6 mt-1">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="travelInsurance"
                                checked={formData.addOns.travelInsurance}
                                onChange={handleChange}
                            />
                            Travel Insurance
                        </label>
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="airportPickup"
                                checked={formData.addOns.airportPickup}
                                onChange={handleChange}
                            />
                            Airport Pickup
                        </label>
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <label className="block font-medium mb-1">Payment Method</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-md"
                    >
                        <option>Credit Card</option>
                        <option>Debit Card</option>
                        <option>UPI</option>
                        <option>PayPal</option>
                    </select>
                </div>

                {/* Special Requests */}
                <div>
                    <label className="block font-medium mb-1">Special Requests</label>
                    <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
                >
                    Submit Booking
                </button>
            </form>
            {submittedData && (
                <div className="mt-10 bg-green-50 p-6 rounded shadow-md border border-green-300">
                    <h3 className="text-xl font-bold mb-4 text-green-800">Booking Submitted Successfully</h3>
                    <ul className="space-y-2 text-gray-800">
                        {Object.entries(submittedData).map(([key, value]) => (
                            <li key={key}>
                                <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}: </strong>
                                {Array.isArray(value)
                                    ? value.join(', ')
                                    : typeof value === 'object' && value !== null
                                        ? JSON.stringify(value)
                                        : value?.toString()}
                            </li>
                        ))}

                    </ul>
                </div>
            )}
        </>
    );
};

export default TravelBookingForm;
