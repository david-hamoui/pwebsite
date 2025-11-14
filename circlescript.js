
const circle = document.querySelector('.circle');

let mouseX = 0;
let mouseY = 0;
let scale = 1;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('click', () => {
    circle.classList.add('clicked');
    scale = 0.5;

    setTimeout(() => {
        scale = 1;
        circle.classList.remove('clicked');
    }, 200);
});

const animate = () => {
    const posX = mouseX - circle.offsetWidth / 2;
    const posY = mouseY - circle.offsetHeight / 2;
    circle.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale})`;

    requestAnimationFrame(animate);
};

animate();