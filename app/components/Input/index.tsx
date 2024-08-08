import React from "react";

interface InputWithLabelProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputWithLabel;
