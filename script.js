// Touchstone 3.1 logic (subscribe + gallery cart + contact form)

// make a tiny "ready" helper so this runs whether the DOM is already loaded or not
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // simple in-memory cart
  var cart = window.__cart || [];
  window.__cart = cart;

  ready(function () {
    /* =========== 1) Footer Subscribe (all pages) =========== */
    var subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var emailInput = document.getElementById('subscribe-email');
        var email = (emailInput && emailInput.value ? emailInput.value.trim() : '');

        if (!email) {
          alert('Please fill out this field.');
          if (emailInput) emailInput.focus();
          return;
        }

        // OPTIONAL: add format check by uncommenting the 3 lines below
        // var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!isEmail.test(email)) { alert('Please enter a valid email address.'); return; }

        alert('Thank you for subscribing.');
        subscribeForm.reset();
      });
    }

    /* =========== 2) Gallery: Cart Buttons & Modal =========== */
    var addBtns = document.querySelectorAll('.add-to-cart');
    addBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.getAttribute('data-item') || 'Item';
        cart.push(item);
        alert('Item added to the cart');
      });
    });

    var modal = document.getElementById('cart-modal');
    var itemsList = document.getElementById('cart-items');
    var viewBtn = document.getElementById('view-cart');
    var clearBtn = document.getElementById('clear-cart');
    var processBtn = document.getElementById('process-order');
    var closeBtn = document.getElementById('close-cart');

    function renderCart() {
      if (!itemsList) return;
      itemsList.innerHTML = '';
      cart.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        itemsList.appendChild(li);
      });
    }

    if (viewBtn && modal) {
      viewBtn.addEventListener('click', function () {
        renderCart();
        modal.classList.remove('hidden');
      });
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', function () {
        modal.classList.add('hidden');
      });
    }
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.classList.add('hidden');
      });
      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') modal.classList.add('hidden');
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
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
      processBtn.addEventListener('click', function () {
        if (cart.length) {
          alert('Thank you for your order');
          cart.length = 0;
          renderCart();
        } else {
          alert('Cart is empty.');
        }
      });
    }

    /* =========== 3) About/Contact Form Alerts =========== */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (contactForm.querySelector('[name="name"]') || {}).value || '';
        var email = (contactForm.querySelector('[name="email"]') || {}).value || '';
        var message = (contactForm.querySelector('[name="message"]') || {}).value || '';

        name = name.trim(); email = email.trim(); message = message.trim();

        if (!name && !email && !message) {
          alert('Please enter your name, email, and feedback.');
          return;
        }
        if (!name || !email || !message) {
          alert('Please fill out this field.');
          return;
        }
        alert('Thank you for your message');
        contactForm.reset();
      });
    }
  });
})();
