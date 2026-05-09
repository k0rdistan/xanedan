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

    // -------------------- CUSTOM CURSOR --------------------
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.custom-cursor-trail');

    if (cursor && cursorTrail && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });
        
        function animateTrail() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateTrail);
        }
        animateTrail();
        
        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .order-btn, .back-home, .menu-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '35px';
                cursor.style.height = '35px';
                cursor.style.background = '#f39c12';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.background = '#e67e22';
            });
        });
    }

    // Disable custom cursor on mobile
    if (window.innerWidth <= 768) {
        if (cursor) cursor.style.display = 'none';
        if (cursorTrail) cursorTrail.style.display = 'none';
    }

    // -------------------- ORDER BUTTONS --------------------
    const orderBtns = document.querySelectorAll('.order-btn');

    function createRippleEffect() {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, #e67e22, transparent)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '10000';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.animation = 'rippleExpand 0.6s ease-out forwards';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple && ripple.remove) ripple.remove();
        }, 600);
    }

    function orderItem(itemName) {
        createRippleEffect();
        alert(`✨ ${itemName} هاتە زێدەکرن بۆ سەلاتە، هیڤییە ل واتسئاپی پەیوەندیێ بمە بکەن ✨`);
        
        // Go back to main page contact section
        window.location.href = "index.html#contact";
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

    // Add ripple keyframe if not exists
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

    // -------------------- MENU ITEM CLICK (make whole card clickable) --------------------
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.order-btn')) return;
            const btn = item.querySelector('.order-btn');
            if (btn) {
                btn.click();
            }
        });
    });

    // -------------------- VIDEO BACKGROUND --------------------
    const bgVideo = document.getElementById('bgVideo');
    if (bgVideo) {
        bgVideo.play().catch(e => console.log('Video autoplay failed:', e));
    }

    // -------------------- ADD SOFT PULSE TO ICONS --------------------
    const itemIcons = document.querySelectorAll('.item-icon');
    itemIcons.forEach(icon => {
        icon.style.animation = 'softPulse 2s infinite ease-in-out';
    });

    // Add softPulse keyframe if not exists
    if (!document.querySelector('#softPulseKeyframe')) {
        const pulseStyle = document.createElement('style');
        pulseStyle.id = 'softPulseKeyframe';
        pulseStyle.textContent = `
            @keyframes softPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(pulseStyle);
    }

    // -------------------- BRIGHTNESS CONTROL (IN HEADER) --------------------
    function setBrightness(value) {
        // Clamp value between 50% and 150%
        let brightness = Math.min(150, Math.max(50, value));
        document.body.style.filter = `brightness(${brightness}%)`;
        
        // Update display
        const brightnessValue = document.getElementById('brightnessValue');
        if (brightnessValue) {
            brightnessValue.textContent = brightness + '%';
        }
        
        // Store in localStorage
        localStorage.setItem('pageBrightness', brightness);
    }

    function increaseBrightness() {
        let current = getCurrentBrightness();
        setBrightness(current + 10);
    }

    function decreaseBrightness() {
        let current = getCurrentBrightness();
        setBrightness(current - 10);
    }

    function resetBrightness() {
        setBrightness(100);
    }

    function getCurrentBrightness() {
        // Get current brightness from body filter or return 100
        let filter = document.body.style.filter;
        if (filter && filter.includes('brightness')) {
            let match = filter.match(/brightness\((\d+)%\)/);
            if (match) {
                return parseInt(match[1]);
            }
        }
        return 100;
    }

    // Load saved brightness from localStorage
    function loadSavedBrightness() {
        let saved = localStorage.getItem('pageBrightness');
        if (saved) {
            setBrightness(parseInt(saved));
        } else {
            setBrightness(100);
        }
    }

    // Add event listeners for brightness buttons
    const brightnessUp = document.getElementById('brightnessUp');
    const brightnessDown = document.getElementById('brightnessDown');
    const brightnessReset = document.getElementById('brightnessReset');

    if (brightnessUp) {
        brightnessUp.addEventListener('click', increaseBrightness);
    }
    if (brightnessDown) {
        brightnessDown.addEventListener('click', decreaseBrightness);
    }
    if (brightnessReset) {
        brightnessReset.addEventListener('click', resetBrightness);
    }

    // Load saved brightness on page load
    loadSavedBrightness();

    console.log('Fruits page loaded successfully! 🍎');
})();