//variables
const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
//inserting movies
const movies = [];

//
const updateUI = () => {
    if(movies.length === 0){
        entryTextSection.style.display = 'block';
    }else{
        entryTextSection.style.display = 'none';
    }
}

//delete movie
const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletion();
    updateUI();
}

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}

const closeMovieDeletion = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}


//delete movie handler
const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    
    // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null,movieId));
    cancelDeletionButton.removeEventListener('click', closeMovieDeletion.bind(null,movieId));
    
    cancelDeletionButton.addEventListener('click', closeMovieDeletion);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null,movieId));
    toggleBackdrop();
    // listRoot.removeChild(listRoot.children[movieIndex]);
}



//render screen
const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null,id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);

}
//toggle dark gray backdrop
const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

//toggle modal
const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
}

//clear all inputs value
const clearMovieInputs = () => {
    for(const input of userInputs){
        input.value = '';
    }

}

//cancel button
const cancelAddMovie = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
}


//add movie 
const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(titleValue.trim() == '' || imageUrlValue.trim() === '' || ratingValue.trim() == '' || +ratingValue < 1 || +ratingValue > 5){
        alert('Please enter valid values.');
    }

    const newMovie = {
        id : Math.random().toString(),
        title : titleValue,
        image : imageUrlValue,
        rating : ratingValue
    }

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderNewMovieElement(newMovie.id,newMovie.title,newMovie.image, newMovie.rating);
    updateUI();
} 

const backDropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletion();
}

//some event listeners
startAddMovieButton.addEventListener('click', showMovieModal); 
backdrop.addEventListener('click', backDropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovie);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
