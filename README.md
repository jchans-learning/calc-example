# 作業：計算機功能的網頁

Github page 連結： https://jchans.github.io/calc-example/

## Spec

1. 計算機裡的功能 +, -, \*, /, =, clear(C)
2. 畫面上會有兩個 readonly input box, 一個可以及時顯示「算式」 ，另一個按下「 = 」功能鍵後可以顯示「結果」。
3. 數字計算上限為 2^32，超過請顯示超過數字上限
4. 手機版畫面要求: 寬度為畫面 100%，高度最大為畫面 50%，若高度超過顯示範圍則可 scroll
5. 電腦版畫面要求: 計算機可以被拖拉至畫面任一位置，是否可放到超出螢幕範圍自行決定

## ToDo

- [x] 計算機手機版型外觀，用 tailwindcss 做
- [x] 計算機電腦版拖拉功能，用 [react-draggable](https://www.npmjs.com/package/react-draggable) 套件做
- [x] 基本計算機功能
  - [x] 加、減、乘
  - [x] 除法
  - [ ] 小數的計算問題處理（例如 0.1 + 0.2 不是 0.3 的狀況，目前用 .toFixed(2) 把結果處理成只有兩位，但這個作法其實不精確，有待研究）
- [x] 數字計算結果大於上限顯示「超過數字上限」。
- [x] 算式的更新
- [x] 計算結果的更新
- [x] build 到 gh-page
- [x] 實作 Refresh 網頁之後，會顯示上一次計算的算式。
- [ ] README 撰寫說明

### 專案說明

- 目前是先把算式的部分用一個 array 儲存，然後用 eval 去運算結果。但是 eval 是一個有點危險的東西，可能運算的部分要改寫一下。後來改用 window.Function() 寫，用 try...catch 處理算式寫錯或不完整的例外。
