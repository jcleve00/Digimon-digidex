let allDigimon = [];

// =====================
// LOAD ALL DIGIMON ONCE
// =====================
async function loadAllDigimon() {
    let page = 0;
    allDigimon = [];

    try {
        while (true) {
            const res = await axios.get(
                `https://digi-api.com/api/v1/digimon?page=${page}`
            );

            const data = res.data.content;

            if (!data || data.length === 0) break;

            allDigimon.push(...data);

            page++;
        }
    } catch (err) {
        console.error("Failed loading list:", err);
    }
}

// =====================
// DISPLAY IMAGE
// =====================
function displayImage(imageUrl) {
    const img = document.getElementById("digi-detail-image");

    if (!img) return;

    img.src = imageUrl;
}

// =====================
// GET DIGIMON BY ID (SAFE)
// =====================
function getDigimonById(id) {
    console.log("Searching for ID:", id);

    const digimon = allDigimon.find(d => d.id === id);

    if (!digimon) {
        console.error("Digimon not found for ID:", id);
        return;
    }

    displayImage(digimon.image);
}

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", async () => {

    const digiDiv = document.getElementById("digivice-div");

    document.body.style.background = "radial-gradient(circle, #111a33, #05070f)";

    await loadAllDigimon();

    const params = new URLSearchParams(window.location.search);
    let id = Number(params.get("id"));

    if (!id) {
        console.error("No ID in URL");
        return;
    }

    getDigimonById(id);

    // =====================
    // BACK BUTTON
    // =====================
    document.getElementById("back-button")
        .addEventListener("click", () => {
            window.location.href = "index.html";
        });

    // =====================
    // NEXT
    // =====================
    document.getElementById("next-button")
        .addEventListener("click", () => {
            if (id < allDigimon.length) {
                id++;
                getDigimonById(id);
            }
        });

    // =====================
    // PREV
    // =====================
    document.getElementById("prev-button")
        .addEventListener("click", () => {
            if (id > 1) {
                id--;
                getDigimonById(id);
            }
        });

});