import React from 'react';

const Button = ({ children, type, color }) => <button type={type} className={`button ${color !== undefined ? `button--${color}` : ''}`}>{children}</button>

export default Button;