import React from 'react';
import logo from './logo.svg';
import './App.css';
import UrlShortener from './containers/UrlShortener';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UrlShortener />
      </header>
    </div>
  );
}

export default App;
