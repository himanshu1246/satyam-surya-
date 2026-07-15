// ==========================================
// CONFIGURATION
// ==========================================
// IMPORTANT: Update this with your Google Apps Script Web App URL
const FORM_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    initLoader();
    initSliders();
    initParallax();
    initFormHandling();
    initSmoothScroll();
    if (typeof GLightbox !== 'undefined') {
        GLightbox({ selector: '.glightbox' });
    }
});

// ==========================================
// LOADER
// ==========================================
function initLoader() {
    const loader = document.querySelector(".site--loader-wrapper");
    if (loader) {
        setTimeout(() => {
            loader.classList.remove("active");
            setTimeout(() => {
                loader.style.display = "none";
                document.documentElement.classList.add("pg-loaded");
            }, 500);
        }, 1000); // Give it a sec to display
    } else {
        document.documentElement.classList.add("pg-loaded");
    }
}

// ==========================================
// SLIDERS (Glide.js)
// ==========================================
function initSliders() {
    if (typeof Glide !== 'undefined') {
        const mainSliderEl = document.getElementById("mainSlider");
        if (mainSliderEl) {
            new Glide(mainSliderEl, {
                type: "carousel",
                autoplay: 3000,
                autoplay: 3000,
                hoverpause: false,
                animationDuration: 1000,
                gap: 0
            }).mount();
        }

                const planSliderEl = document.getElementById("plan-slider");
        if (planSliderEl) {
            new Glide(planSliderEl, {
                type: "carousel",
                autoplay: 3000,
                perView: window.innerWidth <= 800 ? 1 : window.innerWidth <= 1024 ? 2 : 2, gap: 20
            }).mount();
        }

        const priceSliderEl = document.getElementById("price-slider");
        if (priceSliderEl) {
            new Glide(priceSliderEl, {
                type: "carousel",
                autoplay: 3000,
                perView: window.innerWidth <= 800 ? 1 : window.innerWidth <= 1024 ? 2 : 3, gap: 20
            }).mount();
        }

        const gallerySliderEl = document.getElementById("gallery-galSider");
        if (gallerySliderEl) {
            new Glide(gallerySliderEl, {
                type: "carousel",
                autoplay: 3000,
                perView: window.innerWidth <= 800 ? 1 : window.innerWidth <= 1024 ? 2 : 3, gap: 20
            }).mount();
        }

        const amenitiesSliderEl = document.querySelector(".amenities-slider");
        if (amenitiesSliderEl) {
            new Glide(amenitiesSliderEl, {
                type: "carousel",
                autoplay: 3000,
                perView: window.innerWidth <= 800 ? 1 : window.innerWidth <= 1024 ? 2 : 4, gap: 20
            }).mount();
        }
    }
}

// ==========================================
// SCROLL-DRIVEN 3D PARALLAX
// ==========================================
function initParallax() {
    // We add a class .parallax-element to sections/elements we want to animate
    const elements = document.querySelectorAll(".parallax-element");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("parallax-visible");
            } else {
                // Optional: remove if you want them to re-animate on scroll up/down
                // entry.target.classList.remove("parallax-visible");
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));

    // Dynamic scroll tilt effect on the hero banner
    const bannerImg = document.querySelector(".banner .glide__slides");
    if (bannerImg) {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            // Limit the effect so it doesn't flip entirely
            const rotation = Math.min(scrollY / 100, 5); 
            const yOffset = scrollY * 0.3; // Slower scroll for parallax layer
            bannerImg.style.transform = `translateY(${yOffset}px) rotateX(${rotation}deg)`;
        });
    }
}

// ==========================================
// FORM SUBMISSION (Apps Script POST)
// ==========================================
function initFormHandling() {
    const forms = document.querySelectorAll("form.enq-form");
    forms.forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Honeypot check (prevent bots that fill hidden fields)
            const honeypot = form.querySelector('input[name="website_url"]');
            if (honeypot && honeypot.value !== "") {
                console.log("Bot detected!");
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Submitting...";
            submitBtn.disabled = true;

            const formData = new FormData(form);
            
            // Client side validation can be bypassed, server must validate too
            fetch(FORM_ENDPOINT, {
                method: "POST",
                body: formData,
                mode: "no-cors" // no-cors hides response details but successfully posts
            })
            .then(() => {
                alert("Thank you! Your inquiry has been submitted."); if(form.querySelector('input[name="form_name"]').value.includes("Brochure")) { window.open("./assets/SATYAM%20SURYA%20MANHATTAN%20brochure.pdf", "_blank"); }
                form.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                
                            // Unlock plans on successful form submit
            const planLock = document.getElementById('planLockedWrapper');
            if (planLock) {
                planLock.classList.add('unlocked');
            }
                // Hide modal if form was inside one
                const modalEl = form.closest('.modal');
                if (modalEl) {
                    const modalInstance = bootstrap.Modal.getInstance(modalEl);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                }
            })
            .catch(error => {
                console.error("Error submitting form", error);
                alert("There was an error. Please try again or call us directly.");
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        });

        // Ensure button is enabled when checkbox is checked
        const consentCheck = form.querySelector('input[type="checkbox"]');
        if (consentCheck) {
            const btn = form.querySelector('button[type="submit"]');
            consentCheck.addEventListener('change', function() {
                btn.disabled = !this.checked;
            });
            // initial state
            btn.disabled = !consentCheck.checked;
        }
    });
}

// ==========================================
// SMOOTH SCROLL ANCHORS
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });

                // Collapse mobile nav if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });
}

// Update form-name based on clicked button
document.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget; 
    const formName = button.getAttribute('data-form-name');
    const modalTitle = button.getAttribute('data-formtitle');
    const formNameInput = document.getElementById('form-name');
    
    if (formNameInput && formName) {
        formNameInput.value = formName;
    }
    
    const modalTitleEl = document.querySelector('#enqPopup .modal-title');
    if (modalTitleEl && modalTitle) {
        modalTitleEl.innerHTML = modalTitle;
    }
});


