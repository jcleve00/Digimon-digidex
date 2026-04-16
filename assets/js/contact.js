const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

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

    // Fake submit (since no backend)
    console.log({
        name,
        email,
        subject,
        message
    });

    successMsg.classList.remove("d-none");
    form.reset();
});