// 'APPLE'로 정답 지정
const 정답 = "happy";

// 6번의 시도
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "Game over.";
    // CSS 코드
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:50%; left:50%; transform: translate(-50%, -50%); background-color:white; width:200px; height:100px; box-shadow: 5px 5px 10px;";
    // 전체화면으로 했을 때 중앙 배치 안 됨.
    //   "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38%; background-color:white; width:200px; height:100px;";
    // body 부분에 자식 추가
    document.body.appendChild(div);
  };

  // 게임이 종료되면 keyboard 이벤트, 타이머 중단
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  // 다음줄로 이동
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    // index 초기화
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      // 입력한 글자와 정답 글자 비교
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        // 입력한 글자와 정답이 같으면 초록색 배경
        block.style.background = "#6AAA64";
        // 입력한 글자가 정답 중에 있으면 노란색 배경
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      // 같지도, 포함되지도 않으면 회색 배경
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  // index-1을 지우기
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    // index가 0이면 -1이기 때문에 동작하지 않게 설정
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    // 대문자 출력(toUpperCase)
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    // 몇 번째 시도(attempts)의 몇 번째 인덱스(index)인지
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    // 'backspace' 키 동작
    if (event.key === "Backspace") handleBackspace();
    // index가 5이면(5번째 칸 이후) 'Enter'키에 함수 동작, 다른 키면 return으로 끝냄.
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
      // 알파벳만 출력(a(65) ~ z(90))
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    // timer에 id 저장
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
