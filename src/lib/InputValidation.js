import validator from 'validator';

export const isUsername = (value) => {
  let errors = [];

  if (validator.isEmpty(value)) {
    errors.push('Username is required');
    return errors;
  }

  if (!validator.isAlphanumeric(value))
    errors.push('Username should contain letters and numbers only');

  if (!validator.isLength(value, { min: 3, max: 25 }))
    errors.push('Username should be between 3 and 25 characters');

  if (validator.contains(value, ' '))
    errors.push("Username can't contain spaces");

  return errors.length > 0 ? errors : true;
};

export const isEmail = (value) => {
  let errors = [];

  if (validator.isEmpty(value)) {
    errors.push('Email is required');
    return errors;
  }

  if (!validator.isEmail(value)) errors.push('Not a valid email');

  return errors.length > 0 ? errors : true;
};

export const isStrongPassword = (value) => {
  let errors = [];

  if (validator.isEmpty(value)) {
    errors.push('Password is required');
    return errors;
  }

  if (!validator.isLength(value, { min: 8 }))
    errors.push('Password should be 8 letters, numbers and special characters');

  if (!/\d/.test(value)) errors.push('Password should contain numbers');

  if (!/[a-z]/.test(value))
    errors.push('Password should contain lowercase letters');

  if (!/[A-Z]/.test(value))
    errors.push('Password should contain uppercase letters');

  return errors.length > 0 ? errors : true;
};

export const isPasswordConfirmation = (value, password) => {
  let errors = [];

  if (validator.isEmpty(value)) {
    errors.push('Password confirmation is required');
    return errors;
  }

  if (value !== password) {
    errors.push("Passwords doesn't match");
  }

  return errors.length > 0 ? errors : true;
};
