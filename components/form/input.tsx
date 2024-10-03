import { InputProps, Input as NextInput } from '@nextui-org/input';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export interface InputFieldProps<T extends FieldValues>
  extends Pick<UseControllerProps<T>, 'rules' | 'name' | 'control'>,
    Omit<InputProps, 'name' | 'onChange'> {
  onChange?: (params: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField<T extends FieldValues>(props: InputFieldProps<T>) {
  const {
    control,
    name,
    rules,
    onChange,
    isClearable = true,
    label,
    isRequired,
    ...restProps
  } = props;
  const { field, fieldState } = useController({ control, name, rules });
  const errMsg = fieldState.error?.message;

  const clearChange = () => {
    field.onChange('');
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(evt);
    if (typeof onChange === 'function') {
      onChange(evt);
    }
  };

  return (
    <NextInput
      {...restProps}
      label={
        label ? (
          <div>
            {label}
            {isRequired && (
              <span className="text-danger" style={{ marginLeft: 2 }}>
                *
              </span>
            )}
          </div>
        ) : null
      }
      onChange={handleChange}
      onClear={isClearable ? clearChange : undefined}
      value={field.value || ''}
      errorMessage={errMsg || ''}
      isInvalid={!!errMsg}
      labelPlacement="outside"
      variant="bordered"
    />
  );
}

export default InputField;
