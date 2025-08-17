// Subscribe footer form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscribe-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('subscribe-email')?.value.trim() || '';
    if (!email) {
      alert('Please fill out this field.');
      return;
    }
    alert('Thank you for subscribing.');
    form.reset();
  });
});

