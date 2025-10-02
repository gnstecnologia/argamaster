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

    if (!carousel) {
        console.error('Carrossel não encontrado!');
        return;
    }

    const slides = carousel.querySelectorAll('.product-slide');
    if (!slides.length) {
        console.error('Nenhum slide encontrado!');
        return;
    }

    let currentIndex = 0;
    let isTransitioning = false;
    let autoPlayInterval;
    const totalSlides = slides.length;
    // Função para determinar quantos slides mostrar baseado no tamanho da tela
    const getSlidesToShow = () => {
        const width = window.innerWidth;
        if (width <= 480) return 1;      // Mobile: 1 slide
        if (width <= 768) return 2;      // Tablet: 2 slides
        return 3;                        // Desktop: 3 slides
    };


    // Função para obter o gap correto baseado no tamanho da tela
    const getGap = () => {
        const width = window.innerWidth;
        if (width <= 480) return 16; // 1rem gap (CSS: gap: 1rem)
        if (width <= 768) return 24; // 1.5rem gap (CSS: gap: 1.5rem)
        return 32; // 2rem gap (CSS: gap: 2rem)
    };

    // Função para atualizar posição do carrossel
    const updateCarousel = (instant = false) => {
        if (isTransitioning && !instant) return;
        
        const gap = getGap();
        const slidesToShow = getSlidesToShow();
        const totalGroups = Math.ceil(totalSlides / slidesToShow);
        
        // Validar currentIndex baseado no tipo de navegação
        if (slidesToShow === 1) {
            // Para 1 card: currentIndex deve estar entre 0 e totalSlides-1
            if (currentIndex >= totalSlides) {
                currentIndex = totalSlides - 1;
            }
            if (currentIndex < 0) {
                currentIndex = 0;
            }
        } else {
            // Para 2 ou 3 cards: validar por grupos
            if (currentIndex >= totalGroups * slidesToShow) {
                currentIndex = Math.max(0, (totalGroups - 1) * slidesToShow);
            }
        }
        
        // Calcular largura correta baseada no container e slides por view
        const containerWidth = carousel.parentElement.clientWidth;
        const correctSlideWidth = (containerWidth - gap * (slidesToShow - 1)) / slidesToShow;
        
        // Calcular offset baseado nas diferenças observadas
        let totalOffset = 0;
        if (slidesToShow === 2) {
            // Para 2 cards: offset de 23px por slide
            totalOffset = currentIndex * 23;
        } else if (slidesToShow === 3) {
            // Para 3 cards: offset de 23px por slide
            totalOffset = currentIndex * 23;
        }
        // Para 1 card: sem offset (navegação direta)
        
        // Calcular translateX
        const translateX = -currentIndex * correctSlideWidth - totalOffset;
        
        // Debug: console.log('Carrossel atualizado:', { currentIndex, slidesToShow, translateX });
        
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
        
        const slidesToShow = getSlidesToShow();
        
        if (slidesToShow === 1) {
            // Para 1 card: um dot por slide
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('span');
                indicator.classList.add('indicator');
                
                if (i === currentIndex) {
                    indicator.classList.add('active');
                }
                
                indicator.addEventListener('click', () => {
                    if (!isTransitioning) {
                        currentIndex = i;
                        updateCarousel();
                    }
                });
                
                indicatorsContainer.appendChild(indicator);
            }
        } else {
            // Para 2 ou 3 cards: um dot por grupo
            const totalGroups = Math.ceil(totalSlides / slidesToShow);
            
            for (let i = 0; i < totalGroups; i++) {
                const indicator = document.createElement('span');
                indicator.classList.add('indicator');
                
                // Determinar se este grupo está ativo
                const groupStartIndex = i * slidesToShow;
                const groupEndIndex = Math.min(groupStartIndex + slidesToShow - 1, totalSlides - 1);
                const isActive = currentIndex >= groupStartIndex && currentIndex <= groupEndIndex;
                
                if (isActive) {
                    indicator.classList.add('active');
                }
                
                indicator.addEventListener('click', () => {
                    if (!isTransitioning) {
                        currentIndex = groupStartIndex;
                        updateCarousel();
                    }
                });
                
                indicatorsContainer.appendChild(indicator);
            }
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

    // Navegar para slide anterior - RESPONSIVO
    const prevSlide = () => {
        if (isTransitioning) return;
        
        const slidesToShow = getSlidesToShow();
        
        if (slidesToShow === 1) {
            // Para 1 card: navegação slide por slide
            currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
        } else {
            // Para 2 ou 3 cards: navegação por grupos
            const totalGroups = Math.ceil(totalSlides / slidesToShow);
            const currentGroup = Math.floor(currentIndex / slidesToShow);
            const prevGroup = currentGroup === 0 ? totalGroups - 1 : currentGroup - 1;
            currentIndex = prevGroup * slidesToShow;
        }
        
        // Debug: console.log('Seta anterior:', { slidesToShow, currentIndex });
        updateCarousel();
    };

    // Navegar para próximo slide - RESPONSIVO
    const nextSlide = () => {
        if (isTransitioning) return;
        
        const slidesToShow = getSlidesToShow();
        
        if (slidesToShow === 1) {
            // Para 1 card: navegação slide por slide
            currentIndex = (currentIndex + 1) % totalSlides;
        } else {
            // Para 2 ou 3 cards: navegação por grupos
            const totalGroups = Math.ceil(totalSlides / slidesToShow);
            const currentGroup = Math.floor(currentIndex / slidesToShow);
            const nextGroup = (currentGroup + 1) % totalGroups;
            currentIndex = nextGroup * slidesToShow;
        }
        
        // Debug: console.log('Seta próximo:', { slidesToShow, currentIndex });
        updateCarousel();
    };

    // Event listeners para botões de navegação
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
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

// Xingu Argamassas - Landing Page carregada!