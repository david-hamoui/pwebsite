// Get the circle element
const circle = document.querySelector('.circle');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    // Move the circle to follow the pointer
    circle.style.left = `${e.pageX - circle.offsetWidth / 2}px`;
    circle.style.top = `${e.pageY - circle.offsetHeight / 2}px`;
});

// Shrink and return to original size on click
document.addEventListener('click', () => {
    // Shrink the circle
    circle.style.transform = 'scale(0.5)';
    circle.style.width = '15px';
    circle.style.height = '15px';

    // Return to original size after shrinking
    setTimeout(() => {
        circle.style.transform = 'scale(1)';
        circle.style.width = '30px';
        circle.style.height = '30px';
    }, 200); // Delay before returning to original size
});
