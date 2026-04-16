

function getDigimonById(id) {
    console.log(id);
    axios
        .get(`https://digi-api.com/api/v1/digimon/${id}`)
        .then(function (response) {
            const data = response.data;
            displayImage(data.images[0].href);
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
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.background = '#cfecf7';

    const digiDiv = document.getElementById("digivice-div");

    digiDiv.addEventListener('click', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;

        console.log(`x: ${x}, y: ${y}`);
    });

    // Get digimon id from url
    const params = new URLSearchParams(window.location.search);
    let id = Number(params.get('id'));
    

    // Get digimon by Id and display the image
    getDigimonById(id);

    /* Buttons */
    const backBtn = document.getElementById('back-button');
    backBtn.addEventListener('click', () => {
        window.location.href = "index.html";
    });

    const nextBtn = document.getElementById('next-button');
    nextBtn.addEventListener('click', () => {
        if (id <= 1488) {
            id += 1;
            getDigimonById(id);
        }
    });

    const prevBtn = document.getElementById('prev-button');
    prevBtn.addEventListener('click', () => {
        if (id > 1) {
            id -= 1;
            getDigimonById(id);
        }
    });
    
});