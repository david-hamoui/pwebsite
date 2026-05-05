// Header Shrink Logic
window.addEventListener('scroll', shrinkHeader);

function shrinkHeader() {
    const header = document.getElementById("main-header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
}

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Apply stored theme on load
if (currentTheme) {
    document.body.classList.add(currentTheme);
} else {
    // Default is dark-theme, which is handled by not having light-theme class
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', ''); // empty string implies default dark
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });
}

// Interactive Canvas Dot Grid with Trails
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let mouse = { x: -1000, y: -1000 };
    const avatarImg = document.getElementById('avatar-img');

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        addTrail(mouse.x, mouse.y);

        if (avatarImg) {
            const rect = avatarImg.getBoundingClientRect();
            const imgX = rect.left + rect.width / 2;
            const imgY = rect.top + rect.height / 2;
            
            // Calculate distance from center of image
            const deltaX = mouse.x - imgX;
            const deltaY = mouse.y - imgY;
            
            // Calculate rotation (adjust the denominator to change sensitivity)
            const rotateX = -(deltaY / 25);
            const rotateY = (deltaX / 25);
            
            // Clamp rotation to prevent extreme flipping
            const clampedX = Math.max(-25, Math.min(25, rotateX));
            const clampedY = Math.max(-25, Math.min(25, rotateY));
            
            avatarImg.style.transform = `rotateX(${clampedX}deg) rotateY(${clampedY}deg)`;
            avatarImg.style.transition = 'transform 0.1s ease-out';
        }
    });

    const trails = [];
    function addTrail(x, y) {
        trails.push({ x, y, alpha: 1, radius: 120 }); // smaller radius
    }

    const spacing = 25;
    
    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = trails.length - 1; i >= 0; i--) {
            let t = trails[i];
            t.alpha -= 0.02; // fade out speed
            if (t.alpha <= 0) {
                trails.splice(i, 1);
            }
        }

        const drawnDots = new Set();
        
        trails.forEach(t => {
            const startX = Math.floor((t.x - t.radius) / spacing) * spacing;
            const endX = Math.ceil((t.x + t.radius) / spacing) * spacing;
            const startY = Math.floor((t.y - t.radius) / spacing) * spacing;
            const endY = Math.ceil((t.y + t.radius) / spacing) * spacing;

            for (let x = startX; x <= endX; x += spacing) {
                for (let y = startY; y <= endY; y += spacing) {
                    const key = `${x},${y}`;
                    if (drawnDots.has(key)) continue;
                    
                    let maxAlpha = 0;
                    trails.forEach(tr => {
                        const dist = Math.hypot(x - tr.x, y - tr.y);
                        if (dist < tr.radius) {
                            const a = tr.alpha * (1 - dist / tr.radius);
                            if (a > maxAlpha) maxAlpha = a;
                        }
                    });

                    if (maxAlpha > 0.01) {
                        drawnDots.add(key);
                        // Using accent-secondary (Cyan/Blue) color
                        ctx.fillStyle = `rgba(0, 191, 255, ${maxAlpha * 0.8})`;
                        ctx.beginPath();
                        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        });
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
});

// Typewriter Logic
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ["Friend", "Student", "Developer", "Go-Getter", "Tennis Player", "Leader", "DJ"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1500; 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; 
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }
});

// Scroll Reveal Animations
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
});

// Horizontal Scroll Logic
document.addEventListener('DOMContentLoaded', () => {
    const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');
    const horizontalTimeline = document.getElementById('h-timeline');
    
    if (horizontalWrapper && horizontalTimeline) {
        window.addEventListener('scroll', () => {
            const wrapperRect = horizontalWrapper.getBoundingClientRect();
            const scrollStart = wrapperRect.top;
            const scrollEnd = wrapperRect.bottom - window.innerHeight;
            
            let progress = 0;
            if (scrollStart <= 0 && scrollEnd >= 0) {
                progress = -scrollStart / (wrapperRect.height - window.innerHeight);
            } else if (scrollStart > 0) {
                progress = 0;
            } else if (scrollEnd < 0) {
                progress = 1;
            }

            // Calculate max translation: timeline scroll width minus viewport width
            const maxTranslate = Math.max(0, horizontalTimeline.scrollWidth - window.innerWidth + window.innerWidth * 0.1); 
            const currentTranslate = progress * maxTranslate;

            horizontalTimeline.style.transform = `translateX(-${currentTranslate}px)`;
        });
    }
});

