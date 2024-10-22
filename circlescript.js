// Get the circle element
const circle = document.querySelector('.circle');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    // Move the circle to follow the pointer (using clientX and clientY for correct viewport tracking)
    circle.style.left = `${e.clientX - circle.offsetWidth / 2}px`;
    circle.style.top = `${e.clientY - circle.offsetHeight / 2}px`;
});

// Shrink and darken the circle on click
document.addEventListener('click', () => {
    // Add the clicked class for darkening
    circle.classList.add('clicked');

    // Shrink the circle
    circle.style.transform = 'scale(0.5)';

    // Return to original size and color after shrinking
    setTimeout(() => {
        circle.style.transform = 'scale(1)';
        circle.classList.remove('clicked');
    }, 200); // Delay before returning to original size and color
});
