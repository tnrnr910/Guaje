const searchParams = new URLSearchParams(location.search);
// console.log(searchParams.get("id"));

const movieId = searchParams.get("id");

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
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movie = response;
      // const movie = Object.entries(response);

      let image = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
      let title = movie.title;
      let runtime =
        "<font color='gray'>러닝타임&emsp;</font>" + movie.runtime + "분";
      let releaseDate =
        "<font color='gray'>개봉&emsp;&emsp;&emsp;</font>" + movie.release_date;
      let voteAverage =
        "<font color='gray'>평점&emsp;&emsp;</font>" + movie.vote_average;
      let overview = movie.overview;
      let originalTitle = movie.original_title;
      let voteCount =
        "<font color='gray'>투표수&emsp;</font>" + movie.vote_count;

      let temp_html = `<div class="movie-img">
                          <img
                            src="${image}"
                          />
                        </div>
                        <div class="not-img1">
                          <div class="movie-title">${title}</div>
                          <div class="original-title">${originalTitle}</div>                          
                          <div class="release-date">${releaseDate}</div>
                          <div class="vote-average">${voteAverage}</div>
                          <div class="runtime">${runtime}</div>
                          <div class="vote-count">${voteCount}</div>
                          <div class="overview">${overview}</div>                           
                        </div>`;

      document.getElementById("movie").innerHTML = temp_html;

      // let element = document.querySelector("#movie"); // DOM 제어
      // element.insertAdjacentHTML("beforeend", temp_html);
    })
    .catch((err) => console.error(err));
};
getMovies();
