import React from 'react';
import Select from 'react-select';

interface SelectModel {
  options: { value: string; label: string }[];
  height?: number;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectComponent: React.FC<SelectModel> = ({ height = 48, ...props }) => {
  return (
    <Select
      {...props}
      onChange={(selectedOption) => {
        props.onChange(selectedOption?.value || '');
      }}
      styles={{
        control: (base) => ({
          ...base,
          height,
          borderColor: 'grey',
          width:"25%"
        }),
      }}
    />
  );
};

export default SelectComponent;
