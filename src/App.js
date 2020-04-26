import React from 'react';
import { Provider } from 'react-redux';
import './stylesheets/App.css';
import './stylesheets/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import Arena from './component/Arena'

function App() {
  return (
    <Provider Provider store={store}>
      <div className="App">
        <Arena/>
      </div>
    </Provider>
  );
}

export default App;
