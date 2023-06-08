// DOM 요소
const searchInput = document.querySelector("#search-input"); // 검색 input 요소
const cardList = document.querySelector(".card-list"); // 카드 리스트 요소
// 기본 페이지 설정
let currentPage = "topRated"; // 기본 페이지를 topRated로 초기화
// 영화 검색 input에 포커스
searchInput.focus();
// 검색 폼에 제출 이벤트 리스너 등록
const searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", handleSearch);
// 영화 검색 이벤트 핸들러
function handleSearch(event) {
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
}
// API 선택에 따른 영화 카드 생성
const createMovieCards = async (api) => {
  let apiUrl = "";
  // 선택된 API에 따라 API URL 설정
  if (api === "topRated") {
    apiUrl = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR";
  } else if (api === "nowPlaying") {
    apiUrl = "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR";
  } else if (api === "popular") {
    apiUrl = "https://api.themoviedb.org/3/movie/popular?language=ko-KR";
  } else if (api === "upcoming") {
    apiUrl = "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR";
  }
  const totalPages = 5; // 가져올 API 총 페이지 수
  let movieCardsHTML = ""; // 영화 카드 HTML 초기화
  for (let page = 1; page <= totalPages; page++) {
    // 각 페이지별로 영화 데이터 가져오기
    const response = await fetch(`${apiUrl}&page=${page}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWE0OTdjYTI1OTkxZTI3YWU2OGViZjIxOTQwYmJiYiIsInN1YiI6IjY0Nzg3N2VmY2Y0YjhiMDBlMmQ0NzBjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1JdctVcIfQzvY4W50qHQZn_BoHDPqN0eMG4u0819q_Y",
      },
    });
    const data = await response.json(); // 응답 데이터 JSON 형식
    const movieData = data.results; // 영화 데이터
    movieData.forEach((movie) => {
      const cardHTML = `
        <div class="movie-card" id="${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3 class="movie-title">${movie.title}</h3>
          </div>
      `;
      movieCardsHTML += cardHTML; // 각 영화 카드 HTML 추가
    });
  }
  cardList.innerHTML = movieCardsHTML; // 카드 리스트에 생성한 HTML 삽입
  const movieCards = document.querySelectorAll(".movie-card"); // 모든 영화 카드 요소 가져오기
  movieCards.forEach((card) => {
   // 각 영화 카드에 클릭 이벤트 리스너 등록
   card.addEventListener("click", () => {
    const movieId = card.getAttribute("id"); // 클릭된 카드의 ID 속성값 가져오기
    location.href = "./html/subPage.html?id="+movieId
    // alert(`영화 ID: ${movieId}`); // 알림창으로 영화 ID 출력
  });
  });
};
// 초기 페이지 로드 시 topRated API로 영화 카드 생성
createMovieCards(currentPage);
// 네비게이션 바 클릭 이벤트 리스너 등록
const navigation = document.querySelector(".navigation");
navigation.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    const api = event.target.dataset.api;
    currentPage = api; // 현재 페이지 업데이트
    createMovieCards(api); // 해당 API로 영화 카드 생성
  }
});
// form 태그 새로고침 방지
const form = document.querySelector("#search-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSearch(searchInput.value);
});

