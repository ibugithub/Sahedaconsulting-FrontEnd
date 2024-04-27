import React from "react";
import { useRouter } from "next/navigation";
import handleLogout from "../utils/AuthLogout";

const DropdownMenu: React.FC<{ onLogoutClick: () => void }> = ({
  onLogoutClick,
}) => {
  const isAuthenticated = localStorage.getItem("accessToken") !== null;
  const router = useRouter();

  const handleLogoutClick = () => {
    onLogoutClick();
    handleLogout(router);
  };

  return (
    <ul className="dropdown">
      {isAuthenticated ? (
        <>
          <li className="dropdown-item">
            <a href="/profile" className="dropdown-link">
              My Profile
            </a>
          </li>
          <li className="dropdown-item">
            <a href="#" className="dropdown-link" onClick={handleLogoutClick}>
              Logout
            </a>
          </li>
        </>
      ) : (
        <>
          <li className="dropdown-item">
            <a href="/signin" className="dropdown-link">
              Sign In
            </a>
          </li>
          <li className="dropdown-item">
            <a href="/signup" className="dropdown-link">
              Sign Up
            </a>
          </li>
        </>
      )}
    </ul>
  );
};

export default DropdownMenu;
