const loginScreen = 
`
<section class="hero d-flex flex-column justify-content-center align-items-center" id="hero">
    <div class="section-container animate__animated animate__fadeInRight">
        <p>
            <div class="text-center">
                <h1 class="text-light">Kahot</h1>
            </div>
            
        </p>
    </div>
</section>
`

function onload() {
    const items = document.querySelectorAll('.animatedFadeInUp');
    items.forEach(item => {
        item.classList.remove('fadeInUp');
    })

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                items.forEach(item => {
                    item.classList.add('fadeInUp');
                })
            return;
            }
            items.forEach(item => {
                item.classList.remove('fadeInUp');
            })
        });
    });
    observer.observe(document.querySelector('.fadeInUpWrapper'));
}

export default {
    content: loginScreen,
    onload: onload,
}