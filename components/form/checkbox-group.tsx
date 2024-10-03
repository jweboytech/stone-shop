import { CheckboxGroup, Checkbox, CheckboxProps } from '@nextui-org/checkbox';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export interface CheckboxFieldProps<T extends FieldValues>
  extends Pick<UseControllerProps<T>, 'rules' | 'name' | 'control'>,
    Omit<CheckboxProps, 'name' | 'children' | 'onChange'> {
  options?: Array<Option>;
  fields?: { label?: string; value?: string };
  onChange?: (params: string) => void;
}

function CheckboxGroupField<T extends FieldValues>({
  control,
  name,
  rules,
  options = [],
  fields,
  onChange,
  isRequired,
  label,
  startContent,
  ...restProps
}: CheckboxFieldProps<T>) {
  const { field, fieldState } = useController({ control, name, rules });
  const errMsg = fieldState.error?.message;

  const handleChange = (evt: any) => {
    field.onChange(evt);
  };

  return (
    <CheckboxGroup
      aria-label="CheckboxGroup"
      orientation="horizontal"
      onChange={field.onChange}
      errorMessage={errMsg || ''}
      isInvalid={!!errMsg}
      label={
        label ? (
          <div className="text-black text-sm">
            {label}
            {isRequired && (
              <span className="text-danger" style={{ marginLeft: 2 }}>
                *
              </span>
            )}
          </div>
        ) : null
      }>
      {options.map((item) => {
        const label = fields?.label ? item[fields.label] : item.label;
        const value = fields?.value ? item[fields.value] : item.value;
        return (
          <Checkbox aria-label="checkbox" key={value} value={value}>
            {label}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
}

export default CheckboxGroupField;
