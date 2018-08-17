const validators = {
  email(errors, values, input, message) {
    if (!values[input] || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[input])) {
      errors[input] = message;
    }

    return errors;
  },
  phone(errors, values, input, message) {
    if (!this.isNumber(values[input]) || values[input].length !== 10) {
      errors[input] = message;
    }

    return errors;
  },
  minLength(errors, values, input, message, minLength = 1) {
    if (!values[input] || values[input].length < minLength) {
      errors[input] = message;
    }

    return errors;
  },
  compare(errors, values, input1, input2, message) {
    if (values[input1] !== values[input2]) {
      errors[input2] = message;
    }

    return errors;
  },
  isNumber(input) {
    return input && input.match(/^[0-9]+$/);
  }
};

export default validators;