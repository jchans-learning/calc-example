import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import CalcButton from "./components/CalcButton";
import CalcOperator from "./components/CalcOperator";

import "./App.css";

function App() {
  const [dragDisable, setDragDisable] = useState(true);
  const [inputNumStr, setInputNumStr] = useState("");
  const [calcProcess, setCalcProcess] = useState([]);

  // Check window size on start and set calc draggable if window size >= 768px
  useEffect(() => {
    if (window.innerWidth >= 768) {
      // console.log("enable drag");
      setDragDisable(false);
    } else {
      // console.log("disable drag");
      setDragDisable(true);
    }
    return dragDisable;
  }, [dragDisable]);

  // functions for operator buttons
  const clearInputStr = () => setInputNumStr("");
  const deleteOneNumChar = () => setInputNumStr(inputNumStr.slice(0, -1));
  const allClear = () => {
    setInputNumStr("");
    setCalcProcess([]);
  };
  const arithBtn = (arith) => {
    let arr = [...calcProcess, inputNumStr, arith];
    setInputNumStr("");
    setCalcProcess(arr);
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
              <label className="block text-gray-700 text-sm font-bold text-right">
                {calcProcess.length === 0 ? "算式" : calcProcess}
              </label>
            </form>
            <form className="bg-white rounded px-3 pt-2 pb-2 mb-2">
              <label className="input-display block text-gray-700 text-sm font-bold text-right overflow-x-scroll">
                {inputNumStr === "" ? "0" : inputNumStr}
              </label>
            </form>
          </div>

          <div className="flex">
            <div className="number-pad gap-1 flex flex-wrap">
              <CalcOperator buttonText={"C"} buttonFunc={clearInputStr} />
              <CalcOperator buttonText={"AC"} buttonFunc={allClear} />
              <CalcOperator buttonText={"←"} buttonFunc={deleteOneNumChar} />

              {[...Array(9).keys()].map((number) => (
                <CalcButton
                  buttonNumStr={(number + 1).toString()}
                  inputNumStr={inputNumStr}
                  setInputNumStr={setInputNumStr}
                  key={number + 1}
                />
              ))}

              <CalcButton
                buttonNumStr={"0"}
                inputNumStr={inputNumStr}
                setInputNumStr={setInputNumStr}
              />
              <CalcButton
                buttonNumStr={"00"}
                inputNumStr={inputNumStr}
                setInputNumStr={setInputNumStr}
              />
              <CalcButton
                buttonNumStr={"."}
                inputNumStr={inputNumStr}
                setInputNumStr={setInputNumStr}
              />
            </div>

            <div className="operators gap-1 flex flex-wrap justify-end">
              <CalcOperator buttonText={"+"} buttonFunc={arithBtn} />
              <CalcOperator buttonText={"-"} buttonFunc={arithBtn} />
              <CalcOperator buttonText={"*"} buttonFunc={arithBtn} />
              <CalcOperator buttonText={"/"} buttonFunc={arithBtn} />
              <CalcOperator buttonText={"="} buttonFunc={arithBtn} />
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}

export default App;
