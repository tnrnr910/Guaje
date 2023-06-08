// DOM 요소
const searchInput = document.querySelector("#search-input"); // 검색 input 요소
const cardList = document.querySelector(".card-list"); // 카드 리스트 요소
const sortBtn = document.getElementById("sort-btn");
const changeHeader = document.querySelector(".change-header");

// local dom 요소 

const form = document.querySelector(".form-local-data"),
  localInput = form.querySelector("#form-id"),
  greeting = document.querySelector(".js-greeting"),
  button = document.querySelector(".local-delete");

// 영화 검색 input에 포커스
searchInput.focus();

// valid 유효성검사
const vaildInput = ['!', '@', '#', '$', '*'];


// setInterval change header부분 
changeHeader.addEventListener('click', () => {
  setInterval(() => console.log(Math.floor(Math.random() * 10)), 2000);
  
});




// 영화 검색 이벤트 핸들러
const handleSearch = (event) => {
  event.preventDefault(); // 폼 제출 이벤트의 기본 동작 방지
  const searchText = searchInput.value.toLowerCase(); // 입력값 소문자로 변환
  const movieCards = document.querySelectorAll(".movie-card"); // 모든 영화 카드 요소 가져오기

  // 각 영화 카드에 대해 검색어와 일치하는 제목이 있는지 확인하여 표시 여부 결정
  movieCards.forEach((card) => {
    const title = card.querySelector(".movie-title").textContent.toLowerCase(); // 각 카드의 제목 가져오기
    if (title.includes(searchText)) {
      card.style.display = "block"; // 일치하는 검색어가 있으면 카드를 표시
    } else {
      card.style.display = "none"; // 일치하는 검색어가 없으면 카드를 숨김
    }
    movieCards.forEach((card) => {
      if (searchText.includes(vaildInput))
        card.style.color = 'red'; // 일치하는 검색어가 있으면 카드를 표시
    });

  });
};

// 영화 데이터 가져오기
const fetchMovieData = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWE0OTdjYTI1OTkxZTI3YWU2OGViZjIxOTQwYmJiYiIsInN1YiI6IjY0Nzg3N2VmY2Y0YjhiMDBlMmQ0NzBjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1JdctVcIfQzvY4W50qHQZn_BoHDPqN0eMG4u0819q_Y",
      },
    }
  );
  const data = await response.json(); // 응답 데이터를 JSON 형식으로
  return data.results; // 영화 데이터 반환
};

// 영화 카드 생성
const createMovieCards = async () => {

  const movieData = await fetchMovieData(); // 영화 데이터 가져오기

  const movieCardsHTML = movieData
    .map(
      (movie) => `
      <div class="movie-card" id="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3 class="movie-title">${movie.title}</h3>
        <p>${movie.overview}</p>
        <p>Rating: ${movie.vote_average}</p>
      </div>
    `
    )
    .join(""); // 영화 데이터를 반복하여 카드 HTML 문자열 생성
  setTimeout(() => cardList.innerHTML = movieCardsHTML, 1500);; // 카드 리스트에 생성한 HTML 삽입 1.5초뒤 


  const movieCards = document.querySelectorAll(".movie-card"); // 모든 영화 카드 요소 가져오기
  movieCards.forEach((card) => {
    // 각 영화 카드에 클릭 이벤트 리스너 등록
    card.addEventListener("click", () => {
      const movieId = card.getAttribute("id"); // 클릭된 카드의 ID 속성값 가져오기
      alert(`영화 ID: ${movieId}`); // 알림창으로 영화 ID 출력
    });
  });
};

// 정렬메소드시작
sortBtn.addEventListener('click', () => {
  card.sort(function (a, b) {
    return a - b;
  });
});
// 영화 카드 생성 및 이벤트 핸들러 등록
createMovieCards(); // 페이지 로드 시 영화 카드 생성
searchInput.addEventListener("input", handleSearch); // 검색 input에 입력 이벤트 리스너 등록


// localst


//저장할 데이터의 key값
const LOCAL_DATA = "nickName";

//input태그에 이름 입력 후 input태그를 감추고,
//텍스트가 나타나게 해주는 함수
function hiddenAndGreeting(name, value) {
  greeting.style.display = "block";
  form.style.display = "none";
  button.style.display = "block";
  button.addEventListener("click", onClick);
  // const data = new FormData(form);
  // for (const [name, value] of data) {
  // console.log(name, ":", value)
  const data = new FormData(form);
  for (const [name, value] of data) {
    // console.log(name, ":", value)
    // localStorage.setItem(LOCAL_DATA, localInput.value);
    // hiddenAndGreeting(localInput.value);
    greeting.innerText = `Hi!${name}${name}${name}`;
    localInput.value = "";
  }
  // }
}

//버튼 클릭 시, 데이터 삭제 이벤트 발생
function onClick() {
  localStorage.removeItem(LOCAL_DATA);
  console.log("hi");
  loaded();
}

//input태그에 입력 시, lacalStorage의 value값으로 저장
function onSubmit(e) {
  e.preventDefault();
  // const data = new FormData(form);   이부분을 위에 선언하면 적용이 안되는데 이유? 
  const data = new FormData(form);
  for (const [name, value] of data) {
    console.log(name, ":", value)
    localStorage.setItem(LOCAL_DATA, localInput.value);
    hiddenAndGreeting(localInput.value);

    localInput.value = "";
  }
}

//input태그 보이게 설정, 인사 텍스트와 버튼은 숨김.
//form에 submit 이벤트 설정
function askForNickName() {
  form.style.display = "block";
  greeting.style.display = "none";
  button.style.display = "none";
  form.addEventListener("submit", onSubmit); //form에 submit이벤트 추가
}

// 브라우저의 localStorage에 데이터가 있을때와 없을때
//구분하여 실행 시켜줄 함수.
function loaded() {
  const data = localStorage.getItem(LOCAL_DATA);
  if (data === null) { // 데이터가 없을 시
    askForNickName();
  } else {//데이터가 이미 있을 시
    hiddenAndGreeting(data);
  }
}

//처음 실행할 init함수
function init() {
  loaded();
}

init();



// 조건부 필터 

function onClick() {
  localStorage.removeItem(LOCAL_DATA);
  console.log("hi");
  loaded();
}

// $("#sortPrice").click(function () {
//   products.sort(function (a, b) {
//     return a.price - b.price;
//   });




// $("#sortPrice").click(function () {
//   products.sort(function (a, b) {
//     return a.price - b.price;
//   });