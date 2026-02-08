export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand / About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">
            Online Examination Portal
          </h3>
          <p className="text-sm leading-relaxed">
            A secure and reliable platform to conduct online exams, 
            evaluate performance, and manage assessments efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Dashboard</li>
            <li className="hover:text-white cursor-pointer">Available Exams</li>
            <li className="hover:text-white cursor-pointer">My Attempts</li>
            <li className="hover:text-white cursor-pointer">Results</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Features
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Secure Online Exams</li>
            <li>Timed Assessments</li>
            <li>Instant Results</li>
            <li>Performance Analytics</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Exam Guidelines</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
          <p>
            © {new Date().getFullYear()} Online Examination Portal. All rights reserved.
          </p>
          <p className="text-gray-400">
            Designed for secure and smart assessments
          </p>
        </div>
      </div>
    </footer>
  );
}
