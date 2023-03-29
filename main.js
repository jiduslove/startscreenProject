const QUOTES = "quotes";

function getDate() {
  const date = document.querySelector(".date");

  const newDate = new Date();

  const years = String(newDate.getFullYear());
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const dates = String(newDate.getDate()).padStart(2, "0");

  date.innerText = `${years}년${month}월${dates}일`;
}

getDate();

function getTime() {
  const time = document.querySelector(".time");

  const newDate = new Date(); //()안에 특정한 날짜값을 넣을수도 있다.

  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  /* if (seconds.toString().length === 1) { // 문자열로 바꿔주는 함수 .toString()
      seconds = "0" + seconds;
    }// 첫번째 방법 !

      time.innerText = hours + ":" + minutes + ":" + seconds;  배운방법*/

  time.innerText = `${hours}:${minutes}:${seconds}`; // 강사님 방법
}

getTime(); // 위 묶은 부분을 호출해야함.

setInterval(getTime, 1000);

function getQuotes() {
  const quotesMsg = document.querySelector(".quotesMsg");
  let savedQuotes = localStorage.getItem(QUOTES);

  if (!savedQuotes) {
    localStorage.setItem(
      QUOTES,
      JSON.stringify([
        "저는 블록체인스쿨을",
        "성공적으로 마치고싶습니다.",
        "많은분들의 도움이 필요합니다.",
        "앞으로 잘부탁드립니다.",
      ])
    );

    savedQuotes = localStorage.getItem(QUOTES);
  }

  let quotesArray = JSON.parse(savedQuotes);

  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

getQuotes();

function onClickAdd() {
  const newQuotes = document.querySelector(".newQuotes");

  newQuotes.style.display = "inline-block";
}

function onClickDelete() {
  const newQuotesInput = document.querySelector(".newQuotesInput");

  let savedQuotes = localStorage.getItem(QUOTES);

  let quotesArray = JSON.parse(savedQuotes);
  quotesArray.pop(newQuotesInput.value);

  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));
}

function onClickRegist() {
  const quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesInput = document.querySelector(".newQuotesInput");

  if (!newQuotesInput.value) {
    return; // return을 써서 반환을 하게 되면 아래 코드는 출력이 되지 않는다.
  }

  let savedQuotes = localStorage.getItem(QUOTES);

  let quotesArray = JSON.parse(savedQuotes);
  quotesArray.push(newQuotesInput.value);

  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  quotesMsg.innerHTML = `<span style="color:white;">${newQuotesInput.value}</span>`;
  newQuotes.style.display = "none";
  newQuotesInput.value = "";

  console.log(newQuotesInput.value);
}

let isLoading = false;

async function onClickSearch() {
  const searchInput = document.querySelector(".searchInput");
  const searchResult = document.querySelector(".searchResult");

  if (!searchInput.value) return;
  if (isLoading) return;

  isLoading = true;
  const question = searchInput.value;
  searchInput.value = "검색 중 입니다... 잠시만 기다려주세요.";

  console.log("챗 지피티 동작중");

  const response = await axios.post(
    "https://holy-fire-2749.fly.dev/chat",
    {
      question,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer BLOCKCHAINSCHOOL3",
      },
    }
  );

  if (response.status === 200) {
    searchResult.style.display = "inline";
    searchResult.innerText = response.data.choices[0].message.content;
  }

  searchInput.value = "";
  isLoading = false;
}

function onClickToggle(value) {
  const nft = document.querySelector(".nft");
  const nftView = document.querySelector(".nftView");

  if (value) {
    nft.style.display = "inline-block";
    nftView.style.display = "none";
  } else {
    nft.style.display = "none";
    nftView.style.display = "inline-block";
  }
}

const API_KEY = "8a147de15b3d9c5b93a097c7a08175d4"; // 날씨관련 js.

const weatherIcon = document.querySelector(".weatherIcon");
const weatherTemp = document.querySelector(".weatherTemp");

navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        weatherTemp.innerText =
          data.name + ", " + parseInt(data.main.temp) + "℃";

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      }); // fetch - response - data 순으로 진행되며 이대로 기억하여 쓸수도있다.
  },
  () => alert("Not allowed!")
);
