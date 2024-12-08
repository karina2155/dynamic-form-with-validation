document.addEventListener('DOMContentLoaded', function () {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const genderSelect = document.getElementById('gender');
    const termsCheckbox = document.getElementById('terms');

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const genderError = document.getElementById('genderError');
    const termsError = document.getElementById('termsError');

    const formFeedback = document.getElementById('formFeedback');

    function validateInput(input, errorElement, validationFunction) {
        input.addEventListener('input', function () {
            if (validationFunction(input.value)) {
                errorElement.style.display = 'none';
            } else {
                errorElement.style.display = 'block';
            }
        });
    }

    validateInput(firstNameInput, firstNameError, value => value.trim() !== '');
    validateInput(lastNameInput, lastNameError, value => value.trim() !== '');
    validateInput(emailInput, emailError, value => value.trim() !== '');
    validateInput(passwordInput, passwordError, value => value.trim() !== '');
    validateInput(passwordInput, passwordError, value => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!value.trim()) {
            passwordError.textContent = 'Password must not be blank';
            return false;
        } else if (!strongPasswordRegex.test(value)) {
            passwordError.textContent = 'Password must be at least 8 characters long, with uppercase, lowercase, number, and special character';
            return false;
        } else {
            return true;
        }
    });

    validateInput(confirmPasswordInput, confirmPasswordError, value => value === passwordInput.value);
    confirmPasswordInput.addEventListener('input', function () {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.style.display = 'block';
        } else {
            confirmPasswordError.style.display = 'none';
        }
    });

    genderSelect.addEventListener('change', function () {
        if (genderSelect.value) {
            genderError.style.display = 'none';
        } else {
            genderError.style.display = 'block';
        }
    });

    termsCheckbox.addEventListener('change', function () {
        if (termsCheckbox.checked) {
            termsError.style.display = 'none';
        } else {
            termsError.style.display = 'block';
        }
    });


    document.getElementById('dynamicForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const gender = genderSelect.value;
        const termsAccepted = termsCheckbox.checked;

        let isValid = true;

        if (!firstName) {
            firstNameError.style.display = 'block';
            isValid = false;
        }

        if (!lastName) {
            lastNameError.style.display = 'block';
            isValid = false;
        }

        if (!email) {
            emailError.style.display = 'block';
            isValid = false;
        }

        if (!password) {
            passwordError.style.display = 'block';
            isValid = false;
        }

        if (password !== confirmPassword) {
            confirmPasswordError.style.display = 'block';
            isValid = false;
        }

        if (!gender) {
            genderError.style.display = 'block';
            isValid = false;
        }

        if (!termsAccepted) {
            termsError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            formFeedback.textContent = 'Form submitted successfully!';
        } else {
            formFeedback.textContent = '';
        }
    });
});