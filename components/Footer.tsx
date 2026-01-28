import React from 'react';
import { Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="careers" className="bg-estithmar-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        
        {/* Top CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-16 mb-16">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Ready to Invest in the Future?</h2>
            <p className="text-gray-400">Join us in shaping the vision of tomorrow.</p>
          </div>
          <button className="bg-white text-estithmar-navy px-8 py-4 rounded font-bold hover:bg-estithmar-gold transition-colors duration-300 flex items-center">
            Contact Investor Relations <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="text-estithmar-gold font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leadership</a></li>
              <li><a href="#" className="hover:text-white transition-colors">History</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-estithmar-gold font-bold mb-6 uppercase tracking-wider text-sm">Businesses</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Healthcare</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ventures</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contracting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-estithmar-gold font-bold mb-6 uppercase tracking-wider text-sm">Investors</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Share Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Financial Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Governance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IR Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-estithmar-gold font-bold mb-6 uppercase tracking-wider text-sm">Connect</h4>
             <div className="flex space-x-4 mb-6">
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-estithmar-gold hover:text-estithmar-navy transition-all">
                 <Linkedin className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-estithmar-gold hover:text-estithmar-navy transition-all">
                 <Twitter className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-estithmar-gold hover:text-estithmar-navy transition-all">
                 <Instagram className="w-5 h-5" />
               </a>
             </div>
             <p className="text-gray-500 text-xs">
               Doha, Qatar<br />
               Lusail City, Tower B<br />
               +974 4444 0000
             </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 border-t border-white/5 pt-8">
          <p>&copy; {new Date().getFullYear()} Estithmar Holding. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Whistleblowing Line</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
