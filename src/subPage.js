window.onload = function () {
  reviewList();
};

// url의 param(movieId) 값 추출
const searchParams = new URLSearchParams(window.location.search);
let movieId = searchParams.get("id");

// 모달창
const openButton = document.getElementById("open-modal");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".md_overlay");
const closeButton = modal.querySelector(".md_close_btn");

const openModal = () => modal.classList.remove("hidden");
const closeModal = () => modal.classList.add("hidden");

openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

// 작성자, 비밀번호, 리뷰 - localStorage 저장
const form = document.querySelector("#review-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nickName = document.querySelector("#nickName").value;
  const password = document.querySelector("#pwd").value;
  const textarea = document.querySelector("#review").value;
  const likeValue = document.querySelector(".like").alt;
  const hateValue = document.querySelector(".hate").alt;
  console.log("likeValue",likeValue)
  let like=0;
  //password > Number 타입으로 변환
  const pwd = Number(password);
  if (likeValue === "추천" && hateValue === "비추천") {
    return alert("추천여부를 선택해 주세요!");
  }
  if(likeValue === "체크_추천"){
    like = 1;
  }else{
    like = 0;
  }

  if (nickName === "") {
    document.querySelector("#nickName").focus();
    return alert("작성자를 한 글자 이상 입력해 주세요!");
  } else if (nickName.length < 3) {
    document.querySelector("#nickName").focus();
    return alert("작성자는 3글자 이상 입력해야 합니다!");
  }
  if (password.length < 4) {
    document.querySelector("#pwd").focus();
    return alert("패스워드가 너무 짧습니다. 4자리 이상 입력해주세요!");
  }
  if (textarea === "") {
    document.querySelector("#review").focus();
    return alert("리뷰는 한 글자 이상 입력해야 합니다!");
  }
  const review = document.querySelector("#review").value;
  let today = new Date();
  let date = today.toLocaleDateString();
  let time = today.toLocaleTimeString();
  let obj = {
    movieId: movieId,
    nickName: nickName,
    pwd: pwd,
    review: review,
    date: date,
    time: time,
    like: like
  };
  localStorage.setItem(nickName, JSON.stringify(obj));
  window.location.reload();
  reviewList();
});

// 리뷰 리스트
function reviewList() {
  let likeSrc;
  const reviewDiv = document.querySelector(".review-div");
  let reviewList = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    reviewList.push(value);
  }
  reviewList = reviewList.filter((review) => {
    return review.movieId === movieId;
  });
  reviewDiv.innerHTML = reviewList
    .map((review) => {
      if(review.like===1){
        likeSrc = "../image/check_recommend.png"
      }else{
        likeSrc = "../image/check_non_recommend.png"
      }
      return `<div class="review-text-outerBox">
              <div class="review-header"> 
                <div class="list-div">
                  <div class="writer">${review.nickName}</div>
                  <div class="date">${review.date}</div>
                  <div class="time">${review.time}</div>
                  
                  <div class="star"><img class="like-success" src="${likeSrc}"/></div>                
                </div>
                <div class="list-btn">
                  <button onclick="reviewModify('${review.pwd}','${review.nickName}','${review.like}')" class="modify-btn"></button>
                  <button onclick="reviewDelete('${review.pwd}','${review.nickName}')" class="delete-btn"></button>
                </div>
              </div>
              <div class="review-text-innerBox">
                <div class="review-text">${review.review}</div>
              </div>
            </div>
            `;
    })
    .join("");
}

// textarea 글자 수 확인
const textArea = document.querySelector("#review");
textArea.onkeyup = function () {
  const textCount = textArea.value.length;
  const p = document.querySelector(".text-count");
  p.innerText = "(" + textCount + "/1000)";
};

