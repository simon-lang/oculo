import React from 'react';
import './App.css';
import examinations from './examinations.json'

function App() {
  return (
    <div className="App">
        <pre>{JSON.stringify(examinations, null, 2)}</pre>
    </div>
  );
}

export default App;
