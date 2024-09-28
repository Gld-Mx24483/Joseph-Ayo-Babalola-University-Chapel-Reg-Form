//Footer.jsx
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-navy bg-opacity-80 text-white py-4 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Follow us:</span>
          <a
            href="https://www.instagram.com/jabu.chapel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://facebook.com/jabu.chapel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <Facebook size={16} />
          </a>
        </div>
        <div className="text-center">
          Developed by{' '}
          <a
            href="https://www.linkedin.com/in/adedapo-toki-b3a277287"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            Adedapo Toki
          </a>
        </div>
        <Link href="/admin" passHref>
          <span className="text-gray-400 hover:text-white cursor-pointer transition duration-300">
            Admin
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
