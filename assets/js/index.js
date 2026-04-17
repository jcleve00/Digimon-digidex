let isMuted = true;

function toggleSound() {
    const iframe = document.querySelector("iframe");
    const button = document.getElementById("soundBtn");

    let src = iframe.src;

    if (isMuted) {
        src = src.replace("mute=1", "mute=0");
        button.textContent = "🔇 Mute";
    } else {
        src = src.replace("mute=0", "mute=1");
        button.textContent = "🔊 Unmute";
    }

    iframe.src = src;
    isMuted = !isMuted;
}
