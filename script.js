(function () {
  'use strict';

  const header = document.querySelector('#site-header');
  const nav = document.querySelector('#primary-navigation');
  const toggle = document.querySelector('.nav-toggle');
  const menuLinks = Array.from(document.querySelectorAll('.primary-nav a'));
  const navLinks = menuLinks.filter((link) => link.getAttribute('href').startsWith('#'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Directory routes do not resolve when index.html is opened directly from
  // disk. Preserve clean routes on a server while providing a deterministic
  // local-file preview destination.
  if (window.location.protocol === 'file:') {
    document.querySelectorAll('[data-local-page]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = new URL(link.dataset.localPage, document.baseURI).href;
      });
    });
  }

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Close navigation' : 'Open navigation';
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });
  }

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 32);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.querySelector('#inquiry-form');
  if (form) {
    const emailInput = form.querySelector('input[name="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const organizationInput = form.querySelector('input[name="organization"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const honeypotInput = form.querySelector('input[name="_honey"]');
    const status = document.querySelector('#form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const defaultButtonLabel = submitButton ? submitButton.innerHTML : '';
    let isSubmitting = false;

    function showFormStatus(message, type) {
      if (!status) return;
      status.textContent = message;
      status.hidden = false;
      status.className = `form-status is-${type}`;
      status.setAttribute('role', type === 'error' ? 'alert' : 'status');
    }

    function clearFormStatus() {
      if (!status) return;
      status.textContent = '';
      status.hidden = true;
      status.className = 'form-status';
      status.setAttribute('role', 'status');
    }

    function validateEmail() {
      if (!emailInput) return;
      emailInput.setCustomValidity('');
      if (emailInput.value && emailInput.validity.typeMismatch) {
        emailInput.setCustomValidity('Enter a valid email address.');
      }
    }

    function validationMessage() {
      const category = form.querySelector('input[name="inquiry-category"]:checked');
      if (!category) return 'Select an inquiry type before sending your request.';
      if (nameInput && !nameInput.value.trim()) return 'Enter your full name before sending your request.';
      if (emailInput && !emailInput.value.trim()) return 'Enter your work email before sending your request.';
      if (emailInput && !emailInput.validity.valid) return 'Enter a valid email address.';
      if (messageInput && !messageInput.value.trim()) return 'Add a message before sending your request.';
      return 'Complete the required fields before sending your request.';
    }

    function setSubmitting(submitting) {
      if (!submitButton) return;
      submitButton.disabled = submitting;
      submitButton.setAttribute('aria-disabled', String(submitting));
      submitButton.innerHTML = submitting ? 'Sending…' : defaultButtonLabel;
    }

    const inquiry = new URLSearchParams(window.location.search).get('inquiry');
    if (inquiry === 'eva') {
      const evaCategory = form.querySelector('input[value="EVA clinical or research partnership"]');
      if (evaCategory) evaCategory.checked = true;
    }

    if (emailInput) {
      emailInput.addEventListener('input', validateEmail);
      emailInput.addEventListener('blur', validateEmail);
    }

    form.addEventListener('input', clearFormStatus);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      validateEmail();

      if (isSubmitting) {
        showFormStatus('Your request is already being sent. Please wait.', 'error');
        return;
      }

      if (form.dataset.submitted === 'true') {
        showFormStatus('Your request has already been sent. Refresh the page to send another inquiry.', 'success');
        return;
      }

      if (!form.checkValidity()) {
        showFormStatus(validationMessage(), 'error');
        form.reportValidity();
        return;
      }

      const category = form.querySelector('input[name="inquiry-category"]:checked');
      const fullName = nameInput.value.trim().replace(/[\r\n]+/g, ' ');
      const organization = organizationInput.value.trim().replace(/[\r\n]+/g, ' ');
      const subject = organization
        ? `${fullName} - ${organization} - Website Request`
        : `${fullName} - Website Request`;
      const submission = {
        'Full Name': fullName,
        Organization: organization || 'Not provided',
        Email: emailInput.value.trim(),
        'Inquiry Category': category.value,
        Message: messageInput.value.trim(),
        _subject: subject,
        _replyto: emailInput.value.trim(),
        _template: 'table',
        _captcha: 'false',
        _honey: honeypotInput ? honeypotInput.value : ''
      };

      isSubmitting = true;
      setSubmitting(true);
      clearFormStatus();

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(submission)
        });
        const result = await response.json().catch(() => null);
        const accepted = response.ok && (!result || result.success === undefined || result.success === true || result.success === 'true');
        if (!accepted) throw new Error('Submission was not accepted.');

        form.dataset.submitted = 'true';
        form.reset();
        showFormStatus('Thank you — your request has been sent. WE-Sensing will review it and follow up.', 'success');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.setAttribute('aria-disabled', 'true');
          submitButton.textContent = 'Inquiry sent';
        }
      } catch (error) {
        showFormStatus('We could not send your request. Please try again shortly.', 'error');
        setSubmitting(false);
      } finally {
        isSubmitting = false;
      }
    });
  }
})();
