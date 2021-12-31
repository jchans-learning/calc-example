import React from "react";
import "./button-style.css";

function CalcButton(props) {
  const { buttonNumber } = props;

  return (
    <div>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 rounded md-css-adjust md:w-11">
        {buttonNumber}
      </button>
    </div>
  );
}

export default CalcButton;
