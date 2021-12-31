import React from "react";
import "./button-style.css";

function CalcButton(props) {
  const { buttonNumStr, inputNumStr, setInputNumStr } = props;

  return (
    <div>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 rounded md-css-adjust md:w-11"
        onClick={() => {
          setInputNumStr(inputNumStr + buttonNumStr);
        }}
      >
        {buttonNumStr}
      </button>
    </div>
  );
}

export default CalcButton;
