import { portfolioData } from './portfolio-data.js';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Bind profile basic data
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Header CTAs
  const ctas = document.querySelectorAll('.nav-cta, .hero-ctas a, .calculator-cta');
  ctas.forEach(cta => {
    if (cta.getAttribute('href') === '#contact') {
      cta.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
  
  // Render all dynamic sections
  renderCredibility();
  renderAbout();
  renderServices();
  renderFunnel();
  renderPortfolio();
  renderPlatforms();
  renderWhyChooseMe();
  renderSkills();
  bindContactInfo();
  
  // Setup interactive widgets & events
  setupThemeToggle();
  setupMobileMenu();
  setupTestimonialCarousel();
  setupRoiCalculator();
  setupScrollReveal();
  setupNewsletterForm();
  setupCyberEffects();
}

/* 1. Dynamic Rendering Functions */

function renderCredibility() {
  const container = document.getElementById('credibility-grid');
  if (!container) return;
  
  container.innerHTML = portfolioData.credibilitySnapshot.map((item, idx) => {
    let icon = '';
    switch (idx) {
      case 0: icon = 'fa-user-check'; break;
      case 1: icon = 'fa-dollar-sign'; break;
      case 2: icon = 'fa-handshake'; break;
      case 3: icon = 'fa-cubes'; break;
    }
    
    return `
      <div class="credibility-card accent-${item.accent} scroll-reveal fade-in-up" style="transition-delay: ${idx * 100}ms">
        <div class="credibility-icon-container">
          <i class="fa-solid ${icon}"></i>
        </div>
        <div class="credibility-num">${item.number}</div>
        <div class="credibility-label">${item.label}</div>
        <p class="credibility-desc">${item.description}</p>
      </div>
    `;
  }).join('');
}

function renderAbout() {
  const textContainer = document.getElementById('about-text-container');
  const bulletsContainer = document.getElementById('about-bullets-container');
  const timelineContainer = document.getElementById('timeline-graphic-container');
  
  if (textContainer) {
    textContainer.innerHTML = portfolioData.about.paragraphs
      .map(p => `<p>${p}</p>`)
      .join('');
  }
  
  if (bulletsContainer) {
    bulletsContainer.innerHTML = portfolioData.about.bullets
      .map(bullet => `
        <div class="about-bullet-item">
          <i class="fa-solid fa-circle-check"></i>
          <span>${bullet}</span>
        </div>
      `).join('');
  }
  
  if (timelineContainer) {
    timelineContainer.innerHTML = portfolioData.about.timeline
      .map((item, idx) => `
        <div class="timeline-node" style="transition-delay: ${idx * 100}ms">
          <div class="timeline-dot"></div>
          <div class="timeline-year">${item.year}</div>
          <div class="timeline-label">${item.label}</div>
        </div>
      `).join('');
  }
}

function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;
  
  container.innerHTML = portfolioData.services.map((service, idx) => {
    const listHtml = service.list
      .map(item => `
        <div class="service-list-item">
          <i class="fa-solid fa-circle-chevron-right"></i>
          <span>${item}</span>
        </div>
      `).join('');
      
    let iconClass = 'fa-target-list';
    if (service.icon === 'target') iconClass = 'fa-bullseye';
    else if (service.icon === 'funnel') iconClass = 'fa-filter';
    else if (service.icon === 'chart-line') iconClass = 'fa-chart-line';
    
    return `
      <div class="service-card scroll-reveal fade-in-up" style="transition-delay: ${idx * 150}ms">
        <div class="service-icon">
          <i class="fa-solid ${iconClass}"></i>
        </div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-desc">${service.description}</p>
        <div class="service-list">
          ${listHtml}
        </div>
      </div>
    `;
  }).join('');
}

function renderFunnel() {
  const timelineContainer = document.getElementById('funnel-timeline-container');
  const metricsContainer = document.getElementById('funnel-metrics-container');
  const titleEl = document.getElementById('funnel-title');
  const subtitleEl = document.getElementById('funnel-subtitle');
  
  if (titleEl) titleEl.textContent = portfolioData.funnelSystem.title;
  if (subtitleEl) subtitleEl.textContent = portfolioData.funnelSystem.subtitle;
  
  if (timelineContainer) {
    timelineContainer.innerHTML = portfolioData.funnelSystem.stages.map((stage, idx) => {
      let iconClass = 'fa-circle';
      if (stage.icon === 'bullseye') iconClass = 'fa-crosshairs';
      else if (stage.icon === 'handshake') iconClass = 'fa-handshake';
      else if (stage.icon === 'clipboard-check') iconClass = 'fa-clipboard-check';
      else if (stage.icon === 'rocket') iconClass = 'fa-rocket';
      else if (stage.icon === 'star') iconClass = 'fa-star';
      
      return `
        <div class="funnel-stage-node scroll-reveal fade-in-up" style="transition-delay: ${idx * 100}ms">
          <div class="funnel-circle color-${stage.color}">
            <i class="fa-solid ${iconClass}"></i>
          </div>
          <div class="funnel-stage-num">${stage.stage}</div>
          <div class="funnel-stage-name">${stage.name}</div>
          <div class="funnel-stage-duration">${stage.duration}</div>
          <p class="funnel-stage-desc">${stage.description}</p>
        </div>
      `;
    }).join('');
  }
  
  if (metricsContainer) {
    metricsContainer.innerHTML = `
      <div class="funnel-metric-item">
        <div class="funnel-metric-label">Clients Closed</div>
        <div class="funnel-metric-value">${portfolioData.funnelSystem.metrics.funnelTime}</div>
      </div>
      <div class="funnel-metric-item">
        <div class="funnel-metric-label">Expertise</div>
        <div class="funnel-metric-value">${portfolioData.funnelSystem.metrics.conversionRate}</div>
      </div>
      <div class="funnel-metric-item">
        <div class="funnel-metric-label">Focus</div>
        <div class="funnel-metric-value">${portfolioData.funnelSystem.metrics.repeatRate}</div>
      </div>
    `;
  }
}

function renderPortfolio() {
  const container = document.getElementById('portfolio-grid');
  if (!container) return;
  
  container.innerHTML = portfolioData.caseStudies.map((project, idx) => {
    const tagsHtml = project.tags
      .map(tag => `<span class="portfolio-tag">#${tag}</span>`)
      .join('');
      
    return `
      <div class="portfolio-card scroll-reveal fade-in-up" style="transition-delay: ${idx * 150}ms">
        <img src="${project.image}" alt="${project.industry}" class="portfolio-image">
        <div class="portfolio-overlay">
          <span class="portfolio-industry">${project.industry}</span>
          <h3 class="portfolio-challenge">Challenge: ${project.challenge}</h3>
        </div>
        <div class="portfolio-hover-details">
          <div class="portfolio-hover-industry">${project.industry}</div>
          <h4 class="portfolio-hover-challenge">Challenge: ${project.challenge}</h4>
          <p class="portfolio-hover-result"><strong>Result:</strong> ${project.result}</p>
          <div class="portfolio-hover-metrics"><strong>Metrics:</strong> ${project.metrics}</div>
          <div class="portfolio-tags">
            ${tagsHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderPlatforms() {
  const container = document.getElementById('platforms-grid');
  if (!container) return;
  
  container.innerHTML = portfolioData.platformExpertise.map((plat, idx) => {
    let iconHtml = '';
    if (plat.icon === 'upwork') {
      iconHtml = '<i class="fa-solid fa-briefcase platform-icon"></i>';
    } else if (plat.icon === 'fiverr') {
    iconHtml = '<i class="fa-solid fa-mobile-screen-button platform-icon"></i>';
    } else if (plat.icon === 'shopify') {
      iconHtml = '<i class="fa-brands fa-shopify platform-icon"></i>';
    }
    
    const statsHtml = plat.stats
      .map(stat => `
        <div class="platform-stat-item">
          <i class="fa-solid fa-circle-check"></i>
          <span>${stat}</span>
        </div>
      `).join('');
      
    return `
      <div class="platform-card scroll-reveal fade-in-up" style="transition-delay: ${idx * 150}ms">
        <div class="platform-icon-container">
          ${iconHtml}
        </div>
        <h3 class="platform-title">${plat.headline}</h3>
        <p class="platform-desc">${plat.description}</p>
        <div class="platform-stats">
          ${statsHtml}
        </div>
        <p class="platform-testimonial">${plat.testimonial}</p>
      </div>
    `;
  }).join('');
}

function renderWhyChooseMe() {
  const container = document.getElementById('reasons-container');
  if (!container) return;
  
  container.innerHTML = portfolioData.whyChooseMe.map((item, idx) => {
    let iconClass = 'fa-cogs';
    if (item.icon === 'cogs') iconClass = 'fa-gears';
    else if (item.icon === 'layer-group') iconClass = 'fa-layer-group';
    else if (item.icon === 'trophy') iconClass = 'fa-trophy';
    else if (item.icon === 'link') iconClass = 'fa-link';
    else if (item.icon === 'expand-arrows-alt') iconClass = 'fa-arrows-left-right-to-line';
    else if (item.icon === 'chart-bar') iconClass = 'fa-chart-simple';
    
    return `
      <div class="reason-item scroll-reveal fade-in-up" style="transition-delay: ${idx * 80}ms">
        <div class="reason-icon-wrapper">
          <i class="fa-solid ${iconClass}"></i>
        </div>
        <div>
          <h4 class="reason-title">${item.title}</h4>
          <p class="reason-desc">${item.description}</p>
        </div>
      </div>
    `;
  }).join('');
}

function renderSkills() {
  const techContainer = document.getElementById('technical-skills-container');
  const softContainer = document.getElementById('soft-skills-container');
  
  if (techContainer) {
    techContainer.innerHTML = portfolioData.skills.technical.map(skill => `
      <div class="skill-bar-item">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.level}%</span>
        </div>
        <div class="skill-progress-bg">
          <div class="skill-progress-fill" data-level="${skill.level}"></div>
        </div>
      </div>
    `).join('');
  }
  
  if (softContainer) {
    softContainer.innerHTML = portfolioData.skills.soft.map(skill => `
      <span class="skill-badge">✓ ${skill}</span>
    `).join('');
  }
}

function bindContactInfo() {
  const emailLink = document.getElementById('profile-email-link');
  const emailText = document.getElementById('profile-email-text');
  const linkedin = document.getElementById('profile-linkedin-link');
  const upwork = document.getElementById('profile-upwork-link');
  const fiverr = document.getElementById('profile-fiverr-link');
  
  if (emailLink) emailLink.setAttribute('href', `mailto:${portfolioData.profile.email}`);
  if (emailText) emailText.textContent = portfolioData.profile.email;
  if (linkedin) linkedin.setAttribute('href', portfolioData.profile.linkedin);
  if (upwork) upwork.setAttribute('href', portfolioData.profile.upwork);
  if (fiverr) fiverr.setAttribute('href', portfolioData.profile.fiverr);
}

/* 2. Interactive Features & Animation Setups */

function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  
  // Set default theme from system preference or localStorage
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  setTheme(initialTheme);
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    const icon = toggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }
}

function setupMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!menuBtn || !overlay) return;
  
  menuBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  const closeMenu = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMenu();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function setupTestimonialCarousel() {
  const carousel = document.getElementById('testimonials-carousel');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  
  if (!carousel) return;
  
  // Render Testimonial list
  carousel.innerHTML = portfolioData.testimonials.map((t, idx) => {
    const starsHtml = Array.from({ length: t.stars })
      .map(() => '<i class="fa-solid fa-star"></i>')
      .join('');
      
    return `
      <div class="testimonial-card">
        <p class="testimonial-quote">"${t.quote}"</p>
        <div class="testimonial-meta">
          <div>
            <div class="testimonial-author-name">${t.name}</div>
            <div class="testimonial-author-title">${t.title}, <span class="testimonial-author-company">${t.company}</span></div>
          </div>
          <div class="testimonial-stars">
            ${starsHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  const cards = carousel.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;
  let currentIndex = 0;
  let timer = null;
  
  // Create dots
  dotsContainer.innerHTML = Array.from({ length: totalCards })
    .map((_, idx) => `<span class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>`)
    .join('');
    
  const dots = dotsContainer.querySelectorAll('.carousel-dot');
  
  function updateCarousel(index) {
    currentIndex = (index + totalCards) % totalCards;
    
    // Slide transition
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }
  
  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 6000);
  }
  
  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }
  
  prevBtn.addEventListener('click', () => {
    updateCarousel(currentIndex - 1);
    startAutoplay();
  });
  
  nextBtn.addEventListener('click', () => {
    updateCarousel(currentIndex + 1);
    startAutoplay();
  });
  
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'));
      updateCarousel(idx);
      startAutoplay();
    });
  });
  
  // Autoplay initiation
  startAutoplay();
  
  // Hover pauses play
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
}

