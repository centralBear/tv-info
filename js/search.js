(async function () {
    const appData = {
        searchString: '',
        searchedShowList: []
    }

    const searchFormElement = document.querySelector('#search-form')
    const mainInput = document.querySelector('#main-input');
    const searchButton = document.querySelector('#search-button');
    const showListElement = document.querySelector('#show-list');
    
    const showTemplate = document.createElement('li');
    showTemplate.classList.add('show-list__item');
    const img = document.createElement('img');
    img.classList.add('show-list__poster');
    const title = document.createElement('h2');
    title.classList.add('show-list__name');
    const link = document.createElement('a');
    link.classList.add('show-list__link');
    const summary = document.createElement('p');
    summary.classList.add('show-list__summary');
    title.append(link)
    showTemplate.append(img, title, summary);

    const placeholderElement = document.createElement('li');
    placeholderElement.classList.add('show-list__placeholder');
    const placehodlerTextElement = document.createElement('p');
    placehodlerTextElement.classList.add('show-list__placeholder-text');
    placehodlerTextElement.textContent = 'TV shows not found';
    placeholderElement.append(placehodlerTextElement)

    async function getData(searchString) {
        const response =  await fetch(`https://api.tvmaze.com/search/shows?q=${searchString}`);
        const parsedResponse = await response.json();
        
        return parsedResponse;
    }


    function getShowElement(showItem) {
        const showElement = showTemplate.cloneNode(true);
        const img = showElement.querySelector('.show-list__poster');
        const title = showElement.querySelector('.show-list__name');
        const link = title.querySelector('.show-list__link');
        const summary = showElement.querySelector('.show-list__summary');

        img.src = showItem.show.image?.medium ? showItem.show.image.medium : 'https://via.placeholder.com/210x295.png?text=Placeholder';
        img.alt = `Poster of '${showItem.show.name}'`;
        link.textContent = showItem.show.name;
        link.href = `show.html?id=${showItem.show.id}`
        summary.innerHTML = showItem.show.summary;

        return showElement;
    } 

    function renderShowList(showList) {
        while (showListElement.firstChild) {
            showListElement.removeChild(showListElement.firstChild);
        }

        if (!showList.length) {
            showListElement.append(placeholderElement);
            return;
        }

        showList.forEach((showItem) => {
            showListElement.append(getShowElement(showItem));
        });
    }

    document.addEventListener('DOMContentLoaded', async () => {
        appData.searchedShowList = await getData(appData.searchString);

        renderShowList(appData.searchedShowList)
    });

    mainInput.addEventListener('change', (event) => {
        appData.searchString = event.currentTarget.value.trim();
    });

    searchFormElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (appData.searchString) {
            appData.searchedShowList = await getData(appData.searchString);

            renderShowList(appData.searchedShowList)
        }
    })

    searchButton.addEventListener('click', async () => {
        appData.searchedShowList = await getData(appData.searchString);

        renderShowList(appData.searchedShowList)
    });
})();