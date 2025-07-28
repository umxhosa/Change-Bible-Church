// JavaScript Document //

// Donation Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const donationForm = document.getElementById('donationForm');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const amountInput = document.getElementById('amount');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const creditCardFields = document.getElementById('creditCardFields');
    const thankYouModal = document.getElementById('thankYouModal');
    const closeModalButtons = document.querySelectorAll('.close-modal, #closeThankYou');
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');

    // Amount button functionality
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the amount in the input field
            const amount = this.getAttribute('data-amount');
            amountInput.value = amount;
        });
    });

    // Clear amount button selection when custom amount is entered
    amountInput.addEventListener('input', function() {
        if (this.value) {
            amountButtons.forEach(btn => btn.classList.remove('active'));
        }
    });

    // Payment method functionality
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                creditCardFields.style.display = 'block';
                // Make credit card fields required
                cardNumberInput.required = true;
                expiryInput.required = true;
                cvvInput.required = true;
            } else {
                creditCardFields.style.display = 'none';
                // Remove required attribute for credit card fields
                cardNumberInput.required = false;
                expiryInput.required = false;
                cvvInput.required = false;
            }
        });
    });

    // Card number formatting (add spaces every 4 digits)
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            if (formattedValue !== this.value) {
                this.value = formattedValue;
            }
        });
    }

    // Expiry date formatting (MM/YY)
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }

    // CVV formatting (numbers only, max 4 digits)
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').substring(0, 4);
        });
    }

    // Form validation
    function validateForm() {
        const amount = parseFloat(amountInput.value);
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const selectedPayment = document.querySelector('input[name="payment"]:checked');

        // Check if amount is valid
        if (!amount || amount < 1) {
            alert('Please enter a valid donation amount.');
            amountInput.focus();
            return false;
        }

        // Check if name is provided
        if (!name.trim()) {
            alert('Please enter your full name.');
            document.getElementById('name').focus();
            return false;
        }

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            document.getElementById('email').focus();
            return false;
        }

        // Check payment method specific validation
        if (selectedPayment && selectedPayment.value === 'credit-card') {
            const cardNumber = cardNumberInput.value.replace(/\s/g, '');
            const expiry = expiryInput.value;
            const cvv = cvvInput.value;

            if (cardNumber.length < 13 || cardNumber.length > 19) {
                alert('Please enter a valid card number.');
                cardNumberInput.focus();
                return false;
            }

            if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                alert('Please enter a valid expiry date (MM/YY).');
                expiryInput.focus();
                return false;
            }

            if (cvv.length < 3 || cvv.length > 4) {
                alert('Please enter a valid CVV.');
                cvvInput.focus();
                return false;
            }

            // Check if expiry date is not in the past
            const [month, year] = expiry.split('/');
            const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
            const currentDate = new Date();
            currentDate.setDate(1); // Set to first day of current month
            
            if (expiryDate < currentDate) {
                alert('Card expiry date cannot be in the past.');
                expiryInput.focus();
                return false;
            }
        }

        return true;
    }

    // Form submission
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Get form data
        const formData = new FormData(this);
        const donationData = {};
        
        for (let [key, value] of formData.entries()) {
            donationData[key] = value;
        }

        // Add some additional processing
        donationData.timestamp = new Date().toISOString();
        donationData.currency = 'ZAR';

        // Show loading state
        const submitButton = this.querySelector('.donate-btn');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;

        // Simulate API call (replace with actual payment processing)
        setTimeout(() => {
            console.log('Donation Data:', donationData);
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show thank you modal
            showThankYouModal();
            
            // Reset form
            resetForm();
            
        }, 2000);
    });

    // Show thank you modal
    function showThankYouModal() {
        thankYouModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Close modal functionality
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            thankYouModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });

    // Close modal when clicking outside
    thankYouModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Reset form function
    function resetForm() {
        donationForm.reset();
        amountButtons.forEach(btn => btn.classList.remove('active'));
        creditCardFields.style.display = 'none';
        
        // Reset credit card field requirements
        cardNumberInput.required = false;
        expiryInput.required = false;
        cvvInput.required = false;
        
        // Set default payment method to credit card and show fields
        document.getElementById('credit-card').checked = true;
        creditCardFields.style.display = 'block';
        cardNumberInput.required = true;
        expiryInput.required = true;
        cvvInput.required = true;
    }

    // Amount input validation (numbers only)
    amountInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Initialize form state
    creditCardFields.style.display = 'block'; // Show credit card fields by default
    
    // Add some visual feedback for form interactions
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });

    // Keyboard accessibility for amount buttons
    amountButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    console.log('Donation form JavaScript initialized successfully!');
});
										 // end //
