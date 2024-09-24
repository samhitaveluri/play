import React from 'react';

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
        >
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        {error && <div className="alert alert-danger"></div>}
      </div>
    </div>
  );
};

export default SelectInput;
