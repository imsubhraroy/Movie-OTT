import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

import ContentWrapper from "../ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchDesktop, setShowSearchDesktop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      setShow("show");
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
  };

  const openSearchDesktop = () => {
    setShowSearchDesktop(!showSearchDesktop);
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };

  const searchQueryHandle = (e) => {
    if (e.key === "Enter" && query?.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }

    setMobileMenu(false);
  };

  return (
    <>
      <header
        className={`header p-2 fixed w-full h-[60px]  flex items-center z-10 ${
          mobileMenu ? "mobileView" : ""
        } ${show}`}
      >
        <ContentWrapper className="flex justify-between items-center mt-0 mb-0 ml-auto mr-auto pt-0 pb-0 px-2 md:px-4">
          <div
            className="logo cursor-pointer"
            onClick={() => {
              setMobileMenu(false);
              navigate("/");
            }}
          >
            <img src={logo} alt="Movix" />
          </div>
          <ul className="menuItems list-none hidden items-center md:flex">
            <li
              className="menuItem h-[60px] flex items-center font-medium text-white relative cursor-pointer mt-0 mb-0 ml-[15px] mr-[15px]"
              onClick={() => {
                navigationHandler("movie");
              }}
            >
              Movies
            </li>
            <li
              className="menuItem h-[60px] flex items-center font-medium text-white relative cursor-pointer mt-0 mb-0 ml-[15px] mr-[15px]"
              onClick={() => {
                navigationHandler("tv");
              }}
            >
              TV Shows
            </li>
            {showSearchDesktop && (
              <li>
                <input
                  type="text"
                  placeholder="Search..."
                  className="h-7 rounded-lg p-1 text-gray-600 left-2 outline-0 border-0"
                />
              </li>
            )}
            <li className="menuItem h-[60px] flex items-center font-medium text-white relative cursor-pointer mt-0 mb-0 ml-[15px] mr-[15px]">
              <HiOutlineSearch onClick={openSearchDesktop} />
            </li>
          </ul>

          <div className="mobileMenuItems flex items-center gap-5 md:hidden text-white text-[18px]">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? (
              <VscChromeClose
                onClick={() => {
                  setMobileMenu(false);
                }}
              />
            ) : (
              <SlMenu onClick={openMobileMenu} />
            )}
          </div>
        </ContentWrapper>
        {showSearch && (
          <div className="searchBar w-full h-[60px] bg-white absolute top-[60px] ">
            <ContentWrapper>
              <div className="flex items-center w-full h-[40px] mt-[10px]">
                <input
                  className="w-[90%] h-[40px] bg-white outline-0 border-0 text-[14px] rounded-l-3xl pt-0 pb-0 pl-[15px] pr-[15px]  md:h-[45px] md:text-[20px] md:pt-0 md:pb-0 md:pl-[30px] md:pr-[30px] text-gray-600"
                  type="text"
                  placeholder="Search for a movie or tv show.. "
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  onKeyUp={searchQueryHandle}
                />
                <VscChromeClose
                  onClick={() => {
                    setShowSearch(false);
                  }}
                />
              </div>
            </ContentWrapper>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
