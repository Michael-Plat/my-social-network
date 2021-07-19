import React from 'react';
import MyCocialNetworkApp from './App';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<MyCocialNetworkApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