function setupRoiCalculator() {
  const leadsInput = document.getElementById('leads-input');
  const leadsRange = document.getElementById('leads-range');
  const conversionInput = document.getElementById('conversion-input');
  const conversionRange = document.getElementById('conversion-range');
  const dealValueInput = document.getElementById('deal-value-input');
  const dealValueRange = document.getElementById('deal-value-range');
  
  const projectedClients = document.getElementById('projected-clients');
  const projectedRevenue = document.getElementById('projected-revenue');
  
  if (!leadsInput || !projectedClients || !projectedRevenue) return;
  
  let currentClients = 0;
  let currentRevenue = 0;
  
  // Link Range and Numbers
  bindRangeAndNumber(leadsInput, leadsRange, calculateROI);
  bindRangeAndNumber(conversionInput, conversionRange, calculateROI);
  bindRangeAndNumber(dealValueInput, dealValueRange, calculateROI);
  
  function bindRangeAndNumber(inputEl, rangeEl, callback) {
    inputEl.addEventListener('input', () => {
      let val = parseInt(inputEl.value) || 0;
      val = Math.max(parseInt(inputEl.min), Math.min(parseInt(inputEl.max), val));
      rangeEl.value = val;
      callback();
    });
    
    rangeEl.addEventListener('input', () => {
      inputEl.value = rangeEl.value;
      callback();
    });
  }
  
  function calculateROI() {
    const leads = parseFloat(leadsInput.value) || 0;
    const convRate = parseFloat(conversionInput.value) || 0;
    const dealSize = parseFloat(dealValueInput.value) || 0;
    
    const targetClients = leads * (convRate / 100);
    const targetRevenue = targetClients * dealSize;
    
    // Animate clients change smoothly
    animateValue(projectedClients, currentClients, targetClients, 400, (val) => {
      return val.toFixed(1).replace(/\.0$/, '');
    });
    currentClients = targetClients;
    
    // Animate revenue change smoothly
    animateValue(projectedRevenue, currentRevenue, targetRevenue, 400, (val) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(val);
    });
    currentRevenue = targetRevenue;
  }
  
  // Run initial calculation
  calculateROI();
}

