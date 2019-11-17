import React from 'react';

import { useField } from './hooks';

interface ErrorFieldProps {
  name: string;
}

export function ErrorField({ name, ...props }: ErrorFieldProps) {
  const field = useField(name);
  return (
    <div {...props}>
      {field.isTouched &&
        field.hasErrors &&
        field.errors.map((error: string) => <span key={error}>{error}</span>)}
    </div>
  );
}
