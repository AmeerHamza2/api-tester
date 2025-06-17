import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ className = '', children, ...props }) => {
  return (
    <select
      className={`px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};