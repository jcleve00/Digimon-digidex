let currentIndex = 0;

// =====================
// GET ALL DIGIMON
// =====================
async function getAllDigimon() {
    const allDigimon = [];
    let page = 0;

    try {
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
    } catch (error) {
        console.error("Failed to retrieve digimon", error);
    }

    return allDigimon;
}

// =====================
// DISPLAY CARDS
// =====================
function displayCards(digimonList) {
    const cardGrid = document.getElementById("card-grid");

    if (!cardGrid) return; // prevents crash on other pages

    const offset = currentIndex + 12;
    const slicedList = digimonList.slice(currentIndex, offset);

    slicedList.forEach(d => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "cardDiv";

        const cardName = document.createElement("h3");
        cardName.textContent = d.name;

        const image = document.createElement("img");
        image.className = "digi-image";
        image.src = d.image;
        image.alt = `Image of ${d.name}`;

        const cardId = document.createElement("p");
        cardId.textContent = `#${d.id}`;

        cardDiv.appendChild(cardName);
        cardDiv.appendChild(image);
        cardDiv.appendChild(cardId);

        cardDiv.addEventListener("click", () => {
            window.location.href = `detail.html?id=${d.id}`;
        });

        cardGrid.appendChild(cardDiv);
    });

    currentIndex += 12;
}

// =====================
// INIT (INDEX PAGE ONLY)
// =====================
document.addEventListener("DOMContentLoaded", async () => {
    const cardGrid = document.getElementById("card-grid");

    // ONLY RUN ON INDEX PAGE
    if (cardGrid) {
        const digimon = await getAllDigimon();

        displayCards(digimon);

        const loadMoreBtn = document.getElementById("load-more-button");

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener("click", () => {
                displayCards(digimon);
            });
        }
    }

    // =====================
    // CONTACT FORM (ONLY CONTACT PAGE)
    // =====================
    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("successMsg");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                alert("Please fill out all fields.");
                return;
            }

            console.log({ name, email, subject, message });

            if (successMsg) {
                successMsg.classList.remove("d-none");
            }

            form.reset();
        });
    }
});