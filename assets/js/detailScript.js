let currentId = null;

// SEARCH FUNCTION
async function searchDigimon() {
    const name = document.getElementById("searchInput").value.trim();

    if (!name) {
        document.getElementById("result").innerHTML = "Enter a Digimon name.";
        return;
    }

    try {
        // search
        const searchRes = await fetch(
            `https://digi-api.com/api/v1/digimon?name=${encodeURIComponent(name)}&exact=true`
        );

        const searchJson = await searchRes.json();
        const found = searchJson.content?.[0];

        if (!found) throw new Error();

        //get FULL data using ID
        const detailRes = await fetch(
            `https://digi-api.com/api/v1/digimon/${found.id}`
        );

        const data = await detailRes.json();

        currentId = Number(data.id);

        displayImage(data.images?.[0]?.href || "");
        displayData(data);

    } catch {
        document.getElementById("result").innerHTML = "Digimon not found";
    }
}
// GET BY ID (for next/prev)
async function getDigimonById(id) {
    try {
        const res = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);
        const data = await res.json();

        currentId = Number(data.id);

        displayImage(data.images?.[0]?.href || "");
        displayData(data);

    } catch (error) {
        console.log(error);
        alert("Failed to retrieve Digimon");
    }
}

//DISPLAY IMAGE
function displayImage(image) {
    const imgElement = document.getElementById('digi-detail-image');
    if (imgElement) {
        imgElement.src = image;
    }
}

//DISPLAY DATA
function displayData(data) {
    const result = document.getElementById("result");

    const englishDesc = data.descriptions?.find(
        desc => desc.language === "en_us"
    );

    result.innerHTML = `
        <div class="card">
            <h2>${data.name || "Unknown"}</h2>
            <p><b>ID:</b> ${data.id}</p>
            <p><b>Level:</b> ${data.levels?.[0]?.level || "Unknown"}</p>
            <p><b>Type:</b> ${data.types?.[0]?.type || "Unknown"}</p>
            <p><b>Attribute:</b> ${data.attributes?.[0]?.attribute || "Unknown"}</p>
            <p>${englishDesc?.description || "No description available"}</p>
        </div>
    `;
}

// NEXT
function getNext() {
    if (currentId < 1488) {
        currentId++;
        getDigimonById(currentId);
    }
}

// PREV
function getPrev() {
    if (currentId > 1) {
        currentId--;
        getDigimonById(currentId);
    }
}

// BACK
function goBack() {
    window.location.href = "browse.html";
}

//EVENTS
document.addEventListener("DOMContentLoaded", () => {
    const urlId = Number(new URLSearchParams(window.location.search).get('id'));

    if (!isNaN(urlId) && urlId > 0) {
        currentId = urlId;
        getDigimonById(currentId);
    }

    document.getElementById('next-button')?.addEventListener('click', getNext);
    document.getElementById('prev-button')?.addEventListener('click', getPrev);
    document.getElementById('back-button')?.addEventListener('click', goBack);
});