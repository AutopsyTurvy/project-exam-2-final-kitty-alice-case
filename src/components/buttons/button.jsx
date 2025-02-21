

// src/components/buttons/button.jsx

// Importing the button



import styles from "./button.module.css";

const Button = ({ children, onClick, variant = "button", className = "", style = {} }) => {
  return (
    <button className={`${styles[variant]} ${className}`} onClick={onClick} style={style}>
      {children}
    </button>
  );
};


export default Button;