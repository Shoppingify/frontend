import React from 'react';

// Types TODO refactor into own folder/file
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  modifier: string;
  text: string;
}

// Predefined classname per style
const btnTypes = {
  primary: 'py-2 px-4 bg-blue-500 text-white font-bold'
}

/**
 * Renders a button element
 *
 * @param props
 *  Props for the button
 */
function Button(props: ButtonProps) {
  const { modifier, text, disabled } = props;

  function buildClasses() {
    // TODO fix
    // @ts-ignore
    let defaultClasses = btnTypes[modifier];
    if(disabled) defaultClasses += ' opacity-50 cursor-not-allowed'

    return defaultClasses;
  }

  return (
    // TODO fix
    // @ts-ignore
    <button {...props} className={buildClasses()}>
      { text }
    </button>
  );
}

export default Button;