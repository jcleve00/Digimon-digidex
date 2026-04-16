let currentId = null;
async function searchDigimon() {
    const name = document.getElementById("searchInput").value.toLowerCase();

    try {
        const res = await fetch(`https://digi-api.com/api/v1/digimon/${name}`);
        const data = await res.json();

        currentId = Number(data.id);
        

        displayImage(data.images[0].href);
        displayData(data);
    } catch {
        document.getElementById("result").innerHTML = "Digimon not found";
    }
}
async function getDigimonById(id) {
    try {
        const res = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);
        const data = await res.json();

        currentId = Number(data.id);

        displayImage(data.images[0].href);
        displayData(data);
    } catch (error) {
        console.log(error);
        alert(`Failed to retrieve digimon`);
    }
}
function displayImage(image) {
    const digiviceScreen = document.querySelector('#digivice-screen');
    const imgElement = document.getElementById('digi-detail-image');
    const mobileImg = document.getElementById('mobile-digi-image');

    if (imgElement) {
        imgElement.src = image;
    }

    if (mobileImg) {
        mobileImg.src = image;
    }
}
function displayData(data) {
    document.getElementById("result").innerHTML = `
        <div class="card">
            <h2>${data.name}</h2>
            <p><b>Level:</b> ${data.levels[0]?.level || "Unknown"}</p>
            <p><b>Type:</b> ${data.types[0]?.type || "Unknown"}</p>
            <p><b>Attribute:</b> ${data.attributes[0]?.attribute || "Unknown"}</p>
            <p>${data.descriptions?.[0]?.description || "No description"}</p>
        </div>
    `;
}
function getNext() {
    if (currentId < 1488) {
        currentId += 1;
        getDigimonById(currentId);
    }
}
function getPrev() {
    if (currentId > 1) {
        currentId -= 1;
        getDigimonById(currentId);
    }
}

function goBack() {
    window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", () => {
    

    const digiDiv = document.getElementById("digivice-div");

    digiDiv.addEventListener('click', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;

        console.log(`x: ${x}, y: ${y}`);
    });

    // Get digimon id from url
    urlId = Number(new URLSearchParams(window.location.search).get('id'));
    
    // Get digimon by Id and display the image
    if (!isNaN(urlId) && urlId > 0) {
        currentId = urlId;
        getDigimonById(currentId);
    }
    
    // Desktop buttons
    document.getElementById('next-button')?.addEventListener('click', getNext);
    document.getElementById('prev-button')?.addEventListener('click', getPrev);
    document.getElementById('back-button')?.addEventListener('click', goBack);
    
    // Mobile buttons
    document.getElementById('next-mobile')?.addEventListener('click', getNext);
    document.getElementById('prev-mobile')?.addEventListener('click', getPrev);
    document.getElementById('back-mobile')?.addEventListener('click', goBack);
    
});