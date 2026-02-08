import React from "react";

export default function About() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About Our Online Examination Portal
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            A modern, secure, and scalable platform designed to simplify
            online examinations for students, teachers, and institutions.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The Online Examination Portal is a digital solution that enables
            educational institutions to conduct examinations efficiently
            through the internet. It replaces traditional paper-based exams
            with a secure, automated, and user-friendly online system that
            saves time, reduces errors, and improves transparency.
          </p>
        </div>

        {/* What is Online Examination */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            What is an Online Examination?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            An online examination is a method of evaluating candidates using
            computers or mobile devices connected to the internet. Questions
            are presented digitally, answers are submitted online, and results
            are evaluated automatically or by examiners, ensuring speed,
            accuracy, and fairness in assessment.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            How Does the Online Exam Portal Work?
          </h2>
          <ul className="space-y-4 text-gray-600 text-lg">
            <li>✅ Secure user registration and authentication</li>
            <li>✅ Exam scheduling and controlled access</li>
            <li>✅ Timed online examination with auto-submit</li>
            <li>✅ Automatic evaluation and result generation</li>
            <li>✅ Performance tracking and analytics</li>
          </ul>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Key Features of Our Platform
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600 text-lg">
            <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
              Secure login and role-based access
            </div>
            <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
              Multiple question formats (MCQ, descriptive)
            </div>
            <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
              Real-time exam monitoring & timer control
            </div>
            <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
              Instant results with detailed analytics
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our vision is to make online assessments reliable, accessible,
            and secure for everyone. We aim to empower educational institutions
            with modern tools that enhance learning outcomes and ensure
            fair evaluation in a digital environment.
          </p>
        </div>

      </div>
    </section>
  );
}