// Books Marquee Logic
const bookData = [
    { title: "Einstein's Dreams", author: "Alan Lightman", quote: "Time is like a flow of water, occasionally displaced by a piece of debris, a passing breeze.", image: "images/einstens dreams.jpg" },
    { title: "The City & The City", author: "China Miéville", quote: "I am a citizen of both, I told her.", image: "images/The City & The City.jpg" },
    { title: "Being and Time", author: "Martin Heidegger", quote: "Why are there beings at all, instead of nothing?", image: "images/being and time.jpg" },
    { title: "Dune", author: "Frank Herbert", quote: "I must not fear. Fear is the mind-killer.", image: "images/dune.jpg" },
    { title: "Ender's Game", author: "Orson Scott Card", quote: "In the moment when I truly understand my enemy, I also love him.", image: "images/enders game.jpg" },
    { title: "The Book of Disquiet", author: "Fernando Pessoa", quote: "My soul is a hidden orchestra; I know not what instruments I sound and clash inside myself.", image: "images/livro do desassossego.jpg" },
    { title: "Man's Search for Meaning", author: "Viktor E. Frankl", quote: "Those who have a 'why' to live, can bear with almost any 'how'.", image: "images/mans search for meaning.jpg" },
    { title: "Meditations", author: "Marcus Aurelius", quote: "You have power over your mind - not outside events.", image: "images/meditations.jpg" },
    { title: "On the Shortness of Life", author: "Seneca", quote: "It is not that we have a short time to live, but that we waste a lot of it.", image: "images/on the shortness of life.jpg" },
    { title: "Sapiens", author: "Yuval Noah Harari", quote: "History is something that very few people have been doing while everyone else was ploughing fields.", image: "images/sapiens.jpg" },
    { title: "Siddhartha", author: "Hermann Hesse", quote: "Whatever good or bad fortune may come our way we can always give it meaning.", image: "images/siddhartha.jpg" },
    { title: "Simulacra and Simulation", author: "Jean Baudrillard", quote: "The simulacrum is never that which conceals the truth—it is the truth which conceals that there is none.", image: "images/simulacra and simulation.jpg" },
    { title: "SPQR", author: "Mary Beard", quote: "Rome still helps to define the way we understand our world and think about ourselves.", image: "images/spqr.jpg" },
    { title: "The Denial of Death", author: "Ernest Becker", quote: "The irony of man's condition is that the deepest need is to be free of the anxiety of death.", image: "images/the denial of death.jpg" },
    { title: "The Stranger", author: "Albert Camus", quote: "I opened myself to the gentle indifference of the world.", image: "images/the stranger.jpg" },
    { title: "Zen and the Art of Motorcycle Maintenance", author: "Robert M. Pirsig", quote: "The truth knocks on the door and you say, 'Go away, I'm looking for the truth,' and so it goes away.", image: "images/zen and the Art of Motorcycle Maintenance.jpg" }
];

function initBooksMarquee() {
    const track = document.getElementById('books-track');
    if(!track) return;

    let html = '';
    bookData.forEach(book => {
        html += `
            <div class="book-card with-image" style="background-image: url('${book.image}');">
            </div>
        `;
    });
    
    // Duplicate content for infinite scrolling loop
    track.innerHTML = html + html;

    let isDown = false;
    let startX;
    let scrollLeft;
    let isHovered = false;

    // Drag to scroll events
    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('active');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.classList.remove('active');
        isHovered = false;
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
        track.classList.remove('active');
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag speed multiplier
        track.scrollLeft = scrollLeft - walk;
    });

    track.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    // Auto-scroll animation loop
    function autoScroll() {
        if (!isHovered && !isDown) {
            track.scrollLeft += 1; // Auto scroll speed
            
            // If we've scrolled past the first half (the original set), seamlessly loop back to start
            if (track.scrollLeft >= track.scrollWidth / 2) {
                track.scrollLeft = 0;
            }
        }
        requestAnimationFrame(autoScroll);
    }
    autoScroll();
}

document.addEventListener('DOMContentLoaded', initBooksMarquee);

// Dynamic Scroll to Top Button
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.createElement('div');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});