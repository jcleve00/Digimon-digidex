const summonBtn = document.getElementById("summonBtn");
const gachaCard = document.getElementById("gacha-card");

summonBtn.addEventListener("click", summonDigimonGacha);

async function summonDigimonGacha() {
    summonBtn.disabled = true;

    // reset summon card each time
    gachaCard.innerHTML = `
        <div class="card-front">
            <p class="glow">DIGIMON</p>
        </div>
    `;

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

        gachaCard.classList.remove("glow-pulse", "flip-out");

        displayPulledDigimon(digimon);
    } catch (error) {
        console.error(error);
        gachaCard.classList.remove("shake", "glow-pulse", "flip-out");
        gachaCard.innerHTML = `<p>Summon failed. Try again.</p>`;
        gachaCard.classList.remove("hidden");
    }

    summonBtn.disabled = false;
}

function getRarity(level) {
    if (level.includes("Mega") || level.includes("Ultra")) return "legendary";
    if (level.includes("Perfect") || level.includes("Ultimate")) return "rare";
    return "common";
}

function displayPulledDigimon(digimon) {
    const image = digimon.images?.[0]?.href || "";
    const level = digimon.levels?.[0]?.level || "Unknown";
    const attribute = digimon.attributes?.[0]?.attribute || "Unknown";
    const type = digimon.types?.[0]?.type || "Unknown";

    const rarity = getRarity(level);

    gachaCard.innerHTML = `
        <div class="result-card ${rarity}">
            <h2 class="glow">${digimon.name}</h2>
            <img src="${image}" alt="${digimon.name}">
            <p>ID: ${digimon.id}</p>
            <p>Level: ${level}</p>
            <p>Attribute: ${attribute}</p>
            <p>Type: ${type}</p>
        </div>
    `;

    gachaCard.classList.remove("hidden");
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}