function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const skillFills = document.querySelectorAll('.skill-progress-fill');
  
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Element reveal observer
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Find and animate numbers
        const numbers = entry.target.querySelectorAll('.credibility-num, .result-big-num');
        numbers.forEach(num => animateNumberElement(num));
        
        obs.unobserve(entry.target);
      }
    });
  }, options);
  
  revealElements.forEach(el => observer.observe(el));
  
  // Skill bar animation observer
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const level = fill.getAttribute('data-level');
        fill.style.width = level + '%';
        obs.unobserve(fill);
      }
    });
  }, options);
  
  skillFills.forEach(fill => skillObserver.observe(fill));
  
  // Navigation active highlighting on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let currentActiveId = '';
    const scrollPos = window.scrollY + 160;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActiveId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentActiveId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
}

function setupNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const status = document.getElementById('newsletter-status');
  
  if (!form || !status) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = form.querySelector('input[type="email"]');
    const emailVal = emailInput.value.trim();
    
    if (!emailVal) return;
    
    status.className = 'form-status';
    status.textContent = 'Subscribing...';
    
    // Mock network request
    setTimeout(() => {
      status.className = 'form-status success';
      status.textContent = '✓ Subscribed successfully! Thank you.';
      emailInput.value = '';
      
      // Clear message after 4 seconds
      setTimeout(() => {
        status.textContent = '';
      }, 4000);
    }, 1200);
  });
}

