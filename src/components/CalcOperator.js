import React from "react";
import "./button-style.css";

function CalcOperator(props) {
  const { buttonText, buttonFunc, setLastArith } = props;

  return (
    <div>
      <div>
        <button
          className="bg-gray-500 focus:bg-gray-700 text-white font-bold py-2 rounded md-css-adjust md:w-11 "
          onClick={() => {
            buttonFunc(buttonText);

            if (["+", "-", "*", "/"].includes(buttonText)) {
              setLastArith(buttonText);
            }
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default CalcOperator;
