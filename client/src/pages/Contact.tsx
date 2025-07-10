import { Mail, Phone, MapPin, ArrowLeft, Send } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Contact Us | AlgoVista";
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6 text-gray-800">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">

                {/* 🔙 Back to Home Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50 hover:shadow transition duration-200"
                >
                    <ArrowLeft size={18} />
                    <span className="font-medium">Back to Home</span>
                </button>

                {/* 💬 Heading */}
                <h1 className="text-3xl font-bold text-blue-700 mb-6">Contact Us</h1>
                <p className="text-gray-600 mb-8 text-sm">
                    Have feedback, suggestions, or issues? We’d love to hear from you!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* 📬 Contact Info */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Mail size={24} className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Email</p>
                                <a
                                    href="mailto:support@algovista.io"
                                    className="text-blue-600 hover:underline"
                                >
                                    support@algovista.io
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone size={24} className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Phone</p>
                                <p className="text-gray-700">+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin size={24} className="text-blue-600" />
                            <div>
                                <p className="font-semibold">Address</p>
                                <p className="text-gray-700">
                                    AlgoVista HQ, Bengaluru, Karnataka, India
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 📝 Contact Form */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full border rounded px-3 py-2 focus:outline-blue-500"
                        />
                        <textarea
                            rows={5}
                            placeholder="Your Message"
                            className="w-full border rounded px-3 py-2 focus:outline-blue-500 resize-none"
                        ></textarea>
                        <button
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            <Send size={16} />
                            Send Message
                        </button>
                        <p className="text-sm text-gray-500">
                            *(This is a static form — functionality not yet implemented)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