/* 3. Futuristic 2040 Cyber HUD Effects & Animators */

function setupCyberEffects() {
  const cursor = document.getElementById('cyber-cursor');
  const cursorDot = document.getElementById('cyber-cursor-dot');
  
  if (!cursor || !cursorDot) return;
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  let cursorX = mouseX;
  let cursorY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;
  
  // Enable custom cursor styles
  document.documentElement.classList.add('has-custom-cursor');
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Fade in on first movement
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
  
  // Smooth follow tick
  function tick() {
    // Lerp outer ring
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    // Lerp inner dot
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    
    // Interactive drifting energy glows
    const orb1 = document.getElementById('orb-1');
    const orb2 = document.getElementById('orb-2');
    const orb3 = document.getElementById('orb-3');
    
    if (orb1) {
      const xOffset = (mouseX - window.innerWidth / 2) * 0.04;
      const yOffset = (mouseY - window.innerHeight / 2) * 0.04;
      orb1.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }
    if (orb2) {
      const xOffset = (mouseX - window.innerWidth / 2) * -0.03;
      const yOffset = (mouseY - window.innerHeight / 2) * -0.03;
      orb2.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }
    if (orb3) {
      const xOffset = (mouseX - window.innerWidth / 2) * 0.015;
      const yOffset = (mouseY - window.innerHeight / 2) * 0.015;
      orb3.style.transform = `translate(-50%, -50%) translate(${xOffset}px, ${yOffset}px)`;
    }
    
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  
  // Custom cursor hover states
  function updateHoverBindings() {
    const hoverables = document.querySelectorAll('a, button, input, textarea, select, .portfolio-card, [role="button"], .carousel-dot, #prev-testimonial, #next-testimonial, .theme-toggle-btn');
    hoverables.forEach(el => {
      // Remove any existing listeners first to avoid duplication
      el.removeEventListener('mouseenter', addHoverClass);
      el.removeEventListener('mouseleave', removeHoverClass);
      
      el.addEventListener('mouseenter', addHoverClass);
      el.addEventListener('mouseleave', removeHoverClass);
    });
  }
  
  function addHoverClass() {
    cursor.classList.add('hover');
    cursorDot.classList.add('hover');
  }
  
  function removeHoverClass() {
    cursor.classList.remove('hover');
    cursorDot.classList.remove('hover');
  }
  
  // Bind hover states
  updateHoverBindings();
  
  // Re-bind when dynamic grids are updated (services, portfolios, etc.)
  const observer = new MutationObserver(updateHoverBindings);
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Hide custom cursor when mouse leaves document bounds
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
}

function animateValue(element, start, end, duration, formatFn = null) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = progress * (end - start) + start;
    element.textContent = formatFn ? formatFn(value) : Math.floor(value);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function animateNumberElement(el) {
  if (el.classList.contains('animated-done')) return;
  el.classList.add('animated-done');
  
  const text = el.textContent.trim();
  const match = text.match(/^([^\d]*)([\d.]+)([^\d]*)$/);
  if (!match) return;
  
  const prefix = match[1] || '';
  const value = parseFloat(match[2]);
  const suffix = match[3] || '';
  
  animateValue(el, 0, value, 1500, (val) => {
    return prefix + Math.floor(val) + suffix;
  });
}
