
const moviesList = [
    { title: "The Shawshank Redemption", genre: "Drama" },
    { title: "The Godfather", genre: "Crime" },
    { title: "The Godfather: Part II", genre: "Crime" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "12 Angry Men", genre: "Drama" },
    { title: "Schindler's List", genre: "Drama" },
    { title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
    { title: "Pulp Fiction", genre: "Crime" },
    { title: "The Good, the Bad and the Ugly", genre: "Western" },
    { title: "Fight Club", genre: "Drama" },
    { title: "Forrest Gump", genre: "Drama" },
    { title: "Inception", genre: "Action" },
    { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
    { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
    { title: "The Matrix", genre: "Action" },
    { title: "Goodfellas", genre: "Crime" },
    { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
    { title: "Seven Samurai", genre: "Adventure" },
    { title: "Se7en", genre: "Crime" },
    { title: "City of God", genre: "Crime" },
    { title: "The Silence of the Lambs", genre: "Thriller" },
    { title: "It's a Wonderful Life", genre: "Drama" },
    { title: "Life is Beautiful", genre: "Comedy" },
    { title: "The Usual Suspects", genre: "Crime" },
    { title: "Léon: The Professional", genre: "Action" },
    { title: "Spirited Away", genre: "Animation" },
    { title: "Saving Private Ryan", genre: "Drama" },
    { title: "Interstellar", genre: "Adventure" },
    { title: "The Green Mile", genre: "Drama" },
    { title: "The Prestige", genre: "Drama" },
    { title: "The Intouchables", genre: "Comedy" },
    { title: "The Lion King", genre: "Animation" },
    { title: "The Pianist", genre: "Drama" },
    { title: "The Departed", genre: "Crime" },
    { title: "Whiplash", genre: "Drama" },
    { title: "Gladiator", genre: "Action" }
]
// local storage
localStorage.setItem('movieList', JSON.stringify(moviesList))
let movies = JSON.parse(localStorage.getItem('movieList'))

const title = document.getElementById('title');
const genre = document.getElementById('genre');
const display = document.getElementById('display');
const countTag = document.getElementById('count');
let drop = document.getElementById('search');
const displayMap = document.getElementById('dis-genre-count')
let result = [];

drop.addEventListener('change', function (event) {
    display.innerHTML = "";
    displayMap.innerHTML = "";
    if (title.value.length > 0 && drop.value == "Search by title") {
        result = searchByTitle(title.value);
    }
    else if (genre.value.length > 0 && drop.value == "Search by Genre") {
        result = searchByGenre(genre.value);
    }
    else if (title.value.length > 0 && genre.value.length > 0 && drop.value == "Search by Both") {
        let name = title.value;
        let gen = genre.value;
        result = searchBoth(name, gen);
        if (result.length == 0) {
            display.innerHTML = `<h3>No results Found</h3>`
        }
    }
    displayResults(result);
    genre.value = "";
    title.value = "";
})

function searchByTitle(search) {
    return movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase().trim()));
}

function searchByGenre(search) {
    return movies.filter(movie => movie.genre.toLowerCase().includes(search.toLowerCase().trim()));
}

function searchBoth(searchTitle, searchGenre) {
    let searchedbytitle = movies.filter(movie => movie.title.toLowerCase().includes(searchTitle.toLowerCase().trim()));
    return searchedbytitle.filter(movie => movie.genre.toLowerCase().includes(searchGenre.toLowerCase().trim()));
}

function displayResults(list) {
    display.innerHTML = "";
    list.map(ele => {
        let list = `<li>${ele.title}(${ele.genre})</li>`;
        display.innerHTML += list
    })
    let num = countByGenre(list)

    if (num.size == 0) {
        display.innerHTML = `<h3>No results Found</h3>`
    }
    for (let [key, value] of num.entries(num)) {
        displayMap.innerHTML += `<h4>${key} :${value}</h4>`
    }
}

function displaySortedResults(list) {
    display.innerHTML = "";
    list.map(ele => {
        let list = `<li>${ele.title}(${ele.genre})</li>`;
        display.innerHTML += list
    })
}

function countByGenre(result) {
    let mapGenre = new Map()
    for (let i = 0; i < result.length; i++) {
        if (mapGenre.has(result[i].genre)) {
            mapGenre.set(result[i].genre, mapGenre.get(result[i].genre) + 1)
        } else {
            mapGenre.set(result[i].genre, 1)
        }
    }
    return mapGenre;
}

function sortByTitle() {
    const sortedTitle = result.sort((a, b) => a.title.localeCompare(b.title));
    displaySortedResults(sortedTitle)
}

function sortByGenre() {
    const sortedGenre = result.sort((a, b) => a.genre.localeCompare(b.genre));
    displaySortedResults(sortedGenre)
}
