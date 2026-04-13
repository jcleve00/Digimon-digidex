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
/**
 * @typedef {Object} DigimonData
 * @property {number} id - Unique ID
 * @property {string} name - Digimon name
 * @property {string} image - Image url
 */
/**
 * Creates and renders a grid of Digimon cards.
 * @param {DigimonData[]} digimonList - Array of Digimon objects
 */
function displayCards(digimonList) {
    // Empty list to hold the cards
    let cards = [];
    // Iterate through digimonList and create the card elements 
    digimonList.forEach(d => {
        const cardDiv = document.createElement("div");
        Object.assign(cardDiv.style, {
            flex: '1 1 20%',
            display: 'flex',
            flexDirection: 'column',
            background: 'grey',
            width: '300px',
            height: '500px',
            margin: '10px auto',
            borderRadius: '5px',
            border: '2px solid black',
            boxShadow: '0 0 10px'
        });

        const cardName = document.createElement('h3');
        cardName.textContent = d.name;
        Object.assign(cardName.style, {
            textAlign: 'center',
            color: 'black',
            textShadow: '1px 1px 2px black'
        });

        const image = document.createElement('img');
        image.src = d.image;
        image.alt = `A image of ${d.name}, from Digimon.`;
        Object.assign(image.style, {
            width: '200px',
            margin: '0px auto',
            border: '1px solid darkGreen',
            boxShadow: '0px 0px 10px white',
        });
        // Create the card and push it the cards list
        cardDiv.appendChild(cardName)
        cardDiv.appendChild(image);
        cards.push(cardDiv);
    });
    // Create the cardGrid element then play the cards
    const cardGrid = document.createElement('div');
    Object.assign(cardGrid.style, {
        display: 'flex',
        flexFlow: 'row wrap',
    });
    cards.forEach(card => {
        cardGrid.appendChild(card);
    });
    document.body.appendChild(cardGrid);
}
document.addEventListener("DOMContentLoaded", async () => {
    // Request the data from the api
    const digimon = await getAllDigimon();
    // Sort in aplhabetical order by name
    let sortedDigimon = digimon.sort((a, b) => a.name.localeCompare(b.name));
    console.log(digimon);
    
    displayCards(sortedDigimon);

});