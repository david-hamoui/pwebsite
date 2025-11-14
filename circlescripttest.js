// Smooth mouse-following circle with requestAnimationFrame and lerp.
// ...existing code...
(function () {
    const circle = document.querySelector('.circle');
    if (!circle) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    const ease = 0.2; // lower = snappier, higher = smoother

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

        // use the actual click coords so animation starts at the click point
        const clickX = e.clientX;
        const clickY = e.clientY;

        // set fixed positioning at the click point (centered via translate(-50%,-50%))
        circle.style.left = `${clickX}px`;
        circle.style.top = `${clickY}px`;
        circle.style.transform = 'translate(-50%, -50%) scale(1)';
        // lock current explicit size so we can scale from it
        const initialW = circle.offsetWidth || 100;
        const initialH = circle.offsetHeight || initialW;
        circle.style.width = `${initialW}px`;
        circle.style.height = `${initialH}px`;
        circle.style.borderRadius = getComputedStyle(circle).borderRadius || '50%';

        // compute scale needed to cover the farthest corner from the click point
        const w = window.innerWidth;
        const h = window.innerHeight;
        const dx = Math.max(clickX, w - clickX);
        const dy = Math.max(clickY, h - clickY);
        const farDist = Math.sqrt(dx * dx + dy * dy);
        const requiredDiameter = farDist * 2;
        const initDiameter = Math.max(initialW, initialH);
        const scale = Math.max(1, requiredDiameter / initDiameter);

        // prepare transition on transform (scale) and border-radius
        circle.style.transition = 'transform 700ms ease, border-radius 700ms ease, background 700ms ease';
        // ensure transform-origin is center (CSS should already set it, but ensure here)
        circle.style.transformOrigin = 'center center';

        circle.style.mixBlendMode = 'normal';
        circle.style.background = '#ffffff';
        circle.style.boxShadow = 'none';

        // force reflow then scale
        void circle.offsetWidth;
        // scale up so it visually fills the viewport from the click point
        circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        circle.style.borderRadius = '0%';

        // when scale transition ends, navigate
        const onTransitionEnd = (ev) => {
            if (ev.propertyName === 'transform') {
                circle.removeEventListener('transitionend', onTransitionEnd);
                // short delay to ensure user sees the fill, then navigate
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