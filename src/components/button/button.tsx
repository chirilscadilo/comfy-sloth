import "./butoon.styles.scss";
export enum ButtonTypes {
  Button = "button",
  Submit = "submit",
  Reset = "reset",
}

interface ButtonProps {
  children: React.ReactNode;
  buttonType: string;
  onClick?: () => void;
  type?: ButtonTypes;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  buttonType,
  ...otherProps
}) => {
  return (
    <button
      className={`button-container ${
        buttonType === "google" ? "google-sign-in" : "simple"
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
