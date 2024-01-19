'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//ビンゴ(ランダム)
let result = 0;
let numbersAlreadyOut = [];

const startRandomNumber = () => {
  while(numbersAlreadyOut.length < 75) {
    cardRandomNumber(1, 75);
    if(!numbersAlreadyOut.includes(result)) {
      numbersAlreadyOut.push(result);
      break;
    }
  }

  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
      let xyNum = document.getElementById(`x${i}y${j}`);
      // console.log(xyNum.innerText);
      if (xyNum.innerText == result) {
        xyNum.style.background = "red";
      }
    }
  }

  let bingoTotal = 0;
  let oneMoreTotal = 0;
  for (const rowNum of card) {
    let line = 0;
    for (let k = 0; k < 5; k++) {
      for (const outNum of numbersAlreadyOut) {
        if (outNum === rowNum[k]) {
          line += 1;
        }
      }
      if (0 === rowNum[k]){
        line += 1;
      }
    }
    if (line === 5) {
      bingoTotal += 1;
    } else if (line === 4) {
      oneMoreTotal += 1; 
    }
  }
  for (const rowNum of card1) {
    let line = 0;
    for (let l = 0; l < 5; l++) {
      for (const outNum of numbersAlreadyOut) {
        if (outNum === rowNum[l]) {
          line += 1;
        }
      }
      if (0 === rowNum[l]){
        line += 1;
      }
    }
    if (line === 5) {
      bingoTotal += 1;
    } else if (line === 4) {
      oneMoreTotal += 1;
    }
  }

  let line = 0;
  for (let diaNum of diagonal1) {
    for (const outNum of numbersAlreadyOut) {
      if (outNum === diaNum) {
        line += 1;
      }
    }
    if (0 === diaNum){
      line += 1;
    }
  }
  if (line === 5) {
    bingoTotal += 1;
  } else if (line === 4) {
    oneMoreTotal += 1;
  }
  
  line = 0;
  for (let diaNum of diagonal2) {
    for (const outNum of numbersAlreadyOut) {
      if (outNum === diaNum) {
        line += 1;
      }
    }
    if (0 === diaNum){
      line += 1;
    }
  }
  if (line === 5) {
    bingoTotal += 1;
  } else if (line === 4) {
    oneMoreTotal += 1;
  }

  if (bingoTotal > 0) {
    const bingo = document.getElementById("bingo");
    bingo.innerText = `${bingoTotal} BINGO!`;
  } 
  if (oneMoreTotal > 0) {
    const oneMore = document.getElementById("oneMore");
    oneMore.innerText = `${oneMoreTotal} リーチ!`;
  }
  const number = document.getElementById("number");
  number.innerHTML = result;

  const canvas = document.getElementById("canvas");
  canvas.innerHTML = numbersAlreadyOut;
}

//ビンゴカード作成と数字のランダム表示
function cardRandomNumber(minNum, maxNum) {
  result = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  return result
}

let cardNumbers = [];
// const cardNumbers = [["B", "I", "N", "G", "O"]];
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

  row1 = [];
  row2 = [];
  row3 = [];
  row4 = [];
  row5 = [];
  card = [row1, row2, row3, row4, row5];
  column1 = [];
  column2 = [];
  column3 = [];
  column4 = [];
  column5 = [];
  card1 = [column1, column2, column3, column4, column5];
  diagonal1 = [];
  diagonal2 = [];

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

  // console.log(card);
  // console.log(card1);
  // console.log(diagonal1);
  // console.log(diagonal2);

  return cardNumbers;
}

//ビンゴカード作成
const createCard = () => {
  bingoCardNumber();
}
// const create = document.getElementById("create");
// create.addEventListener("click", bingoCardNumber);

//ゲームリセット
const resetCard = () => {
  bingoCardNumber();
  numbersAlreadyOut = [];
  const number = document.getElementById("number");
  number.innerHTML = "?";
  const reset = document.getElementById("canvas");
  reset.innerText = "出た数字が表示されます";

  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
      const resetStyle = document.getElementById(`x${i}y${j}`);
      resetStyle.style.background = "white";
    }
  }
  const free = document.getElementById("x3y3");
  free.style.background = "red";
}

//読み込み時にビンゴカード作成
window.addEventListener('load', bingoCardNumber);






//バックアップ
/*
function bingoCardNumber(){
  for (let i = 0; i < 5; i++) {
    while (row1.length <= 5) {
      cardRandomNumber(1, 15);
      for (addNum of row1) {
        if (addNum != result) {
          row1.push(result);
        }
      }
    }
    card[i].push(result);
    cardRandomNumber(16, 30);
    card[i].push(result);
    cardRandomNumber(31, 15);
    card[i].push(result);
    cardRandomNumber(46, 60);
    card[i].push(result);
    cardRandomNumber(61, 75);
    card[i].push(result);
    cardNumbers.push(card[i]);
  }
  return cardNumbers;
}
*/





// function bingoCardNumber(){
//   for (let i = 0; i < 5; i++) {
//     cardRandomNumber(1, 15);
//     row1.push(result);
//     cardRandomNumber(16, 30);
//     row2.push(result);
//     cardRandomNumber(31, 15);
//     row3.push(result);
//     cardRandomNumber(46, 60);
//     row4.push(result);
//     cardRandomNumber(61, 75);
//     row5.push(result);
//     cardNumbers.push(card[i]);
//   }
//   return cardNumbers;
// }

/*
function bingoCardNumber(){
  let minNum = 1;
  let maxNum = 15; 
  for (let i = 0; i < 5; i++) {
    minNum += 15;
    maxNum += 15;
    cardRandomNumber(1, 15);
    card[i].push(result);
    cardRandomNumber(16, 30);
    card[i].push(result);
    cardRandomNumber(31, 15);
    card[i].push(result);
    cardRandomNumber(46, 60);
    card[i].push(result);
    cardRandomNumber(61, 75);
    card[i].push(result);
    cardNumbers.push(card[i]);
  }
  return cardNumbers;
}
*/

/*
for (let i = 0; i < 5; i++) {
    while(true) {
      cardRandomNumber(1, 15);
      if(!card[i].includes(result)) {
        card[i].push(result);
        break;
      }
    }

    card[i].push(result);
    cardRandomNumber(16, 30);
    card[i].push(result);
    cardRandomNumber(31, 45);
    card[i].push(result);
    cardRandomNumber(46, 60);
    card[i].push(result);
    cardRandomNumber(61, 75);
    card[i].push(result);

    cardNumbers.push(card[i]);
*/
