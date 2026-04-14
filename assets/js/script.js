// Keeps track of digimon added to grid
let currentIndex = 0;

// Gets all digimon from server
async function getAllDigimon() {
    const allDigimon = [];
    let page = 0;

    while (true) {
        const res = await axios.get(
            `https://digi-api.com/api/v1/digimon?page=${page}`
        );

        const data = res.data.content;

        if (!data || data.length === 0) break;

        allDigimon.push(
            ...data.map(d => ({
                id: d.id,
                name: d.name,
                image: d.image
            }))
        );

        page++;
    }

    return allDigimon;
}

function displayCards(digimonList) {
    offset = currentIndex + 12;
    const cardGrid = document.getElementById('card-grid');

    let slicedList = digimonList.slice(currentIndex, offset);

    slicedList.forEach(d => {
        const cardDiv = document.createElement("div");
        cardDiv.className = 'cardDiv';
        
        const cardName = document.createElement('h3');
        cardName.textContent = d.name;
        
        const image = document.createElement('img');
        image.className = 'digi-image';
        image.src = d.image;
        image.alt = `A image of ${d.name}, from Digimon.`;

        const cardId = document.createElement('p');
        cardId.textContent = `#${d.id}`;
        
        // Create the card and push it the cards list
        cardDiv.appendChild(cardName)
        cardDiv.appendChild(image);
        cardDiv.appendChild(cardId);

        cardDiv.addEventListener('click', () => {
            window.location.href = `detail.html?id=${d.id}`;
        });
        
        cardGrid.appendChild(cardDiv);
    });
    currentIndex += 12;
}

document.addEventListener("DOMContentLoaded", async () => {
    // Request the data from the api
    const digimon = await getAllDigimon();
    // Sort in aplhabetical order by name
    // let sortedDigimon = digimon.sort((a, b) => a.name.localeCompare(b.name));
    
    // Display cards when page loads
    displayCards(digimon);

    // Load more cards when load button clicked
    const loadMoreBtn = document.getElementById("load-more-button");
    
    loadMoreBtn.addEventListener('click', () => {
        displayCards(digimon);
    });    

});