"use client";
import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import "../../styles/navbar.css";
import logoImage from "../../assets/logo.jpg";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const clickOnAccount = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoutClick = () => {
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-items">
        <div className="left-nav-items">
          <Image src="https://th.bing.com/th/id/R.fd721f81cf12ebf7b3234c2c665b584c?rik=VX6HpLVptUIOMQ&riu=http%3a%2f%2fwww.freepnglogos.com%2fuploads%2fpokemon-symbol-logo-png-31.png&ehk=aSt1644QEFHVKT7thXmBsOPsr2lNpCODH4hF6OqUS5M%3d&risl=&pid=ImgRaw&r=0" alt="Logo" className="logo-image" width={20}
            height={20} />
          <a href="/" className="logo-text">
            Saheda Consultancy
          </a>
        </div>
        <div className="right-nav-items">
          <Link href="/services" className="navbar-item">
            Services
          </Link>
          <Link href="/uploadService" className="navbar-item">
            Upload
          </Link>
          <Link
            href="#"
            className="navbar-item"
            aria-haspopup="true"
            onClick={clickOnAccount}
          >
            Account
          </Link>
          {showDropdown && <DropdownMenu onLogoutClick={handleLogoutClick} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
