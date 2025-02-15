/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const SendMessage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setSuccess(true);
            setFormData({ name: "", email: "", message: "" }); // Reset form
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            {success && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                    <p className="text-green-400 text-sm">Message sent successfully!</p>
                </div>
            )}
            {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-white"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
};

export default SendMessage;