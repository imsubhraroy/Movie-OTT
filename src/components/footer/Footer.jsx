import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../ContentWrapper";

const Footer = () => {
    return (
        <footer className="footer bg-[#020c1b] pt-[50px] pb-[50px] text-white relative p-2">
            <ContentWrapper className="flex flex-col items-center mt-0 mb-0 ml-auto mr-auto pt-0 pb-0 px-2 md:px-4">
                <ul className="menuItems list-none flex items-center justify-center gap-[15px] mb-5 md:mb-[30px] md:gap-[30px]">
                    <li className="menuItem cursor-pointer text-[12px] md:text-[16px] hover:text-[#da2f68]">Terms Of Use</li>
                    <li className="menuItem cursor-pointer text-[12px] md:text-[16px] hover:text-[#da2f68]">Privacy-Policy</li>
                    <li className="menuItem cursor-pointer text-[12px] md:text-[16px] hover:text-[#da2f68] transition-all duration-300 ease-in-out">About</li>
                    <li className="menuItem cursor-pointer text-[12px] md:text-[16px] hover:text-[#da2f68] transition-all duration-300 ease-in-out">Blog</li>
                    <li className="menuItem cursor-pointer text-[12px] md:text-[16px] hover:text-[#da2f68] transition-all duration-300 ease-in-out">FAQ</li>
                </ul>
                <div className="infoText text-xs leading-5 opacity-50 text-center max-w-screen-md mb-5 md:text-sm md:mb-7">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="socialIcons flex items-center justify-center gap-[10px]">
                    <span className="icon w-12 h-12 rounded-full bg-[#04152d] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-[#da2f68] hover:text-[#da2f68]">
                        <FaFacebookF />
                    </span>
                    <span className="icon w-12 h-12 rounded-full bg-[#04152d] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-[#da2f68] hover:text-[#da2f68]">
                        <FaInstagram />
                    </span>
                    <span className="icon w-12 h-12 rounded-full bg-[#04152d] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-[#da2f68] hover:text-[#da2f68]">
                        <FaTwitter />
                    </span>
                    <span className="icon w-12 h-12 rounded-full bg-[#04152d] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-[#da2f68] hover:text-[#da2f68]">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;