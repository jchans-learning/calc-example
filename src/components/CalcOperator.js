import React from "react";
import "./button-style.css";

function CalcOperator(props) {
  const { buttonText } = props;

  return (
    <div>
      <div>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 rounded md-css-adjust md:w-11 ">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default CalcOperator;
