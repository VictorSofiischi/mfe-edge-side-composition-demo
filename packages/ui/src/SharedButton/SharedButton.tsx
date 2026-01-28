import React from 'react';

interface ButtonProps {
  variant: 'primary' | 'danger';
  onClick?: () => void;
  children: React.ReactNode;
}

export const SharedButton = ({ variant, onClick, children }: ButtonProps) => {
  const style = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: variant === 'primary' ? 'blue' : 'red',
    color: 'white',
    fontSize: '16px'
  };

  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
};