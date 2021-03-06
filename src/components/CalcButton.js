import React from "react";
import "./button-style.css";

function CalcButton(props) {
  const {
    buttonNumStr,
    inputNumStr,
    setInputNumStr,
    setLastInputNumStr,
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

          // 避免 00 開頭的數字產生的錯誤。
          if (
            (inputNumStr + buttonNumStr).slice(0, 1) === "0" &&
            (inputNumStr + buttonNumStr).slice(1, 2) !== "." &&
            (inputNumStr + buttonNumStr).slice(1, 2) === "0"
          ) {
            setInputNumStr("0");
            return;
          }

          // 在運算後，如果沒有按運算紐直接按數字，預設使用上一次使用的運算子
          if (isProcessed) {
            arithBtn(lastArith);
            setInputNumStr(buttonNumStr);
            setLastInputNumStr(inputNumStr + buttonNumStr);
            return;
          }

          setInputNumStr(inputNumStr + buttonNumStr);
          setLastInputNumStr(inputNumStr + buttonNumStr);
        }}
      >
        {buttonNumStr}
      </button>
    </div>
  );
}

export default CalcButton;
