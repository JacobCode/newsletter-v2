import React from 'react';

const Title = ({ content }) => <h1 className={`title ${content === 'congratulations!' ? 'w-50' : ''}`}>{content}</h1>

export default Title;