(function () {
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));


    // 1) Rolagem suave 
    $$('.main-nav a[href^="#"], .btn[href^="#"], .footer-link[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const target = $(id);
            if (!target) return;
            
            e.preventDefault();
            
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });            
            
            document.activeElement && document.activeElement.blur();
        });
    });


   
    const sections = $$('#home, #tripme, #meetus, #advice');
    const linkById = new Map(
        $$('.main-nav a[href^="#"]').map((a) => [a.getAttribute('href').replace('#',''), a])
    );


    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.id;
            const link = linkById.get(id);
            if (!link) return;

            // Destaca o link q
            if (entry.isIntersecting) {
                // Remove a classe 
                $$('.main-nav .nav-link').forEach(l => l.classList.remove('is-active'));
                link.classList.add('is-active');
            }
        });
    }, {
        // A seção deve estar pelo menos 50% visível para ser considerada "ativa"
        rootMargin: '0px 0px -50% 0px', 
        threshold: 0
    });

    sections.forEach((section) => io.observe(section));

})();