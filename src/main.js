// =============================================
// DreamLogic Apps — Main JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && systemDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      
      localStorage.setItem('theme', newTheme);
    });
  }

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

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
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

  // Scroll reveal animation with stagger
  const revealElements = document.querySelectorAll('.app-card, .about-feature, .contact-card, .section-header, .about-visual, .about-text');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger cards based on their index among siblings
          const el = entry.target;
          if (el.classList.contains('app-card')) {
            const cards = Array.from(el.parentElement.children);
            const idx = cards.indexOf(el);
            el.style.transitionDelay = `${idx * 0.1}s`;
          }
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // Chat bubble sequential pop-in animation
  const chatBubbles = document.querySelectorAll('.chat-bubble');
  
  if (chatBubbles.length > 0 && 'IntersectionObserver' in window) {
    let chatAnimated = false;
    
    const chatObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !chatAnimated) {
          chatAnimated = true;
          chatBubbles.forEach((bubble, index) => {
            setTimeout(() => {
              bubble.classList.add('chat-visible');
            }, index * 400); // 400ms delay between each bubble
          });
          chatObserver.disconnect();
        }
      });
    }, {
      threshold: 0.3
    });

    // Observe the chat mockup container
    const chatMockup = document.querySelector('.chat-mockup');
    if (chatMockup) {
      chatObserver.observe(chatMockup);
    }
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

  // Smooth scroll with navbar offset for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navbarHeight = navbar ? navbar.offsetHeight : 64;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
});
