/* ==========================================================
   UI.JS - Enterprise UI Engine, Touch Physics & Observers
   ========================================================== */

class UIController {
    constructor() {
        this.toastQueue = [];
        this.isToastShowing = false;
        this.initSplash();
        this.initScrollEngine();
        this.initSmartSearch();
        this.initBottomSheetPhysics();
    }

    // 1. Cinematic Splash Screen
    initSplash() {
        setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            if (splash) {
                splash.classList.add('fade-out');
                setTimeout(() => splash.style.display = 'none', 850);
            }
        }, 1800);
    }

    // 2. Heavy Scroll Observer (Zomato Style Lazy Fade-in)
    initScrollEngine() {
        const header = document.getElementById('main-header');
        const catMenu = document.getElementById('category-menu');
        let ticking = false;

        // The home page is a fixed, scrollable <div>, so we listen in the capture phase
        // (scroll events do not bubble) and read whichever element is actually scrolling.
        document.addEventListener('scroll', (e) => {
            if (ticking) return;
            const t = e.target;
            if (t && t.id && t.id !== 'home-page' && t !== document) return; // ignore other pages / inner lists
            ticking = true;
            requestAnimationFrame(() => {
                const y = (t && t.scrollTop) || window.scrollY || document.documentElement.scrollTop || 0;
                const scrolled = y > 50;
                if (header) header.classList.toggle('scrolled', scrolled);
                if (catMenu) catMenu.classList.toggle('scrolled', scrolled);
                ticking = false;
            });
        }, { passive: true, capture: true });
    }

    // 3. Smart Search Placeholder (Memory Optimized: pauses while the customer is typing)
    initSmartSearch() {
        const keywords = ['Search "Chicken Tikka"...', 'Search "Butter Naan"...', 'Search "Paneer"...', 'Craving Biryani?'];
        let idx = 0;
        this.searchInterval = setInterval(() => {
            const searchInput = document.getElementById('main-search');
            if (!searchInput || document.activeElement === searchInput || searchInput.value) return;
            searchInput.style.opacity = 0;
            setTimeout(() => {
                searchInput.placeholder = keywords[idx = (idx + 1) % keywords.length];
                searchInput.style.opacity = 1;
            }, 300);
        }, 3000);
    }

    // 4. Apple-Style Toast Notification Queue System
    showToast(message, type = "success") {
        this.toastQueue.push({ message, type });
        this.processToastQueue();
    }

    processToastQueue() {
        if (this.isToastShowing || this.toastQueue.length === 0) return;

        const toast = document.getElementById('toast-container');
        const msgEl = document.getElementById('toast-message');
        const iconEl = document.getElementById('toast-icon');

        // If the toast markup is missing, never crash the app: fall back to a simple alert
        if (!toast || !msgEl || !iconEl) {
            const item = this.toastQueue.shift();
            if (item && item.type === 'error') { try { alert(item.message); } catch (e) {} }
            return;
        }

        this.isToastShowing = true;
        const { message, type } = this.toastQueue.shift();

        msgEl.innerText = message;
        iconEl.className = type === 'error' ? 'fa-solid fa-triangle-exclamation text-red' : 'fa-solid fa-circle-check text-green';

        toast.classList.add('show');

        // Haptic Feedback for Mobile (if supported)
        if (window.navigator && window.navigator.vibrate) {
            try { window.navigator.vibrate(type === 'error' ? [50, 50, 50] : 50); } catch (e) {}
        }

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                this.isToastShowing = false;
                this.processToastQueue(); // Process next in queue
            }, 400);
        }, 3000);
    }

    // 5. Popup Managers
    openPopup(id) {
        const el = document.getElementById(id);
        if(el) el.classList.remove('hidden');
    }

    closePopup(id) {
        const el = document.getElementById(id);
        if(el) el.classList.add('hidden');
    }

    // 6. Apple iOS Style Drag-to-Dismiss Bottom Sheet Physics
    // Uses event delegation, so it also works on sheets that are created later
    // (like the spice / size popup that app.js builds when you tap ADD).
    initBottomSheetPhysics() {
        let sheet = null, startY = 0, diff = 0, dragging = false;

        document.addEventListener('touchstart', (e) => {
            const s = e.target.closest ? e.target.closest('.z-bottom-sheet') : null;
            if (!s) return;
            sheet = s;
            startY = e.touches[0].clientY;
            diff = 0;
            dragging = true;
            sheet.style.transition = 'none';
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!dragging || !sheet) return;
            diff = e.touches[0].clientY - startY;
            if (diff > 0) { // Only allow dragging downwards
                sheet.style.transform = `translateY(${diff}px)`;
            }
        }, { passive: true });

        const finish = () => {
            if (!dragging || !sheet) return;
            dragging = false;
            const s = sheet; sheet = null;
            s.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

            if (diff > 100) {
                // Swiped down far enough: close whichever popup this sheet belongs to
                const overlay = s.closest('.z-overlay');
                if (overlay && overlay.id === 'dynamic-smart-modal' && typeof window.closeDynamicModal === 'function') {
                    window.closeDynamicModal();
                } else if (overlay && overlay.id) {
                    this.closePopup(overlay.id);
                }
                setTimeout(() => { s.style.transform = ''; s.style.transition = ''; }, 350);
            } else {
                // Snap back
                s.style.transform = 'translateY(0)';
                setTimeout(() => { s.style.transform = ''; s.style.transition = ''; }, 350);
            }
            diff = 0;
        };

        document.addEventListener('touchend', finish);
        document.addEventListener('touchcancel', finish);
    }

    // Bookmark Toggle Animation
    toggleBookmark(btn) {
        btn.classList.toggle('bookmarked');
        if (btn.classList.contains('bookmarked')) {
            btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
            this.showToast("Saved to Favorites!");
        } else {
            btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
            this.showToast("Removed from Favorites");
        }
    }
}

// Initialize UI Engine Globally
window.UI = new UIController();
