// Keeps track of digimon added to grid
let allDigimon = [];
let displayedDigimon = [];
let currentIndex = 0;
let currentSort = "id-asc";

// Gets all digimon from server
async function getAllDigimon() {
    const list = [];
    let page = 0;

    while (true) {
        const res = await axios.get(
            `https://digi-api.com/api/v1/digimon?page=${page}`
        );

        const data = res.data.content;

        if (!data || data.length === 0) break;

        list.push(
            ...data.map(d => ({
                id: d.id,
                name: d.name,
                image: d.image
            }))
        );

        page++;
    }

    return list;
}

function displayCards() {
    offset = currentIndex + 12;
    const cardGrid = document.getElementById('card-grid');

    let slicedList = allDigimon.slice(currentIndex, offset);

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
        cardDiv.append(cardName, image, cardId);

        cardDiv.addEventListener('click', () => {
            window.location.href = `search.html?id=${d.id}`;
        });
        
        cardGrid.appendChild(cardDiv);
    });
    currentIndex += 12;
}
function applySort() {
    switch (currentSort) {
        case "id-asc":
            allDigimon.sort((a, b) => a.id - b.id);
            break;
        case "id-desc":
            allDigimon.sort((a, b) => b.id - a.id);
            break;
        case "name-asc":
            allDigimon.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            allDigimon.sort((a, b) => b.name.localeCompare(a.name));
            break;
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    // Request the data from the api
    allDigimon = await getAllDigimon();
    
    // Display cards when page loads
    displayCards();

    // Load more cards when load button clicked
    const loadMoreBtn = document.getElementById("load-more-button");
    
    loadMoreBtn.addEventListener('click', () => {
        displayCards();
    });    
    document.getElementById("sortSelect").addEventListener("change", (e) => {
        currentSort = e.target.value;

        currentIndex = 0;
        document.getElementById("card-grid").innerHTML = "";

        applySort();
        displayCards();
    });

});

