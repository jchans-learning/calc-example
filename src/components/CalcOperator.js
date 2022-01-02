import React from "react";
import "./button-style.css";

function CalcOperator(props) {
  const { buttonText, buttonFunc, setLastArith } = props;

  return (
    <div>
      <div>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 rounded md-css-adjust md:w-11 "
          onClick={() => {
            console.log(buttonText);
            buttonFunc(buttonText);

            if (buttonText === "=") {
              console.log("I'ts equal!");
            } else {
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
