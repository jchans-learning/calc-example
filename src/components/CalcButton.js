import React from "react";
import "./button-style.css";

function CalcButton(props) {
  const { buttonNumStr, inputNumStr, setInputNumStr, isProcessed } = props;

  return (
    <div>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 rounded md-css-adjust md:w-11"
        onClick={() => {
          if (isProcessed) {
            return;
          }
          setInputNumStr(inputNumStr + buttonNumStr);
        }}
      >
        {buttonNumStr}
      </button>
    </div>
  );
}

export default CalcButton;
