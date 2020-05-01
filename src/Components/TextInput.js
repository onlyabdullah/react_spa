import React from 'react';
import FormErrors from './FormErrors';

export default function TextInput({
  name,
  label,
  type,
  value,
  placeholder,
  errors,
  handleOnChange,
}) {
  return (
    <section className='form-group'>
      {errors.length > 0 && <FormErrors errors={errors} />}
      <label className='form-control-label sr-only' htmlFor={name}>
        {label}
      </label>
      <input
        className='form-control'
        type={type}
        id={name}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={handleOnChange}
      />
    </section>
  );
}
