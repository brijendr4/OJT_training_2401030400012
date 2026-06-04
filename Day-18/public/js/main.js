document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirm-password');
  const termsCheckbox = document.getElementById('terms');
  
  const togglePasswordBtn = document.getElementById('toggle-password');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const notificationContainer = document.getElementById('notification-container');
  
  // Password Strength elements
  const strengthBar = document.getElementById('strength-bar');
  const strengthLabel = document.getElementById('strength-label');
  const chkLength = document.getElementById('chk-length');
  const chkCase = document.getElementById('chk-case');
  const chkNumber = document.getElementById('chk-number');
  const chkSymbol = document.getElementById('chk-symbol');

  // Toggle Password Visibility
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    confirmInput.setAttribute('type', isPassword ? 'text' : 'password');
    
    // Toggle Eye SVG icons
    const eyeOpen = togglePasswordBtn.querySelector('.eye-open');
    const eyeClosed = togglePasswordBtn.querySelector('.eye-closed');
    if (isPassword) {
      eyeOpen.classList.add('hidden');
      eyeClosed.classList.remove('hidden');
    } else {
      eyeOpen.classList.remove('hidden');
      eyeClosed.classList.add('hidden');
    }
  });

  // Password Validation Check
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    
    // Criteria checks
    const hasLength = val.length >= 6;
    const hasCase = /[a-z]/.test(val) && /[A-Z]/.test(val);
    const hasNumber = /\d/.test(val);
    const hasSymbol = /[-+!@#$%^&*(),.?":{}|<>]/.test(val);
    
    // Update checklist UI
    updateChecklistItem(chkLength, hasLength);
    updateChecklistItem(chkCase, hasCase);
    updateChecklistItem(chkNumber, hasNumber);
    updateChecklistItem(chkSymbol, hasSymbol);
    
    // Calculate Strength Score (out of 5)
    let score = 0;
    if (val.length > 0) {
      if (hasLength) score++;
      if (val.length >= 10) score++;
      if (hasCase) score++;
      if (hasNumber) score++;
      if (hasSymbol) score++;
    }
    
    // Update strength bar UI
    if (val.length === 0) {
      strengthBar.style.width = '0%';
      strengthBar.style.backgroundColor = 'transparent';
      strengthLabel.textContent = 'Password Strength: None';
      strengthLabel.style.color = 'var(--text-muted)';
    } else if (score <= 1) {
      strengthBar.style.width = '20%';
      strengthBar.style.backgroundColor = 'var(--error)';
      strengthLabel.textContent = 'Password Strength: Weak ⚠️';
      strengthLabel.style.color = 'var(--error)';
    } else if (score <= 3) {
      strengthBar.style.width = '60%';
      strengthBar.style.backgroundColor = 'var(--warning)';
      strengthLabel.textContent = 'Password Strength: Medium ⚡';
      strengthLabel.style.color = 'var(--warning)';
    } else {
      strengthBar.style.width = '100%';
      strengthBar.style.backgroundColor = 'var(--success)';
      strengthLabel.textContent = 'Password Strength: Strong 🔥';
      strengthLabel.style.color = 'var(--success)';
    }
  });

  function updateChecklistItem(element, isValid) {
    if (isValid) {
      element.classList.add('valid');
    } else {
      element.classList.remove('valid');
    }
  }

  // Live Input Error Clear
  [nameInput, emailInput, passwordInput, confirmInput].forEach(input => {
    input.addEventListener('input', () => {
      clearError(input);
    });
  });
  
  termsCheckbox.addEventListener('change', () => {
    if (termsCheckbox.checked) {
      clearError(termsCheckbox);
    }
  });

  // Validation functions
  function showError(input, message) {
    const group = input.closest('.input-group') || input.closest('.checkbox-group');
    const errorSpan = group.querySelector('.error-msg');
    const wrapper = group.querySelector('.input-wrapper');
    
    if (wrapper) wrapper.classList.add('error');
    errorSpan.textContent = message;
    errorSpan.classList.add('visible');
    
    // Trigger shake animation
    const animationTarget = wrapper || group;
    if (animationTarget) {
      animationTarget.classList.remove('shake');
      void animationTarget.offsetWidth; // Trigger reflow
      animationTarget.classList.add('shake');
    }
  }

  function clearError(input) {
    const group = input.closest('.input-group') || input.closest('.checkbox-group');
    const errorSpan = group.querySelector('.error-msg');
    const wrapper = group.querySelector('.input-wrapper');
    
    if (wrapper) wrapper.classList.remove('error');
    errorSpan.classList.remove('visible');
    errorSpan.textContent = '';
  }

  // Toast System
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    if (type === 'success') {
      icon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    } else {
      icon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      `;
    }
    
    const text = document.createElement('span');
    text.className = 'toast-message';
    text.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(text);
    notificationContainer.appendChild(toast);
    
    // Auto remove toast
    setTimeout(() => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }, 4000);
  }

  // Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // 1. Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Full Name is required.');
      isValid = false;
    }
    
    // 2. Validate Email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email Address is required.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim().toLowerCase())) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    }
    
    // 3. Validate Password
    if (!passwordInput.value) {
      showError(passwordInput, 'Password is required.');
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      showError(passwordInput, 'Password must be at least 6 characters long.');
      isValid = false;
    }
    
    // 4. Validate Confirm Password
    if (!confirmInput.value) {
      showError(confirmInput, 'Confirm password is required.');
      isValid = false;
    } else if (confirmInput.value !== passwordInput.value) {
      showError(confirmInput, 'Passwords do not match.');
      isValid = false;
    }
    
    // 5. Validate Terms
    if (!termsCheckbox.checked) {
      showError(termsCheckbox, 'You must accept the Terms and Conditions.');
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Submit data
    try {
      // Disable button & show spinner
      submitBtn.disabled = true;
      btnText.textContent = 'Registering...';
      btnSpinner.classList.remove('hidden');
      
      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        password: passwordInput.value
      };
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        showToast(data.message, 'success');
        form.reset();
        
        // Reset strength bar & checkmarks manually
        strengthBar.style.width = '0%';
        strengthBar.style.backgroundColor = 'transparent';
        strengthLabel.textContent = 'Password Strength: None';
        strengthLabel.style.color = 'var(--text-muted)';
        
        [chkLength, chkCase, chkNumber, chkSymbol].forEach(chk => {
          chk.classList.remove('valid');
        });
      } else {
        showToast(data.message || 'Registration failed.', 'error');
        if (data.message && data.message.toLowerCase().includes('email')) {
          showError(emailInput, data.message);
        }
      }
    } catch (err) {
      console.error(err);
      showToast('Network error, please check connection.', 'error');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      btnText.textContent = 'Create Account';
      btnSpinner.classList.add('hidden');
    }
  });
});
