"use client";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
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
                Event Registration
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <a
              href="https://ntcogk.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#1E4E9A] transition-colors font-medium text-sm sm:text-base"
            >
              Main Website
            </a>
            <a
              href="https://ntcogk.org/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#E02020] transition-colors font-medium text-sm sm:text-base"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
