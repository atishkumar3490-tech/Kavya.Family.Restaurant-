/* ==========================================================
   UI.JS - Enterprise UI Engine, Touch Physics & Observers
   ----------------------------------------------------------
   Works together with app.js (loaded after this file).
   Provides: splash, toast queue, popups, drag-to-dismiss sheets,
   saved favourites, voice search, Android back button, online/offline
   alerts, category auto-scroll and keyboard shortcuts.
   Each feature is started inside its own try/catch, so one problem
   can never stop the rest of the app from loading.
   ========================================================== */

class UIController {
    constructor() {
        this.toastQueue = [];
        this.isToastShowing = false;
        this.currentToast = '';
        this._rec = null;
        this._pushed = false;

        [
            'initSplash',
            'initScrollEngine',
            'initSmartSearch',
            'initBottomSheetPhysics',
            'initBookmarks',
            'initBackButton',
            'initNetworkStatus',
            'initCategoryAutoScroll',
            'initKeyboard'
        ].forEach((fn) => {
            try { this[fn](); } catch (e) { console.error('UI init failed:', fn, e); }
        });
    }

    $(id) { return document.getElementById(id); }

    // 1. Cinematic Splash Screen (waits for the page to finish loading, never gets stuck)
    initSplash() {
        const hide = () => {
            const splash = this.$('splash-screen');
            if (!splash || splash.dataset.done) return;
            splash.dataset.done = '1';
            splash.classList.add('fade-out');
            setTimeout(() => { splash.style.display = 'none'; }, 850);
        };
        const minWait = new Promise((r) => setTimeout(r, 1800));
        const loaded = document.readyState === 'complete'
            ? Promise.resolve()
            : new Promise((r) => window.addEventListener('load', r, { once: true }));
        Promise.all([minWait, loaded]).then(hide);
        setTimeout(hide, 4500); // safety net: slow network can never trap the customer on the splash
    }

    // 2. Scroll Observer (the home page itself is the scrolling container)
    initScrollEngine() {
        const header = this.$('main-header');
        const scroller = this.$('home-page');
        const apply = (y) => {
            if (!header) return;
            header.classList.toggle('scrolled', y > 50);
        };
        window.addEventListener('scroll', () => apply(window.scrollY), { passive: true });
        if (scroller) scroller.addEventListener('scroll', () => apply(scroller.scrollTop), { passive: true });
    }

    // 3. Smart rotating search placeholder (pauses while the customer is typing)
    initSmartSearch() {
        const base = ['Search "Chicken Tikka"...', 'Search "Butter Naan"...', 'Search "Paneer"...', 'Craving Biryani?'];
        let idx = 0;
        this.searchInterval = setInterval(() => {
            const input = this.$('main-search');
            if (!input || document.activeElement === input || input.value) return;
            let list = base;
            try {
                if (typeof menuItems !== 'undefined' && menuItems.length) {
                    const pick = menuItems[Math.floor(Math.random() * menuItems.length)];
                    list = base.concat([`Search "${pick.name}"...`]);
                }
            } catch (e) {}
            input.style.opacity = 0;
            setTimeout(() => {
                input.placeholder = list[idx = (idx + 1) % list.length];
                input.style.opacity = 1;
            }, 300);
        }, 3000);
    }

    // 4. Apple-style toast queue (ignores duplicate messages so nothing spams the screen)
    showToast(message, type = 'success') {
        message = String(message === null || message === undefined ? '' : message);
        if (!message) return;
        if (message === this.currentToast || this.toastQueue.some((t) => t.message === message)) return;
        this.toastQueue.push({ message, type });
        this.processToastQueue();
    }

