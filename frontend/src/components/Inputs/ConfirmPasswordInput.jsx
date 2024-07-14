import React, { useState } from 'react';
import { Input } from '@nextui-org/react';

import { Password, Eye, EyeOff } from '../../utils/Icons';

const ConfirmPasswordInput = ({
  value,
  onChange,
  errors,
  label,
  name,
  isInvalid,
  errorMessage,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      label={label ? label : 'Confirm Password'}
      name={name ? name : 'confirm_password'}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid ? isInvalid : !!errors?.confirm_password}
      errorMessage={errorMessage ? errorMessage : errors?.confirm_password}
      placeholder={placeholder ? placeholder : 'Enter your password'}
      className="text-primary"
      startContent={<Password />}
      endContent={
        <button onClick={toggleVisibility}>
          {isVisible ? <Eye /> : <EyeOff />}
        </button>
      }
      classNames={{
        errorMessage: 'text-error font-calSans',
      }}
    />
  );
};

export default ConfirmPasswordInput;
