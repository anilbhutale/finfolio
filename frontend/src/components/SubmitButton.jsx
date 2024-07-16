import React from 'react';
import { Button } from '@nextui-org/react';

const SubmitButton = ({ isLoading, handleSubmit, isDisabled, label }) => {
  return (
    <Button
      variant="ghost"
      radius="full"
      isLoading={isLoading}
      isDisabled={isDisabled}
      className="text-secondary hover:text-primary text-2xl w-full mt-8"
      onClick={handleSubmit}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
