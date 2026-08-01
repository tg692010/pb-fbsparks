// ==========================================================================
// BUILD FBISD SPARKS STEM CENTER - INTERACTIVE LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. RENDER GALLERY TAB SWITCHER
  const tabBtns = document.querySelectorAll('.tab-btn');
  const renderPanels = document.querySelectorAll('.render-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update Active Button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Active Panel
      renderPanels.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 2. PETITION SIGNATURE FORM & LIVE COUNTER UPDATE
  let currentSignatures = 3842;
  const targetSignatures = 5000;

  const heroPetitionForm = document.getElementById('hero-petition-form');
  const sigCountElem = document.getElementById('hero-sig-count');
  const progressFill = document.getElementById('hero-progress-fill');

  if (heroPetitionForm) {
    heroPetitionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('signer-name').value.trim();
      const emailInput = document.getElementById('signer-email').value.trim();
      const roleInput = document.getElementById('signer-role').value;

      if (!nameInput || !emailInput || !roleInput) return;

      // Increment signature count
      currentSignatures++;
      sigCountElem.textContent = currentSignatures.toLocaleString();

      const newPercent = Math.min(100, (currentSignatures / targetSignatures) * 100);
      progressFill.style.width = `${newPercent.toFixed(1)}%`;

      // Show Thank You Feedback
      heroPetitionForm.innerHTML = `
        <div class="thank-you-box" style="text-align: center; padding: 20px; background: rgba(5, 150, 105, 0.1); border: 1px solid #059669; border-radius: 10px; color: #0f172a;">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">🎉</div>
          <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.3rem; color: #059669; margin-bottom: 6px;">Signature Confirmed!</h3>
          <p style="font-size: 0.88rem; color: #475569;">Thank you, <strong>${escapeHtml(nameInput)}</strong> (${escapeHtml(roleInput)})! Your voice brings us one step closer to bringing the FBISD SPARKS STEM Center to life.</p>
          <div style="margin-top: 12px; font-size: 0.85rem; font-weight: 700; color: #b45309;">Now share this petition with 5 FBISD parents! 👇</div>
        </div>
      `;
    });
  }

  // 3. ANIMATED STAT COUNTERS ON SCROLL
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimatedStats = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      let start = 0;
      const duration = 1800; // ms
      const increment = Math.ceil(target / (duration / 16));

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          stat.textContent = target.toLocaleString() + (stat.textContent.includes('+') ? '+' : '');
          clearInterval(timer);
        } else {
          stat.textContent = start.toLocaleString();
        }
      }, 16);
    });
  }

  const statSection = document.querySelector('.impact-section');
  if (statSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          hasAnimatedStats = true;
          animateCounters();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statSection);
  }

  // 4. COPY LINK & INSTAGRAM SOCIAL BUTTONS
  const copyLinkBtn = document.getElementById('copy-link-btn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = `<span>✓</span> [ Link Copied to Clipboard! ]`;
        copyLinkBtn.style.background = 'rgba(5, 150, 105, 0.15)';
        setTimeout(() => {
          copyLinkBtn.innerHTML = originalText;
          copyLinkBtn.style.background = 'var(--bg-subtle)';
        }, 3000);
      });
    });
  }

  const copyIgBtn = document.getElementById('copy-ig-btn');
  if (copyIgBtn) {
    copyIgBtn.addEventListener('click', () => {
      const text = "Help us build the proposed FBISD SPARKS STEM Center! Sign the petition: " + window.location.href + " #BuildFBISDSTEM";
      navigator.clipboard.writeText(text).then(() => {
        alert("Instagram story text & link copied! Paste it in your Instagram story post.");
      });
    });
  }

  // 5. SMS MODAL LOGIC
  const smsModal = document.getElementById('sms-modal');
  const openSmsModalBtn = document.getElementById('open-sms-modal');
  const closeSmsModalBtn = document.getElementById('close-sms-modal');
  const modalSmsForm = document.getElementById('modal-sms-form');

  if (openSmsModalBtn && smsModal) {
    openSmsModalBtn.addEventListener('click', () => {
      smsModal.classList.add('open');
    });
  }

  if (closeSmsModalBtn && smsModal) {
    closeSmsModalBtn.addEventListener('click', () => {
      smsModal.classList.remove('open');
    });
  }

  if (modalSmsForm) {
    modalSmsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("✅ Welcome to the Student Coalition! You'll receive high-priority SMS notifications for Board Meeting registration deadlines.");
      smsModal.classList.remove('open');
    });
  }

  // 6. CORPORATE ENDORSEMENT FORM
  const corporateForm = document.getElementById('corporate-endorse-form');
  if (corporateForm) {
    corporateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("🤝 Thank you! Your official endorsement has been logged and will be included in the Board of Trustees proposal packet.");
      corporateForm.reset();
    });
  }

  // 7. TALKING POINTS DOWNLOAD SIMULATION
  const downloadTalkingPointsBtn = document.getElementById('download-talking-points');
  if (downloadTalkingPointsBtn) {
    downloadTalkingPointsBtn.addEventListener('click', () => {
      alert("📄 Downloading 3-Minute Public Comment Talking Points (PDF)... Bring this to the podium!");
    });
  }

  // 8. SMS QUICK FORM IN FOOTER
  const smsQuickForm = document.getElementById('sms-quick-form');
  if (smsQuickForm) {
    smsQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("📱 Subscribed! You will receive text alerts for upcoming FBISD Board Meetings.");
      smsQuickForm.reset();
    });
  }

  // Helper function to sanitize HTML
  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

});
