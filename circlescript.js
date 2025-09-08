const circle = document.querySelector('.circle');

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  const x = mouseX - circle.offsetWidth / 2;
  const y = mouseY - circle.offsetHeight / 2;

  circle.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(animate);
}

animate();

document.addEventListener('click', () => {
  circle.classList.add('clicked');
  circle.style.transform += ' scale(0.5)';

  setTimeout(() => {
    circle.style.transform = circle.style.transform.replace(' scale(0.5)', '');
    circle.classList.remove('clicked');
  }, 200);
});