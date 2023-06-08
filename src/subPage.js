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
  //password > Number 타입으로 변환
  const pwd = Number(password);
  if (password.length < 4) {
    return alert("패스워드가 너무 짧습니다. 4자리 이상 입력해주세요!");
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
  };
  localStorage.setItem(nickName, JSON.stringify(obj));
  window.location.reload();
  reviewList();
});

// 리뷰 리스트
function reviewList() {
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
  reviewDiv.innerHTML = reviewList.map((review) => {
    return `<div class="list-div">
               <div class="writer">${review.nickName}</div>
               <div class="date">${review.date}</div>
               <div class="time">${review.time}</div>
               <div class="recommend">추천</div>
               <div class="star">⭐⭐⭐⭐⭐</div>
             <div class="list-btn">
               <button onclick="reviewModify('${review.pwd}','${review.nickName}')" class="modify-btn">수정</button>
               <button onclick="reviewDelete('${review.pwd}','${review.nickName}')" class="delete-btn">삭제</button>
             </div>
            </div>
            <div class="review-text">🔊 ${review.review}</div>`;
  });
}

// textarea 글자 수 확인
const textArea = document.querySelector("#review");
textArea.onkeyup = function () {
  const textCount = textArea.value.length;
  const p = document.querySelector(".text-count");
  p.innerText = "(" + textCount + "/1000)";
};

// 리뷰 수정 기능
function reviewModify(pwd, nickName) {
  const value = JSON.parse(localStorage.getItem(nickName));
  const inputPwd = Number(prompt("비밀번호를 입력하세요."));
  if (pwd == inputPwd) {
    const modifyReview = prompt("리뷰를 수정해 주세요!", value.review);
    if (modifyReview === "") {
      alert("공백은 넣을 수 없습니다!");
    } else if (modifyReview !== null) {
      value.review = modifyReview;
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
  console.log("pwd", pwd);
  console.log("inputPwd", inputPwd);
  console.log("nickName", nickName);
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
// 추천 비추천 기능(미구현)
const like = document.querySelector(".like");
const hate = document.querySelector(".hate");
const uncheckLike = "../image/recommend.png";
const uncheckHate = "../image/non_recommend.png";
const checkLike = "../image/check_recommend.png";
const checkHate = "../image/check_non_recommend.png";
like.addEventListener("click", (event) => {
  console.log(like.src);
  if ((like.src = uncheckLike)) {
    console.log(like.src);
    like.src = checkLike;
  } else {
    console.log(like.src);
    like.src = uncheckLike;
  }
});
hate.addEventListener("click", (event) => {
  if (hate.src == uncheckHate) {
    hate.src = checkHate;
  } else if (like.src !== uncheckHate) {
    hate.src = uncheckHate;
  }
});
