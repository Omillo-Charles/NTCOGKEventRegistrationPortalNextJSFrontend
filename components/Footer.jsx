"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 relative rounded-lg shadow-md bg-white p-1">
                <img
                  src="/mainLogo.png"
                  alt="NTCOG Kenya Logo"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-[#E02020]">NTCG</span>
                <span className="text-sm text-[#1E4E9A] block leading-tight font-medium">
                  Kenya
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              New Testament Church of God Kenya - Secure event registration platform for conferences, programs, and church events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://ntcogk.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1E4E9A] transition-colors text-sm"
                >
                  Main Website
                </a>
              </li>
              <li>
                <a
                  href="https://ntcogk.org/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1E4E9A] transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://ntcogk.org/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1E4E9A] transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://ntcogk.org/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1E4E9A] transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-[#1E4E9A] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@ntcogk.org</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-[#1E4E9A] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+254 759 120 222</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-[#1E4E9A] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Karen, Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} New Testament Church of God Kenya. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Secure payments powered by M-PESA and Stripe
          </p>
        </div>
      </div>
    </footer>
  );
}
