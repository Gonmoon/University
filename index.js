document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const moviesContainer = document.querySelector('.movies-container');
    const loadMoreButton = document.querySelector('.load-more');
    const loader = document.querySelector('.loader');
    const errorMessage = document.querySelector('.error-message');
    const sortSelect = document.querySelector('.sort-select');

    let currentPage = 1;
    let currentSearchTerm = '';
    let totalResults = 0;
    let allMovies = [];
    const API_KEY = '324d1581';

    function toggleLoader(show) {
        loader.style.display = show ? 'block' : 'none';
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function clearMovies() {
        moviesContainer.innerHTML = '';
        allMovies = [];
    }

    function updateLoadMoreButton() {
        const hasMoreResults = allMovies.length < totalResults;
        loadMoreButton.style.display = hasMoreResults ? 'block' : 'none';
        loadMoreButton.disabled = !hasMoreResults;
        console.log(`Total: ${totalResults}, Loaded: ${allMovies.length}, Has more: ${hasMoreResults}`);
    }

    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';

        const poster = movie.Poster && movie.Poster !== 'N/A' 
            ? movie.Poster 
            : 'https://bestclinic.by/wp-content/uploads/2024/10/no_photo.png';

        card.innerHTML = `
            <img src="${poster}" alt="${movie.Title}" class="movie-poster" onerror="this.src='https://bestclinic.by/wp-content/uploads/2024/10/no_photo.png'">
            <div class="movie-info">
                <h3 class="movie-title">${movie.Title}</h3>
                <p class="movie-year">${movie.Year || 'N/A'}</p>
                <p class="movie-type">${movie.Type || 'movie'}</p>
            </div>
        `;

        return card;
    }

    function displayMovies(movies) {
        if (!movies || movies.length === 0) {
            moviesContainer.innerHTML = '<div class="no-results">No movies found</div>';
            return;
        }

        if (currentPage === 1) {
            moviesContainer.innerHTML = '';
        }

        movies.forEach(movie => {
            const card = createMovieCard(movie);
            if (card) moviesContainer.appendChild(card);
        });
    }

    function sortMovies() {
        const sortValue = sortSelect.value;
        
        switch(sortValue) {
            case 'title-asc':
                allMovies.sort((a, b) => a.Title.localeCompare(b.Title));
                break;
            case 'title-desc':
                allMovies.sort((a, b) => b.Title.localeCompare(a.Title));
                break;
            case 'year-asc':
                allMovies.sort((a, b) => (a.Year || '0').localeCompare(b.Year || '0'));
                break;
            case 'year-desc':
                allMovies.sort((a, b) => (b.Year || '0').localeCompare(a.Year || '0'));
                break;
            default:
                break;
        }
        
        displayMovies(allMovies);
    }

    async function loadDefaultMovies() {
        toggleLoader(true);
        hideError();

        try {
            const defaultSearchTerms = ['avengers', 'batman', 'superman', 'spiderman'];
            const randomTerm = defaultSearchTerms[Math.floor(Math.random() * defaultSearchTerms.length)];
            
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${randomTerm}&type=movie&page=1`);
            const data = await response.json();

            if (data.Response === 'True') {
                allMovies = data.Search.slice(0, 8);
                totalResults = data.totalResults;
                displayMovies(allMovies);
                loadMoreButton.style.display = 'none';
            } else {
                showError(data.Error || 'Failed to load default movies');
            }
        } catch (error) {
            showError('Failed to fetch default movies. Please try again later.');
            console.error('Error fetching default movies:', error);
        } finally {
            toggleLoader(false);
        }
    }

    async function fetchMovies(searchTerm, page = 1) {
        if (!searchTerm.trim()) {
            showError('Please enter a search term');
            return;
        }

        toggleLoader(true);
        hideError();
        
        if (page === 1) {
            clearMovies();
            loadMoreButton.style.display = 'none';
        }

        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`);
            const data = await response.json();

            console.log('API Response:', data);

            if (data.Response === 'True') {
                if (page === 1) {
                    totalResults = parseInt(data.totalResults);
                    allMovies = data.Search;
                } else {
                    allMovies = [...allMovies, ...data.Search];
                }
                
                displayMovies(allMovies);
                updateLoadMoreButton();
                
                if (allMovies.length >= totalResults) {
                    loadMoreButton.style.display = 'none';
                }
            } else {
                showError(data.Error || 'No results found');
                loadMoreButton.style.display = 'none';
                
                if (page === 1) {
                    moviesContainer.innerHTML = '<div class="no-results">No movies found</div>';
                }
            }
        } catch (error) {
            showError('Failed to fetch movies. Please try again later.');
            console.error('Error fetching movies:', error);
            loadMoreButton.style.display = 'none';
        } finally {
            toggleLoader(false);
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) {
            showError('Please enter a search term');
            return;
        }
        
        if (searchTerm !== currentSearchTerm) {
            currentSearchTerm = searchTerm;
            currentPage = 1;
            fetchMovies(searchTerm);
        } else {
            currentPage++;
            fetchMovies(searchTerm, currentPage);
        }
    }

    loadDefaultMovies();

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    loadMoreButton.addEventListener('click', function() {
        currentPage++;
        fetchMovies(currentSearchTerm, currentPage);
    });

    sortSelect.addEventListener('change', function() {
        if (allMovies.length > 0) {
            sortMovies();
        }
    });
});