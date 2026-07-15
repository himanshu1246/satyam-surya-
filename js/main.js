// configuration placeholders
const FORM_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE"; 
// Note: client-side validation is basic, ensure apps script re-validates server-side

document.addEventListener("DOMContentLoaded", () => {
  const loadTime = Date.now();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
        }
        
        // Account for sticky header
        const headerOffset = document.querySelector('.header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 3D Scroll / Parallax Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-3d').forEach(el => {
    observer.observe(el);
  });

  // Simple hero parallax
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      heroBg.style.transform = `translateY(${scrollPos * 0.4}px)`;
    });
  }

  // Lightbox implementation for gallery and amenities
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox) {
    document.querySelectorAll('.expandable-image, .gallery-item img, .amenity-card img').forEach(img => {
      img.addEventListener('click', () => {
        const src = img.getAttribute('data-fullsrc') || img.getAttribute('src');
        lightboxImg.setAttribute('src', src);
        lightbox.classList.add('active');
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  // Modals for Enquiry Forms
  const modalOverlay = document.getElementById('enquiry-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close');
  const openModalBtns = document.querySelectorAll('.open-enquiry-modal');

  if (modalOverlay) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('active');
      });
    });

    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Form Submission Logic
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const honeypot = form.querySelector('input[name="hp_field"]');
      
      // Simple anti-spam
      if (honeypot && honeypot.value !== "") {
        console.warn("Spam detected.");
        return; // silently ignore
      }

      const timeOnPage = Date.now() - loadTime;
      if (timeOnPage < 3000) {
        console.warn("Form submitted too quickly.");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
      }

      const formData = new FormData(form);

      try {
        if (FORM_ENDPOINT !== "PASTE_YOUR_APPS_SCRIPT_URL_HERE") {
          // Send to Google Apps Script
          const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors', // Cannot read response, but avoids CORS issues on simple forms
            body: formData
          });
          
          alert("Thank you for your enquiry. We will get back to you soon!");
          form.reset();
          if (modalOverlay) modalOverlay.classList.remove('active');
        } else {
          // Dummy behavior when endpoint is not configured
          setTimeout(() => {
            alert("Form endpoint not configured. Data not sent.");
            form.reset();
            if (modalOverlay) modalOverlay.classList.remove('active');
          }, 1000);
        }
      } catch (error) {
        console.error("Form submission error", error);
        alert("An error occurred. Please try again later.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit";
        }
      }
    });
  });

  // Carousel Controls
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');

    if (track && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        const slideWidth = track.querySelector('.carousel-slide').offsetWidth + 20; // + gap
        track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        const slideWidth = track.querySelector('.carousel-slide').offsetWidth + 20; // + gap
        track.scrollBy({ left: slideWidth, behavior: 'smooth' });
      });
    }
  });
});
