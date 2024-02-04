/**
 *  OMDb template
 *	Documentation: http://www.omdbapi.com/
 *  Generate an API key here: http://www.omdbapi.com/apikey.aspx
 */


/**
* According to documentation, you need at least 2 parameters when calling the API http://www.omdbapi.com/
* 1 Required parameter: apikey
* 2 Required parameter: One of the following i=, t= or s=
*
* 
* Example with parameter s=star trek
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek
*
* Example with parameter s=star trek AND y=2020
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&y=2020
*
* Example with parameter s=star trek AND type=series
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&type=series
*
*/
// let url = 'http://www.omdbapi.com/?apikey=[yourkey]=star trek';


let apiKey = 28550526; 
let searchInput = document.getElementById("search");
let movieContainer = document.getElementById("seriesList"); 
let filmsArray = [];

searchInput.addEventListener("input", searchMovie);

async function searchMovie() {
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`;
    
    try {
        const response = await fetch(url); 
        if (!response.ok) {
            throw new Error(`HTTP error code: ${response.status}, HTTP error message: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.Response === "True") { 
            let movieDetails = "";
            filmsArray = data.Search;
            for (let movie of data.Search) {
                    movieDetails += `
                    <div class="movie">
                    <img src="${movie.Poster}" alt="Movie Poster">
                    <h2>${movie.Title}</h2>
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                    </div>
                    `;
                };
                movieContainer.innerHTML = movieDetails; 
                
        } else if (searchInput.value === "") {
            movieContainer.innerHTML = "";
        }
        
        else {   
            movieContainer.innerHTML = `<p id=noMovie> No movies found.</p>`;
        }
    } catch (error) {
        console.log(error);
        movieContainer.innerText = "Some issues with the server. Please try again later!";
    }
}

document.getElementById("sortYear").addEventListener("click", function() {
    filmsArray.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    displayMovies(filmsArray)
})

function displayMovies(movies) {
    let movieDetails = "";
    for (let movie of movies) {
        movieDetails += `
        <div class="movie">
        <img src="${movie.Poster}" alt="Movie Poster">
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
        </div>
        `;
    }
    movieContainer.innerHTML = movieDetails;
}