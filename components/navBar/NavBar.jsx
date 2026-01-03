import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { navData } from "./navData";
import Logo from "/public/images/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const NavBar = () => {
  const { user, logout, loanData } = useAuth();
  const [windowHeight, setWindowHeight] = useState(0);
  const menus = useRef();
  const router = useRouter();

  const hidenMenu = () => {
    menus.current.classList.remove("show");
  };

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  const handleLogout = () => {
    logout();
    hidenMenu();
    router.push("/");
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    router.push("/user-profile");
    hidenMenu();
  };

  const handleProfileClickPay = (e) => {
    e.preventDefault();
    router.push("/user-profile?tab=applications");
    hidenMenu();
  };

  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

  return (
    <>
      {/* Updated CSS for the compact dropdown */}
      <style jsx>{`
        .profile-dropdown {
          min-width: 160px !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 8px;
          background-color: #ffffff !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 8px 0;
          margin-top: 8px !important;
          right: 0 !important;
          left: auto !important;
        }

        .profile-dropdown .dropdown-item {
          color: #4b5563;
          font-size: 14px;
          padding: 8px 16px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .profile-dropdown .dropdown-item:hover {
          background-color: #f3f4f6;
          color: #1e40af;
        }

        .profile-dropdown .dropdown-item.logout {
          color: #ef4444;
        }

        .profile-dropdown .dropdown-item.logout:hover {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .profile-dropdown .dropdown-divider {
          margin: 4px 0;
          border-color: #e5e7eb;
        }

        .profile-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1e40af;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .profile-toggle:hover {
          background-color: #f3f4f6;
        }
      `}</style>

      <header
        className={`header-section ${
          windowHeight > 50 && "header-fixed animated fadeInDown"
        }`}
      >
        <div className="overlay">
          <div className="container">
            <div className="row d-flex header-area">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" href="/" onClick={hidenMenu}>
                    <Image
                      src="/Logo_Color@4x.png"
                      alt="LoanOne Logo"
                      width={193}   // adjust these to a scaled size
                      height={26}   // adjust these to a scaled size
                    />
                </Link>
                <button
                  className="navbar-toggler collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbar-content"
                >
                  <i>
                    <FaBars />
                  </i>
                </button>
                <div
                  className="collapse navbar-collapse justify-content-end"
                  id="navbar-content"
                  ref={menus}
                >
                  <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                    {navData.map(({ itm, url, id, dropdown, dropdown_itms }, index) => {
                      return !dropdown ? (
                        <li key={index} className="nav-item" style={{ fontSize: '20px' }}>
                          <Link
                            className="nav-link"
                            aria-current="page"
                            href={url}
                            onClick={hidenMenu}
                          >
                            {itm}
                          </Link>
                        </li>
                      ) : (
                        <li key={index} className="nav-item dropdown main-navbar" style={{ fontSize: '20px' }}>
                          <Link
                            className="nav-link dropdown-toggle"
                            href="/"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                          >
                            {itm}
                          </Link>
                          <ul className="dropdown-menu main-menu shadow">
                            {dropdown_itms?.map(
                              ({ id, dp_itm, url, sbu_dropdown, sub_items }, index) =>
                                !sbu_dropdown ? (
                                  <li key={index}>
                                    <Link
                                      className="nav-link"
                                      href={url}
                                      onClick={hidenMenu}
                                      style={{fontSize:'16px'}}
                                    >
                                      {dp_itm}
                                    </Link>
                                  </li>
                                ) : (
                                  <li key={index} className="dropend sub-navbar">
                                    <Link
                                      href="/"
                                      className="dropdown-item dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      data-bs-auto-close="outside"
                                    >
                                      {dp_itm}
                                    </Link>
                                    <ul className="dropdown-menu sub-menu shadow">
                                      {sub_items?.map(({ id, url, sub_itm }, index) => (
                                        <li key={index}>
                                          <Link
                                            className="nav-link"
                                            href={url}
                                            onClick={hidenMenu}
                                          >
                                            {sub_itm}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                )
                            )}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Updated Profile Dropdown */}
                  <div className="right-area header-action d-flex align-items-center gap-3">
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                      {loanData && loanData.loan_disbursal_status && loanData.loan_disbursal_status == "disbursed" && loanData.loan_closed_status == "pending" && (
                          <li className="nav-item" style={{ fontSize: '20px' }}>
                              <Link
                                className="nav-link border border-dark p-2 rounded text-primary"
                                aria-current="page"
                                href="/user-profile"
                                onClick={handleProfileClickPay}
                              >
                                Pay Now
                              </Link>
                          </li>
                        )}
                    </ul>
                    {user ? (
                      <div className="nav-item dropdown">
                        <Link
                          href="#"
                          className="profile-toggle dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{color: '#2c3655', fontSize: '20px', fontWeight:'600'}}
                        >
                          <i className="bi bi-person-circle fs-5" style={{marginRight:'5px'}}></i>
                          Profile
                        </Link>
                        <ul className="dropdown-menu profile-dropdown">
                          <li>
                            <Link
                              className="dropdown-item"
                              href="/user-profile"
                              onClick={handleProfileClick}
                              style={{color:'#1e3a8a'}}
                            >
                              <i className="bi bi-person" style={{marginRight:'5px'}}></i>
                              Profile
                            </Link>
                          </li>
                          <li><hr className="dropdown-divider" /></li>
                          <li>
                            <button
                              className="dropdown-item logout"
                              onClick={handleLogout}
                            >
                              <i className="bi bi-box-arrow-right"></i>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href="/"
                        className="cmn-btn"
                        onClick={hidenMenu}
                      >
                        Apply Now
                      </Link>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;