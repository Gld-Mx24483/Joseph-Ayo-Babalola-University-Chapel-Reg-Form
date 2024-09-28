// NavStyles.js
export const navStyles = {
    nav: "fixed top-0 left-0 w-full z-20 p-4 bg-black bg-opacity-50",
    container: "container mx-auto",
    content: "flex items-center justify-between",
    logoContainer: "flex items-center space-x-4",
    logo: "cursor-pointer w-auto h-8 md:h-12",
    separator: "h-8 w-px bg-white mx-2 hidden md:block",
    desktopMenu: "hidden md:flex space-x-8",
    mobileMenuContainer: "md:hidden fixed top-[72px] left-0 w-full bg-black bg-opacity-90 z-10",
    mobileMenu: "flex flex-col items-center py-4 space-y-4",
  };
  
  export const NavLink = ({ href, text }) => (
    <a 
      href={href} 
      className="
        text-white 
        text-lg 
        font-semibold 
        relative 
        transition-all 
        duration-300 
        hover:text-gray-300
        after:content-[''] 
        after:absolute 
        after:w-full 
        after:h-0.5 
        after:bg-white 
        after:bottom-0 
        after:left-0 
        after:scale-x-0 
        after:origin-right 
        after:transition-transform 
        after:duration-300 
        hover:after:scale-x-100 
        hover:after:origin-left
        block
      "
    >
      {text}
    </a>
  );