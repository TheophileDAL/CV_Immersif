// Masquer l'overlay après 5 secondes
window.addEventListener('DOMContentLoaded', () => {

    const overlay = document.getElementById('welcome-overlay');
    const arrow = document.getElementById('blinking-arrow');
    const immersiveBtn = document.getElementById('immersive-toggle');
    const iconOn = document.getElementById('icon-on');
    const iconOff = document.getElementById('icon-off');
    const zones = document.querySelectorAll('.zone');

    arrow.style.opacity = 1;

    // état du mode immersif (true = ON)
    let immersiveEnabled = false;

    let overlayTimeout;
    
    overlayTimeout = setTimeout(() => {
        overlay.style.opacity = 0;
        arrow.style.opacity = 0;
        arrow.style.animation = 'none';
        setTimeout(() => overlay.remove(), 800);
    }, 3000);


    function setImmersive(enabled) {
        immersiveEnabled = !!enabled;
        document.body.classList.toggle('immersive-enabled', immersiveEnabled);

        // icônes + aria
        immersiveBtn.setAttribute('aria-pressed', immersiveEnabled ? 'true' : 'false');
        immersiveBtn.setAttribute('aria-label', immersiveEnabled ? 'Désactiver le mode immersif' : 'Activer le mode immersif');
        if (immersiveEnabled) {
            iconOn.style.display = 'block';
            iconOn.setAttribute('aria-hidden','false');
            iconOff.style.display = 'none';
            iconOff.setAttribute('aria-hidden','true');
        } else {
            iconOn.style.display = 'none';
            iconOn.setAttribute('aria-hidden','true');
            iconOff.style.display = 'block';
            iconOff.setAttribute('aria-hidden','false');
        }

    }

    immersiveBtn.addEventListener('click', () => {

        // Initialiser le contexte audio sur iOS
        if (typeof window.AudioContext !== "undefined") {
            const audioCtx = new AudioContext();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
        }
        
        // Si overlay toujours visible, on le fait disparaître tout de suite
        if (overlay && overlay.style.opacity !== "0") {
            clearTimeout(overlayTimeout); // stoppe le timer
            overlay.style.opacity = 0;
            arrow.style.opacity = 0;
            arrow.style.animation = 'none';
            setTimeout(() => overlay.remove(), 800);
        }

        setImmersive(!immersiveEnabled);
    });

    setImmersive(false);

    /* ---------- Script pour gérer les sons ---------- */
    zones.forEach(zone => {
        const sound = new Audio(`Normalized_Sounds/${zone.dataset.zone}.mp3`);

        // Survol souris
        zone.addEventListener('mouseenter', () => {
            if (!immersiveEnabled) return;
            sound.currentTime = 0;
            sound.play();
        });

        zone.addEventListener('mouseleave', () => {
            sound.pause();
            sound.currentTime = 0;
        });

        // Ajout pour les écrans tactiles
        zone.addEventListener('touchstart', (e) => {
            if (!immersiveEnabled) return;
            e.preventDefault(); // empêche le zoom/scroll
            sound.currentTime = 0;
            sound.play();
        });

        zone.addEventListener('touchend', () => {
            sound.pause();
            sound.currentTime = 0;
        });
    });
    
});