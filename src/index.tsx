import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducers from './redux/reducers';

const myStore = createStore(reducers); //takes reducers - combined
// const myStore = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__()); //takes reducers - combined


ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
