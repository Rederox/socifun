import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#21243d] text-white py-4 px-6 w-full flex flex-col md:flex-row items-center justify-between">
      <p className="text-sm md:mb-0">
        &copy; {new Date().getFullYear()} SociFun. Tous droits réservés à
        Theivathan.
      </p>
      <nav>
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
          <li>
            <a href="#" className="hover:text-gray-300">
              Mentions légales
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Politique de confidentialité
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
