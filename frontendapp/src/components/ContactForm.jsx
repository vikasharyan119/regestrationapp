import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.warning('Please fill all fields!');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('https://signupbackend.azurewebsites.net/contact', {
                name: formData.name,
                email: formData.email,
                subject: 'Contact Form Submission',
                message: formData.message
            });

            toast.success(response.data.message || 'Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Contact form submission error:', error);
            toast.error('Failed to send message. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Message</label>
                    <textarea
                        name="message"
                        rows="5"
                        className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ContactForm;
