import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import CalcButton from "./components/CalcButton";
import CalcOperator from "./components/CalcOperator";

import "./App.css";

function App() {
  const [dragDisable, setDragDisable] = useState(true);

  useEffect(() => {
    const hasWindow = typeof window !== "undefined";

    function getWindowDimensions() {
      const width = hasWindow ? window.innerWidth : null;
      const height = hasWindow ? window.innerHeight : null;
      console.log(width, height);
      return {
        width,
        height,
      };
    }

    if (getWindowDimensions().width >= 768) {
      console.log("enable drag");
      setDragDisable(false);
    } else {
      console.log("disable drag");
      setDragDisable(true);
    }
    return dragDisable;
  }, [dragDisable]);

  return (
    <>
      <Draggable disabled={dragDisable}>
        <div className="calc-body bg-gray-300 p-2 m-2 md:w-56 rounded">
          <h1 className="calc-title text-center text-lg font-bold mb-2">
            計算機網頁版
          </h1>
          <div className="w-full">
            <form className="bg-white rounded px-3 pt-2 pb-2 mb-2">
              <label className="block text-gray-700 text-sm font-bold">
                算式
              </label>
            </form>
            <form className="bg-white rounded px-3 pt-2 pb-2 mb-2">
              <label className="block text-gray-700 text-sm font-bold">
                計算結果
              </label>
            </form>
          </div>

          <div className="flex">
            <div className="number-pad gap-1 flex flex-wrap">
              <CalcOperator buttonText={"C"} />
              <CalcButton buttonNumber={"AC"} />
              <CalcButton buttonNumber={"←"} />

              {[...Array(9).keys()].map((number) => (
                <CalcButton buttonNumber={number + 1} key={number + 1} />
              ))}

              <CalcButton buttonNumber={0} />
              <CalcButton buttonNumber={"00"} />
              <CalcButton buttonNumber={"."} />
            </div>

            <div className="operators gap-1 flex flex-wrap justify-end">
              <CalcOperator buttonText={"+"} />
              <CalcOperator buttonText={"-"} />
              <CalcOperator buttonText={"*"} />
              <CalcOperator buttonText={"/"} />
              <CalcOperator buttonText={"="} />
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}

export default App;
