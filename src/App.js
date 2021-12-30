import "./App.css";

function App() {
  return (
    <div>
      <h1>Calculator</h1>
      <div>history</div>
      <div>To show calculation process</div>
      <div>To show result</div>
      <div className="number-pad">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>0</button>
      </div>
      <div className="operators">
        <button>+</button>
        <button>-</button>
        <button>*</button>
        <button>/</button>
        <button>=</button>
        <button>c</button>
      </div>
    </div>
  );
}

export default App;
