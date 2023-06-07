// DOM 요소
const searchInput = document.querySelector("#search-input"); // 검색 input 요소
const cardList = document.querySelector(".card-list"); // 카드 리스트 요소

// 영화 검색 input에 포커스
searchInput.focus();

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

  cardList.innerHTML = movieCardsHTML; // 카드 리스트에 생성한 HTML 삽입

  const movieCards = document.querySelectorAll(".movie-card"); // 모든 영화 카드 요소 가져오기
  movieCards.forEach((card) => {
    // 각 영화 카드에 클릭 이벤트 리스너 등록
    card.addEventListener("click", () => {
      const movieId = card.getAttribute("id"); // 클릭된 카드의 ID 속성값 가져오기
      location.href = "./subPage.html?id=" + movieId; // 해당 영화 상세페이지로 이동
      // alert(`영화 ID: ${movieId}`); // 알림창으로 영화 ID 출력
    });
  });
};

// 영화 카드 생성 및 이벤트 핸들러 등록
createMovieCards(); // 페이지 로드 시 영화 카드 생성
searchInput.addEventListener("input", handleSearch); // 검색 input에 입력 이벤트 리스너 등록
