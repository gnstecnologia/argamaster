// Xingu Argamassas - JavaScript Functions
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initHeaderScrollEffect();
    initTestimonialCarousel();
    initProductsCarousel();
    initMobileMenu();
    initCounterAnimations();
    addDynamicStyles();
});

// Loader
function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000);
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Formulário de Contato
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) return;
            
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company') || 'Não informado',
                message: formData.get('message')
            };
            
            const whatsappMessage = createWhatsAppMessage(contactData);
            redirectToWhatsApp(whatsappMessage);
            showSuccessMessage();
            this.reset();
        });
    }
}

// Validação do Formulário
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name) {
        showError('Por favor, informe seu nome.');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showError('Por favor, informe um e-mail válido.');
        return false;
    }
    
    if (!phone) {
        showError('Por favor, informe seu telefone.');
        return false;
    }
    
    if (!message) {
        showError('Por favor, escreva sua mensagem.');
        return false;
    }
    
    return true;
}

// Validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Criar mensagem WhatsApp
function createWhatsAppMessage(data) {
    return `🏗️ *SOLICITAÇÃO DE ORÇAMENTO - XINGU ARGAMASSAS*

👤 *Dados do Cliente:*
• Nome: ${data.name}
• E-mail: ${data.email}
• Telefone: ${data.phone}
• Empresa: ${data.company}

💬 *Mensagem:*
${data.message}

📞 *Contato Preferencial:* WhatsApp
⏰ *Horário:* Segunda a Sexta, 8h às 18h

Aguardo retorno!`;
}

// Redirecionar WhatsApp
function redirectToWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5594991488835?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Mensagem de sucesso
function showSuccessMessage() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">✅</div>
            <h3>Mensagem Enviada!</h3>
            <p>Redirecionando para o WhatsApp...</p>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 0 20px;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.remove();
    }, 3000);
}

// Mostrar erro
function showError(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #ff4444;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        text-align: center;
        animation: slideDown 0.3s ease;
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Animações de Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .stat-item, .product-card, .advantage-item, .testimonial, .pillar').forEach(element => {
        observer.observe(element);
    });
}

// Carrossel de Depoimentos
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play
    setInterval(nextSlide, 5000);
}

