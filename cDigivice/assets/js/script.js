async function searchDigimon() {
    const name = document.getElementById("searchInput").value.toLowerCase();

    try {
        const res = await fetch(`https://digi-api.com/api/v1/digimon/${name}`);
        const data = await res.json();

        displayDigimon(data);
    } catch {
        document.getElementById("result").innerHTML = "Digimon not found";
    }
}

function displayDigimon(d) {
    const img = document.getElementById("digimonImage");

    // PUT IMAGE INSIDE DIGIVICE HOPEFULLY
    img.src = d.images[0].href;
    img.style.display = "block";

    // TEXT INFO
    document.getElementById("result").innerHTML = `
        <div class="card">
            <h2>${d.name}</h2>
            <p><b>Level:</b> ${d.levels[0]?.level || "Unknown"}</p>
            <p><b>Type:</b> ${d.types[0]?.type || "Unknown"}</p>
            <p><b>Attribute:</b> ${d.attributes[0]?.attribute || "Unknown"}</p>
            <p>${d.descriptions?.[0]?.description || "No description"}</p>
        </div>
    `;
}