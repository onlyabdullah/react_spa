import React from 'react';
import useForm from '../Hooks/useForm';
import TextInput from './TextInput';
import FormErrors from './FormErrors';

export default function Form({ title, btnName, callback, formSchema, errors }) {
  const [inputs, handleOnChange, handleOnSubmit] = useForm(
    formSchema,
    callback
  );

  const Components = { TextInput };

  const renderInput = (input) => {
    let InputType = '';

    if (
      input.type === 'text' ||
      input.type === 'password' ||
      input.type === 'email'
    ) {
      InputType = 'TextInput';
    }

    const Input = Components[InputType];

    return (
      <Input key={input.name} handleOnChange={handleOnChange} {...input} />
    );
  };

  const renderInputs = () => {
    const formInputs = Object.values(inputs);

    return formInputs.map((input) => {
      return renderInput(input);
    });
  };

  return (
    <form className='mt-3' onSubmit={handleOnSubmit}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='card bg-light'>
              <div className='card-body'>
                {title && <h3 className='font-weight-light mb-3'>{title}</h3>}
                {errors && <FormErrors errors={errors} />}
                {renderInputs()}
                <div className='form-group text-right mb-0'>
                  <button className='btn btn-primary' type='submit'>
                    {btnName}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
