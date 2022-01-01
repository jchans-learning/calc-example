import React from "react";

function CalcHistoryBar(props) {
  const {
    calcHisElement,
    setCalcProcess,
    setInputNumStr,
    calcHistory,
    setCalcHistory,
    historyId,
    setIsProcessed,
  } = props;

  return (
    <form className="bg-orange-100 rounded px-3 pt-2 pb-2 m-1 flex place-content-between">
      <div
        className="block text-gray-700 text-sm font-bold text-right break-words mr-2"
        onClick={() => {
          console.log(historyId);
          let arr = [...calcHistory];
          arr.splice(historyId, 1);
          setCalcHistory(arr);
        }}
      >
        <span className="border-2 border-orange-800  px-1 pb-0.5">x</span>
      </div>
      <label
        className="flex-auto block text-gray-700 text-sm font-bold text-right break-words"
        onClick={() => {
          setCalcProcess(calcHisElement);
          setInputNumStr("");
          setIsProcessed(false);
        }}
      >
        {calcHisElement.join(" ")}
      </label>
    </form>
  );
}

export default CalcHistoryBar;
