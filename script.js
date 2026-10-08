/**
 * Eiscafé Sardegna - Interactive Scripts
 * Handles menu filtering, modal dialogs, mobile navigation, live opening hours, and inquiry form.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMenuFilters();
  initMobileNavigation();
  initScrollSpy();
  initModals();
  updateLiveOpeningStatus();
});

/* -------------------------------------------------------------------------
   1. Menu Category Filtering
   ------------------------------------------------------------------------- */
function initMenuFilters() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!tabButtons.length || !menuCards.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category');

      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------
   2. Mobile Hamburger Navigation
   ------------------------------------------------------------------------- */
function initMobileNavigation() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------------------------------------------------------------------------
   3. ScrollSpy: Highlight active link on scroll
   ------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* -------------------------------------------------------------------------
   4. Live Opening Status Indicator (Official Sardegna Schedule)
   ------------------------------------------------------------------------- */
function updateLiveOpeningStatus() {
  const statusTextElem = document.getElementById('liveStatusText');
  if (!statusTextElem) return;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeDecimal = currentHour + currentMinutes / 60;

  // Sardegna schedule:
  // Mo-Fr: 10:30 bis 19:00 Uhr
  // Sa-So: 11:00 bis 19:00 Uhr
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  const openTime = isWeekend ? 11.0 : 10.5;
  const closeTime = 19.0;

  if (currentTimeDecimal >= openTime && currentTimeDecimal < closeTime) {
    statusTextElem.textContent = `Jetzt geöffnet • Bis 19:00 Uhr für Sie da`;
  } else {
    statusTextElem.textContent = `Heute geöffnet ab ${isWeekend ? '11:00' : '10:30'} Uhr bis 19:00 Uhr`;
  }
}

/* -------------------------------------------------------------------------
   5. Interactive Form Submission
   ------------------------------------------------------------------------- */
function handleFormSubmit(event) {
  event.preventDefault();

  const successAlert = document.getElementById('formSuccessAlert');
  const form = document.getElementById('contactForm');

  if (successAlert) {
    successAlert.style.display = 'block';
    form.reset();

    setTimeout(() => {
      successAlert.style.display = 'none';
    }, 6000);
  }
}

/* -------------------------------------------------------------------------
   6. Shortcut Helper: Pre-select Event Catering
   ------------------------------------------------------------------------- */
function selectEventInquiry() {
  const selectElem = document.getElementById('inquiryType');
  if (selectElem) {
    selectElem.value = 'eisfahrrad';
  }
}

/* -------------------------------------------------------------------------
   7. Modals: Impressum & Datenschutz
   ------------------------------------------------------------------------- */
function initModals() {
  const openButtons = document.querySelectorAll('[data-modal-target]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const overlays = document.querySelectorAll('.modal-overlay');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      overlays.forEach(overlay => overlay.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(overlay => overlay.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });
}
