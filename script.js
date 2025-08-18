/* Touchstone 3.x – Subscribe + Cart (sessionStorage) + Contact (localStorage) */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // ---- sessionStorage helpers for the cart ----
  const CART_KEY = 'cartItems';
  const getCart = () => {
    try { return JSON.parse(sessionStorage.getItem(CART_KEY) || '[]'); }
    catch { return []; }
  };
  const setCart = (arr) => sessionStorage.setItem(CART_KEY, JSON.stringify(arr));
  const clearCart = () => sessionStorage.removeItem(CART_KEY);

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  ready(() => {
    /* ========== 1) Footer Subscribe (all pages) ========== */
    const subForm = document.getElementById('subscribe-form');
    if (subForm) {
      subForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('subscribe-email');
        const email = (input?.value || '').trim();

        if (!email) { alert('Please fill out this field.'); input?.focus(); return; }
        if (!isEmail(email)) { alert('Please enter a valid email address.'); input?.focus(); return; }

        alert('Thank you for subscribing.');
        subForm.reset();
      });
    }

    /* ========== 2) Gallery Cart (sessionStorage) ========== */
    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.dataset.item || 'Item';
        const cart = getCart();
        cart.push(item);
        setCart(cart);
        alert('Item added to the cart');
      });
    });

    // Modal controls
    const modal = document.getElementById('cart-modal');
    const itemsList = document.getElementById('cart-items');
    const viewBtn = document.getElementById('view-cart');
    const clearBtn = document.getElementById('clear-cart');
    const processBtn = document.getElementById('process-order');
    const closeBtn = document.getElementById('close-cart');

    const renderCart = () => {
      if (!itemsList) return;
      itemsList.innerHTML = '';
      getCart().forEach((name) => {
        const li = document.createElement('li');
        li.textContent = name;
        itemsList.appendChild(li);
      });
    };

    if (viewBtn && modal) {
      viewBtn.addEventListener('click', () => {
        renderCart();
        modal.classList.remove('hidden');
      });
    }
    if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    if (modal) {
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
      window.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.add('hidden'); });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const cart = getCart();
        if (!cart.length) { alert('No items to clear.'); return; }
        clearCart();
        renderCart();
        alert('Cart Cleared');
      });
    }

    if (processBtn) {
      processBtn.addEventListener('click', () => {
        const cart = getCart();
        if (!cart.length) { alert('Cart is empty.'); return; }
        alert('Thank you for your order');
        clearCart();
        renderCart();
      });
    }

    /* ========== 3) About/Contact Form (localStorage) ========== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('[name="name"]')?.value.trim() || '';
        const email = contactForm.querySelector('[name="email"]')?.value.trim() || '';
        const phone = contactForm.querySelector('[name="phone"]')?.value.trim() || '';
        const message = contactForm.querySelector('[name="message"]')?.value.trim() || '';
        const customOrder = !!contactForm.querySelector('[name="customOrder"]')?.checked;

        if (!name && !email && !message) { alert('Please enter your name, email, and feedback.'); return; }
        if (!name || !email || !message) { alert('Please fill out this field.'); return; }
        if (!isEmail(email)) { alert('Please enter a valid email address.'); return; }

        const payload = { name, email, phone, feedback: message, customOrder };
        const key = `contact_${Date.now()}`;
        try { localStorage.setItem(key, JSON.stringify(payload)); } catch (_) {}
        alert('Thank you for your message');
        contactForm.reset();
      });
    }
  });
})();
