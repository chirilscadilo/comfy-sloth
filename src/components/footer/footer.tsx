import "./footer.styles.scss";
import CopyrightIcon from "@mui/icons-material/Copyright";

export const Footer = () => {
  return (
    <div className="footer-container">
      <h5 className="footer-text">
        <CopyrightIcon />
        <span>2023</span>
        <span className="footer-title">ComfySloth</span>
        <span>All rights reserved!</span>
      </h5>
    </div>
  );
};
