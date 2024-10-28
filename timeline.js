document.addEventListener("scroll", function() {
    const fadeInSections = document.querySelectorAll(".fade-in");

    fadeInSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;

        if (sectionTop <= windowHeight - 325) {
            section.classList.add("show");
        }
    });
});
