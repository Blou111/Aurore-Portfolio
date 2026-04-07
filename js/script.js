// ── CUSTOM CURSOR ──────────────────────────────
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animateCursor() {
    // dot follows instantly
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    // ring eases behind
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
})();

// Hover state on interactive elements
const hoverEls = document.querySelectorAll('a, button, .polaroid, .lb-arrow');
hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── SCROLL REVEAL ──────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));




function initLightbox()
{
    // Crée l'overlay une seule fois
    const overlay = document.createElement("div");
    overlay.id = "lightbox";
    overlay.innerHTML= `<button id="lightbox-close" title="Fermer">X</button> <img id ="lightbox-img" src="" alt="">`;

    document.body.appendChild(overlay);

    const lightboxImg = overlay.querySelector('#lightbox-img');

    function open(src, alt) 
    {
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() 
    {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    // Attache aux img dans .preview-grid (ignore les vidéos automatiquement)
    const mainProjectImage = document.querySelector('.hero-polaroid-img img');
    const projectImages = document.querySelectorAll('.gallery-item img');

    mainProjectImage.style.cursor = 'zoom-in';
    mainProjectImage.addEventListener('click', () => open(mainProjectImage.src, mainProjectImage.alt));  

    projectImages.forEach(img => 
    {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => open(img.src, img.alt));
    });

    // Fermeture
    overlay.addEventListener('click', close);
    overlay.querySelector('#lightbox-close').addEventListener('click', close);
    lightboxImg.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
};

initLightbox();

