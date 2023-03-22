function getTime() {
  const time = document.querySelector(".time"); //자바에서 html에 접근한것
  //오브젝트 document , 함수 querySelector(접근할 수 있는 함수는 다양)
  // # = id 접근 , . = class 접근
  const newDate = new Date(); //()안에 특정한 날짜값을 넣을수도 있다.

  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  //  if (seconds.toString().length === 1) { // 문자열로 바꿔주는 함수 .toString()
  //     seconds = "0" + seconds;
  //   }// 첫번째 방법 !

  //   time.innerText = hours + ":" + minutes + ":" + seconds; // 배운방법
  time.innerText = `${hours}:${minutes}:${seconds}`; // 강사님 방법
}

getTime(); // 위 묶은 부분을 호출해야함.

setInterval(getTime, 1000);
