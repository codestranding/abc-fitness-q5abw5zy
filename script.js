// Touchstone 3.2: sessionStorage for cart, localStorage for contact form
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // Helpers for sessionStorage cart
  const CART_KEY = 'cartItems';
  const getCart = () => {
    try { return JSON.parse(sessionStorage.getItem(CART_KEY) || '[]'); }
    catch { return []; }
  };
  const setCart = (arr) => sessionStorage.setItem(CART_KEY, JSON.stringify(arr));
  const clearCart = () => sessionStorage.removeItem(CART_KEY);

  ready(() => {
    /* -------- 1) Footer Subscribe (same behavior as 3.1) -------- */
    const subForm = document.getElementById('subscribe-form');
    if (subForm) {
      subForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('subscribe-email')?.value.trim() || '';
        if (!email) { alert('Please fill out this field.'); return; }
        alert('Thank you for subscribing.');
        subForm.reset();
      });
    }

    /* -------- 2) Gallery: Cart with sessionStorage -------- */
    // Add to Cart
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
      const cart = getCart();
      cart.forEach((name) => {
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

    /* -------- 3) About/Contact: save to localStorage -------- */
    // Saves name/email/phone/feedback/customOrder to localStorage
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('[name="name"]')?.value.trim() || '';
        const email = contactForm.querySelector('[name="email"]')?.value.trim() || '';
        const phone = contactForm.querySelector('[name="phone"]')?.value.trim() || '';
        const message = contactForm.querySelector('[name="message"]')?.value.trim() || '';
        const customOrder = contactForm.querySelector('[name="customOrder"]')?.checked || false;

        if (!name && !email && !message) { alert('Please enter your name, email, and feedback.'); return; }
        if (!name || !email || !message) { alert('Please fill out this field.'); return; }

        const payload = { name, email, phone, feedback: message, customOrder };
        const key = `contact_${Date.now()}`;
        localStorage.setItem(key, JSON.stringify(payload)); // required by Task 3.2
        alert('Thank you for your message');
        contactForm.reset();
      });
    }
  });
})();
