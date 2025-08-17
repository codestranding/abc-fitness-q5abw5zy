// Simple in-memory cart (Gallery page)
const cart = [];

document.addEventListener('DOMContentLoaded', () => {
  /* ============ 1) Footer Subscribe (all pages) ============ */
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('subscribe-email')?.value.trim() || '';
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic format check

      if (!email) {
        alert('Please fill out this field.');
        return;
      }
      if (!isEmail.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thank you for subscribing.');
      subscribeForm.reset();
    });
  }

  /* ============ 2) Gallery: Cart Buttons & Modal ============ */
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item || 'Item';
      cart.push(item);
      alert('Item added to the cart');
    });
  });

  const modal = document.getElementById('cart-modal');
  const itemsList = document.getElementById('cart-items');
  const viewBtn = document.getElementById('view-cart');
  const clearBtn = document.getElementById('clear-cart');
  const processBtn = document.getElementById('process-order');
  const closeBtn = document.getElementById('close-cart');

  function renderCart() {
    if (!itemsList) return;
    itemsList.innerHTML = '';
    cart.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      itemsList.appendChild(li);
    });
  }

  if (viewBtn && modal) {
    viewBtn.addEventListener('click', () => {
      renderCart();
      modal.classList.remove('hidden');
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.classList.add('hidden');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (cart.length) {
        cart.length = 0;
        alert('Cart Cleared');
        renderCart();
      } else {
        alert('No items to clear.');
      }
    });
  }

  if (processBtn) {
    processBtn.addEventListener('click', () => {
      if (cart.length) {
        alert('Thank you for your order');
        cart.length = 0;
        renderCart();
      } else {
        alert('Cart is empty.');
      }
    });
  }

  /* ============ 3) About/Contact Form Alerts ============ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value.trim() || '';
      const email = contactForm.querySelect
