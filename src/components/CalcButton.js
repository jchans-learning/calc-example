import React from "react";
import "./button-style.css";

function CalcButton(props) {
  const {
    buttonNumStr,
    inputNumStr,
    setInputNumStr,
    lastArith,
    arithBtn,
    // calcProcess,
    isProcessed,
  } = props;

  return (
    <div>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 rounded md-css-adjust md:w-11"
        onClick={() => {
          // let checkLastItem = [...calcProcess].pop();
          // console.log(checkLastItem);
          if (isProcessed) {
            arithBtn(lastArith);
            setInputNumStr(buttonNumStr);
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
