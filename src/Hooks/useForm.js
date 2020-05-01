import { useState } from 'react';

export default function useForm(formSchema, callback) {
  const [inputs, setInputs] = useState(formSchema);

  const validateForm = () => {
    const formInputs = Object.values(inputs);

    // eslint-disable-next-line array-callback-return
    formInputs.forEach((input) => {
      if (input.errors.length !== 0) {
        return false;
      }
    });

    return true;
  };

  const validateInput = (name, value) => {
    const tempInput = inputs[name];
    tempInput.errors = [];

    if (tempInput.validator(value) !== true && tempInput.name !== 'passTwo') {
      tempInput.errors = tempInput.errors.concat(tempInput.validator(value));
    }

    if (tempInput.name === 'passOne' || tempInput.name === 'passTwo') {
      let tempPassTwo = inputs['passTwo'];
      tempPassTwo.errors = [];

      if (tempInput.name === 'passTwo') tempPassTwo.value = value;

      if (
        tempPassTwo.validator(
          tempPassTwo.value,
          tempInput.name === 'passOne' ? value : inputs['passOne'].value
        ) !== true
      ) {
        tempPassTwo.errors = tempPassTwo.errors.concat(
          tempPassTwo.validator(
            tempPassTwo.value,
            tempInput.name === 'passOne' ? value : inputs['passOne'].value
          )
        );
      }

      if (tempInput.name === 'passOne')
        setInputs((prevState) => ({
          ...prevState,
          passTwo: tempPassTwo,
        }));
    }

    return tempInput;
  };

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    let tempInput = inputs[name];

    if (tempInput.validator !== undefined)
      tempInput = validateInput(name, value);

    tempInput.value = value;

    setInputs((prevState) => ({
      ...prevState,
      [name]: tempInput,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      callback(inputs);
    }
  };

  return [inputs, handleOnChange, handleOnSubmit];
}
