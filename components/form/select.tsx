import {
  Select as NextSelect,
  SelectItem,
  SelectProps,
} from '@nextui-org/select';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export interface SelectFieldProps<T extends FieldValues>
  extends Pick<UseControllerProps<T>, 'rules' | 'name' | 'control'>,
    Omit<SelectProps, 'name' | 'children' | 'onChange'> {
  options?: Array<Option>;
  fields?: { label?: string; value?: string };
  onChange?: (params: string) => void;
}

function SelectField<T extends FieldValues>({
  control,
  name,
  rules,
  options = [],
  fields,
  selectionMode,
  variant = 'bordered',
  onChange,
  isRequired,
  label,
  startContent,
  ...restProps
}: SelectFieldProps<T>) {
  const { field, fieldState } = useController({ control, name, rules });
  const errMsg = fieldState.error?.message;

  return (
    <NextSelect
      {...restProps}
      size="lg"
      onChange={field.onChange}
      selectedKeys={field.value ? [field.value] : []}
      errorMessage={errMsg || ''}
      isInvalid={!!errMsg}
      labelPlacement="outside"
      variant="bordered"
      selectionMode={selectionMode}
      disallowEmptySelection
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
      // classNames={{
      //   mainWrapper: ["w-80"],
      //   label: ["w-20", "h-10", "flex", "items-center"],
      // }}
      aria-label="Select">
      {options.map((item) => {
        const label = fields?.label ? item[fields.label] : item.label;
        const value = fields?.value ? item[fields.value] : item.value;
        return (
          <SelectItem
            aria-label="Select item"
            key={value}
            value={value}
            startContent={startContent}>
            {label}
          </SelectItem>
        );
      })}
    </NextSelect>
  );
}

export default SelectField;
