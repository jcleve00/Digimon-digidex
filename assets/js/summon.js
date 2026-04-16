const summonBtn = document.getElementById("summonBtn");
const gachaCard = document.getElementById("gacha-card");
const result = document.getElementById("result");

summonBtn.addEventListener("click", summonDigimonGacha);

async function summonDigimonGacha() {
    summonBtn.disabled = true;
    result.innerHTML = "";

    gachaCard.classList.remove("hidden", "flip-out");
    gachaCard.classList.add("shake", "glow-pulse");

    try {
        const listResponse = await axios.get("https://digi-api.com/api/v1/digimon?pageSize=300");
        const digimonList = listResponse.data.content;

        const randomDigimon =
            digimonList[Math.floor(Math.random() * digimonList.length)];

        await delay(2200);

        gachaCard.classList.remove("shake");
        gachaCard.classList.add("flip-out");

        await delay(1000);

        const detailResponse = await axios.get(
            `https://digi-api.com/api/v1/digimon/${randomDigimon.id}`
        );

        const digimon = detailResponse.data;

        gachaCard.classList.add("hidden");
        gachaCard.classList.remove("glow-pulse", "flip-out");

        displayPulledDigimon(digimon);
    } catch (error) {
        console.error(error);
        result.innerHTML = `<p>Summon failed. Try again.</p>`;
    }

    summonBtn.disabled = false;
}

function displayPulledDigimon(digimon) {
    const gachaCard = document.getElementById("gacha-card");

    const image = digimon.images?.[0]?.href || "";
    const level = digimon.levels?.[0]?.level || "Unknown";
    const attribute = digimon.attributes?.[0]?.attribute || "Unknown";
    const type = digimon.types?.[0]?.type || "Unknown";

    // Replace the card content IN PLACE
    gachaCard.innerHTML = `
        <div class="result-card">
            <h2 class="glow">${digimon.name}</h2>
            <img src="${image}" alt="${digimon.name}">
            <p>ID: ${digimon.id}</p>
            <p>Level: ${level}</p>
            <p>Attribute: ${attribute}</p>
            <p>Type: ${type}</p>
        </div>
    `;

    // Show it again (since we hid it earlier)
    gachaCard.classList.remove("hidden");
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}