// Carrossel de Produtos - Versão Corrigida Definitivamente
function initProductsCarousel() {
    const carousel = document.getElementById('productsCarousel');
    const prevBtn = document.getElementById('productsPrevBtn');
    const nextBtn = document.getElementById('productsNextBtn');
    const indicatorsContainer = document.getElementById('productsDots');

    console.log('Inicializando carrossel:', {
        carousel: !!carousel,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        indicatorsContainer: !!indicatorsContainer,
        prevBtnElement: prevBtn,
        nextBtnElement: nextBtn
    });

    if (!carousel) {
        console.error('Carrossel não encontrado!');
        return;
    }

    const slides = carousel.querySelectorAll('.product-slide');
    console.log('Slides encontrados:', slides.length);

    if (!slides.length) {
        console.error('Nenhum slide encontrado!');
        return;
    }

    let currentIndex = 0;
    let isTransitioning = false;
    let autoPlayInterval;
    const totalSlides = slides.length;
    const slidesToShow = 3; // Sempre mostrar 3 itens

    // Calcular largura do slide com precisão
    const getSlideWidth = () => {
        const containerWidth = carousel.parentElement.clientWidth;
        const gap = 32; // 2rem gap
        return (containerWidth - gap * 2) / slidesToShow;
    };

    // Função para atualizar posição do carrossel
    const updateCarousel = (instant = false) => {
        if (isTransitioning && !instant) return;
        
        const slideWidth = getSlideWidth();
        const gap = 32; // 2rem gap em pixels
        // Calcular translateX considerando slides + gaps
        const translateX = -currentIndex * (slideWidth + gap);
        
        if (instant) {
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(${translateX}px)`;
            carousel.offsetHeight; // Force reflow
            carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            carousel.style.transform = `translateX(${translateX}px)`;
        }
        
        updateIndicators();
        updateButtons();
    };

    // Função para criar e atualizar indicadores
    const updateIndicators = () => {
        indicatorsContainer.innerHTML = '';
        
        // Sempre 3 grupos fixos
        const totalGroups = 3;
        
        for (let i = 0; i < totalGroups; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            
            // Determinar se este grupo está ativo
            let isActive = false;
            if (i === 0 && currentIndex <= 2) isActive = true;
            else if (i === 1 && currentIndex >= 3 && currentIndex <= 5) isActive = true;
            else if (i === 2 && currentIndex >= 5) isActive = true;
            
            if (isActive) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                if (!isTransitioning) {
                    // Definir currentIndex baseado no grupo clicado
                    if (i === 0) currentIndex = 0;      // Grupo 1: slides 0-2
                    else if (i === 1) currentIndex = 3; // Grupo 2: slides 3-5
                    else if (i === 2) currentIndex = 5; // Grupo 3: slides 5-7
                    
                    updateCarousel();
                }
            });
            
            indicatorsContainer.appendChild(indicator);
        }
    };

    // Atualizar estados dos botões
    const updateButtons = () => {
        if (prevBtn) {
            prevBtn.disabled = isTransitioning;
        }
        if (nextBtn) {
            nextBtn.disabled = isTransitioning;
        }
    };

    // Navegar para slide anterior - SIMULA CLIQUE NO DOT
    const prevSlide = () => {
        console.log('prevSlide chamado, currentIndex:', currentIndex);
        if (isTransitioning) return;
        
        // Simular clique no dot anterior
        if (currentIndex === 0) {
            // Está no dot 1, vai para dot 3 (grupo 3)
            currentIndex = 5;
        } else if (currentIndex === 3) {
            // Está no dot 2, vai para dot 1 (grupo 1)
            currentIndex = 0;
        } else if (currentIndex === 5) {
            // Está no dot 3, vai para dot 2 (grupo 2)
            currentIndex = 3;
        }
        
        console.log('Seta anterior: indo para currentIndex:', currentIndex);
        updateCarousel();
    };

    // Navegar para próximo slide - SIMULA CLIQUE NO DOT
    const nextSlide = () => {
        console.log('nextSlide chamado, currentIndex:', currentIndex);
        if (isTransitioning) return;
        
        // Simular clique no dot próximo
        if (currentIndex === 0) {
            // Está no dot 1, vai para dot 2 (grupo 2)
            currentIndex = 3;
        } else if (currentIndex === 3) {
            // Está no dot 2, vai para dot 3 (grupo 3)
            currentIndex = 5;
        } else if (currentIndex === 5) {
            // Está no dot 3, vai para dot 1 (grupo 1)
            currentIndex = 0;
        }
        
        console.log('Seta próximo: indo para currentIndex:', currentIndex);
        updateCarousel();
    };

    // Event listeners para botões de navegação
    if (prevBtn) {
        console.log('Adicionando event listener ao botão anterior:', prevBtn);
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botão anterior clicado - PREV SLIDE CHAMADO');
            prevSlide();
        });
    } else {
        console.error('Botão anterior não encontrado!');
    }
    
    if (nextBtn) {
        console.log('Adicionando event listener ao botão próximo:', nextBtn);
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botão próximo clicado - NEXT SLIDE CHAMADO');
            nextSlide();
        });
    } else {
        console.error('Botão próximo não encontrado!');
    }

    // Suporte a touch/swipe
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isDragging = false;
        startAutoPlay();
    });

    // Suporte a mouse drag
    let mouseStartX = 0;
    let mouseEndX = 0;
    let isMouseDragging = false;

    carousel.addEventListener('mousedown', (e) => {
        mouseStartX = e.clientX;
        isMouseDragging = true;
        stopAutoPlay();
        e.preventDefault();
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isMouseDragging) return;
        e.preventDefault();
    });

    carousel.addEventListener('mouseup', (e) => {
        if (!isMouseDragging) return;
        
        mouseEndX = e.clientX;
        const diff = mouseStartX - mouseEndX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isMouseDragging = false;
        startAutoPlay();
    });

    // Funcionalidade de auto-play
    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, 6000);
    };

    const stopAutoPlay = () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    };

    // Pausar auto-play no hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Lidar com redimensionamento da janela
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel(true);
        }, 250);
    });

    // Inicializar carrossel
    updateCarousel(true);
    startAutoPlay();
}


// Menu Mobile
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
}

// Animação de contadores
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Efeito do Header
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(81, 157, 60, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.background = 'linear-gradient(135deg, #519d3c 0%, #cd6d11 100%)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// Estilos dinâmicos
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .success-modal .modal-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .success-modal h3 {
            color: #519d3c;
            margin-bottom: 1rem;
        }
        
        .success-modal p {
            color: #666;
            margin-bottom: 0.5rem;
        }
    `;
    document.head.appendChild(style);
}

console.log('🏗️ Xingu Argamassas - Landing Page carregada!');