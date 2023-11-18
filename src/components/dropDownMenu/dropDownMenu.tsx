import "./dropDownMenu.styles.scss";
import { useState, useEffect, useRef } from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

type DropDownProps = {
  displayName: string;
};
export const DropdownMenu = ({ displayName }: DropDownProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  let menuRef = useRef<any>();

  useEffect(() => {
    let handler = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handler);
    } else {
      document.removeEventListener("mousedown", handler);
    }

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div ref={menuRef} className="dropdown">
      <div className="dropDown-button" onClick={toggleDropdown}>
        {displayName}
        <DehazeIcon
          sx={{
            fontSize: "28px",
            margin: "8px",
            alignItems: "center",
            marginTop: "15px",
          }}
        />
      </div>
      {/* Conditionally render the dropdown content based on state */}
      {isDropdownOpen && (
        <div className="dropdown-content">
          <Link className="menu-item" to="/myorders">
            <InsertDriveFileIcon />
            Orders
          </Link>
          <Link to="/logOut" className="menu-item">
            <ExitToAppIcon />
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};
