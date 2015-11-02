import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'elemental';
import './style/style.less';

class App extends  React.Component {
  render() {
    return (
      <div>
          <header>Header</header>
          <aside><h2>Files</h2></aside>
          <section>
            <Container>
              <h2>Printers</h2>
              Hello {this.props.name}
            </Container>
          </section>
          <footer>Footer</footer>
      </div>
    );
  }
};

ReactDOM.render(<App name="World!"/>, document.getElementById('container'));
