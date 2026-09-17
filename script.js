/**
 * ADHUL NADH - INTERACTIVE PORTFOLIO ENGINE
 * Particles Canvas, Terminal Typewriter, Custom Cursor,
 * Filters, Lightbox, Timeline, Form Validation, Theme Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== 1. THEME SWITCHER ====================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn?.querySelector('i');

  const savedTheme = localStorage.getItem('adhul_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('adhul_theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fas fa-moon';
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      themeIcon.className = 'fas fa-sun';
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
    }
  }

  // ==================== 2. CUSTOM CURSOR GLOW ====================
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // ==================== 3. CYBER PARTICLE CANVAS ====================
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particleCount = Math.min(Math.floor(width / 22), 65);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.5 ? 'rgba(0, 240, 255,' : 'rgba(168, 85, 247,'
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} 0.8)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // ==================== 4. TERMINAL TYPING ANIMATION ====================
  const typewriterElem = document.getElementById('typewriter');
  const phrases = [
    'Cybersecurity Enthusiast',
    'Video Editor',
    'Poster Designer',
    'Logo Editor'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 90;

  function typeTick() {
    if (!typewriterElem) return;
    const current = phrases[phraseIdx];

    if (isDeleting) {
      typewriterElem.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 40;
    } else {
      typewriterElem.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 95;
    }

    if (!isDeleting && charIdx === current.length) {
      speed = 1800; // Pause at completion
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 350;
    }

    setTimeout(typeTick, speed);
  }
  typeTick();

  // ==================== 5. NAVBAR, SCROLL SPY & BACK-TO-TOP ====================
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header background blur
    if (scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Section Spy
    let currentSec = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSec = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSec}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ==================== 6. MOBILE DRAWER NAVIGATION ====================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
    mobileToggle?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileDrawer?.classList.remove('active');
    document.body.style.overflow = '';
    mobileToggle?.setAttribute('aria-expanded', 'false');
  }

  mobileToggle?.addEventListener('click', openMenu);
  mobileClose?.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) closeMenu();
  });

  // ==================== 7. SKILLS ANIMATED PROGRESS BARS ====================
  const progressFills = document.querySelectorAll('.progress-fill');
  let animatedSkills = false;

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedSkills) {
        animatedSkills = true;
        progressFills.forEach(fill => {
          const target = fill.getAttribute('data-target') || '85%';
          fill.style.width = target;
        });
      }
    });
  }, { threshold: 0.25 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillsObserver.observe(skillsSection);

  // ==================== 8. PROJECTS FILTERING & MODAL ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Details Modal
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalImg = document.getElementById('modal-img');
  const modalTags = document.getElementById('modal-tags');
  const modalDemoLink = document.getElementById('modal-demo-link');
  const modalCodeLink = document.getElementById('modal-code-link');

  const viewDetailBtns = document.querySelectorAll('.view-project-details');
  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card');
      if (!card || !projectModal) return;

      const title = card.querySelector('.project-title')?.textContent || '';
      const desc = card.querySelector('.project-desc')?.textContent || '';
      const img = card.querySelector('.project-thumb-box img')?.src || '';
      const tags = card.querySelectorAll('.tech-pill');
      const demoUrl = card.getAttribute('data-demo') || '#';
      const codeUrl = card.getAttribute('data-github') || 'https://github.com/adhulnadh/';

      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalImg) modalImg.src = img;
      if (modalDemoLink) modalDemoLink.href = demoUrl;
      if (modalCodeLink) modalCodeLink.href = codeUrl;

      if (modalTags) {
        modalTags.innerHTML = '';
        tags.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tech-pill';
          span.textContent = tag.textContent;
          modalTags.appendChild(span);
        });
      }

      if (typeof projectModal.showModal === 'function') {
        projectModal.showModal();
      } else {
        projectModal.setAttribute('open', 'true');
      }
      document.body.style.overflow = 'hidden';
    });
  });

  modalCloseBtn?.addEventListener('click', () => {
    if (typeof projectModal.close === 'function') {
      projectModal.close();
    } else {
      projectModal.removeAttribute('open');
    }
    document.body.style.overflow = '';
  });

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.close();
      document.body.style.overflow = '';
    }
  });

  // ==================== 9. GALLERY LIGHTBOX ====================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIdx = 0;
  const itemsArray = Array.from(galleryItems);

  function openLightbox(idx) {
    if (!lightboxModal || !itemsArray[idx]) return;
    currentGalleryIdx = idx;
    updateLightbox();

    if (typeof lightboxModal.showModal === 'function') {
      lightboxModal.showModal();
    } else {
      lightboxModal.setAttribute('open', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    const item = itemsArray[currentGalleryIdx];
    if (!item) return;

    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || item.querySelector('.gallery-title')?.textContent || '';
    const desc = item.getAttribute('data-desc') || item.querySelector('.gallery-tag')?.textContent || '';
    const fullSrc = item.getAttribute('data-full-img') || img?.src;

    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      lightboxImg.src = fullSrc;
      lightboxImg.onload = () => {
        lightboxImg.style.opacity = '1';
      };
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    if (typeof lightboxModal.close === 'function') {
      lightboxModal.close();
    } else {
      lightboxModal.removeAttribute('open');
    }
    document.body.style.overflow = '';
  }

  function nextGallery() {
    currentGalleryIdx = (currentGalleryIdx + 1) % itemsArray.length;
    updateLightbox();
  }

  function prevGallery() {
    currentGalleryIdx = (currentGalleryIdx - 1 + itemsArray.length) % itemsArray.length;
    updateLightbox();
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxNext?.addEventListener('click', (e) => { e.stopPropagation(); nextGallery(); });
  lightboxPrev?.addEventListener('click', (e) => { e.stopPropagation(); prevGallery(); });

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightboxModal?.open) {
      if (e.key === 'ArrowRight') nextGallery();
      else if (e.key === 'ArrowLeft') prevGallery();
      else if (e.key === 'Escape') closeLightbox();
    }
    if (projectModal?.open && e.key === 'Escape') {
      projectModal.close();
      document.body.style.overflow = '';
    }
  });

  // ==================== 10. CONTACT FORM & ONE-CLICK COPY ====================
  const contactForm = document.getElementById('contact-form');
  const toastAlert = document.getElementById('toast-alert');
  const toastMsg = document.getElementById('toast-message');
  const copyButtons = document.querySelectorAll('.copy-btn');

  // Copy to clipboard
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = 'var(--accent-cyan)';
        btn.style.color = '#000';

        showToast(`Copied "${text}" to clipboard!`);

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.background = '';
          btn.style.color = '';
        }, 2200);
      } catch (err) {
        showToast('Failed to copy to clipboard', 'error');
      }
    });
  });

  function showToast(message, type = 'success') {
    if (!toastAlert || !toastMsg) return;
    toastMsg.textContent = message;

    const icon = toastAlert.querySelector('.toast-icon');
    if (icon) {
      icon.className = type === 'success' ? 'fas fa-circle-check toast-icon' : 'fas fa-circle-exclamation toast-icon';
      icon.style.color = type === 'success' ? 'var(--accent-cyan)' : '#ef4444';
    }

    toastAlert.classList.add('show');
    setTimeout(() => {
      toastAlert.classList.remove('show');
    }, 3800);
  }

  // Form Validation & Send
  if (contactForm) {
    const nameIn = document.getElementById('contact-name');
    const emailIn = document.getElementById('contact-email');
    const subjectIn = document.getElementById('contact-subject');
    const messageIn = document.getElementById('contact-message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    function checkField(input, valid, errorMsg) {
      const parent = input.closest('.form-group');
      const feedback = parent?.querySelector('.form-feedback');
      if (!valid) {
        parent?.classList.add('has-error');
        if (feedback) feedback.textContent = errorMsg;
        return false;
      } else {
        parent?.classList.remove('has-error');
        if (feedback) feedback.textContent = '';
        return true;
      }
    }

    function isEmail(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }

    nameIn?.addEventListener('input', () => checkField(nameIn, nameIn.value.trim().length >= 2, 'Please enter at least 2 characters.'));
    emailIn?.addEventListener('input', () => checkField(emailIn, isEmail(emailIn.value.trim()), 'Please enter a valid email address.'));
    messageIn?.addEventListener('input', () => checkField(messageIn, messageIn.value.trim().length >= 10, 'Message must be at least 10 characters.'));

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const v1 = checkField(nameIn, nameIn.value.trim().length >= 2, 'Name must be at least 2 characters.');
      const v2 = checkField(emailIn, isEmail(emailIn.value.trim()), 'Please provide a valid email address.');
      const v3 = checkField(messageIn, messageIn.value.trim().length >= 10, 'Message must be at least 10 characters.');

      if (!v1 || !v2 || !v3) {
        showToast('Please fix the errors in the form.', 'error');
        return;
      }

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('Message transmitted successfully! Adhul will get back to you soon.');
      }, 1300);
    });
  }
});
