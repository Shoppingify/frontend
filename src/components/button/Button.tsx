import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  modifier: string;
  text: string;
}

const btnTypes = {
  primary: 'py-2 px-4 bg-blue-500 text-white font-bold'
}

function Button(props: ButtonProps) {
  const { modifier, text, disabled } = props;

  function buildClasses() {
    // @ts-ignore
    let defaultClasses = btnTypes[modifier];
    if(disabled) defaultClasses += ' opacity-50 cursor-not-allowed'

    return defaultClasses;
  }

  return (
    // @ts-ignore
    <button {...props} className={buildClasses()}>
      { text }
    </button>
  );
}

export default Button;