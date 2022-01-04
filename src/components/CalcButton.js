import React from "react";
import "./button-style.css";

function CalcButton(props) {
  const {
    buttonNumStr,
    inputNumStr,
    setInputNumStr,
    lastArith,
    arithBtn,
    isProcessed,
    isError,
  } = props;

  return (
    <div>
      <button
        className="bg-gray-500 focus:bg-gray-700 text-white font-bold py-2 rounded md-css-adjust md:w-11"
        onClick={() => {
          if (isError) return;

          // 在運算後，如果沒有按運算紐直接按數字，預設使用上一次使用的運算子
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
