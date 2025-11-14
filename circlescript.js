
document.addEventListener('DOMContentLoaded', () => {
            
    const circle = document.querySelector('.circle');

    if (!circle) {
        console.error("Error: Could not find .circle element!");
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetScale = 1;
    let currentScale = 1;
    const damp = 0.15;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (circle.style.opacity == '0') {
            currentX = mouseX - circle.offsetWidth / 2;
            currentY = mouseY - circle.offsetHeight / 2;
            circle.style.opacity = 1;
        }
    });

    document.addEventListener('click', () => {
        circle.classList.add('clicked');
        targetScale = 0.5;
        setTimeout(() => {
            targetScale = 1;
            circle.classList.remove('clicked');
        }, 200);
    });

    const animate = () => {
        const targetX = mouseX - circle.offsetWidth / 2;
        const targetY = mouseY - circle.offsetHeight / 2;

        currentX += (targetX - currentX) * damp;
        currentY += (targetY - currentY) * damp;
        currentScale += (targetScale - currentScale) * damp;

        circle.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0) scale(${currentScale})`;
        requestAnimationFrame(animate);
    };
    
    animate();
});