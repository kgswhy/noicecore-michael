document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Product Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                productCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form Validation
    const membershipForm = document.getElementById('membershipForm');
    const submitBtn = document.getElementById('submitBtn');
    
    console.log('Form element found:', membershipForm);
    console.log('Submit button found:', submitBtn);
    
    function validateForm(e) {
        console.log('Form validation triggered');
        if (e) e.preventDefault();
        
        // Clear all previous error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
            message.style.display = 'none';
        });
        
        let isValid = true;
        
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        const dobInput = document.getElementById('dob');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsCheckbox = document.getElementById('termsAgree');
        
        // Validate name (1st validation)
        if (fullNameInput && fullNameInput.value.trim() === '') {
            console.log('Name validation failed: empty');
            document.getElementById('nameError').textContent = 'Please enter your full name';
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        } else if (fullNameInput && fullNameInput.value.trim().length < 3) {
            console.log('Name validation failed: too short');
            document.getElementById('nameError').textContent = 'Name must be at least 3 characters long';
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }
        
        // Validate email (2nd validation)
        if (emailInput && emailInput.value.trim() === '') {
            console.log('Email validation failed: empty');
            document.getElementById('emailError').textContent = 'Please enter your email address';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else if (emailInput && !isValidEmail(emailInput.value.trim())) {
            console.log('Email validation failed: invalid format');
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        // Validate gender (3rd validation)
        let genderSelected = false;
        if (genderInputs) {
            genderInputs.forEach(input => {
                if (input.checked) {
                    genderSelected = true;
                }
            });
            
            if (!genderSelected) {
                console.log('Gender validation failed: none selected');
                document.getElementById('genderError').textContent = 'Please select your gender';
                document.getElementById('genderError').style.display = 'block';
                isValid = false;
            }
        }
        
        // Validate date of birth (4th validation)
        if (dobInput && dobInput.value === '') {
            console.log('DOB validation failed: empty');
            document.getElementById('dobError').textContent = 'Please enter your date of birth';
            document.getElementById('dobError').style.display = 'block';
            isValid = false;
        } else if (dobInput && !isValidAge(dobInput.value)) {
            console.log('DOB validation failed: under 18');
            document.getElementById('dobError').textContent = 'You must be at least 18 years old';
            document.getElementById('dobError').style.display = 'block';
            isValid = false;
        }
        
        // Validate password (5th validation)
        if (passwordInput && passwordInput.value === '') {
            console.log('Password validation failed: empty');
            document.getElementById('passwordError').textContent = 'Please enter a password';
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        } else if (passwordInput && passwordInput.value.length < 8) {
            console.log('Password validation failed: too short');
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }
        
        // Validate confirm password
        if (confirmPasswordInput && confirmPasswordInput.value === '') {
            console.log('Confirm password validation failed: empty');
            document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        } else if (confirmPasswordInput && passwordInput && confirmPasswordInput.value !== passwordInput.value) {
            console.log('Confirm password validation failed: no match');
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        }
        
        // Validate terms agreement
        if (termsCheckbox && !termsCheckbox.checked) {
            console.log('Terms validation failed: not checked');
            document.getElementById('termsError').textContent = 'You must agree to the terms and conditions';
            document.getElementById('termsError').style.display = 'block';
            isValid = false;
        }
        
        // If form is valid, submit
        if (isValid) {
            console.log('Form validation passed!');
            // Here you would normally submit the form or do an AJAX call
            alert('Membership created successfully! Welcome to Noisecore.');
            if (membershipForm) membershipForm.reset();
        } else {
            console.log('Form validation failed!');
        }
        
        return isValid;
    }
    
    if (membershipForm) {
        console.log('Setting up form validation');
        
        // Add submit event to the form
        membershipForm.addEventListener('submit', validateForm);
        
        // Also add click event to the submit button as a backup
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                console.log('Submit button clicked');
                if (!validateForm(e)) {
                    e.preventDefault();
                }
            });
        }
        
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        const dobInput = document.getElementById('dob');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsCheckbox = document.getElementById('termsAgree');
        
        console.log('Form inputs found:', {
            fullName: fullNameInput,
            email: emailInput,
            genderInputs: genderInputs.length,
            dob: dobInput,
            password: passwordInput,
            confirmPassword: confirmPasswordInput,
            terms: termsCheckbox
        });

        // Toggle password visibility
        const togglePassword = document.getElementById('togglePassword');
        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                console.log('Toggle password clicked');
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }

        // Password strength meter
        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }

        function updatePasswordStrength() {
            const password = passwordInput.value;
            const strengthBar = document.getElementById('strengthBar');
            const strengthText = document.getElementById('strengthText');
            
            let strength = 0;
            
            // Validation criteria
            if (password.length >= 8) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^A-Za-z0-9]/)) strength += 1;
            
            switch (strength) {
                case 0:
                    strengthBar.style.width = '10%';
                    strengthBar.style.backgroundColor = '#dc3545';
                    strengthText.textContent = 'Strength: Very Weak';
                    break;
                case 1:
                    strengthBar.style.width = '25%';
                    strengthBar.style.backgroundColor = '#dc3545';
                    strengthText.textContent = 'Strength: Weak';
                    break;
                case 2:
                    strengthBar.style.width = '50%';
                    strengthBar.style.backgroundColor = '#ffc107';
                    strengthText.textContent = 'Strength: Medium';
                    break;
                case 3:
                    strengthBar.style.width = '75%';
                    strengthBar.style.backgroundColor = '#28a745';
                    strengthText.textContent = 'Strength: Strong';
                    break;
                case 4:
                    strengthBar.style.width = '100%';
                    strengthBar.style.backgroundColor = '#28a745';
                    strengthText.textContent = 'Strength: Very Strong';
                    break;
            }
        }
    }
    
    // Helper functions for form validation
    function isValidEmail(email) {
        // Simple email validation without regex
        if (!email.includes('@')) return false;
        
        const parts = email.split('@');
        if (parts.length !== 2) return false;
        
        const [localPart, domain] = parts;
        if (localPart.length === 0 || domain.length === 0) return false;
        
        if (!domain.includes('.')) return false;
        
        const domainParts = domain.split('.');
        if (domainParts[domainParts.length - 1].length < 2) return false;
        
        return true;
    }
    
    function isValidAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        return age >= 18;
    }

    // Auto Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let scrollAmount = 0;
        const cardWidth = 350 + 30; // card width + gap
        const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
        
        function autoScroll() {
            scrollAmount += cardWidth;
            if (scrollAmount > maxScroll) {
                scrollAmount = 0;
            }
            
            testimonialSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        
        // Auto scroll every 5 seconds
        setInterval(autoScroll, 5000);
    }
});
