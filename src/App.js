import { useState, useEffect } from "react";

// 第三方套件
import Draggable from "react-draggable";
import { evaluate, format } from "mathjs";

// Components
import CalcButton from "./components/CalcButton";
import CalcOperator from "./components/CalcOperator";
import CalcHistoryBar from "./components/CalcHistoryBar";

// Style
import "./App.css";

function App() {
  const [dragDisable, setDragDisable] = useState(true);
  const [inputNumStr, setInputNumStr] = useState("");
  const [calcProcess, setCalcProcess] = useState([]);
  const [isProcessed, setIsProcessed] = useState(false);
  const [lastArith, setLastArith] = useState("");
  const [calcHistory, setCalcHistory] = useState([]);
  const [isError, setIsError] = useState(false);

  const nowTime = new Date();

  useEffect(() => {
    // 確認 Local Storage 是不是有儲存之前的算式，有的話則讀取，讀取後移除 Local Storage 的存檔
    // 這樣重新整理兩次就會回到沒有存檔的狀態
    if (localStorage.getItem("lastCalcProcess")) {
      let arr = JSON.parse(
        localStorage.getItem("lastCalcProcess")
      ).calcProToSave;
      localStorage.removeItem("lastCalcProcess");
      // 如果讀取檔案失敗，則預設把算式的部分設定為空陣列
      try {
        setCalcProcess(arr);
      } catch (e) {
        setCalcProcess([]);
      }
    }

    // 確認視窗大小來決定一開啟畫面的時候，計算機是否可拖拉，目前設定判斷點為 768px
    const checkDragByWindowSize = () => {
      console.log(window.innerWidth);
      if (window.innerWidth >= 768) {
        setDragDisable(false);
      } else {
        setDragDisable(true);
      }
    };

    checkDragByWindowSize();

    window.addEventListener("resize", checkDragByWindowSize);

    return () => {
      window.removeEventListener("resize", checkDragByWindowSize);
    };
  }, [setDragDisable, setCalcProcess]);

  // 按鍵功能函式
  // C 鍵
  const clearInputStr = () => {
    setInputNumStr("");
    setIsError(false);
  };

  // 退位鍵
  const deleteOneNumChar = () => {
    if (isProcessed || isError) {
      setInputNumStr("");
      setIsProcessed(false);
      setIsError(false);
      return;
    }

    // 從個位數開始刪除輸入數字（因為是字串表示），如果已經沒有輸入數字，再刪除算式的東西
    if (inputNumStr !== "") {
      setInputNumStr(inputNumStr.slice(0, -1));
    } else {
      setIsProcessed(false);

      // 如果算式長度不等於零，刪除算式陣列的一個陣列
      if (calcProcess.length === 0) return;
      let arr = [...calcProcess];
      arr.pop();
      setCalcProcess(arr);
    }
  };

  // AC 鍵
  const allClear = () => {
    setInputNumStr("");
    setCalcProcess([]);
    setIsProcessed(false);
    setIsError(false);
  };

  // 運算子（ +, -, *, / ）按鈕
  // 把 buttonText 的 props 傳到算式陣列，如果還沒運算過，則把輸入欄的數字也加入算式
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
    if (isError) {
      setInputNumStr("");
      setIsError(false);
      return;
    }

    // 如果執行過運算，再按一次等於，可以把上次的結果變成新的算式陣列的第一個元素
    // 目的是對上次運算的結果做計算，乘法與除法需要這個
    if (isProcessed && inputNumStr !== "") {
      setIsProcessed(false);
      setCalcProcess([inputNumStr]);
      setInputNumStr("");
      return;
    }

    if (calcProcess.length === 0) return;
    let arr = [...calcProcess, inputNumStr];
    setCalcProcess(arr);

    // 計算結果
    let numStr = arrToArith(arr);

    saveHistory();
    setInputNumStr(numStr);
    setIsProcessed(!isProcessed);
  };

  // 函式：把算式陣列轉換成字串來計算
  const arrToArith = (arr) => {
    // 把算式陣列 arr 存在 Local Storage 重新整理的時候可以讀取
    // 設定算式的存放期限，單位是 ms ，目前設定 15 秒，目前還沒完成計時的功能，所以只是存了有效期限的設定。
    const timeInMs = 15000;
    const itemToLocalStorage = {
      calcProToSave: arr,
      expiry: nowTime.getTime() + timeInMs,
    };

    localStorage.setItem("lastCalcProcess", JSON.stringify(itemToLocalStorage));
    // 用 mathjs 套件處理算式的運算，設定小數運算的準確位數為 14 位
    let ans = "";
    let numStr = "";
    try {
      ans = evaluate(arr.join(" "));
      numStr = format(ans, { precision: 14 });
    } catch (e) {
      // console.log(e);
      setIsError(true);
      return (numStr = "計算錯誤: 請確認算式");
    }

    if (numStr > 2 ** 32) numStr = "超過數字上限";

    return numStr;
  };

  // 新增元素到算式歷史陣列
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
              <CalcOperator
                buttonText={"C"}
                buttonFunc={clearInputStr}
                setLastArith={setLastArith}
              />
              <CalcOperator
                buttonText={"AC"}
                buttonFunc={allClear}
                setLastArith={setLastArith}
              />
              <CalcOperator
                buttonText={"←"}
                buttonFunc={deleteOneNumChar}
                setLastArith={setLastArith}
                isError={isError}
                setIsError={setIsError}
              />

              {/* 因為排版方便的關係，把 1~9 與 0 ， 00 ，小數點的按鈕分開寫。*/}
              {/* 重複的按鈕做了好幾次。再想想可以怎麼改寫。 */}
              {[...Array(9).keys()].map((number) => (
                <CalcButton
                  buttonNumStr={(number + 1).toString()}
                  inputNumStr={inputNumStr}
                  setInputNumStr={setInputNumStr}
                  lastArith={lastArith}
                  setLastArith={setLastArith}
                  arithBtn={arithBtn}
                  calcProcess={calcProcess}
                  isProcessed={isProcessed}
                  setIsProcessed={setIsProcessed}
                  isError={isError}
                  setIsError={setIsError}
                  key={number + 1}
                />
              ))}

              <CalcButton
                buttonNumStr={"0"}
                inputNumStr={inputNumStr}
                setInputNumStr={setInputNumStr}
                lastArith={lastArith}
                setLastArith={setLastArith}
                arithBtn={arithBtn}
                calcProcess={calcProcess}
                isProcessed={isProcessed}
                setIsProcessed={setIsProcessed}
                isError={isError}
                setIsError={setIsError}
              />
              <CalcButton
                buttonNumStr={"00"}
                inputNumStr={inputNumStr}
                setInputNumStr={setInputNumStr}
                lastArith={lastArith}
                setLastArith={setLastArith}
                arithBtn={arithBtn}
                calcProcess={calcProcess}
                isProcessed={isProcessed}
                setIsProcessed={setIsProcessed}
                isError={isError}
                setIsError={setIsError}
              />
              <CalcButton
                buttonNumStr={"."}
                inputNumStr={inputNumStr}
                setInputNumStr={setInputNumStr}
                lastArith={lastArith}
                setLastArith={setLastArith}
                arithBtn={arithBtn}
                calcProcess={calcProcess}
                isProcessed={isProcessed}
                setIsProcessed={setIsProcessed}
                isError={isError}
                setIsError={setIsError}
              />
            </div>

            <div className="operators gap-1 flex flex-wrap justify-end">
              <CalcOperator
                buttonText={"+"}
                buttonFunc={arithBtn}
                setLastArith={setLastArith}
              />
              <CalcOperator
                buttonText={"-"}
                buttonFunc={arithBtn}
                setLastArith={setLastArith}
              />
              <CalcOperator
                buttonText={"*"}
                buttonFunc={arithBtn}
                setLastArith={setLastArith}
              />
              <CalcOperator
                buttonText={"/"}
                buttonFunc={arithBtn}
                setLastArith={setLastArith}
              />
              <CalcOperator
                buttonText={"="}
                buttonFunc={calcResult}
                setLastArith={setLastArith}
              />
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
