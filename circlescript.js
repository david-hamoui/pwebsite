
const circle = document.querySelector('.circle');


document.addEventListener('mousemove', (e) => {
    
    circle.style.left = `${e.clientX - circle.offsetWidth / 2}px`;
    circle.style.top = `${e.clientY - circle.offsetHeight / 2}px`;
});


document.addEventListener('click', () => {
    
    circle.classList.add('clicked');

    circle.style.transform = 'scale(0.5)';

    setTimeout(() => {
        circle.style.transform = 'scale(1)';
        circle.classList.remove('clicked');
    }, 200);
});
