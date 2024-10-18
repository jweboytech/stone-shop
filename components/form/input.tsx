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
  allowEmptyValue?: boolean;
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
    allowEmptyValue,
    ...restProps
  } = props;
  const { field, fieldState } = useController({ control, name, rules });
  const errMsg = fieldState.error?.message;

  const clearChange = () => {
    field.onChange('');
  };

  const handleValueChange = (value: string) => {
    if (allowEmptyValue && value != null) {
      const result = value?.replace(/\s+/g, '');

      field.onChange(result);
    } else {
      field.onChange(value);
    }
  };

  return (
    <NextInput
      {...restProps}
      onClear={isClearable ? clearChange : undefined}
      classNames={{ description: 'text-default-700' }}
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
      value={
        allowEmptyValue ? field.value?.replace(/\s+/g, '') : field.value || ''
      }
      errorMessage={errMsg || ''}
      isInvalid={!!errMsg}
      labelPlacement="outside"
      variant="bordered"
      size="lg"
      onValueChange={handleValueChange}
    />
  );
}

export default InputField;
