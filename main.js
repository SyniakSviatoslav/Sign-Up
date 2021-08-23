const usernameEl = document.getElementById('username');
const fullnameEl = document.getElementById('fullname');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const confirmPasswordEl = document.getElementById('confirm-password');

const form = document.getElementById('signup');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isFullnameValid = checkFullname();
    isConfirmedPassword = checkConfirmPassword();

  let isFormValid = isUsernameValid &&
    isEmailValid &&
    isPasswordValid && isConfirmedPassword && isFullnameValid;
  if (isFormValid) {

  }
});
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const isPasswordSecure = (password) => {
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  return re.test(password);
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove('success');
  formField.classList.add('error');


  const error = formField.querySelector('small');
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  
  formField.classList.remove('error');
  formField.classList.add('success');

  const error = formField.querySelector('small');
  error.textContent = '';
}

const checkFullname = () => {

  let valid = false;
  const fullname = fullnameEl.value.trim();

  if (!isRequired(fullname)) {
    showError(fullnameEl, 'Full Name cannot be empty.');
  } else {
    showSuccess(fullnameEl);
    valid = true;
  }
  return valid;
}

const checkUsername = () => {

  let valid = false;
  const min = 3,
    max = 25;
  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, 'Username cannot be empty.');
  } else if (!isBetween(username.length, min, max)) {
    showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
}

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, 'Email cannot be empty.');
  } else if (!isEmailValid(email)) {
    showError(emailEl, 'Email is not valid.')
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
}

const checkPassword = () => {

  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, 'Password cannot be empty.');
  } else if (!isPasswordSecure(password)) {
    showError(passwordEl, 'Password must have at least 8 characters which include at least 1 lowercase character, 1 uppercase characters and 1 number');
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
      showError(confirmPasswordEl, 'Please enter the password');
  } else if (password !== confirmPassword) {
      showError(confirmPasswordEl, 'Confirm password does not match');
  } else {
      showSuccess(confirmPasswordEl);
      valid = true;
  }

  return valid;
};

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args)
    }, delay);
  };
};

form.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'fullname':
      checkFullname();
      break;
    case 'username':
      checkUsername();
      break;
    case 'email':
      checkEmail();
      break;
    case 'password':
      checkPassword();
      break;
    case 'confirm-password':
      checkConfirmPassword();
      break;
  }
}));