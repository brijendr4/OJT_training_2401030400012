document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('loginForm');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const passwordToggle = document.getElementById('passwordToggle');
            const successMessage = document.getElementById('successMessage');
            
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
           //password switcher
            passwordToggle.addEventListener('click', () => {
                passwordToggle.classList.toggle('show-pass');
                const isPassword = passwordInput.getAttribute('type') === 'password';
                passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            });

        
            const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            // Submission Flow
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let isValid = true;
                emailError.textContent = '';
                passwordError.textContent = '';

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

                const submitBtn = loginForm.querySelector('.neu-button');
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;

                
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    successMessage.classList.add('show');
                }, 2000);
            });

            
            emailInput.addEventListener('input', () => { if(emailInput.value) emailError.textContent = ''; });
            passwordInput.addEventListener('input', () => { if(passwordInput.value) passwordError.textContent = ''; });
        });