import "./butoon.styles.scss";

interface ButtonProps {
  children: React.ReactNode;
  buttonType: string;
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
