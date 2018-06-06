import * as React from 'react';
import './App.css';
import autocomplete from './autocomplete';

import logo from './logo.svg';

class App extends React.Component {
  public componentDidMount() {
    autocomplete(document.getElementById('textInput'), []);
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcom to AutoComplete Demo</h1>
        </header>
        <div className="AutoComplete" >
          <input type="text" id="textInput" autoComplete="off" placeholder="enter the search term" />
        </div>
      </div>
    );
  }
}

export default App;
