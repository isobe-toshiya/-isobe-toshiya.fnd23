'use strict'
// 1行目に記載している 'use strict' は削除しないでください


let result = 0;
let numbersAlreadyOut = [0];

//ビンゴ(ランダム)
const startRandomNumber = () => {
  while (numbersAlreadyOut.length <= 75) {
    cardRandomNumber(1, 75);
    if (!numbersAlreadyOut.includes(result)) {
      numbersAlreadyOut.push(result);
      break;
    }
  }
  const number = document.getElementById("number");
  number.innerText = result;
  for (let i = 1; i <= numbersAlreadyOut.length - 1; i++) {
    const canvas = document.getElementById(`${numbersAlreadyOut[i]}`);
    canvas.style.background = "pink";
  }
  getNumberOnCard(result);

  if (numbersAlreadyOut.length === 76) {
    setTimeout(gameSet, 50); //処理時間を考慮
  }
}

//ビンゴカードの数字を確認
function getNumberOnCard(result) {
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
      let xyNum = document.getElementById(`x${i}y${j}`);
      if (xyNum.innerText == result) {
        xyNum.style.background = "red";
      }
    }
  }

  let bingoTotal = 0;
  let oneMoreTotal = 0;
  let diaArr = [diagonal1, diagonal2];
  let lineArr = [card, card1, diaArr];
  for (const addLine of lineArr) {
    for (const rowNum of addLine) {
      let line = 0;
      for (let k = 0; k < 5; k++) {
        for (const outNum of numbersAlreadyOut) {
          if (outNum === rowNum[k]) {
            line += 1;
          }
        }
      }
      if (line === 5) {
        bingoTotal += 1;
      } else if (line === 4) {
        oneMoreTotal += 1; 
      }
    }
  }
  const bingo = document.getElementById("bingo");
  if (bingoTotal > 0) {
    bingo.innerText = `${bingoTotal} BINGO!`;
  } else {
    bingo.innerText = "";
  }
  const oneMore = document.getElementById("oneMore");
  if (oneMoreTotal > 0) {
    oneMore.innerText = `${oneMoreTotal} リーチ!`;
  } else {
    oneMore.innerText = "";
  }
}

//ビンゴカード作成と数字のランダム表示
function cardRandomNumber(minNum, maxNum) {
  result = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  return result
}

let cardNumbers = [];
let row1 = [];
let row2 = [];
let row3 = [];
let row4 = [];
let row5 = [];
let card = [row1, row2, row3, row4, row5];
let column1 = [];
let column2 = [];
let column3 = [];
let column4 = [];
let column5 = [];
let card1 = [column1, column2, column3, column4, column5];
let diagonal1 = [];
let diagonal2 = [];

//5回繰り返す
function bingoCardNumber(){
  let minNum = 1;
  let maxNum = 15;

  card = [row1 = [], row2 = [], row3 = [], row4 = [], row5 = []];
  card1 = [column1 = [], column2 = [], column3 = [], column4 = [], column5 = []];
  diagonal1 = [], diagonal2 = [];

  for (let i = 0; i < 5; i++) {
    while (card[i].length < 5) {
      cardRandomNumber(minNum, maxNum);
      if(!card[i].includes(result)) {
        if (card[i] === row3 && card[i].length === 2) {
          card[i].push(0);
        } else {
          card[i].push(result);
        }
      }
    }
    cardNumbers.push(card[i]);
    minNum += 15;
    maxNum += 15;

    for (let j = 1; j <= 5; j++) {
      card1[j - 1].push((card[i])[j - 1]);
      const rowBNum = document.getElementById(`row${i}Num${j}`);
      rowBNum.innerHTML = (card[i])[j - 1];
    }
    const rowBNum = document.getElementById("row2Num3");
    rowBNum.innerHTML = "★";
  }
  diagonal1.push(row1[0]);
  diagonal1.push(row2[1]);
  diagonal1.push(row3[2]);
  diagonal1.push(row4[3]);
  diagonal1.push(row5[4]);

  diagonal2.push(row1[4]);
  diagonal2.push(row2[3]);
  diagonal2.push(row3[2]);
  diagonal2.push(row4[1]);
  diagonal2.push(row5[0]);

  return cardNumbers;
}

//ビンゴカード作成
const createCard = () => {
  bingoCardNumber();
}

//ゲームリセット
const resetCard = () => {
  if (window.confirm("ゲームをリセットしますか？")) {
    resetAction();
  }
}

//ゲーム終了
function gameSet() {
  if (window.confirm("終了！！\nゲームをリセットしますか？")) {
    resetAction();
  }
}

//リセットの処理
function resetAction() {
  bingoCardNumber();
  numbersAlreadyOut = [0];
  const bingo = document.getElementById("bingo");
  bingo.innerText = "";
  const oneMore = document.getElementById("oneMore");
  oneMore.innerText = "";
  const number = document.getElementById("number");
  number.innerHTML = "?";
  for(let i = 1; i <= 75; i++) {
    const canvas = document.getElementById(`${i}`);
    canvas.style.background = "white";
  }
  for (let j = 1; j <= 5; j++) {
    for (let k = 1; k <= 5; k++) {
      const resetStyle = document.getElementById(`x${j}y${k}`);
      resetStyle.style.background = "white";
    }
  }
  const free = document.getElementById("x3y3");
  free.style.background = "red";
}

//読み込み時にビンゴカード作成
window.addEventListener('load', bingoCardNumber);