// 리뷰 수정 기능
function reviewModify(pwd, nickName,like) {
  const value = JSON.parse(localStorage.getItem(nickName));
  const inputPwd = Number(prompt("비밀번호를 입력하세요."));
  if (pwd == inputPwd) {
    const modifyReview = prompt("리뷰를 수정해 주세요!", value.review);
    if (modifyReview === "") {
      alert("공백은 넣을 수 없습니다!");
    } else if (modifyReview !== null) {
      let changeLike = confirm("추천여부도 변경하시겠습니까?");
      console.log(changeLike);
      if(changeLike===true){
        console.log("변경하겠습니다.")
        if(like==1){
          like=0
        }else{
          like=1
        }
        value.like = like;
        value.review = modifyReview;
      }
      localStorage.setItem(nickName, JSON.stringify(value));
      alert("수정이 완료 됐습니다!");
      location.reload();
    }
  } else if (inputPwd === 0) {
    location.reload();
  } else {
    alert("패스워드가 틀렸습니다! 다시 입력하세요");
  }
}

// 리뷰 삭제 기능
function reviewDelete(pwd, nickName) {
  const inputPwd = Number(prompt("비밀번호를 입력하세요."));

  if (pwd == inputPwd) {
    let result = confirm("정말로 삭제하시겠습니까?");
    if (result == true) {
      localStorage.removeItem(nickName);
      alert("삭제를 완료했습니다!");
    }
    location.reload();
  } else if (inputPwd === 0) {
    location.reload();
  } else if (pwd != inputPwd) {
    alert("패스워드가 틀렸습니다! 다시 입력하세요");
  }
}
// 추천 비추천 기능
const like = document.querySelector(".like");
const hate = document.querySelector(".hate");
const uncheckLike = "../image/recommend.png";
const uncheckHate = "../image/non_recommend.png";
const checkLike = "../image/check_recommend.png";
const checkHate = "../image/check_non_recommend.png";
like.addEventListener("click", (event) => {
  if ((like.src = uncheckLike)) {
    like.src = checkLike;
    hate.src = uncheckHate;
    like.setAttribute("alt", "체크_추천");
    hate.setAttribute("alt", "비추천");
  }
});
hate.addEventListener("click", (event) => {
  if ((hate.src = uncheckHate)) {
    hate.src = checkHate;
    like.src = uncheckLike;
    hate.setAttribute("alt", "체크_비추천");
    like.setAttribute("alt", "추천");
  }
});

// 영화 상세정보 가져오는 API
const getMovies = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzk1YmYxMDY5NzE1OTNkNzE1NzIwOTFkOTIwZmE0YSIsInN1YiI6IjY0NzBjNzhhMTNhMzIwMDBmOWFmYzcyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwbgGoocuoBb2hzT1gqADrIi0MjxOu-Isz2ohmnKbEs",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&page=1`, // movieId와 일치하는 영화정보 가져오기
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movie = response;

      let image = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
      let title = movie.title;
      let runtime =
        "<font color='gray'>러닝타임&emsp;|&emsp;</font>" +
        movie.runtime +
        "분";
      let releaseDate =
        "<font color='gray'>개봉&emsp;|&emsp;</font>" + movie.release_date;
      let voteAverage =
        "<font color='gray'>평점&emsp;|&emsp;</font>" + movie.vote_average;
      let overview = movie.overview;
      let originalTitle = movie.original_title;
      let voteCount =
        "<font color='gray'>투표수&emsp;|&emsp;</font>" + movie.vote_count;

      let temp_html = `<div class="movie-img">
                          <img
                            src="${image}"
                          />
                        </div>
                        <div class="content">
                          <div class="movie-title">${title}</div>
                          <div class="original-title">${originalTitle}</div>                          
                          <div class="release-date">${releaseDate}</div>
                          <div class="vote-average ${getColor(movie.vote_average)}">${voteAverage}</div>
                          <div class="runtime">${runtime}</div>
                          <div class="vote-count">${voteCount}</div>
                          <div class="overview">${overview}</div>                           
                        </div>`;

      document.getElementById("movie").innerHTML = temp_html;
    })
    .catch((err) => console.error(err));
};
getMovies();

// 평점 관련 색상
function getColor(vote) {
  if (vote >= 8) {
  return 'green'
  } else if (vote >= 5) {
  return "orange"
  } else {
  return 'red'
  }
  }
