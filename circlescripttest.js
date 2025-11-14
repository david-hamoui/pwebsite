// Smooth mouse-following circle with requestAnimationFrame and lerp.
(function () {
    const circle = document.querySelector('.circle');
    if (!circle) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    const ease = 0.16; // lower = snappier, higher = smoother

    // Update target on pointer move (covers mouse + touch)
    window.addEventListener('pointermove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    }, { passive: true });

    // Keep center if window resizes
    window.addEventListener('resize', () => {
        if (targetX > window.innerWidth) targetX = window.innerWidth / 2;
        if (targetY > window.innerHeight) targetY = window.innerHeight / 2;
    });

    function rafLoop() {
        // lerp towards target
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        // apply transform (centered by translate(-50%, -50%) in CSS)
        circle.style.transform = `translate(-50%, -50%) translate3d(${currentX}px, ${currentY}px, 0)`;

        requestAnimationFrame(rafLoop);
    }

    requestAnimationFrame(rafLoop);
})();