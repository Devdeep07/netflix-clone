const trendingMovies = [
    { id: 1, title: 'Movie 1', image: 'https://via.placeholder.com/200' },
    { id: 2, title: 'Movie 2', image: 'https://via.placeholder.com/200' },
    { id: 3, title: 'Movie 3', image: 'https://via.placeholder.com/200' },
    { id: 4, title: 'Movie 4', image: 'https://via.placeholder.com/200' }
];

const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];

document.addEventListener('DOMContentLoaded', function() {
    displayMovies(trendingMovies, document.getElementById('trending-movies'));
    displayMovies(watchedMovies, document.getElementById('watched-movies'));

    document.getElementById('search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMovies = trendingMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        displayMovies(filteredMovies, document.getElementById('trending-movies'));
    });
});

function displayMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            ${container.id === 'trending-movies' ? '<button onclick="markAsWatched(' + movie.id + ')">Mark as Watched</button>' : ''}
        `;
        container.appendChild(movieElement);
    });
}

function markAsWatched(id) {
    const movie = trendingMovies.find(movie => movie.id === id);
    if (movie && !watchedMovies.some(watched => watched.id === id)) {
        watchedMovies.push(movie);
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        displayMovies(watchedMovies, document.getElementById('watched-movies'));
    }
}
