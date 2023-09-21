const searchform = document.querySelector("form");
const moviecontainer = document.querySelector(".movie-container");
const inputbox = document.querySelector(".inputbox");

// function to fetch movie details using omdb api
const getmovieinfo = async (movie) => {
  try {
    const myapikey = `878a037b`;
    const url = `http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "unable to fecth movies data.."
      ); /* using(throw new) for showing error message*/
    }

    const data = await response.json();

    showmoviedata(data);
  } catch (error) {
    showerrorMessage("No Movie Found!!!");
  }
};

// function to show movie data on screen
const showmoviedata = (data) => {
  moviecontainer.innerHTML = "";
  moviecontainer.classList.remove("nobackground");
  // use destructuring assignment to extract properties from data object
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, poster } =
    data;

  const movieelement = document.createElement("div"); // yah javascript me ase div banata hai(div hai movieelement)
  movieelement.classList.add("movie-info");
  movieelement.innerHTML = `<h2>${Title}</h2>
                               <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

  const moviegenreelement = document.createElement("div");
  movieelement.classList.add("movie-genre");
  moviecontainer.appendChild(movieelement);

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = element;
    moviegenreelement.appendChild(p);
  });

  moviecontainer.appendChild(movieelement); // appendchilde ke matlab he ki moviecontainer ke saat last me movieelement div vi add ho jaye gaa

  movieelement.innerHTML += `<p><strong>Released Date: &#11088;</strong>${Released}</p>
                                <p><strong>Duration: &#11088;</strong>${Runtime}</p>
                                <p><strong>Cast: &#11088;</strong>${Actors}</p>
                                <p><strong>Plot: &#11088;</strong>${Plot}</p>`;

  // creating a div for movie poster
  const movieposterelement = document.createElement("div");
  movieposterelement.classList.add("movie-poster");
  movieposterelement.innerHTML = `<img src="${poster}"/>`;
  moviecontainer.appendChild(movieposterelement);
  moviecontainer.appendChild(movieelement);
};

//adding event listener to search box
searchform.addEventListener("submit", (e) => {
  e.preventDefault(); /*he stope the auto sumbit of form*/
  const moviename = inputbox.value.trim();
  if (moviename !== "") {
    getmovieinfo(moviename);
  } else {
    moviecontainer.innerHTML = `<h2>enter movie name for movie detials</h2>`;
    moviecontainer.classList.add("nobackground");
  }
});
