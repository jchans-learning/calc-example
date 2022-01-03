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
    isError,
    // setIsError,
  } = props;

  return (
    <div>
      <button
        className="bg-gray-500 focus:bg-gray-700 text-white font-bold py-2 rounded md-css-adjust md:w-11"
        onClick={() => {
          if (isError) return;
          // 避免 00 開頭的數字產生的錯誤。
          if (
            (inputNumStr + buttonNumStr).slice(0, 1) === "0" &&
            (inputNumStr + buttonNumStr).slice(1, 2) !== "." &&
            (inputNumStr + buttonNumStr).slice(1, 2) === "0"
          ) {
            setInputNumStr("0");
            return;
          }

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
