// ...existing code...
// Smooth mouse-following circle with requestAnimationFrame and lerp.
(function () {
    const circle = document.querySelector('.circle');
    if (!circle) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    const ease = 0.16; // lower = snappier, higher = smoother

    let isExpanding = false;

    // Update target on pointer move (covers mouse + touch)
    window.addEventListener('pointermove', (e) => {
        if (isExpanding) return;
        targetX = e.clientX;
        targetY = e.clientY;
    }, { passive: true });

    // Expand to fullscreen on click and then navigate
    window.addEventListener('pointerdown', (e) => {
        if (isExpanding) return;
        isExpanding = true;

        // freeze current rendered position
        // ensure currentX/currentY are the displayed values
        // (raf loop keeps them near target already)
        // set left/top to current position and clear translate3d offset
        circle.style.left = `${Math.round(currentX)}px`;
        circle.style.top = `${Math.round(currentY)}px`;

        // stop moving by making transform only the centering offset
        circle.style.transform = 'translate(-50%, -50%)';
        // animate via CSS (fallback to inline transition for consistency)
        circle.style.transition = 'left 700ms ease, top 700ms ease, width 700ms ease, height 700ms ease, border-radius 700ms ease, background 700ms ease';
        // trigger reflow then set expanded values
        void circle.offsetWidth;

        circle.classList.add('expand');
        // move center to viewport middle and enlarge
        circle.style.left = '50vw';
        circle.style.top = '50vh';
        circle.style.width = '200vmax';
        circle.style.height = '200vmax';
        circle.style.borderRadius = '0%';

        // after transition finishes, navigate
        const onTransitionEnd = (ev) => {
            // only handle once for width/height transition
            if (ev.propertyName === 'width' || ev.propertyName === 'height') {
                circle.removeEventListener('transitionend', onTransitionEnd);
                window.location.href = 'abouttest.html';
            }
        };
        circle.addEventListener('transitionend', onTransitionEnd);
    });

    // Keep center if window resizes
    window.addEventListener('resize', () => {
        if (targetX > window.innerWidth) targetX = window.innerWidth / 2;
        if (targetY > window.innerHeight) targetY = window.innerHeight / 2;
    });

    function rafLoop() {
        if (!isExpanding) {
            // lerp towards target
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;

            // apply transform (centered by translate(-50%, -50%) in CSS)
            circle.style.transform = `translate(-50%, -50%) translate3d(${currentX}px, ${currentY}px, 0)`;
        }
        requestAnimationFrame(rafLoop);
    }

    requestAnimationFrame(rafLoop);
})();