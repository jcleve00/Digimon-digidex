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
function getDigimonById(id) {
    currentId = id;
    axios
        .get(`https://digi-api.com/api/v1/digimon/${id}`)
        .then(function (response) {
            const data = response.data;
            displayImage(data.images[0].href);
            displayData(data);
        })
        .catch(function (error) {
            console.log(error);
            alert(`Failed to retrieve digimon ${error}`);
        });
    
}
function displayImage(image) {
    const digiviceScreen = document.querySelector('#digivice-screen');
    const imgElement = document.getElementById('digi-detail-image');
    

    imgElement.src = image;
    
    digiviceScreen.appendChild(imgElement);
}
function displayData(data) {
    const result = document.getElementById("result");

    const englishDesc = data.descriptions?.find(
        desc => desc.language === "en_us"
    );

    result.innerHTML = `
        <div class="card">
            <h2>${data.name || "Unknown"}</h2>
            <p><b>Level:</b> ${data.levels?.[0]?.level || "Unknown"}</p>
            <p><b>Type:</b> ${data.types?.[0]?.type || "Unknown"}</p>
            <p><b>Attribute:</b> ${data.attributes?.[0]?.attribute || "Unknown"}</p>
            <p>${englishDesc?.description || "No English description"}</p>
        </div>
    `;
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
    
    /* Buttons */
    const backBtn = document.getElementById('back-button');
    backBtn.addEventListener('click', () => {
        window.location.href = "index.html";
    });

    const nextBtn = document.getElementById('next-button');
    nextBtn.addEventListener('click', () => {
        console.log(currentId);
        if (currentId < 1488) {
            currentId += 1;
            getDigimonById(currentId);
        }
    });

    const prevBtn = document.getElementById('prev-button');
    prevBtn.addEventListener('click', () => {
        if (currentId > 1) {
            currentId -= 1;
            getDigimonById(currentId);
        }
    });
    
});