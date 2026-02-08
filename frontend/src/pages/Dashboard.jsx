import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      {/* ================= HERO SECTION (UNCHANGED) ================= */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center">

        {/* Decorative Background Blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT SECTION */}
          <div className="text-center md:text-left">
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold tracking-widest text-blue-700 bg-blue-100 rounded-full">
              ONLINE EXAMINATION PORTAL
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
              Smart & Secure <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Online Examination
              </span>
            </h1>

            <p className="mt-6 text-gray-600 max-w-lg mx-auto md:mx-0 text-base md:text-lg">
              Welcome{user?.name ? `, ${user.name}` : ""}!  
              Conduct exams, attempt tests securely, analyze performance, 
              and manage your academic progress — all in one place.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all">
                View Available Exams
              </button>
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-all">
                My Exam Attempts
              </button>
            </div>

            {/* Feature Cards */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-semibold text-gray-900 text-lg">⏱ Timed Exams</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Real-time countdown & auto submission
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-semibold text-gray-900 text-lg">📊 Analytics</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Detailed score & performance insights
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-semibold text-gray-900 text-lg">🔐 Secure</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Safe, monitored & cheat-resistant exams
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 to-purple-200/40 rounded-3xl blur-2xl"></div>
            <img
              src="src/assets/image/Dashboardimage.avif"
              alt="Online Examination Dashboard"
              className="relative w-full max-w-md md:max-w-lg xl:max-w-xl rounded-3xl shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Introduction */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Introduction to Online Examination Portal
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              An Online Examination Portal is a digital platform designed to conduct, manage,
              and evaluate examinations over the internet. It eliminates the need for physical
              exam centers, enabling institutions to conduct assessments efficiently, securely,
              and at scale.
            </p>
          </div>

          {/* What is Online Examination */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What is Online Examination?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Online examination is a method of assessing students using digital devices such as
              computers or mobile phones. Candidates can attempt exams remotely, and results are
              evaluated automatically, ensuring accuracy, transparency, and faster outcomes.
            </p>
          </div>

          {/* How It Works */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How Does an Online Exam Portal Work?
            </h2>
            <ul className="space-y-4 text-gray-600 text-lg">
              <li>✅ User registration and secure login</li>
              <li>✅ Exam selection and scheduling</li>
              <li>✅ Timed exam with auto-submit feature</li>
              <li>✅ Automatic evaluation and result generation</li>
              <li>✅ Performance analysis and reporting</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Features of an Online Test Platform
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
                Secure authentication & role management
              </div>
              <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
                Multiple question formats (MCQ, descriptive)
              </div>
              <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
                Real-time monitoring and timer control
              </div>
              <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
                Instant results and analytics dashboard
              </div>
            </div>
          </div>

          {/* How To Create */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How To Have Your Own Online Exam Portal?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To build an online examination portal, you need a secure backend, responsive frontend,
              question management system, authentication, and result analytics. Technologies such as
              React, Node.js, databases, and cloud services help create a scalable and reliable exam platform.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
