/**
 * OptiChains Consulting – Main Script
 * ─────────────────────────────────────
 * Features
 *  1. Mobile navigation toggle
 *  2. Active nav link highlighting on scroll
 *  3. Reveal-on-scroll animation (IntersectionObserver)
 *  4. Contact form intercept with validation
 *  5. Footer copyright year
 */

(function () {
  'use strict';

  /* ── Helpers ── */

  /**
   * Query a single element; returns null if not found (no throws).
   * @param {string} selector
   * @param {Element|Document} [scope=document]
   * @returns {Element|null}
   */
  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  /**
   * Query all elements; returns an empty NodeList if none found.
   * @param {string} selector
   * @param {Element|Document} [scope=document]
   * @returns {NodeList}
   */
  function qsa(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  }


  /* ══════════════════════════════════════════════
     1. MOBILE NAVIGATION TOGGLE
  ══════════════════════════════════════════════ */
  var navToggle = qs('#nav-toggle');
  var primaryNav = qs('#primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      primaryNav.classList.toggle('is-open', !isExpanded);
    });

    /* Close nav when a link is clicked (single-page navigation) */
    qsa('a', primaryNav).forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      });
    });

    /* Close nav when clicking outside */
    document.addEventListener('click', function (e) {
      if (
        primaryNav.classList.contains('is-open') &&
        !primaryNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      }
    });

    /* Close nav on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
        navToggle.focus();
      }
    });
  }


  /* ══════════════════════════════════════════════
     2. ACTIVE NAV LINK ON SCROLL
  ══════════════════════════════════════════════ */
  var sections = qsa('main section[id]');
  var navLinks = qsa('.primary-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              var isActive = link.getAttribute('href') === '#' + id;
              link.classList.toggle('is-active', isActive);
              link.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (sec) { sectionObserver.observe(sec); });
  }


  /* ══════════════════════════════════════════════
     3. REVEAL-ON-SCROLL ANIMATION
  ══════════════════════════════════════════════ */
  var revealElements = qsa('.reveal');

  if (revealElements.length) {
    /* Respect user's motion preference */
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      /* Skip animation – make all elements immediately visible */
      revealElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      revealElements.forEach(function (el) { revealObserver.observe(el); });
    }
  }


  /* ══════════════════════════════════════════════
     4. CONTACT FORM INTERCEPT
  ══════════════════════════════════════════════ */
  var contactForm = qs('#contact-form');
  var formStatus  = qs('#form-status');

  if (contactForm && formStatus) {

    /**
     * Show a status message inside the form.
     * @param {string} message - Text to display.
     * @param {'is-success'|'is-info'|'is-error'} type - CSS class modifier.
     */
    function showStatus(message, type) {
      formStatus.textContent = message;
      formStatus.className = 'form-status ' + type;
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Mark a field as invalid and set its accessible description.
     * @param {HTMLElement} field
     * @param {string} message
     */
    function markInvalid(field, message) {
      field.classList.add('is-invalid');
      field.setAttribute('aria-describedby', field.id + '-error');

      /* Create or update error message element */
      var errorEl = qs('#' + field.id + '-error');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.id = field.id + '-error';
        errorEl.setAttribute('role', 'alert');
        errorEl.style.cssText = 'font-size:.8rem;color:#dc2626;margin-top:2px;';
        field.insertAdjacentElement('afterend', errorEl);
      }
      errorEl.textContent = message;
    }

    /** Clear validation state from a field. */
    function clearInvalid(field) {
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-describedby');
      var errorEl = qs('#' + field.id + '-error');
      if (errorEl) errorEl.textContent = '';
    }

    /** Clear all validation state */
    function clearAllErrors() {
      qsa('.is-invalid', contactForm).forEach(function (f) { clearInvalid(f); });
      formStatus.className = 'form-status';
      formStatus.textContent = '';
    }

    /* Live validation: clear error once user starts correcting a field */
    qsa('input, textarea', contactForm).forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) clearInvalid(field);
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAllErrors();

      var nameField    = qs('#cf-name');
      var emailField   = qs('#cf-email');
      var messageField = qs('#cf-message');

      var valid = true;

      if (!nameField.value.trim()) {
        markInvalid(nameField, 'Please enter your full name.');
        valid = false;
      }

      var emailVal = emailField.value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        markInvalid(emailField, 'Please enter your email address.');
        valid = false;
      } else if (!emailPattern.test(emailVal)) {
        markInvalid(emailField, 'Please enter a valid email address.');
        valid = false;
      }

      if (!messageField.value.trim()) {
        markInvalid(messageField, 'Please enter a message.');
        valid = false;
      }

      if (!valid) {
        showStatus('Please correct the errors above and try again.', 'is-error');
        /* Move focus to first invalid field */
        var firstInvalid = qs('.is-invalid', contactForm);
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      /* Disable submit button while request is in-flight */
      var submitBtn    = contactForm.querySelector('button[type="submit"]');
      var submitBtnOriginalText = submitBtn ? submitBtn.textContent : null;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      /*
       * Submit form data via Formspree, which forwards submissions to
       * info@optichainsconsulting.com.
       *
       * The legacy endpoint below works without a registered Formspree
       * account – the first submission will trigger an activation email
       * from Formspree to confirm the recipient address.
       *
       * Once you have a registered Formspree account you can replace this
       * URL with your form-specific endpoint:
       *   https://formspree.io/f/<your-form-id>
       */
      fetch('https://formspree.io/info@optichainsconsulting.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      })
        .then(function (response) {
          if (response.ok) {
            showStatus('✓ Thank you for your message! We will be in touch shortly.', 'is-success');
            contactForm.reset();
          } else {
            return response.json().then(function (data) {
              var msg = (data && data.errors && data.errors.length)
                ? data.errors.map(function (err) { return err.message; }).join(', ')
                : 'Something went wrong. Please try again or email us directly at info@optichainsconsulting.com.';
              showStatus(msg, 'is-error');
            });
          }
        })
        .catch(function () {
          showStatus(
            'Unable to send your message. Please check your connection or email us directly at info@optichainsconsulting.com.',
            'is-error'
          );
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtnOriginalText;
          }
        });
    });
  }


  /* ══════════════════════════════════════════════
     5. FOOTER COPYRIGHT YEAR
  ══════════════════════════════════════════════ */
  var yearEl = qs('#footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

}());
