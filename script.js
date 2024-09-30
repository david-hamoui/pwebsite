window.onscroll = function() {
    shrinkHeader();
};

function shrinkHeader() {
    const header = document.getElementById("main-header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
}