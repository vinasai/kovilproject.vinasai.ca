import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#FBEAE5] text-[#3E1F1F] py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Mission Section */}
        <div>
          <h2 className="font-bold text-lg">Sri Varasiththi Vinaayagar</h2>
          <p className="mt-2 text-sm">
            Our mission is to honor and preserve our Hindu heritage, cultivate a sense of responsibility and community within our congregation, and create a welcoming and familial atmosphere for all members.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-bold text-lg">Quick Links</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h2 className="font-bold text-lg">Connect</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Staff</a></li>
            <li><a href="#" className="hover:underline">Management</a></li>
            <li><a href="#" className="hover:underline">Reports</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h2 className="font-bold text-lg">Sign Up for Temple Newsletter</h2>
          <input
            type="text"
            placeholder="Enter your Name"
            className="mt-2 w-full p-2 rounded-md bg-[#C78D7C] text-white placeholder-white"
          />
          <input
            type="email"
            placeholder="Enter your e-mail ID"
            className="mt-2 w-full p-2 rounded-md bg-[#C78D7C] text-white placeholder-white"
          />
          <button className="mt-2 p-2 bg-[#C14331] rounded-full text-white">
            ▶
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#642A2A] text-white text-center py-4 mt-8">
        <p className="text-sm">© 2025 Sri Varasiththi Vinaayagar Hindu Temple Of Toronto | <a href="#" className="underline">Privacy policy</a></p> 
      </div>
    </footer>
  );
}

export default Footer;
