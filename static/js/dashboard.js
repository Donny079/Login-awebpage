// Dashboard interactivity
document.addEventListener('DOMContentLoaded', () => {
  // Display current date and time
  function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const dateEl = document.getElementById('current-date');
    if (dateEl) dateEl.textContent = dateStr;
  }

  // Update session time display
  let sessionStartTime = Date.now();
  function updateSessionTime() {
    const now = Date.now();
    const elapsed = Math.floor((now - sessionStartTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const sessionTimeEl = document.getElementById('session-time');
    if (sessionTimeEl) {
      sessionTimeEl.textContent = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    }
  }

  // Add click handlers to setting buttons
  const settingButtons = document.querySelectorAll('.btn-secondary');
  settingButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = ['Notifications configured!', 'Password change initiated!', 'Privacy settings updated!', 'Connected devices listed!'][index] || 'Action saved!';
      showNotification(message);
    });
  });

  function showNotification(msg) {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #34d399, #6366f1);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(52, 211, 153, 0.3);
      font-weight: 600;
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    `;
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  }

  // Add entrance animation to stat cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.stat-card, .setting-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Initialize
  updateDateTime();
  updateSessionTime();
  setInterval(updateSessionTime, 1000);

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});
