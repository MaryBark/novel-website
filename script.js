// Основная функция при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация плавной прокрутки
    initSmoothScroll();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Инициализация параллакса
    initParallax();

    // Инициализация аккордеона для творческого пути
    initWritingAccordion();
});

// Мобильное меню
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем, является ли ссылка якорем
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);

    // Анимируем элементы
    const animatedElements = document.querySelectorAll(
        'section, .about-card, .character-hero, .character-villain, .world-card, .feature-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Параллакс эффект
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Аккордеон для творческого пути
function initWritingAccordion() {
    const writingHeaders = document.querySelectorAll('.writing-header');
    
    writingHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.classList.contains('open');
            
            // Закрываем все открытые элементы
            document.querySelectorAll('.writing-content.open').forEach(openContent => {
                openContent.classList.remove('open');
            });
            document.querySelectorAll('.writing-header.active').forEach(activeHeader => {
                activeHeader.classList.remove('active');
            });
            
            // Открываем текущий, если был закрыт
            if (!isOpen) {
                content.classList.add('open');
                this.classList.add('active');
            }
        });
    });
}

// Защита от ошибок
window.addEventListener('error', function(e) {
    console.log('Произошла ошибка:', e.error);
});

// Оптимизация для мобильных устройств
if ('ontouchstart' in window) {
    document.documentElement.classList.add('touch-device');
}

// Предотвращение быстрых множественных кликов
function preventMultipleClicks(element, timeout = 1000) {
    let lastClick = 0;
    
    element.addEventListener('click', function(e) {
        const now = Date.now();
        if (now - lastClick < timeout) {
            e.preventDefault();
            e.stopPropagation();
        }
        lastClick = now;
    });
}

// Применяем ко всем CTA кнопкам
document.querySelectorAll('.cta-button').forEach(btn => {
    preventMultipleClicks(btn);
});