    processToastQueue() {
        if (this.isToastShowing || this.toastQueue.length === 0) return;

        const toast = this.$('toast-container');
        const msgEl = this.$('toast-message');
        const iconEl = this.$('toast-icon');
        if (!toast || !msgEl || !iconEl) { this.toastQueue = []; return; }

        this.isToastShowing = true;
        const { message, type } = this.toastQueue.shift();
        this.currentToast = message;

        msgEl.textContent = message;
        iconEl.className = type === 'error'
            ? 'fa-solid fa-triangle-exclamation text-red'
            : 'fa-solid fa-circle-check text-green';

        toast.classList.add('show');

        // Haptic feedback on phones
        try {
            if (window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(type === 'error' ? [50, 50, 50] : 50);
            }
        } catch (e) {}

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                this.isToastShowing = false;
                this.currentToast = '';
                this.processToastQueue();
            }, 400);
        }, 3000);
    }

    // 5. Popup managers
    openPopup(id) {
        const el = this.$(id);
        if (el) el.classList.remove('hidden');
    }

    closePopup(id) {
        const el = this.$(id);
        if (el) el.classList.add('hidden');
    }

    // 6. Drag-down-to-dismiss for EVERY bottom sheet (including the spice / size popup that app.js builds)
    initBottomSheetPhysics() {
        let sheet = null, startY = 0, dy = 0, dragging = false;

        document.addEventListener('touchstart', (e) => {
            const s = e.target && e.target.closest ? e.target.closest('.z-bottom-sheet') : null;
            if (!s || s.scrollTop > 0) return;
            sheet = s;
            startY = e.touches[0].clientY;
            dy = 0;
            dragging = true;
            s.style.transition = 'none';
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!dragging || !sheet) return;
            dy = e.touches[0].clientY - startY;
            if (dy > 0) {
                sheet.style.transform = `translateY(${dy}px)`;
            } else {
                dy = 0;
                sheet.style.transform = '';
            }
        }, { passive: true });

        const end = () => {
            if (!dragging || !sheet) return;
            const s = sheet;
            const dragged = dy;
            dragging = false;
            sheet = null;
            dy = 0;
            s.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            if (dragged > 100) {
                s.style.transform = 'translateY(100%)';
                setTimeout(() => {
                    this.dismissSheet(s);
                    s.style.transform = '';
                    s.style.transition = '';
                }, 250);
            } else {
                s.style.transform = 'translateY(0)';
                setTimeout(() => { s.style.transform = ''; s.style.transition = ''; }, 300);
            }
        };
        document.addEventListener('touchend', end);
        document.addEventListener('touchcancel', end);
    }

    dismissSheet(sheet) {
        const overlay = sheet.closest('.z-overlay');
        if (!overlay) return;
        if (overlay.id === 'dynamic-smart-modal' && typeof window.closeDynamicModal === 'function') {
            window.closeDynamicModal();
        } else {
            this.closePopup(overlay.id);
        }
    }

    // 7. Favourites: the bookmark now survives menu re-draws and page reloads
    getFavs() {
        try { return JSON.parse(localStorage.getItem('kavya_favs') || '[]'); } catch (e) { return []; }
    }

    saveFavs(list) {
        try { localStorage.setItem('kavya_favs', JSON.stringify(list)); } catch (e) {}
    }

    dishIdFromButton(btn) {
        try {
            const card = btn.closest('.z-food-card');
            const title = card && card.querySelector('.z-food-title');
            if (!title || typeof menuItems === 'undefined') return null;
            const name = title.textContent.trim();
            const dish = menuItems.find((i) => i.name === name);
            return dish ? dish.id : null;
        } catch (e) { return null; }
    }

    toggleBookmark(btn) {
        if (!btn) return;
        btn.classList.toggle('bookmarked');
        const on = btn.classList.contains('bookmarked');
        btn.innerHTML = on ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>';

        const id = this.dishIdFromButton(btn);
        if (id) {
            let favs = this.getFavs().filter((x) => x !== id);
            if (on) favs.push(id);
            this.saveFavs(favs);
        }
        this.showToast(on ? 'Saved to Favorites!' : 'Removed from Favorites');
    }

    applyBookmarks() {
        const favs = this.getFavs();
        if (!favs.length) return;
        document.querySelectorAll('#menu-items-container .z-bookmark-btn').forEach((btn) => {
            const id = this.dishIdFromButton(btn);
            if (id && favs.indexOf(id) > -1) {
                btn.classList.add('bookmarked');
                btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
            }
        });
    }

    initBookmarks() {
        const feed = this.$('menu-items-container');
        if (!feed) return;
        this.applyBookmarks();
        new MutationObserver(() => this.applyBookmarks()).observe(feed, { childList: true });
    }

    // 8. Voice search (uses the phone's built-in speech recogniser, free, no keys)
    startVoiceSearch() {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) {
            this.showToast('Voice search is not supported on this browser. Please type instead.', 'error');
            return;
        }
        if (this._rec) { try { this._rec.stop(); } catch (e) {} return; }

        const mic = document.querySelector('.z-mic-ico');
        const setMic = (on) => { if (mic) mic.style.color = on ? '#25D366' : ''; };

        const rec = new SR();
        rec.lang = 'en-IN';
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        this._rec = rec;

        rec.onresult = (e) => {
            const text = (e.results && e.results[0] && e.results[0][0] && e.results[0][0].transcript) || '';
            const clean = text.replace(/[.!?]+$/, '').trim();
            const input = this.$('main-search');
            if (input) input.value = clean;
            if (typeof window.filterMenu === 'function') window.filterMenu();
            if (clean) this.showToast(`Searching "${clean}"`);
        };
        rec.onerror = (ev) => {
            this.showToast(ev && ev.error === 'not-allowed' ? 'Microphone permission denied' : 'Could not hear you. Try again.', 'error');
        };
        rec.onend = () => { this._rec = null; setMic(false); };

        setMic(true);
        this.showToast('🎤 Listening... say a dish name');
        try { rec.start(); } catch (e) { this._rec = null; setMic(false); }
    }

    // 9. Android / browser back button closes the open page instead of leaving the app
    initBackButton() {
        const ids = ['dining-page', 'cart-page', 'login-page'];
        const isOpen = () => ids.some((id) => { const el = this.$(id); return el && el.classList.contains('open'); });

        const observer = new MutationObserver(() => {
            const open = isOpen();
            if (open && !this._pushed) {
                this._pushed = true;
                try { history.pushState({ kv: 1 }, ''); } catch (e) {}
            } else if (!open && this._pushed) {
                this._pushed = false;
                try { if (history.state && history.state.kv) history.back(); } catch (e) {}
            }
        });
        ids.forEach((id) => {
            const el = this.$(id);
            if (el) observer.observe(el, { attributes: true, attributeFilter: ['class'] });
        });

        window.addEventListener('popstate', () => {
            if (!this._pushed) return;
            this._pushed = false;
            ids.forEach((id) => {
                const el = this.$(id);
                if (el && el.classList.contains('open') && typeof window.closePage === 'function') window.closePage(id);
            });
        });
    }

    // 10. Tell the customer when the internet drops or returns
    initNetworkStatus() {
        window.addEventListener('offline', () => this.showToast('You are offline. Orders need internet.', 'error'));
        window.addEventListener('online', () => this.showToast('Back online!'));
    }

    // 11. The selected category slides into the middle of the scroll bar
    initCategoryAutoScroll() {
        const cont = this.$('category-scroll-container');
        if (!cont) return;
        new MutationObserver(() => {
            const active = cont.querySelector('.z-cat-item.active');
            if (!active) return;
            const left = active.offsetLeft - (cont.clientWidth - active.offsetWidth) / 2;
            cont.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
        }).observe(cont, { attributes: true, attributeFilter: ['class'], subtree: true });
    }

    // 12. Esc key closes popups and sheets (useful on desktop)
    initKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            const smart = this.$('dynamic-smart-modal');
            if (smart && smart.classList.contains('open') && typeof window.closeDynamicModal === 'function') {
                window.closeDynamicModal();
                return;
            }
            const celeb = this.$('coin-celebration');
            if (celeb && !celeb.classList.contains('hidden')) this.closePopup('coin-celebration');
        });
    }
}

// Initialize UI Engine Globally
window.UI = new UIController();

// Global shortcuts used by onclick="" in index.html
window.showToast = function (msg, type) { window.UI.showToast(msg, type); };
window.openPopup = function (id) { window.UI.openPopup(id); };
window.closePopup = function (id) { window.UI.closePopup(id); };
window.startVoiceSearch = function () { window.UI.startVoiceSearch(); };
window.scrollHomeTop = function () {
    const home = document.getElementById('home-page');
    if (home && home.scrollTo) home.scrollTo({ top: 0, behavior: 'smooth' });
};
