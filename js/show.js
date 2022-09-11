(async function () {
    const appData = {
        showData: null,
        id: null,
    }

    appData.id = new URLSearchParams(window.location.search).get('id');


    async function getShowData(id) {
        const response =  await fetch(`https://api.tvmaze.com/shows/${id}`);
        const parsedResponse = await response.json();
        
        return parsedResponse;
    }


    function setShowData(showData) {
        const titleElement = document.querySelector('.header__title');
        const showElement = document.querySelector('.show');
        const showPoster = showElement.querySelector('.show__poster');
        const showDescription = showElement.querySelector('.show__description');
        const showRating = showElement.querySelector('.show__rating');
        const showGenres = showElement.querySelector('.show__genres');
        const showLanguage = showElement.querySelector('.show__language');
        const showStatus = showElement.querySelector('.show__status');
        const showType = showElement.querySelector('.show__type');

        titleElement.textContent = showData.name;

        showPoster.src = showData.image?.original ? showData.image.original : 'https://via.placeholder.com/210x295.png?text=Placeholder';
        showDescription.innerHTML = showData.summary;
        showRating.append(` ${showData.rating.average ? showData.rating.average : '-'}`);

        if (!showData.genres.length) {
            showGenres.append(' -')
        } else {
            showData.genres.forEach((genre, index) => {
                showGenres.append(` ${genre}${index !== showData.genres.length - 1 ? ',' : ''}`);
            });
        }

        showLanguage.append(` ${showData.language}`);
        showStatus.append(` ${showData.status}`);
        showType.append(` ${showData.type}`);

    }
    
    document.addEventListener('DOMContentLoaded', async () => {
        appData.showData = await getShowData(appData.id);

        setShowData(appData.showData);
    });
})();