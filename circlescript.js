const circle = document.querySelector('.circle');

let mouseX = window.innerWidth / 2;   // start centered
let mouseY = window.innerHeight / 2;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX - circle.offsetWidth / 2;
  mouseY = e.clientY - circle.offsetHeight / 2;
});

// Animation loop to move ball smoothly
function animate() {
  circle.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  requestAnimationFrame(animate);
}
animate();

// Click effect
document.addEventListener('click', () => {
  circle.classList.add('clicked');

  // scale down briefly
  circle.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(0.5)`;

  setTimeout(() => {
    // reset scale
    circle.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
    circle.classList.remove('clicked');
  }, 200);
});
