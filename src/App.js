import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import CalcButton from "./components/CalcButton";
import CalcOperator from "./components/CalcOperator";

import "./App.css";

function App() {
  const [dragDisable, setDragDisable] = useState(true);
  const [inputNumStr, setInputNumStr] = useState("");
  const [calcProcess, setCalcProcess] = useState([]);
  const [isProcessed, setIsProcessed] = useState(false);

  // TODO: 自己想做的: 之前計算的紀錄
  // const [calcHistory, setCalcHistory] = useState([]);
  // console.log(calcProcess);

  // 確認視窗大小來決定一開啟畫面的時候，計算機是否可拖拉，目前設定判斷點為 768px
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setDragDisable(false);
    } else {
      setDragDisable(true);
    }
    return dragDisable;
  }, [dragDisable]);

  // 按鍵功能設定
  // C 鍵功能
  const clearInputStr = () => setInputNumStr("");

  // 退位鍵，刪除輸入的一碼數字或者算式裡的一個數字或一個運算子
  const deleteOneNumChar = () => {
    if (Number(inputNumStr) !== 0) {
      setInputNumStr(inputNumStr.slice(0, -1));
    } else {
      if (calcProcess.length === 0) {
        setIsProcessed(false);
        return;
      }
      console.log(calcProcess);
      let arr = [...calcProcess];
      arr.pop();
      setCalcProcess(arr);
    }
  };

  // AC 鍵功能
  const allClear = () => {
    setInputNumStr("");
    setCalcProcess([]);
    setIsProcessed(false);
  };

  // 運算子按鈕功能
  const arithBtn = (arith) => {
    let arr = [...calcProcess];
    if (isProcessed === true) {
      arr.push(arith);
      setIsProcessed(false);
    } else {
      arr.push(inputNumStr, arith);
    }
    setInputNumStr("");
    setCalcProcess(arr);
  };

  // " = " 的按鍵功能
  const calcResult = () => {
    if (isProcessed) return;
    if (calcProcess.length === 0) return;
    let arr = [...calcProcess, inputNumStr];

    // 第一次先用 eval 做。
    // TODO: 晚點再想想看 eval 之外的寫法。 (done)
    // 參考 MDN 的作法 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
    // 改用 window.Function() 寫，用 try...catch 處理算式寫錯或不完整的例外
    setCalcProcess(arr);

    let numStr = 0;

    try {
      numStr = window.Function(
        "return (" +
          arr.join(" ").toString() +
          " > 2 ** 32) ? '超過數字上限' : (" +
          arr.join(" ").toString() +
          ").toString()"
      );
    } catch (e) {
      numStr = "這不是四則運算";
    }

    setInputNumStr(numStr);

    // 自己想做的: 之前計算的紀錄
    // console.log("calcHistory", calcHistory);
    // console.log("calcProcess", calcProcess);
    // console.log("inputNumStr", inputNumStr);

    // if (calcHistory.length === 0) {
    //   setCalcHistory([
    //     {
    //       calcPr: calcProcess.push(inputNumStr),
    //       calcResult: num,
    //     },
    //   ]);
    // } else {
    //   setCalcHistory(
    //     Array.from(calcHistory).push({
    //       calcPr: calcProcess.push(inputNumStr),
    //       calcResult: num,
    //     })
    //   );
    // }

    setIsProcessed(!isProcessed);
  };

  return (
    <>
      <Draggable disabled={dragDisable}>
        <div className="calc-body bg-gray-300 p-2 m-2 md:w-56 rounded">
          <h1 className="calc-title text-center text-lg font-bold mb-2">
            計算機網頁版
          </h1>
          <div className="w-full">
            <form className="bg-white rounded px-3 pt-2 pb-2 mb-2">
              <label className="block text-gray-700 text-sm font-bold text-right break-words">
                {calcProcess.length === 0 ? "算式" : calcProcess.join(" ")}
              </label>
            </form>
            <form className="bg-white rounded px-3 pt-2 pb-2 mb-2">
              <label className="input-display block text-gray-700 text-sm font-bold text-right break-words">
                {inputNumStr === "" ? "0" : inputNumStr}
              </label>
            </form>
          </div>

          <div className="flex">
            <div className="number-pad gap-1 flex flex-wrap">
              <CalcOperator buttonText={"C"} buttonFunc={clearInputStr} />
              <CalcOperator buttonText={"AC"} buttonFunc={allClear} />
              <CalcOperator buttonText={"←"} buttonFunc={deleteOneNumChar} />

              {/* 因為排版方便的關係，把 1~9 與 0 ， 00 ，小數點的按鈕分開寫。*/}
              {/* 重複的按鈕做了好幾次。 */}
              {/* TODO: 再想想可以怎麼改寫。 */}
              {[...Array(9).keys()].map((number) => (
                <CalcButton
                  buttonNumStr={(number + 1).toString()}
                  inputNumStr={inputNumStr}
                  setInputNumStr={setInputNumStr}
                  isProcessed={isProcessed}
                  key={number + 1}
                />
              ))}

              <CalcButton
                buttonNumStr={"0"}
                inputNumStr={inputNumStr}
                setInputNumStr={setInputNumStr}
                isProcessed={isProcessed}
              />
              <CalcButton
                buttonNumStr={"00"}
                inputNumStr={inputNumStr}
                setInputNumStr={setInputNumStr}
                isProcessed={isProcessed}
              />
              <CalcButton
                buttonNumStr={"."}
                inputNumStr={inputNumStr}
                setInputNumStr={setInputNumStr}
                isProcessed={isProcessed}
              />
            </div>

            <div className="operators gap-1 flex flex-wrap justify-end">
              <CalcOperator buttonText={"+"} buttonFunc={arithBtn} />
              <CalcOperator buttonText={"-"} buttonFunc={arithBtn} />
              <CalcOperator buttonText={"*"} buttonFunc={arithBtn} />
              <CalcOperator buttonText={"/"} buttonFunc={arithBtn} />
              <CalcOperator buttonText={"="} buttonFunc={calcResult} />
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}

export default App;
