(function () {
    const circle = document.querySelector('.circle');
    if (!circle) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    const ease = 0.23; 

    let isExpanding = false;

    
    window.addEventListener('pointermove', (e) => {
        if (isExpanding) return;
        targetX = e.clientX;
        targetY = e.clientY;
    }, { passive: true });

    
    window.addEventListener('pointerdown', (e) => {
        if (isExpanding) return;
        isExpanding = true;

        
        const clickX = e.clientX;
        const clickY = e.clientY;

        
        circle.style.left = `${clickX}px`;
        circle.style.top = `${clickY}px`;
        circle.style.transform = 'translate(-50%, -50%) scale(1)';
        
        const initialW = circle.offsetWidth || 100;
        const initialH = circle.offsetHeight || initialW;
        circle.style.width = `${initialW}px`;
        circle.style.height = `${initialH}px`;
        circle.style.borderRadius = getComputedStyle(circle).borderRadius || '50%';

        
        const w = window.innerWidth;
        const h = window.innerHeight;
        const dx = Math.max(clickX, w - clickX);
        const dy = Math.max(clickY, h - clickY);
        const farDist = Math.sqrt(dx * dx + dy * dy);
        const requiredDiameter = farDist * 2;
        const initDiameter = Math.max(initialW, initialH);
        const scale = Math.max(1, requiredDiameter / initDiameter);

        
        circle.style.transition = 'transform 700ms ease, border-radius 700ms ease, background 700ms ease';
        
        circle.style.transformOrigin = 'center center';

        circle.style.mixBlendMode = 'normal';
        circle.style.background = '#ffffff';
        circle.style.boxShadow = 'none';

        
        void circle.offsetWidth;
        
        circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        circle.style.borderRadius = '0%';

        
        const onTransitionEnd = (ev) => {
            if (ev.propertyName === 'transform') {
                circle.removeEventListener('transitionend', onTransitionEnd);
                window.location.href = 'abouttest.html';
            }
        };
        circle.addEventListener('transitionend', onTransitionEnd);
    });

    window.addEventListener('resize', () => {
        if (targetX > window.innerWidth) targetX = window.innerWidth / 2;
        if (targetY > window.innerHeight) targetY = window.innerHeight / 2;
    });

    function rafLoop() {
        if (!isExpanding) {
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;

            circle.style.transform = `translate(-50%, -50%) translate3d(${currentX}px, ${currentY}px, 0)`;
        }
        requestAnimationFrame(rafLoop);
    }

    requestAnimationFrame(rafLoop);
})();