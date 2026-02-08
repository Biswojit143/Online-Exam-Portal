// src/pages/Contact.jsx
import React from "react";
import { FiMail, FiPhone, FiClock, FiUser, FiMessageSquare } from "react-icons/fi";

export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

       {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Get in Touch
            </h2>

            <p className="text-gray-600 text-lg">
              Our support team assists students and educators with
              exam-related queries, portal access, and technical issues.
            </p>

            <div className="space-y-5 text-gray-700 text-lg">
              <div className="flex items-center gap-4">
                <FiMail className="text-blue-600 text-2xl" />
                <span>support@onlineexamportal.com</span>
              </div>

              <div className="flex items-center gap-4">
                <FiPhone className="text-blue-600 text-2xl" />
                <span>+91-XXXXXXXXXX</span>
              </div>

              <div className="flex items-center gap-4">
                <FiClock className="text-blue-600 text-2xl" />
                <span>Mon – Fri, 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-4 text-gray-400" />
                  <textarea
                    rows="4"
                    placeholder="Write your message here..."
                    className="w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
