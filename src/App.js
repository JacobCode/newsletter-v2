import React from 'react';
import Newsletter from './components/Newsletter';
import './scss/main.scss';

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Newsletter />
      </div>
    </div>
  )
}

export default App;
