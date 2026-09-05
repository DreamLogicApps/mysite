// =============================================
// DreamLogic Apps — Main JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Navbar scroll shadow
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // App carousel arrow navigation
  const appGrid = document.getElementById('appGrid');
  const leftArrow = document.getElementById('carouselLeft');
  const rightArrow = document.getElementById('carouselRight');

  if (appGrid && leftArrow && rightArrow) {
    const getScrollAmount = () => {
      const card = appGrid.querySelector('.app-card');
      if (!card) return 300;
      return card.offsetWidth + 20; // card width + gap
    };

    leftArrow.addEventListener('click', () => {
      appGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
      appGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });
  }

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.app-card, .about-feature, .contact-card, .section-header, .about-visual, .about-text');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation slightly for elements in a grid
          const delay = entry.target.classList.contains('app-card')
            ? index * 100
            : 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // Active nav link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinkElements.length > 0) {
    const highlightNav = () => {
      const scrollY = window.scrollY + 100;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
  }
});
