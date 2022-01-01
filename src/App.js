import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import CalcButton from "./components/CalcButton";
import CalcOperator from "./components/CalcOperator";

import "./App.css";
import CalcHistoryBar from "./components/CalcHistoryBar";

function App() {
  const [dragDisable, setDragDisable] = useState(true);
  const [inputNumStr, setInputNumStr] = useState("");
  const [calcProcess, setCalcProcess] = useState([]);
  const [isProcessed, setIsProcessed] = useState(false);

  // TODO: 自己想做的: 之前計算的紀錄
  const [calcHistory, setCalcHistory] = useState([]);
  // console.log(calcProcess);

  // 確認視窗大小來決定一開啟畫面的時候，計算機是否可拖拉，目前設定判斷點為 768px
  useEffect(() => {
    if (localStorage.getItem("lastCalcProcess")) {
      // console.log(localStorage.getItem("lastCalcProcess"));
      setCalcProcess(JSON.parse(localStorage.getItem("lastCalcProcess")));
    }
    if (window.innerWidth >= 768) {
      setDragDisable(false);
    } else {
      setDragDisable(true);
    }
    return dragDisable;
  }, [dragDisable]);

  // 按鍵功能設定
  // C 鍵功能
  const clearInputStr = () => {
    setInputNumStr("");
    if (isProcessed) setIsProcessed(false);
  };

  // 退位鍵，刪除輸入的一碼數字或者算式裡的一個數字或一個運算子
  const deleteOneNumChar = () => {
    if (isProcessed) {
      setInputNumStr("");
      setIsProcessed(false);
      return;
    }
    if (Number(inputNumStr) !== 0) {
      setInputNumStr(inputNumStr.slice(0, -1));
    } else {
      setIsProcessed(false);
      if (calcProcess.length === 0) {
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
      inputNumStr.length === 0 ? arr.push(arith) : arr.push(inputNumStr, arith);
    }
    setInputNumStr("");
    setCalcProcess(arr);
  };

  // " = " 的按鍵功能
  const calcResult = () => {
    if (isProcessed) return;
    if (calcProcess.length === 0) return;
    let arr = [...calcProcess, inputNumStr];

    setCalcProcess(arr);
    // 把最近一次按「 = 」時的算式存在 localStorage ，重新整理時讓 useEffect 去設定
    localStorage.setItem("lastCalcProcess", JSON.stringify(arr));

    let numStr = 0;

    // 用 try...catch 來處理運算不是數字的狀況，傳回「這不是四則運算」。
    try {
      // 把陣列裡的字串變成 JS 可以運算的 code
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

    saveHistory();

    setInputNumStr(numStr);

    setIsProcessed(!isProcessed);
  };

  // Save history
  const saveHistory = () => {
    let arr2 = [...calcHistory];
    arr2.push([...calcProcess, inputNumStr]);
    setCalcHistory(arr2);
  };

  return (
    <>
      <Draggable disabled={dragDisable}>
        <div className="calc-body bg-gray-300 p-2 m-2 md:w-56 rounded overflow-auto">
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
      <div className="calc-history p-1 m-2 md:w-56 rounded overflow-auto">
        <h2 className="text-center text-lg font-bold mb-2">計算紀錄</h2>
        {calcHistory.map((element) => (
          <CalcHistoryBar
            calcHisElement={element}
            key={calcHistory.indexOf(element)}
            historyId={calcHistory.indexOf(element)}
            calcHistory={calcHistory}
            setCalcHistory={setCalcHistory}
            setCalcProcess={setCalcProcess}
            setInputNumStr={setInputNumStr}
            setIsProcessed={setIsProcessed}
          />
        ))}
      </div>
    </>
  );
}

export default App;
