import React from 'react';
import ReactDOM from 'react-dom';

class App extends  React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
};

ReactDOM.render(<App name="World!"/>, document.getElementById('container'));
