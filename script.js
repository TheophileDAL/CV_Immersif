// Masquer l'overlay après 5 secondes
window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('welcome-overlay');
    setTimeout(() => {
    overlay.style.opacity = 0;
    setTimeout(() => overlay.remove(), 800);
    }, 5000);
});

/* ---------- Script pour gérer les sons ---------- */

const zones = document.querySelectorAll('.zone');

zones.forEach(zone => {
    const sound = new Audio(`Sounds/${zone.dataset.zone}.mp3`);

    zone.addEventListener('mouseenter', () => {
    sound.currentTime = 0;
    sound.play();
    });

    zone.addEventListener('mouseleave', () => {
    sound.pause();
    sound.currentTime = 0;
    });
});