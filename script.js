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
            }, 1500);
        });
    }

    // -------------------- ENTRANCE GATE --------------------
    const entranceGate = document.getElementById('entranceGate');
    const revealBtn = document.getElementById('revealBtn');
    const mainContent = document.querySelector('.main-content');
    const body = document.body;

    function revealRestaurant() {
        if (entranceGate) {
            entranceGate.classList.add('hidden');
            setTimeout(() => {
                entranceGate.style.display = 'none';
            }, 600);
        }
        
        if (mainContent) {
            mainContent.classList.add('visible');
        }
        
        // Start gallery autoplay
        startAutoPlay();
        
        // Create celebration effect
        createCelebration();
    }

    function createCelebration() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.innerHTML = ['🍕', '🔥', '✨', '⭐', '🎉'][Math.floor(Math.random() * 5)];
                particle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -30px;
                    font-size: ${Math.random() * 20 + 16}px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: fall ${Math.random() * 2 + 2}s linear forwards;
                `;
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 3000);
            }, i * 50);
        }
    }

    // Add fall animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    if (revealBtn) {
        revealBtn.addEventListener('click', revealRestaurant);
    }

    // Prevent scroll while gate is active
    function preventScroll(e) {
        if (entranceGate && entranceGate.style.display !== 'none') {
            e.preventDefault();
        }
    }
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    // -------------------- STICKY HEADER --------------------
    const header = document.getElementById('modernHeader');
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
        
        const hoverElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .menu-card, .tab-btn, .social-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // -------------------- MOBILE MENU --------------------
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            if (mobileBtn) mobileBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // -------------------- ACTIVE NAVIGATION --------------------
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // -------------------- SMOOTH SCROLL --------------------
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // -------------------- CATEGORY TABS --------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    
    if (tabBtns.length && menuCards.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-tab');
                
                menuCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // -------------------- GALLERY SLIDER --------------------
    const galleryImages = [
        { url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format", caption: "🍕 پیتزایا مارگاریتا -تازە و گەرم و لەزەت "},
        { url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format", caption: "🍔 بۆڕگەرا تایبەت -ب تام و ناوازە" },
        { url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format", caption: "🍝 مەعکەرونا ئیتاڵی - سۆسا کرێما تایبەت" },
        { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format", caption: "🥗 زەڵاتا تازە - تەندروست و ب تامە" },
        { url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format", caption: "🍽️ کەبابێت ڕۆژانە - کو زۆر ب باشی هاتینە برژاندن" }
    ];

    let currentIndex = 0;
    let autoPlayInterval = null;
    let isTransitioning = false;

    const galleryImg = document.getElementById('galleryImage');
    const galleryCaption = document.getElementById('galleryCaption');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    function updateGallery(index) {
        if (!galleryImg || !galleryCaption || isTransitioning) return;
        isTransitioning = true;
        const safeIndex = (index + galleryImages.length) % galleryImages.length;
        currentIndex = safeIndex;
        const item = galleryImages[currentIndex];
        
        galleryImg.style.opacity = '0';
        galleryCaption.style.opacity = '0';
        
        setTimeout(() => {
            galleryImg.src = item.url;
            galleryImg.alt = item.caption;
            galleryCaption.textContent = item.caption;
            galleryImg.style.opacity = '1';
            galleryCaption.style.opacity = '1';
            setTimeout(() => { isTransitioning = false; }, 300);
        }, 250);
    }

    function nextImage() { if (!isTransitioning) updateGallery(currentIndex + 1); }
    function prevImage() { if (!isTransitioning) updateGallery(currentIndex - 1); }

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            if (!isTransitioning && mainContent && mainContent.classList.contains('visible')) {
                nextImage();
            }
        }, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    if (prevBtn && nextBtn && galleryImages.length) {
        updateGallery(0);
        prevBtn.addEventListener('click', (e) => { e.preventDefault(); stopAutoPlay(); prevImage(); startAutoPlay(); });
        nextBtn.addEventListener('click', (e) => { e.preventDefault(); stopAutoPlay(); nextImage(); startAutoPlay(); });
        
        // Start autoplay when content is visible
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && mainContent.classList.contains('visible')) {
                    startAutoPlay();
                    observer.disconnect();
                }
            });
        });
        observer.observe(mainContent, { attributes: true });
    }

    // -------------------- QUICK VIEW BUTTONS --------------------
    const quickViewBtns = document.querySelectorAll('.quick-view');
    
    function navigateTo(page) {
        if (page && page !== '#') {
            window.location.href = page;
        } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateTo(btn.getAttribute('data-page'));
        });
    });
    
    // Make menu cards clickable
    menuCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.quick-view')) return;
            const btn = card.querySelector('.quick-view');
            if (btn) navigateTo(btn.getAttribute('data-page'));
        });
    });

    // -------------------- VIDEO HANDLING --------------------
    const bgVideo = document.getElementById('bgVideo');
    if (bgVideo) {
        bgVideo.play().catch(e => console.log('Video autoplay failed:', e));
    }

    // -------------------- MAGNETIC BUTTON EFFECT (Desktop only) --------------------
    if (window.innerWidth > 768) {
        const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .whatsapp-btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    console.log('XANADAN - Modern UI Loaded Successfully! 🚀');
})();