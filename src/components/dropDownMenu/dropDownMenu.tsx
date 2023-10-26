import "./dropDownMenu.styles.scss";
import { useState, useEffect, useRef } from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ModalWindow } from "../modalWindow/modalWIndw";
import { useAppDispatch } from "../../hooks/hooks";
import { removeUser } from "../../store/reducers/UserSlice";

type DropDownProps = {
  displayName: string;
};
export const DropdownMenu = ({ displayName }: DropDownProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let menuRef = useRef<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let handler = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setOpenModal(false);
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

  const handleRemoveUSer = () => {
    dispatch(removeUser());
    setOpenModal(false);
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
          <a className="menu-item" href="">
            <PermIdentityIcon />
            Account
          </a>
          <a
            href=""
            onClick={(event) => event.preventDefault()}
            className="menu-item"
          >
            <ExitToAppIcon />

            <div className="open-model">
              <button
                className="open-model-btn"
                onClick={() => setOpenModal(true)}
              >
                Logout
              </button>
              {openModal && (
                <ModalWindow
                  handleClose={() => setOpenModal(false)}
                  handleRemoveUSer={handleRemoveUSer}
                ></ModalWindow>
              )}
            </div>
          </a>
        </div>
      )}
    </div>
  );
};
