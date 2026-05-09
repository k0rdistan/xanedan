(function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // -------------------- LOADING SCREEN --------------------
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1200);
        });
    }

    // -------------------- STICKY HEADER --------------------
    const header = document.querySelector('.modern-header');
    const progressBar = document.querySelector('.scroll-progress');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (progressBar) {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const percentage = (scrollTop / scrollHeight) * 100;
                progressBar.style.width = percentage + '%';
            }
        });
    }

    // -------------------- CUSTOM CURSOR --------------------
    const cursor = document.querySelector('.custom-cursor');
    
    if (cursor && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        });
        
        const hoverElements = document.querySelectorAll('a, button, .order-btn, .back-home, .menu-card, .nav-link, .social-link, .feature-card, .quick-view');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // -------------------- ORDER BUTTONS --------------------
    const orderBtns = document.querySelectorAll('.order-btn');

    function createNotification() {
        const notification = document.createElement('div');
        notification.className = 'floating-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>Added to Cart!</strong>
                    <p>Please continue on WhatsApp</p>
                </div>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #25D366, #128C7E);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 16px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(notification);
        
        if (!document.querySelector('#notificationKeyframe')) {
            const style = document.createElement('style');
            style.id = 'notificationKeyframe';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function orderItem(itemName) {
        if (!itemName || itemName === '') return;
        
        createNotification();
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #FF6B35, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10001;
            animation: rippleExpand 0.6s ease-out forwards;
        `;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        
        if (!document.querySelector('#rippleKeyframe')) {
            const rippleStyle = document.createElement('style');
            rippleStyle.id = 'rippleKeyframe';
            rippleStyle.textContent = `
                @keyframes rippleExpand {
                    0% { width: 0px; height: 0px; opacity: 0.8; }
                    100% { width: 200px; height: 200px; opacity: 0; }
                }
            `;
            document.head.appendChild(rippleStyle);
        }
        
        setTimeout(() => {
            window.location.href = "index.html#contact";
        }, 800);
    }

    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const itemName = btn.getAttribute('data-item');
            if (itemName) {
                orderItem(itemName);
            }
        });
    });

    // -------------------- CARD CLICK --------------------
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.order-btn') || e.target.closest('.quick-view')) return;
            const btn = card.querySelector('.order-btn');
            if (btn) {
                btn.click();
            }
        });
    });

    // -------------------- QUICK VIEW BUTTONS --------------------
    const quickViewBtns = document.querySelectorAll('.quick-view');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemName = btn.getAttribute('data-item');
            if (itemName) {
                orderItem(itemName);
            }
        });
    });

    // -------------------- VIDEO BACKGROUND --------------------
    const bgVideo = document.getElementById('bgVideo');
    if (bgVideo) {
        bgVideo.play().catch(e => console.log('Video autoplay failed:', e));
    }

    // -------------------- PARALLAX EFFECT ON CARD IMAGES --------------------
    const cardImages = document.querySelectorAll('.card-image');
    cardImages.forEach(image => {
        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const img = image.querySelector('img');
            if (img) {
                img.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
            }
        });
        
        image.addEventListener('mouseleave', () => {
            const img = image.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // -------------------- FEATURE CARD HOVER ANIMATION --------------------
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // -------------------- WARM GLOW EFFECT FOR HOT DRINKS --------------------
    const hotDrinkIcons = document.querySelectorAll('.card-icon');
    hotDrinkIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.5)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.boxShadow = 'none';
        });
    });

    console.log('XANEDAN - Hot Drinks Page Loaded Successfully! 🔥');
})();