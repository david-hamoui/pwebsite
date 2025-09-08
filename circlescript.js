const circle = document.querySelector('.circle');

let mouseX = 0, mouseY = 0;

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
  circle.style.transform += ' scale(0.5)';

  setTimeout(() => {
    // Reset back to normal size at same position
    circle.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
  }, 200);
});
