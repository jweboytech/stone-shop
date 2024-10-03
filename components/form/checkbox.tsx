import { CheckboxGroup, Checkbox, CheckboxProps } from '@nextui-org/checkbox';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export interface CheckboxFieldProps<T extends FieldValues>
  extends Pick<UseControllerProps<T>, 'rules' | 'name' | 'control'>,
    Omit<CheckboxProps, 'name' | 'children' | 'onChange'>,
    BaseProps {
  options?: Array<Option>;
  fields?: { label?: string; value?: string };
  onChange?: (params: string) => void;
}

function CheckboxField<T extends FieldValues>({
  control,
  name,
  rules,
  isRequired,
  children,
}: CheckboxFieldProps<T>) {
  const { field, fieldState } = useController({ control, name, rules });
  const errMsg = fieldState.error?.message;

  return (
    <Checkbox
      aria-label="checkbox"
      isSelected={field.value}
      onChange={field.onChange}>
      {children}
    </Checkbox>
  );
}

export default CheckboxField;
