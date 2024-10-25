import React, { useState } from 'react';
import './Navbar.css';
import { FaSignInAlt, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                Empresta.ai <span className="by-toro">by Bruno</span>
            </div>

            <div className="hamburger-icon" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <li className="dropdown">
                    <span>Os Melhores</span>
                    <span className="dropdown-arrow">▼</span>
                </li>
                <li className="dropdown">
                    <span>Guias completos</span>
                    <span className="dropdown-arrow">▼</span>
                </li>
                <li className="dropdown">
                    <span>Ferramentas</span>
                    <span className="dropdown-arrow">▼</span>
                </li>
            </ul>

            <div className="navbar-actions">
                <FaSearch className="icon" />
                <button className="login-button">
                    <FaSignInAlt className="icon" /> Iniciar sessão
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
