document.addEventListener('DOMContentLoaded', () => {
            const signUpForm = document.getElementById('signUpForm');
            const fullnameInput = document.getElementById('fullname');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const passwordToggle = document.getElementById('passwordToggle');
            const successMessage = document.getElementById('successMessage');
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');

            // 1. Password Visibility Switcher
            passwordToggle.addEventListener('click', () => {
                passwordToggle.classList.toggle('show-pass');
                const isPassword = passwordInput.getAttribute('type') === 'password';
                passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            });

            // Email Regex Pattern Helper
            const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            // 2. Submission Interactivity Flow
            signUpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let isValid = true;
                nameError.textContent = '';
                emailError.textContent = '';
                passwordError.textContent = '';

                // Input Field Validation Rules
                if (!fullnameInput.value.trim()) {
                    nameError.textContent = 'Full name is required.';
                    isValid = false;
                }

                if (!emailInput.value.trim()) {
                    emailError.textContent = 'Email address is required.';
                    isValid = false;
                } else if (!validateEmail(emailInput.value.trim())) {
                    emailError.textContent = 'Please enter a valid email address.';
                    isValid = false;
                }

                if (!passwordInput.value.trim()) {
                    passwordError.textContent = 'Password is required.';
                    isValid = false;
                } else if (passwordInput.value.length < 6) {
                    passwordError.textContent = 'Password must be at least 6 characters.';
                    isValid = false;
                }

                if (!isValid) return;

                // Enter interactive processing layout state
                const submitBtn = signUpForm.querySelector('.neu-button');
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;

                // Emulate cloud registration connection processing time
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    // Reveal the slide success frame cover 
                    successMessage.classList.add('show');
                }, 2000);
            });

            // Strip functional form validation errors instantly during character typing
            fullnameInput.addEventListener('input', () => { if(fullnameInput.value) nameError.textContent = ''; });
            emailInput.addEventListener('input', () => { if(emailInput.value) emailError.textContent = ''; });
            passwordInput.addEventListener('input', () => { if(passwordInput.value) passwordError.textContent = ''; });
        });