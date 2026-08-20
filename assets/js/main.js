document.addEventListener("DOMContentLoaded", function() {

   // --- 1. Efeito do Menu Header ao rolar a página ---
    const navbar = document.getElementById('navbar');
    const logoTopo = document.getElementById('logo-topo'); // Pega o logo

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Ações quando rolar para baixo
            navbar.classList.add('scrolled-nav');
            navbar.classList.remove('py-6');
            
            // Mostra o logo
            if (logoTopo) {
                logoTopo.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2');
                logoTopo.classList.add('opacity-100', 'translate-y-0');
            }
        } else {
            // Ações quando estiver no topo absoluto
            navbar.classList.remove('scrolled-nav');
            navbar.classList.add('py-6');
            
            // Esconde o logo
            if (logoTopo) {
                logoTopo.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
                logoTopo.classList.remove('opacity-100', 'translate-y-0');
            }
        }
    });

    // --- 2. Lógica do Menu Mobile ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    // --- 3. Inicialização Swiper Galeria ---
    if(document.querySelector('.swiper-galeria')) {
        new Swiper('.swiper-galeria', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 }
            }
        });
    }

    // --- 4. Inicialização Swiper Plantas e Troca de Texto ---
    if(document.querySelector('.swiper-plantas')) {
        new Swiper('.swiper-plantas', {
            effect: 'fade',
            navigation: { nextEl: '.planta-next', prevEl: '.planta-prev' },
            on: {
                slideChange: function () {
                    const textTerreo = document.getElementById('text-terreo');
                    const textSuperior = document.getElementById('text-superior');
                    if (this.activeIndex === 0) {
                        textTerreo.classList.remove('hidden');
                        textSuperior.classList.add('hidden');
                    } else {
                        textTerreo.classList.add('hidden');
                        textSuperior.classList.remove('hidden');
                    }
                }
            }
        });
    }
});

// --- 5. Lógica das Abas (Implantação x Lazer) ---
// Note que está fora do DOMContentLoaded para poder ser chamada no onclick do HTML
function openTab(tabName) {
    // Esconde todas as abas
    document.getElementById('tab-implantacao').classList.add('hidden');
    document.getElementById('tab-lazer').classList.add('hidden');
    
    // Reseta estilo dos botões
    const btnImp = document.getElementById('btn-implantacao');
    const btnLaz = document.getElementById('btn-lazer');
    const btnInativoClass = "bg-gray-200 text-gray-600 hover:bg-gray-300 px-8 py-3 rounded font-bold uppercase transition";
    
    btnImp.className = btnInativoClass;
    btnLaz.className = btnInativoClass;

    // Mostra a aba selecionada e ativa o botão correspondente
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    document.getElementById('btn-' + tabName).className = "bg-brand-dark text-white px-8 py-3 rounded font-bold uppercase transition";
}

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle('hidden');
        
        // Opcional: Se quiser pausar/parar o vídeo do YouTube quando fechar o modal
        const iframe = modal.querySelector('iframe');
        if (modal.classList.contains('hidden') && iframe) {
            const src = iframe.src;
            iframe.src = src; // Reseta o iframe para parar o áudio do vídeo
        }
    }
}