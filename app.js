// Elite Gents Tailoring - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animated counters
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (target > 1000) {
                        counter.textContent = Math.ceil(current).toLocaleString() + '+';
                    } else {
                        counter.textContent = Math.ceil(current) + '+';
                    }
                    setTimeout(updateCounter, 30);
                } else {
                    if (target > 1000) {
                        counter.textContent = target.toLocaleString() + '+';
                    } else {
                        counter.textContent = target + '+';
                    }
                }
            };
            
            updateCounter();
        });
    }

    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Testimonial carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i === index) {
                slide.classList.add('active');
            } else if (i < index) {
                slide.classList.add('prev');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-rotate testimonials
    setInterval(nextSlide, 5000);

    // Booking Modal Function
    function createBookingModal() {
        const modal = document.createElement('div');
        modal.className = 'lightbox';
        modal.innerHTML = `
            <div class="lightbox-content" style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px; width: 90vw;">
                <span class="lightbox-close" style="color: #1a237e; top: 10px; right: 15px; cursor: pointer;">&times;</span>
                <h3 style="color: #1a237e; margin-bottom: 1rem; text-align: center;">Book Appointment</h3>
                <form id="booking-form">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Preferred Date</label>
                        <input type="date" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Service Required</label>
                        <select class="form-control" required>
                            <option value="">Select Service</option>
                            <option value="custom-suits">Custom Suits</option>
                            <option value="business-shirts">Business Shirts</option>
                            <option value="formal-trousers">Formal Trousers</option>
                            <option value="sherwanis">Sherwanis</option>
                            <option value="alterations">Alterations</option>
                            <option value="wedding-collection">Wedding Collection</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn--primary btn--full-width">Book Appointment</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.classList.add('active');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Handle modal close
        const closeBtn = modal.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });

        // Handle booking form submission
        const bookingForm = modal.querySelector('#booking-form');
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Booking...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Appointment booked successfully! We will call you to confirm the details.');
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 300);
            }, 2000);
        });
    }

    // Book appointment buttons
    const bookButtons = document.querySelectorAll('.cta-btn, #book-now-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            createBookingModal();
        });
    });

    // Add book appointment buttons to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const bookBtn = document.createElement('button');
        bookBtn.textContent = 'Book Now';
        bookBtn.className = 'btn btn--primary';
        bookBtn.style.marginTop = '1rem';
        bookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            createBookingModal();
        });
        card.appendChild(bookBtn);
    });

    // Contact form handling with feedback
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = {};
        for (let [key, value] of formData.entries()) {
            formValues[key] = value;
        }

        // Show feedback
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call with success message
        setTimeout(() => {
            // Create success message
            const successMsg = document.createElement('div');
            successMsg.innerHTML = `
                <div style="background: #4caf50; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0; text-align: center;">
                    ✓ Thank you for your message! We will get back to you soon.
                </div>
            `;
            this.parentNode.insertBefore(successMsg, this);
            
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        }, 2000);
    });

    // Service Calculator
    function createServiceCalculator() {
        const calculatorBtn = document.createElement('button');
        calculatorBtn.textContent = '🧮 Service Calculator';
        calculatorBtn.className = 'btn btn--primary';
        calculatorBtn.style.position = 'fixed';
        calculatorBtn.style.bottom = '20px';
        calculatorBtn.style.right = '20px';
        calculatorBtn.style.zIndex = '1000';
        calculatorBtn.style.borderRadius = '50px';
        calculatorBtn.style.boxShadow = '0 4px 15px rgba(26, 35, 126, 0.3)';
        
        calculatorBtn.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'lightbox';
            modal.innerHTML = `
                <div class="lightbox-content" style="background: white; padding: 2rem; border-radius: 12px; max-width: 400px; width: 90vw;">
                    <span class="lightbox-close" style="color: #1a237e; top: 10px; right: 15px; cursor: pointer;">&times;</span>
                    <h3 style="color: #1a237e; margin-bottom: 1rem; text-align: center;">Service Calculator</h3>
                    <div class="form-group">
                        <label class="form-label">Select Service</label>
                        <select class="form-control" id="calc-service">
                            <option value="">Choose a service</option>
                            <option value="15000-35000">Custom Suits (₹15,000 - ₹35,000)</option>
                            <option value="1000-400">Business Shirts (₹1000 - ₹400)</option>
                            <option value="500-2000">Formal Trousers (₹500 - ₹2,000)</option>
                            <option value="12000-25000">Sherwanis (₹12,000 - ₹25,000)</option>
                            <option value="300-1500">Alterations (₹50 - ₹500)</option>
                            <option value="20000-50000">Wedding Collection (₹20,000 - ₹50,000)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Quantity</label>
                        <input type="number" class="form-control" id="calc-quantity" min="1" value="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Fabric Type</label>
                        <select class="form-control" id="calc-fabric">
                            <option value="1">Standard (+0%)</option>
                            <option value="1.5">Premium (+30%)</option>
                            <option value="2">Luxury (+80%)</option>
                        </select>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: #f0f8ff; border-radius: 8px; border: 2px solid #1a237e;">
                        <h4 style="margin: 0; color: #1a237e;">Estimated Cost:</h4>
                        <p id="calc-result" style="font-size: 1.5rem; font-weight: bold; color: #ffd700; margin: 0.5rem 0 0 0;">Select service to calculate</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.classList.add('active');
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            const closeBtn = modal.querySelector('.lightbox-close');
            const serviceSelect = modal.querySelector('#calc-service');
            const quantityInput = modal.querySelector('#calc-quantity');
            const fabricSelect = modal.querySelector('#calc-fabric');
            const result = modal.querySelector('#calc-result');

            function calculateCost() {
                const service = serviceSelect.value;
                const quantity = parseInt(quantityInput.value) || 1;
                const fabricMultiplier = parseFloat(fabricSelect.value);

                if (service) {
                    const [min, max] = service.split('-').map(num => parseInt(num));
                    const avgPrice = (min + max) / 2;
                    const totalCost = avgPrice * quantity * fabricMultiplier;
                    result.textContent = `₹${totalCost.toLocaleString()} (approx.)`;
                } else {
                    result.textContent = 'Select service to calculate';
                }
            }

            serviceSelect.addEventListener('change', calculateCost);
            quantityInput.addEventListener('input', calculateCost);
            fabricSelect.addEventListener('change', calculateCost);

            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }, 300);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        });

        document.body.appendChild(calculatorBtn);
    }

    // Initialize service calculator
    createServiceCalculator();

    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .gallery-item, .pricing-card, .contact-item, .stat-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('scroll-reveal');
                element.classList.add('revealed');
            }
        });
    }

    // Intersection Observer for better scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate counters when stats section is visible
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('.service-card, .gallery-item, .pricing-card, .testimonial-carousel, .stats, .about-content');
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Parallax effect for hero section (lightweight)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Loading animation
    window.addEventListener('load', function() {
        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Add interactive micro-animations
    const cards = document.querySelectorAll('.service-card, .pricing-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize scroll position
    window.scrollTo(0, 0);

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const activeModals = document.querySelectorAll('.lightbox.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                    document.body.style.overflow = 'auto';
                }, 300);
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        // Remove any old messages before showing a new one
        const oldMsg = document.querySelector('.form-message');
        if (oldMsg) oldMsg.remove();

        const messageBox = document.createElement('div');
        messageBox.classList.add('form-message');
        messageBox.style.marginTop = "15px";
        messageBox.style.fontWeight = "bold";

        if (response.ok) {
          messageBox.textContent = "✅ Your message has been successfully submitted!";
          messageBox.style.color = "#28a745";
          contactForm.reset();
        } else {
          const data = await response.json();
          if (data.errors && data.errors.length > 0) {
            messageBox.textContent = "❌ " + data.errors.map(err => err.message).join(", ");
          } else {
            messageBox.textContent = "❌ Something went wrong. Please try again.";
          }
          messageBox.style.color = "#dc3545";
        }

        contactForm.appendChild(messageBox);
        setTimeout(() => messageBox.remove(), 5000);

      } catch (error) {
        alert("⚠️ Network error. Please check your internet connection.");
      }
    });
  }
});

