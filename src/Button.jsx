const Button = ({ buttonType }) => {
  return (
      <button className={buttonType}>
          {buttonType}
      </button>
  );
};

export default Button;