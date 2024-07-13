document.addEventListener('DOMContentLoaded', () => {
    const articles = document.querySelector('.finance-articles');
    let isDown = false;
    let startX;
    let scrollLeft;

    articles.addEventListener('mousedown', (e) => {
        isDown = true;
        articles.classList.add('active');
        startX = e.pageX - articles.offsetLeft;
        scrollLeft = articles.scrollLeft;
    });

    articles.addEventListener('mouseleave', () => {
        isDown = false;
        articles.classList.remove('active');
    });

    articles.addEventListener('mouseup', () => {
        isDown = false;
        articles.classList.remove('active');
    });

    articles.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - articles.offsetLeft;
        const walk = (x - startX) * 3; // scroll-fast
        articles.scrollLeft = scrollLeft - walk;
    });
});
