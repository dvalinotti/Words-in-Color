import React from 'react';
import './App.css';
import Window from './components/Window';
import { Container } from '@material-ui/core';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.appRef = React.createRef();
    this.state = {
      appRef: this.appRef
    }
  }
  render() {
    return (
      <div className="App" ref={this.appRef}>
        <Container style={{paddingTop: 60, maxWidth: 1000}}>
          <Window appRef={this.state.appRef}/>
        </Container>
      </div>
    );
  }
}

export default App;
